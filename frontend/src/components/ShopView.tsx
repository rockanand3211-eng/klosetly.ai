import { useState, useEffect } from 'react'
import { ProductCard, type FashionProduct } from './ProductCard'

interface ShopViewProps {
  onAddToBag?: (product: FashionProduct) => void
}

export function ShopView({ onAddToBag }: ShopViewProps) {
  // 1. State Hooks initialized for dynamic server-side fetching
  const [products, setProducts] = useState<FashionProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // 2. Isolated fetch function wrapped in a tracking mechanism (active flag)
  useEffect(() => {
    let active = true;

    const fetchProductsFromServer = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchQuery.trim() !== '') {
          params.append('search', searchQuery.trim());
        }
        if (selectedCategory !== 'All') {
          params.append('category', selectedCategory);
        }

        // Call the Express API backend
        const response = await fetch(`http://localhost:5000/api/products?${params.toString()}`);
        const result = await response.json();

        if (active) {
          if (result.success && Array.isArray(result.data)) {
            // Map the MongoDB Mongoose schema fields to the client-side FashionProduct type
            const mappedProducts = result.data.map((p: any) => ({
              id: p._id || p.id,
              title: p.title,
              category: p.category,
              desc: p.desc,
              match: p.match,
              theme: p.theme,
              price: p.price,
              img: p.img,
            }));
            setProducts(mappedProducts);
          } else {
            setProducts([]);
          }
        }
      } catch (error) {
        console.error('[ShopView] Error fetching products from server:', error);
        if (active) {
          setProducts([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    // Debounce user input fetches by 300ms to reduce database load
    const debounceTimer = setTimeout(() => {
      fetchProductsFromServer();
    }, 300);

    // Cleanup lifecycle: cancels pending fetches and prevents state updates on unmounted components
    return () => {
      active = false;
      clearTimeout(debounceTimer);
    };
  }, [searchQuery, selectedCategory]);

  return (
    <div className="w-full px-6 py-4">
      {/* Shop All Header Element */}
      <div className="mb-4">
        <h1 className="text-3xl font-serif text-slate-800 font-bold">Shop All</h1>
      </div>

      {/* Category Filter Chips & High-Contrast Search Block container */}
      <div className="w-full max-w-4xl mx-auto mb-10 px-4">
        {/* A. Categorical Filter Chips placed ABOVE Search Input */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {["All", "Shirts", "Pants", "Tops", "Men's Wear", "Women's Wear"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 uppercase border ${
                selectedCategory === cat
                  ? "bg-black text-white border-black shadow-md scale-105"
                  : "bg-white/80 text-slate-600 border-slate-300 hover:border-black hover:bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* B. High-Contrast Accessible Search Input Bar Box */}
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search premium outfits (e.g., Sage, Luxury, Streetwear)..." 
            className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-black rounded-full text-slate-900 font-medium placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-black/10 transition-all shadow-md text-sm font-sans"
          />
        </div>
      </div>

      {/* Products Collection Grid Section */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div 
              key={num} 
              className="bg-white/40 backdrop-blur-md border border-white/50 rounded-[2rem] p-4 shadow-lg h-[480px] flex flex-col justify-between"
            >
              <div className="aspect-[4/5] w-full rounded-[1.5rem] bg-slate-200" />
              <div className="flex-1 pt-4 flex flex-col gap-3">
                <div className="w-1/4 h-3 bg-slate-200 rounded" />
                <div className="w-3/4 h-5 bg-slate-200 rounded" />
                <div className="w-full h-8 bg-slate-200 rounded" />
              </div>
              <div className="w-full h-10 bg-slate-200 rounded-xl mt-4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} item={product} onAddToBag={onAddToBag} />
          ))}
        </div>
      )}

      {!loading && products.length === 0 && (
        <p className="col-span-full rounded-2xl border border-white/50 bg-white/30 p-12 text-center text-sm text-slate-500 backdrop-blur-md font-sans mt-4">
          No premium outfits matched your search query or selected category. Try another filter.
        </p>
      )}
    </div>
  )
}
