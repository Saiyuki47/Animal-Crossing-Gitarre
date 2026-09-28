import type { SearchItem } from 'lernseiten-ui'
import { aufgaben } from './aufgaben'
import { quizFragen } from './quiz'
import { uebungsblaetter } from './uebungsblaetter'
import { referenzKarten } from './referenz'
import { begriffGruppen } from './begriffe'
import { akkorde, griffKurz } from './akkorde'

// Such-Index aus den Inhalten der Seite. Jeder Treffer kennt seinen Ziel-Tab,
// damit die globale Suche direkt dorthin springen kann.
export const searchIndex: SearchItem[] = [
  ...uebungsblaetter.flatMap(b =>
    b.aufgaben.map(t => ({
      label: `Übung ${t.nr}: ${t.text}`,
      snippet: `Schritt ${b.nr}: ${b.titel}`,
      tab: 'uebung',
      keywords: b.typ,
    })),
  ),
  ...aufgaben.map(a => ({
    label: a.titel,
    snippet: a.aufgabeText,
    tab: 'uebung',
    keywords: `${a.kategorie ?? ''} ${(a.akkorde ?? []).join(' ')}`,
  })),
  // Akkorde einzeln, damit „Am" oder „G7" direkt gefunden wird
  ...akkorde.map(a => ({
    label: `Akkord ${a.name}`,
    snippet: `${griffKurz(a)} · ${a.tipp ?? a.gruppe}`,
    tab: 'referenz',
    keywords: `griff akkord ${a.gruppe}`,
  })),
  // Referenz-Tab: Nachschlagekarten …
  ...referenzKarten.map(k => ({
    label: k.titel,
    snippet: k.inhalt ?? 'Griffe & Technik',
    tab: 'referenz',
    keywords: 'referenz griffe technik',
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
  ...[
    { label: 'Metronom', snippet: 'Metronom mit Schlagmuster-Anzeige und Swing' },
    { label: 'Tempo tippen', snippet: 'BPM eines Songs beim Hören bestimmen' },
    { label: 'Stimmgerät', snippet: 'Gitarre über das Mikrofon stimmen – mit Nadel und Cent-Anzeige' },
    { label: 'Stimmtöne', snippet: 'Referenzton pro Saite zum Stimmen nach Gehör' },
  ].map(w => ({ ...w, tab: 'werkzeuge', keywords: 'werkzeuge bpm stimmen tuner stimmgerät mikrofon' })),
  ...quizFragen.map(q => ({
    label: q.frage,
    snippet: 'Quizfrage',
    tab: 'quiz',
    keywords: q.quelle ?? '',
  })),
]
