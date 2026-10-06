import type { Lied, Takt } from '../songblatt'
import { AKKORDBLATT_URL, ORIGINAL_BPM, UEBE_BPM } from '../song'

// Go K.K. Rider (© Nintendo), Takt für Takt. Akkorde nach der Transkription von
// „HerNameIsRain" auf Ultimate Guitar. Kapo-Griffe: Teil 1 −4, Teil 2 −5 Halbtöne.
// Die Taktaufteilung (1 Zeile im Blatt = 1 Takt) passt zur 20-taktigen Melodie
// Intro 4 + Strophe 8 + Refrain 8.

const INTRO: Takt[] = [['G#m'], ['F#'], ['E'], ['D#7']]
const STROPHE_1: Takt[] = [['G#m'], ['F#'], ['E', 'F#'], ['B'], ['A'], ['G#m'], ['C#m', 'D#7'], ['G#m']]
// Takt 5: G#m G#7 – fehlt im UG-Blatt in Teil 1, steht dort aber im höheren Refrain (Am A7)
// und in zwei unabhängigen Transkriptionen (Gametabs, Ukulele-Tabs).
const REFRAIN_1: Takt[] = [['F#', 'F#'], ['B', 'B'], ['C#m'], ['D#7'], ['G#m', 'G#7'], ['C#m'], ['F#', 'D#7'], ['G#m']]
const STROPHE_2: Takt[] = [['Am'], ['G'], ['F', 'G'], ['C'], ['A#'], ['Am'], ['Dm', 'E7'], ['Am']]
const REFRAIN_2: Takt[] = [['G', 'G'], ['C', 'C'], ['Dm'], ['E7'], ['Am', 'A7'], ['Dm'], ['G', 'E7'], ['Am']]

const TIPP_STROPHE_KAPO =
  'Takt 3 und 7 haben zwei Akkorde (Wechsel auf die 3). Takt 5 ist das kleine F – schon in Takt 4 (G) vorbereiten. Takt 7 → 8: B7 → Em mit liegendem Mittelfinger.'
const TIPP_STROPHE_ORIGINAL =
  'Barré-Marathon: G♯m (Em-Form, 4. Bund) → F♯ (E-Form, 2. Bund) – gleiche Handform, bei F♯ kommt nur der Mittelfinger auf der G-Saite dazu, und alles rutscht zwei Bünde tiefer. Bei B und C♯m die tiefe E-Saite abdämpfen.'
const TIPP_REFRAIN_KAPO =
  'Doppelte Akkorde (D D, G G) = ein Takt, auf der 3 kräftig neu anschlagen – das gibt dem Refrain Schwung. Takt 5: Em → E7 (Mittelfinger bleibt, Ringfinger weg, Zeigefinger auf die G-Saite im 1. Bund) – E7 zieht nach Am. Takt 7: D → B7 → Em.'
const TIPP_REFRAIN_ORIGINAL =
  'F♯ und B liegen beide im 2. Bund (E-Form bzw. A-Form) – der Zeigefinger bleibt als Barré liegen. Takt 5: G♯m → G♯7 (E7-Form im 4. Bund): Barré bleibt, kleiner Finger weg von der D-Saite, Mittelfinger auf die G-Saite im 5. Bund.'
const UNSICHER_REFRAIN =
  'Takt 5 (Em → E7 bzw. G♯m → G♯7) ist gegenüber dem Ultimate-Guitar-Blatt ergänzt: Andere Transkriptionen und der höhere Refrain des Blatts selbst haben dort den Wechsel. Eine Transkription hat in Takt 2 G♯m statt B – im Zweifel nach Gehör entscheiden.'

export const GO_KK_RIDER: Lied = {
  id: 'go-kk-rider',
  titel: 'Go K.K. Rider',
  lernIntro:
    'In fünf Schritten mit Kapodaster im 4. Bund vom Stimmen bis zum ganzen Song – plus ein Bonus-Schritt für die Original-Griffe mit Barré. Fang hier an, wenn du neu bist: Die Grundlagen gelten auch für K.K. Cruisin\'.',
  bpm: ORIGINAL_BPM,
  uebeBpm: UEBE_BPM,
  tempi: [UEBE_BPM, 90, 120, ORIGINAL_BPM],
  kapo: { 1: 4, 2: 5 },
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
      tippKapo: 'Ein Akkord pro Takt: Em – D – C – B7. K.K. pfeift dazu – spiel ruhig und gleichmäßig, noch nicht zu laut.',
      tippOriginal: 'G♯m – F♯ – E – D♯7: gleich zu Beginn zwei Barrés. E ist offen – kurze Erholung für den Zeigefinger.',
    },
    { id: 'strophe-1', name: 'Strophe', teil: 1, takte: STROPHE_1, tippKapo: TIPP_STROPHE_KAPO, tippOriginal: TIPP_STROPHE_ORIGINAL },
    { id: 'refrain-1', name: 'Refrain', teil: 1, takte: REFRAIN_1, tippKapo: TIPP_REFRAIN_KAPO, tippOriginal: TIPP_REFRAIN_ORIGINAL, unsicher: UNSICHER_REFRAIN },
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
      vorherOriginal: 'Tonartwechsel: ab hier einen Halbton höher (A-Moll).',
      tippKapo: 'Gleiche Griffe wie die erste Strophe, nur mit Kapo im 5. Bund.',
      tippOriginal: 'Ab hier fast nur offene Griffe: Am, G, C, Dm, E7. Nur F (Takt 3) und A♯ (Takt 5) sind Barrés.',
    },
    {
      id: 'refrain-hoch',
      name: 'Refrain (einen Halbton höher)',
      teil: 2,
      takte: REFRAIN_2,
      tippKapo: 'Gleiche Griffe wie der erste Refrain, nur mit Kapo im 5. Bund. Letzter Akkord Em: ausklingen lassen. 🎸',
      tippOriginal: 'Takt 5: Am → A7 – G-Saite wird offen, die H-Saite rutscht in den 2. Bund. Letzter Akkord Am: ausklingen lassen. 🎸',
    },
  ],
}
