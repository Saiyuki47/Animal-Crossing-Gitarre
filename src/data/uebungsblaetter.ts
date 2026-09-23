import type { Uebungsblatt } from '../types'
import { AKKORDBLATT_URL } from './song'

// Lernschritte – vom Stimmen bis zu Go K.K. Rider. Schritte 1–5 mit Kapodaster im
// 4. Bund, Schritt 6 als Bonus mit Barré-Griffen im Original. Jeder Schritt verweist
// per `aufgabeId` auf eine Übung aus data/aufgaben.ts.
export const uebungsblaetter: Uebungsblatt[] = [
  {
    id: 'vorbereitung',
    nr: '1',
    titel: 'Vorbereitung',
    typ: 'Grundlagen',
    dauer: '1–2 Tage · 10 Min.',
    beschreibung: 'Gitarre stimmen, richtig sitzen, Kapodaster in den 4. Bund setzen und die ersten sauberen Töne. Der Kapo macht aus den schweren Original-Akkorden einfache Griffe.',
    aufgaben: [
      { nr: 1, text: 'Stimme die Gitarre auf E – A – D – G – H – e.', aufgabeId: 'stimmen' },
      { nr: 2, text: 'Finde eine entspannte Haltung und halte das Plektrum richtig.', aufgabeId: 'haltung' },
      { nr: 3, text: 'Setz den Kapodaster in den 4. Bund.', aufgabeId: 'kapo' },
      { nr: 4, text: 'Greif Em so, dass alle sechs Saiten klar klingen.', aufgabeId: 'sauber-greifen' },
    ],
  },
  {
    id: 'akkorde',
    nr: '2',
    titel: 'Die Song-Akkorde',
    typ: 'Technik',
    dauer: '1–2 Wochen · 15 Min.',
    beschreibung: 'Mit Kapo im 4. Bund brauchst du für den ganzen Song nur sieben Griffe: Em, D, C, B7, G, Am und F (plus einmal E7 ganz am Schluss).',
    aufgaben: [
      { nr: 1, text: 'Lerne die Intro-Akkorde Em, D und C.', aufgabeId: 'akk-intro' },
      { nr: 2, text: 'Lerne B7 – den Schlüsselakkord des Songs.', aufgabeId: 'akk-b7' },
      { nr: 3, text: 'Lerne G und Am.', aufgabeId: 'akk-g-am' },
      { nr: 4, text: 'Lerne das kleine F (oder Fmaj7 als Ersatz).', aufgabeId: 'akk-f' },
    ],
  },
  {
    id: 'wechsel',
    nr: '3',
    titel: 'Akkordwechsel aus dem Song',
    typ: 'Technik',
    dauer: '1–2 Wochen · 15 Min.',
    beschreibung: 'Genau die Wechsel, die im Song vorkommen – die schwierigsten zuerst. Hier entscheidet sich, ob der Song „läuft".',
    aufgaben: [
      { nr: 1, text: 'Spiel die Intro-Kette Em → D → C → B7 in Schleife.', aufgabeId: 'wechsel-intro' },
      { nr: 2, text: 'Wechsle B7 ↔ Em mit Ankerfinger.', aufgabeId: 'wechsel-anker' },
      { nr: 3, text: 'One-Minute-Changes: C ↔ B7, G ↔ F, F ↔ Em, Am ↔ B7.', aufgabeId: 'wechsel-omc' },
      { nr: 4, text: 'Zwei Akkorde in einem Takt wechseln.', aufgabeId: 'wechsel-halbtakt' },
    ],
  },
  {
    id: 'rhythmus',
    nr: '4',
    titel: 'Rhythmus und Schlagmuster',
    typ: 'Rhythmus',
    dauer: '1 Woche · 15 Min.',
    beschreibung: 'Der Song läuft im 4/4-Takt mit 120 BPM. Vom einfachen Viertel-Anschlag zum Schlagmuster für den Song.',
    aufgaben: [
      { nr: 1, text: 'Viertel-Abschläge zum Metronom.', aufgabeId: 'viertel' },
      { nr: 2, text: 'Achtel mit Ab- und Aufschlag.', aufgabeId: 'achtel' },
      { nr: 3, text: 'Das Schlagmuster ↓ – ↓ ↑ – ↑ ↓ ↑ über die Intro-Kette.', aufgabeId: 'pattern' },
      { nr: 4, text: 'Finde heraus: gerade oder geswingte Achtel?', aufgabeId: 'swing' },
    ],
  },
  {
    id: 'song',
    nr: '5',
    titel: 'Go K.K. Rider mit Kapo',
    typ: 'Song',
    dauer: '2–3 Wochen · 20 Min.',
    beschreibung: 'Jetzt kommt alles zusammen: Akkordblatt in Kapo-Griffe übersetzen, Aufbau mitzählen, abschnittweise üben, Tonartwechsel meistern und zum Original mitspielen.',
    link: { text: '🎼 Akkordblatt bei Ultimate Guitar öffnen', url: AKKORDBLATT_URL },
    aufgaben: [
      { nr: 1, text: 'Übersetze das Akkordblatt in Kapo-Griffe.', aufgabeId: 'song-blatt' },
      { nr: 2, text: 'Prüfe den Aufbau und zähl die Takte mit.', aufgabeId: 'song-aufbau' },
      { nr: 3, text: 'Übe Intro, Strophe und Refrain einzeln.', aufgabeId: 'song-abschnitte' },
      { nr: 4, text: 'Übe die Übergänge und die Bridge.', aufgabeId: 'song-uebergaenge' },
      { nr: 5, text: 'Meistere den Tonartwechsel (Kapo 4 → 5).', aufgabeId: 'song-tonartwechsel' },
      { nr: 6, text: 'Spiel zum Original mit.', aufgabeId: 'song-original' },
    ],
  },
  {
    id: 'barre',
    nr: '6',
    titel: 'Bonus: Barré und Original',
    typ: 'Bonus',
    dauer: '4+ Wochen · 15 Min.',
    beschreibung: 'Freiwillig und anspruchsvoll: Kapo ab, der Zeigefinger übernimmt seine Aufgabe. Du lernst die Barré-Formen, mit denen der Song im Original gespielt wird – und die du für jeden anderen Song wieder brauchst.',
    link: { text: '🎼 Akkordblatt bei Ultimate Guitar öffnen', url: AKKORDBLATT_URL },
    aufgaben: [
      { nr: 1, text: 'Lerne die Barré-Grundlagen.', aufgabeId: 'barre-grundlagen' },
      { nr: 2, text: 'E-Form: F♯ und F.', aufgabeId: 'barre-e-form' },
      { nr: 3, text: 'Em-Form: G♯m.', aufgabeId: 'barre-em-form' },
      { nr: 4, text: 'A- und Am-Form: B, C♯m, A♯.', aufgabeId: 'barre-a-formen' },
      { nr: 5, text: 'D♯7 und der Wechsel nach G♯m.', aufgabeId: 'barre-dis7' },
      { nr: 6, text: 'Spiel den Song im Original ohne Kapo.', aufgabeId: 'barre-song' },
    ],
  },
]
