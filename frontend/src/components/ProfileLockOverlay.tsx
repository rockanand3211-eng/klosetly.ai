import { useEffect } from 'react'
import { Lock, X } from 'lucide-react'
import { UploadSection } from './UploadSection'

interface ProfileLockOverlayProps {
  onCompleteProfile: () => void
  onUploadPreprocessComplete: () => void
  onClose: () => void
}

/**
 * Viewport-fixed modal — mounted at App root so it escapes page flex/stack flow.
 */
export function ProfileLockOverlay({
  onCompleteProfile,
  onUploadPreprocessComplete,
  onClose,
}: ProfileLockOverlayProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-slate-950/45 backdrop-blur-[4px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-lock-heading"
      aria-describedby="profile-lock-description"
    >
      {/* Centered Absolute Overlay Sheet */}
      <div className="relative mx-4 flex max-w-lg w-full flex-col items-center justify-center bg-[#dce9dc]/75 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-2xl p-8 text-center font-sans">
        
        {/* Escape Button (Top-Right Cross) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 text-[#234233] hover:bg-[#234233]/10 p-2 rounded-full transition-all hover:scale-105"
          aria-label="Close styling overlay"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>

        {/* Lock Icon */}
        <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center text-[#234233]">
          <Lock className="h-7 w-7" strokeWidth={1.5} aria-hidden />
        </div>

        {/* Header Heading */}
        <h2
          id="profile-lock-heading"
          className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#234233] leading-tight select-none"
        >
          Unlock Your AI Stylist
        </h2>

        {/* Subtitle description verbatim in lowercase */}
        <p
          id="profile-lock-description"
          className="mx-auto mt-3 max-w-md text-xs sm:text-sm text-[#234233]/80 leading-relaxed font-medium"
        >
          curate your style with ai-powered recommendations. upload a photo and get personalized outfit suggestions.
        </p>

        {/* Embedded Upload micro-card */}
        <div className="mt-6 w-full">
          <UploadSection
            variant="luxury"
            layout="embedded"
            onPreprocessComplete={onUploadPreprocessComplete}
          />
        </div>

        {/* Base Structural CTA Button */}
        <button
          type="button"
          onClick={onCompleteProfile}
          className="mt-6 w-full rounded-full bg-[#234233] hover:bg-[#1a3327] text-white py-3 text-sm font-semibold shadow-md transition-all hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-[#234233]/40"
        >
          Complete Style Profile
        </button>
      </div>
    </div>
  )
}
