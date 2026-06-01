import type { CatalogProduct } from '../types'
import { img } from './imageUrls'

/** Personal wardrobe — My Closet route only (thrift offload flow) */
export const closetProducts: CatalogProduct[] = [
  {
    id: 'cp1',
    name: 'Beige Trench Coat',
    description:
      'High-quality brown/white woven fabric, consectetur adipiscing elit. Timeless outerwear for transitional seasons.',
    price: 17,
    imageUrl: img('photo-1539533013772-b71dcef62a4f'),
  },
  {
    id: 'cp2',
    name: 'Minimalist White Sneakers',
    description:
      'Premium leather upper with clean sole profile. Versatile everyday footwear with understated luxury.',
    price: 18,
    imageUrl: img('photo-1549298916-b41d501d3772'),
  },
  {
    id: 'cp3',
    name: 'Striped Button-Up Shirt',
    description:
      'High-quality blue/white woven fabric, consectetur adipiscing elit. Crisp vertical stripes for smart-casual looks.',
    price: 18,
    imageUrl: img('photo-1596755094514-f87e34086b2a'),
  },
  {
    id: 'cp4',
    name: 'Essential White Tee',
    description:
      'Soft organic cotton jersey with a relaxed fit. A capsule wardrobe foundation piece in pure white.',
    price: 12,
    imageUrl: img('photo-1521572163474-6864f9cf17ab'),
  },
  {
    id: 'cp5',
    name: 'Tan Striped Button-Up',
    description:
      'High-quality tan/white woven fabric, consectetur adipiscing elit. Earth-toned stripes for warm-weather layering.',
    price: 25,
    imageUrl: img('photo-1598032558065-45ae8a075a4f'),
  },
  {
    id: 'cp6',
    name: 'Beige Cashmere Sweater',
    description:
      'Fine-gauge knit in neutral beige. Lightweight warmth with a refined drape for elevated everyday wear.',
    price: 22,
    imageUrl: img('photo-1576566580240-68a0f6ca653e'),
  },
]
