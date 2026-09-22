import type { ReferenzKarte } from 'lernseiten-ui'
import Griffbild from '../components/Griffbild'
import { akkorde, akkordNach, griffKurz, type AkkordGruppe } from './akkorde'

// Nachschlagekarten „Griffe & Technik". Jede Karte hat eine stabile `id`
// (Inhaltsverzeichnis + Deep-Link #referenz/<id>). Karten mit Griffbildern nutzen
// `inhaltNode`; `inhalt` bleibt trotzdem gesetzt, damit die globale Suche sie findet.

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

const akkordText = (gruppe: AkkordGruppe) =>
  akkorde
    .filter(a => a.gruppe === gruppe)
    .map(a => `${a.name}: ${griffKurz(a)}`)
    .join('\n')

const C = akkordNach('C')!

export const referenzKarten: ReferenzKarte[] = [
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
× über der Saite = nicht anschlagen
○ über der Saite = Leersaite, klingt mit
Punkt mit Zahl = Finger: 1 Zeige, 2 Mittel, 3 Ring, 4 kleiner Finger
Kurzschrift: von tiefem E nach hohem e, z.B. C = x32010`,
    inhaltNode: (
      <div className="griffbild-erklaerung">
        <Griffbild akkord={C} breite={120} />
        <ul>
          <li><b>Senkrechte Linien</b> = Saiten, links die tiefe E-Saite, rechts die hohe e-Saite.</li>
          <li><b>Waagerechte Linien</b> = Bünde; die dicke Linie oben ist der Sattel.</li>
          <li><b>×</b> = Saite nicht anschlagen, <b>○</b> = Leersaite klingt mit.</li>
          <li><b>Punkt mit Zahl</b> = welcher Finger drückt: 1 Zeige-, 2 Mittel-, 3 Ring-, 4 kleiner Finger.</li>
          <li><b>Kurzschrift</b> von tief nach hoch: C = <code>x32010</code>.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'dur-akkorde',
    titel: 'Offene Dur-Akkorde',
    inhalt: akkordText('Dur'),
    inhaltNode: <AkkordRaster gruppe="Dur" />,
  },
  {
    id: 'moll-akkorde',
    titel: 'Offene Moll-Akkorde',
    inhalt: akkordText('Moll'),
    inhaltNode: <AkkordRaster gruppe="Moll" />,
  },
  {
    id: 'sept-akkorde',
    titel: 'Septakkorde',
    inhalt: `${akkordText('Sept')}

Septakkorde erzeugen Spannung, die sich in den Akkord eine Quinte tiefer auflöst:
G7 → C, D7 → G, A7 → D, E7 → A, C7 → F`,
    inhaltNode: (
      <>
        <p className="ref-absatz">
          Septakkorde erzeugen Spannung, die sich in den Akkord eine Quinte tiefer auflöst:{' '}
          <b>G7 → C</b>, <b>D7 → G</b>, <b>A7 → D</b>, <b>E7 → A</b>, <b>C7 → F</b>. Sie geben Songs
          einen verspielten, bluesigen Klang.
        </p>
        <AkkordRaster gruppe="Sept" />
      </>
    ),
  },
  {
    id: 'schlagmuster',
    titel: 'Schlagmuster lesen und spielen',
    inhalt: `↓ = Abschlag (Richtung Boden)   ↑ = Aufschlag (Richtung Decke)
– = Luftschlag: Hand bewegt sich, trifft aber nicht

Zählweise bei Achteln:  1 und 2 und 3 und 4 und
Abschläge auf die Zahlen, Aufschläge auf „und"

Grundmuster:
Viertel:           ↓   ↓   ↓   ↓
Achtel:            ↓ ↑ ↓ ↑ ↓ ↑ ↓ ↑
Standard (Pop):    ↓ – ↓ ↑ – ↑ ↓ ↑
Country/Boom-Chuck: Bass ↓ Bass ↓  (Grundton einzeln, dann Akkord)`,
    beispiele: [
      {
        szenario: 'So übst du ein neues Muster',
        beispiele: [
          'Erst ohne Gitarre: Muster laut sprechen („Ab – Ab Auf – Auf Ab Auf") und dazu klatschen.',
          'Dann mit abgedämpften Saiten (linke Hand liegt locker auf) – nur Rhythmus, kein Klang.',
          'Dann mit einem einzigen Akkord, dann mit zwei Akkorden im Wechsel.',
          'Metronom im Tab „Werkzeuge" langsam starten und das Muster mitlesen.',
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
    id: 'kapodaster',
    titel: 'Kapodaster und Transponieren',
    inhalt: `Der Kapodaster verkürzt alle Saiten → jeder Griff klingt pro Bund einen Halbton höher.

Halbtonschritte:  C – C♯ – D – D♯ – E – F – F♯ – G – G♯ – A – A♯ – H – C

Formel: klingender Akkord = gegriffener Akkord + Bund des Kapodasters

Beispiele:
Kapo 2 + G-Griff  → klingt A
Kapo 3 + C-Griff  → klingt D♯ (E♭)
Kapo 1 + Em-Griff → klingt Fm

Andersherum: Steht im Songblatt ein schwerer Akkord (z.B. F), suche einen Kapo-Bund,
bei dem er zu einem offenen Griff wird: F = Kapo 1 + E-Griff, oder Kapo 3 + D-Griff.`,
    beispiele: [
      {
        szenario: 'Wann ist ein Kapodaster sinnvoll?',
        beispiele: [
          'Der Song enthält viele Barré-Akkorde (F, B♭, Bm …) – mit Kapo werden daraus offene Griffe.',
          'Du willst mitsingen und die Tonart liegt dir zu tief oder zu hoch.',
          'Du willst zur Originalaufnahme spielen, die in einer „gitarrenunfreundlichen" Tonart steht.',
        ],
      },
    ],
  },
  {
    id: 'dynamik',
    titel: 'Palm Muting und Dynamik',
    inhalt: `Palm Muting: Handballen der Schlaghand liegt leicht auf den Saiten direkt am Steg.
Klang: kurz, gedämpft, „tuckernd" – gut für Strophen, die sich aufbauen sollen.

Dynamik: Strophe leiser (weniger Saiten, näher am Griffbrett anschlagen),
Refrain lauter (alle Saiten, mehr Schwung, näher am Steg).

Akzente: Schläge 2 und 4 betonen (Backbeat) → der Song „groovt".`,
  },
  {
    id: 'ueben',
    titel: 'Effizient üben',
    inhalt: `Lieber 15 Minuten jeden Tag als 2 Stunden am Wochenende.
Aufwärmen (2 Min.): Em und Am greifen, Finger lockern.
Technik (5 Min.): One-Minute-Changes des schwierigsten Akkordpaars.
Rhythmus (3 Min.): Schlagmuster zum Metronom.
Song (5+ Min.): ein Abschnitt in Schleife.

Tempo-Regel: 3× fehlerfrei → +5 BPM. Fehler → −10 BPM.
Schwierigste Stelle zuerst üben, nicht immer von vorne beginnen.`,
  },
  {
    id: 'probleme',
    titel: 'Häufige Probleme und Lösungen',
    inhalt: `Saite schnarrt → näher ans Bundstäbchen, fester drücken.
Saite klingt dumpf → ein anderer Finger berührt sie; Finger steiler aufsetzen.
Fingerkuppen schmerzen → normal in den ersten 2–3 Wochen; kürzer, dafür öfter üben.
Akkordwechsel zu langsam → Ankerfinger nutzen, Wechsel auf Schlag 4 vorbereiten.
Rhythmus stockt beim Wechsel → Schlaghand NIE anhalten, notfalls Leersaiten anschlagen.
Klingt schief zur Aufnahme → nachstimmen, Kapo-Position prüfen.
Hand verkrampft → Pause, ausschütteln, Daumen hinter dem Hals nicht zu fest drücken.`,
  },
]
