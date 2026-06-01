import type { CollectionGender, Outfit, ProductCategory } from '../types'
import { ProductGrid } from './ProductGrid'
import { TrendingStyleBanner } from './TrendingStyleBanner'
import { UploadSection } from './UploadSection'

interface HomeViewProps {
  collection: CollectionGender
  onCollectionChange: (gender: CollectionGender) => void
  category: ProductCategory
  onCategoryChange: (category: ProductCategory) => void
  isProfileComplete?: boolean
  onAddToBag: (outfit: Outfit) => void
  onUploadPreprocessComplete: () => void
  variant?: 'default' | 'luxury'
  /** Hide upload block when shown inside AI Stylist lock card */
  showUpload?: boolean
}

export function HomeView({
  collection,
  onCollectionChange,
  category,
  onCategoryChange,
  isProfileComplete = false,
  onAddToBag,
  onUploadPreprocessComplete,
  variant = 'default',
  showUpload = true,
}: HomeViewProps) {
  return (
    <>
      {showUpload && (
        <UploadSection
          variant={variant === 'luxury' ? 'luxury' : 'default'}
          onPreprocessComplete={onUploadPreprocessComplete}
        />
      )}
      {variant === 'default' && <TrendingStyleBanner />}
      <ProductGrid
        gender={collection}
        onGenderChange={onCollectionChange}
        category={category}
        onCategoryChange={onCategoryChange}
        showHeader
        isProfileComplete={isProfileComplete}
        onAddToBag={onAddToBag}
      />
    </>
  )
}
