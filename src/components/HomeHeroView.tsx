import { Leaf, Sparkles, TrendingUp } from 'lucide-react'

const HERO_BACKGROUND =
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&h=1080&q=80'

interface HomeHeroViewProps {
  onExploreCollection: () => void
  onViewTrends: () => void
  onThriftSelling: () => void
}

export function HomeHeroView({
  onExploreCollection,
  onViewTrends,
  onThriftSelling,
}: HomeHeroViewProps) {
  return (
    <section
      className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-4 py-16 sm:px-6"
      aria-label="Welcome"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${HERO_BACKGROUND})`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[#F5F7F6]/75 backdrop-blur-md"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-4 py-2 font-sans text-sm font-medium text-[#1E293B] shadow-sm backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-[#2C4A3F]" strokeWidth={2} />
          Welcome to Shopping Heaven
        </span>

        <h1 className="mt-8 font-serif text-4xl font-semibold leading-tight tracking-tight text-[#2C4A3F] sm:text-5xl md:text-6xl">
          Curate Your Perfect Wardrobe
        </h1>

        <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-[#64748B] sm:text-lg">
          Discover timeless pieces and build your personalized closet with our
          sustainable collection.
        </p>

        <div className="mt-10 flex w-full max-w-2xl flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="button"
            onClick={onExploreCollection}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2C4A3F] px-6 py-3.5 font-sans text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#243d34]"
          >
            <Sparkles className="h-4 w-4" strokeWidth={2} />
            Explore Collection
          </button>

          <button
            type="button"
            onClick={onViewTrends}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/70 bg-white/60 px-6 py-3.5 font-sans text-sm font-semibold text-[#1E293B] shadow-sm backdrop-blur-md transition-colors hover:bg-white/80"
          >
            <TrendingUp className="h-4 w-4 text-[#2C4A3F]" strokeWidth={2} />
            View Trends
          </button>

          <button
            type="button"
            onClick={onThriftSelling}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/70 bg-white/60 px-6 py-3.5 font-sans text-sm font-semibold text-[#1E293B] shadow-sm backdrop-blur-md transition-colors hover:bg-white/80"
          >
            <Leaf className="h-4 w-4 text-[#2C4A3F]" strokeWidth={2} />
            Thrift Selling (Old Clothes)
          </button>
        </div>
      </div>
    </section>
  )
}
