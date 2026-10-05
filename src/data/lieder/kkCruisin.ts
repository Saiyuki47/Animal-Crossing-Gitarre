import { PAUSE, anzeigeName, griffId, jeTakt, tabulatur, transponiere, type Lied } from '../songblatt'
import type { KapoZeile } from '../song'

// K.K. Cruisin' (© Nintendo). Akkorde nach der Transkription von „translucenttomato"
// auf Ultimate Guitar (laut Autor leicht vereinfacht); Liedtext bewusst weggelassen.
// Tonart E♭-Moll (Hooktheory: D♯-Moll, 175 BPM). Mit Kapo im 6. Bund werden aus den
// Barré-Akkorden einfache Griffe (−6 Halbtöne), nach dem Tonartwechsel Kapo 7 (−7).
//
// Der ganze Song ist eine Schleife aus vier Akkorden: B7 – B♭7 – E♭7sus2 – A♭7/G♭7.
// Das Blatt ordnet die Akkorde dem Text zu, nicht Takten; hier dauert jeder Akkord
// einen Takt (passt zu Hooktheory und ergibt eine plausible Songlänge von ~2:10 Min.).

const SCHLEIFE_AS = ['B7', 'Bb7', 'Eb7sus2', 'Ab7']
const SCHLEIFE_GES = ['B7', 'Bb7', 'Eb7sus2', 'Gb7']

const STROPHE_1 = jeTakt(...SCHLEIFE_AS, ...SCHLEIFE_GES, ...SCHLEIFE_AS, 'B7', 'Bb7', 'Eb7sus2')

// Intro-Melodie: Original (Bünde 1–4) und dieselben Töne für Kapo 6 umgerechnet.
const INTRO_ORIGINAL = 'G3 H4 H2 G3 G1 D4 G1 G3 D4 D1'
const INTRO_KAPO = 'D2 G2 G0 D2 D0 A3 D0 D2 A3 A0'

const UNSICHER_TAKTE =
  'Das Akkordblatt ordnet die Akkorde dem Text zu, nicht Takten. Hier dauert jeder Akkord einen Takt – das passt zur Hooktheory-Analyse (175 BPM) und ergibt eine plausible Songlänge. Beim Hören prüfen. Hooktheory hört außerdem an 4. Stelle der Schleife einen anderen Akkord als A♭7 – das Blatt ist laut Autor „leicht vereinfacht".'

