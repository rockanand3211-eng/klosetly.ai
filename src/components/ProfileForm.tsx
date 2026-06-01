import { X } from 'lucide-react'
import { useEffect, useId, useState, type FormEvent } from 'react'
import type { BodyType, StylePreference, StyleProfile } from '../types'

interface ProfileFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (profile: StyleProfile) => void
}

const bodyTypeOptions: { value: BodyType; label: string }[] = [
  { value: 'athletic', label: 'Athletic' },
  { value: 'rectangle', label: 'Rectangle' },
  { value: 'hourglass', label: 'Hourglass' },
  { value: 'pear', label: 'Pear' },
  { value: 'apple', label: 'Apple' },
  { value: 'inverted-triangle', label: 'Inverted Triangle' },
]

const stylePreferenceOptions: { value: StylePreference; label: string }[] = [
  { value: 'streetwear', label: 'Streetwear' },
  { value: 'formal', label: 'Formal' },
  { value: 'casual', label: 'Casual' },
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'bohemian', label: 'Bohemian' },
  { value: 'preppy', label: 'Preppy' },
  { value: 'avant-garde', label: 'Avant-Garde' },
]

const fieldClassName =
  'w-full rounded-xl border border-slate-700/80 bg-slate-800/60 px-4 py-3 text-sm text-white transition-all duration-300 ease-in-out placeholder:text-slate-500 focus:border-[#00F0A0]/50 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00F0A0]/20'

const labelClassName =
  'text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500'

export function ProfileForm({ isOpen, onClose, onSubmit }: ProfileFormProps) {
  const titleId = useId()
  const [heightCm, setHeightCm] = useState('')
  const [bodyType, setBodyType] = useState<BodyType>('rectangle')
  const [stylePreference, setStylePreference] = useState<StylePreference>('casual')

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const parsedHeight = Number(heightCm)

    if (!parsedHeight || parsedHeight < 100 || parsedHeight > 250) return

    onSubmit({
      heightCm: parsedHeight,
      bodyType,
      stylePreference,
    })
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        aria-label="Close profile form"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900 shadow-2xl shadow-black/50 ring-1 ring-white/5">
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00F0A0]/60 to-transparent"
          aria-hidden
        />

        <div className="border-b border-slate-800/80 px-6 py-5 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#00F0A0]">
                Style Profile
              </p>
              <h2
                id={titleId}
                className="mt-1 text-xl font-light tracking-tight text-white sm:text-2xl"
              >
                Curate Your Fit
              </h2>
              <p className="mt-1.5 text-sm text-slate-400">
                A few details unlock personalized styling across the app.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-700/80 text-slate-400 transition-all duration-300 ease-in-out hover:border-slate-600 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 px-6 py-6 sm:px-8">
          <div>
            <label htmlFor="profile-height" className={labelClassName}>
              Height (cm)
            </label>
            <input
              id="profile-height"
              type="number"
              inputMode="numeric"
              min={100}
              max={250}
              required
              placeholder="e.g. 175"
              value={heightCm}
              onChange={(event) => setHeightCm(event.target.value)}
              className={`${fieldClassName} mt-2`}
            />
          </div>

          <div>
            <label htmlFor="profile-body-type" className={labelClassName}>
              Body Type
            </label>
            <select
              id="profile-body-type"
              value={bodyType}
              onChange={(event) => setBodyType(event.target.value as BodyType)}
              className={`${fieldClassName} mt-2 cursor-pointer appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
              }}
            >
              {bodyTypeOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-slate-900">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="profile-style" className={labelClassName}>
              Style Preference
            </label>
            <select
              id="profile-style"
              value={stylePreference}
              onChange={(event) =>
                setStylePreference(event.target.value as StylePreference)
              }
              className={`${fieldClassName} mt-2 cursor-pointer appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
              }}
            >
              {stylePreferenceOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-slate-900">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-800/80 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-700/80 px-5 py-3 text-sm font-medium text-slate-300 transition-all duration-300 ease-in-out hover:border-slate-600 hover:bg-slate-800 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#00F0A0] px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-[#00F0A0]/20 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-[#33f3b3] hover:shadow-[#00F0A0]/30 focus:outline-none focus:ring-2 focus:ring-[#00F0A0]/50 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Save Style Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
