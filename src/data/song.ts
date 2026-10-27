// Eckdaten zu Go K.K. Rider (© Nintendo): Tempo, Aufbau und die Quelle der Akkorde
// (AKKORDBLATT_URL). Das komplette Songblatt Takt für Takt steht in
// data/lieder/goKkRider.ts.

export const AKKORDBLATT_URL =
  'https://tabs.ultimate-guitar.com/tab/misc-computer-games/animal-crossing-go-kk-rider-chords-1452035'

// Tempo laut Hooktheory-Analyse 152 BPM, Aufnahmen/Cover liegen bei 147–153 BPM.
export const ORIGINAL_BPM = 150
export const UEBE_BPM = 70

/** Songaufbau: Abschnitte, Länge in Takten (4/4) und welche Akkorde darin vorkommen. */
export interface Abschnitt {
  name: string
  takte?: number
  griffe: string[]
  hinweis?: string
}

export const AUFBAU: Abschnitt[] = [
  { name: 'Intro', takte: 4, griffe: ['G♯m', 'F♯', 'E', 'D♯7'], hinweis: 'Ein Akkord pro Takt. K.K. pfeift dazu.' },
  { name: 'Strophe', takte: 8, griffe: ['G♯m', 'F♯', 'E', 'B', 'A', 'C♯m', 'D♯7'], hinweis: 'Zwei Takte mit je zwei Akkorden (2 Schläge pro Akkord).' },
  { name: 'Refrain', takte: 8, griffe: ['F♯', 'B', 'C♯m', 'D♯7', 'G♯m', 'G♯7'], hinweis: 'Zwei Takte mit je zwei Akkorden (G♯m–G♯7 und F♯–D♯7).' },
  { name: 'Zwischenspiel', takte: 4, griffe: ['G♯m', 'F♯', 'E', 'D♯7'], hinweis: 'Wie das Intro.' },
  { name: 'Strophe + Refrain', griffe: [], hinweis: 'Wiederholung.' },
  { name: 'Bridge', griffe: ['F♯', 'C♯m', 'D♯7'], hinweis: 'Kurzer Übergang – Länge beim Hören mitzählen.' },
  { name: 'Strophe (mit Pfeifen)', takte: 8, griffe: [], hinweis: 'Wie die Strophe.' },
  { name: 'Tonartwechsel ↑', griffe: [], hinweis: 'Ab hier einen Halbton höher (A-Moll) – fast nur offene Griffe.' },
  { name: 'Strophe + Refrain (höher)', griffe: ['Am', 'G', 'F', 'C', 'A♯', 'Dm', 'E7', 'A7'], hinweis: 'Nur F und A♯ sind Barrés.' },
]
