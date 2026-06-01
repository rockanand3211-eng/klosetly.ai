import type { CatalogProduct, ProductCardAction } from '../types'
import { LuxuryProductCard } from './LuxuryProductCard'

interface ProductCardGridProps {
  products: CatalogProduct[]
  cardAction: ProductCardAction
  ariaLabel: string
  onProductAction?: (product: CatalogProduct) => void
}

export function ProductCardGrid({
  products,
  cardAction,
  ariaLabel,
  onProductAction,
}: ProductCardGridProps) {
  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      role="region"
      aria-label={ariaLabel}
    >
      {products.map((product, index) => (
        <LuxuryProductCard
          key={product.id}
          product={product}
          cardAction={cardAction}
          staggerIndex={index % 6}
          onAction={onProductAction}
        />
      ))}
    </div>
  )
}
