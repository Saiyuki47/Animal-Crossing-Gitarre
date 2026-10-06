import { lazy, Suspense, useState, type CSSProperties } from 'react'
import { useDoneTracker, useTaskDeepLink, getHashDetail, setHashDetail } from 'lernseiten-ui'
import { uebungsblaetter } from '../data/uebungsblaetter'
import { aufgaben } from '../data/aufgaben'
import { akkordNach } from '../data/akkorde'
import { LIEDER, liedNach } from '../data/lieder'
import Griffbild from './Griffbild'

const Songblatt = lazy(() => import('./Songblatt'))

// Lernschritte mit einem Untertab je Lied (Go K.K. Rider, K.K. Cruisin'). Unter
// jedem Lied: dessen Schritte plus „🎵 Das ganze Lied" (Songblatt).
// Hash: #uebung/<schritt-id>[/<übung>] bzw. #uebung/lied-<lied-id> fürs Songblatt.
// Ältere Links #uebung/lied[/<lied-id>] werden weiterhin verstanden.

const LIED_PRAEFIX = 'lied-'
const songblattId = (liedId: string) => LIED_PRAEFIX + liedId
const ersterSchritt = (liedId: string) => uebungsblaetter.find(b => b.lied === liedId)?.id ?? songblattId(liedId)

/** Gewählte Ansicht aus dem Hash: Schritt-ID oder Songblatt-ID. */
function startAuswahl(): string {
  const { blatt, aufgabe } = getHashDetail()
  if (blatt === 'lied') return songblattId(liedNach(aufgabe).id)
  if (blatt?.startsWith(LIED_PRAEFIX) && LIEDER.some(l => songblattId(l.id) === blatt)) return blatt
  if (blatt && uebungsblaetter.some(b => b.id === blatt)) return blatt
  return ersterSchritt(LIEDER[0].id)
}

export default function Uebungsblaetter() {
  const [selectedId, setSelectedId] = useState(startAuswahl)
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())
  const [openTipps, setOpenTipps] = useState<Set<string>>(new Set())
  const { done, toggle: toggleDone, ratio } = useDoneTracker()
  const listRef = useTaskDeepLink<HTMLDivElement>(selectedId)

  const blatt = uebungsblaetter.find(b => b.id === selectedId)
  const lied = liedNach(blatt ? blatt.lied : selectedId.slice(LIED_PRAEFIX.length))
  const schritte = uebungsblaetter.filter(b => b.lied === lied.id)
  const zeigtSongblatt = selectedId === songblattId(lied.id)

  const waehle = (id: string) => {
    setSelectedId(id)
    setHashDetail(id)
  }

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
      <div className="ref-switch" role="tablist" aria-label="Lied wählen">
        {LIEDER.map(l => (
          <button
            key={l.id}
            type="button"
            role="tab"
            aria-selected={l.id === lied.id}
            className={`ref-switch-tab${l.id === lied.id ? ' active' : ''}`}
            onClick={() => l.id !== lied.id && waehle(ersterSchritt(l.id))}
          >
            🎸 {l.titel}
          </button>
        ))}
      </div>

      <div className="section-header">
        <h2>Lernschritte: {lied.titel}</h2>
        <p>{lied.lernIntro} Hak ab, was sitzt – dein Fortschritt wird gespeichert.</p>
      </div>

      <div className="filter-row">
        {schritte.map(b => (
          <button
            type="button"
            key={b.id}
            className={`filter-btn${selectedId === b.id ? ' on' : ''}`}
            onClick={() => waehle(b.id)}
          >
            {b.nr}. {b.titel}
          </button>
        ))}
        <button
          type="button"
          className={`filter-btn sb-lied-btn${zeigtSongblatt ? ' on' : ''}`}
          onClick={() => waehle(songblattId(lied.id))}
        >
          🎵 Das ganze Lied
        </button>
      </div>

      {zeigtSongblatt && (
        <Suspense fallback={<div className="card"><p className="quiz-hint">Lädt …</p></div>}>
          {/* key: beim Liedwechsel startet das Songblatt frisch (Tempo, Startpunkt, Wiedergabe) */}
          <Songblatt key={lied.id} lied={lied} />
        </Suspense>
      )}

      {blatt && (
        <>
          <div className="ub-header card">
            <div className="ub-meta-row">
              <span className="ub-badge">{blatt.typ}</span>
              {blatt.dauer && <span className="ub-badge">⏱ {blatt.dauer}</span>}
            </div>
            <h3 className="ub-title">Schritt {blatt.nr}: {blatt.titel}</h3>
            {blatt.beschreibung && <p className="ub-desc">{blatt.beschreibung}</p>}
            {blatt.link && (
              <p style={{ marginTop: '0.6rem' }}>
                <a className="filter-btn" href={blatt.link.url} target="_blank" rel="noopener noreferrer">
                  {blatt.link.text} ↗
                </a>
              </p>
            )}
            {taskKeys.length > 0 && (
              <>
                <div className="progress-wrap" style={{ marginTop: '0.75rem' }}>
                  <div className="progress-bar" style={{ '--bar-w': `${pct}%` } as CSSProperties} />
                </div>
                <p className="ub-desc" style={{ marginTop: '0.4rem' }}>
                  {verstanden} / {taskKeys.length} Übungen sitzen ({pct}%)
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
                  <p className="ub-task-nr">Übung {task.nr}</p>
                  <p className="q-title">{task.text}</p>
                  {aufgabe && (
                    <>
                      <p className="ub-desc">{aufgabe.aufgabeText}</p>
                      {aufgabe.akkorde && (
                        <div className="griffbild-reihe">
                          {aufgabe.akkorde.map(id => {
                            const a = akkordNach(id)
                            return a ? <Griffbild key={id} akkord={a} breite={84} /> : null
                          })}
                        </div>
                      )}
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
                            {isOpen ? '▼ Ziel verbergen' : '▶ Woran merke ich, dass es sitzt?'}
                          </button>
                          {isOpen && <p className="tipp-block ziel-block">{aufgabe.loesung}</p>}
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
                    {isDone ? '✓ Sitzt!' : '○ Als geschafft markieren'}
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
