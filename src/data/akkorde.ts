// Griffbilder aller Akkorde der Lieder – immer die Original-Griffe, ohne
// Kapodaster. Reihenfolge der Saiten von der tiefen E-Saite (6) zur hohen e-Saite (1).
//
//   bund:      null = Saite nicht anschlagen (x), 0 = Leersaite (o), n = n-ter Bund
//   finger:    1 = Zeigefinger, 2 = Mittelfinger, 3 = Ringfinger, 4 = kleiner Finger
//   startBund: oberster gezeigter Bund (fehlt = 1, dann wird der Sattel gezeichnet)
//   barre:     Zeigefinger liegt quer über den Saiten `von`–`bis` (0 = tiefes E … 5 = hohes e)
//
// Gruppen:
//   'Offen'  – Griffe ohne Barré (meist mit Leersaiten), dazu die offenen Vorlagen der Barré-Formen
//   'Barré'  – der Zeigefinger liegt quer über mehreren Saiten und ersetzt den Sattel

export type AkkordGruppe = 'Offen' | 'Barré'

export interface Akkord {
  id: string
  name: string
  gruppe: AkkordGruppe
  bund: (number | null)[]
  finger: (number | null)[]
  startBund?: number
  barre?: { bund: number; von: number; bis: number }
  tipp?: string
}

