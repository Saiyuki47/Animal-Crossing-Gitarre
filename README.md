# Animal Crossing Gitarre

Interaktive Lernseite, um **„Go K.K. Rider"** aus Animal Crossing auf der Akustikgitarre zu lernen: Akkordgriffe, Schlagmuster, Techniken und Übungen. Erstellt aus dem [`lernseite-template`](https://github.com/Saiyuki47/lernseite-template); Aufbau, Tabs und Styling sind identisch zu den übrigen Lernseiten.

> Das Lied ist urheberrechtlich geschützt (© Nintendo). Die Seite enthält keine vollständige Transkription, sondern Lernmaterial rund ums Spielen.

## Features

Die Tab-Reihenfolge kommt zentral aus `lernseiten-ui` und ist über alle Lernseiten gleich:

| Tab | Beschreibung |
|-----|-------------|
| **Übungsblätter** | Aufgaben nach Blatt geordnet, mit optionalem Tipp und aufklappbarer Musterlösung |
| **Referenz** | Zwei Untertabs: **📚 Themen** (Nachschlage-Karten, optional mit Beispielen) und **🧠 Begriffe lernen** (Glossar mit Lernmodus) |
| **Hilfsmittel** | Druckbarer Spickzettel auf A4 (`🖨️ Drucken`) |
| **Karteikarten** | Spaced-Repetition-Lernkarten (SM-2), automatisch aus Aufgaben + Quiz abgeleitet |
| **Moodle** | Material-/Download-Übersicht (Beispielbaum in `data/dateien.ts`) |
| **Quiz** | Quiz mit Fortschrittsbalken, Feedback und Ergebnisauswertung (7 Fragetypen) |

Dazu: globale Suche über alle Inhalte (`data/searchIndex.ts`), Hell/Dunkel-Umschalter, teilbare Deep-Links (`#<tab>` bzw. `#referenz/begriffe`).

## Quickstart

```bash
npm install
npm run dev
```

## Eigene Inhalte eintragen

Für Inhalte fasst du **nur `src/data/`** an – die Komponenten rendern generisch, was in den Daten steht. Ersetze die Platzhalter:

| Datei | Inhalt |
|-------|--------|
| `src/data/aufgaben.ts` | Aufgaben mit Titel, Text, optionalem Tipp und Musterlösung |
| `src/data/uebungsblaetter.ts` | Übungsblätter, die Aufgaben per `aufgabeId` referenzieren |
| `src/data/quiz.ts` | Quizfragen (7 Fragetypen, siehe unten) |
| `src/data/referenz.ts` | Referenz-/Nachschlagekarten (Untertab „Themen"), optional mit `beispiele` |
| `src/data/begriffe.ts` | Glossar-Begriffe (Untertab „Begriffe lernen") |
| `src/data/dateien.ts` | Materialbaum für den Moodle-Tab (in den anderen Fächern aus `public/material/` generiert) |

**Karteikarten und Suchindex bauen sich von selbst:** `data/karteikarten.ts` leitet die Karten aus Aufgaben + Quiz ab, `data/searchIndex.ts` den Suchindex aus Aufgaben, Quiz, Referenz und Begriffen. Beide musst du normalerweise nicht anfassen.

### Beispiel: Aufgabe hinzufügen

```ts
// src/data/aufgaben.ts
{
  id: 'a1',
  titel: '1. Aufgabe',
  aufgabeText: 'Was ist ...?',
  tipp: 'Denke an ...', // optional
  loesung: 'Die Antwort lautet ...', // optional (nur mit Lösung entsteht eine Karteikarte)
  schwierigkeit: 'einfach', // 'einfach' | 'mittel' | 'schwer'
  kategorie: 'Grundlagen', // optional
}
```

### Beispiel: Quiz-Frage hinzufügen

Quizfragen nutzen den geteilten Typ `QuizFrage` aus `lernseiten-ui`. Über das Feld `art` wählst du den Fragetyp; Single-Choice sieht so aus:

```ts
// src/data/quiz.ts
{
  art: 'single',
  frage: 'Was bedeutet ...?',
  optionen: [
    { text: 'Richtige Aussage' },
    { text: 'Falsche Aussage', warumFalsch: 'Stimmt nicht, weil ...' },
  ],
  richtige: 0, // Index der richtigen Option (bei 'multi': z.B. [0, 2])
  erklaerung: 'Warum die richtige Antwort stimmt.',
  quelle: 'Übungsblatt 1, Aufgabe 3', // optional
}
```

Sieben Fragetypen sind möglich (jeweils über `art`): `single`, `multi`, `zuordnung`, `reihenfolge`, `kategorien`, `eingabe`, `wahrfalsch`. Für je ein ausgefülltes Beispiel pro Typ siehe die Platzhalter in [`src/data/quiz.ts`](src/data/quiz.ts).

## Titel & Deploy (einmalig pro Seite)

- **Header** in `src/App.tsx`: `logo` und `subtitle` anpassen.
- **Browser-Titel** in `index.html` (`<title>`): eindeutig setzen – der Karteikarten-Fortschritt wird unter `flashcards:${document.title}` gespeichert.
- **Deploy**: `vite.config.ts` steht auf `base: './'` (funktioniert für GitHub Pages). `.github/workflows/deploy.yml` deployt automatisch bei Push auf `main`.

## Projektstruktur

```
src/
├── components/       # UI-Komponenten (Cheatsheet, Begriffe, Hilfsmittel, Uebungsblaetter)
├── data/             # Inhalte – hier trägst du deine Daten ein
├── App.tsx           # Tab-Verdrahtung (Tab-Leiste zentral aus lernseiten-ui)
├── types.ts          # TypeScript-Typdefinitionen
└── index.css         # Lokales Styling (Theme + geteilte Klassen aus lernseiten-ui/styles.css)
```

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) als Build-Tool
- gemeinsame UI/Logik aus [`lernseiten-ui`](https://github.com/Saiyuki47/lernseiten-ui)
