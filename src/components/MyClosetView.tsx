import { useState } from 'react'
import { premiumOutfits } from '../data/premiumOutfits'
import { ClosetSubheaderSwitch, type ClosetViewMode } from './ClosetSubheaderSwitch'
import { OutfitSetGrid } from './OutfitSetGrid'
import { UploadSection } from './UploadSection'

interface MyClosetViewProps {
  onUploadPreprocessComplete: () => void
}

export function MyClosetView({ onUploadPreprocessComplete }: MyClosetViewProps) {
  const [mode, setMode] = useState<ClosetViewMode>('browse')

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 text-center">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-[#2C4A3F] sm:text-5xl">
          My Closet
        </h1>
        <p className="mt-3 font-sans text-sm text-[#64748B]">
          Your curated outfit sets — offload pieces you no longer wear via
          thriftIt.
        </p>
        <div className="mt-6 flex justify-center">
          <ClosetSubheaderSwitch mode={mode} onChange={setMode} />
        </div>
      </header>

      {mode === 'browse' ? (
        <OutfitSetGrid
          currentView="closet"
          outfits={premiumOutfits}
          ariaLabel="Personal virtual wardrobe outfit sets"
        />
      ) : (
        <div role="tabpanel" aria-label="Upload your own items">
          <UploadSection
            variant="luxury"
            onPreprocessComplete={onUploadPreprocessComplete}
          />
        </div>
      )}
    </div>
  )
}
