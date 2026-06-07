import type { ProductCategory } from '../types'

const filters: { id: ProductCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'tops', label: 'Tops' },
  { id: 'bottoms', label: 'Bottoms' },
  { id: 'accessories', label: 'Accessories' },
]

interface FilterChipsProps {
  active: ProductCategory
  onChange: (category: ProductCategory) => void
}

export function FilterChips({ active, onChange }: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out sm:px-5 ${
            active === id
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 hover:scale-[1.02]'
              : 'border border-slate-700 bg-slate-800 text-slate-400 hover:scale-[1.02] hover:border-slate-600 hover:text-slate-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
