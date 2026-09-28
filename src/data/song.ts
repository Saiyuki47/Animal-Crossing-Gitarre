// Eckdaten zu Go K.K. Rider (© Nintendo): Tempo, Aufbau, Kapo-Tabellen und die
// Quelle der Akkorde (AKKORDBLATT_URL). Das komplette Songblatt Takt für Takt
// steht in data/songblatt.ts.

export const AKKORDBLATT_URL =
  'https://tabs.ultimate-guitar.com/tab/misc-computer-games/animal-crossing-go-kk-rider-chords-1452035'

// Tempo laut Hooktheory-Analyse 152 BPM, Aufnahmen/Cover liegen bei 147–153 BPM.
export const ORIGINAL_BPM = 150
export const UEBE_BPM = 70

/** Klingender Akkord (Original) → Griff mit Kapodaster. */
export interface KapoZeile {
  original: string
  griff: string
  /** Akkord-ID des Kapo-Griffs (data/akkorde.ts). */
  griffId: string
  /** Akkord-ID des Original-Griffs ohne Kapo. */
  originalId: string
}

/** Teil 1 (G♯-Moll): Kapo im 4. Bund. */
export const KAPO_4: KapoZeile[] = [
  { original: 'G♯m', griff: 'Em', griffId: 'Em', originalId: 'Gism' },
  { original: 'F♯', griff: 'D', griffId: 'D', originalId: 'Fis' },
  { original: 'E', griff: 'C', griffId: 'C', originalId: 'E' },
  { original: 'D♯7', griff: 'B7', griffId: 'B7', originalId: 'Dis7' },
  { original: 'B (H)', griff: 'G', griffId: 'G', originalId: 'H' },
  { original: 'A', griff: 'F', griffId: 'F-klein', originalId: 'A' },
  { original: 'C♯m', griff: 'Am', griffId: 'Am', originalId: 'Cism' },
  { original: 'G♯7', griff: 'E7', griffId: 'E7', originalId: 'Gis7' },
]

/** Teil 2 nach dem Tonartwechsel (A-Moll): Kapo im 5. Bund – dieselben Griffe. */
export const KAPO_5: KapoZeile[] = [
  { original: 'Am', griff: 'Em', griffId: 'Em', originalId: 'Am' },
  { original: 'G', griff: 'D', griffId: 'D', originalId: 'G' },
  { original: 'F', griff: 'C', griffId: 'C', originalId: 'F' },
  { original: 'E7', griff: 'B7', griffId: 'B7', originalId: 'E7' },
  { original: 'C', griff: 'G', griffId: 'G', originalId: 'C' },
  { original: 'A♯', griff: 'F', griffId: 'F-klein', originalId: 'Ais' },
  { original: 'Dm', griff: 'Am', griffId: 'Am', originalId: 'Dm' },
  { original: 'A7', griff: 'E7', griffId: 'E7', originalId: 'A7' },
]

/** Songaufbau: Abschnitte, Länge in Takten (4/4) und welche Kapo-Griffe darin vorkommen. */
export interface Abschnitt {
  name: string
  takte?: number
  griffe: string[]
  hinweis?: string
}

export const AUFBAU: Abschnitt[] = [
  { name: 'Intro', takte: 4, griffe: ['Em', 'D', 'C', 'B7'], hinweis: 'Ein Akkord pro Takt. K.K. pfeift dazu.' },
  { name: 'Strophe', takte: 8, griffe: ['Em', 'D', 'C', 'G', 'F', 'Am', 'B7'], hinweis: 'Zwei Takte mit je zwei Akkorden (2 Schläge pro Akkord).' },
  { name: 'Refrain', takte: 8, griffe: ['D', 'G', 'Am', 'B7', 'Em', 'E7'], hinweis: 'Zwei Takte mit je zwei Akkorden (Em–E7 und D–B7).' },
  { name: 'Zwischenspiel', takte: 4, griffe: ['Em', 'D', 'C', 'B7'], hinweis: 'Wie das Intro.' },
  { name: 'Strophe + Refrain', griffe: [], hinweis: 'Wiederholung.' },
  { name: 'Bridge', griffe: ['D', 'Am', 'B7'], hinweis: 'Kurzer Übergang – Länge beim Hören mitzählen.' },
  { name: 'Strophe (mit Pfeifen)', takte: 8, griffe: [], hinweis: 'Wie die Strophe.' },
  { name: 'Tonartwechsel ↑', griffe: [], hinweis: 'Kapo vom 4. in den 5. Bund versetzen – danach dieselben Griffe.' },
  { name: 'Strophe + Refrain (höher)', griffe: ['Em', 'D', 'C', 'G', 'F', 'Am', 'B7', 'E7'], hinweis: 'Wie vorher – nur mit Kapo im 5. Bund.' },
]
