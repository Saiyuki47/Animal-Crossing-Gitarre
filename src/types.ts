export type Schwierigkeit = 'einfach' | 'mittel' | 'schwer'

// Referenz-Karten (ReferenzKarte) und Quiz-Typen (QuizFrage etc.) kommen aus dem
// geteilten Paket `lernseiten-ui`; Begriffe (BegriffGruppe) aus `data/begriffe.ts`,
// Akkorde (Akkord) aus `data/akkorde.ts`.

/** Eine Übung innerhalb eines Lernschritts. */
export interface Aufgabe {
  id: string
  titel: string
  aufgabeText: string
  tipp?: string
  /** Woran man merkt, dass man die Übung geschafft hat (bzw. Musterlösung bei Wissensfragen). */
  loesung?: string
  schwierigkeit: Schwierigkeit
  kategorie?: string
  /** Akkord-IDs aus data/akkorde.ts, deren Griffbilder bei der Übung angezeigt werden. */
  akkorde?: string[]
}

export interface UebungsblattAufgabe {
  nr: number
  text: string
  aufgabeId: string
}

/** Ein Lernschritt (entspricht strukturell einem Übungsblatt der anderen Lernseiten). */
export interface Uebungsblatt {
  id: string
  nr: string
  titel: string
  typ: 'Grundlagen' | 'Technik' | 'Rhythmus' | 'Song' | 'Bonus'
  /** Grobe Übezeit pro Tag, z.B. „10–15 Min.". */
  dauer?: string
  beschreibung?: string
  /** Optionaler externer Link, z.B. zum Akkordblatt. */
  link?: { text: string; url: string }
  aufgaben: UebungsblattAufgabe[]
}
