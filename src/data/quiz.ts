import type { QuizFrage } from 'lernseiten-ui'

// Quizfragen zu den Lernschritten. `quelle` = Lernschritt (dient auch als Filter-Chip).
// Fragetypen: single, multi, zuordnung, reihenfolge, kategorien, eingabe, wahrfalsch.
export const quizFragen: QuizFrage[] = [
  // ── Schritt 1: Vorbereitung ─────────────────────────────────────────────
  {
    art: 'single',
    frage: 'Welche Saite ist die „1. Saite" der Gitarre?',
    optionen: [
      { text: 'Die dünnste, hohe e-Saite' },
      { text: 'Die dickste, tiefe E-Saite', warumFalsch: 'Die tiefe E-Saite ist die 6. Saite – gezählt wird von der dünnsten aus.' },
      { text: 'Die A-Saite', warumFalsch: 'Die A-Saite ist die 5. Saite.' },
      { text: 'Die Saite, die am nächsten zum Kopf liegt', warumFalsch: 'Alle Saiten laufen zum Kopf – die Nummer hängt von der Dicke ab.' },
    ],
    richtige: 0,
    erklaerung: 'Gezählt wird von der dünnsten (1, hohes e) zur dicksten (6, tiefes E) Saite.',
    quelle: 'Schritt 1: Vorbereitung',
  },
  {
    art: 'reihenfolge',
    frage: 'Bring die Töne der Standardstimmung in die richtige Reihenfolge – von der dicksten zur dünnsten Saite.',
    schritte: ['E (tief)', 'A', 'D', 'G', 'H', 'e (hoch)'],
    erklaerung: 'E – A – D – G – H – e. Merksatz: „Eine Alte Dame Geht Heute Einkaufen".',
    quelle: 'Schritt 1: Vorbereitung',
  },
  {
    art: 'single',
    frage: 'Warum spielen wir Go K.K. Rider zuerst mit Kapodaster im 4. Bund?',
    optionen: [
      { text: 'Weil die Original-Akkorde (G♯m, F♯, C♯m …) Barré-Griffe sind und mit Kapo zu einfachen offenen Griffen werden' },
      { text: 'Weil der Song mit Kapo schneller wird', warumFalsch: 'Der Kapo ändert die Tonhöhe, nicht das Tempo.' },
      { text: 'Weil man ohne Kapo nicht stimmen kann', warumFalsch: 'Gestimmt wird sogar immer OHNE Kapo.' },
      { text: 'Weil der Song dadurch tiefer klingt', warumFalsch: 'Ein Kapo macht immer höher – hier genau so hoch wie das Original.' },
    ],
    richtige: 0,
    erklaerung: 'Mit Kapo im 4. Bund klingt Em wie G♯m, D wie F♯, C wie E usw. – derselbe Klang wie im Original, aber mit Anfänger-Griffen.',
    quelle: 'Schritt 1: Vorbereitung',
  },

  // ── Schritt 2: Song-Akkorde ─────────────────────────────────────────────
  {
    art: 'zuordnung',
    frage: 'Kapo im 4. Bund: Welchen Griff spielst du für den Akkord im Akkordblatt?',
    paare: [
      { begriff: 'G♯m', ziel: 'Em' },
      { begriff: 'F♯', ziel: 'D' },
      { begriff: 'E', ziel: 'C' },
      { begriff: 'D♯7', ziel: 'B7' },
      { begriff: 'C♯m', ziel: 'Am' },
    ],
    erklaerung: 'Griff = Akkord im Blatt minus 4 Halbtöne. Beispiel: G♯ → G → F♯ → F → E, also G♯m → Em.',
    quelle: 'Schritt 2: Song-Akkorde',
  },
  {
    art: 'zuordnung',
    frage: 'Ordne jedem Song-Griff seine Kurzschrift zu (von tiefem E nach hohem e).',
    paare: [
      { begriff: 'Em', ziel: '022000' },
      { begriff: 'D', ziel: 'xx0232' },
      { begriff: 'C', ziel: 'x32010' },
      { begriff: 'B7', ziel: 'x21202' },
      { begriff: 'Am', ziel: 'x02210' },
    ],
    erklaerung: 'x = nicht anschlagen, 0 = Leersaite, Zahl = Bund. Bei B7 bleibt die H-Saite offen (die 0 an fünfter Stelle).',
    quelle: 'Schritt 2: Song-Akkorde',
  },
  {
    art: 'eingabe',
    frage: 'Du hast den Kapo im 4. Bund und greifst G. Welcher Akkord klingt? (Tipp: so heißt er im Akkordblatt)',
    loesungen: ['B', 'H', 'H-Dur', 'B-Dur'],
    platzhalter: 'Akkordname',
    erklaerung: 'G + 4 Halbtöne: G♯ → A → A♯ → B (deutsch: H). Im Akkordblatt steht deshalb „B".',
    quelle: 'Schritt 2: Song-Akkorde',
  },

  // ── Schritt 3: Akkordwechsel ────────────────────────────────────────────
  {
    art: 'single',
    frage: 'Welcher Finger bleibt beim Wechsel B7 ↔ Em liegen?',
    optionen: [
      { text: 'Der Mittelfinger auf der A-Saite im 2. Bund' },
      { text: 'Der Zeigefinger auf der D-Saite', warumFalsch: 'Bei Em ist die D-Saite im 2. Bund mit dem Ringfinger gegriffen, bei B7 im 1. Bund mit dem Zeigefinger.' },
      { text: 'Der kleine Finger auf der hohen e-Saite', warumFalsch: 'Bei Em ist die hohe e-Saite offen.' },
      { text: 'Keiner – alle Finger wechseln', warumFalsch: 'Beide Griffe drücken die A-Saite im 2. Bund – mit dem Mittelfinger.' },
    ],
    richtige: 0,
    erklaerung: 'B7 = x21202, Em = 022000: Die A-Saite im 2. Bund ist in beiden Griffen gleich – der Mittelfinger bleibt als Anker liegen.',
    quelle: 'Schritt 3: Akkordwechsel',
  },
  {
    art: 'single',
    frage: 'Im Akkordblatt stehen in einer Zeile zwei Akkorde, z.B. „C♯m D♯7". Wie lange klingt jeder davon?',
    optionen: [
      { text: 'Zwei Schläge – jeder bekommt einen halben Takt' },
      { text: 'Vier Schläge – jeder einen ganzen Takt', warumFalsch: 'Eine Zeile ist ein Takt; zwei Akkorde teilen ihn sich.' },
      { text: 'Einen Schlag', warumFalsch: 'Dann blieben zwei Schläge im Takt übrig.' },
      { text: 'Das ist beliebig', warumFalsch: 'Der Wechsel muss auf der 3 passieren, sonst passt es nicht zur Melodie.' },
    ],
    richtige: 0,
    erklaerung: 'Im 4/4-Takt: Akkord 1 auf „1 2", Akkord 2 auf „3 4". Mit Kapo heißt die Stelle Am → B7.',
    quelle: 'Schritt 3: Akkordwechsel',
  },
  {
    art: 'multi',
    frage: 'Was hilft gegen stockende Akkordwechsel?',
    optionen: [
      { text: 'Ankerfinger liegen lassen, wenn sie in beiden Griffen gleich sind' },
      { text: 'Den Wechsel schon auf der letzten Zählzeit vorbereiten' },
      { text: 'Die Schlaghand weiterpendeln lassen, auch wenn der Griff noch nicht sitzt' },
      { text: 'Die Schlaghand anhalten, bis der neue Griff perfekt sitzt', warumFalsch: 'Dann bricht der Rhythmus jedes Mal ab. Besser: weiterschlagen, notfalls kurz Leersaiten klingen lassen.' },
    ],
    richtige: [0, 1, 2],
    erklaerung: 'Das Timing hat Vorrang vor dem perfekten Griff: Der Rhythmus läuft weiter, die Greifhand holt auf.',
    quelle: 'Schritt 3: Akkordwechsel',
  },

  // ── Schritt 4: Rhythmus ─────────────────────────────────────────────────
  {
    art: 'single',
    frage: 'Im Muster ↓ – ↓ ↑ – ↑ ↓ ↑ (Achtel): Auf welchen Zählzeiten liegen die Aufschläge?',
    optionen: [
      { text: '„2 und", „3 und", „4 und"' },
      { text: '1, 2, 3', warumFalsch: 'Auf den Zahlen liegen immer Abschläge.' },
      { text: '„1 und", „2 und", „3 und"', warumFalsch: 'Auf „1 und" liegt ein Luftschlag (–).' },
      { text: 'Nur auf der 4', warumFalsch: 'Die 4 ist ein Abschlag.' },
    ],
    richtige: 0,
    erklaerung: 'Zählweise: 1 (↓) und (–) 2 (↓) und (↑) 3 (–) und (↑) 4 (↓) und (↑). Auf der 3 ist eine Lücke – perfekt für Akkordwechsel mitten im Takt.',
    quelle: 'Schritt 4: Rhythmus',
  },
  {
    art: 'wahrfalsch',
    frage: 'Markiere jede Aussage als wahr oder falsch.',
    aussagen: [
      { text: 'Bei einem Luftschlag bewegt sich die Schlaghand weiter, trifft aber die Saiten nicht.', wahr: true },
      { text: 'Bei geswingten Achteln sind beide Achtel gleich lang.', wahr: false, warum: 'Beim Swing ist die erste Achtel lang, die zweite kurz (ca. 2 : 1).' },
      { text: 'Bei 120 BPM kommen zwei Schläge pro Sekunde.', wahr: true },
      { text: 'Der Song steht im 3/4-Takt.', wahr: false, warum: 'Es ist ein 4/4-Takt: „1 2 3 4".' },
    ],
    erklaerung: 'Luftschläge halten das Pendel im Takt, Swing ist „lang-kurz", 120 BPM = 2 Schläge/Sekunde, 4/4-Takt.',
    quelle: 'Schritt 4: Rhythmus',
  },

  // ── Schritt 5: Song ─────────────────────────────────────────────────────
  {
    art: 'eingabe',
    frage: 'Das Originaltempo liegt bei etwa 150 BPM. Welches Tempo sind 60 % davon?',
    loesungen: ['90'],
    toleranz: 2,
    platzhalter: 'BPM',
    erklaerung: '150 × 0,6 = 90 BPM. Ganz am Anfang darfst du noch langsamer starten (die Seite schlägt 70 vor); klappt es 3× fehlerfrei, steigerst du um 5 BPM.',
    quelle: 'Schritt 5: Song',
  },
  {
    art: 'single',
    frage: 'Nach der Pfeif-Strophe geht der Song einen Halbton höher weiter. Was machst du mit Kapo?',
    optionen: [
      { text: 'Kapo vom 4. in den 5. Bund versetzen und dieselben Griffe weiterspielen' },
      { text: 'Kapo abnehmen und weiter Em, D, C greifen', warumFalsch: 'Dann klingt alles 4 Halbtöne zu tief.' },
      { text: 'Kapo in den 3. Bund versetzen', warumFalsch: 'Das wäre einen Halbton tiefer statt höher.' },
      { text: 'Nichts – der Kapo gleicht das automatisch aus', warumFalsch: 'Der Kapo sitzt fest; höher klingt es nur, wenn er einen Bund weiter wandert.' },
    ],
    richtige: 0,
    erklaerung: 'Ein Bund = ein Halbton. Kapo 5 + dieselben Griffe = alles einen Halbton höher.',
    quelle: 'Schritt 5: Song',
  },
  {
    art: 'reihenfolge',
    frage: 'Bring die Schritte zum Erarbeiten des Songs in eine sinnvolle Reihenfolge.',
    schritte: [
      'Songblatt mit den Kapo-Griffen kennenlernen',
      'Aufbau beim Hören mitzählen',
      'Intro, Strophe und Refrain einzeln bei 70 BPM üben',
      'Übergänge und Bridge üben',
      'Tonartwechsel (Kapo 4 → 5) üben',
      'Mit ca. 150 BPM zum Original mitspielen',
    ],
    erklaerung: 'Erst verstehen (Blatt, Aufbau), dann in kleinen Teilen üben, dann zusammensetzen und zum Schluss das Tempo steigern.',
    quelle: 'Schritt 5: Song',
  },

  // ── Schritt 6: Barré (Bonus) ────────────────────────────────────────────
  {
    art: 'kategorien',
    frage: 'Welche Akkorde aus dem Song sind offene Griffe, welche Barré-Griffe (ohne Kapo)?',
    kategorien: ['Offener Griff', 'Barré-Griff'],
    items: [
      { text: 'Em', kategorie: 'Offener Griff' },
      { text: 'B7', kategorie: 'Offener Griff' },
      { text: 'Am', kategorie: 'Offener Griff' },
      { text: 'E', kategorie: 'Offener Griff' },
      { text: 'G♯m', kategorie: 'Barré-Griff' },
      { text: 'F♯', kategorie: 'Barré-Griff' },
      { text: 'C♯m', kategorie: 'Barré-Griff' },
      { text: 'B (H)', kategorie: 'Barré-Griff' },
    ],
    erklaerung: 'Offene Griffe nutzen Leersaiten in den ersten Bünden. G♯m, F♯, C♯m und B brauchen den Zeigefinger als Barré.',
    quelle: 'Schritt 6: Barré (Bonus)',
  },
  {
    art: 'zuordnung',
    frage: 'Aus welcher Form und in welchem Bund entsteht der Barré-Akkord?',
    paare: [
      { begriff: 'F♯', ziel: 'E-Form, 2. Bund' },
      { begriff: 'G♯m', ziel: 'Em-Form, 4. Bund' },
      { begriff: 'B (H)', ziel: 'A-Form, 2. Bund' },
      { begriff: 'C♯m', ziel: 'Am-Form, 4. Bund' },
    ],
    erklaerung: 'Die Form bestimmt Dur/Moll, der Bund des Zeigefingers den Grundton: E + 2 Halbtöne = F♯, E + 4 = G♯, A + 2 = B, A + 4 = C♯.',
    quelle: 'Schritt 6: Barré (Bonus)',
  },

  // ── Schritt 7: K.K. Cruisin' ────────────────────────────────────────────
  {
    art: 'zuordnung',
    frage: "K.K. Cruisin' mit Kapo im 6. Bund: Welchen Griff spielst du für den Akkord im Akkordblatt?",
    paare: [
      { begriff: 'B7', ziel: 'F7' },
      { begriff: 'B♭7', ziel: 'E7' },
      { begriff: 'E♭7sus2', ziel: 'A7sus2' },
      { begriff: 'A♭7', ziel: 'D7' },
      { begriff: 'G♭7', ziel: 'C7' },
    ],
    erklaerung: 'Griff = Akkord im Blatt minus 6 Halbtöne. Beispiel: B → B♭ → A → A♭ → G → G♭ → F, also B7 → F7.',
    quelle: "Schritt 7: K.K. Cruisin'",
  },
  {
    art: 'reihenfolge',
    frage: "Bring die Cruisin'-Schleife (mit Kapo 6) in die richtige Reihenfolge.",
    schritte: ['F7', 'E7', 'A7sus2', 'D7'],
    erklaerung: 'F7 → E7 → A7sus2 → D7 (jedes zweite Mal C7 statt D7). Im Original: B7 → B♭7 → E♭7sus2 → A♭7.',
    quelle: "Schritt 7: K.K. Cruisin'",
  },
  {
    art: 'wahrfalsch',
    frage: "Markiere jede Aussage über K.K. Cruisin' als wahr oder falsch.",
    aussagen: [
      { text: 'Fast der ganze Song besteht aus einer Schleife von vier Akkorden.', wahr: true },
      { text: 'Der zweite Refrain beginnt mit einer Pause (N.C.).', wahr: true },
      { text: 'Vor dem letzten Refrain wandert der Kapo vom 6. in den 7. Bund.', wahr: true },
      { text: 'Beim Wechsel D7 → F7 muss der Mittelfinger auf eine andere Saite.', wahr: false, warum: 'Der Mittelfinger bleibt auf der G-Saite im 2. Bund – nur der Zeigefinger legt sich als Mini-Barré in den 1. Bund.' },
    ],
    erklaerung: 'Die Schleife F7 – E7 – A7sus2 – D7/C7 trägt den Song, Refrain 2 startet mit einer Pause, und der Tonartwechsel funktioniert wie bei Go K.K. Rider: Kapo einen Bund höher, gleiche Griffe.',
    quelle: "Schritt 7: K.K. Cruisin'",
  },
]
