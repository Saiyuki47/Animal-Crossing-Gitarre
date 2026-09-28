// Das komplette Akkordblatt von Go K.K. Rider (© Nintendo), Takt für Takt.
// Akkorde nach der Transkription von „HerNameIsRain" auf Ultimate Guitar
// (AKKORDBLATT_URL in data/song.ts). Gespeichert sind die ORIGINAL-Akkorde;
// die Kapo-Griffe werden daraus berechnet (Teil 1: −4 Halbtöne, Teil 2: −5).
//
// Ein Takt = ein Array: ein Akkord (ganzer Takt) oder zwei Akkorde (je 2 Schläge).
// Die Taktaufteilung (1 Zeile im Blatt = 1 Takt) passt zur 20-taktigen Melodie
// Intro 4 + Strophe 8 + Refrain 8.

export type Takt = [string] | [string, string]

export interface SongAbschnitt {
  id: string
  name: string
  /** 1 = G♯-Moll (Kapo 4), 2 = nach dem Tonartwechsel A-Moll (Kapo 5). */
  teil: 1 | 2
  takte: Takt[]
  tippKapo: string
  tippOriginal: string
  /** Hinweis, der VOR dem Abschnitt hervorgehoben wird (z.B. Kapo umsetzen). */
  vorher?: string
  unsicher?: string
}

const INTRO: Takt[] = [['G#m'], ['F#'], ['E'], ['D#7']]
const STROPHE_1: Takt[] = [['G#m'], ['F#'], ['E', 'F#'], ['B'], ['A'], ['G#m'], ['C#m', 'D#7'], ['G#m']]
const REFRAIN_1: Takt[] = [['F#', 'F#'], ['B', 'B'], ['C#m'], ['D#7'], ['G#m'], ['C#m'], ['F#', 'D#7'], ['G#m']]
const STROPHE_2: Takt[] = [['Am'], ['G'], ['F', 'G'], ['C'], ['A#'], ['Am'], ['Dm', 'E7'], ['Am']]
const REFRAIN_2: Takt[] = [['G', 'G'], ['C', 'C'], ['Dm'], ['E7'], ['Am', 'A7'], ['Dm'], ['G', 'E7'], ['Am']]

const TIPP_STROPHE_KAPO =
  'Takt 3 und 7 haben zwei Akkorde (Wechsel auf die 3). Takt 5 ist das kleine F – schon in Takt 4 (G) vorbereiten. Takt 7 → 8: B7 → Em mit liegendem Mittelfinger.'
const TIPP_STROPHE_ORIGINAL =
  'Barré-Marathon: G♯m (Em-Form, 4. Bund) → F♯ (E-Form, 2. Bund) – gleiche Handform, bei F♯ kommt nur der Mittelfinger auf der G-Saite dazu, und alles rutscht zwei Bünde tiefer. Bei B und C♯m die tiefe E-Saite abdämpfen.'
const TIPP_REFRAIN_KAPO =
  'Doppelte Akkorde (D D, G G) = ein Takt, auf der 3 kräftig neu anschlagen – das gibt dem Refrain Schwung. Takt 7: D (2 Schläge) → B7 (2 Schläge) → Em.'
const TIPP_REFRAIN_ORIGINAL =
  'F♯ und B liegen beide im 2. Bund (E-Form bzw. A-Form) – der Zeigefinger bleibt als Barré liegen, nur die anderen Finger wechseln.'

