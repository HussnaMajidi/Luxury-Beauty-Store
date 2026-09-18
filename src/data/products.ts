import { v4 as uuidv4 } from 'uuid';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'makeup' | 'skincare' | 'haircare';
  brand: string;
  description: string;
  ingredients?: string;
  image: string;
  rating: number;
  reviews: number;
  quantity: number;
  bestseller?: boolean;
  isNew?: boolean;
}

export const sampleProducts: Product[] = [
  {
    id: uuidv4(),
    name: "Velvet Matte Lipstick - Rose Petal",
    price: 28.00,
    originalPrice: 35.00,
    category: "makeup",
    brand: "Glow & Sparkle",
    description: "A luxuriously smooth matte lipstick that glides on effortlessly. The rich rose petal shade complements every skin tone, leaving lips feeling soft and hydrated all day long.",
    ingredients: "Jojoba Oil, Vitamin E, Shea Butter, Natural Pigments, Hyaluronic Acid",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 234,
    quantity: 150,
    bestseller: true
  },
  {
    id: uuidv4(),
    name: "Radiant Glow Foundation SPF 30",
    price: 45.00,
    category: "makeup",
    brand: "Glow & Sparkle",
    description: "A lightweight, buildable foundation that provides flawless coverage while protecting your skin with SPF 30. Infused with hyaluronic acid for all-day hydration.",
    ingredients: "Hyaluronic Acid, SPF 30, Niacinamide, Vitamin C, Squalane",
    image: "https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 189,
    quantity: 200,
    bestseller: true
  },
  {
    id: uuidv4(),
    name: "Diamond Highlighter Palette",
    price: 38.00,
    originalPrice: 48.00,
    category: "makeup",
    brand: "Glow & Sparkle",
    description: "Four stunning shades of diamond-finish highlighter that catch the light beautifully. From subtle glow to blinding radiance, achieve your perfect luminosity.",
    ingredients: "Mica, Silica, Jojoba Oil, Vitamin E, Diamond Powder",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 312,
    quantity: 80,
    bestseller: true,
    isNew: true
  },
  {
    id: uuidv4(),
    name: "Volumizing Mascara - Lash Fantasy",
    price: 24.00,
    category: "makeup",
    brand: "Glow & Sparkle",
    description: "Achieve dramatic, voluminous lashes that last all day without flaking. The innovative brush coats every lash from root to tip for maximum impact.",
    ingredients: "Beeswax, Carnauba Wax, Iron Oxides, Panthenol, Keratin",
    image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 445,
    quantity: 300
  },
  {
    id: uuidv4(),
    name: "Hydra-Glow Moisturizer",
    price: 52.00,
    originalPrice: 65.00,
    category: "skincare",
    brand: "Glow & Sparkle",
    description: "Reveal your natural glow with our deeply hydrating moisturizer. Formulated with hyaluronic acid and ceramides to lock in moisture for 72 hours.",
    ingredients: "Hyaluronic Acid, Ceramides, Niacinamide, Squalane, Centella Asiatica",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 567,
    quantity: 250,
    bestseller: true
  },
  {
    id: uuidv4(),
    name: "Vitamin C Brightening Serum",
    price: 42.00,
    category: "skincare",
    brand: "Glow & Sparkle",
    description: "Illuminate your complexion with our potent Vitamin C serum. Fades dark spots, evens skin tone, and provides antioxidant protection against environmental damage.",
    ingredients: "20% Vitamin C, Ferulic Acid, Vitamin E, Hyaluronic Acid, Aloe Vera",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 389,
    quantity: 180,
    bestseller: true
  },
  {
    id: uuidv4(),
    name: "Rose Gold Eye Cream",
    price: 58.00,
    category: "skincare",
    brand: "Glow & Sparkle",
    description: "Turn back time with our luxurious rose gold eye cream. Reduces fine lines, puffiness, and dark circles while delivering intense hydration to the delicate eye area.",
    ingredients: "Retinol, Peptides, Rose Gold Extract, Caffeine, Vitamin K",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 201,
    quantity: 120,
    isNew: true
  },
  {
    id: uuidv4(),
    name: "Gentle Exfoliating Cleanser",
    price: 32.00,
    category: "skincare",
    brand: "Glow & Sparkle",
    description: "Gently buff away dull, dead skin cells with our micro-exfoliating cleanser. Reveals fresh, radiant skin without irritation. Perfect for daily use.",
    ingredients: "AHA/BHA, Green Tea Extract, Chamomile, Glycerin, Allantoin",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 156,
    quantity: 200
  },
  {
    id: uuidv4(),
    name: "Silk Repair Hair Mask",
    price: 36.00,
    originalPrice: 45.00,
    category: "haircare",
    brand: "Glow & Sparkle",
    description: "Transform damaged, dry hair into silky-smooth strands with our intensive repair mask. Deeply nourishes and strengthens from within, leaving hair irresistibly soft.",
    ingredients: "Argan Oil, Keratin, Biotin, Silk Proteins, Coconut Oil",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2b?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 278,
    quantity: 160,
    bestseller: true
  },
  {
    id: uuidv4(),
    name: "Anti-Frizz Shine Serum",
    price: 29.00,
    category: "haircare",
    brand: "Glow & Sparkle",
    description: "Tame frizz and add brilliant shine with our weightless serum. Protects against humidity and heat styling while keeping hair smooth and manageable all day.",
    ingredients: "Argan Oil, Vitamin E, Silk Amino Acids, UV Filters, Jojoba Oil",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 198,
    quantity: 220
  },
  {
    id: uuidv4(),
    name: "Volumizing Dry Shampoo",
    price: 22.00,
    category: "haircare",
    brand: "Glow & Sparkle",
    description: "Refresh your roots and add instant volume between washes. Our invisible dry shampoo absorbs oil and adds texture without leaving any white residue.",
    ingredients: "Rice Starch, Kaolin Clay, Rose Extract, Vitamin B5, Propanediol",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 334,
    quantity: 280,
    isNew: true
  },
  {
    id: uuidv4(),
    name: "Scalp Nourishing Oil Treatment",
    price: 38.00,
    category: "haircare",
    brand: "Glow & Sparkle",
    description: "Nourish your scalp and promote healthy hair growth with our luxurious oil blend. A spa-like treatment that soothes, hydrates, and revitalizes from root to tip.",
    ingredients: "Rosemary Oil, Tea Tree Oil, Peppermint Oil, Castor Oil, Biotin",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 145,
    quantity: 140
  }
];
