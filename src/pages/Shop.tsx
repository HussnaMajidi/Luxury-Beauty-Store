import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Star, Heart, ShoppingCart, SlidersHorizontal, X, Grid3X3, LayoutGrid } from 'lucide-react';

export default function Shop() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const { products, theme, addToCart, toggleWishlist, wishlist } = useStore();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [gridCols, setGridCols] = useState(4);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);

  const brands = useMemo(() => [...new Set(products.map(p => p.brand))], [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category) {
      result = result.filter(p => p.category === category);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      default: result.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
    }

    return result;
  }, [products, category, searchQuery, priceRange, sortBy, selectedBrands, minRating]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const categoryTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : searchQuery ? `Results for "${searchQuery}"` : 'All Products';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-sm mb-4">
          <Link to="/" className={`hover:text-pink-500 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Home</Link>
          <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}>/</span>
          <Link to="/shop" className={`hover:text-pink-500 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Shop</Link>
          {category && (
            <>
              <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}>/</span>
              <span className="text-pink-500">{categoryTitle}</span>
            </>
          )}
        </nav>
        <h1 className="font-heading text-3xl md:text-4xl font-bold">{categoryTitle}</h1>
        <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters - Desktop */}
        <aside className={`hidden lg:block w-64 flex-shrink-0`}>
          <div className={`sticky top-24 rounded-2xl p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <h3 className="font-heading font-bold text-lg mb-4">Filters</h3>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className={`font-medium text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Price Range</h4>
              <div className="flex items-center gap-2">
                <input type="number" value={priceRange[0]} onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
                  className={`w-20 px-2 py-1 text-sm rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`} placeholder="Min" />
                <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>—</span>
                <input type="number" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                  className={`w-20 px-2 py-1 text-sm rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`} placeholder="Max" />
              </div>
            </div>

            {/* Brands */}
            <div className="mb-6">
              <h4 className={`font-medium text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Brand</h4>
              {brands.map(brand => (
                <label key={brand} className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)}
                    className="w-4 h-4 rounded border-pink-300 text-pink-500 focus:ring-pink-400" />
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{brand}</span>
                </label>
              ))}
            </div>

            {/* Rating */}
            <div className="mb-6">
              <h4 className={`font-medium text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Minimum Rating</h4>
              <div className="flex gap-1">
                {[0, 3, 4, 4.5].map(r => (
                  <button key={r} onClick={() => setMinRating(r)}
                    className={`px-3 py-1 text-xs rounded-full border transition-colors ${minRating === r ? 'bg-pink-500 text-white border-pink-500' : theme === 'dark' ? 'border-gray-600 text-gray-300' : 'border-pink-200 text-gray-600'}`}>
                    {r === 0 ? 'All' : `${r}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className={`font-medium text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Category</h4>
              <div className="space-y-2">
                {[
                  { label: 'All', value: '' },
                  { label: 'Makeup', value: 'makeup' },
                  { label: 'Skincare', value: 'skincare' },
                  { label: 'Haircare', value: 'haircare' },
                ].map(cat => (
                  <Link key={cat.value} to={cat.value ? `/shop/${cat.value}` : '/shop'}
                    className={`block py-1 text-sm hover:text-pink-500 transition-colors ${(!category && !cat.value) || category === cat.value ? 'text-pink-500 font-medium' : theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className={`flex items-center justify-between mb-6 p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 text-sm font-medium">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <div className="flex items-center gap-3 ml-auto">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className={`text-sm px-3 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`}>
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <div className="hidden md:flex items-center gap-1">
                <button onClick={() => setGridCols(3)} className={`p-2 rounded ${gridCols === 3 ? 'bg-pink-100 text-pink-500' : ''}`}>
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button onClick={() => setGridCols(4)} className={`p-2 rounded ${gridCols === 4 ? 'bg-pink-100 text-pink-500' : ''}`}>
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className={`lg:hidden mb-6 p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold">Filters</h3>
                <button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Min Price</label>
                  <input type="number" value={priceRange[0]} onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
                    className={`w-full px-3 py-2 text-sm rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Max Price</label>
                  <input type="number" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                    className={`w-full px-3 py-2 text-sm rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`} />
                </div>
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium mb-2 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {['', 'makeup', 'skincare', 'haircare'].map(cat => (
                    <Link key={cat} to={cat ? `/shop/${cat}` : '/shop'}
                      className={`px-3 py-1 text-xs rounded-full border ${(!category && !cat) || category === cat ? 'bg-pink-500 text-white border-pink-500' : theme === 'dark' ? 'border-gray-600 text-gray-300' : 'border-pink-200'}`}>
                      {cat || 'All'}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🔍</p>
              <h3 className="font-heading text-xl font-bold mb-2">No products found</h3>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className={`grid grid-cols-2 ${gridCols === 4 ? 'md:grid-cols-3 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4 md:gap-6`}>
              {filteredProducts.map(product => {
                const isWished = wishlist.some(p => p.id === product.id);
                return (
                  <div key={product.id} className={`product-card rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-pink-100'} border shadow-sm group`}>
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
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
