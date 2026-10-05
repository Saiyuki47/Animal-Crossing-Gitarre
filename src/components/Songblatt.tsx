import { useEffect, useMemo, useRef, useState } from 'react'
import { akkordNach } from '../data/akkorde'
import { PAUSE, anzeigeName, gegriffen, griffId, taktZahl, type Lied, type SongAbschnitt } from '../data/songblatt'
import { klick, starteTakt, useAudioContext } from '../lib/takt'
import Griffbild from './Griffbild'

// „Das ganze Lied" in den Lernschritten: komplettes Akkordblatt Takt für Takt,
// wahlweise als Kapo-Griffe oder Original, mit Tipps je Abschnitt und einem
// Mitspiel-Modus (Einzählen, Klick, aktueller Takt wird markiert und mitgescrollt).
// Ein Klick auf einen Takt setzt den Startpunkt. Jede Kachel zeigt die Anschläge des
// gewählten Musters auf 8 Achtel-Plätzen (1 + 2 + 3 + 4 +); beim Mitspielen leuchtet
// der aktuelle Platz.

const SCHLAEGE = 4
const EINZAEHLEN = 4

type AnschlagId = 'viertel' | 'song'
/** Anschläge je Achtel: ↓ ab, ↑ auf, – Luftschlag, '' = nichts (Hand pendelt nur). */
const ANSCHLAG: Record<AnschlagId, { name: string; slots: string[] }> = {
  viertel: { name: '↓ ↓ ↓ ↓  Viertel (Einstieg)', slots: ['↓', '', '↓', '', '↓', '', '↓', ''] },
  song: { name: '↓ – ↓↑ – ↑ ↓↑  Song-Muster', slots: ['↓', '–', '↓', '↑', '–', '↑', '↓', '↑'] },
}
const ZAEHLZEIT = ['1', '+', '2', '+', '3', '+', '4', '+']

/** Startindex (global über alle Abschnitte) je Abschnitt. */
const offsetsVon = (lied: Lied) =>
  lied.abschnitte.reduce<number[]>((acc, _, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + lied.abschnitte[i - 1].takte.length)
    return acc
  }, [])

/** Index des Abschnitts, in dem der globale Takt `g` liegt. */
function abschnittVon(offsets: number[], g: number): number {
  let i = 0
  while (i + 1 < offsets.length && offsets[i + 1] <= g) i++
  return i
}

interface Position {
  takt: number // global, -1 = Einzählen
  achtel: number // 0–7 (Schlag = achtel / 2)
}

function AnschlagZeile({ anschlag, aktivesAchtel }: { anschlag: AnschlagId; aktivesAchtel?: number }) {
  return (
    <span className="sb-anschlag" aria-hidden="true">
      {ANSCHLAG[anschlag].slots.map((s, a) => (
        <i key={a} className={`${a % 2 ? '' : 'schlag'}${aktivesAchtel === a ? ' an' : ''}`}>
          {s}
        </i>
      ))}
    </span>
  )
}

