import { Link2, Sparkles } from 'lucide-react'
import type { CapsuleCombination, Product } from '../types'

interface CapsuleCombinationCardProps {
  combination: CapsuleCombination
}

function CapsulePiecePreview({ product, role }: { product: Product; role: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900/80">
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-950">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <span className="absolute left-2 top-2 rounded-full bg-slate-950/80 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#00F0A0] backdrop-blur-sm">
          {role}
        </span>
      </div>
      <div className="space-y-0.5 p-3">
        <p className="truncate text-[9px] font-semibold tracking-widest text-slate-500">
          {product.brand}
        </p>
        <p className="line-clamp-2 text-xs font-medium leading-snug text-white">
          {product.name}
        </p>
        <p className="text-sm font-semibold text-white">${product.price}</p>
      </div>
    </div>
  )
}

export function CapsuleCombinationCard({ combination }: CapsuleCombinationCardProps) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/30 p-4 ring-1 ring-white/5">
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00F0A0]/8 via-transparent to-indigo-500/10"
        aria-hidden
      />

      <header className="relative mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Link2 className="h-4 w-4 text-[#00F0A0]" strokeWidth={1.75} />
          <h4 className="text-sm font-semibold text-white">{combination.label}</h4>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#00F0A0]/12 px-2.5 py-1 text-[10px] font-semibold text-[#00F0A0] ring-1 ring-[#00F0A0]/25">
          <Sparkles className="h-3 w-3" />
          {combination.cohesionMatch}% Cohesion Match
        </span>
      </header>

      <div className="relative flex items-stretch gap-3">
        <CapsulePiecePreview product={combination.top} role="Topwear" />

        <div
          className="relative flex w-5 shrink-0 items-center justify-center"
          aria-hidden
        >
          <div className="absolute inset-y-4 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#00F0A0]/70 to-transparent" />
          <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#00F0A0]/40 bg-slate-900 shadow-[0_0_16px_rgba(0,240,160,0.25)]">
            <span className="text-[10px] font-bold text-[#00F0A0]">+</span>
          </div>
        </div>

        <CapsulePiecePreview product={combination.bottom} role="Bottomwear" />
      </div>

      <p className="relative mt-4 text-center text-[10px] leading-relaxed text-slate-500">
        AI pairing matrix · silhouette + palette harmonized
      </p>
    </article>
  )
}