export const SONGBLATT: SongAbschnitt[] = [
  {
    id: 'intro',
    name: 'Intro',
    teil: 1,
    takte: INTRO,
    tippKapo: 'Ein Akkord pro Takt: Em – D – C – B7. K.K. pfeift dazu – spiel ruhig und gleichmäßig, noch nicht zu laut.',
    tippOriginal: 'G♯m – F♯ – E – D♯7: gleich zu Beginn zwei Barrés. E ist offen – kurze Erholung für den Zeigefinger.',
  },
  { id: 'strophe-1', name: 'Strophe', teil: 1, takte: STROPHE_1, tippKapo: TIPP_STROPHE_KAPO, tippOriginal: TIPP_STROPHE_ORIGINAL },
  { id: 'refrain-1', name: 'Refrain', teil: 1, takte: REFRAIN_1, tippKapo: TIPP_REFRAIN_KAPO, tippOriginal: TIPP_REFRAIN_ORIGINAL },
  {
    id: 'zwischenspiel',
    name: 'Zwischenspiel',
    teil: 1,
    takte: INTRO,
    tippKapo: 'Genau wie das Intro – kurz durchatmen, Hand locker lassen.',
    tippOriginal: 'Genau wie das Intro.',
  },
  { id: 'strophe-2', name: 'Strophe', teil: 1, takte: STROPHE_1, tippKapo: 'Wie die erste Strophe.', tippOriginal: 'Wie die erste Strophe.' },
  { id: 'refrain-2', name: 'Refrain', teil: 1, takte: REFRAIN_1, tippKapo: 'Wie der erste Refrain.', tippOriginal: 'Wie der erste Refrain.' },
  {
    id: 'bridge',
    name: 'Bridge',
    teil: 1,
    takte: [['F#'], ['C#m'], ['D#7']],
    tippKapo: 'D – Am – B7: Die Spannung von B7 löst sich erst in der nächsten Strophe nach Em auf.',
    tippOriginal: 'F♯ – C♯m – D♯7.',
    unsicher: 'Im Akkordblatt stehen 3 Zeilen – ob jeder Akkord genau einen Takt dauert, beim Hören mitzählen.',
  },
  {
    id: 'strophe-pfeifen',
    name: 'Strophe (mit Pfeifen)',
    teil: 1,
    takte: STROPHE_1,
    tippKapo: 'Wie die Strophe. Etwas leiser spielen, damit das Pfeifen durchkommt. Nach dem letzten Takt kommt der Tonartwechsel!',
    tippOriginal: 'Wie die Strophe – danach wird es leichter (A-Moll).',
  },
  {
    id: 'strophe-hoch',
    name: 'Strophe (einen Halbton höher)',
    teil: 2,
    takte: STROPHE_2,
    vorher: 'Tonartwechsel: Kapo vom 4. in den 5. Bund versetzen – danach dieselben Griffe wie vorher.',
    tippKapo: 'Gleiche Griffe wie die erste Strophe, nur mit Kapo im 5. Bund.',
    tippOriginal: 'Ab hier fast nur offene Griffe: Am, G, C, Dm, E7. Nur F (Takt 3) und A♯ (Takt 5) sind Barrés.',
  },
  {
    id: 'refrain-hoch',
    name: 'Refrain (einen Halbton höher)',
    teil: 2,
    takte: REFRAIN_2,
    tippKapo: 'Neu in Takt 5: Em (2 Schläge) → E7 (2 Schläge): Mittelfinger bleibt auf der A-Saite, Ringfinger weg von der D-Saite, Zeigefinger auf die G-Saite (1. Bund). Letzter Akkord Em: ausklingen lassen. 🎸',
    tippOriginal: 'Takt 5: Am → A7 – G-Saite wird offen, die H-Saite rutscht in den 2. Bund. Letzter Akkord Am: ausklingen lassen. 🎸',
  },
]

// ── Transponieren ────────────────────────────────────────────────────────

const TOENE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

function zerlege(akkord: string): { grund: number; rest: string } {
  const m = /^([A-G])(#|b)?(.*)$/.exec(akkord)
  if (!m) throw new Error(`Unbekannter Akkord: ${akkord}`)
  let grund = TOENE.indexOf(m[1])
  if (m[2] === '#') grund += 1
  if (m[2] === 'b') grund -= 1
  return { grund: (grund + 12) % 12, rest: m[3] }
}

/** Verschiebt einen Akkordnamen um `halbtoene` (negativ = tiefer), z.B. G#m −4 → Em. */
export function transponiere(akkord: string, halbtoene: number): string {
  const { grund, rest } = zerlege(akkord)
  return TOENE[(grund + halbtoene + 120) % 12] + rest
}

/** Kapo-Bund je Songteil. */
export const KAPO_BUND: Record<1 | 2, number> = { 1: 4, 2: 5 }

/** Anzeige mit ♯; „B" (englisch) bleibt B wie im Akkordblatt. */
export const anzeigeName = (akkord: string) => akkord.replace('#', '♯')

/** Akkordname → Akkord-ID in data/akkorde.ts (für die Griffbilder). */
const GRIFF_ID: Record<string, string> = {
  'G#m': 'Gism', 'F#': 'Fis', 'D#7': 'Dis7', B: 'H', 'C#m': 'Cism', 'A#': 'Ais',
  F: 'F', Em: 'Em', D: 'D', C: 'C', B7: 'B7', G: 'G', Am: 'Am', E: 'E', A: 'A', Dm: 'Dm', E7: 'E7', A7: 'A7',
}

/** Griff-ID für einen Akkord; mit Kapo wird F als kleines F gegriffen. */
export function griffId(akkord: string, mitKapo: boolean): string | undefined {
  if (mitKapo && akkord === 'F') return 'F-klein'
  return GRIFF_ID[akkord]
}

/** Akkord, wie er in der gewählten Ansicht gegriffen wird. */
export function gegriffen(akkord: string, teil: 1 | 2, mitKapo: boolean): string {
  return mitKapo ? transponiere(akkord, -KAPO_BUND[teil]) : akkord
}

export const TAKTE_GESAMT = SONGBLATT.reduce((n, a) => n + a.takte.length, 0)
