import type { Uebungsblatt } from '../types'
import { AKKORDBLATT_URL } from './song'
import { KK_CRUISIN } from './lieder/kkCruisin'

// Lernschritte je Lied (`lied` = Untertab). Beide Lieder werden mit den Original-Griffen
// ohne Kapodaster gelernt: Go K.K. Rider in 6 Schritten (offene Griffe und Rhythmus
// zuerst, dann Barré), K.K. Cruisin' in 5 Schritten.
// Jeder Schritt verweist per `aufgabeId` auf eine Übung aus data/aufgaben.ts.
// Die Schritt-IDs bleiben stabil – an ihnen hängt der gespeicherte Fortschritt.
export const uebungsblaetter: Uebungsblatt[] = [
  {
    id: 'vorbereitung',
    lied: 'go-kk-rider',
    nr: '1',
    titel: 'Vorbereitung',
    typ: 'Grundlagen',
    dauer: '1–2 Tage · 10 Min.',
    beschreibung: 'Gitarre stimmen, richtig sitzen, dich auf dem Griffbrett orientieren und die ersten sauberen Töne. Gespielt wird ohne Kapodaster – alle Griffe greifst du selbst.',
    aufgaben: [
      { nr: 1, text: 'Stimme die Gitarre auf E – A – D – G – H – e.', aufgabeId: 'stimmen' },
      { nr: 2, text: 'Finde eine entspannte Haltung und halte das Plektrum richtig.', aufgabeId: 'haltung' },
      { nr: 3, text: 'Finde den 1., 2. und 4. Bund – dort liegen die Barré-Griffe des Songs.', aufgabeId: 'griffbrett' },
      { nr: 4, text: 'Greif E so, dass alle sechs Saiten klar klingen.', aufgabeId: 'sauber-greifen' },
    ],
  },
  {
    id: 'offen',
    lied: 'go-kk-rider',
    nr: '2',
    titel: 'Griffe ohne Barré',
    typ: 'Technik',
    dauer: '1 Woche · 15 Min.',
    beschreibung: 'Erst die Griffe ohne Barré: E, A und D♯7 aus dem ersten Teil, dazu die offenen Griffe für den Schluss nach dem Tonartwechsel. E und A sind außerdem die Vorlagen für die Barré-Griffe in Schritt 4.',
    aufgaben: [
      { nr: 1, text: 'Lerne E und A – die offenen Griffe aus Intro und Strophe.', aufgabeId: 'akk-e-a' },
      { nr: 2, text: 'Lerne D♯7 – den Akkord, der immer nach G♯m führt.', aufgabeId: 'akk-dis7' },
      { nr: 3, text: 'Lerne die Griffe für den Schluss: Am, G, C, Dm, E7 und A7.', aufgabeId: 'akk-schluss' },
    ],
  },
  {
    id: 'rhythmus',
    lied: 'go-kk-rider',
    nr: '3',
    titel: 'Rhythmus und Schlagmuster',
    typ: 'Rhythmus',
    dauer: '1 Woche · 15 Min.',
    beschreibung: 'Der Song läuft im 4/4-Takt mit etwa 150 BPM – du startest mit 70. Geübt wird mit E und A, damit du dich ganz auf die Schlaghand konzentrieren kannst. Lässt sich gut parallel zu Schritt 4 üben.',
    aufgaben: [
      { nr: 1, text: 'Viertel-Abschläge zum Metronom.', aufgabeId: 'viertel' },
      { nr: 2, text: 'Achtel mit Ab- und Aufschlag.', aufgabeId: 'achtel' },
      { nr: 3, text: 'Das Schlagmuster ↓ – ↓ ↑ – ↑ ↓ ↑ mit E und A.', aufgabeId: 'pattern' },
      { nr: 4, text: 'Finde heraus: gerade oder geswingte Achtel?', aufgabeId: 'swing' },
    ],
  },
  {
    id: 'barre',
    lied: 'go-kk-rider',
    nr: '4',
    titel: 'Barré-Griffe',
    typ: 'Technik',
    dauer: '3–4 Wochen · 15 Min.',
    beschreibung: 'Das Herzstück: Der Zeigefinger liegt quer über den Saiten und ersetzt den Sattel – so wird aus einem offenen Griff eine verschiebbare Form. Damit greifst du G♯m, F♯, G♯7, B und C♯m aus dem ersten Teil und F und A♯ aus dem Schluss. Plan Zeit ein: Bis ein Barré sauber klingt, dauert es ein paar Wochen.',
    link: { text: '🎼 Akkordblatt bei Ultimate Guitar öffnen', url: AKKORDBLATT_URL },
    aufgaben: [
      { nr: 1, text: 'Lerne die Barré-Grundlagen.', aufgabeId: 'barre-grundlagen' },
      { nr: 2, text: 'Em-Form: G♯m – der Grundakkord des Songs.', aufgabeId: 'barre-em-form' },
      { nr: 3, text: 'E-Form: F♯ und F.', aufgabeId: 'barre-e-form' },
      { nr: 4, text: 'E7-Form: G♯7.', aufgabeId: 'barre-e7-form' },
      { nr: 5, text: 'A- und Am-Form: B, C♯m und A♯.', aufgabeId: 'barre-a-formen' },
    ],
  },
  {
    id: 'wechsel',
    lied: 'go-kk-rider',
    nr: '5',
    titel: 'Akkordwechsel aus dem Song',
    typ: 'Technik',
    dauer: '2 Wochen · 15 Min.',
    beschreibung: 'Genau die Wechsel, die im Song vorkommen – die häufigsten zuerst. Mit Barré lohnt es sich besonders, die Stellen zu kennen, an denen der Zeigefinger liegen bleiben darf.',
    aufgaben: [
      { nr: 1, text: 'Spiel die Intro-Kette G♯m → F♯ → E → D♯7 in Schleife.', aufgabeId: 'wechsel-intro' },
      { nr: 2, text: 'D♯7 → G♯m – der häufigste Wechsel im Song.', aufgabeId: 'wechsel-dis7' },
      { nr: 3, text: 'Wechsel mit liegendem Barré: F♯ ↔ B und G♯m ↔ C♯m.', aufgabeId: 'wechsel-anker' },
      { nr: 4, text: 'One-Minute-Changes: G♯m ↔ F♯, C♯m ↔ D♯7, F♯ ↔ E, B ↔ A, A ↔ G♯m.', aufgabeId: 'wechsel-omc' },
      { nr: 5, text: 'Die Takte mit zwei Akkorden.', aufgabeId: 'wechsel-halbtakt' },
    ],
  },
  {
    id: 'song',
    lied: 'go-kk-rider',
    nr: '6',
    titel: 'Go K.K. Rider spielen',
    typ: 'Song',
    dauer: '2–3 Wochen · 20 Min.',
    beschreibung: 'Jetzt kommt alles zusammen: Songblatt „🎵 Das ganze Lied" kennenlernen, Aufbau mitzählen, Tonart prüfen, abschnittweise mit dem Mitspiel-Modus üben, den Tonartwechsel meistern und zum Original mitspielen.',
    link: { text: '🎼 Akkordblatt bei Ultimate Guitar öffnen', url: AKKORDBLATT_URL },
    aufgaben: [
      { nr: 1, text: 'Lerne das Songblatt „🎵 Das ganze Lied" kennen.', aufgabeId: 'song-blatt' },
      { nr: 2, text: 'Prüfe den Aufbau und zähl die Takte mit.', aufgabeId: 'song-aufbau' },
      { nr: 3, text: 'Prüfe, ob die Tonart zu deiner Aufnahme passt.', aufgabeId: 'song-tonart' },
      { nr: 4, text: 'Übe Intro, Strophe und Refrain einzeln.', aufgabeId: 'song-abschnitte' },
      { nr: 5, text: 'Übe die Übergänge und die Bridge.', aufgabeId: 'song-uebergaenge' },
      { nr: 6, text: 'Meistere den Tonartwechsel nach A-Moll.', aufgabeId: 'song-tonartwechsel' },
      { nr: 7, text: 'Spiel zum Original mit.', aufgabeId: 'song-original' },
    ],
  },

  // ── K.K. Cruisin' ─────────────────────────────────────────────────────────
  {
    id: 'kkc-vorbereitung',
    lied: 'kk-cruisin',
    nr: '1',
    titel: 'Vorbereitung',
    typ: 'Grundlagen',
    dauer: '1 Tag · 10 Min.',
    beschreibung: 'Stimmen und den Song kennenlernen. Gespielt wird ohne Kapodaster – mit den Barré-Formen, die du aus Go K.K. Rider kennst.',
    aufgaben: [
      { nr: 1, text: 'Stimme die Gitarre auf E – A – D – G – H – e.', aufgabeId: 'stimmen' },
      { nr: 2, text: 'Hör den Song und finde die Schleife.', aufgabeId: 'kkc-hoeren' },
    ],
  },
  {
    id: 'kkc-griffe',
    lied: 'kk-cruisin',
    nr: '2',
    titel: 'Die Song-Akkorde',
    typ: 'Technik',
    dauer: '1–2 Wochen · 15 Min.',
    beschreibung: 'Für die Schleife brauchst du fünf Griffe: B7 (offen) sowie B♭7, E♭7sus2, A♭7 und G♭7 (Barré). A♭7 kennst du schon – es ist derselbe Griff wie G♯7 aus Go K.K. Rider. Dazu kommen die offenen Griffe für den Schluss.',
    aufgaben: [
      { nr: 1, text: 'B7 und die E7-Form: A♭7 und G♭7.', aufgabeId: 'kkc-e7-form' },
      { nr: 2, text: 'B♭7 und E♭7sus2 – zwei Barrés im 1. Bund.', aufgabeId: 'kkc-erster-bund' },
      { nr: 3, text: 'Die Griffe für den Schluss: C7, E7sus2, A7 und G7.', aufgabeId: 'kkc-schluss' },
    ],
  },
  {
    id: 'kkc-wechsel',
    lied: 'kk-cruisin',
    nr: '3',
    titel: "Die Cruisin'-Schleife",
    typ: 'Technik',
    dauer: '1–2 Wochen · 15 Min.',
    beschreibung: "Fast der ganze Song ist eine Schleife aus vier Akkorden. Wenn die sitzt, kannst du K.K. Cruisin' praktisch schon spielen.",
    aufgaben: [
      { nr: 1, text: 'Spiel die Schleife B7 → B♭7 → E♭7sus2 → A♭7.', aufgabeId: 'kkc-schleife' },
      { nr: 2, text: 'One-Minute-Changes mit den Song-Wechseln.', aufgabeId: 'kkc-wechsel' },
    ],
  },
  {
    id: 'kkc-intro-tempo',
    lied: 'kk-cruisin',
    nr: '4',
    titel: 'Intro und Tempo',
    typ: 'Rhythmus',
    dauer: '1 Woche · 15 Min.',
    beschreibung: "Die kurze Intro-Melodie und das Tempo: K.K. Cruisin' ist schnell (ca. 175 BPM) – du startest mit 90.",
    aufgaben: [
      { nr: 1, text: 'Lerne die Intro-Melodie.', aufgabeId: 'kkc-intro' },
      { nr: 2, text: 'Finde das Tempo deiner Aufnahme.', aufgabeId: 'kkc-tempo' },
    ],
  },
  {
    id: 'kkc-lied',
    lied: 'kk-cruisin',
    nr: '5',
    titel: "K.K. Cruisin' spielen",
    typ: 'Song',
    dauer: '2 Wochen · 20 Min.',
    beschreibung: 'Alles zusammen: das ganze Lied im Mitspiel-Modus – mit der Pause im zweiten Refrain und dem Tonartwechsel, nach dem nur noch offene Griffe kommen.',
    link: { text: '🎼 Akkordblatt bei Ultimate Guitar öffnen', url: KK_CRUISIN.quelle.url },
    aufgaben: [{ nr: 1, text: 'Spiel den ganzen Song mit.', aufgabeId: 'kkc-song' }],
  },
]