function Abschnitt({
  lied,
  abschnitt,
  offset,
  mitKapo,
  position,
  startTakt,
  anschlag,
  onTaktKlick,
}: {
  lied: Lied
  abschnitt: SongAbschnitt
  offset: number
  mitKapo: boolean
  position: Position | null
  startTakt: number
  anschlag: AnschlagId
  onTaktKlick: (i: number) => void
}) {
  const greife = (a: string) => gegriffen(lied, a, abschnitt.teil, mitKapo)
  const griffe = useMemo(() => {
    const ids = new Set<string>()
    for (const t of abschnitt.takte)
      for (const a of t) {
        const id = griffId(gegriffen(lied, a, abschnitt.teil, mitKapo), mitKapo)
        if (id) ids.add(id)
      }
    return [...ids].map(id => akkordNach(id)).filter(a => a !== undefined)
  }, [lied, abschnitt, mitKapo])
  const vorher = mitKapo ? abschnitt.vorher : abschnitt.vorherOriginal

  return (
    <section className="card sb-abschnitt">
      {vorher && <p className="sb-vorher">⚠️ {vorher}</p>}
      <div className="sb-kopf">
        <h3 className="sb-titel">{abschnitt.name}</h3>
        <span className="ub-badge">{abschnitt.takte.length} Takte</span>
        {mitKapo && <span className="ub-badge">Kapo {lied.kapo[abschnitt.teil]}. Bund</span>}
      </div>

      {abschnitt.tab && (
        <div className="sb-tab">
          <p className="sb-label">Melodie{mitKapo ? ` (Zahlen ab dem Kapo im ${lied.kapo[abschnitt.teil]}. Bund)` : ''}</p>
          <pre>{mitKapo ? abschnitt.tab.kapo : abschnitt.tab.original}</pre>
        </div>
      )}

      <div className="sb-takte">
        {abschnitt.takte.map((takt, i) => {
          const g = offset + i
          const aktiv = position?.takt === g
          const pause = takt.every(a => a === PAUSE)
          return (
            <button
              key={i}
              type="button"
              className={`sb-takt${aktiv ? ' aktiv' : ''}${pause ? ' pause' : ''}${!position && startTakt === g && g > 0 ? ' start' : ''}`}
              onClick={() => onTaktKlick(g)}
              aria-label={`Takt ${i + 1}: ${takt.map(a => anzeigeName(greife(a))).join(', ')}. Ab hier mitspielen`}
              data-takt={g}
            >
              <span className="sb-taktnr">{i + 1}</span>
              <span className="sb-akkorde">
                {takt.map((a, j) => (
                  <span key={j} className="sb-akkord">
                    {anzeigeName(greife(a))}
                  </span>
                ))}
              </span>
              {mitKapo && !pause && <span className="sb-original">{takt.map(a => anzeigeName(a)).join(' · ')}</span>}
              {pause ? (
                <span className="sb-original">nicht spielen, mitzählen</span>
              ) : (
                <AnschlagZeile anschlag={anschlag} aktivesAchtel={aktiv ? position.achtel : undefined} />
              )}
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

export default function Songblatt({ lied }: { lied: Lied }) {
  const getCtx = useAudioContext()
  const offsets = useMemo(() => offsetsVon(lied), [lied])
  const gesamt = taktZahl(lied)
  const [mitKapo, setMitKapo] = useState(true)
  const [anschlag, setAnschlag] = useState<AnschlagId>('viertel')
  const [bpm, setBpm] = useState(lied.uebeBpm)
  const [laeuft, setLaeuft] = useState(false)
  const [position, setPosition] = useState<Position | null>(null)
  const [startTakt, setStartTakt] = useState(0)
  const [mitscrollen, setMitscrollen] = useState(true)
  const wurzel = useRef<HTMLDivElement>(null)

  // Wiedergabe: Klicks (Viertel) mit Vorlauf in AudioContext-Zeit planen,
  // Anzeige (Achtel, für die Anschlag-Pfeile) aus derselben Uhr ableiten
  useEffect(() => {
    if (!laeuft) return
    const ctx = getCtx()
    const dauer = 60 / bpm
    const t0 = ctx.currentTime + 0.15
    const gesamtSchlaege = EINZAEHLEN + (gesamt - startTakt) * SCHLAEGE
    let geplant = 0
    let letzte = -2

    const tick = () => {
      while (geplant < gesamtSchlaege && t0 + geplant * dauer < ctx.currentTime + 0.1) {
        const erster = geplant % SCHLAEGE === 0
        klick(ctx, t0 + geplant * dauer, geplant < EINZAEHLEN ? 1200 : erster ? 1600 : 1000, erster ? 0.6 : 0.35)
        geplant++
      }
      const e = Math.floor((ctx.currentTime - t0) / (dauer / 2))
      if (e === letzte || e < 0) return
      letzte = e
      if (e >= gesamtSchlaege * 2) {
        setLaeuft(false)
        return
      }
      const imLied = e - EINZAEHLEN * 2
      setPosition(
        imLied < 0
          ? { takt: -1, achtel: e }
          : { takt: startTakt + Math.floor(imLied / (SCHLAEGE * 2)), achtel: imLied % (SCHLAEGE * 2) },
      )
    }

    const stopp = starteTakt(tick)
    tick()
    return () => {
      stopp()
      setPosition(null)
    }
  }, [laeuft, bpm, startTakt, gesamt, getCtx])

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
          <h3 className="ub-title">🎵 {lied.titel} – das ganze Lied</h3>
        </div>

        <div className="sb-legende">
          <p>
            <b>So liest du das Blatt:</b> Eine Kachel = <b>ein Takt</b> = <b>4 Schläge</b>. Zähl dabei „1 + 2 + 3 + 4 +". Die
            Pfeile unten in jeder Kachel zeigen, wann du anschlägst: ↓ abwärts, ↑ aufwärts, – Luftschlag (die Hand bewegt
            sich, trifft aber nicht). Stehen <b>zwei Akkorde</b> in einer Kachel, wechselst du auf Schlag 3.
          </p>
          <div className="sb-legende-beispiel" aria-hidden="true">
            <AnschlagZeile anschlag={anschlag} />
            <span className="sb-anschlag sb-zaehlzeit">
              {ZAEHLZEIT.map((z, a) => (
                <i key={a}>{z}</i>
              ))}
            </span>
          </div>
          <p>{gesamt} Takte insgesamt. Tipp auf einen Takt, um ab dort mitzuspielen.</p>
        </div>

        <p className="sb-label">Anschlag</p>
        <div className="filter-row">
          {(Object.keys(ANSCHLAG) as AnschlagId[]).map(id => (
            <button key={id} type="button" className={`filter-btn${anschlag === id ? ' on' : ''}`} onClick={() => setAnschlag(id)}>
              {ANSCHLAG[id].name}
            </button>
          ))}
        </div>

        <p className="sb-label">Griffe</p>
        <div className="filter-row">
          <button type="button" className={`filter-btn${mitKapo ? ' on' : ''}`} onClick={() => setMitKapo(true)}>
            Mit Kapo (einfache Griffe)
          </button>
          <button type="button" className={`filter-btn${!mitKapo ? ' on' : ''}`} onClick={() => setMitKapo(false)}>
            Original (Barré)
          </button>
        </div>

        <p className="sb-label">Tempo</p>
        <div className="filter-row">
          {lied.tempi.map(t => (
            <button
              key={t}
              type="button"
              className={`filter-btn${bpm === t ? ' on' : ''}`}
              onClick={() => setBpm(t)}
              disabled={laeuft}
            >
              {t} BPM{t === lied.bpm ? ' (Original)' : t === lied.uebeBpm ? ' (Üben)' : ''}
            </button>
          ))}
        </div>

        <label className="sb-option">
          <input type="checkbox" checked={mitscrollen} onChange={e => setMitscrollen(e.target.checked)} /> Mitscrollen
        </label>

        <div className="sb-status" aria-live="polite">
          {position?.takt === -1 && <b>Einzählen: {Math.floor(position.achtel / 2) + 1}</b>}
          {position && position.takt >= 0 && (
            <>
              <b>{lied.abschnitte[abschnittVon(offsets, position.takt)].name}</b> · Takt {position.takt + 1} von {gesamt}
            </>
          )}
          {!position && startTakt > 0 && (
            <>
              Start ab Takt {startTakt + 1} ({lied.abschnitte[abschnittVon(offsets, startTakt)].name}) ·{' '}
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

      {lied.abschnitte.map((a, i) => (
        <Abschnitt
          key={a.id}
          lied={lied}
          abschnitt={a}
          offset={offsets[i]}
          mitKapo={mitKapo}
          position={position}
          startTakt={startTakt}
          anschlag={anschlag}
          onTaktKlick={taktKlick}
        />
      ))}

      <p className="sb-quelle">
        Song © Nintendo. Akkorde nach der Transkription von „{lied.quelle.autor}" auf{' '}
        <a href={lied.quelle.url} target="_blank" rel="noopener noreferrer">
          Ultimate Guitar ↗
        </a>
        .{lied.quelle.zusatz && ` ${lied.quelle.zusatz}`} Taktaufteilung, Kapo-Griffe und Tipps von dieser Lernseite.
      </p>
    </div>
  )
}
