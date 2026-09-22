import type { FlashCard } from 'lernseiten-ui'
import { aufgaben } from './aufgaben'
import { quizFragen } from './quiz'

// Karteikarten werden aus vorhandenen Inhalten abgeleitet: Aufgaben (Frage →
// Musterlösung) und Quizfragen (Frage → Erklärung). So bleibt nur eine Quelle
// zu pflegen. Bei Bedarf hier eigene Karten ergänzen.
export const karteikarten: FlashCard[] = [
  ...aufgaben.flatMap(a =>
    a.loesung
      ? [{ id: `a-${a.id}`, front: a.aufgabeText, back: a.loesung, tag: a.titel }]
      : [],
  ),
  ...quizFragen.map((q, i) => ({
    id: `q-${i}`,
    front: q.frage,
    back: q.erklaerung,
    tag: q.quelle,
  })),
]
