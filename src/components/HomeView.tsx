import type { CollectionGender, ProductCategory } from '../types'
import { ProductGrid } from './ProductGrid'
import { TrendingStyleBanner } from './TrendingStyleBanner'
import { UploadSection } from './UploadSection'

interface HomeViewProps {
  collection: CollectionGender
  onCollectionChange: (gender: CollectionGender) => void
  category: ProductCategory
  onCategoryChange: (category: ProductCategory) => void
}

export function HomeView({
  collection,
  onCollectionChange,
  category,
  onCategoryChange,
}: HomeViewProps) {
  return (
    <>
      <UploadSection />
      <TrendingStyleBanner />
      <ProductGrid
        gender={collection}
        onGenderChange={onCollectionChange}
        category={category}
        onCategoryChange={onCategoryChange}
        showHeader
      />
    </>
  )
}
