import { useEffect, useMemo, useRef, useState } from 'react'
import { akkordNach } from '../data/akkorde'
import { AKKORDBLATT_URL, ORIGINAL_BPM, UEBE_BPM } from '../data/song'
import { KAPO_BUND, SONGBLATT, TAKTE_GESAMT, anzeigeName, gegriffen, griffId, type SongAbschnitt } from '../data/songblatt'
import { klick, starteTakt, useAudioContext } from '../lib/takt'
import Griffbild from './Griffbild'

// „Das ganze Lied" in den Lernschritten: komplettes Akkordblatt Takt für Takt,
// wahlweise als Kapo-Griffe oder Original, mit Tipps je Abschnitt und einem
// Mitspiel-Modus (Einzählen, Klick, aktueller Takt wird markiert und mitgescrollt).
// Ein Klick auf einen Takt setzt den Startpunkt.

const TEMPI = [UEBE_BPM, 90, 105, ORIGINAL_BPM]
const SCHLAEGE = 4
const EINZAEHLEN = 4

/** Startindex (global über alle Abschnitte) je Abschnitt. */
const OFFSETS = SONGBLATT.reduce<number[]>((acc, _, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + SONGBLATT[i - 1].takte.length)
  return acc
}, [])

/** Index des Abschnitts, in dem der globale Takt `g` liegt. */
function abschnittVon(g: number): number {
  let i = 0
  while (i + 1 < OFFSETS.length && OFFSETS[i + 1] <= g) i++
  return i
}

interface Position {
  takt: number // global, -1 = Einzählen
  schlag: number // 0–3
}

function Abschnitt({
  abschnitt,
  offset,
  mitKapo,
  position,
  startTakt,
  onTaktKlick,
}: {
  abschnitt: SongAbschnitt
  offset: number
  mitKapo: boolean
  position: Position | null
  startTakt: number
  onTaktKlick: (i: number) => void
}) {
  const griffe = useMemo(() => {
    const ids = new Set<string>()
    for (const t of abschnitt.takte)
      for (const a of t) {
        const id = griffId(gegriffen(a, abschnitt.teil, mitKapo), mitKapo)
        if (id) ids.add(id)
      }
    return [...ids].map(id => akkordNach(id)).filter(a => a !== undefined)
  }, [abschnitt, mitKapo])

  return (
    <section className="card sb-abschnitt">
      {abschnitt.vorher && <p className="sb-vorher">⚠️ {mitKapo ? abschnitt.vorher : 'Tonartwechsel: ab hier einen Halbton höher (A-Moll).'}</p>}
      <div className="sb-kopf">
        <h3 className="sb-titel">{abschnitt.name}</h3>
        <span className="ub-badge">{abschnitt.takte.length} Takte</span>
        {mitKapo && <span className="ub-badge">Kapo {KAPO_BUND[abschnitt.teil]}. Bund</span>}
      </div>

      <div className="sb-takte">
        {abschnitt.takte.map((takt, i) => {
          const g = offset + i
          const aktiv = position?.takt === g
          return (
            <button
              key={i}
              type="button"
              className={`sb-takt${aktiv ? ' aktiv' : ''}${!position && startTakt === g && g > 0 ? ' start' : ''}`}
              onClick={() => onTaktKlick(g)}
              aria-label={`Takt ${i + 1}: ${takt.map(a => anzeigeName(gegriffen(a, abschnitt.teil, mitKapo))).join(', ')}. Ab hier mitspielen`}
              data-takt={g}
            >
              <span className="sb-taktnr">{i + 1}</span>
              <span className="sb-akkorde">
                {takt.map((a, j) => (
                  <span key={j} className="sb-akkord">
                    {anzeigeName(gegriffen(a, abschnitt.teil, mitKapo))}
                  </span>
                ))}
              </span>
              {mitKapo && (
                <span className="sb-original">{takt.map(a => anzeigeName(a)).join(' · ')}</span>
              )}
              <span className="sb-schlaege" aria-hidden="true">
                {Array.from({ length: SCHLAEGE }, (_, s) => (
                  <i key={s} className={aktiv && position.schlag === s ? 'an' : ''} />
                ))}
              </span>
            </button>
          )
        })}
      </div>

      <div className="griffbild-reihe">
        {griffe.map(a => (
          <Griffbild key={a.id} akkord={a} breite={72} />
        ))}
      </div>
      <p className="tipp-block">💡 {mitKapo ? abschnitt.tippKapo : abschnitt.tippOriginal}</p>
      {abschnitt.unsicher && <p className="sb-unsicher">❓ {abschnitt.unsicher}</p>}
    </section>
  )
}

