import { outfitsDataset } from '@data/outfitsData'
import type { CapsuleCombination, Outfit, Product } from '../types'

const COMBINATION_LABELS = ['Alpha', 'Beta', 'Gamma', 'Delta'] as const

function outfitToProduct(outfit: Outfit): Product {
  const category =
    outfit.category === 'topwear'
      ? 'tops'
      : outfit.category === 'bottomwear'
        ? 'bottoms'
        : 'accessories'

  return {
    id: outfit.id,
    gender: outfit.gender,
    brand: outfit.brand,
    name: outfit.name,
    price: outfit.price,
    rating: outfit.rating,
    reviewCount: outfit.reviewsCount,
    matchPercent: outfit.matchPercentage,
    category,
    imageUrl: outfit.imageUrl,
    tags: [`${outfit.matchPercentage}% Fit Match`],
  }
}

function cohesionScore(top: Product, bottom: Product): number {
  const average = (top.matchPercent + bottom.matchPercent) / 2
  const brandSynergy =
    top.brand.slice(0, 2).toLowerCase() === bottom.brand.slice(0, 2).toLowerCase()
      ? 2
      : 0
  const raw = Math.round(average + brandSynergy)
  return Math.min(98, Math.max(82, raw))
}

export function buildCapsuleCombinations(
  tops: Product[],
  bottoms: Product[],
  maxCombinations = 4,
): CapsuleCombination[] {
  if (tops.length === 0 || bottoms.length === 0) return []

  const ranked = tops.flatMap((top) =>
    bottoms.map((bottom) => ({
      top,
      bottom,
      cohesionMatch: cohesionScore(top, bottom),
    })),
  )

  ranked.sort((a, b) => b.cohesionMatch - a.cohesionMatch)

  const usedTops = new Set<string>()
  const usedBottoms = new Set<string>()
  const selected: CapsuleCombination[] = []

  for (const pair of ranked) {
    if (selected.length >= maxCombinations) break
    if (usedTops.has(pair.top.id) || usedBottoms.has(pair.bottom.id)) continue

    usedTops.add(pair.top.id)
    usedBottoms.add(pair.bottom.id)

    const label = COMBINATION_LABELS[selected.length] ?? `Set ${selected.length + 1}`

    selected.push({
      id: `capsule-${pair.top.id}-${pair.bottom.id}`,
      label: `Combination ${label}`,
      cohesionMatch: pair.cohesionMatch,
      top: pair.top,
      bottom: pair.bottom,
    })
  }

  return selected
}

export function getCapsuleFallbackProducts(): { tops: Product[]; bottoms: Product[] } {
  const tops = outfitsDataset
    .filter((item) => item.category === 'topwear')
    .slice(0, 6)
    .map(outfitToProduct)

  const bottoms = outfitsDataset
    .filter((item) => item.category === 'bottomwear')
    .slice(0, 6)
    .map(outfitToProduct)

  return { tops, bottoms }
}
