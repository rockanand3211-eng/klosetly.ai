import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/Product.js';

// Load environment variables
dotenv.config();

const products = [
  {
    title: 'The Minimalist Sage Over-Shirt',
    category: 'Casual / Summer',
    desc: 'Premium Sage Green Linen overshirt layered over an Essential White Crewneck Tee.',
    match: '98% Match',
    theme: 'Earthy',
    price: '₹2,499',
    img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
  },
  {
    title: 'Tokyo Street Edge Suit',
    category: 'Streetwear / Blazer',
    desc: 'Textured Navy Slim-Fit Blazer paired with washed tailored trousers and tan leather brogues.',
    match: '94% Match',
    theme: 'Urban Contemporary',
    price: '₹12,999',
    img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22',
  },
  {
    title: 'Luxury Cuban Classic',
    category: 'Evening Wear',
    desc: 'Obsidian Black Luxury Silk-Blend Cuban Collar Short-Sleeve Shirt, paired with tailored trousers.',
    match: '96% Match',
    theme: 'Quiet Luxury',
    price: '₹5,499',
    img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf',
  },
  {
    title: 'Oversized Drop-Shoulder Hoodie',
    category: 'Streetwear',
    desc: 'Heavyweight loopback cotton drop-shoulder hoodie in soft sand beige texture.',
    match: '91% Match',
    theme: 'Minimalist Lounge',
    price: '₹3,999',
    img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7',
  },
  {
    title: 'Classic Tailored Camel Coat',
    category: 'Outerwear / Winter',
    desc: 'High-quality beige woven fabric, water-resistant finish, classic tailored long coat silhouette.',
    match: '97% Match',
    theme: 'Timeless Capsule',
    price: '₹14,999',
    img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
  },
  {
    title: 'Earthy Corduroy Utility Jacket',
    category: 'Outerwear / Autumn',
    desc: 'Vintage moss green fine-wale corduroy jacket featuring quad utility cargo pockets.',
    match: '93% Match',
    theme: 'Workwear Style',
    price: '₹4,299',
    img: 'https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4',
  },
  {
    title: 'Monochrome Cropped Trackset',
    category: 'Athleisure',
    desc: 'Premium pastel amber cropped hoodie layered dynamically with high-waisted performance joggers.',
    match: '95% Match',
    theme: 'Street Athleisure',
    price: '₹3,499',
    img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
  },
  {
    title: 'Premium Tailored Slate Suit',
    category: 'Formalwear',
    desc: 'Dual-button sharp charcoal grey structured formal blazer matched with tapered slim dress pants.',
    match: '99% Match',
    theme: 'Corporate Classic',
    price: '₹18,999',
    img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35',
  },
  {
    title: 'Sartorial Double-Breasted Blazer',
    category: 'Formal Wear',
    desc: 'Deep navy tailoring with custom brass button layout detailing, structured shoulder drape.',
    match: '92% Match',
    theme: 'Modern Tailoring',
    price: '₹8,499',
    img: 'https://images.unsplash.com/photo-1620932934088-fbdb2920e484',
  },
  {
    title: 'Bespoke Knitted Crewneck',
    category: 'Casual / Autumn',
    desc: 'Off-white tightly knit cotton crewneck sweater designed for clean modular styling loops.',
    match: '90% Match',
    theme: 'Cozy Minimalist',
    price: '₹2,999',
    img: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633',
  },
  {
    title: 'Urban Aviator Bomber',
    category: 'Techwear', // Mapped from 'Outerwear' to pass validation since its theme is 'Techwear Edge'
    desc: 'Sleek matte satin finish pilot bomber jacket featuring an integrated utility sleeve pouch setup.',
    match: '89% Match',
    theme: 'Techwear Edge',
    price: '₹4,799',
    img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5',
  },
  {
    title: 'Vintage Distressed Denim Jacket',
    category: 'Streetwear',
    desc: 'Authentic washed indigo structural denim trucker jacket layered with heavy reinforcement stitching.',
    match: '94% Match',
    theme: 'Heritage Casual',
    price: '₹4,999',
    img: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0',
  },
  {
    title: 'High-Rise Tailored Linen Trousers',
    category: 'Resort Wear',
    desc: 'Relaxed high-waisted linen bottoms in pure ecru cream shade with structural center pleats.',
    match: '96% Match',
    theme: 'Summer Cruise',
    price: '₹3,499',
    img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1',
  },
  {
    title: 'Cyber-Knit Lightweight Pullover',
    category: 'Techwear',
    desc: 'Breathable textured technical mesh knit jumper in slate grey hue with seamless ergonomics.',
    match: '93% Match',
    theme: 'Future-Tech',
    price: '₹3,799',
    img: 'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c',
  },
  {
    title: 'Premium Wool Mac Trench',
    category: 'Outerwear / Winter',
    desc: 'Minimalist clean single-breasted mid-length trench wrap crafted from refined charcoal wool blend.',
    match: '98% Match',
    theme: 'High-End Minimalist',
    price: '₹15,499',
    img: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a',
  },
];

const seedDatabase = async () => {
  try {
    // Connect to Database
    const connUri = process.env.MONGO_URI || 'mongodb://localhost:27017/klosetly';
    await mongoose.connect(connUri);
    console.log('[Seed] Database connected for seeding.');

    // Clear existing data
    await Product.deleteMany({});
    console.log('[Seed] Cleared existing products from collection.');

    // Insert new data
    const createdProducts = await Product.insertMany(products);
    console.log(`[Seed] Successfully seeded ${createdProducts.length} premium fashion products!`);

    // Disconnect
    await mongoose.disconnect();
    console.log('[Seed] Database disconnected.');
    process.exit(0);
  } catch (error) {
    console.error(`[Seed] Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

// Execute seeding
seedDatabase();
