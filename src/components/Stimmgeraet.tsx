import { useEffect, useRef, useState } from 'react'
import { SAITEN, centAbstand, erkenneFrequenz, median, naechsteNote, naechsteSaite, type Saite } from '../lib/tonhoehe'

// Stimmgerät über das Mikrofon. Der Browser fragt beim Start nach der Erlaubnis;
// das Signal wird nur lokal analysiert (lib/tonhoehe.ts) und nirgendwohin gesendet.
// Das Mikrofon wird freigegeben bei „Stopp", beim Verlassen des Tabs (Unmount)
// und wenn die Seite in den Hintergrund geht.

type Status = 'aus' | 'startet' | 'an' | 'fehler'

interface Anzeige {
  hz: number
  note: string
  saite: Saite
  cent: number
}

const PUFFER = 4096
const GLAETTUNG = 7 // Median über so viele Messungen (≈ 0,35 s)
const HALTEN_MS = 1500 // so lange bleibt die letzte Anzeige nach dem Ausklingen stehen
const GESTIMMT_CENT = 5
const MESS_INTERVALL_MS = 50 // 20 Messungen pro Sekunde

function fehlerText(e: unknown): string {
  const name = e instanceof DOMException ? e.name : ''
  if (name === 'NotAllowedError' || name === 'SecurityError')
    return 'Der Mikrofon-Zugriff wurde nicht erlaubt. Du kannst ihn in den Browser-Einstellungen für diese Seite freigeben und es dann erneut versuchen.'
  if (name === 'NotFoundError' || name === 'OverconstrainedError') return 'Es wurde kein Mikrofon gefunden.'
  if (name === 'NotReadableError') return 'Das Mikrofon wird gerade von einem anderen Programm benutzt.'
  return 'Das Mikrofon konnte nicht gestartet werden.'
}

