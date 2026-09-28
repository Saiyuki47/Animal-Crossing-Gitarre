import { useCallback, useEffect, useRef } from 'react'

// Gemeinsame Audio-Helfer für Metronom (Werkzeuge) und Mitspiel-Modus (Songblatt).

/** Kurzer Klick zum exakten Zeitpunkt `zeit` (AudioContext-Zeit). */
export function klick(ctx: AudioContext, zeit: number, frequenz: number, lautstaerke: number) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.frequency.value = frequenz
  gain.gain.setValueAtTime(lautstaerke, zeit)
  gain.gain.exponentialRampToValueAtTime(0.0001, zeit + 0.05)
  osc.connect(gain).connect(ctx.destination)
  osc.start(zeit)
  osc.stop(zeit + 0.06)
}

/**
 * Ruft `fn` alle 25 ms auf und gibt eine Stopp-Funktion zurück. Läuft über einen
 * kleinen Inline-Worker, weil Browser setInterval in Hintergrund-Tabs auf ≥ 1 s
 * drosseln – dann würden Klicks stottern. Fallback auf setInterval, falls Worker
 * nicht verfügbar sind.
 */
export function starteTakt(fn: () => void): () => void {
  try {
    const url = URL.createObjectURL(new Blob(['setInterval(() => postMessage(0), 25)'], { type: 'text/javascript' }))
    const worker = new Worker(url)
    worker.onmessage = fn
    return () => {
      worker.terminate()
      URL.revokeObjectURL(url)
    }
  } catch {
    const id = window.setInterval(fn, 25)
    return () => window.clearInterval(id)
  }
}

/** Liefert einen (bei Bedarf fortgesetzten) AudioContext; wird beim Unmount geschlossen. */
export function useAudioContext() {
  const ref = useRef<AudioContext | null>(null)
  const get = useCallback(() => {
    if (!ref.current) ref.current = new AudioContext()
    if (ref.current.state === 'suspended') void ref.current.resume()
    return ref.current
  }, [])
  useEffect(() => () => void ref.current?.close(), [])
  return get
}