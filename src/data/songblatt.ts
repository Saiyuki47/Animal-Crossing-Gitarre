// Gemeinsame Bausteine für die Songblätter („🎵 Das ganze Lied"). Die Lieder selbst
// stehen in data/lieder/*.ts. Gespeichert sind immer die ORIGINAL-Akkorde; die
// Kapo-Griffe werden daraus berechnet (Akkord − Kapo-Bund des jeweiligen Songteils).
//
// Ein Takt = ein Array: ein Akkord (ganzer Takt) oder zwei Akkorde (je 2 Schläge).
// „N.C." (no chord) = Pause, die Band setzt aus. Slash-Akkorde wie „D/F#" = D mit F♯ im Bass.

export type Takt = [string] | [string, string]

/** Anschlagmuster im Songblatt (Definitionen in components/Songblatt.tsx). */
export type AnschlagId = 'viertel' | 'song' | 'rock'

export interface SongAbschnitt {
  id: string
  name: string
  /** 1 = Tonart vor dem Tonartwechsel, 2 = danach (einen Halbton höher). */
  teil: 1 | 2
  takte: Takt[]
  tippKapo: string
  tippOriginal: string
  /** Hinweis, der VOR dem Abschnitt hervorgehoben wird (Ansicht mit Kapo). */
  vorher?: string
  /** Wie `vorher`, für die Original-Ansicht. */
  vorherOriginal?: string
  unsicher?: string
  /** Optionale Melodie-Tabulatur (6 Zeilen, hohe e-Saite oben). */
  tab?: { kapo: string; original: string }
}

export interface Lied {
  id: string
  titel: string
  /** Einleitungstext über den Lernschritten dieses Lieds. */
  lernIntro: string
  /** Rechte-Hinweis unter dem Songblatt, z.B. „Song © Nintendo". */
  rechte: string
  bpm: number
  uebeBpm: number
  tempi: number[]
  /** Kapo-Bund je Songteil (0 = ohne Kapo). */
  kapo: Record<1 | 2, number>
  /**
   * Vereinfachungen für die einfache Ansicht, z.B. { 'D/F#': 'D' } – gilt nach dem
   * Transponieren. Ohne Kapo ist das der einzige Unterschied zwischen den Ansichten.
   */
  einfach?: Record<string, string>
  /** Beschriftung der zwei Ansichten (Standard: „Mit Kapo …" / „Original (Barré)"). */
  ansichten?: { einfach: string; original: string }
  /** Anschlagmuster im Songblatt (Standard: Viertel und Song-Muster). */
  anschlaege?: AnschlagId[]
  quelle: { autor: string; url: string; zusatz?: string }
  abschnitte: SongAbschnitt[]
}

/** Jeder Akkord ein ganzer Takt: jeTakt('B7', 'Bb7') → [['B7'], ['Bb7']]. */
export const jeTakt = (...akkorde: string[]): Takt[] => akkorde.map(a => [a])

export const PAUSE = 'N.C.'

// ── Transponieren ────────────────────────────────────────────────────────

const TOENE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

function zerlege(akkord: string): { grund: number; rest: string } {
  const m = /^([A-G])(#|b)?(.*)$/.exec(akkord)
  if (!m) throw new Error(`Unbekannter Akkord: ${akkord}`)
  let grund = TOENE.indexOf(m[1])
  if (m[2] === '#') grund += 1
  if (m[2] === 'b') grund -= 1
  return { grund: (grund + 12) % 12, rest: m[3] }
}

/** Verschiebt einen Akkordnamen um `halbtoene` (negativ = tiefer), z.B. G#m −4 → Em, D/F# −2 → C/E. */
export function transponiere(akkord: string, halbtoene: number): string {
  if (akkord === PAUSE) return akkord
  return akkord
    .split('/')
    .map(teil => {
      const { grund, rest } = zerlege(teil)
      return TOENE[(grund + halbtoene + 120) % 12] + rest
    })
    .join('/')
}

/** Anzeige mit ♯/♭; „B" (englisch) bleibt B wie im Akkordblatt. Pause → „Pause". */
export const anzeigeName = (akkord: string) =>
  akkord === PAUSE ? 'Pause' : akkord.replace(/#/g, '♯').replace(/([A-G])b/g, '$1♭')

/** Akkordname → Akkord-ID in data/akkorde.ts (für die Griffbilder). */
const GRIFF_ID: Record<string, string> = {
  // Go K.K. Rider
  'G#m': 'Gism', 'G#7': 'Gis7', 'F#': 'Fis', 'D#7': 'Dis7', B: 'H', 'C#m': 'Cism', 'A#': 'Ais',
  F: 'F', Em: 'Em', D: 'D', C: 'C', B7: 'B7', G: 'G', Am: 'Am', E: 'E', A: 'A', Dm: 'Dm', E7: 'E7', A7: 'A7',
  // K.K. Cruisin'
  Bb7: 'Bes7', Eb7sus2: 'Es7sus2', Ab7: 'As7', Gb7: 'Ges7', C7: 'C7', E7sus2: 'E7sus2', G7: 'G7',
  A7sus2: 'A7sus2', D7: 'D7',
  // Zombie
  'D/F#': 'D-Fis', Cmaj7: 'Cmaj7',
}

/** Griff-ID für einen Akkord; mit Kapo werden F und F7 als kleine Griffe gespielt. */
export function griffId(akkord: string, mitKapo: boolean): string | undefined {
  if (mitKapo && akkord === 'F') return 'F-klein'
  if (mitKapo && akkord === 'F7') return 'F7-klein'
  return GRIFF_ID[akkord]
}

/** Akkord, wie er in der gewählten Ansicht gegriffen wird (einfache Ansicht: mit Kapo und vereinfacht). */
export function gegriffen(lied: Lied, akkord: string, teil: 1 | 2, mitKapo: boolean): string {
  if (!mitKapo) return akkord
  const griff = transponiere(akkord, -lied.kapo[teil])
  return lied.einfach?.[griff] ?? griff
}

/** Ob das Lied (in irgendeinem Teil) mit Kapodaster gespielt wird. */
export const hatKapo = (lied: Lied) => lied.kapo[1] > 0 || lied.kapo[2] > 0

export const taktZahl = (lied: Lied) => lied.abschnitte.reduce((n, a) => n + a.takte.length, 0)

// ── Tabulatur ────────────────────────────────────────────────────────────

const SAITEN_TAB = ['e', 'H', 'G', 'D', 'A', 'E']

/**
 * Baut eine 6-zeilige Tabulatur aus einer Tonfolge, z.B. "G3 H4 H2" = G-Saite 3. Bund,
 * H-Saite 4. Bund, H-Saite 2. Bund (Saiten: e H G D A E; kleines e = hohe Saite).
 */
export function tabulatur(folge: string): string {
  const noten = folge.split(/\s+/).map(n => ({ saite: n[0], bund: n.slice(1) }))
  return SAITEN_TAB.map(s => {
    let zeile = `${s}|-`
    for (const n of noten) zeile += (n.saite === s ? n.bund : '-'.repeat(n.bund.length)) + '--'
    return zeile + '|'
  }).join('\n')
}