export default function Songblatt() {
  const getCtx = useAudioContext()
  const [mitKapo, setMitKapo] = useState(true)
  const [bpm, setBpm] = useState(UEBE_BPM)
  const [laeuft, setLaeuft] = useState(false)
  const [position, setPosition] = useState<Position | null>(null)
  const [startTakt, setStartTakt] = useState(0)
  const [mitscrollen, setMitscrollen] = useState(true)
  const wurzel = useRef<HTMLDivElement>(null)

  // Wiedergabe: Klicks mit Vorlauf in AudioContext-Zeit planen, Anzeige aus der Uhr ableiten
  useEffect(() => {
    if (!laeuft) return
    const ctx = getCtx()
    const dauer = 60 / bpm
    const t0 = ctx.currentTime + 0.15
    const gesamtSchlaege = EINZAEHLEN + (TAKTE_GESAMT - startTakt) * SCHLAEGE
    let geplant = 0
    let letzte = -2

    const tick = () => {
      while (geplant < gesamtSchlaege && t0 + geplant * dauer < ctx.currentTime + 0.1) {
        const erster = geplant % SCHLAEGE === 0
        klick(ctx, t0 + geplant * dauer, geplant < EINZAEHLEN ? 1200 : erster ? 1600 : 1000, erster ? 0.6 : 0.35)
        geplant++
      }
      const k = Math.floor((ctx.currentTime - t0) / dauer)
      if (k === letzte || k < 0) return
      letzte = k
      if (k >= gesamtSchlaege) {
        setLaeuft(false)
        return
      }
      setPosition(
        k < EINZAEHLEN
          ? { takt: -1, schlag: k }
          : { takt: startTakt + Math.floor((k - EINZAEHLEN) / SCHLAEGE), schlag: (k - EINZAEHLEN) % SCHLAEGE },
      )
    }

    const stopp = starteTakt(tick)
    tick()
    return () => {
      stopp()
      setPosition(null)
    }
  }, [laeuft, bpm, startTakt, getCtx])

  // Aktuellen Takt im Blick behalten
  const aktTakt = position?.takt ?? -1
  useEffect(() => {
    if (!mitscrollen || aktTakt < 0) return
    wurzel.current?.querySelector(`[data-takt="${aktTakt}"]`)?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [aktTakt, mitscrollen])

  const taktKlick = (i: number) => {
    setStartTakt(i)
    if (laeuft) {
      // Neustart ab dem gewählten Takt
      setLaeuft(false)
      requestAnimationFrame(() => setLaeuft(true))
    }
  }

  return (
    <div ref={wurzel}>
      <div className="card sb-steuerung">
        <div className="sb-kopf">
          <h3 className="ub-title">🎵 Go K.K. Rider – das ganze Lied</h3>
        </div>
        <p className="ub-desc">
          {TAKTE_GESAMT} Takte im 4/4-Takt. Zwei Akkorde in einem Takt = je zwei Schläge. Tipp auf einen Takt, um ab dort
          mitzuspielen.
        </p>

        <div className="filter-row">
          <button type="button" className={`filter-btn${mitKapo ? ' on' : ''}`} onClick={() => setMitKapo(true)}>
            Mit Kapo (einfache Griffe)
          </button>
          <button type="button" className={`filter-btn${!mitKapo ? ' on' : ''}`} onClick={() => setMitKapo(false)}>
            Original (Barré)
          </button>
        </div>

        <div className="filter-row">
          {TEMPI.map(t => (
            <button
              key={t}
              type="button"
              className={`filter-btn${bpm === t ? ' on' : ''}`}
              onClick={() => setBpm(t)}
              disabled={laeuft}
            >
              {t} BPM{t === ORIGINAL_BPM ? ' (Original)' : t === UEBE_BPM ? ' (Üben)' : ''}
            </button>
          ))}
        </div>

        <label className="sb-option">
          <input type="checkbox" checked={mitscrollen} onChange={e => setMitscrollen(e.target.checked)} /> Mitscrollen
        </label>

        <div className="sb-status" aria-live="polite">
          {position?.takt === -1 && <b>Einzählen: {position.schlag + 1}</b>}
          {position && position.takt >= 0 && (
            <>
              <b>{SONGBLATT[abschnittVon(position.takt)].name}</b> · Takt {position.takt + 1} von {TAKTE_GESAMT}
            </>
          )}
          {!position && startTakt > 0 && (
            <>
              Start ab Takt {startTakt + 1} ({SONGBLATT[abschnittVon(startTakt)].name}) ·{' '}
              <button type="button" className="sb-link" onClick={() => setStartTakt(0)}>
                von vorn
              </button>
            </>
          )}
        </div>

        <button type="button" className={`wz-start${laeuft ? ' stop' : ''}`} onClick={() => setLaeuft(l => !l)}>
          {laeuft ? '■ Stopp' : `▶ Mitspielen (${bpm} BPM)`}
        </button>
      </div>

      {SONGBLATT.map((a, i) => (
        <Abschnitt
          key={a.id}
          abschnitt={a}
          offset={OFFSETS[i]}
          mitKapo={mitKapo}
          position={position}
          startTakt={startTakt}
          onTaktKlick={taktKlick}
        />
      ))}

      <p className="sb-quelle">
        Song © Nintendo. Akkorde nach der Transkription von „HerNameIsRain" auf{' '}
        <a href={AKKORDBLATT_URL} target="_blank" rel="noopener noreferrer">
          Ultimate Guitar ↗
        </a>
        ; Taktaufteilung, Kapo-Griffe und Tipps von dieser Lernseite.
      </p>
    </div>
  )
}
