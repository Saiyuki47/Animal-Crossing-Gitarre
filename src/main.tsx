import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'lernseiten-ui/styles.css'
import './index.css'
import App from './App'
import { fortschrittUmziehen } from './lib/umzug'

// Vor dem ersten Rendern: Fortschritt vom alten Seitentitel übernehmen (siehe lib/umzug.ts)
fortschrittUmziehen()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
