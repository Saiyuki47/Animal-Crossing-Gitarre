import type { ReferenzKarte } from 'lernseiten-ui'
import Griffbild from '../components/Griffbild'
import { akkorde, akkordNach, griffKurz, type AkkordGruppe } from './akkorde'
import { AKKORDBLATT_URL, AUFBAU, KAPO_4, KAPO_5, ORIGINAL_BPM, UEBE_BPM, type KapoZeile } from './song'

// Nachschlagekarten „Griffe & Technik". Jede Karte hat eine stabile `id`
// (Inhaltsverzeichnis + Deep-Link #referenz/<id>). Karten mit Griffbildern/Tabellen
// nutzen `inhaltNode`; `inhalt` bleibt trotzdem gesetzt, damit die globale Suche sie findet.

function AkkordRaster({ gruppe }: { gruppe: AkkordGruppe }) {
  return (
    <div className="akkord-raster">
      {akkorde
        .filter(a => a.gruppe === gruppe)
        .map(a => (
          <figure key={a.id} className="akkord-zelle">
            <Griffbild akkord={a} />
            <figcaption>
              <code>{griffKurz(a)}</code>
              {a.tipp && <span>{a.tipp}</span>}
            </figcaption>
          </figure>
        ))}
    </div>
  )
}

function KapoTabelle({ zeilen, bund }: { zeilen: KapoZeile[]; bund: number }) {
  return (
    <table className="ref-tabelle">
      <thead>
        <tr>
          <th>Im Akkordblatt steht</th>
          <th>Du greifst (Kapo {bund}. Bund)</th>
        </tr>
      </thead>
      <tbody>
        {zeilen.map(z => (
          <tr key={z.original}>
            <td>{z.original}</td>
            <td>
              <b>{z.griff}</b>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const akkordText = (gruppe: AkkordGruppe) =>
  akkorde
    .filter(a => a.gruppe === gruppe)
    .map(a => `${a.name}: ${griffKurz(a)}`)
    .join('\n')

const kapoText = (zeilen: KapoZeile[]) => zeilen.map(z => `${z.original} → ${z.griff}`).join('\n')

const C = akkordNach('C')!
const GISM = akkordNach('Gism')!

export const referenzKarten: ReferenzKarte[] = [
  {
    id: 'song',
    titel: 'Go K.K. Rider im Überblick',
    inhalt: `Tempo ${ORIGINAL_BPM} BPM, 4/4-Takt. Original ohne Kapo in G♯-Moll, gegen Ende einen Halbton höher in A-Moll.
Mit Kapo im 4. Bund: Em, D, C, B7, G, Am, F (und einmal E7).
${AUFBAU.map(a => `${a.name}${a.takte ? ` (${a.takte} Takte)` : ''}: ${a.griffe.join(', ')}`).join('\n')}`,
    inhaltNode: (
      <>
        <p className="ref-absatz">
          <b>Tempo {ORIGINAL_BPM} BPM</b> im 4/4-Takt – zum Üben mit {UEBE_BPM} BPM starten. Das Original steht in G♯-Moll und
          wechselt gegen Ende einen Halbton höher nach A-Moll. Mit <b>Kapo im 4. Bund</b> reichen sieben einfache Griffe.
          Jede Zeile im Akkordblatt ist ein Takt; stehen zwei Akkorde in einer Zeile, bekommt jeder zwei Schläge.
        </p>
        <table className="ref-tabelle">
          <thead>
            <tr>
              <th>Abschnitt</th>
              <th>Takte</th>
              <th>Griffe (mit Kapo)</th>
            </tr>
          </thead>
          <tbody>
            {AUFBAU.map(a => (
              <tr key={a.name}>
                <td>
                  <b>{a.name}</b>
                  {a.hinweis && <span className="ref-hinweis">{a.hinweis}</span>}
                </td>
                <td>{a.takte ?? '–'}</td>
                <td>{a.griffe.join(' · ') || '–'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="ref-absatz" style={{ marginTop: '0.75rem' }}>
          Die genaue Akkordfolge steht im{' '}
          <a href={AKKORDBLATT_URL} target="_blank" rel="noopener noreferrer">
            Akkordblatt bei Ultimate Guitar ↗
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: 'kapo-tabelle',
    titel: 'Kapo-Tabelle: Original → Griff',
    inhalt: `Kapo im 4. Bund (Teil 1):\n${kapoText(KAPO_4)}\n\nKapo im 5. Bund (nach dem Tonartwechsel):\n${kapoText(KAPO_5)}`,
    inhaltNode: (
      <>
        <p className="ref-absatz">
          Der Kapodaster macht jeden Griff um so viele Halbtöne höher, wie er Bünde vom Sattel entfernt sitzt. Um das Akkordblatt
          zu spielen, übersetzt du jeden Akkord in den Griff, der 4 Halbtöne tiefer liegt. Nach „UP HALF A STEP" setzt du den Kapo in
          den 5. Bund – und greifst wieder genau dieselben Formen.
        </p>
        <div className="ref-tabellen-reihe">
          <KapoTabelle zeilen={KAPO_4} bund={4} />
          <KapoTabelle zeilen={KAPO_5} bund={5} />
        </div>
      </>
    ),
  },
  {
    id: 'song-griffe',
    titel: 'Die Song-Griffe (mit Kapo)',
    inhalt: akkordText('Kapo'),
    inhaltNode: <AkkordRaster gruppe="Kapo" />,
  },
  {
    id: 'stimmung',
    titel: 'Saiten und Standardstimmung',
    inhalt: `Saite 6 (dickste)  E   tief
Saite 5            A
Saite 4            D
Saite 3            G
Saite 2            H   (international: B)
Saite 1 (dünnste)  e   hoch

Merksatz: „Eine Alte Dame Geht Heute Einkaufen"
Immer OHNE Kapodaster stimmen, danach mit Kapo kurz nachprüfen.

Stimmen nach Gehör (Bundmethode):
Tiefe E-Saite im 5. Bund = Ton der A-Saite
A-Saite im 5. Bund       = D-Saite
D-Saite im 5. Bund       = G-Saite
G-Saite im 4. Bund (!)   = H-Saite
H-Saite im 5. Bund       = hohe e-Saite`,
  },
  {
    id: 'griffbild-lesen',
    titel: 'Griffbilder lesen',
    inhalt: `Senkrechte Linien = Saiten (links tiefes E, rechts hohes e)
Waagerechte Linien = Bünde, dicke Linie oben = Sattel
× über der Saite = nicht anschlagen, ○ = Leersaite klingt mit
Punkt mit Zahl = Finger: 1 Zeige, 2 Mittel, 3 Ring, 4 kleiner Finger
Balken = Barré (Zeigefinger quer über mehrere Saiten)
„4fr" = das Bild beginnt im 4. Bund
Kurzschrift: von tiefem E nach hohem e, z.B. C = x32010`,
    inhaltNode: (
      <div className="griffbild-erklaerung">
        <Griffbild akkord={C} breite={120} />
        <Griffbild akkord={GISM} breite={120} />
        <ul>
          <li><b>Senkrechte Linien</b> = Saiten, links die tiefe E-Saite, rechts die hohe e-Saite.</li>
          <li><b>Waagerechte Linien</b> = Bünde; die dicke Linie oben ist der Sattel.</li>
          <li><b>×</b> = Saite nicht anschlagen, <b>○</b> = Leersaite klingt mit.</li>
          <li><b>Punkt mit Zahl</b> = welcher Finger drückt: 1 Zeige-, 2 Mittel-, 3 Ring-, 4 kleiner Finger.</li>
          <li><b>Balken</b> = Barré: der Zeigefinger liegt quer über mehreren Saiten.</li>
          <li><b>„4fr"</b> = das Bild zeigt den Hals ab dem 4. Bund (kein Sattel oben).</li>
          <li><b>Kurzschrift</b> von tief nach hoch: C = <code>x32010</code>, G♯m = <code>466444</code>.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'schlagmuster',
    titel: 'Schlagmuster lesen und spielen',
    inhalt: `↓ = Abschlag (Richtung Boden)   ↑ = Aufschlag (Richtung Decke)
– = Luftschlag: Hand bewegt sich, trifft aber nicht

Zählweise bei Achteln:  1 und 2 und 3 und 4 und
Abschläge auf die Zahlen, Aufschläge auf „und"

Für Go K.K. Rider:
Einstieg:          ↓   ↓   ↓   ↓      (Viertel)
Song-Muster:       ↓ – ↓ ↑ – ↑ ↓ ↑
Zwei Akkorde pro Takt: Wechsel auf die 3 – fällt genau in die Lücke des Musters.`,
    beispiele: [
      {
        szenario: 'So übst du ein neues Muster',
        beispiele: [
          'Erst ohne Gitarre: Muster laut sprechen („Ab – Ab Auf – Auf Ab Auf") und dazu klatschen.',
          'Dann mit abgedämpften Saiten (linke Hand liegt locker auf) – nur Rhythmus, kein Klang.',
          'Dann mit Em, dann mit der Intro-Kette Em – D – C – B7.',
          'Metronom im Tab „Werkzeuge" bei 70 BPM starten und das Muster mitlesen.',
        ],
      },
    ],
  },
  {
    id: 'swing',
    titel: 'Gerade und geswingte Achtel',
    inhalt: `Gerade Achtel: beide Hälften eines Schlags sind gleich lang („ta-ta ta-ta").
Geswingte Achtel (Shuffle): erste Hälfte lang, zweite kurz, ca. 2 : 1 („Dum-da Dum-da").

Hörtest: Klingt der Song eher „marschierend" → gerade. Eher „hüpfend / galoppierend" → Swing.
Die Hand pendelt in beiden Fällen weiter – nur das Timing der Aufschläge verschiebt sich.`,
  },
  {
    id: 'barre-griffe',
    titel: 'Bonus: Barré-Griffe für das Original',
    inhalt: `Barré-Formen (Zeigefinger ersetzt den Sattel):
E-Form: F (1. Bund), F♯ (2. Bund)
Em-Form: G♯m (4. Bund)
A-Form: A♯ (1. Bund), B (2. Bund)
Am-Form: C♯m (4. Bund)
${akkordText('Barré')}`,
    inhaltNode: (
      <>
        <p className="ref-absatz">
          Beim Barré liegt der Zeigefinger quer über den Saiten und übernimmt die Rolle des Sattels – wie ein Kapodaster, den du
          mitbewegen kannst. Jede offene Form (E, Em, A, Am) wird so verschiebbar: <b>E-Form</b> → F, F♯ · <b>Em-Form</b> → G♯m ·{' '}
          <b>A-Form</b> → A♯, B · <b>Am-Form</b> → C♯m.
        </p>
        <AkkordRaster gruppe="Barré" />
      </>
    ),
  },
  {
    id: 'kapodaster',
    titel: 'Kapodaster und Transponieren',
    inhalt: `Der Kapodaster verkürzt alle Saiten → jeder Griff klingt pro Bund einen Halbton höher.

Halbtonschritte:  C – C♯ – D – D♯ – E – F – F♯ – G – G♯ – A – A♯ – H – C

Formel: klingender Akkord = gegriffener Akkord + Bund des Kapodasters
Umgekehrt: Griff = Akkord im Blatt − Bund des Kapodasters

Beispiel Go K.K. Rider (Kapo 4):
G♯m − 4 Halbtöne = G♯ → G → F♯ → F → E  → also Em greifen.`,
    beispiele: [
      {
        szenario: 'Wann ist ein Kapodaster sinnvoll?',
        beispiele: [
          'Der Song enthält viele Barré-Akkorde – mit Kapo werden daraus offene Griffe (genau der Fall bei Go K.K. Rider).',
          'Du willst mitsingen und die Tonart liegt dir zu tief oder zu hoch.',
          'Du willst zur Originalaufnahme spielen, die in einer „gitarrenunfreundlichen" Tonart steht.',
        ],
      },
    ],
  },
  {
    id: 'ueben',
    titel: 'Effizient üben',
    inhalt: `Lieber 15 Minuten jeden Tag als 2 Stunden am Wochenende.
Aufwärmen (2 Min.): Em und Am greifen, Finger lockern.
Technik (5 Min.): One-Minute-Changes des schwierigsten Paars (z.B. C ↔ B7).
Rhythmus (3 Min.): Schlagmuster zum Metronom.
Song (5+ Min.): ein Abschnitt in Schleife.

Tempo-Regel: Start bei ${UEBE_BPM} BPM, 3× fehlerfrei → +5 BPM, Fehler → −10 BPM. Ziel: ${ORIGINAL_BPM} BPM.
Schwierigste Stelle zuerst üben, nicht immer von vorne beginnen.`,
  },
  {
    id: 'probleme',
    titel: 'Häufige Probleme und Lösungen',
    inhalt: `Saite schnarrt → näher ans Bundstäbchen, fester drücken.
Saite klingt dumpf → ein anderer Finger berührt sie; Finger steiler aufsetzen.
Mit Kapo klingt alles leicht schief → Kapo gerade und dicht am Bundstäbchen setzen, nachstimmen.
Fingerkuppen schmerzen → normal in den ersten 2–3 Wochen; kürzer, dafür öfter üben.
Akkordwechsel zu langsam → Ankerfinger nutzen, Wechsel auf Schlag 4 vorbereiten.
Rhythmus stockt beim Wechsel → Schlaghand NIE anhalten, notfalls Leersaiten anschlagen.
Barré klingt nicht → Zeigefinger auf die Kante drehen, Armgewicht statt Kraft, erst höher am Hals üben.`,
  },
]
