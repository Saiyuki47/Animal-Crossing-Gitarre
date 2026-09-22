import type { Aufgabe } from '../types'

// TODO: Ersetze die Beispielaufgaben mit deinen eigenen Aufgaben
export const aufgaben: Aufgabe[] = [
  {
    id: 'a1',
    titel: '1. Beispielaufgabe (Einfach)',
    aufgabeText: 'Beschreibe hier die Aufgabenstellung. Was soll der Lernende herausfinden oder berechnen?',
    tipp: 'Hier kannst du einen Hinweis geben, ohne die Lösung zu verraten.',
    loesung: 'Hier steht die Musterlösung.\nMehrere Zeilen sind möglich.',
    schwierigkeit: 'einfach',
    kategorie: 'Kategorie A',
  },
  {
    id: 'a2',
    titel: '2. Beispielaufgabe (Mittel)',
    aufgabeText: 'Eine etwas schwierigere Aufgabe, die mehr Verständnis erfordert.',
    tipp: 'Denke an die grundlegenden Konzepte aus der Vorlesung.',
    loesung: 'Die Lösung dieser Aufgabe ist komplexer.\nSchritt 1: ...\nSchritt 2: ...',
    schwierigkeit: 'mittel',
    kategorie: 'Kategorie B',
  },
  {
    id: 'a3',
    titel: '3. Beispielaufgabe (Schwer)',
    aufgabeText: 'Eine anspruchsvolle Aufgabe für Fortgeschrittene.',
    loesung: 'Anspruchsvolle Lösung:\nTeil A: ...\nTeil B: ...',
    schwierigkeit: 'schwer',
  },
]
