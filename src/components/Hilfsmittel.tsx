import { useEffect } from 'react'

// Hilfsmittel-Tab: eine druckbare A4-Seite (Spickzettel/Formelblatt) – wie die
// Hilfsmittel-Tabs der anderen Lernseiten. Fülle die Boxen mit deinen eigenen
// Kurzregeln/Formeln. „🖨️ Drucken" öffnet den Druckdialog; per @media print
// werden Header/Tabs ausgeblendet und die Boxen A4-tauglich gesetzt.

interface Zeile {
  /** Optionales Label vor dem Inhalt. */
  l?: string
  /** Inhalt (Formel/Regel), in Monospace. */
  f: string
}

interface Box {
  t: string
  r: Zeile[]
}

// TODO: Ersetze die Beispiel-Boxen durch deinen eigenen Spickzettel-Inhalt.
const SEITE1: Box[] = [
  {
    t: 'Grundregeln',
    r: [
      { l: 'Regel 1', f: 'Kurze, prägnante Merkregel oder Formel.' },
      { l: 'Regel 2', f: 'Noch eine Regel – so knapp wie möglich.' },
      { f: 'Freitext ohne Label ist auch möglich.' },
    ],
  },
  {
    t: 'Formeln',
    r: [
      { l: 'Fläche', f: 'A = a · b' },
      { l: 'Umfang', f: 'U = 2 · (a + b)' },
      { l: 'Mittelwert', f: 'x̄ = (x₁ + … + xₙ) / n' },
    ],
  },
  {
    t: 'Vorgehen (Schritt für Schritt)',
    r: [
      { f: '1) Gegebenes und Gesuchtes notieren.' },
      { f: '2) Passende Formel/Regel wählen.' },
      { f: '3) Einsetzen, umstellen, ausrechnen.' },
      { f: '4) Ergebnis auf Plausibilität prüfen.' },
    ],
  },
  {
    t: 'Häufige Fehler',
    r: [
      { l: 'Fehler', f: 'Typische Stolperfalle kurz benennen …' },
      { l: 'Besser', f: '… und wie man sie vermeidet.' },
    ],
  },
]

function SpickzettelSeite({ boxen, nr }: { boxen: Box[]; nr: number }) {
  return (
    <div className="hm-page">
      <p className="hm-page-head">Spickzettel · Seite {nr}</p>
      <div className="hm-grid">
        {boxen.map(box => (
          <section key={box.t} className="hm-box">
            <h4>{box.t}</h4>
            <ul>
              {box.r.map(zeile => (
                <li key={zeile.f}>
                  {zeile.l && <span className="hm-label">{zeile.l}</span>}
                  <span className="hm-code">{zeile.f}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}

export default function Hilfsmittel() {
  useEffect(() => injectCss(), [])
  return (
    <div>
      <div className="section-header no-print">
        <h2>Hilfsmittel</h2>
        <p>
          Ein druckbarer Spickzettel auf einer A4-Seite. Fülle die Boxen mit deinen eigenen
          Formeln und Kurzregeln – „🖨️ Drucken" erzeugt ein sauberes Blatt ohne Menü und Tabs.
        </p>
      </div>
      <div className="filter-row no-print" style={{ marginBottom: '0.9rem' }}>
        <button type="button" className="filter-btn" onClick={() => window.print()}>
          🖨️ Drucken (A4)
        </button>
      </div>
      <SpickzettelSeite boxen={SEITE1} nr={1} />
    </div>
  )
}

// Selbst-injiziertes CSS (einmalig) inkl. @media print – wie beim DB-Hilfsmittel.
// Nutzt die Theme-Variablen aus lernseiten-ui/styles.css.
const HM_CSS = `
.hm-page{margin:0 0 1.2rem}
.hm-page-head{margin:0 0 .5rem;font-size:.8rem;font-weight:600;color:var(--text2)}
.hm-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:.7rem}
.hm-box{border:1px solid var(--border2,var(--border));border-radius:8px;background:var(--bg2);padding:.55rem .7rem;break-inside:avoid}
.hm-box h4{margin:0 0 .35rem;font-size:.85rem;color:var(--text)}
.hm-box ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.3rem}
.hm-box li{font-size:.78rem;line-height:1.45;color:var(--text)}
.hm-label{display:inline-block;margin-right:.4rem;padding:0 .35rem;border-radius:4px;background:var(--bg3);color:var(--text2);font-size:.72rem;font-weight:600}
.hm-code{font-family:var(--font-mono,monospace);font-size:.76rem;color:var(--text)}
@media print{
  header,.tabs,.no-print,.site-nav{display:none!important}
  body{background:#fff}
  .container{max-width:none;padding:0}
  .hm-page{break-after:page;margin:0}
  .hm-page:last-child{break-after:auto}
  .hm-grid{grid-template-columns:1fr 1fr;gap:8pt}
  .hm-box{border:.75pt solid #999;background:#fff;padding:5pt 7pt}
  .hm-box h4{color:#000;font-size:9.5pt;margin-bottom:2pt}
  .hm-box li{color:#000;font-size:8pt;line-height:1.35}
  .hm-label{background:#eee;color:#333}
  .hm-code{color:#000}
  .hm-page-head{color:#333}
}
`

function injectCss() {
  if (typeof document === 'undefined') return
  if (document.getElementById('template-hilfsmittel-css')) return
  const s = document.createElement('style')
  s.id = 'template-hilfsmittel-css'
  s.textContent = HM_CSS
  document.head.appendChild(s)
}
