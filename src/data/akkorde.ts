// Griffbilder der offenen Akkorde, die man für Go K.K. Rider (und fast jeden
// Lagerfeuer-Song) braucht. Reihenfolge der Saiten immer von der tiefen E-Saite
// (6) zur hohen e-Saite (1) – genau so, wie man die Gitarre von oben sieht.
//
//   bund:   null = Saite nicht anschlagen (x), 0 = Leersaite (o), n = n-ter Bund
//   finger: 1 = Zeigefinger, 2 = Mittelfinger, 3 = Ringfinger, 4 = kleiner Finger

export type AkkordGruppe = 'Dur' | 'Moll' | 'Sept'

export interface Akkord {
  id: string
  name: string
  gruppe: AkkordGruppe
  bund: (number | null)[]
  finger: (number | null)[]
  tipp?: string
}

export const akkorde: Akkord[] = [
  // Dur
  { id: 'C', name: 'C', gruppe: 'Dur', bund: [null, 3, 2, 0, 1, 0], finger: [null, 3, 2, null, 1, null], tipp: 'Tiefe E-Saite nicht anschlagen – Ringfinger-Kuppe darf sie leicht abdämpfen.' },
  { id: 'G', name: 'G', gruppe: 'Dur', bund: [3, 2, 0, 0, 0, 3], finger: [2, 1, null, null, null, 3], tipp: 'Alle sechs Saiten klingen. Alternative Fingerung 3-2-0-0-0-4 erleichtert den Wechsel nach C.' },
  { id: 'D', name: 'D', gruppe: 'Dur', bund: [null, null, 0, 2, 3, 2], finger: [null, null, null, 1, 3, 2], tipp: 'Nur die vier hohen Saiten anschlagen, Anschlag auf der D-Saite beginnen.' },
  { id: 'A', name: 'A', gruppe: 'Dur', bund: [null, 0, 2, 2, 2, 0], finger: [null, null, 1, 2, 3, null], tipp: 'Drei Finger nebeneinander im 2. Bund – eng zusammenrücken, damit die hohe e-Saite frei klingt.' },
  { id: 'E', name: 'E', gruppe: 'Dur', bund: [0, 2, 2, 1, 0, 0], finger: [null, 2, 3, 1, null, null], tipp: 'Gleiche Form wie Am, nur eine Saite tiefer.' },
  { id: 'Fmaj7', name: 'Fmaj7', gruppe: 'Dur', bund: [null, null, 3, 2, 1, 0], finger: [null, null, 3, 2, 1, null], tipp: 'Leichter Ersatz für das Barré-F, solange das noch nicht sitzt.' },
  // Moll
  { id: 'Am', name: 'Am', gruppe: 'Moll', bund: [null, 0, 2, 2, 1, 0], finger: [null, null, 2, 3, 1, null], tipp: 'Zeige- und Mittelfinger bleiben beim Wechsel nach C liegen.' },
  { id: 'Em', name: 'Em', gruppe: 'Moll', bund: [0, 2, 2, 0, 0, 0], finger: [null, 2, 3, null, null, null], tipp: 'Der einfachste Akkord überhaupt – ideal zum Aufwärmen.' },
  { id: 'Dm', name: 'Dm', gruppe: 'Moll', bund: [null, null, 0, 2, 3, 1], finger: [null, null, null, 2, 3, 1], tipp: 'Wie D, nur die hohe e-Saite rutscht in den 1. Bund.' },
  // Septakkorde – typisch für den verspielten, swingenden Sound
  { id: 'G7', name: 'G7', gruppe: 'Sept', bund: [3, 2, 0, 0, 0, 1], finger: [3, 2, null, null, null, 1], tipp: 'Führt ganz natürlich zurück nach C.' },
  { id: 'C7', name: 'C7', gruppe: 'Sept', bund: [null, 3, 2, 3, 1, 0], finger: [null, 3, 2, 4, 1, null], tipp: 'C-Griff plus kleiner Finger im 3. Bund der G-Saite.' },
  { id: 'D7', name: 'D7', gruppe: 'Sept', bund: [null, null, 0, 2, 1, 2], finger: [null, null, null, 2, 1, 3], tipp: 'Führt zurück nach G.' },
  { id: 'A7', name: 'A7', gruppe: 'Sept', bund: [null, 0, 2, 0, 2, 0], finger: [null, null, 2, null, 3, null], tipp: 'A-Griff ohne den Finger auf der G-Saite.' },
  { id: 'E7', name: 'E7', gruppe: 'Sept', bund: [0, 2, 0, 1, 0, 0], finger: [null, 2, null, 1, null, null], tipp: 'E-Griff ohne den Ringfinger.' },
]

export const akkordNach = (id: string) => akkorde.find(a => a.id === id)

/** Kurzschreibweise wie in Akkordbüchern, z.B. C → „x32010". */
export const griffKurz = (a: Akkord) => a.bund.map(b => (b === null ? 'x' : String(b))).join('')
