export type NavItem = 'home' | 'wardrobe' | 'style-analysis'

export type ProductCategory = 'all' | 'tops' | 'bottoms' | 'accessories'

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
