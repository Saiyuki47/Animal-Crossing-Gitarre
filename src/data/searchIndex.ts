import type { SearchItem } from 'lernseiten-ui'
import { aufgaben } from './aufgaben'
import { quizFragen } from './quiz'
import { uebungsblaetter } from './uebungsblaetter'
import { referenzKarten } from './referenz'
import { begriffGruppen } from './begriffe'

// Such-Index aus den Inhalten der Seite. Jeder Treffer kennt seinen Ziel-Tab,
// damit die globale Suche direkt dorthin springen kann.
export const searchIndex: SearchItem[] = [
  ...uebungsblaetter.flatMap(b =>
    b.aufgaben.map(t => ({
      label: `Aufgabe ${t.nr}: ${t.text}`,
      snippet: `Übungsblatt ${b.nr}`,
      tab: 'uebung',
      keywords: b.typ,
    })),
  ),
  ...aufgaben.map(a => ({
    label: a.titel,
    snippet: a.aufgabeText,
    tab: 'uebung',
    keywords: a.kategorie ?? '',
  })),
  // Referenz-Tab: Nachschlagekarten (Untertab „Themen") …
  ...referenzKarten.map(k => ({
    label: k.titel,
    snippet: k.inhalt ?? 'Referenz',
    tab: 'referenz',
    keywords: 'referenz themen',
  })),
  // … und die Begriffe (Untertab „Begriffe lernen").
  ...begriffGruppen.flatMap(g =>
    g.begriffe.map(b => ({
      label: b.begriff,
      snippet: b.definition,
      tab: 'referenz',
      keywords: `begriffe ${g.titel}`,
    })),
  ),
  ...quizFragen.map(q => ({
    label: q.frage,
    snippet: 'Quizfrage',
    tab: 'quiz',
    keywords: q.quelle ?? '',
  })),
]
