// Die Seite hieß bis Oktober 2026 „Animal Crossing Gitarre". lernseiten-ui speichert
// Fortschritt, Karteikarten und Quiz-Zähler im localStorage unter dem Seitentitel
// (z.B. „done:<Titel>"). Damit nach der Umbenennung nichts verloren geht, ziehen die
// Einträge unter dem alten Titel einmalig auf den neuen Titel um.

const ALTER_TITEL = 'Animal Crossing Gitarre'

export function fortschrittUmziehen() {
  try {
    const neu = document.title
    if (!neu || neu === ALTER_TITEL) return
    const alteSchluessel: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k?.endsWith(`:${ALTER_TITEL}`)) alteSchluessel.push(k)
    }
    for (const k of alteSchluessel) {
      const ziel = k.slice(0, -ALTER_TITEL.length) + neu
      const wert = localStorage.getItem(k)
      // Gibt es unter dem neuen Titel schon Daten, haben die Vorrang
      if (wert !== null && localStorage.getItem(ziel) === null) localStorage.setItem(ziel, wert)
      localStorage.removeItem(k)
    }
  } catch {
    // Speicher nicht verfügbar (z.B. privates Fenster) – dann gibt es nichts umzuziehen
  }
}
