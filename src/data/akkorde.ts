// Griffbilder aller Akkorde, die man für Go K.K. Rider braucht. Reihenfolge der
// Saiten immer von der tiefen E-Saite (6) zur hohen e-Saite (1).
//
//   bund:      null = Saite nicht anschlagen (x), 0 = Leersaite (o), n = n-ter Bund
//   finger:    1 = Zeigefinger, 2 = Mittelfinger, 3 = Ringfinger, 4 = kleiner Finger
//   startBund: oberster gezeigter Bund (fehlt = 1, dann wird der Sattel gezeichnet)
//   barre:     Zeigefinger liegt quer über den Saiten `von`–`bis` (0 = tiefes E … 5 = hohes e)
//
// Gruppen:
//   'Kapo'     – Go K.K. Rider: die Griffe MIT Kapodaster im 4. (bzw. 5.) Bund
//   'Barré'    – Go K.K. Rider: die Original-Griffe ohne Kapodaster (Bonus-Schritt)
//   'Cruisin'  – zusätzliche Griffe für K.K. Cruisin' (Kapo 6 und Original)

export type AkkordGruppe = 'Kapo' | 'Barré' | 'Cruisin'

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
  // ── Song-Griffe mit Kapodaster ──────────────────────────────────────────
  { id: 'Em', name: 'Em', gruppe: 'Kapo', bund: [0, 2, 2, 0, 0, 0], finger: [null, 2, 3, null, null, null], tipp: 'Der Grundakkord des Songs – hier beginnt und endet fast jeder Abschnitt.' },
  { id: 'D', name: 'D', gruppe: 'Kapo', bund: [null, null, 0, 2, 3, 2], finger: [null, null, null, 1, 3, 2], tipp: 'Nur die vier hohen Saiten anschlagen.' },
  { id: 'C', name: 'C', gruppe: 'Kapo', bund: [null, 3, 2, 0, 1, 0], finger: [null, 3, 2, null, 1, null], tipp: 'Tiefe E-Saite nicht anschlagen.' },
  { id: 'B7', name: 'B7', gruppe: 'Kapo', bund: [null, 2, 1, 2, 0, 2], finger: [null, 2, 1, 3, null, 4], tipp: 'Der wichtigste neue Griff. Der Mittelfinger (A-Saite, 2. Bund) bleibt beim Wechsel nach Em liegen.' },
  { id: 'G', name: 'G', gruppe: 'Kapo', bund: [3, 2, 0, 0, 0, 3], finger: [2, 1, null, null, null, 3], tipp: 'Alle sechs Saiten klingen.' },
  { id: 'Am', name: 'Am', gruppe: 'Kapo', bund: [null, 0, 2, 2, 1, 0], finger: [null, null, 2, 3, 1, null], tipp: 'Zeige- und Mittelfinger wie beim C – nur der Ringfinger wandert.' },
  { id: 'F-klein', name: 'F (klein)', gruppe: 'Kapo', bund: [null, null, 3, 2, 1, 1], finger: [null, null, 3, 2, 1, 1], barre: { bund: 1, von: 4, bis: 5 }, tipp: 'Mini-Barré: Der Zeigefinger drückt nur die zwei hohen Saiten. Nur die vier hohen Saiten anschlagen.' },
  { id: 'Fmaj7', name: 'Fmaj7', gruppe: 'Kapo', bund: [null, null, 3, 2, 1, 0], finger: [null, null, 3, 2, 1, null], tipp: 'Notlösung, solange das kleine F noch nicht klingt – hohe e-Saite bleibt offen.' },
  { id: 'E7', name: 'E7', gruppe: 'Kapo', bund: [0, 2, 0, 1, 0, 0], finger: [null, 2, null, 1, null, null], tipp: 'Kommt in jedem Refrain einmal vor (Takt 5, nach Em) und führt nach Am.' },

  // ── Original ohne Kapodaster (Bonus: Barré) ─────────────────────────────
  { id: 'Gism', name: 'G♯m', gruppe: 'Barré', bund: [4, 6, 6, 4, 4, 4], finger: [1, 3, 4, 1, 1, 1], startBund: 4, barre: { bund: 4, von: 0, bis: 5 }, tipp: 'Em-Form: der Em-Griff mit Ring- und kleinem Finger, der Zeigefinger ersetzt den Sattel im 4. Bund.' },
  { id: 'Gis7', name: 'G♯7', gruppe: 'Barré', bund: [4, 6, 4, 5, 4, 4], finger: [1, 3, 1, 2, 1, 1], startBund: 4, barre: { bund: 4, von: 0, bis: 5 }, tipp: 'E7-Form im 4. Bund – aus G♯m: kleinen Finger weg, Mittelfinger auf die G-Saite.' },
  { id: 'Fis', name: 'F♯', gruppe: 'Barré', bund: [2, 4, 4, 3, 2, 2], finger: [1, 3, 4, 2, 1, 1], startBund: 2, barre: { bund: 2, von: 0, bis: 5 }, tipp: 'E-Form im 2. Bund – gleiche Form wie F, nur einen Bund höher.' },
  { id: 'E', name: 'E', gruppe: 'Barré', bund: [0, 2, 2, 1, 0, 0], finger: [null, 2, 3, 1, null, null], tipp: 'Offener Griff – die Vorlage für alle E-Form-Barrés.' },
  { id: 'Dis7', name: 'D♯7', gruppe: 'Barré', bund: [null, null, 1, 3, 2, 3], finger: [null, null, 1, 3, 2, 4], tipp: 'Kein Barré, aber vier Finger: nur die vier hohen Saiten anschlagen.' },
  { id: 'H', name: 'B (H)', gruppe: 'Barré', bund: [null, 2, 4, 4, 4, 2], finger: [null, 1, 2, 3, 4, 1], startBund: 2, barre: { bund: 2, von: 1, bis: 5 }, tipp: 'A-Form im 2. Bund. „B" ist die englische Schreibweise für H.' },
  { id: 'A', name: 'A', gruppe: 'Barré', bund: [null, 0, 2, 2, 2, 0], finger: [null, null, 1, 2, 3, null], tipp: 'Offener Griff – die Vorlage für alle A-Form-Barrés.' },
  { id: 'Cism', name: 'C♯m', gruppe: 'Barré', bund: [null, 4, 6, 6, 5, 4], finger: [null, 1, 3, 4, 2, 1], startBund: 4, barre: { bund: 4, von: 1, bis: 5 }, tipp: 'Am-Form im 4. Bund.' },
  { id: 'F', name: 'F', gruppe: 'Barré', bund: [1, 3, 3, 2, 1, 1], finger: [1, 3, 4, 2, 1, 1], barre: { bund: 1, von: 0, bis: 5 }, tipp: 'Der klassische „Angst-Akkord" – E-Form im 1. Bund. Zeigefinger leicht auf die Kante drehen.' },
  { id: 'Ais', name: 'A♯', gruppe: 'Barré', bund: [null, 1, 3, 3, 3, 1], finger: [null, 1, 2, 3, 4, 1], barre: { bund: 1, von: 1, bis: 5 }, tipp: 'A-Form im 1. Bund (auch B♭ geschrieben).' },
  { id: 'Dm', name: 'Dm', gruppe: 'Barré', bund: [null, null, 0, 2, 3, 1], finger: [null, null, null, 2, 3, 1], tipp: 'Offener Griff aus dem Teil nach dem Tonartwechsel.' },
  { id: 'A7', name: 'A7', gruppe: 'Barré', bund: [null, 0, 2, 0, 2, 0], finger: [null, null, 1, null, 2, null], tipp: 'Offener Griff aus dem letzten Refrain.' },

  // ── K.K. Cruisin' ─────────────────────────────────────────────────────
  // mit Kapo im 6. (bzw. 7.) Bund
  { id: 'F7-klein', name: 'F7 (klein)', gruppe: 'Cruisin', bund: [null, null, 1, 2, 1, 1], finger: [null, null, 1, 2, 1, 1], barre: { bund: 1, von: 2, bis: 5 }, tipp: 'Mini-Barré über die vier hohen Saiten, Mittelfinger auf der G-Saite. Nur die vier hohen Saiten anschlagen.' },
  { id: 'A7sus2', name: 'A7sus2', gruppe: 'Cruisin', bund: [null, 0, 2, 0, 0, 0], finger: [null, null, 2, null, null, null], tipp: 'Der leichteste Griff des Songs: ein Finger auf der D-Saite. Klingt offen und schwebend – der „Heimat"-Akkord von K.K. Cruisin\'.' },
  { id: 'D7', name: 'D7', gruppe: 'Cruisin', bund: [null, null, 0, 2, 1, 2], finger: [null, null, null, 2, 1, 3], tipp: 'Nur die vier hohen Saiten anschlagen.' },
  { id: 'C7', name: 'C7', gruppe: 'Cruisin', bund: [null, 3, 2, 3, 1, 0], finger: [null, 3, 2, 4, 1, null], tipp: 'C-Griff plus kleiner Finger auf der G-Saite im 3. Bund.' },
  // Original ohne Kapo
  { id: 'Bes7', name: 'B♭7', gruppe: 'Cruisin', bund: [null, 1, 3, 1, 3, 1], finger: [null, 1, 3, 1, 4, 1], barre: { bund: 1, von: 1, bis: 5 }, tipp: 'A7-Form mit Barré im 1. Bund.' },
  { id: 'Es7sus2', name: 'E♭7sus2', gruppe: 'Cruisin', bund: [null, null, 1, 3, 2, 1], finger: [null, null, 1, 3, 2, 1], barre: { bund: 1, von: 2, bis: 5 }, tipp: 'Mini-Barré im 1. Bund (D- bis e-Saite), Ringfinger G-Saite 3. Bund, Mittelfinger H-Saite 2. Bund.' },
  { id: 'As7', name: 'A♭7', gruppe: 'Cruisin', bund: [4, 6, 4, 5, 4, 4], finger: [1, 3, 1, 2, 1, 1], startBund: 4, barre: { bund: 4, von: 0, bis: 5 }, tipp: 'E7-Form im 4. Bund – gleicher Griff wie G♯7.' },
  { id: 'Ges7', name: 'G♭7', gruppe: 'Cruisin', bund: [2, 4, 2, 3, 2, 2], finger: [1, 3, 1, 2, 1, 1], startBund: 2, barre: { bund: 2, von: 0, bis: 5 }, tipp: 'E7-Form im 2. Bund.' },
  { id: 'E7sus2', name: 'E7sus2', gruppe: 'Cruisin', bund: [0, 2, 0, 4, 0, 2], finger: [null, 1, null, 4, null, 2], tipp: 'Nach dem Tonartwechsel. Zeigefinger A-Saite, kleiner Finger G-Saite 4. Bund, Mittelfinger hohe e-Saite.' },
  { id: 'G7', name: 'G7', gruppe: 'Cruisin', bund: [3, 2, 0, 0, 0, 1], finger: [3, 2, null, null, null, 1], tipp: 'Führt zurück nach C.' },
]

export const akkordNach = (id: string) => akkorde.find(a => a.id === id)

/** Kurzschreibweise wie in Akkordbüchern, z.B. C → „x32010", G♯m → „466444". */
export const griffKurz = (a: Akkord) => a.bund.map(b => (b === null ? 'x' : String(b))).join('')
