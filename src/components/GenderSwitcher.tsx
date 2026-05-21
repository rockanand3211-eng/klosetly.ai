import type { CollectionGender } from '../types'

const options: { id: CollectionGender; label: string }[] = [
  { id: 'men', label: "Men's Collection" },
  { id: 'women', label: "Women's Collection" },
]

interface GenderSwitcherProps {
  active: CollectionGender
  onChange: (gender: CollectionGender) => void
}

export function GenderSwitcher({ active, onChange }: GenderSwitcherProps) {
  return (
    <div
      role="group"
      aria-label="Collection gender"
      className="inline-flex w-full rounded-xl border border-slate-700/80 bg-slate-800/60 p-1 backdrop-blur-sm sm:w-auto"
    >
      {options.map(({ id, label }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={isActive}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-300 ease-in-out sm:flex-none sm:px-6 ${
              isActive
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 ring-1 ring-emerald-400/50'
                : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
