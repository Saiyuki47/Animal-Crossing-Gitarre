import { Referenz, useHashSubTab } from 'lernseiten-ui'
import { referenzKarten } from '../data/referenz'
import Begriffe from './Begriffe'

// Referenz-Tab mit zwei Untertabs (wie in den anderen Lernseiten):
//   📚 Themen         – die Referenz-/Nachschlagekarten (data/referenz.ts)
//   🧠 Begriffe lernen – Glossar mit Lernmodus (components/Begriffe.tsx)
// useHashSubTab hält den offenen Untertab im zweiten Hash-Segment
// (#referenz/begriffe) – teilbar, per replaceState (kein History-Eintrag),
// Tab bleibt erhalten. Der Fallback „themen" steht anfangs nicht in der URL.

// Karten-Inhalt als vorformatierter Text (Template ohne KaTeX). Für Mathe-Fächer
// hier stattdessen z.B. `text => <MathText block>{text}</MathText>` verwenden.
const renderBlock = (t: string) => <div style={{ whiteSpace: 'pre-wrap' }}>{t}</div>

const ANSICHTEN = [
  { id: 'themen', label: '📚 Themen' },
  { id: 'begriffe', label: '🧠 Begriffe lernen' },
] as const

export default function Cheatsheet() {
  const [ansicht, setAnsicht] = useHashSubTab(['themen', 'begriffe'] as const, 'themen')

  return (
    <div>
      <div className="ref-switch" role="tablist" aria-label="Referenz-Ansicht wählen">
        {ANSICHTEN.map(a => (
          <button
            key={a.id}
            type="button"
            role="tab"
            aria-selected={a.id === ansicht}
            className={`ref-switch-tab${a.id === ansicht ? ' active' : ''}`}
            onClick={() => setAnsicht(a.id)}
          >
            {a.label}
          </button>
        ))}
      </div>
      {ansicht === 'themen' && <Referenz karten={referenzKarten} render={renderBlock} tab="referenz" />}
      {ansicht === 'begriffe' && <Begriffe />}
    </div>
  )
}
