import { useEffect, useState } from 'react'

const MESSAGES = [
  'Analyzing body silhouette...',
  'Mapping facial undertones...',
  'Scanning latest 2024 trends...',
  'Generating your exclusive wardrobe...',
] as const

const CYCLE_MS = 2000

export function StyleLoader() {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length)
    }, CYCLE_MS)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div
      className="flex min-h-[320px] flex-col items-center justify-center px-6 py-12"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="AI style processing"
    >
      <div className="relative flex h-28 w-28 items-center justify-center">
        <div
          className="absolute inset-0 rounded-full bg-neon/5 blur-xl"
          aria-hidden
        />
        <div
          className="absolute inset-2 rounded-full border border-neon/15"
          aria-hidden
        />
        <div
          className="style-loader-ring absolute inset-0 rounded-full"
          aria-hidden
        />
        <div
          className="absolute inset-6 rounded-full bg-neon/10 ring-1 ring-neon/30 style-loader-pulse"
          aria-hidden
        />
        <div
          className="relative h-2.5 w-2.5 rounded-full bg-neon shadow-[0_0_12px_#00f0a0]"
          aria-hidden
        />
      </div>

      <p
        key={messageIndex}
        className="mt-10 max-w-sm text-center text-sm font-medium tracking-wide text-slate-300 style-loader-message"
      >
        {MESSAGES[messageIndex]}
      </p>

      <p
        className="mt-16 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600"
        aria-hidden
      >
        processing...
      </p>
    </div>
  )
}
