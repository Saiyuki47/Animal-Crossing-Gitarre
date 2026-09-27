import { lazy, Suspense } from 'react'
import { Header, GlobalSearch, Tabs, tabDefs, useTheme, useHashTab, type TabDef } from 'lernseiten-ui'
import { quizFragen } from './data/quiz'
import { karteikarten } from './data/karteikarten'

const Cheatsheet = lazy(() => import('./components/Cheatsheet'))
const Hilfsmittel = lazy(() => import('./components/Hilfsmittel'))
const Uebungsblaetter = lazy(() => import('./components/Uebungsblaetter'))
const Werkzeuge = lazy(() => import('./components/Werkzeuge'))
const Quiz = lazy(() => import('lernseiten-ui').then(m => ({ default: m.Quiz })))
const Flashcards = lazy(() => import('lernseiten-ui').then(m => ({ default: m.Flashcards })))

// Tab-IDs und Icons kommen wie bei allen Lernseiten aus lernseiten-ui (tabDefs),
// die Reihenfolge folgt STANDARD_TAB_REIHENFOLGE. Weil hier ein Instrument statt einer
// Vorlesung gelernt wird, bekommen die Tabs eigene Beschriftungen, und statt „Moodle"
// gibt es den Tab „Werkzeuge" (Metronom, Tempo tippen, Stimmtöne).
const TABS = ['uebung', 'referenz', 'hilfsmittel', 'werkzeuge', 'karten', 'quiz'] as const
export type TabId = (typeof TABS)[number]

const LABELS: Partial<Record<TabId, string>> = {
  uebung: 'Lernschritte',
  referenz: 'Griffe & Technik',
  hilfsmittel: 'Spickzettel',
}

// Metronom-Icon (Pendel im Trapez)
const WERKZEUGE_ICON = (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9 3h6l4 18H5z" />
    <line x1="12" y1="16" x2="16.5" y2="6" />
    <line x1="7" y1="16" x2="17" y2="16" />
  </svg>
)

const tabs: TabDef<TabId>[] = tabDefs(TABS).map(t =>
  t.id === 'werkzeuge'
    ? { ...t, label: 'Werkzeuge', icon: WERKZEUGE_ICON }
    : { ...t, label: LABELS[t.id] ?? t.label },
)

// Alte Hashes umleiten: „themen" → Referenz-Untertab, „moodle" → Werkzeuge.
const LEGACY_TABS: Record<string, TabId> = { themen: 'referenz', moodle: 'werkzeuge' }
if (typeof window !== 'undefined') {
  const teile = window.location.hash.replace(/^#/, '').split('/')
  const neu = LEGACY_TABS[teile[0]]
  if (neu) {
    teile[0] = neu
    history.replaceState(null, '', '#' + teile.join('/'))
  }
}

function App() {
  const [activeTab, setActiveTab] = useHashTab(TABS, 'uebung')
  const { theme, toggle } = useTheme()

  return (
    <>
      <Header logo={<>KK<span>.</span>Gitarre</>} subtitle="Go K.K. Rider auf der Akustikgitarre lernen" current="gitarre" theme={theme} onToggleTheme={toggle} />
      <div className="container">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
          <GlobalSearch loadIndex={() => import('./data/searchIndex').then(m => m.searchIndex)} onNavigate={t => setActiveTab(t as TabId)} />
        </div>
        <Suspense fallback={<div className="card"><p className="quiz-hint">Lädt …</p></div>}>
          {activeTab === 'referenz' && <Cheatsheet />}
          {activeTab === 'hilfsmittel' && <Hilfsmittel />}
          {activeTab === 'quiz' && <Quiz fragen={quizFragen} />}
          {activeTab === 'karten' && <Flashcards cards={karteikarten} />}
          {activeTab === 'werkzeuge' && <Werkzeuge />}
          {activeTab === 'uebung' && <Uebungsblaetter />}
        </Suspense>
      </div>
    </>
  )
}

export default App
