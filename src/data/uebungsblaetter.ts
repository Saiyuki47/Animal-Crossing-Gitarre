import type { Uebungsblatt } from '../types'

// TODO: Ersetze die Beispielblätter mit deinen eigenen Übungsblättern
export const uebungsblaetter: Uebungsblatt[] = [
  {
    id: 'blatt1',
    nr: '1',
    typ: 'Hausaufgabe',
    beschreibung: 'Beschreibe hier den Inhalt und die Aufgabenstellung des Übungsblattes.',
    aufgaben: [
      {
        nr: 1,
        text: 'Erste Aufgabe: Was ist ...?',
        aufgabeId: 'a1',
      },
      {
        nr: 2,
        text: 'Zweite Aufgabe: Erkläre den Begriff ...',
        aufgabeId: 'a2',
      },
    ],
  },
  {
    id: 'blatt2',
    nr: '2',
    typ: 'Präsenzaufgabe',
    beschreibung: 'Zweites Übungsblatt mit fortgeschrittenen Aufgaben.',
    aufgaben: [
      {
        nr: 1,
        text: 'Berechne ...',
        aufgabeId: 'a3',
      },
    ],
  },
]
