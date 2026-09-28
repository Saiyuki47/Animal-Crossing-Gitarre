import { useEffect, useRef, useState } from 'react'
import { ORIGINAL_BPM, UEBE_BPM } from '../data/song'
import { klick, starteTakt, useAudioContext } from '../lib/takt'
import Stimmgeraet from './Stimmgeraet'

// Werkzeuge-Tab (ersetzt „Moodle" der Vorlesungs-Lernseiten):
//   • Metronom mit Schlagmuster-Anzeige und Swing (Web Audio, präzises Scheduling)
//   • Tempo tippen – BPM eines Songs beim Hören bestimmen
//   • Stimmgerät – Tonhöhe über das Mikrofon (components/Stimmgeraet.tsx)
//   • Stimmtöne – Referenzton pro Saite zum Stimmen nach Gehör
//
// Das Metronom plant Klicks mit ~100 ms Vorlauf direkt in der AudioContext-Zeit
// (statt setInterval-Klicks), damit das Timing auch bei ruckelndem UI exakt bleibt.
// Ein Takt = 8 Achtel-Slots; bei Swing fällt das „und" auf 2/3 des Schlags.

type Schlag = 'D' | 'U' | 'B' | ''

interface Muster {
  id: string
  name: string
  slots: Schlag[]
}

const MUSTER: Muster[] = [
  { id: 'viertel', name: 'Viertel', slots: ['D', '', 'D', '', 'D', '', 'D', ''] },
  { id: 'achtel', name: 'Achtel', slots: ['D', 'U', 'D', 'U', 'D', 'U', 'D', 'U'] },
  { id: 'standard', name: 'Song-Muster', slots: ['D', '', 'D', 'U', '', 'U', 'D', 'U'] },
  { id: 'boom-chuck', name: 'Boom-Chuck', slots: ['B', '', 'D', '', 'B', '', 'D', 'U'] },
]

const ZAEHLZEIT = ['1', '+', '2', '+', '3', '+', '4', '+']
const SYMBOL: Record<Schlag, string> = { D: '↓', U: '↑', B: 'Bass', '': '–' }

const SAITEN = [
  { name: 'E', nr: 6, hz: 82.41 },
  { name: 'A', nr: 5, hz: 110.0 },
  { name: 'D', nr: 4, hz: 146.83 },
  { name: 'G', nr: 3, hz: 196.0 },
  { name: 'H', nr: 2, hz: 246.94 },
  { name: 'e', nr: 1, hz: 329.63 },
]

const MIN_BPM = 40
const MAX_BPM = 220

