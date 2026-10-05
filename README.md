# Animal Crossing Gitarre

Interaktive Lernseite, um **„Go K.K. Rider"** und **„K.K. Cruisin'"** aus Animal Crossing auf der Akustikgitarre zu lernen: Go K.K. Rider mit Kapodaster im 4. Bund in fünf Lernschritten vom Stimmen bis zum Mitspielen, plus Bonus-Schritt mit den Barré-Griffen des Originals; K.K. Cruisin' als zweites Lied (Schritt 7, Kapo im 6. Bund). Erstellt aus dem [`lernseite-template`](https://github.com/Saiyuki47/lernseite-template); Aufbau und Styling sind identisch zu den übrigen Lernseiten.

> Song © Nintendo. Die Akkorde im Songblatt („🎵 Das ganze Lied") stammen aus der Transkription von „HerNameIsRain" auf [Ultimate Guitar](https://tabs.ultimate-guitar.com/tab/misc-computer-games/animal-crossing-go-kk-rider-chords-1452035); Taktaufteilung, Kapo-Griffe und Tipps sind von dieser Lernseite. Keine Melodie-Noten, kein Text.
>
> Abgleich mit weiteren Quellen: Die Akkordfolge der Strophe bestätigt [Hooktheory](https://www.hooktheory.com/theorytab/view/kazumi-totaka/go-kk-rider) (i–VII–VI–VII–III). Refrain-Takt 5 (G♯m → G♯7) ist nach [Gametabs](https://gametabs.net/tabs/animal-crossing/go-kk-rider) und [Ukulele-Tabs](https://www.ukulele-tabs.com/uke-songs/animal-crossing/go-kk-rider-uke-tab-34542.html) ergänzt. Tempo ca. 150 BPM (Hooktheory: 152). Die Tonart ist je nach Aufnahme G♯-Moll (Kapo 4) oder F-Moll (Kapo 1) – die Griffe bleiben gleich.
>
> K.K. Cruisin': Akkorde und Intro-Melodie nach der Transkription von „translucenttomato" auf [Ultimate Guitar](https://tabs.ultimate-guitar.com/tab/misc-computer-games/animal-crossing-kk-cruisin-chords-3940478) (laut Autor leicht vereinfacht), Liedtext bewusst weggelassen. Tonart E♭-Moll und 175 BPM laut [Hooktheory](https://www.hooktheory.com/theorytab/view/kazumi-totaka/kk-cruisin); die ersten drei Akkorde der Strophenschleife stimmen mit der Analyse überein. Ein Akkord pro Takt ist eine Annahme (plausible Songlänge ~2:10 Min.).

## Tabs

| Tab | Inhalt |
|-----|--------|
| **Lernschritte** | 5 Schritte mit Kapo (Vorbereitung → Song-Akkorde → Akkordwechsel aus dem Song → Rhythmus → Song) + Bonus-Schritt Barré + **🎵 Das ganze Lied** (komplettes Songblatt Takt für Takt, Kapo/Original umschaltbar, Tipps je Abschnitt, Mitspiel-Modus mit Einzählen und mitlaufendem Takt), mit Übungen, Tipps, Griffbildern und „Woran merke ich, dass es sitzt?" – Fortschritt wird gespeichert |
| **Griffe & Technik** | Untertab **🎸 Griffe & Technik** (Songüberblick, Kapo-Tabelle, Song-Griffe, Barré-Griffe, Schlagmuster, Übe-Tipps) und **🧠 Begriffe lernen** (Glossar mit Lernmodus) |
| **Spickzettel** | Druckbar: Seite 1 Go K.K. Rider mit Kapo, Seite 2 Barré-Bonus, Seite 3 K.K. Cruisin' |
| **Werkzeuge** | Metronom mit mitlaufender Schlagmuster-Anzeige und Swing, „Tempo tippen" zum BPM-Bestimmen, Stimmgerät über das Mikrofon (erkennt die Saite, zeigt die Abweichung in Cent), Stimmtöne pro Saite |
| **Karteikarten** | Spaced Repetition (SM-2), automatisch aus Übungen + Quiz abgeleitet |
| **Quiz** | 19 Fragen in 7 Fragetypen, filterbar nach Lernschritt |

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
| `src/data/lieder/*.ts` | Ein Lied pro Datei (Abschnitte mit Takten in Original-Akkorden, Tipps, Kapo-Bund je Teil, Quelle); neue Lieder in `lieder/index.ts` eintragen |
| `src/data/songblatt.ts` | Gemeinsame Songblatt-Logik: Transponieren (Kapo-Griffe werden berechnet), Griffbild-Zuordnung, Tabulatur |
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
- Web Audio API für Metronom, Stimmgerät (Tonhöhen-Erkennung per YIN-Verfahren in `src/lib/tonhoehe.ts`, läuft komplett lokal) und Stimmtöne
- gemeinsame UI/Logik aus [`lernseiten-ui`](https://github.com/Saiyuki47/lernseiten-ui)
