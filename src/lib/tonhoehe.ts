// Tonhöhen-Erkennung für das Stimmgerät (reines TypeScript, ohne DOM – daher
// auch mit künstlichen Signalen testbar).
//
// Verfahren: YIN (de Cheveigné & Kawahara, 2002). Für jede Verschiebung τ wird
// gemessen, wie stark das Signal sich selbst ähnelt; die kleinste Verschiebung
// mit ausreichender Ähnlichkeit ist die Periodendauer. YIN verwechselt deutlich
// seltener als eine reine Autokorrelation den Grundton mit seiner Oktave – wichtig
// bei der tiefen E-Saite, deren Obertöne oft lauter sind als der Grundton.

export const MIN_HZ = 70 // etwas unter der tiefen E-Saite (82,4 Hz)
export const MAX_HZ = 1000

/** Mindestlautstärke (RMS); darunter gilt das Signal als Stille. */
const RMS_SCHWELLE = 0.008
/** YIN-Schwelle: je kleiner, desto strenger (weniger Fehlerkennungen, eher „kein Ton"). */
const YIN_SCHWELLE = 0.15

/**
 * Ermittelt die Grundfrequenz in Hz oder `null`, wenn kein klarer Ton erkannt wird.
 * `puffer` braucht mindestens 2 × (sampleRate / MIN_HZ) Werte (bei 48 kHz ≈ 1400).
 */
export function erkenneFrequenz(puffer: Float32Array, sampleRate: number): number | null {
  let summe = 0
  for (let i = 0; i < puffer.length; i++) summe += puffer[i] * puffer[i]
  if (Math.sqrt(summe / puffer.length) < RMS_SCHWELLE) return null

  const tauMin = Math.floor(sampleRate / MAX_HZ)
  const tauMax = Math.min(Math.ceil(sampleRate / MIN_HZ), Math.floor(puffer.length / 2))
  const fenster = puffer.length - tauMax
  if (tauMax <= tauMin + 2 || fenster <= 0) return null

  // Differenzfunktion d(τ) und kumulativ normierte Variante d'(τ)
  const d = new Float32Array(tauMax + 1)
  for (let tau = 1; tau <= tauMax; tau++) {
    let s = 0
    for (let j = 0; j < fenster; j++) {
      const diff = puffer[j] - puffer[j + tau]
      s += diff * diff
    }
    d[tau] = s
  }
  const dn = new Float32Array(tauMax + 1)
  dn[0] = 1
  let laufend = 0
  for (let tau = 1; tau <= tauMax; tau++) {
    laufend += d[tau]
    dn[tau] = laufend === 0 ? 1 : (d[tau] * tau) / laufend
  }

  // Erste Verschiebung unter der Schwelle, dann bis zum lokalen Minimum weiter
  let tau = -1
  for (let t = tauMin; t <= tauMax; t++) {
    if (dn[t] < YIN_SCHWELLE) {
      while (t + 1 <= tauMax && dn[t + 1] < dn[t]) t++
      tau = t
      break
    }
  }
  if (tau < 0) return null

  // Parabel durch die Nachbarpunkte → Periodendauer mit Bruchteil-Genauigkeit
  let genau = tau
  if (tau > 1 && tau < tauMax) {
    const a = dn[tau - 1]
    const b = dn[tau]
    const c = dn[tau + 1]
    const nenner = a + c - 2 * b
    if (nenner !== 0) genau = tau + (a - c) / (2 * nenner)
  }
  const hz = sampleRate / genau
  return hz >= MIN_HZ && hz <= MAX_HZ ? hz : null
}

// ── Noten und Saiten ─────────────────────────────────────────────────────

const NOTENNAMEN = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'H']

/** Abstand in Cent (1/100 Halbton) von `hz` zu `ziel`. Positiv = zu hoch. */
export const centAbstand = (hz: number, ziel: number) => 1200 * Math.log2(hz / ziel)

/** Nächstgelegene Note (chromatisch, A = 440 Hz). */
export function naechsteNote(hz: number): { name: string; oktave: number; zielHz: number; cent: number } {
  const midi = Math.round(69 + 12 * Math.log2(hz / 440))
  const zielHz = 440 * 2 ** ((midi - 69) / 12)
  return { name: NOTENNAMEN[midi % 12], oktave: Math.floor(midi / 12) - 1, zielHz, cent: centAbstand(hz, zielHz) }
}

export interface Saite {
  nr: number
  name: string
  hz: number
}

/** Standardstimmung, tiefe E-Saite zuerst. */
export const SAITEN: Saite[] = [
  { nr: 6, name: 'E', hz: 82.41 },
  { nr: 5, name: 'A', hz: 110.0 },
  { nr: 4, name: 'D', hz: 146.83 },
  { nr: 3, name: 'G', hz: 196.0 },
  { nr: 2, name: 'H', hz: 246.94 },
  { nr: 1, name: 'e', hz: 329.63 },
]

/** Die Saite, deren Sollton `hz` am nächsten liegt (gemessen in Cent). */
export function naechsteSaite(hz: number): { saite: Saite; cent: number } {
  let beste = SAITEN[0]
  let besterCent = centAbstand(hz, beste.hz)
  for (const s of SAITEN.slice(1)) {
    const c = centAbstand(hz, s.hz)
    if (Math.abs(c) < Math.abs(besterCent)) {
      beste = s
      besterCent = c
    }
  }
  return { saite: beste, cent: besterCent }
}

/** Median – glättet einzelne Ausreißer (z.B. kurz erkannte Oktave) weg. */
export function median(werte: number[]): number {
  const s = [...werte].sort((a, b) => a - b)
  const m = Math.floor(s.length / 2)
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}
