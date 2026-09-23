# Animal Crossing Gitarre

Interaktive Lernseite, um **„Go K.K. Rider"** aus Animal Crossing auf der Akustikgitarre zu lernen: mit Kapodaster im 4. Bund in fünf Lernschritten vom Stimmen bis zum Mitspielen, plus Bonus-Schritt mit den Barré-Griffen des Originals. Erstellt aus dem [`lernseite-template`](https://github.com/Saiyuki47/lernseite-template); Aufbau und Styling sind identisch zu den übrigen Lernseiten.

> Das Lied ist urheberrechtlich geschützt (© Nintendo). Die Seite zeigt Aufbau, Tempo und die vorkommenden Akkorde, aber nicht die komplette Akkordfolge – dafür verlinkt sie das [Akkordblatt bei Ultimate Guitar](https://tabs.ultimate-guitar.com/tab/misc-computer-games/animal-crossing-go-kk-rider-chords-1452035).

## Tabs

| Tab | Inhalt |
|-----|--------|
| **Lernschritte** | 5 Schritte mit Kapo (Vorbereitung → Song-Akkorde → Akkordwechsel aus dem Song → Rhythmus → Song) + Bonus-Schritt Barré, mit Übungen, Tipps, Griffbildern und „Woran merke ich, dass es sitzt?" – Fortschritt wird gespeichert |
| **Griffe & Technik** | Untertab **🎸 Griffe & Technik** (Songüberblick, Kapo-Tabelle, Song-Griffe, Barré-Griffe, Schlagmuster, Übe-Tipps) und **🧠 Begriffe lernen** (Glossar mit Lernmodus) |
| **Spickzettel** | Druckbar: Seite 1 Song mit Kapo, Seite 2 Barré-Bonus |
| **Werkzeuge** | Metronom mit mitlaufender Schlagmuster-Anzeige und Swing, „Tempo tippen" zum BPM-Bestimmen, Stimmtöne pro Saite |
| **Karteikarten** | Spaced Repetition (SM-2), automatisch aus Übungen + Quiz abgeleitet |
| **Quiz** | 16 Fragen in 7 Fragetypen, filterbar nach Lernschritt |

Die Tab-IDs (`#uebung`, `#referenz`, `#hilfsmittel`, `#karten`, `#quiz`) entsprechen denen der anderen Lernseiten; nur die Beschriftungen sind angepasst, und statt `#moodle` gibt es `#werkzeuge` (alte Links werden umgeleitet).

## Quickstart

```bash
npm install
npm run dev
```

## Inhalte bearbeiten

| Datei | Inhalt |
|-------|--------|
| `src/data/akkorde.ts` | Griffe (Bund + Finger pro Saite, tiefes E → hohes e, optional `startBund` und `barre`) – daraus entstehen alle Griffbilder |
| `src/data/song.ts` | Songdaten: Tempo, Aufbau, Kapo-Tabellen, Link zum Akkordblatt |
| `src/data/uebungsblaetter.ts` | Die Lernschritte; verweisen per `aufgabeId` auf Übungen |
| `src/data/aufgaben.ts` | Übungen mit Text, Tipp, Ziel (`loesung`) und optionalen `akkorde` für Griffbilder |
| `src/data/referenz.tsx` | Nachschlagekarten „Griffe & Technik" |
| `src/data/begriffe.ts` | Glossar |
| `src/data/quiz.ts` | Quizfragen (`quelle` = Lernschritt, dient als Filter) |

Karteikarten (`data/karteikarten.ts`) und Suchindex (`data/searchIndex.ts`) bauen sich automatisch aus diesen Daten.

### Beispiel: Akkord hinzufügen

```ts
// src/data/akkorde.ts – Saiten von tief (E) nach hoch (e)
{ id: 'Bm', name: 'Bm', gruppe: 'Barré', bund: [null, 2, 4, 4, 3, 2], finger: [null, 1, 3, 4, 2, 1], startBund: 2, barre: { bund: 2, von: 1, bis: 5 } }
```

## Deploy

`vite.config.ts` steht auf `base: './'`. `.github/workflows/deploy.yml` deployt bei jedem Push auf `main` nach GitHub Pages (in den Repo-Einstellungen unter **Pages** als Quelle „GitHub Actions" wählen).

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/), [Vite](https://vite.dev/)
- Web Audio API für Metronom und Stimmtöne (keine Audio-Dateien nötig)
- gemeinsame UI/Logik aus [`lernseiten-ui`](https://github.com/Saiyuki47/lernseiten-ui)
