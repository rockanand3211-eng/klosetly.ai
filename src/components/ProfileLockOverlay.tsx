import { Lock } from 'lucide-react'
import { UploadSection } from './UploadSection'

interface ProfileLockOverlayProps {
  onCompleteProfile: () => void
  onUploadPreprocessComplete: () => void
}

/**
 * In-flow lock panel for AI Stylist — must live inside a `relative` parent,
 * not `fixed`, so z-index stacks correctly above dimmed background content.
 */
export function ProfileLockOverlay({
  onCompleteProfile,
  onUploadPreprocessComplete,
}: ProfileLockOverlayProps) {
  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-lock-heading"
      aria-describedby="profile-lock-description"
    >
      <div className="relative z-30 mx-4 flex w-full max-w-2xl flex-col items-center justify-center rounded-3xl bg-white p-8 text-center shadow-2xl">
        <div className="mb-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#2C4A3F]/10 ring-1 ring-[#2C4A3F]/20">
          <Lock className="h-8 w-8 text-[#2C4A3F]" strokeWidth={1.5} aria-hidden />
        </div>

        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-[#64748B]">
          Personalization Required
        </p>

        <h2
          id="profile-lock-heading"
          className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#2C4A3F] sm:text-4xl"
        >
          Unlock Your AI Stylist
        </h2>

        <p
          id="profile-lock-description"
          className="mx-auto mt-3 max-w-md font-sans text-sm leading-relaxed text-[#64748B]"
        >
          Complete your style profile so our AI can tailor fit recommendations,
          outfit pairings, and trend insights to your unique silhouette and taste.
        </p>

        <div className="mt-8 w-full max-w-lg">
          <UploadSection
            variant="luxury"
            layout="embedded"
            onPreprocessComplete={onUploadPreprocessComplete}
          />
        </div>

        <button
          type="button"
          onClick={onCompleteProfile}
          className="mt-6 w-full max-w-xs rounded-full bg-[#2C4A3F] px-6 py-3 font-sans text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#243d34] focus:outline-none focus:ring-2 focus:ring-[#2C4A3F]/40 focus:ring-offset-2 sm:w-auto sm:min-w-[240px]"
        >
          Complete Style Profile
        </button>
      </div>
    </div>
  )
}
