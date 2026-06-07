import { Camera, Sparkles, Upload } from 'lucide-react'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from 'react'

type UploadPhase = 'idle' | 'preprocessing'

const PREPROCESS_DURATION_MS = 1500

const PREPROCESS_LOGS = [
  'Compressing image payload to 420KB...',
  'Optimizing canvas aspect ratio for body-coordinate matrix...',
] as const

interface UploadSectionProps {
  onPreprocessComplete: () => void
  variant?: 'default' | 'luxury'
  /** Compact centered layout for lock card / modal */
  layout?: 'default' | 'embedded'
}

export function UploadSection({
  onPreprocessComplete,
  variant = 'default',
  layout = 'default',
}: UploadSectionProps) {
  const isLuxury = variant === 'luxury'
  const isEmbedded = layout === 'embedded'
  const inputRef = useRef<HTMLInputElement>(null)
  const [phase, setPhase] = useState<UploadPhase>('idle')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [activeLogIndex, setActiveLogIndex] = useState(0)
  const [visibleLogCount, setVisibleLogCount] = useState(0)

  const beginPreprocessing = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return

    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl((previous) => {
      if (previous) URL.revokeObjectURL(previous)
      return objectUrl
    })
    setPhase('preprocessing')
    setActiveLogIndex(0)
    setVisibleLogCount(0)
  }, [])

  useEffect(() => {
    if (phase !== 'preprocessing') return

    const logTimers = [
      window.setTimeout(() => setVisibleLogCount(1), 120),
      window.setTimeout(() => {
        setActiveLogIndex(1)
        setVisibleLogCount(2)
      }, 720),
      window.setTimeout(() => {
        setPhase('idle')
        onPreprocessComplete()
      }, PREPROCESS_DURATION_MS),
    ]

    return () => logTimers.forEach((id) => window.clearTimeout(id))
  }, [phase, onPreprocessComplete])

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) beginPreprocessing(file)
    event.target.value = ''
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (file) beginPreprocessing(file)
  }

  const isPreprocessing = phase === 'preprocessing'

  return (
    <section
      className={`font-sans ${isEmbedded ? 'w-full' : isLuxury ? '' : 'mb-10'}`}
    >
      {!isLuxury && (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Discover Your Perfect Style
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400 sm:text-base">
              AI-powered fashion recommendations tailored for you.
            </p>
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isPreprocessing}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Sparkles className="h-4 w-4" />
            AI Analysis
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={handleFileChange}
        aria-hidden
        tabIndex={-1}
      />

      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        className={`relative w-full overflow-hidden transition-all duration-300 ease-in-out ${
          isEmbedded && isLuxury
            ? isPreprocessing
              ? 'border-dashed border-2 border-[#2C4A3F]/40 bg-white/50 shadow-[0px_12px_24px_rgba(44,74,63,0.06)] rounded-[1.5rem] p-6 text-center'
              : 'border-dashed border-2 border-[#234233]/20 bg-white/20 rounded-[1.5rem] p-6 text-center'
            : `border border-dashed rounded-2xl ${
                isEmbedded
                  ? 'px-5 py-6 text-center sm:px-6 sm:py-7'
                  : 'px-6 py-8 sm:px-8 sm:py-10'
              } ${
                isLuxury
                  ? isPreprocessing
                    ? 'border-[#2C4A3F]/40 bg-white/50 shadow-[0px_12px_24px_rgba(44,74,63,0.06)]'
                    : 'border-emerald-900/20 bg-white/50 hover:border-[#2C4A3F]/40 hover:bg-white/70'
                  : isPreprocessing
                    ? 'border-[#00F0A0]/40 bg-slate-800/90 shadow-[0_0_32px_rgba(0,240,160,0.08)]'
                    : 'border-slate-700 bg-slate-800/50 hover:border-emerald-500/30 hover:bg-slate-800/80'
              }`
        }`}
        role={isPreprocessing ? 'status' : undefined}
        aria-live={isPreprocessing ? 'polite' : undefined}
        aria-busy={isPreprocessing}
      >
        {isPreprocessing && previewUrl ? (
          <div className="mx-auto max-w-md space-y-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[220px] overflow-hidden rounded-xl bg-slate-950 ring-1 ring-slate-700/80">
              <img
                src={previewUrl}
                alt="Upload preview for computer vision preprocessing"
                className="h-full w-full object-cover opacity-90"
              />

              <div
                className="cv-bbox-overlay absolute inset-[12%] rounded-sm border-2 border-[#00F0A0]/80 shadow-[0_0_20px_rgba(0,240,160,0.35)]"
                aria-hidden
              >
                <span className="absolute -top-5 left-0 text-[9px] font-mono uppercase tracking-wider text-[#00F0A0]">
                  face lock
                </span>
                <span className="absolute -bottom-5 right-0 text-[9px] font-mono uppercase tracking-wider text-[#00F0A0]/90">
                  shoulder axis
                </span>
                <span className="absolute left-0 top-0 h-2 w-2 border-l-2 border-t-2 border-[#00F0A0]" />
                <span className="absolute right-0 top-0 h-2 w-2 border-r-2 border-t-2 border-[#00F0A0]" />
                <span className="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-[#00F0A0]" />
                <span className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-[#00F0A0]" />
              </div>

              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent"
                aria-hidden
              />
            </div>

            <div
              className={`space-y-2 rounded-xl border px-4 py-3 font-mono text-[11px] ${
                isLuxury
                  ? 'border-[#2C4A3F]/20 bg-white'
                  : 'border-slate-700/60 bg-slate-900/80'
              }`}
            >
              <p
                className={`text-[10px] font-semibold uppercase tracking-[0.25em] ${
                  isLuxury ? 'text-[#2C4A3F]' : 'text-[#00F0A0]/80'
                }`}
              >
                Pre-processing
              </p>
              <ul className="space-y-1.5" aria-label="Pre-processing pipeline logs">
                {PREPROCESS_LOGS.map((log, index) => (
                  <li
                    key={log}
                    className={`preprocess-log transition-all duration-500 ${
                      index < visibleLogCount
                        ? `translate-y-0 opacity-100 ${isLuxury ? 'text-[#64748B]' : 'text-slate-300'}`
                        : `translate-y-1 opacity-0 ${isLuxury ? 'text-[#94A3B8]' : 'text-slate-600'}`
                    } ${index === activeLogIndex && index < visibleLogCount ? (isLuxury ? 'text-[#2C4A3F]' : 'text-[#00F0A0]') : ''}`}
                  >
                    <span className={isLuxury ? 'text-[#A3BCAB]' : 'text-[#00F0A0]/60'}>
                      &gt;
                    </span>{' '}
                    {log}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div
            className={
              isEmbedded
                ? 'flex flex-col items-center text-center'
                : undefined
            }
          >
            {isEmbedded && isLuxury ? (
              <>
                <h3 className="font-sans text-[15px] font-semibold text-[#234233] tracking-wide mb-3">
                  Upload Your Photo
                </h3>
                <Camera className="mx-auto mb-4 h-8 w-8 text-[#234233]" strokeWidth={1.5} />
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#234233] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#1a3327] hover:scale-105"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>Choose File</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#234233]/25 bg-white px-5 py-2.5 text-xs font-semibold text-[#234233] shadow-sm transition-all hover:bg-[#234233]/5 hover:scale-105"
                  >
                    <Camera className="h-3.5 w-3.5" />
                    <span>Take Photo</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                {!isEmbedded && (
                  <div
                    className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${
                      isLuxury
                        ? 'bg-[#2C4A3F]/10 ring-1 ring-[#2C4A3F]/25'
                        : 'bg-emerald-505/15 ring-1 ring-emerald-505/30'
                    }`}
                  >
                    <Upload
                      className={`h-9 w-9 ${isLuxury ? 'text-[#2C4A3F]' : 'text-emerald-400'}`}
                      strokeWidth={1.5}
                    />
                  </div>
                )}

                <h3
                  className={`font-sans text-lg font-semibold sm:text-xl ${
                    isLuxury ? 'text-[#1E293B]' : 'text-white'
                  }`}
                >
                  Upload Your Photo
                </h3>
                <p
                  className={`mt-2 max-w-sm font-sans text-sm leading-relaxed ${
                    isLuxury ? 'text-[#64748B]' : 'text-slate-400'
                  }`}
                >
                  Drop your image here or click to browse
                </p>
                <p
                  className={`mt-1 font-sans text-[10px] font-medium tracking-widest ${
                    isLuxury ? 'text-[#94A3B8]' : 'text-slate-500'
                  }`}
                >
                  SUPPORTS JPG, PNG UP TO 10MB
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-transparent px-5 py-2.5 font-sans text-sm font-semibold whitespace-nowrap transition-colors ${
                      isLuxury
                        ? 'bg-[#2C4A3F] text-white hover:bg-[#243d34]'
                        : 'bg-emerald-50 text-slate-950 hover:bg-emerald-400'
                    }`}
                  >
                    <Upload className="h-4 w-4 shrink-0" aria-hidden />
                    Choose File
                  </button>
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-full border px-5 py-2.5 font-sans text-sm font-semibold whitespace-nowrap transition-colors ${
                      isLuxury
                        ? 'border-[#2C4A3F] bg-white text-[#2C4A3F] hover:bg-[#2C4A3F]/5'
                        : 'border-slate-600 bg-slate-800 text-slate-300 hover:border-slate-500 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <Camera className="h-4 w-4 shrink-0" aria-hidden />
                    Take Photo
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
