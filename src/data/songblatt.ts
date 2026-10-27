// Gemeinsame Bausteine für die Songblätter („🎵 Das ganze Lied"). Die Lieder selbst
// stehen in data/lieder/*.ts – immer in den Original-Akkorden, so wie sie ohne
// Kapodaster gegriffen werden.
//
// Ein Takt = ein Array: ein Akkord (ganzer Takt) oder zwei Akkorde (je 2 Schläge).
// „N.C." (no chord) = Pause, die Band setzt aus.

export type Takt = [string] | [string, string]

export interface SongAbschnitt {
  id: string
  name: string
  /** 1 = Tonart vor dem Tonartwechsel, 2 = danach (einen Halbton höher). */
  teil: 1 | 2
  takte: Takt[]
  tipp: string
  /** Hinweis, der VOR dem Abschnitt hervorgehoben wird. */
  vorher?: string
  unsicher?: string
  /** Optionale Melodie-Tabulatur (6 Zeilen, hohe e-Saite oben). */
  tab?: string
}

export interface Lied {
  id: string
  titel: string
  /** Einleitungstext über den Lernschritten dieses Lieds. */
  lernIntro: string
  bpm: number
  uebeBpm: number
  tempi: number[]
  quelle: { autor: string; url: string; zusatz?: string }
  abschnitte: SongAbschnitt[]
}

/** Jeder Akkord ein ganzer Takt: jeTakt('B7', 'Bb7') → [['B7'], ['Bb7']]. */
export const jeTakt = (...akkorde: string[]): Takt[] => akkorde.map(a => [a])

export const PAUSE = 'N.C.'

/** Anzeige mit ♯/♭; „B" (englisch) bleibt B wie im Akkordblatt. Pause → „Pause". */
export const anzeigeName = (akkord: string) =>
  akkord === PAUSE ? 'Pause' : akkord.replace('#', '♯').replace(/^([A-G])b/, '$1♭')

/** Akkordname → Akkord-ID in data/akkorde.ts (für die Griffbilder). */
const GRIFF_ID: Record<string, string> = {
  // Go K.K. Rider
  'G#m': 'Gism', 'G#7': 'Gis7', 'F#': 'Fis', 'D#7': 'Dis7', B: 'H', 'C#m': 'Cism', 'A#': 'Ais',
  E: 'E', A: 'A', F: 'F', Am: 'Am', G: 'G', C: 'C', Dm: 'Dm', E7: 'E7', A7: 'A7',
  // K.K. Cruisin'
  B7: 'B7', Bb7: 'Bes7', Eb7sus2: 'Es7sus2', Ab7: 'As7', Gb7: 'Ges7', C7: 'C7', E7sus2: 'E7sus2', G7: 'G7',
}

/** Griff-ID für einen Akkordnamen (undefined bei Pause). */
export const griffId = (akkord: string): string | undefined => GRIFF_ID[akkord]

/** Griff-IDs eines Lieds (optional nur eines Teils) in der Reihenfolge ihres ersten Auftretens. */
export function songGriffe(lied: Lied, teil?: 1 | 2): string[] {
  const ids = lied.abschnitte
    .filter(a => teil === undefined || a.teil === teil)
    .flatMap(a => a.takte.flat())
    .map(griffId)
    .filter((id): id is string => id !== undefined)
  return [...new Set(ids)]
}

/** Akkordfolge als Kurztext, z.B. „G♯m F♯ E·F♯ B" (Punkt = zwei Akkorde in einem Takt). */
export const taktText = (takte: Takt[]) => takte.map(t => t.map(anzeigeName).join('·')).join('  ')

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
