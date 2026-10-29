import type { Lied, Takt } from '../songblatt'

// Just the Two of Us (Grover Washington Jr. feat. Bill Withers, 1980) – Akkorde nach dem
// Akkordblatt „ver 2" auf Ultimate Guitar (ohne Kapo); Tonart F-Moll, 96 BPM, 4/4 und die
// Intro-Phrase laut Hooktheory, das Em7 im Refrain nach der Harmonik-Beschreibung bei
// Wikipedia. Liedtext bewusst weggelassen. Ohne Kapodaster, alles in den ersten vier Bünden.
//
// Fast der ganze Song ist eine Zwei-Takt-Schleife: D♭maj7 – C7 | Fm7 – E♭m7 – A♭7
// (2 + 2 | 2 + 1 + 1 Schläge). Intro und Zwischenspiel spielen eine Vier-Takt-Phrase, die auf
// einem ganzen Takt Fm7 endet; im Refrain rutscht zwischen Fm7 und E♭m7 noch Em7 hinein
// (je ein Schlag). Eine Runde der Schleife pro Textzeile ist eine Annahme: Mit dem Aufbau
// unten ergibt das 92 Takte ≈ 3:50 Min. bei 96 BPM – passend zur Single-Version (3:58).
// Die Albumversion (7:23) hat längere Saxofon-Teile über derselben Schleife.
//
// A♭7 wird hier in der 1. Lage gegriffen (xx1112, Griff „As7-klein") statt als Barré im
// 4. Bund – der Sprung wäre bei einem Schlag pro Akkord zu weit.

const SCHLEIFE: Takt[] = [['Dbmaj7', 'C7'], ['Fm7', 'Ebm7', 'Ab7']]
const PHRASE: Takt[] = [['Dbmaj7', 'C7'], ['Fm7', 'Ebm7', 'Ab7'], ['Dbmaj7', 'C7'], ['Fm7']]
const REFRAIN: Takt[] = [['Dbmaj7', 'C7'], ['Fm7', 'Em7', 'Ebm7', 'Ab7'], ['Dbmaj7', 'C7'], ['Fm7']]

/** `n` Durchgänge eines Musters. */
const mal = (muster: Takt[], n: number) => Array.from({ length: n }, () => muster).flat()

const UNSICHER_TAKTE =
  'Die Akkordblätter ordnen die Akkorde dem Text zu, nicht Takten. Hier dauert eine Runde der Schleife (2 Takte) eine Textzeile – das ergibt mit diesem Aufbau 92 Takte ≈ 3:50 Min. bei 96 BPM, nahe an der Single-Version (3:58). Wie viele Runden eine Strophe hat, beim Hören mitzählen.'