export default function Stimmgeraet() {
  const [status, setStatus] = useState<Status>('aus')
  const [fehler, setFehler] = useState('')
  const [modus, setModus] = useState<number | 'auto'>('auto')
  const [anzeige, setAnzeige] = useState<Anzeige | null>(null)
  const stoppen = useRef<() => void>(() => {})
  const modusRef = useRef(modus)
  useEffect(() => {
    modusRef.current = modus
  }, [modus])

  const stopp = () => {
    stoppen.current()
    stoppen.current = () => {}
    setStatus('aus')
    setAnzeige(null)
  }

  const start = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setFehler('Dieser Browser erlaubt hier keinen Mikrofon-Zugriff (nur über HTTPS möglich).')
      setStatus('fehler')
      return
    }
    setFehler('')
    setStatus('startet')
    let stream: MediaStream
    try {
      // Sprach-Filter aus: Rauschunterdrückung & Co. „glätten" sonst Gitarrentöne weg
      stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      })
    } catch (e) {
      setFehler(fehlerText(e))
      setStatus('fehler')
      return
    }

    const ctx = new AudioContext()
    // Entsteht erst nach dem Warten auf die Erlaubnis – manche Browser starten ihn
    // dann pausiert. Ein pausierter Kontext liefert dem Analyser nur Stille.
    if (ctx.state === 'suspended') await ctx.resume().catch(() => {})
    const quelle = ctx.createMediaStreamSource(stream)
    const analyser = ctx.createAnalyser()
    analyser.fftSize = PUFFER
    quelle.connect(analyser)
    const puffer = new Float32Array(PUFFER)
    const verlauf: number[] = []
    let zuletztTon = 0

    const messen = () => {
      analyser.getFloatTimeDomainData(puffer)
      const hz = erkenneFrequenz(puffer, ctx.sampleRate)
      const jetzt = performance.now()
      if (hz) {
        // Springt der Ton um mehr als einen Halbton (andere Saite), Verlauf neu beginnen
        if (verlauf.length && Math.abs(centAbstand(hz, median(verlauf))) > 100) verlauf.length = 0
        verlauf.push(hz)
        if (verlauf.length > GLAETTUNG) verlauf.shift()
        const f = median(verlauf)
        const m = modusRef.current
        const ziel = m === 'auto' ? naechsteSaite(f) : { saite: SAITEN.find(s => s.nr === m)!, cent: 0 }
        const note = naechsteNote(f)
        setAnzeige({
          hz: f,
          note: `${note.name}${note.oktave}`,
          saite: ziel.saite,
          cent: m === 'auto' ? ziel.cent : centAbstand(f, ziel.saite.hz),
        })
        zuletztTon = jetzt
      } else if (zuletztTon && jetzt - zuletztTon > HALTEN_MS) {
        verlauf.length = 0
        zuletztTon = 0
        setAnzeige(null)
      }
    }
    const timer = window.setInterval(messen, MESS_INTERVALL_MS)

    stoppen.current = () => {
      window.clearInterval(timer)
      stream.getTracks().forEach(t => t.stop())
      void ctx.close()
    }
    setStatus('an')
  }

  // Mikrofon freigeben beim Verlassen des Tabs und wenn die Seite in den Hintergrund geht
  useEffect(() => {
    const beiVersteckt = () => {
      if (document.hidden) {
        stoppen.current()
        stoppen.current = () => {}
        setStatus('aus')
        setAnzeige(null)
      }
    }
    document.addEventListener('visibilitychange', beiVersteckt)
    return () => {
      document.removeEventListener('visibilitychange', beiVersteckt)
      stoppen.current()
    }
  }, [])

  const cent = anzeige?.cent ?? 0
  const gestimmt = anzeige !== null && Math.abs(cent) <= GESTIMMT_CENT
  const winkel = Math.max(-50, Math.min(50, cent)) * 0.9 // ±50 Cent → ±45°
  let hinweis = 'Schlag eine einzelne Saite an und lass sie ausklingen.'
  if (anzeige) {
    if (gestimmt) hinweis = '✓ Gestimmt!'
    else if (cent < -50) hinweis = 'Viel zu tief – Saite deutlich fester spannen.'
    else if (cent > 50) hinweis = 'Viel zu hoch – Saite deutlich lockern.'
    else if (cent < 0) hinweis = 'Zu tief – Saite etwas fester spannen.'
    else hinweis = 'Zu hoch – Saite etwas lockern.'
  }

  return (
    <div className="card">
      <h3 className="wz-titel">🎙️ Stimmgerät</h3>
      <p className="ub-desc">
        Nutzt das Mikrofon deines Geräts – der Ton wird nur hier im Browser ausgewertet und nirgendwohin
        gesendet. Stimme <b>ohne Kapodaster</b>, in ruhiger Umgebung und nah am Mikrofon.
      </p>

      <div className="filter-row">
        <button type="button" className={`filter-btn${modus === 'auto' ? ' on' : ''}`} onClick={() => setModus('auto')}>
          Automatisch
        </button>
        {SAITEN.map(s => (
          <button
            key={s.nr}
            type="button"
            className={`filter-btn${modus === s.nr ? ' on' : ''}`}
            onClick={() => setModus(s.nr)}
            aria-label={`Saite ${s.nr} (${s.name}) fest wählen`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {status === 'an' && (
        <div className={`sg-anzeige${gestimmt ? ' gestimmt' : ''}`} aria-live="polite">
          <div className="sg-note">
            {anzeige ? anzeige.saite.name : '–'}
            <span className="sg-saite">{anzeige ? `Saite ${anzeige.saite.nr} · Soll ${anzeige.saite.hz.toFixed(1)} Hz` : ' '}</span>
          </div>
          <svg viewBox="0 0 200 112" className="sg-skala" role="img" aria-label={anzeige ? `${Math.round(cent)} Cent` : 'kein Ton'}>
            <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" className="sg-bogen" strokeWidth="8" strokeLinecap="round" />
            {/* grüner Bereich ±5 Cent */}
            <path d="M 93.7 20.2 A 80 80 0 0 1 106.3 20.2" fill="none" className="sg-bogen-ok" strokeWidth="8" />
            {[-50, -25, 0, 25, 50].map(c => {
              const w = ((c * 0.9 - 90) * Math.PI) / 180
              return (
                <text key={c} x={100 + 96 * Math.cos(w)} y={104 + 96 * Math.sin(w)} textAnchor="middle" className="sg-marke">
                  {c > 0 ? `+${c}` : c}
                </text>
              )
            })}
            <g transform={`rotate(${anzeige ? winkel : 0} 100 100)`} className="sg-nadel-gruppe">
              <line x1="100" y1="100" x2="100" y2="28" className={`sg-nadel${anzeige ? '' : ' leer'}`} strokeWidth="3" strokeLinecap="round" />
            </g>
            <circle cx="100" cy="100" r="6" className="sg-achse" />
          </svg>
          <p className="sg-hinweis">{hinweis}</p>
          <p className="sg-details">
            {anzeige
              ? `${anzeige.hz.toFixed(1)} Hz · ${cent > 0 ? '+' : ''}${cent.toFixed(0)} Cent · Ton ${anzeige.note}`
              : 'Warte auf einen Ton …'}
          </p>
        </div>
      )}

      {status === 'fehler' && <p className="tipp-block sg-fehler">{fehler}</p>}

      {status === 'an' ? (
        <button type="button" className="wz-start stop" onClick={stopp}>
          ■ Stimmgerät stoppen
        </button>
      ) : (
        <button type="button" className="wz-start" onClick={() => void start()} disabled={status === 'startet'}>
          {status === 'startet' ? 'Warte auf Mikrofon-Erlaubnis …' : '🎙️ Stimmgerät starten'}
        </button>
      )}
    </div>
  )
}
