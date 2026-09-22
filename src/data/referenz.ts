import type { ReferenzKarte } from 'lernseiten-ui'

// TODO: Ersetze die Platzhalter-Karten mit deinen eigenen Inhalten.
// Jede Karte hat eine stabile `id` (für Inhaltsverzeichnis + Deep-Link
// #referenz/<id>) und kann optional aufklappbare `beispiele`
// (Szenario + Beispiele) mitbringen – wie bei den anderen Lernseiten.
export const referenzKarten: ReferenzKarte[] = [
  {
    id: 'konzept-1',
    titel: 'Konzept 1',
    inhalt: `Wichtige Formel oder Regel
Zeile 2
Zeile 3`,
    beispiele: [
      {
        szenario: 'Beispiel-Szenario: Wann wende ich Konzept 1 an?',
        beispiele: [
          'Beispiel 1: konkrete Anwendung Schritt für Schritt.',
          'Beispiel 2: eine Variante mit anderen Zahlen.',
        ],
      },
    ],
  },
  {
    id: 'konzept-2',
    titel: 'Konzept 2',
    inhalt: `Weitere wichtige Regel
Beispiel: x = a + b`,
  },
  {
    id: 'konzept-3',
    titel: 'Konzept 3',
    inhalt: `Nützlicher Hinweis
Merke: ...`,
  },
]
