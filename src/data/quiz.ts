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
    art: 'eingabe',
    frage: 'Stimmen nach Gehör: In welchem Bund der G-Saite greifst du den Ton der leeren H-Saite?',
    loesungen: ['4'],
    toleranz: 0,
    platzhalter: 'Bund-Nummer',
    erklaerung: 'Überall gilt der 5. Bund – nur zwischen G- und H-Saite ist es der 4. Bund, weil diese beiden Saiten nur eine große Terz (4 Halbtöne) auseinanderliegen.',
    quelle: 'Schritt 1: Vorbereitung',
  },

  // ── Schritt 2: Offene Akkorde ───────────────────────────────────────────
  {
    art: 'zuordnung',
    frage: 'Ordne jedem Akkord seine Kurzschrift zu (von tiefem E nach hohem e).',
    paare: [
      { begriff: 'C', ziel: 'x32010' },
      { begriff: 'G', ziel: '320003' },
      { begriff: 'D', ziel: 'xx0232' },
      { begriff: 'Em', ziel: '022000' },
      { begriff: 'Am', ziel: 'x02210' },
    ],
    erklaerung: 'x = nicht anschlagen, 0 = Leersaite, Zahl = Bund. Beispiel C: A-Saite 3. Bund, D-Saite 2. Bund, H-Saite 1. Bund.',
    quelle: 'Schritt 2: Offene Akkorde',
  },
  {
    art: 'single',
    frage: 'Was ändert sich beim Wechsel von D nach Dm?',
    optionen: [
      { text: 'Die hohe e-Saite wandert vom 2. in den 1. Bund' },
      { text: 'Die G-Saite wird als Leersaite gespielt', warumFalsch: 'Die G-Saite bleibt im 2. Bund.' },
      { text: 'Die tiefe E-Saite kommt dazu', warumFalsch: 'Bei D und Dm werden nur die vier hohen Saiten gespielt.' },
      { text: 'Alle Finger rutschen einen Bund höher', warumFalsch: 'Das würde einen ganz anderen Akkord ergeben.' },
    ],
    richtige: 0,
    erklaerung: 'D = xx0232, Dm = xx0231. Nur ein Ton (die Terz, Fis → F) ändert sich – genau das macht den Unterschied zwischen Dur und Moll.',
    quelle: 'Schritt 2: Offene Akkorde',
  },
  {
    art: 'kategorien',
    frage: 'Sortiere die Akkorde nach ihrer Art.',
    kategorien: ['Dur', 'Moll', 'Septakkord'],
    items: [
      { text: 'C', kategorie: 'Dur' },
      { text: 'A', kategorie: 'Dur' },
      { text: 'Am', kategorie: 'Moll' },
      { text: 'Em', kategorie: 'Moll' },
      { text: 'Dm', kategorie: 'Moll' },
      { text: 'G7', kategorie: 'Septakkord' },
      { text: 'E7', kategorie: 'Septakkord' },
      { text: 'G', kategorie: 'Dur' },
    ],
    erklaerung: 'Nur der Buchstabe = Dur, kleines „m" = Moll, „7" = Septakkord.',
    quelle: 'Schritt 2: Offene Akkorde',
  },
  {
    art: 'zuordnung',
    frage: 'Wohin „möchte" jeder Septakkord sich auflösen?',
    paare: [
      { begriff: 'G7', ziel: 'C' },
      { begriff: 'D7', ziel: 'G' },
      { begriff: 'A7', ziel: 'D' },
      { begriff: 'E7', ziel: 'A' },
    ],
    erklaerung: 'Ein Septakkord löst sich natürlich in den Akkord eine Quinte tiefer auf (bzw. eine Quarte höher): G7 → C, D7 → G, A7 → D, E7 → A.',
    quelle: 'Schritt 2: Offene Akkorde',
  },

  // ── Schritt 3: Akkordwechsel ────────────────────────────────────────────
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
    erklaerung: 'Das Timing hat Vorrang vor dem perfekten Griff: Der Rhythmus läuft weiter, die Greifhand holt auf. Ankerfinger und frühes Vorbereiten sparen Zeit.',
    quelle: 'Schritt 3: Akkordwechsel',
  },
  {
    art: 'single',
    frage: 'Welcher Finger bleibt beim Wechsel C ↔ Am liegen?',
    optionen: [
      { text: 'Zeige- und Mittelfinger' },
      { text: 'Nur der Ringfinger', warumFalsch: 'Der Ringfinger ist genau der, der wandert (A-Saite 3. Bund → G-Saite 2. Bund).' },
      { text: 'Keiner – alle Finger müssen neu greifen', warumFalsch: 'C (x32010) und Am (x02210) teilen sich zwei gegriffene Töne.' },
      { text: 'Nur der kleine Finger', warumFalsch: 'Der kleine Finger wird bei beiden Griffen nicht gebraucht.' },
    ],
    richtige: 0,
    erklaerung: 'Zeigefinger (H-Saite, 1. Bund) und Mittelfinger (D-Saite, 2. Bund) sind in beiden Griffen gleich – nur der Ringfinger bewegt sich.',
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
    erklaerung: 'Zählweise: 1 (↓) und (–) 2 (↓) und (↑) 3 (–) und (↑) 4 (↓) und (↑). Abschläge fallen auf die Zahlen, Aufschläge auf „und".',
    quelle: 'Schritt 4: Rhythmus',
  },
  {
    art: 'wahrfalsch',
    frage: 'Markiere jede Aussage zum Rhythmus als wahr oder falsch.',
    aussagen: [
      { text: 'Bei einem Luftschlag bewegt sich die Schlaghand weiter, trifft aber die Saiten nicht.', wahr: true },
      { text: 'Bei geswingten Achteln sind beide Achtel gleich lang.', wahr: false, warum: 'Beim Swing ist die erste Achtel lang, die zweite kurz (ca. 2 : 1).' },
      { text: 'Backbeat bedeutet, die Schläge 2 und 4 zu betonen.', wahr: true },
      { text: 'Für Palm Muting legt man den Handballen auf die Saiten direkt am Schallloch.', wahr: false, warum: 'Der Ballen liegt direkt am Steg – am Schallloch wären die Saiten fast komplett abgedämpft.' },
      { text: '60 BPM bedeutet einen Schlag pro Sekunde.', wahr: true },
    ],
    erklaerung: 'Luftschläge halten das Pendel im Takt, Swing ist „lang-kurz", Backbeat = 2 und 4, Palm Muting am Steg, 60 BPM = 1 Schlag/Sekunde.',
    quelle: 'Schritt 4: Rhythmus',
  },

  // ── Schritt 5: Song ─────────────────────────────────────────────────────
  {
    art: 'eingabe',
    frage: 'Du trägst einen Kapodaster im 2. Bund und greifst G. Welcher Akkord klingt?',
    loesungen: ['A', 'A-Dur', 'A Dur', 'Adur'],
    platzhalter: 'Akkordname',
    erklaerung: 'Pro Kapo-Bund einen Halbton höher: G → G♯ → A. Also klingt A.',
    quelle: 'Schritt 5: Song',
  },
  {
    art: 'single',
    frage: 'Im Songblatt steht ein F-Dur, das du noch nicht als Barré greifen kannst. Welche Kapo-Lösung ergibt einen offenen Griff?',
    optionen: [
      { text: 'Kapo im 1. Bund und E-Griff' },
      { text: 'Kapo im 2. Bund und C-Griff', warumFalsch: 'C + 2 Halbtöne = D, nicht F.' },
      { text: 'Kapo im 1. Bund und G-Griff', warumFalsch: 'G + 1 Halbton = G♯.' },
      { text: 'Kapo im 5. Bund und A-Griff', warumFalsch: 'A + 5 Halbtöne = D.' },
    ],
    richtige: 0,
    erklaerung: 'E + 1 Halbton = F. Alternativ: Kapo 3 + D-Griff (D + 3 = F). Wichtig: Alle anderen Akkorde des Songs müssen dann ebenfalls um denselben Abstand umgerechnet werden.',
    quelle: 'Schritt 5: Song',
  },
  {
    art: 'eingabe',
    frage: 'Das Originaltempo eines Songs liegt bei 150 BPM. Mit welchem Tempo beginnst du nach der 60-%-Regel zu üben?',
    loesungen: ['90'],
    toleranz: 0,
    platzhalter: 'BPM',
    erklaerung: '150 × 0,6 = 90 BPM. Klappt es 3× fehlerfrei, steigerst du um 5 BPM.',
    quelle: 'Schritt 5: Song',
  },
  {
    art: 'reihenfolge',
    frage: 'Bring die Schritte zum Erarbeiten eines Songs in eine sinnvolle Reihenfolge.',
    schritte: [
      'Songstruktur heraushören und Takte zählen',
      'Tempo bestimmen',
      'Akkorde aus legaler Quelle in die Songkarte eintragen',
      'Jeden Abschnitt einzeln im Übetempo üben',
      'Übergänge zwischen den Abschnitten üben',
      'Im Originaltempo zur Aufnahme mitspielen',
    ],
    erklaerung: 'Erst verstehen (Struktur, Tempo, Akkorde), dann in kleinen Teilen üben, dann zusammensetzen und zum Schluss das Tempo steigern.',
    quelle: 'Schritt 5: Song',
  },
]
