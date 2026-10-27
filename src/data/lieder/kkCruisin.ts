import { PAUSE, jeTakt, tabulatur, type Lied } from '../songblatt'

// K.K. Cruisin' (© Nintendo). Akkorde nach der Transkription von „translucenttomato"
// auf Ultimate Guitar (laut Autor leicht vereinfacht); Liedtext bewusst weggelassen.
// Tonart E♭-Moll (Hooktheory: D♯-Moll, 175 BPM). Gespielt wird im Original ohne
// Kapodaster: viel Barré im 1., 2. und 4. Bund, nach dem Tonartwechsel nur offene Griffe.
//
// Der ganze Song ist eine Schleife aus vier Akkorden: B7 – B♭7 – E♭7sus2 – A♭7/G♭7.
// Das Blatt ordnet die Akkorde dem Text zu, nicht Takten; hier dauert jeder Akkord
// einen Takt (passt zu Hooktheory und ergibt eine plausible Songlänge von ~2:10 Min.).

const SCHLEIFE_AS = ['B7', 'Bb7', 'Eb7sus2', 'Ab7']
const SCHLEIFE_GES = ['B7', 'Bb7', 'Eb7sus2', 'Gb7']

const STROPHE_1 = jeTakt(...SCHLEIFE_AS, ...SCHLEIFE_GES, ...SCHLEIFE_AS, 'B7', 'Bb7', 'Eb7sus2')

// Intro-Melodie (Saite + Bund, Bünde 1–4)
const INTRO_MELODIE = 'G3 H4 H2 G3 G1 D4 G1 G3 D4 D1'

const UNSICHER_TAKTE =
  'Das Akkordblatt ordnet die Akkorde dem Text zu, nicht Takten. Hier dauert jeder Akkord einen Takt – das passt zur Hooktheory-Analyse (175 BPM) und ergibt eine plausible Songlänge. Beim Hören prüfen. Hooktheory hört außerdem an 4. Stelle der Schleife einen anderen Akkord als A♭7 – das Blatt ist laut Autor „leicht vereinfacht".'

export const KK_CRUISIN: Lied = {
  id: 'kk-cruisin',
  titel: "K.K. Cruisin'",
  lernIntro:
    'Das zweite Lied: jazzig, mit Septakkorden und fast komplett eine einzige Schleife aus vier Akkorden. In fünf Schritten zum ganzen Song, mit den Original-Griffen ohne Kapodaster. Am besten nach Go K.K. Rider – die Barré-Formen und Grundlagen (Stimmen, Rhythmus) stehen dort.',
  rechte: 'Song © Nintendo',
  bpm: 175,
  uebeBpm: 90,
  tempi: [90, 120, 150, 175],
  quelle: {
    autor: 'translucenttomato',
    url: 'https://tabs.ultimate-guitar.com/tab/misc-computer-games/animal-crossing-kk-cruisin-chords-3940478',
    zusatz: 'Liedtext weggelassen.',
  },
  abschnitte: [
    {
      id: 'intro',
      name: 'Intro',
      teil: 1,
      takte: jeTakt('B7', 'B7', 'Bb7'),
      tab: tabulatur(INTRO_MELODIE),
      tipp: 'Erst die Melodie aus der Tabulatur: D-, G- und H-Saite in den Bünden 1–4, ein Finger pro Bund. Sie endet auf dem Grundton E♭ (D-Saite, 1. Bund). Danach B7 – B7 – B♭7 als Übergang in die Strophe.',
      unsicher:
        'Die Tabulatur zeigt nur die Töne, keinen Rhythmus – den Rhythmus nach Gehör übernehmen. Ob B7 – B7 – B♭7 nach der Melodie oder gleichzeitig gespielt wird, ist im Blatt nicht eindeutig.',
    },
    {
      id: 'strophe-1',
      name: 'Strophe',
      teil: 1,
      takte: STROPHE_1,
      tipp: 'Die ganze Strophe ist eine Schleife: B7 → B♭7 → E♭7sus2 → A♭7, beim zweiten Durchgang G♭7 statt A♭7. B7 → B♭7 rutscht einen Halbton abwärts – der typische Cruisin\'-Klang. B♭7 → E♭7sus2: der Zeigefinger bleibt als Barré im 1. Bund. A♭7 und G♭7 sind dieselbe E7-Form im 4. bzw. 2. Bund.',
      unsicher: UNSICHER_TAKTE,
    },
    {
      id: 'strophe-2',
      name: 'Strophe',
      teil: 1,
      takte: jeTakt(...SCHLEIFE_AS, ...SCHLEIFE_GES, ...SCHLEIFE_AS, 'B7', 'Bb7'),
      tipp: 'Wie die erste Strophe, endet aber auf B♭7 – das führt direkt zum E♭7sus2, mit dem der Refrain beginnt.',
    },
    {
      id: 'refrain-1',
      name: 'Refrain',
      teil: 1,
      takte: jeTakt('Eb7sus2', 'Gb7', 'B7', 'Bb7', 'Eb7sus2', 'Ab7', 'B7', 'Bb7', 'Eb7sus2', 'Gb7', 'B7', 'Bb7', 'Eb7sus2', 'Ab7', 'B7', 'Bb7', 'Eb7sus2'),
      tipp: 'Dieselbe Schleife, nur von einer anderen Stelle aus: Der Refrain beginnt auf E♭7sus2, dann G♭7/A♭7 → B7 → B♭7 → zurück zu E♭7sus2.',
    },
    {
      id: 'instrumental',
      name: 'Instrumental',
      teil: 1,
      takte: STROPHE_1,
      tipp: 'Genau wie die erste Strophe, nur ohne Gesang – ideal zum Mitspielen, weil du die Gitarre am besten hörst.',
    },
    {
      id: 'refrain-2',
      name: 'Refrain',
      teil: 1,
      takte: [[PAUSE], [PAUSE], ...jeTakt(...SCHLEIFE_AS, ...SCHLEIFE_GES, ...SCHLEIFE_AS, 'B7', 'Bb7', 'Eb7sus2')],
      tipp: 'Beginnt mit einer Pause (N.C. = „no chord"): Hände still, innerlich weiterzählen und dann mit B7 wieder einsetzen. Danach wie die Strophe.',
      unsicher: 'Wie lange die Pause dauert, steht nicht im Blatt – hier 2 Takte (an Stelle von E♭7sus2 – G♭7 im ersten Refrain). Nach Gehör prüfen.',
    },
    {
      id: 'refrain-hoch',
      name: 'Refrain (einen Halbton höher)',
      teil: 2,
      takte: jeTakt('C7', 'B7', 'E7sus2', 'A7', 'C7', 'B7', 'E7sus2', 'G7', 'C7', 'B7', 'E7sus2', 'A7', 'C7', 'B7', 'E7sus2'),
      vorher: 'Tonartwechsel: ab hier einen Halbton höher – und nur noch offene Griffe. Vom E♭7sus2 (1. Bund) geht es direkt zu C7.',
      tipp: 'C7 → B7 → E7sus2 → A7 bzw. G7 – alles offene Griffe, die Greifhand kann sich erholen. C7 → B7 sieht ähnlich aus: A-, D- und G-Saite je einen Bund tiefer, dazu der kleine Finger auf die hohe e-Saite. Letzter Akkord E7sus2: ausklingen lassen. 🎸',
    },
  ],
}
