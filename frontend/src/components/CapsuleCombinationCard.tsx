import { Link2, Sparkles } from 'lucide-react'
import type { CapsuleCombination, Product } from '../types'

interface CapsuleCombinationCardProps {
  combination: CapsuleCombination
}

function CapsulePiecePreview({ product, role }: { product: Product; role: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-white/50 bg-white/40 backdrop-blur-md">
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <span className="absolute left-2 top-2 rounded-full bg-emerald-50 text-emerald-850 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider shadow-sm border border-emerald-100">
          {role}
        </span>
      </div>
      <div className="space-y-0.5 p-3 font-sans">
        <p className="truncate text-[9px] font-bold tracking-widest text-slate-400">
          {product.brand}
        </p>
        <p className="line-clamp-2 text-xs font-semibold leading-snug text-slate-800">
          {product.name}
        </p>
        <p className="text-sm font-bold text-slate-800">${product.price}</p>
      </div>
    </div>
  )
}

export function CapsuleCombinationCard({ combination }: CapsuleCombinationCardProps) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/30 p-4 shadow-sm backdrop-blur-md">
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[#234233]/5 via-transparent to-indigo-500/5"
        aria-hidden
      />

      <header className="relative mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Link2 className="h-4 w-4 text-[#234233]" strokeWidth={1.75} />
          <h4 className="text-sm font-bold text-slate-800 font-serif">{combination.label}</h4>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-850 border border-emerald-100/60 shadow-sm">
          <Sparkles className="h-3 w-3 text-emerald-600" />
          {combination.cohesionMatch}% Cohesion Match
        </span>
      </header>

      <div className="relative flex items-stretch gap-3">
        <CapsulePiecePreview product={combination.top} role="Topwear" />

        <div
          className="relative flex w-5 shrink-0 items-center justify-center"
          aria-hidden
        >
          <div className="absolute inset-y-4 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#234233]/40 to-transparent" />
          <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white bg-[#234233] shadow-sm">
            <span className="text-xs font-bold text-white">+</span>
          </div>
        </div>

        <CapsulePiecePreview product={combination.bottom} role="Bottomwear" />
      </div>

      <p className="relative mt-4 text-center text-[10px] leading-relaxed text-slate-500 font-medium font-sans">
        AI pairing matrix · silhouette + palette harmonized
      </p>
    </article>
  )
}
