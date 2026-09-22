// Begriffe zum Auswendiglernen — kompakte Definitionen, die für sich allein
// „abfragbar" sind: Begriff lesen → Definition aufsagen können. Reiner Text
// (kein LaTeX); ersetze die Platzhalter durch deine eigenen Begriffe.

export interface Begriff {
  begriff: string
  definition: string
  /** Optionale Eselsbrücke / Kurzform zum Einprägen. */
  merke?: string
}

export interface BegriffGruppe {
  titel: string
  begriffe: Begriff[]
}

// TODO: Ersetze die Platzhalter-Begriffe durch deine eigenen.
export const begriffGruppen: BegriffGruppe[] = [
  {
    titel: 'Gruppe 1: Grundbegriffe',
    begriffe: [
      {
        begriff: 'Beispielbegriff A',
        definition:
          'Kurze, präzise Definition von A – so, dass du sie im Lernmodus aus dem Kopf aufsagen kannst.',
        merke: 'Eselsbrücke oder Kurzform zum Einprägen.',
      },
      {
        begriff: 'Beispielbegriff B',
        definition:
          'Definition von B. Grenze B klar von A ab, damit die beiden nicht verwechselt werden.',
      },
      {
        begriff: 'Beispielbegriff C',
        definition:
          'Definition von C mit einem konkreten Beispiel, das den Begriff greifbar macht.',
      },
    ],
  },
  {
    titel: 'Gruppe 2: Weiterführende Begriffe',
    begriffe: [
      {
        begriff: 'Beispielbegriff D',
        definition: 'Definition von D. Baut auf den Grundbegriffen auf.',
        merke: 'Kurzmerksatz für D.',
      },
      {
        begriff: 'Beispielbegriff E',
        definition: 'Definition von E.',
      },
    ],
  },
]