export const KK_CRUISIN: Lied = {
  id: 'kk-cruisin',
  titel: "K.K. Cruisin'",
  bpm: 175,
  uebeBpm: 90,
  tempi: [90, 120, 150, 175],
  kapo: { 1: 6, 2: 7 },
  quelle: {
    autor: 'translucenttomato',
    url: 'https://tabs.ultimate-guitar.com/tab/misc-computer-games/animal-crossing-kk-cruisin-chords-3940478',
    zusatz: 'Intro-Melodie für Kapo 6 umgerechnet, Liedtext weggelassen.',
  },
  abschnitte: [
    {
      id: 'intro',
      name: 'Intro',
      teil: 1,
      takte: jeTakt('B7', 'B7', 'Bb7'),
      tab: { kapo: tabulatur(INTRO_KAPO), original: tabulatur(INTRO_ORIGINAL) },
      tippKapo:
        'Erst die Melodie aus der Tabulatur: mit Kapo nur A-, D- und G-Saite in den Bünden 0–3 (die Zahlen zählen ab dem Kapo). Sie endet auf dem Grundton. Danach F7 – F7 – E7 als Übergang in die Strophe.',
      tippOriginal: 'Melodie in den Bünden 1–4 auf D-, G- und H-Saite, danach B7 – B7 – B♭7.',
      unsicher:
        'Die Tabulatur zeigt nur die Töne, keinen Rhythmus – den Rhythmus nach Gehör übernehmen. Ob B7 – B7 – B♭7 nach der Melodie oder gleichzeitig gespielt wird, ist im Blatt nicht eindeutig.',
    },
    {
      id: 'strophe-1',
      name: 'Strophe',
      teil: 1,
      takte: STROPHE_1,
      tippKapo:
        'Die ganze Strophe ist eine Schleife: F7 → E7 → A7sus2 → D7, beim zweiten Durchgang C7 statt D7. F7 → E7 ist ein Halbton abwärts – der typische „rutschende" Cruisin\'-Klang. A7sus2 ist der Heimat-Akkord: dort kurz entspannen.',
      tippOriginal:
        'B7 (offen) → B♭7 (A7-Form, Barré 1. Bund) → E♭7sus2 (Mini-Barré 1. Bund) → A♭7 (E7-Form, 4. Bund) bzw. G♭7 (E7-Form, 2. Bund). Viel Barré – genau dafür gibt es die Kapo-Version.',
      unsicher: UNSICHER_TAKTE,
    },
    {
      id: 'strophe-2',
      name: 'Strophe',
      teil: 1,
      takte: jeTakt(...SCHLEIFE_AS, ...SCHLEIFE_GES, ...SCHLEIFE_AS, 'B7', 'Bb7'),
      tippKapo: 'Wie die erste Strophe, endet aber auf E7 – das zieht direkt zum A7sus2, mit dem der Refrain beginnt.',
      tippOriginal: 'Wie die erste Strophe, endet auf B♭7 – das führt zum E♭7sus2 am Anfang des Refrains.',
    },
    {
      id: 'refrain-1',
      name: 'Refrain',
      teil: 1,
      takte: jeTakt('Eb7sus2', 'Gb7', 'B7', 'Bb7', 'Eb7sus2', 'Ab7', 'B7', 'Bb7', 'Eb7sus2', 'Gb7', 'B7', 'Bb7', 'Eb7sus2', 'Ab7', 'B7', 'Bb7', 'Eb7sus2'),
      tippKapo:
        'Dieselbe Schleife, nur von einer anderen Stelle aus: Der Refrain beginnt auf dem Heimat-Akkord A7sus2, dann C7/D7 → F7 → E7 → zurück zu A7sus2.',
      tippOriginal: 'Beginnt auf E♭7sus2, dann G♭7/A♭7 → B7 → B♭7 → E♭7sus2.',
    },
    {
      id: 'instrumental',
      name: 'Instrumental',
      teil: 1,
      takte: STROPHE_1,
      tippKapo: 'Genau wie die erste Strophe, nur ohne Gesang – ideal zum Mitspielen, weil du die Gitarre am besten hörst.',
      tippOriginal: 'Genau wie die erste Strophe.',
    },
    {
      id: 'refrain-2',
      name: 'Refrain',
      teil: 1,
      takte: [[PAUSE], [PAUSE], ...jeTakt(...SCHLEIFE_AS, ...SCHLEIFE_GES, ...SCHLEIFE_AS, 'B7', 'Bb7', 'Eb7sus2')],
      tippKapo:
        'Beginnt mit einer Pause (N.C. = „no chord"): Hände still, innerlich weiterzählen und dann mit F7 wieder einsetzen. Danach wie die Strophe.',
      tippOriginal: 'Pause, dann mit B7 einsetzen.',
      unsicher: 'Wie lange die Pause dauert, steht nicht im Blatt – hier 2 Takte (an Stelle von E♭7sus2 – G♭7 im ersten Refrain). Nach Gehör prüfen.',
    },
    {
      id: 'refrain-hoch',
      name: 'Refrain (einen Halbton höher)',
      teil: 2,
      takte: jeTakt('C7', 'B7', 'E7sus2', 'A7', 'C7', 'B7', 'E7sus2', 'G7', 'C7', 'B7', 'E7sus2', 'A7', 'C7', 'B7', 'E7sus2'),
      vorher: 'Tonartwechsel: Kapo vom 6. in den 7. Bund versetzen – danach dieselben Griffe wie vorher.',
      vorherOriginal: 'Tonartwechsel: ab hier einen Halbton höher – und nur noch offene Griffe.',
      tippKapo: 'Gleiche Schleife F7 → E7 → A7sus2 → D7/C7, nur mit Kapo im 7. Bund. Letzter Akkord A7sus2: ausklingen lassen. 🎸',
      tippOriginal: 'C7 → B7 → E7sus2 → A7 bzw. G7 – alles offene Griffe, der leichteste Teil im Original. Letzter Akkord E7sus2: ausklingen lassen. 🎸',
    },
  ],
}

/** Kapo-Tabelle (Original → Griff) je Songteil, aus den Songdaten berechnet. */
function kapoTabelle(teil: 1 | 2): KapoZeile[] {
  const originale = [...new Set(KK_CRUISIN.abschnitte.filter(a => a.teil === teil).flatMap(a => a.takte.flat()))].filter(a => a !== PAUSE)
  return originale.map(o => {
    const griff = transponiere(o, -KK_CRUISIN.kapo[teil])
    return { original: anzeigeName(o), griff: anzeigeName(griff), griffId: griffId(griff, true)!, originalId: griffId(o, false)! }
  })
}

export const KK_KAPO_6 = kapoTabelle(1)
export const KK_KAPO_7 = kapoTabelle(2)
