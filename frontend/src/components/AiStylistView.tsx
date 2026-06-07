import type { CollectionGender, Outfit, ProductCategory } from '../types'
import { HomeView } from './HomeView'

interface AiStylistViewProps {
  collection: CollectionGender
  onCollectionChange: (gender: CollectionGender) => void
  category: ProductCategory
  onCategoryChange: (category: ProductCategory) => void
  isProfileComplete: boolean
  onAddToBag: (outfit: Outfit) => void
  onUploadPreprocessComplete: () => void
}

export function AiStylistView({
  isProfileComplete,
  onUploadPreprocessComplete,
  ...homeProps
}: AiStylistViewProps) {
  const isLocked = !isProfileComplete

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 text-center">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-[#2C4A3F] sm:text-5xl">
          AI Stylist
        </h1>
        <p className="mt-3 font-sans text-sm text-[#64748B] sm:text-base">
          Personalized recommendations powered by your style profile
        </p>
      </header>

      <div
        className={
          isLocked ? 'pointer-events-none select-none opacity-40' : undefined
        }
        aria-hidden={isLocked}
      >
        <HomeView
          {...homeProps}
          variant="luxury"
          isProfileComplete={isProfileComplete}
          showUpload={false}
          onUploadPreprocessComplete={onUploadPreprocessComplete}
        />
      </div>
    </div>
  )
}
