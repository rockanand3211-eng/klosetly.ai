import { Trash2, ArrowRight, ChevronLeft } from 'lucide-react'

interface ThriftItem {
  id: string
  name: string
  category: string
  price: string
  imageUrl: string
  condition: string
}

const INITIAL_ITEMS: ThriftItem[] = [
  {
    id: 'cp1',
    name: 'Beige Trench Coat',
    category: 'Outerwear',
    price: 'RS 17.00',
    imageUrl: 'https://images.unsplash.com/photo-1539533013772-b71dcef62a4f?q=80&w=400',
    condition: 'Excellent',
  },
  {
    id: 'cp2',
    name: 'Minimalist White Sneakers',
    category: 'Shoes',
    price: 'RS 18.00',
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=400',
    condition: 'Good',
  },
  {
    id: 'cp3',
    name: 'Striped Button-Up Shirt',
    category: 'Tops',
    price: 'RS 18.00',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34086b2a?q=80&w=400',
    condition: 'Excellent',
  },
]

interface ThriftBagViewProps {
  onBackToCloset: () => void
}

export function ThriftBagView({ onBackToCloset }: ThriftBagViewProps) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 font-sans">
      <button
        type="button"
        onClick={onBackToCloset}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#2C4A3F] hover:opacity-80 transition-opacity"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Back to Closet</span>
      </button>

      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold text-[#2C4A3F] sm:text-4xl">
          Thrift Bag
        </h1>
        <p className="mt-1 text-sm text-[#64748B]">
          You have <span className="font-semibold text-[#2C4A3F]">3 Items</span> ready to list or transfer for K$ credits.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          {INITIAL_ITEMS.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm backdrop-blur-md transition-all hover:shadow-md"
            >
              <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between min-w-0">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-sm font-bold text-[#1E293B] truncate">
                      {item.name}
                    </h3>
                    <span className="text-sm font-bold text-[#2C4A3F] shrink-0">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] mt-0.5">{item.category}</p>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    Condition: {item.condition}
                  </span>
                  <button
                    type="button"
                    className="text-slate-400 hover:text-rose-600 transition-colors"
                    aria-label={`Remove ${item.name} from thrift bag`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-md h-fit">
          <h3 className="font-serif text-lg font-semibold text-[#2C4A3F] mb-4">
            Thrift Summary
          </h3>

          <div className="space-y-3 font-sans text-xs">
            <div className="flex justify-between text-[#64748B]">
              <span>Items in Bag</span>
              <span>3</span>
            </div>
            <div className="flex justify-between text-[#64748B]">
              <span>Estimated Value</span>
              <span>RS 53.00</span>
            </div>
            <div className="flex justify-between text-[#64748B]">
              <span>Circular Bonus (10%)</span>
              <span>+RS 5.30</span>
            </div>
            <div className="border-t border-slate-100 pt-3 flex justify-between font-semibold text-sm text-[#1E293B]">
              <span>Total Payout</span>
              <span>RS 58.30</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full mt-6 flex items-center justify-center gap-2 rounded-full bg-[#2C4A3F] py-3 text-xs font-semibold text-white shadow-sm transition-all hover:scale-[1.02] hover:bg-[#243d34]"
          >
            <span>Complete Offload</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
          
          <p className="text-[10px] text-center text-slate-400 mt-3">
            Instant credit to your K$ Wallet upon submission confirmation.
          </p>
        </div>
      </div>
    </div>
  )
}