function Metronom({ bpm, setBpm }: { bpm: number; setBpm: (n: number) => void }) {
  const getCtx = useAudioContext()
  const [laeuft, setLaeuft] = useState(false)
  const [swing, setSwing] = useState(false)
  const [achtelKlick, setAchtelKlick] = useState(false)
  const [musterId, setMusterId] = useState('standard')
  const [aktiv, setAktiv] = useState(-1)

  // Werte, die der laufende Scheduler live lesen soll
  const live = useRef({ bpm, swing, achtelKlick })
  useEffect(() => {
    live.current = { bpm, swing, achtelKlick }
  }, [bpm, swing, achtelKlick])

  useEffect(() => {
    if (!laeuft) return
    const ctx = getCtx()
    let naechsteZeit = ctx.currentTime + 0.05
    let slot = 0
    const warteschlange: { slot: number; zeit: number }[] = []

    const planen = () => {
      while (naechsteZeit < ctx.currentTime + 0.1) {
        const { bpm: b, swing: s, achtelKlick: a } = live.current
        if (slot === 0) klick(ctx, naechsteZeit, 1600, 0.6)
        else if (slot % 2 === 0) klick(ctx, naechsteZeit, 1000, 0.4)
        else if (a) klick(ctx, naechsteZeit, 700, 0.15)
        warteschlange.push({ slot, zeit: naechsteZeit })
        const viertel = 60 / b
        const erstesAchtel = s ? (viertel * 2) / 3 : viertel / 2
        naechsteZeit += slot % 2 === 0 ? erstesAchtel : viertel - erstesAchtel
        slot = (slot + 1) % 8
      }
    }

    let frame = 0
    const zeichnen = () => {
      let neu = -1
      while (warteschlange.length && warteschlange[0].zeit <= ctx.currentTime) {
        neu = warteschlange.shift()!.slot
      }
      if (neu >= 0) setAktiv(neu)
      frame = requestAnimationFrame(zeichnen)
    }

    planen()
    const takt = starteTakt(planen)
    frame = requestAnimationFrame(zeichnen)
    return () => {
      takt()
      cancelAnimationFrame(frame)
      setAktiv(-1)
    }
  }, [laeuft, getCtx])

  const muster = MUSTER.find(m => m.id === musterId) ?? MUSTER[0]

  return (
    <div className="card">
      <h3 className="wz-titel">🥁 Metronom und Schlagmuster</h3>
      <p className="ub-desc">
        Klick auf der 1 ist höher. Lies das Muster mit, während du spielst – die Hand pendelt immer
        durch, auch bei Luftschlägen (–).
      </p>

      <div className="wz-bpm">
        <button type="button" className="filter-btn" onClick={() => setBpm(Math.max(MIN_BPM, bpm - 5))} aria-label="5 BPM langsamer">
          −5
        </button>
        <output className="wz-bpm-zahl" aria-live="polite">
          {bpm} <span>BPM</span>
        </output>
        <button type="button" className="filter-btn" onClick={() => setBpm(Math.min(MAX_BPM, bpm + 5))} aria-label="5 BPM schneller">
          +5
        </button>
      </div>
      <input
        type="range"
        className="wz-slider"
        min={MIN_BPM}
        max={MAX_BPM}
        value={bpm}
        onChange={e => setBpm(Number(e.target.value))}
        aria-label="Tempo in BPM"
      />
      <div className="filter-row">
        <button type="button" className={`filter-btn${bpm === UEBE_BPM ? ' on' : ''}`} onClick={() => setBpm(UEBE_BPM)}>
          Übetempo {UEBE_BPM}
        </button>
        <button type="button" className={`filter-btn${bpm === ORIGINAL_BPM ? ' on' : ''}`} onClick={() => setBpm(ORIGINAL_BPM)}>
          Go K.K. Rider {ORIGINAL_BPM}
        </button>
      </div>

      <div className="filter-row">
        {MUSTER.map(m => (
          <button
            key={m.id}
            type="button"
            className={`filter-btn${m.id === musterId ? ' on' : ''}`}
            onClick={() => setMusterId(m.id)}
          >
            {m.name}
          </button>
        ))}
      </div>

      <div className="wz-muster" aria-label={`Schlagmuster ${muster.name}`}>
        {muster.slots.map((s, i) => (
          <div key={i} className={`wz-slot${aktiv === i ? ' aktiv' : ''}${s === '' ? ' leer' : ''}`}>
            <span className="wz-slot-symbol">{SYMBOL[s]}</span>
            <span className="wz-slot-zaehl">{ZAEHLZEIT[i]}</span>
          </div>
        ))}
      </div>

      <div className="wz-optionen">
        <label>
          <input type="checkbox" checked={swing} onChange={e => setSwing(e.target.checked)} /> Swing (lang-kurz)
        </label>
        <label>
          <input type="checkbox" checked={achtelKlick} onChange={e => setAchtelKlick(e.target.checked)} /> „und" leise mitklicken
        </label>
      </div>

      <button type="button" className={`wz-start${laeuft ? ' stop' : ''}`} onClick={() => setLaeuft(l => !l)}>
        {laeuft ? '■ Stopp' : '▶ Start'}
      </button>
    </div>
  )
}

