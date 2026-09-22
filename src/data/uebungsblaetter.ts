import type { Uebungsblatt } from '../types'

// Lernschritte – vom Stimmen bis zum kompletten Song. Jeder Schritt verweist per
// `aufgabeId` auf eine Übung aus data/aufgaben.ts.
export const uebungsblaetter: Uebungsblatt[] = [
  {
    id: 'vorbereitung',
    nr: '1',
    titel: 'Vorbereitung',
    typ: 'Grundlagen',
    dauer: '1–2 Tage · 10 Min.',
    beschreibung: 'Gitarre stimmen, richtig sitzen, Plektrum halten und die ersten sauberen Töne.',
    aufgaben: [
      { nr: 1, text: 'Stimme die Gitarre auf E – A – D – G – H – e.', aufgabeId: 'stimmen' },
      { nr: 2, text: 'Finde eine entspannte Haltung und halte das Plektrum richtig.', aufgabeId: 'haltung' },
      { nr: 3, text: 'Greif Em so, dass alle sechs Saiten klar klingen.', aufgabeId: 'sauber-greifen' },
    ],
  },
  {
    id: 'akkorde',
    nr: '2',
    titel: 'Offene Akkorde',
    typ: 'Technik',
    dauer: '1–2 Wochen · 15 Min.',
    beschreibung: 'Die Griffe, aus denen fast jeder Song besteht. Die Griffbilder findest du auch unter „Griffe & Technik".',
    aufgaben: [
      { nr: 1, text: 'Lerne die Hauptakkorde C, G und D.', aufgabeId: 'akkorde-cgd' },
      { nr: 2, text: 'Lerne die Moll-Akkorde Am, Em und Dm.', aufgabeId: 'akkorde-moll' },
      { nr: 3, text: 'Lerne A und E.', aufgabeId: 'akkorde-ae' },
      { nr: 4, text: 'Lerne die Septakkorde G7, C7, D7, A7 und E7.', aufgabeId: 'akkorde-sept' },
    ],
  },
  {
    id: 'wechsel',
    nr: '3',
    titel: 'Akkordwechsel',
    typ: 'Technik',
    dauer: '1–2 Wochen · 15 Min.',
    beschreibung: 'Griffe kennen ist die halbe Miete – flüssig wechseln die andere. Hier entscheidet sich, ob der Song „läuft".',
    aufgaben: [
      { nr: 1, text: 'One-Minute-Changes zwischen C und G.', aufgabeId: 'one-minute-change' },
      { nr: 2, text: 'Wechsle zwischen C und Am mit Ankerfingern.', aufgabeId: 'ankerfinger' },
      { nr: 3, text: 'Spiel die Akkordkette G – D – Em – C in Schleife.', aufgabeId: 'kette' },
      { nr: 4, text: 'Wechsle exakt auf Schlag 1 zum Metronom.', aufgabeId: 'wechsel-metronom' },
    ],
  },
  {
    id: 'rhythmus',
    nr: '4',
    titel: 'Rhythmus und Schlagmuster',
    typ: 'Rhythmus',
    dauer: '1–2 Wochen · 15 Min.',
    beschreibung: 'Ein fröhlicher Song lebt vom Groove. Vom einfachen Viertel-Anschlag bis zu Swing und Palm Muting.',
    aufgaben: [
      { nr: 1, text: 'Viertel-Abschläge zum Metronom.', aufgabeId: 'viertel' },
      { nr: 2, text: 'Achtel mit Ab- und Aufschlag.', aufgabeId: 'achtel' },
      { nr: 3, text: 'Das Standard-Schlagmuster ↓ – ↓ ↑ – ↑ ↓ ↑.', aufgabeId: 'pattern' },
      { nr: 4, text: 'Gerade vs. geswingte Achtel.', aufgabeId: 'swing' },
      { nr: 5, text: 'Akzente auf 2 und 4 und Palm Muting.', aufgabeId: 'akzente' },
    ],
  },
  {
    id: 'song',
    nr: '5',
    titel: 'Go K.K. Rider erarbeiten',
    typ: 'Song',
    dauer: '2–3 Wochen · 20 Min.',
    beschreibung: 'Jetzt kommt alles zusammen: Song analysieren, Akkorde aus einer legalen Quelle eintragen, abschnittweise üben und zum Original mitspielen.',
    aufgaben: [
      { nr: 1, text: 'Hör die Songstruktur heraus und zähl die Takte.', aufgabeId: 'song-hoeren' },
      { nr: 2, text: 'Bestimme das Tempo und das Achtel-Feeling.', aufgabeId: 'song-tempo' },
      { nr: 3, text: 'Besorg die Akkorde und trag sie in deine Songkarte ein.', aufgabeId: 'song-akkorde' },
      { nr: 4, text: 'Übe jeden Abschnitt einzeln im Übetempo.', aufgabeId: 'song-abschnitte' },
      { nr: 5, text: 'Übe die Übergänge zwischen den Abschnitten.', aufgabeId: 'song-uebergaenge' },
      { nr: 6, text: 'Spiel zum Original mit.', aufgabeId: 'song-original' },
    ],
  },
]
