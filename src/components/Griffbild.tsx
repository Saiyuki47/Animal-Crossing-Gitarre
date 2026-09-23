import type { Akkord } from '../data/akkorde'
import { griffKurz } from '../data/akkorde'

// Griffbild (Chord-Diagramm) als SVG: senkrechte Linien = Saiten (links tiefes E),
// waagerechte Linien = Bünde. Beginnt das Bild im 1. Bund, ist oben der dicke Sattel;
// sonst steht rechts die Bundnummer (z.B. „4fr"). x = nicht anschlagen, o = Leersaite,
// Punkte mit Zahl = welcher Finger in welchem Bund drückt, Balken = Barré.

const SAITEN_X = [15, 29, 43, 57, 71, 85]
const SATTEL_Y = 34
const BUND_H = 20
const BUENDE = 4

interface Props {
  akkord: Akkord
  /** Breite in px (Höhe skaliert mit). */
  breite?: number
}

export default function Griffbild({ akkord, breite = 100 }: Props) {
  const start = akkord.startBund ?? 1
  const mitteY = (bund: number) => SATTEL_Y + (bund - start + 0.5) * BUND_H
  const { barre } = akkord
  const unterBarre = (i: number, b: number | null) =>
    barre !== undefined && b === barre.bund && i >= barre.von && i <= barre.bis && akkord.finger[i] === 1

  return (
    <svg
      viewBox="0 0 110 130"
      width={breite}
      role="img"
      aria-label={`${akkord.name}: ${griffKurz(akkord)}${start > 1 ? `, ab ${start}. Bund` : ''}`}
      className="griffbild"
    >
      <text x="50" y="13" textAnchor="middle" className="griffbild-name">
        {akkord.name}
      </text>
      {/* Sattel bzw. oberster Bundstab */}
      <line
        x1={SAITEN_X[0]}
        x2={SAITEN_X[5]}
        y1={SATTEL_Y}
        y2={SATTEL_Y}
        stroke="currentColor"
        strokeWidth={start === 1 ? 3.5 : 1}
        opacity={start === 1 ? 1 : 0.55}
      />
      {start > 1 && (
        <text x="95" y={SATTEL_Y + BUND_H / 2 + 3.5} className="griffbild-bundnr">
          {start}fr
        </text>
      )}
      {/* Bundstäbe */}
      {Array.from({ length: BUENDE }, (_, j) => {
        const y = SATTEL_Y + (j + 1) * BUND_H
        return <line key={j} x1={SAITEN_X[0]} x2={SAITEN_X[5]} y1={y} y2={y} stroke="currentColor" strokeWidth="1" opacity="0.55" />
      })}
      {/* Saiten */}
      {SAITEN_X.map(x => (
        <line key={x} x1={x} x2={x} y1={SATTEL_Y} y2={SATTEL_Y + BUENDE * BUND_H} stroke="currentColor" strokeWidth="1" />
      ))}
      {/* Barré-Balken */}
      {barre && (
        <g>
          <rect
            x={SAITEN_X[barre.von] - 6.5}
            y={mitteY(barre.bund) - 6.5}
            width={SAITEN_X[barre.bis] - SAITEN_X[barre.von] + 13}
            height="13"
            rx="6.5"
            className="griffbild-punkt"
          />
          <text x={(SAITEN_X[barre.von] + SAITEN_X[barre.bis]) / 2} y={mitteY(barre.bund) + 3.5} textAnchor="middle" className="griffbild-finger">
            1
          </text>
        </g>
      )}
      {/* x / o über dem Sattel und Fingerpunkte */}
      {akkord.bund.map((b, i) => {
        const x = SAITEN_X[i]
        if (b === null) {
          return (
            <text key={i} x={x} y="28" textAnchor="middle" className="griffbild-marke">
              ×
            </text>
          )
        }
        if (b === 0) {
          return <circle key={i} cx={x} cy="24" r="4" fill="none" stroke="currentColor" strokeWidth="1.2" />
        }
        if (unterBarre(i, b)) return null
        const y = mitteY(b)
        const f = akkord.finger[i]
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="6.5" className="griffbild-punkt" />
            {f && (
              <text x={x} y={y + 3.5} textAnchor="middle" className="griffbild-finger">
                {f}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
