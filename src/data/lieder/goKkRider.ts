import type { Lied, Takt } from '../songblatt'
import { AKKORDBLATT_URL, ORIGINAL_BPM, UEBE_BPM } from '../song'

// Go K.K. Rider (© Nintendo), Takt für Takt in den Original-Akkorden (ohne Kapodaster).
// Akkorde nach der Transkription von „HerNameIsRain" auf Ultimate Guitar.
// Die Taktaufteilung (1 Zeile im Blatt = 1 Takt) passt zur 20-taktigen Melodie
// Intro 4 + Strophe 8 + Refrain 8.

const INTRO: Takt[] = [['G#m'], ['F#'], ['E'], ['D#7']]
const STROPHE_1: Takt[] = [['G#m'], ['F#'], ['E', 'F#'], ['B'], ['A'], ['G#m'], ['C#m', 'D#7'], ['G#m']]
// Takt 5: G#m G#7 – fehlt im UG-Blatt in Teil 1, steht dort aber im höheren Refrain (Am A7)
// und in zwei unabhängigen Transkriptionen (Gametabs, Ukulele-Tabs).
const REFRAIN_1: Takt[] = [['F#', 'F#'], ['B', 'B'], ['C#m'], ['D#7'], ['G#m', 'G#7'], ['C#m'], ['F#', 'D#7'], ['G#m']]
const STROPHE_2: Takt[] = [['Am'], ['G'], ['F', 'G'], ['C'], ['A#'], ['Am'], ['Dm', 'E7'], ['Am']]
const REFRAIN_2: Takt[] = [['G', 'G'], ['C', 'C'], ['Dm'], ['E7'], ['Am', 'A7'], ['Dm'], ['G', 'E7'], ['Am']]

const TIPP_STROPHE =
  'Takt 3 und 7 haben zwei Akkorde (Wechsel auf die 3). Takt 3: E und F♯ sind dieselbe Form – einmal offen, einmal mit Barré im 2. Bund. Takt 4 → 5: B → A, die A-Form rutscht zwei Bünde tiefer an den Sattel. Takt 6 → 7: G♯m → C♯m – beide im 4. Bund, der Zeigefinger bleibt als Barré liegen. Takt 7 → 8: D♯7 → G♯m, der häufigste Wechsel im Song.'
const TIPP_REFRAIN =
  'F♯ F♯ und B B = ein Takt, auf der 3 kräftig neu anschlagen. F♯ → B: beide im 2. Bund (E-Form → A-Form), das Barré bleibt liegen. B → C♯m: die Form wird zur Am-Form und rutscht in den 4. Bund. Takt 5: G♯m → G♯7 – Barré bleibt, kleiner Finger weg, Mittelfinger auf die G-Saite im 5. Bund; danach bleibt das Barré für C♯m im 4. Bund. Takt 7: F♯ → D♯7 → G♯m.'
const UNSICHER_REFRAIN =
  'Takt 5 (G♯m → G♯7) ist gegenüber dem Ultimate-Guitar-Blatt ergänzt: Andere Transkriptionen und der höhere Refrain des Blatts selbst haben dort den Wechsel. Eine Transkription hat in Takt 2 G♯m statt B – im Zweifel nach Gehör entscheiden.'

export const GO_KK_RIDER: Lied = {
  id: 'go-kk-rider',
  titel: 'Go K.K. Rider',
  lernIntro:
    "In sechs Schritten vom Stimmen bis zum ganzen Song – mit den echten Griffen, ganz ohne Kapodaster: erst die offenen Griffe und der Rhythmus, dann die Barré-Griffe des Originals. Fang hier an, wenn du neu bist: Die Grundlagen gelten auch für K.K. Cruisin'.",
  rechte: 'Song © Nintendo',
  bpm: ORIGINAL_BPM,
  uebeBpm: UEBE_BPM,
  tempi: [UEBE_BPM, 90, 120, ORIGINAL_BPM],
  quelle: {
    autor: 'HerNameIsRain',
    url: AKKORDBLATT_URL,
    zusatz: 'Refrain-Takt 5 (G♯m → G♯7) nach Gametabs/Ukulele-Tabs ergänzt.',
  },
  abschnitte: [
    {
      id: 'intro',
      name: 'Intro',
      teil: 1,
      takte: INTRO,
      tipp: 'Ein Akkord pro Takt: G♯m – F♯ – E – D♯7. G♯m → F♯ ist fast dieselbe Handform: Mittelfinger auf die G-Saite dazu und alles zwei Bünde tiefer. E ist offen – kurze Erholung für den Zeigefinger. K.K. pfeift dazu: ruhig und gleichmäßig spielen, noch nicht zu laut.',
    },
    { id: 'strophe-1', name: 'Strophe', teil: 1, takte: STROPHE_1, tipp: TIPP_STROPHE },
    { id: 'refrain-1', name: 'Refrain', teil: 1, takte: REFRAIN_1, tipp: TIPP_REFRAIN, unsicher: UNSICHER_REFRAIN },
    { id: 'zwischenspiel', name: 'Zwischenspiel', teil: 1, takte: INTRO, tipp: 'Genau wie das Intro – kurz durchatmen, Greifhand locker lassen.' },
    { id: 'strophe-2', name: 'Strophe', teil: 1, takte: STROPHE_1, tipp: 'Wie die erste Strophe.' },
    { id: 'refrain-2', name: 'Refrain', teil: 1, takte: REFRAIN_1, tipp: 'Wie der erste Refrain.' },
    {
      id: 'bridge',
      name: 'Bridge',
      teil: 1,
      takte: [['F#'], ['C#m'], ['D#7']],
      tipp: 'F♯ – C♯m – D♯7: Die Spannung von D♯7 löst sich erst in der nächsten Strophe nach G♯m auf.',
      unsicher: 'Im Akkordblatt stehen 3 Zeilen – ob jeder Akkord genau einen Takt dauert, beim Hören mitzählen.',
    },
    {
      id: 'strophe-pfeifen',
      name: 'Strophe (mit Pfeifen)',
      teil: 1,
      takte: STROPHE_1,
      tipp: 'Wie die Strophe. Etwas leiser spielen, damit das Pfeifen durchkommt. Nach dem letzten Takt kommt der Tonartwechsel – ab dann wird es leichter.',
    },
    {
      id: 'strophe-hoch',
      name: 'Strophe (einen Halbton höher)',
      teil: 2,
      takte: STROPHE_2,
      vorher: 'Tonartwechsel: ab hier einen Halbton höher (A-Moll) – fast nur offene Griffe. Aus dem letzten G♯m (Barré, 4. Bund) wird direkt Am am Sattel.',
      tipp: 'Ab hier fast nur offene Griffe: Am, G, C, Dm, E7. Nur F (Takt 3) und A♯ (Takt 5) sind Barrés – F schon in Takt 2 vorbereiten.',
    },
    {
      id: 'refrain-hoch',
      name: 'Refrain (einen Halbton höher)',
      teil: 2,
      takte: REFRAIN_2,
      tipp: 'Takt 5: Am → A7 – G-Saite wird offen, die H-Saite rutscht in den 2. Bund. Takt 7: G → E7 → Am. Letzter Akkord Am: ausklingen lassen. 🎸',
    },
  ],
}
