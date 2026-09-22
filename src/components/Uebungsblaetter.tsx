import { useState, type CSSProperties } from 'react'
import { useDoneTracker, useTaskDeepLink, getHashDetail } from 'lernseiten-ui'
import { uebungsblaetter } from '../data/uebungsblaetter'
import { aufgaben } from '../data/aufgaben'

export default function Uebungsblaetter() {
  const [selectedId, setSelectedId] = useState(() => {
    const b = getHashDetail().blatt
    return b && uebungsblaetter.some(x => x.id === b) ? b : (uebungsblaetter[0]?.id ?? '')
  })
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())
  const [openTipps, setOpenTipps] = useState<Set<string>>(new Set())
  const { done, toggle: toggleDone, ratio } = useDoneTracker()
  const listRef = useTaskDeepLink<HTMLDivElement>(selectedId)

  const blatt = uebungsblaetter.find(b => b.id === selectedId)

  const toggleTipp = (key: string) => {
    setOpenTipps(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const toggleSolution = (key: string) => {
    setOpenIds(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const taskKeys = blatt ? blatt.aufgaben.map(t => `${blatt.id}-${t.nr}`) : []
  const verstanden = taskKeys.filter(k => done.has(k)).length
  const pct = Math.round(ratio(taskKeys) * 100)

  return (
    <div>
      <div className="section-header">
        <h2>Übungsblätter</h2>
        <p>Aufgaben und Musterlösungen nach Übungsblatt geordnet.</p>
      </div>

      {uebungsblaetter.length > 1 && (
        <div className="filter-row">
          {uebungsblaetter.map(b => (
            <button
              type="button"
              key={b.id}
              className={`filter-btn${selectedId === b.id ? ' on' : ''}`}
              onClick={() => setSelectedId(b.id)}
            >
              Blatt {b.nr}
            </button>
          ))}
        </div>
      )}

      {blatt && (
        <>
          <div className="ub-header card">
            <div className="ub-meta-row">
              <span className="ub-badge">{blatt.typ}</span>
            </div>
            <h3 className="ub-title">Übungsblatt {blatt.nr}</h3>
            {blatt.beschreibung && <p className="ub-desc">{blatt.beschreibung}</p>}
            {taskKeys.length > 0 && (
              <>
                <div className="progress-wrap" style={{ marginTop: '0.75rem' }}>
                  <div className="progress-bar" style={{ '--bar-w': `${pct}%` } as CSSProperties} />
                </div>
                <p className="ub-desc" style={{ marginTop: '0.4rem' }}>
                  {verstanden} / {taskKeys.length} Aufgaben verstanden ({pct}%)
                </p>
              </>
            )}
          </div>

          <div ref={listRef}>
            {blatt.aufgaben.map(task => {
              const aufgabe = aufgaben.find(a => a.id === task.aufgabeId)
              const key = `${blatt.id}-${task.nr}`
              const isOpen = openIds.has(key)
              const isTippOpen = openTipps.has(key)
              const isDone = done.has(key)

              return (
                <div key={key} className="card" data-aufgabe={String(task.nr)}>
                  <p className="ub-task-nr">Aufgabe {task.nr}</p>
                  <p className="q-title">{task.text}</p>
                  {aufgabe && (
                    <>
                      {aufgabe.tipp && (
                        <>
                          <button type="button" className="toggle-btn toggle-btn--tips" onClick={() => toggleTipp(key)}>
                            {isTippOpen ? '▼ Tipp verbergen' : '▶ Tipp anzeigen'}
                          </button>
                          {isTippOpen && <p className="tipp-block">{aufgabe.tipp}</p>}
                        </>
                      )}
                      {aufgabe.loesung && (
                        <>
                          <button type="button" className="toggle-btn" onClick={() => toggleSolution(key)}>
                            {isOpen ? '▼ Lösung verbergen' : '▶ Lösung anzeigen'}
                          </button>
                          {isOpen && <pre className="sql-block visible">{aufgabe.loesung}</pre>}
                        </>
                      )}
                    </>
                  )}
                  <button
                    type="button"
                    className="toggle-btn"
                    onClick={() => toggleDone(key)}
                    style={isDone ? { color: 'var(--green, #2ea043)', borderColor: 'var(--green, #2ea043)' } : undefined}
                  >
                    {isDone ? '✓ Verstanden' : '○ Als verstanden markieren'}
                  </button>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
