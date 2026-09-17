import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, ZoomIn, Minus, Plus } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const { products, theme, addToCart, toggleWishlist, wishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [zoomed, setZoomed] = useState(false);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">😢</p>
        <h2 className="font-heading text-2xl font-bold mb-2">Product Not Found</h2>
        <Link to="/shop" className="text-pink-500 hover:underline">Back to Shop</Link>
      </div>
    );
  }

  const isWished = wishlist.some(p => p.id === product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8">
        <Link to="/" className={`hover:text-pink-500 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Home</Link>
        <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}>/</span>
        <Link to="/shop" className={`hover:text-pink-500 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Shop</Link>
        <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}>/</span>
        <Link to={`/shop/${product.category}`} className={`hover:text-pink-500 capitalize ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{product.category}</Link>
        <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}>/</span>
        <span className="text-pink-500 truncate">{product.name}</span>
      </nav>

      {/* Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {/* Image */}
        <div className="relative">
          <div className={`rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-pink-50'} aspect-square cursor-zoom-in`} onClick={() => setZoomed(!zoomed)}>
            <img src={product.image} alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-500 ${zoomed ? 'scale-150' : 'scale-100'}`} />
            <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full shadow-sm">
              <ZoomIn className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          {product.isNew && <span className="absolute top-4 left-4 bg-pink-500 text-white text-sm px-4 py-1 rounded-full font-medium">New Arrival</span>}
          {product.originalPrice && (
            <span className="absolute top-4 left-4 bg-red-500 text-white text-sm px-4 py-1 rounded-full font-medium">
              Save ${(product.originalPrice - product.price).toFixed(2)}
            </span>
          )}
        </div>

        {/* Info */}
        <div>
          <p className={`text-sm uppercase tracking-wider mb-2 ${theme === 'dark' ? 'text-pink-400' : 'text-pink-500'}`}>{product.brand}</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-pink-600">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Description */}
          <p className={`mb-6 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{product.description}</p>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`flex items-center border rounded-full ${theme === 'dark' ? 'border-gray-600' : 'border-pink-200'}`}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:text-pink-500"><Minus className="w-4 h-4" /></button>
              <span className="px-4 font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:text-pink-500"><Plus className="w-4 h-4" /></button>
            </div>
            <button onClick={() => { for (let i = 0; i < quantity; i++) addToCart(product); }}
              className="btn-shimmer flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-all shadow-lg shadow-pink-500/30">
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <button onClick={() => toggleWishlist(product)}
              className={`p-3 rounded-full border transition-colors ${isWished ? 'bg-pink-500 text-white border-pink-500' : theme === 'dark' ? 'border-gray-600 hover:border-pink-500' : 'border-pink-200 hover:border-pink-500'}`}>
              <Heart className="w-5 h-5" fill={isWished ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Buy Now */}
          <Link to="/cart" onClick={() => { for (let i = 0; i < quantity; i++) addToCart(product); }}
            className={`block text-center w-full py-3 rounded-full font-semibold border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition-all mb-6`}>
            Buy Now
          </Link>

          {/* Features */}
          <div className={`grid grid-cols-3 gap-4 p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-pink-50'}`}>
            <div className="text-center">
              <Truck className="w-6 h-6 mx-auto mb-1 text-pink-500" />
              <p className="text-xs font-medium">Free Shipping</p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Orders $50+</p>
            </div>
            <div className="text-center">
              <Shield className="w-6 h-6 mx-auto mb-1 text-pink-500" />
              <p className="text-xs font-medium">Secure Payment</p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>100% Protected</p>
            </div>
            <div className="text-center">
              <RotateCcw className="w-6 h-6 mx-auto mb-1 text-pink-500" />
              <p className="text-xs font-medium">Easy Returns</p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>30-day policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-16">
        <div className={`flex border-b ${theme === 'dark' ? 'border-gray-700' : 'border-pink-100'}`}>
          {['description', 'ingredients', 'reviews'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium capitalize border-b-2 transition-colors ${activeTab === tab ? 'border-pink-500 text-pink-500' : `border-transparent ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} hover:text-pink-500`}`}>
              {tab}
            </button>
          ))}
        </div>
        <div className={`p-6 rounded-b-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          {activeTab === 'description' && (
            <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              <p className="mb-4">{product.description}</p>
              <p>Our products are carefully formulated with the finest ingredients to deliver visible results. Suitable for all skin types. Cruelty-free and dermatologist tested.</p>
            </div>
          )}
          {activeTab === 'ingredients' && (
            <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              <p className="font-medium mb-2">Key Ingredients:</p>
              <p>{product.ingredients || 'Natural and organic ingredients. Full ingredient list available on packaging.'}</p>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-pink-600">{product.rating}</p>
                  <div className="flex gap-0.5 my-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{product.reviews} reviews</p>
                </div>
              </div>
              {[
                { name: "Amanda K.", rating: 5, text: "Absolutely love this product! My skin has never looked better.", date: "2 weeks ago" },
                { name: "Rachel S.", rating: 4, text: "Great quality and the results are visible after just one week of use.", date: "1 month ago" },
                { name: "Lisa M.", rating: 5, text: "Best purchase I've made this year. Will definitely repurchase!", date: "2 months ago" },
              ].map((review, i) => (
                <div key={i} className={`py-4 ${i > 0 ? `border-t ${theme === 'dark' ? 'border-gray-700' : 'border-pink-50'}` : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-medium text-sm">{review.name[0]}</div>
                      <span className="font-medium text-sm">{review.name}</span>
                    </div>
                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>{review.date}</span>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`w-3 h-3 ${j < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{review.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="font-heading text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className={`product-card rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-pink-100'} border shadow-sm group`}>
                <div className="aspect-square overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <h3 className={`text-sm font-medium line-clamp-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{p.name}</h3>
                  <p className="text-pink-600 font-bold mt-1">${p.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
