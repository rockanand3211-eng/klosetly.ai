import type { CatalogProduct } from '../types'
import { img } from './imageUrls'

/** Retail catalog — Shop route only (purchase flow) */
export const shopProducts: CatalogProduct[] = [
  {
    id: 'sp1',
    name: 'Beige Trench Coat',
    description:
      'Timeless double-breasted outerwear in premium cotton blend. Perfect for transitional seasons.',
    price: 199.99,
    category: 'Outerwear',
    imageUrl: img('photo-1539533013772-b71dcef62a4f'),
  },
  {
    id: 'sp2',
    name: 'Striped Button-Up',
    description:
      'Crisp blue and white vertical stripes on breathable woven cotton. Smart-casual essential.',
    price: 69.99,
    category: 'Tops',
    imageUrl: img('photo-1596755094514-f87e34086b2a'),
  },
  {
    id: 'sp3',
    name: 'Essential White Tee',
    description:
      'Organic cotton jersey with a relaxed fit. The foundation of any minimalist wardrobe.',
    price: 29.99,
    category: 'Tops',
    imageUrl: img('photo-1521572163474-6864f9cf17ab'),
  },
  {
    id: 'sp4',
    name: 'Classic Leather Jacket',
    description:
      'Full-grain leather with asymmetric zip closure. A statement piece with enduring edge.',
    price: 349.99,
    category: 'Outerwear',
    imageUrl: img('photo-1551028719-00167b16eac5'),
  },
  {
    id: 'sp5',
    name: 'Minimal White Sneakers',
    description:
      'Clean leather upper and tonal sole. Versatile luxury footwear for everyday wear.',
    price: 129.99,
    category: 'Shoes',
    imageUrl: img('photo-1549298916-b41d501d3772'),
  },
  {
    id: 'sp6',
    name: 'Elegant Black Dress',
    description:
      'Fluid midi silhouette in matte crepe. Evening-ready with understated sophistication.',
    price: 189.99,
    category: 'Dresses',
    imageUrl: img('photo-1595777457583-95e059d581b8'),
  },
]
