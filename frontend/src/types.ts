export type NavItem = 'home' | 'wardrobe' | 'style-analysis'

/** Top-level app views — explicit route switches, no shared card action bleed */
export type AppView =
  | 'home'
  | 'shop'
  | 'my-closet'
  | 'notification'
  | 'wishlist'
  | 'ai-stylist'
  | 'wallet'
  | 'thriftbag'
  | 'rewards'

/** @deprecated Use AppView — kept for gradual migration */
export type LuxuryNavRoute = AppView

/** Product card CTA — shop retail vs personal closet offload */
export type ProductCardAction = 'buy-now' | 'thrift-it'

/** Grid context for outfit-set cards (maps from AppView shop / my-closet) */
export type GridViewContext = 'shop' | 'closet'

export interface PremiumOutfit {
  id: number
  title: string
  category: string
  description: string
  price: string
  tags: string[]
  imagePlaceholder: string
}

/** @deprecated Use PremiumOutfit */
export type MockOutfit = PremiumOutfit

export function toGridView(view: AppView): GridViewContext | null {
  if (view === 'shop') return 'shop'
  if (view === 'my-closet') return 'closet'
  return null
}

export type BodyType =
  | 'athletic'
  | 'rectangle'
  | 'hourglass'
  | 'pear'
  | 'apple'
  | 'inverted-triangle'

export type StylePreference =
  | 'streetwear'
  | 'formal'
  | 'casual'
  | 'minimalist'
  | 'bohemian'
  | 'preppy'
  | 'avant-garde'

export interface StyleProfile {
  heightCm: number
  bodyType: BodyType
  stylePreference: StylePreference
}

export type ProductCategory = 'all' | 'tops' | 'bottoms' | 'accessories'

export type Season = 'summer' | 'winter' | 'rainy'

export type OutfitOccasion = 'casual' | 'formal' | 'party' | 'workout'

export interface SeasonalOutfit {
  id: string
  title: string
  imageUrl: string
  season: Season
  note: string
}

export type CollectionGender = 'men' | 'women'

export interface Product {
  id: string
  gender: CollectionGender
  brand: string
  name: string
  price: number
  rating: number
  reviewCount: number
  matchPercent: number
  category: Exclude<ProductCategory, 'all'>
  imageUrl: string
  tags: string[]
}

export type OutfitGarmentCategory =
  | 'topwear'
  | 'bottomwear'
  | 'outerwear'
  | 'accessories'

export type WardrobeViewTab = 'inventory' | 'capsule'

export interface CapsuleCombination {
  id: string
  label: string
  cohesionMatch: number
  top: Product
  bottom: Product
}

export interface Outfit {
  id: string
  brand: string
  name: string
  price: number
  rating: number
  reviewsCount: number
  matchPercentage: number
  season: Season
  occasion: OutfitOccasion
  gender: CollectionGender
  category: OutfitGarmentCategory
  imageUrl: string
}

export interface CatalogProduct {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category?: string
}