export const JUST_THE_TWO_OF_US: Lied = {
  id: 'just-the-two-of-us',
  titel: 'Just the Two of Us',
  lernIntro:
    'Ein Soul-Klassiker von 1980: „Just the Two of Us" von Grover Washington Jr. mit Bill Withers. Fast der ganze Song ist eine Zwei-Takt-Schleife aus fünf Akkorden – D♭maj7, C7, Fm7, E♭m7, A♭7 –, im Refrain kommt Em7 dazu. Alles liegt ohne Kapo in den ersten vier Bünden, und viele Formen kennst du schon (Cmaj7, C7, D♯7). Die Herausforderung sind die schnellen Wechsel, teils auf jedem Schlag. In fünf Schritten zum ganzen Lied.',
  rechte: '„Just the Two of Us" von Grover Washington Jr. feat. Bill Withers (Text und Musik: Bill Withers, William Salter, Ralph MacDonald)',
  bpm: 96,
  uebeBpm: 60,
  tempi: [60, 70, 80, 96],
  griffe: { Ab7: 'As7-klein' },
  quelle: {
    url: 'https://tabs.ultimate-guitar.com/tab/grover-washington-jr-/just-the-two-of-us-chords-888605',
    zusatz: 'Tonart, Tempo und Intro nach Hooktheory, das Em7 im Refrain nach Wikipedia, Liedtext weggelassen.',
  },
  abschnitte: [
    {
      id: 'intro',
      name: 'Intro',
      teil: 1,
      takte: mal(PHRASE, 2),
      tipp:
        'Das Saxofon spielt, du begleitest leise. Die Vier-Takt-Phrase läuft zweimal: D♭maj7 – C7 | Fm7 – E♭m7 – A♭7 | D♭maj7 – C7 | Fm7 – der vierte Takt bleibt ganz auf Fm7. Erst ruhige Viertel-Abschläge, ein Schlag pro Anschlag.',
      unsicher:
        'Hooktheory notiert das Intro als diese Vier-Takt-Phrase. Wie oft sie läuft, hängt von der Fassung ab (die Albumversion hat ein längeres Intro) – die Strophe beginnt, wenn der Gesang einsetzt.',
    },
    {
      id: 'strophe-1',
      name: 'Strophe',
      teil: 1,
      takte: mal(SCHLEIFE, 6),
      tipp:
        'Die Zwei-Takt-Schleife, sechsmal – eine Runde pro Textzeile. Im ersten Takt wechselst du auf der 3, im zweiten wird es schnell: Fm7 zwei Schläge, E♭m7 und A♭7 nur je einen. A♭7 führt zurück zu D♭maj7, und die Runde beginnt von vorn.',
      unsicher: UNSICHER_TAKTE,
    },
    {
      id: 'refrain-1',
      name: 'Refrain',
      teil: 1,
      takte: mal(REFRAIN, 2),
      vorher: 'Refrain: Im 2. und 6. Takt kommt Em7 dazu – Fm7, Em7, E♭m7, A♭7, jeder Akkord nur einen Schlag.',
      tipp:
        'Der berühmte Teil: Im 2. Takt rutschen die Akkorde Bund für Bund abwärts, Fm7 → Em7 → E♭m7, dann A♭7 zurück zu D♭maj7. Hier am besten Viertel-Abschläge, ein Schlag pro Akkord. Der 4. und 8. Takt bleiben ganz auf Fm7 – Zeit zum Durchatmen.',
      unsicher:
        'Das Em7 nennt Wikipedia als Unterschied zwischen Strophe und Refrain; manche Akkordblätter lassen es weg (dann Fm7 zwei Schläge wie in der Strophe). Ob im 4. und 8. Takt nur Fm7 klingt oder schon E♭m7 – A♭7 als Überleitung, unterscheiden die Blätter – nach Gehör.',
    },
    {
      id: 'zwischenspiel',
      name: 'Zwischenspiel',
      teil: 1,
      takte: PHRASE,
      tipp: 'Das Saxofon übernimmt kurz: dieselbe Vier-Takt-Phrase wie im Intro, einmal. Danach geht es mit der Strophe weiter.',
      unsicher: 'Ob und wie lang das Zwischenspiel ist, hängt von der Fassung ab. Setzt der Gesang früher ein, direkt mit der Strophe weitermachen.',
    },
    {
      id: 'strophe-2',
      name: 'Strophe',
      teil: 1,
      takte: mal(SCHLEIFE, 6),
      tipp: 'Wie die erste Strophe: sechs Runden der Schleife.',
    },
    {
      id: 'refrain-2',
      name: 'Refrain',
      teil: 1,
      takte: mal(REFRAIN, 2),
      tipp: 'Wie der erste Refrain – mit Em7 im 2. und 6. Takt.',
    },
    {
      id: 'solo',
      name: 'Saxofonsolo',
      teil: 1,
      takte: mal(SCHLEIFE, 6),
      tipp:
        'Grover Washington Jr. spielt ein Saxofonsolo, du begleitest mit der Schleife – etwas leiser, damit das Solo Platz hat. Gute Gelegenheit, das Song-Muster ganz locker laufen zu lassen.',
      unsicher:
        'Die Länge ist eine Annahme (sechs Runden wie eine Strophe). In der Albumversion ist das Solo deutlich länger – dann läuft die Schleife einfach weiter, bis der Gesang wieder einsetzt.',
    },
    {
      id: 'strophe-3',
      name: 'Strophe',
      teil: 1,
      takte: mal(SCHLEIFE, 6),
      tipp: 'Die letzte Strophe, wieder sechs Runden.',
    },
    {
      id: 'refrain-3',
      name: 'Refrain',
      teil: 1,
      takte: mal(REFRAIN, 2),
      tipp: 'Der dritte Refrain – danach geht es nahtlos in den Schluss.',
    },
    {
      id: 'schluss',
      name: 'Schluss (Refrain)',
      teil: 1,
      takte: mal(REFRAIN, 2),
      tipp: 'Der Refrain wiederholt sich, während der Song ausgeblendet wird. Mit jeder Runde leiser werden, zum Schluss Fm7 anschlagen und ausklingen lassen. 🎸',
      unsicher:
        'Die Aufnahme wird ausgeblendet; wie viele Runden noch zu hören sind, hängt von der Fassung ab. Die Albumversion endet mit einem langen Saxofonsolo über der Schleife.',
    },
  ],
}

/** Die drei Muster des Songs (für den Spickzettel). */
export const JUST_THE_TWO_OF_US_MUSTER = { schleife: SCHLEIFE, phrase: PHRASE, refrain: REFRAIN }

/** Aufbau für den Überblick: Abschnitt, Muster, Durchgänge und Länge in Takten. */
export const JUST_THE_TWO_OF_US_AUFBAU = JUST_THE_TWO_OF_US.abschnitte.map(a => {
  const muster = a.takte.some(t => t.includes('Em7')) ? 'Refrain-Phrase' : a.takte[3].length === 1 ? 'Phrase' : 'Schleife'
  return { id: a.id, name: a.name, muster, runden: a.takte.length / (muster === 'Schleife' ? 2 : 4), takte: a.takte.length }
})
