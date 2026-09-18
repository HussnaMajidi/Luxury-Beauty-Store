import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Sparkles, Star, ArrowRight, Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../data/products';

function ProductCard({ product }: { product: Product }) {
  const { theme, addToCart, toggleWishlist, wishlist } = useStore();
  const isWished = wishlist.some(p => p.id === product.id);

  return (
    <div className={`product-card rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-pink-100'} border shadow-sm group`}>
      <div className="relative overflow-hidden aspect-square">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        {product.isNew && <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs px-3 py-1 rounded-full font-medium">New</span>}
        {product.originalPrice && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </span>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <button onClick={() => toggleWishlist(product)} className={`p-3 rounded-full ${isWished ? 'bg-pink-500 text-white' : 'bg-white text-pink-500'} shadow-lg hover:scale-110 transition-transform`}>
            <Heart className="w-5 h-5" fill={isWished ? 'currentColor' : 'none'} />
          </button>
          <button onClick={() => addToCart(product)} className="p-3 rounded-full bg-pink-500 text-white shadow-lg hover:scale-110 transition-transform">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <p className={`text-xs uppercase tracking-wider mb-1 ${theme === 'dark' ? 'text-pink-400' : 'text-pink-500'}`}>{product.brand}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className={`font-heading font-semibold text-sm mb-1 line-clamp-2 hover:text-pink-500 transition-colors ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
          ))}
          <span className={`text-xs ml-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-pink-600">${product.price.toFixed(2)}</span>
          {product.originalPrice && <span className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { products, theme } = useStore();
  const bestsellers = products.filter(p => p.bestseller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const makeupProducts = products.filter(p => p.category === 'makeup').slice(0, 4);
  const skincareProducts = products.filter(p => p.category === 'skincare').slice(0, 4);
  const haircareProducts = products.filter(p => p.category === 'haircare').slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative hero-gradient overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <img src="https://image.qwenlm.ai/generated-images/65098c70-df34-49f2-92da-93e434c1e582/_result.png" alt="" className="w-full h-full object-cover opacity-60" />
        </div>
        <div className="absolute inset-0 sparkle-bg"></div>
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute w-2 h-2 bg-white rounded-full animate-float" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }} />
          ))}
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-pink-600" />
              <span className="text-sm font-medium text-pink-800">New Collection Available</span>
            </div>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Reveal Your <br />
              <span className="bg-gradient-to-r from-pink-600 to-rose-gold bg-clip-text text-transparent">Natural Glow</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
              Discover premium cosmetics, skincare & haircare crafted with love. Your journey to radiant beauty starts here.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="btn-shimmer inline-flex items-center gap-2 px-8 py-4 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-all shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50">
                Shop Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 rounded-full font-semibold hover:bg-white transition-all border border-pink-200">
                Our Story
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative bow */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="text-8xl animate-float">🎀</div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Find exactly what you're looking for</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Makeup', desc: 'Lipsticks, foundations & more', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop', link: '/shop/makeup' },
            { name: 'Skincare', desc: 'Serums, moisturizers & treatments', img: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=600&h=400&fit=crop', link: '/shop/skincare' },
            { name: 'Haircare', desc: 'Shampoos, masks & treatments', img: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&h=400&fit=crop', link: '/shop/haircare' },
          ].map(cat => (
            <Link key={cat.name} to={cat.link} className="group relative rounded-2xl overflow-hidden h-64 shadow-lg">
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-heading text-2xl font-bold text-white mb-1">{cat.name}</h3>
                <p className="text-white/80 text-sm">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">Bestsellers</h2>
            <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Loved by thousands</p>
          </div>
          <Link to="/shop" className="flex items-center gap-1 text-pink-500 hover:text-pink-600 font-medium">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {bestsellers.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`rounded-3xl p-8 md:p-12 ${theme === 'dark' ? 'bg-gradient-to-r from-pink-900/50 to-purple-900/50' : 'bg-gradient-to-r from-pink-100 to-rose-100'} relative overflow-hidden`}>
          <div className="relative z-10 max-w-lg">
            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3">Get 15% Off Your First Order</h3>
            <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Sign up for our newsletter and receive an exclusive discount code.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Enter your email" className={`flex-1 px-4 py-3 rounded-full border ${theme === 'dark' ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-pink-200'}`} />
              <button className="px-6 py-3 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition-colors">Subscribe</button>
            </div>
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-6xl opacity-30 hidden md:block">✨💄✨</div>
        </div>
      </section>

      {/* Makeup Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">Makeup</h2>
            <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Express yourself with color</p>
          </div>
          <Link to="/shop/makeup" className="flex items-center gap-1 text-pink-500 hover:text-pink-600 font-medium">
            Shop All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {makeupProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Skincare Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">Skincare</h2>
            <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Nourish your skin daily</p>
          </div>
          <Link to="/shop/skincare" className="flex items-center gap-1 text-pink-500 hover:text-pink-600 font-medium">
            Shop All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {skincareProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Haircare Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">Haircare</h2>
            <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Healthy hair, happy you</p>
          </div>
          <Link to="/shop/haircare" className="flex items-center gap-1 text-pink-500 hover:text-pink-600 font-medium">
            Shop All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {haircareProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold">New Arrivals</h2>
              <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Fresh picks just for you</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-pink-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Sarah M.", text: "The Hydra-Glow Moisturizer transformed my skin! I've never felt so confident without makeup.", rating: 5 },
              { name: "Emily R.", text: "Best mascara I've ever used. My lashes look incredible and it doesn't flake at all!", rating: 5 },
              { name: "Jessica L.", text: "I'm obsessed with the Diamond Highlighter. The glow is unreal and lasts all day.", rating: 5 },
            ].map((review, i) => (
              <div key={i} className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className={`mb-4 italic ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>"{review.text}"</p>
                <p className="font-semibold text-pink-600">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
