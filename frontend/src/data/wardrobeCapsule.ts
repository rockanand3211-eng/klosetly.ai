import type { Product } from '../types'
import { wardrobeSections } from './wardrobeProducts'
import {
  buildCapsuleCombinations,
  getCapsuleFallbackProducts,
} from '../utils/capsuleCombinations'
import type { CapsuleCombination } from '../types'

export function getWardrobeTopsAndBottoms(): {
  tops: Product[]
  bottoms: Product[]
} {
  const tops = wardrobeSections
    .filter((section) => section.id === 'tops')
    .flatMap((section) => section.products)

  const bottoms = wardrobeSections
    .filter((section) => section.id === 'bottoms')
    .flatMap((section) => section.products)

  return { tops, bottoms }
}

export function getCapsuleWardrobeCombinations(): CapsuleCombination[] {
  const { tops, bottoms } = getWardrobeTopsAndBottoms()

  if (tops.length > 0 && bottoms.length > 0) {
    return buildCapsuleCombinations(tops, bottoms)
  }

  const fallback = getCapsuleFallbackProducts()
  return buildCapsuleCombinations(fallback.tops, fallback.bottoms)
}
