import { img } from './imageUrls'

export interface ReturnRiskOutfit {
  id: string
  brand: string
  name: string
  price: number
  imageUrl: string
  returnRiskPercent: number
  sizeDiscrepancy: string
  historicalNote: string
}

export const returnRiskOutfits: ReturnRiskOutfit[] = [
  {
    id: 'rr1',
    brand: 'ZARA MAN',
    name: 'Oversized Boxy Blazer',
    price: 99,
    imageUrl: img('photo-1594938298603-c8148c4dae35'),
    returnRiskPercent: 78,
    sizeDiscrepancy: 'Shoulder width +2.1" vs. your profile',
    historicalNote: '68% of similar returns cited sleeve length mismatch.',
  },
  {
    id: 'rr2',
    brand: 'H&M',
    name: 'Slim Taper Chinos',
    price: 44,
    imageUrl: img('photo-1624378664908-ac9f4db2b7d0'),
    returnRiskPercent: 71,
    sizeDiscrepancy: 'Rise sits 1.5" lower than preferred',
    historicalNote: 'Waist-to-inseam ratio flagged across 412 campus orders.',
  },
  {
    id: 'rr3',
    brand: 'ASOS DESIGN',
    name: 'Structured Puffer Jacket',
    price: 120,
    imageUrl: img('photo-1544966503-7cc5bb889134'),
    returnRiskPercent: 82,
    sizeDiscrepancy: 'Chest fit runs narrow for broad-shoulder build',
    historicalNote: 'Highest return category in your winter wardrobe history.',
  },
  {
    id: 'rr4',
    brand: 'UNIQLO',
    name: 'Wide-Leg Pleated Trousers',
    price: 59,
    imageUrl: img('photo-1473966968600-fa801b921a98'),
    returnRiskPercent: 65,
    sizeDiscrepancy: 'Inseam 0.8" longer than optimal hem line',
    historicalNote: 'Hem alteration would reduce projected return by 34%.',
  },
]

export interface AnalysisMetric {
  id: string
  label: string
  value: number
  description: string
  color: string
  invertRisk?: boolean
}

export const analysisMetrics: AnalysisMetric[] = [
  {
    id: 'color',
    label: 'Color Palette Sync',
    value: 88,
    description: 'Neutrals + emerald accents align with your saved looks.',
    color: 'from-emerald-500 to-teal-400',
  },
  {
    id: 'silhouette',
    label: 'Silhouette Fit Accuracy',
    value: 76,
    description: 'Broad-shoulder mapping improved after last upload.',
    color: 'from-indigo-500 to-violet-400',
  },
  {
    id: 'return',
    label: 'Return Risk Factor Probability',
    value: 23,
    description: 'Down 12% since enabling AI size guardrails.',
    color: 'from-amber-500 to-orange-400',
    invertRisk: true,
  },
]