function TempoTippen({ onUebernehmen }: { onUebernehmen: (bpm: number) => void }) {
  const [taps, setTaps] = useState<number[]>([])

  const tippen = () => {
    const jetzt = performance.now()
    setTaps(prev => {
      // Nach 2 s Pause neu beginnen, sonst die letzten 8 Taps mitteln
      const basis = prev.length && jetzt - prev[prev.length - 1] > 2000 ? [] : prev
      return [...basis, jetzt].slice(-9)
    })
  }

  const bpm =
    taps.length >= 2 ? Math.round((60000 * (taps.length - 1)) / (taps[taps.length - 1] - taps[0])) : null

  return (
    <div className="card">
      <h3 className="wz-titel">👆 Tempo tippen</h3>
      <p className="ub-desc">
        Lass den Song laufen und tippe im Takt auf den Knopf (mindestens 8×). Nach 2 Sekunden Pause
        beginnt die Messung neu.
      </p>
      <div className="wz-tap-reihe">
        <button type="button" className="wz-tap" onClick={tippen}>
          Tippen
        </button>
        <div className="wz-tap-ergebnis">
          <output className="wz-bpm-zahl">
            {bpm ?? '–'} <span>BPM</span>
          </output>
          <span className="ub-desc">{taps.length} Taps</span>
        </div>
      </div>
      {bpm && (
        <div className="filter-row" style={{ marginTop: '0.75rem' }}>
          <button type="button" className="filter-btn" onClick={() => onUebernehmen(Math.min(MAX_BPM, Math.max(MIN_BPM, bpm)))}>
            Ins Metronom übernehmen
          </button>
          <button
            type="button"
            className="filter-btn"
            onClick={() => onUebernehmen(Math.min(MAX_BPM, Math.max(MIN_BPM, Math.round(bpm * 0.6))))}
          >
            Übetempo (60 %) übernehmen
          </button>
          <button type="button" className="filter-btn" onClick={() => setTaps([])}>
            Zurücksetzen
          </button>
        </div>
      )}
    </div>
  )
}

function Stimmtoene() {
  const getCtx = useAudioContext()

  const zupfen = (hz: number) => {
    const ctx = getCtx()
    const t = ctx.currentTime
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(0.35, t + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 3)
    gain.connect(ctx.destination)
    // Grundton + leise Obertöne, damit tiefe Saiten auch auf Handy-Lautsprechern hörbar sind
    ;[1, 2, 3].forEach((h, i) => {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = i === 0 ? 'triangle' : 'sine'
      osc.frequency.value = hz * h
      g.gain.value = [1, 0.5, 0.25][i]
      osc.connect(g).connect(gain)
      osc.start(t)
      osc.stop(t + 3)
    })
  }

  return (
    <div className="card">
      <h3 className="wz-titel">🎵 Stimmtöne (ohne Mikrofon)</h3>
      <p className="ub-desc">
        Tipp auf eine Saite, schlag dieselbe Saite auf der Gitarre an und dreh am Wirbel, bis kein
        „Wabern" (Schwebung) mehr zu hören ist. Für mehr Genauigkeit: Stimmgerät oder Stimm-App.
      </p>
      <div className="wz-saiten">
        {SAITEN.map(s => (
          <button key={s.nr} type="button" className="wz-saite" onClick={() => zupfen(s.hz)}>
            <span className="wz-saite-name">{s.name}</span>
            <span className="wz-saite-info">
              Saite {s.nr} · {s.hz.toFixed(1)} Hz
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Werkzeuge() {
  const [bpm, setBpm] = useState(UEBE_BPM)
  return (
    <div>
      <div className="section-header">
        <h2>Werkzeuge</h2>
        <p>Alles zum Üben direkt im Browser. Ton an!</p>
      </div>
      <Metronom bpm={bpm} setBpm={setBpm} />
      <TempoTippen onUebernehmen={setBpm} />
      <Stimmgeraet />
      <Stimmtoene />
    </div>
  )
}
