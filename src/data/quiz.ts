import type { QuizFrage } from 'lernseiten-ui'

// TODO: Ersetze die Beispielfragen durch eigene – aus den Übungsblättern abgeleitet.
// Sieben Fragetypen sind möglich:
//   'single'      – eine richtige Option
//   'multi'       – mehrere richtige Optionen (ankreuzen & prüfen)
//   'zuordnung'   – Begriffe per Drag & Drop ihren Zielen zuordnen
//   'reihenfolge' – Schritte in die richtige Reihenfolge bringen
//   'kategorien'  – Items in Kategorien einsortieren
//   'eingabe'     – Antwort selbst eintippen (Zahl mit Toleranz oder Text)
//   'wahrfalsch'  – mehrere Aussagen als wahr/falsch markieren
export const quizFragen: QuizFrage[] = [
  {
    art: 'single',
    frage: 'Beispiel (Single-Choice): Welche Aussage ist korrekt?',
    optionen: [
      { text: 'Korrekte Aussage A' },
      { text: 'Falsche Aussage B', warumFalsch: 'B stimmt nicht, weil hier X und Y verwechselt werden.' },
      { text: 'Falsche Aussage C', warumFalsch: 'C gilt nur im Spezialfall und nicht allgemein.' },
      { text: 'Falsche Aussage D', warumFalsch: 'D widerspricht der Definition aus der Vorlesung.' },
    ],
    richtige: 0,
    erklaerung: 'A ist korrekt – hier steht die Begründung der Musterlösung.',
    quelle: 'Übungsblatt 1, Aufgabe 1',
  },
  {
    art: 'multi',
    frage: 'Beispiel (Mehrfachauswahl): Welche der folgenden Aussagen treffen zu?',
    optionen: [
      { text: 'Zutreffende Aussage 1' },
      { text: 'Zutreffende Aussage 2' },
      { text: 'Nicht zutreffend 3', warumFalsch: '3 ist ein häufiger Irrtum: tatsächlich gilt das Gegenteil.' },
      { text: 'Nicht zutreffend 4', warumFalsch: '4 vertauscht Ursache und Wirkung.' },
    ],
    richtige: [0, 1],
    erklaerung: '1 und 2 treffen zu; 3 und 4 sind typische Fehlannahmen.',
    quelle: 'Übungsblatt 2, Aufgabe 3',
  },
  {
    art: 'zuordnung',
    frage: 'Beispiel (Zuordnung): Ziehe jeden Begriff auf seine passende Definition.',
    paare: [
      { begriff: 'Begriff A', ziel: 'Definition von A' },
      { begriff: 'Begriff B', ziel: 'Definition von B' },
      { begriff: 'Begriff C', ziel: 'Definition von C' },
      { begriff: 'Begriff D', ziel: 'Definition von D' },
    ],
    erklaerung: 'Jeder Begriff gehört zu der gleichnamigen Definition.',
    quelle: 'Übungsblatt 1',
  },
  {
    art: 'reihenfolge',
    frage: 'Beispiel (Reihenfolge): Bringe die Schritte in die richtige Reihenfolge.',
    schritte: ['Erster Schritt', 'Zweiter Schritt', 'Dritter Schritt', 'Vierter Schritt'],
    erklaerung: 'Die Schritte bauen logisch aufeinander auf.',
    quelle: 'Übungsblatt 2',
  },
  {
    art: 'kategorien',
    frage: 'Beispiel (Kategorisieren): Ordne jedes Element seiner Gruppe zu.',
    kategorien: ['Gruppe A', 'Gruppe B'],
    items: [
      { text: 'Element 1', kategorie: 'Gruppe A' },
      { text: 'Element 2', kategorie: 'Gruppe B' },
      { text: 'Element 3', kategorie: 'Gruppe A' },
      { text: 'Element 4', kategorie: 'Gruppe B' },
    ],
    erklaerung: '1 und 3 gehören zu Gruppe A, 2 und 4 zu Gruppe B.',
    quelle: 'Übungsblatt 2',
  },
  {
    art: 'eingabe',
    frage: 'Beispiel (Eingabe): Was ist 12 × 12?',
    loesungen: ['144'],
    toleranz: 0,
    platzhalter: 'Zahl eingeben',
    erklaerung: '12 × 12 = 144.',
    quelle: 'Übungsblatt 3',
  },
  {
    art: 'wahrfalsch',
    frage: 'Beispiel (Wahr/Falsch): Markiere jede Aussage als wahr oder falsch.',
    aussagen: [
      { text: 'Diese Aussage ist wahr.', wahr: true },
      { text: 'Diese Aussage ist falsch.', wahr: false, warum: 'Tatsächlich gilt das Gegenteil.' },
      { text: 'Auch diese Aussage ist wahr.', wahr: true },
    ],
    erklaerung: 'Aussage 2 ist falsch, die Aussagen 1 und 3 sind wahr.',
    quelle: 'Übungsblatt 1',
  },
]
