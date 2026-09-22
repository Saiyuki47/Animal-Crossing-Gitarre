export type Schwierigkeit = 'einfach' | 'mittel' | 'schwer'

// Referenz-Karten (ReferenzKarte) und Quiz-Typen (QuizFrage etc.) kommen aus dem
// geteilten Paket `lernseiten-ui`; Begriffe (BegriffGruppe) aus `data/begriffe.ts`.

export interface Aufgabe {
  id: string
  titel: string
  aufgabeText: string
  tipp?: string
  loesung?: string
  schwierigkeit: Schwierigkeit
  kategorie?: string
}

export interface UebungsblattAufgabe {
  nr: number
  text: string
  aufgabeId: string
}

export interface Uebungsblatt {
  id: string
  nr: string
  typ: 'Hausaufgabe' | 'Präsenzaufgabe'
  beschreibung?: string
  aufgaben: UebungsblattAufgabe[]
}