export const akkorde: Akkord[] = [
  // ── Ohne Barré ──────────────────────────────────────────────────────────
  // Go K.K. Rider, erster Teil (G♯-Moll)
  { id: 'E', name: 'E', gruppe: 'Offen', bund: [0, 2, 2, 1, 0, 0], finger: [null, 2, 3, 1, null, null], tipp: 'Offener Griff aus Intro und Strophe – und die Vorlage der E-Form: dieselbe Form mit Barré ergibt F♯ und F.' },
  { id: 'A', name: 'A', gruppe: 'Offen', bund: [null, 0, 2, 2, 2, 0], finger: [null, null, 1, 2, 3, null], tipp: 'Offener Griff aus der Strophe – und die Vorlage der A-Form: mit Barré wird daraus B und A♯.' },
  { id: 'Dis7', name: 'D♯7', gruppe: 'Offen', bund: [null, null, 1, 3, 2, 3], finger: [null, null, 1, 3, 2, 4], tipp: 'Kein Barré, aber vier Finger und keine Leersaite: nur die vier hohen Saiten anschlagen. Führt fast immer nach G♯m.' },
  // Vorlagen für Barré-Formen
  { id: 'Em', name: 'Em', gruppe: 'Offen', bund: [0, 2, 2, 0, 0, 0], finger: [null, 2, 3, null, null, null], tipp: 'Grundakkord von Zombie, in 505 im Wechsel mit Dm – und die Vorlage der Em-Form: mit Ring- und kleinem Finger gegriffen und Barré im 4. Bund wird daraus G♯m, im 2. Bund F♯m.' },
  // Go K.K. Rider, Schluss nach dem Tonartwechsel (A-Moll)
  { id: 'Am', name: 'Am', gruppe: 'Offen', bund: [null, 0, 2, 2, 1, 0], finger: [null, null, 2, 3, 1, null], tipp: 'Grundakkord nach dem Tonartwechsel – und die Vorlage der Am-Form (C♯m, in 505 auch Dm und Em).' },
  { id: 'G', name: 'G', gruppe: 'Offen', bund: [3, 2, 0, 0, 0, 3], finger: [2, 1, null, null, null, 3], tipp: 'Go K.K. Rider (nach dem Tonartwechsel) und Zombie. Alle sechs Saiten klingen.' },
  { id: 'C', name: 'C', gruppe: 'Offen', bund: [null, 3, 2, 0, 1, 0], finger: [null, 3, 2, null, 1, null], tipp: 'Go K.K. Rider (nach dem Tonartwechsel) und Zombie. Tiefe E-Saite nicht anschlagen.' },
  { id: 'Dm', name: 'Dm', gruppe: 'Offen', bund: [null, null, 0, 2, 3, 1], finger: [null, null, null, 2, 3, 1], tipp: 'Nach dem Tonartwechsel und Grundakkord von 505. Nur die vier hohen Saiten anschlagen – die leere A-Saite darf mitklingen, ihr Ton A gehört zum Akkord.' },
  { id: 'E7', name: 'E7', gruppe: 'Offen', bund: [0, 2, 0, 1, 0, 0], finger: [null, 2, null, 1, null, null], tipp: 'Nach dem Tonartwechsel, führt nach Am. Vorlage der E7-Form (G♯7, A♭7, G♭7).' },
  { id: 'A7', name: 'A7', gruppe: 'Offen', bund: [null, 0, 2, 0, 2, 0], finger: [null, null, 1, null, 2, null], tipp: 'Kommt in beiden Liedern am Schluss vor. Vorlage der A7-Form (B♭7).' },
  // K.K. Cruisin'
  { id: 'B7', name: 'B7', gruppe: 'Offen', bund: [null, 2, 1, 2, 0, 2], finger: [null, 2, 1, 3, null, 4], tipp: "K.K. Cruisin': der häufigste Akkord des Songs. Die H-Saite bleibt offen – kein Finger darf sie berühren." },
  { id: 'C7', name: 'C7', gruppe: 'Offen', bund: [null, 3, 2, 3, 1, 0], finger: [null, 3, 2, 4, 1, null], tipp: 'C-Griff plus kleiner Finger auf der G-Saite im 3. Bund.' },
  { id: 'E7sus2', name: 'E7sus2', gruppe: 'Offen', bund: [0, 2, 0, 4, 0, 2], finger: [null, 1, null, 4, null, 2], tipp: 'Nach dem Tonartwechsel. Zeigefinger A-Saite, kleiner Finger G-Saite 4. Bund, Mittelfinger hohe e-Saite.' },
  { id: 'G7', name: 'G7', gruppe: 'Offen', bund: [3, 2, 0, 0, 0, 1], finger: [3, 2, null, null, null, 1], tipp: 'Führt zurück nach C7.' },
  // Zombie (dazu Em, C und G von oben)
  { id: 'D', name: 'D', gruppe: 'Offen', bund: [null, null, 0, 2, 3, 2], finger: [null, null, null, 1, 3, 2], tipp: 'Nur die vier hohen Saiten anschlagen. Von G aus rutscht der Ringfinger nur von der e- auf die H-Saite.' },
  { id: 'D-Fis', name: 'D/F♯', gruppe: 'Offen', bund: [2, null, 0, 2, 3, 2], finger: [1, null, null, 2, 4, 3], tipp: 'D mit F♯ im Bass: Zeigefinger auf der tiefen E-Saite (dämpft die A-Saite mit ab), darüber der D-Griff mit Mittel-, Ring- und kleinem Finger. Alternativ den Daumen über den Hals auf die tiefe E-Saite legen.' },
  { id: 'Cmaj7', name: 'Cmaj7', gruppe: 'Offen', bund: [null, 3, 2, 0, 0, 0], finger: [null, 3, 2, null, null, null], tipp: 'C ohne Zeigefinger: Die leere H-Saite macht den Klang weich und schwebend.' },
  // Blue Hair
  { id: 'Emaj7', name: 'Emaj7', gruppe: 'Offen', bund: [0, 2, 1, 1, 0, 0], finger: [null, 3, 1, 2, null, null], tipp: 'Grundakkord von Blue Hair: E-Dur, nur liegt der Ton auf der D-Saite einen Bund tiefer (D♯ statt E). Alle sechs Saiten klingen.' },
  { id: 'Amaj7', name: 'Amaj7', gruppe: 'Offen', bund: [null, 0, 2, 1, 2, 0], finger: [null, null, 2, 1, 3, null], tipp: 'Blue Hair, im Wechsel mit Emaj7. Tiefe E-Saite nicht anschlagen, Ringfinger steil aufsetzen, damit die hohe e-Saite frei klingt.' },

  // ── Barré ───────────────────────────────────────────────────────────────
  // Go K.K. Rider
  { id: 'Gism', name: 'G♯m', gruppe: 'Barré', bund: [4, 6, 6, 4, 4, 4], finger: [1, 3, 4, 1, 1, 1], startBund: 4, barre: { bund: 4, von: 0, bis: 5 }, tipp: 'Em-Form im 4. Bund – der Grundakkord von Go K.K. Rider. Zwischenschritt: nur die vier hohen Saiten anschlagen (xx6444).' },
  { id: 'Fis', name: 'F♯', gruppe: 'Barré', bund: [2, 4, 4, 3, 2, 2], finger: [1, 3, 4, 2, 1, 1], startBund: 2, barre: { bund: 2, von: 0, bis: 5 }, tipp: 'E-Form im 2. Bund – fast dieselbe Handform wie G♯m, nur mit Mittelfinger auf der G-Saite. Zwischenschritt: nur die vier hohen Saiten (xx4322).' },
  { id: 'H', name: 'B (H)', gruppe: 'Barré', bund: [null, 2, 4, 4, 4, 2], finger: [null, 1, 2, 3, 4, 1], startBund: 2, barre: { bund: 2, von: 1, bis: 5 }, tipp: 'A-Form im 2. Bund, tiefe E-Saite nicht anschlagen. „B" ist die englische Schreibweise für H.' },
  { id: 'Cism', name: 'C♯m', gruppe: 'Barré', bund: [null, 4, 6, 6, 5, 4], finger: [null, 1, 3, 4, 2, 1], startBund: 4, barre: { bund: 4, von: 1, bis: 5 }, tipp: 'Am-Form im 4. Bund – im selben Bund wie G♯m, der Zeigefinger kann beim Wechsel liegen bleiben.' },
  { id: 'Gis7', name: 'G♯7', gruppe: 'Barré', bund: [4, 6, 4, 5, 4, 4], finger: [1, 3, 1, 2, 1, 1], startBund: 4, barre: { bund: 4, von: 0, bis: 5 }, tipp: 'E7-Form im 4. Bund – aus G♯m: kleinen Finger weg, Mittelfinger auf die G-Saite im 5. Bund.' },
  { id: 'F', name: 'F', gruppe: 'Barré', bund: [1, 3, 3, 2, 1, 1], finger: [1, 3, 4, 2, 1, 1], barre: { bund: 1, von: 0, bis: 5 }, tipp: 'E-Form im 1. Bund, einmal nach dem Tonartwechsel. Der klassische „Angst-Akkord": Zeigefinger leicht auf die Kante drehen.' },
  { id: 'Ais', name: 'A♯', gruppe: 'Barré', bund: [null, 1, 3, 3, 3, 1], finger: [null, 1, 2, 3, 4, 1], barre: { bund: 1, von: 1, bis: 5 }, tipp: 'A-Form im 1. Bund (auch B♭ geschrieben), einmal nach dem Tonartwechsel.' },
  // K.K. Cruisin'
  { id: 'Bes7', name: 'B♭7', gruppe: 'Barré', bund: [null, 1, 3, 1, 3, 1], finger: [null, 1, 3, 1, 4, 1], barre: { bund: 1, von: 1, bis: 5 }, tipp: 'A7-Form mit Barré im 1. Bund. Beim Wechsel zu E♭7sus2 bleibt der Zeigefinger im 1. Bund liegen.' },
  { id: 'Es7sus2', name: 'E♭7sus2', gruppe: 'Barré', bund: [null, null, 1, 3, 2, 1], finger: [null, null, 1, 3, 2, 1], barre: { bund: 1, von: 2, bis: 5 }, tipp: 'Mini-Barré im 1. Bund (D- bis e-Saite), Ringfinger G-Saite 3. Bund, Mittelfinger H-Saite 2. Bund.' },
  { id: 'As7', name: 'A♭7', gruppe: 'Barré', bund: [4, 6, 4, 5, 4, 4], finger: [1, 3, 1, 2, 1, 1], startBund: 4, barre: { bund: 4, von: 0, bis: 5 }, tipp: 'E7-Form im 4. Bund – derselbe Griff wie G♯7 aus Go K.K. Rider.' },
  { id: 'Ges7', name: 'G♭7', gruppe: 'Barré', bund: [2, 4, 2, 3, 2, 2], finger: [1, 3, 1, 2, 1, 1], startBund: 2, barre: { bund: 2, von: 0, bis: 5 }, tipp: 'E7-Form im 2. Bund – A♭7, nur zwei Bünde tiefer.' },
  // Blue Hair
  { id: 'Fism', name: 'F♯m', gruppe: 'Barré', bund: [2, 4, 4, 2, 2, 2], finger: [1, 3, 4, 1, 1, 1], startBund: 2, barre: { bund: 2, von: 0, bis: 5 }, tipp: 'Em-Form im 2. Bund – derselbe Griff wie G♯m, nur zwei Bünde tiefer. Zwischenschritt: nur die vier hohen Saiten (xx4222).' },
  { id: 'B7sus2', name: 'B7sus2', gruppe: 'Barré', bund: [null, 2, 4, 2, 2, 2], finger: [null, 1, 3, 1, 1, 1], startBund: 2, barre: { bund: 2, von: 1, bis: 5 }, tipp: 'Barré im 2. Bund ab der A-Saite, dazu die D-Saite im 4. Bund. Von F♯m aus bleibt das Barré liegen: Finger von der A-Saite nehmen, tiefe E-Saite nicht anschlagen.' },
  // 505 (Bonus: dieselbe Runde als Barré)
  { id: 'Dm-Barre', name: 'Dm', gruppe: 'Barré', bund: [null, 5, 7, 7, 6, 5], finger: [null, 1, 3, 4, 2, 1], startBund: 5, barre: { bund: 5, von: 1, bis: 5 }, tipp: 'Am-Form im 5. Bund – dieselbe Handform wie C♯m, einen Bund höher. Tiefe E-Saite nicht anschlagen. Zwei Bünde höher geschoben wird daraus Em.' },
  { id: 'Em-Barre', name: 'Em', gruppe: 'Barré', bund: [null, 7, 9, 9, 8, 7], finger: [null, 1, 3, 4, 2, 1], startBund: 7, barre: { bund: 7, von: 1, bis: 5 }, tipp: 'Am-Form im 7. Bund – Dm aus 505, nur zwei Bünde höher. Der Wechsel Dm ↔ Em wird so zum Rutschen.' },
]

export const akkordNach = (id: string) => akkorde.find(a => a.id === id)

/** Kurzschreibweise wie in Akkordbüchern, z.B. C → „x32010", G♯m → „466444". */
export const griffKurz = (a: Akkord) => a.bund.map(b => (b === null ? 'x' : String(b))).join('')
