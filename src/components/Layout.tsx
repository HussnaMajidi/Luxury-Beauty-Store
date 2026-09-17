import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ShoppingCart, Heart, User, Search, Menu, X, Sun, Moon, Sparkles } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme, cartCount, wishlist, user, logout } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-pink-50/30 text-gray-900'}`}>
      {/* Navbar */}
      <nav className={`sticky top-0 z-50 ${theme === 'dark' ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-pink-100'} backdrop-blur-md border-b shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <Sparkles className="w-6 h-6 text-pink-500 group-hover:text-pink-400 transition-colors" />
              <span className="font-heading text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-gold bg-clip-text text-transparent">
                Glow & Sparkle
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className={`text-sm font-medium hover:text-pink-500 transition-colors ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Home</Link>
              <Link to="/shop" className={`text-sm font-medium hover:text-pink-500 transition-colors ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Shop</Link>
              <Link to="/shop/makeup" className={`text-sm font-medium hover:text-pink-500 transition-colors ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Makeup</Link>
              <Link to="/shop/skincare" className={`text-sm font-medium hover:text-pink-500 transition-colors ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Skincare</Link>
              <Link to="/shop/haircare" className={`text-sm font-medium hover:text-pink-500 transition-colors ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Haircare</Link>
              <Link to="/about" className={`text-sm font-medium hover:text-pink-500 transition-colors ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>About</Link>
              <Link to="/contact" className={`text-sm font-medium hover:text-pink-500 transition-colors ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Contact</Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button onClick={() => setSearchOpen(!searchOpen)} className={`p-2 rounded-full hover:bg-pink-100 dark:hover:bg-gray-800 transition-colors ${theme === 'dark' ? 'text-gray-200' : 'text-gray-600'}`}>
                <Search className="w-5 h-5" />
              </button>
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={`p-2 rounded-full hover:bg-pink-100 dark:hover:bg-gray-800 transition-colors ${theme === 'dark' ? 'text-gray-200' : 'text-gray-600'}`}>
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <Link to="/account" className={`p-2 rounded-full hover:bg-pink-100 dark:hover:bg-gray-800 transition-colors relative ${theme === 'dark' ? 'text-gray-200' : 'text-gray-600'}`}>
                <User className="w-5 h-5" />
              </Link>
              <Link to="/cart" className={`p-2 rounded-full hover:bg-pink-100 dark:hover:bg-gray-800 transition-colors relative ${theme === 'dark' ? 'text-gray-200' : 'text-gray-600'}`}>
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">{wishlist.length}</span>
                )}
              </Link>
              <Link to="/cart" className={`p-2 rounded-full hover:bg-pink-100 dark:hover:bg-gray-800 transition-colors relative ${theme === 'dark' ? 'text-gray-200' : 'text-gray-600'}`}>
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold">{cartCount}</span>
                )}
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-full hover:bg-pink-100 dark:hover:bg-gray-800">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className={`border-t ${theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-pink-100 bg-white'} px-4 py-3`}>
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className={`flex-1 px-4 py-2 rounded-full border ${theme === 'dark' ? 'bg-gray-800 border-gray-600 text-white' : 'bg-pink-50 border-pink-200'} focus:ring-2 focus:ring-pink-400`}
                autoFocus
              />
              <button type="submit" className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors font-medium">
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-t ${theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-pink-100 bg-white'} px-4 py-4 space-y-3`}>
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium hover:text-pink-500">Home</Link>
            <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium hover:text-pink-500">Shop All</Link>
            <Link to="/shop/makeup" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium hover:text-pink-500">Makeup</Link>
            <Link to="/shop/skincare" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium hover:text-pink-500">Skincare</Link>
            <Link to="/shop/haircare" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium hover:text-pink-500">Haircare</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium hover:text-pink-500">About</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium hover:text-pink-500">Contact</Link>
            {user && <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="block py-2 text-sm font-medium text-red-500">Logout</button>}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className={`${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-gradient-to-b from-pink-50 to-white border-pink-100'} border-t mt-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-pink-500" />
                <span className="font-heading text-lg font-bold text-pink-600">Glow & Sparkle</span>
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Premium makeup, skincare & haircare products crafted with love for your natural beauty.
              </p>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-3">Shop</h4>
              <div className="space-y-2">
                <Link to="/shop/makeup" className={`block text-sm hover:text-pink-500 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Makeup</Link>
                <Link to="/shop/skincare" className={`block text-sm hover:text-pink-500 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Skincare</Link>
                <Link to="/shop/haircare" className={`block text-sm hover:text-pink-500 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Haircare</Link>
                <Link to="/shop" className={`block text-sm hover:text-pink-500 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>All Products</Link>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-3">Company</h4>
              <div className="space-y-2">
                <Link to="/about" className={`block text-sm hover:text-pink-500 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>About Us</Link>
                <Link to="/contact" className={`block text-sm hover:text-pink-500 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Contact</Link>
                <a href="#" className={`block text-sm hover:text-pink-500 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Privacy Policy</a>
                <a href="#" className={`block text-sm hover:text-pink-500 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Returns & Refunds</a>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-3">Newsletter</h4>
              <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Get 10% off your first order!</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Your email" className={`flex-1 px-3 py-2 text-sm rounded-full border ${theme === 'dark' ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-pink-200'}`} />
                <button className="px-4 py-2 bg-pink-500 text-white text-sm rounded-full hover:bg-pink-600 transition-colors">Join</button>
              </div>
            </div>
          </div>
          <div className={`mt-8 pt-8 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-pink-100'} text-center`}>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
              © 2024 Glow & Sparkle. All rights reserved. Made with 💖
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
