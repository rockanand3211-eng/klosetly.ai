import type { Season, SeasonalOutfit } from '../types'
import { img } from './imageUrls'

export const seasonalOutfits: SeasonalOutfit[] = [
  {
    id: 'sum-1',
    title: 'Linen Resort Set',
    season: 'summer',
    imageUrl: img('photo-1509631179647-0177331693ae'),
    note: 'Breathable layers · UV-aware palette',
  },
  {
    id: 'sum-2',
    title: 'Coastal Minimal Blazer',
    season: 'summer',
    imageUrl: img('photo-1594932503295-4b402235970b'),
    note: 'Unstructured shoulders · ivory neutrals',
  },
  {
    id: 'sum-3',
    title: 'Desert Evening Slip Dress',
    season: 'summer',
    imageUrl: img('photo-1515372039744-b8f02a3ae446'),
    note: 'Silk-touch drape · sunset metallics',
  },
  {
    id: 'win-1',
    title: 'Cashmere Overcoat Edit',
    season: 'winter',
    imageUrl: img('photo-1539533018442-66fffb6c38e4'),
    note: 'Double-faced wool · charcoal base',
  },
  {
    id: 'win-2',
    title: 'Alpine Knit Layering',
    season: 'winter',
    imageUrl: img('photo-1576566588028-4147f384f1fd'),
    note: 'Merino stack · frost-proof tones',
  },
  {
    id: 'win-3',
    title: 'Midnight Velvet Gala',
    season: 'winter',
    imageUrl: img('photo-1566174053879-31528523f8ae'),
    note: 'Plush texture · jewel accent',
  },
  {
    id: 'rain-1',
    title: 'Technical Trench Capsule',
    season: 'rainy',
    imageUrl: img('photo-1551028719-00167b16eac5'),
    note: 'Water-repellent shell · taped seams',
  },
  {
    id: 'rain-2',
    title: 'Urban Gore-Tex Commute',
    season: 'rainy',
    imageUrl: img('photo-1542272604-787c3835535d'),
    note: 'Quiet luxury utility · slate palette',
  },
  {
    id: 'rain-3',
    title: 'Mist-Toned Anorak Drop',
    season: 'rainy',
    imageUrl: img('photo-1490481651871-ab68de25d43d'),
    note: 'Packable hood · soft matte finish',
  },
]

export function filterSeasonalOutfits(season: Season): SeasonalOutfit[] {
  return seasonalOutfits.filter((outfit) => outfit.season === season)
}
