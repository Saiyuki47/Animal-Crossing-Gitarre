# Animal Crossing Gitarre

Interaktive Lernseite, um **„Go K.K. Rider"** aus Animal Crossing auf der Akustikgitarre zu lernen: Akkordgriffe, Schlagmuster, Techniken und Übungen – in fünf Lernschritten vom Stimmen bis zum Mitspielen. Erstellt aus dem [`lernseite-template`](https://github.com/Saiyuki47/lernseite-template); Aufbau und Styling sind identisch zu den übrigen Lernseiten.

> Das Lied ist urheberrechtlich geschützt (© Nintendo). Die Seite enthält bewusst keine Transkription (Noten, Tabs oder Akkordfolge) des Songs, sondern alles, was man braucht, um ihn mit Akkorden aus einer legalen Quelle zu spielen.

## Tabs

| Tab | Inhalt |
|-----|--------|
| **Lernschritte** | 5 Schritte (Vorbereitung → Offene Akkorde → Akkordwechsel → Rhythmus → Song) mit Übungen, Tipps, Griffbildern und „Woran merke ich, dass es sitzt?" – Fortschritt wird gespeichert |
| **Griffe & Technik** | Untertab **🎸 Griffe & Technik** (Griffbilder aller offenen Dur-, Moll- und Septakkorde, Schlagmuster, Swing, Kapodaster, Übe-Tipps) und **🧠 Begriffe lernen** (Glossar mit Lernmodus) |
| **Spickzettel** | Druckbare A4-Seite mit allen Griffbildern und Kurzregeln |
| **Werkzeuge** | Metronom mit mitlaufender Schlagmuster-Anzeige und Swing, „Tempo tippen" zum BPM-Bestimmen, Stimmtöne pro Saite |
| **Karteikarten** | Spaced Repetition (SM-2), automatisch aus Übungen + Quiz abgeleitet |
| **Quiz** | 15 Fragen in 7 Fragetypen, filterbar nach Lernschritt |

Die Tab-IDs (`#uebung`, `#referenz`, `#hilfsmittel`, `#karten`, `#quiz`) entsprechen denen der anderen Lernseiten; nur die Beschriftungen sind angepasst, und statt `#moodle` gibt es `#werkzeuge` (alte Links werden umgeleitet).

## Quickstart

```bash
npm install
npm run dev
```

## Inhalte bearbeiten

| Datei | Inhalt |
|-------|--------|
| `src/data/akkorde.ts` | Griffe (Bund + Finger pro Saite, tiefes E → hohes e) – daraus entstehen alle Griffbilder |
| `src/data/uebungsblaetter.ts` | Die Lernschritte; verweisen per `aufgabeId` auf Übungen |
| `src/data/aufgaben.ts` | Übungen mit Text, Tipp, Ziel (`loesung`) und optionalen `akkorde` für Griffbilder |
| `src/data/referenz.tsx` | Nachschlagekarten „Griffe & Technik" |
| `src/data/begriffe.ts` | Glossar |
| `src/data/quiz.ts` | Quizfragen (`quelle` = Lernschritt, dient als Filter) |

Karteikarten (`data/karteikarten.ts`) und Suchindex (`data/searchIndex.ts`) bauen sich automatisch aus diesen Daten.

### Beispiel: Akkord hinzufügen

```ts
// src/data/akkorde.ts – Saiten von tief (E) nach hoch (e)
{ id: 'Bm7', name: 'Bm7', gruppe: 'Moll', bund: [null, 2, 0, 2, 0, 2], finger: [null, 1, null, 2, null, 3] }
```

## Deploy

`vite.config.ts` steht auf `base: './'`. `.github/workflows/deploy.yml` deployt bei jedem Push auf `main` nach GitHub Pages (in den Repo-Einstellungen unter **Pages** als Quelle „GitHub Actions" wählen).

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/), [Vite](https://vite.dev/)
- Web Audio API für Metronom und Stimmtöne (keine Audio-Dateien nötig)
- gemeinsame UI/Logik aus [`lernseiten-ui`](https://github.com/Saiyuki47/lernseiten-ui)
