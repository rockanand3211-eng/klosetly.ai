import { useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const showcaseImages = [
  {
    src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=280&h=360&q=80',
    alt: 'Summer street style look',
    className: 'left-0 top-0 z-10 h-36 w-28 sm:h-44 sm:w-32',
  },
  {
    src: 'https://images.unsplash.com/photo-1483985986671-121758ecb500?auto=format&fit=crop&w=280&h=360&q=80',
    alt: 'High-contrast editorial fashion',
    className: 'left-16 top-6 z-20 h-40 w-32 sm:left-20 sm:top-8 sm:h-48 sm:w-36',
  },
  {
    src: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=280&h=360&q=80',
    alt: 'Statement accessories detail',
    className: 'left-32 top-2 z-30 h-36 w-28 sm:left-40 sm:top-4 sm:h-44 sm:w-32',
  },
]

function ShowcaseImage({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className: string
}) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <div
      className={`absolute overflow-hidden rounded-2xl border-2 border-white/10 shadow-2xl shadow-indigo-950/50 ring-1 ring-slate-600/50 transition-all duration-500 ease-out hover:z-40 hover:scale-105 ${className}`}
    >
      {!loaded && !failed && (
        <div className="skeleton-shimmer absolute inset-0 bg-slate-700" aria-hidden />
      )}
      {failed ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-700 to-indigo-900">
          <Sparkles className="h-6 w-6 text-emerald-400/60" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  )
}

export function TrendingStyleBanner() {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section
      ref={ref}
      aria-label="Trending style showcase"
      className={`relative my-8 flex w-full flex-col items-center justify-between overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-r from-slate-800 to-indigo-950 p-6 transition-all duration-700 ease-out md:flex-row ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 left-1/3 h-48 w-48 rounded-full bg-indigo-500/15 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 max-w-xl flex-1 pr-0 md:pr-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-300 ring-1 ring-emerald-500/25">
          <Sparkles className="h-3 w-3" />
          Trending Now
        </span>
        <h2 className="mt-4 text-2xl font-semibold leading-tight text-white sm:text-3xl">
          Summer Trends &apos;26: High-Contrast Aesthetics
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
          Our AI analyzes shoulder lines, drape, and color blocking to match
          silhouettes that complement your frame—surfacing bold summer edits
          before they hit mainstream feeds.
        </p>
        <button
          type="button"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-white/15"
        >
          Explore Trend Report
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="relative z-10 mt-8 h-48 w-full shrink-0 sm:h-52 md:mt-0 md:h-56 md:w-72 lg:w-80">
        <div className="relative mx-auto h-full w-full max-w-[18rem] md:mx-0 md:max-w-none">
          {showcaseImages.map((image) => (
            <ShowcaseImage key={image.src} {...image} />
          ))}
        </div>
      </div>
    </section>
  )
}
