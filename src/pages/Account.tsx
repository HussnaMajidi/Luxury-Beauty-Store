import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { User, Mail, Lock, Heart, Package, LogOut, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Account() {
  const { theme, user, login, register, logout, wishlist, toggleWishlist } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (isLogin) {
      if (!login(email, password)) {
        setError('Invalid credentials. Try registering first.');
      }
    } else {
      if (!name || !email || !password) {
        setError('Please fill in all fields.');
        return;
      }
      if (!register(name, email, password)) {
        setError('An account with this email already exists.');
      }
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className={`rounded-2xl p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-pink-500" />
            </div>
            <h2 className="font-heading text-2xl font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {isLogin ? 'Sign in to your account' : 'Join the Glow & Sparkle family'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="Full Name"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`} />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Email Address"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`} />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className={`w-full pl-10 pr-10 py-3 rounded-xl border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="btn-shimmer w-full py-3 bg-pink-500 text-white rounded-xl font-semibold hover:bg-pink-600 transition-all shadow-lg shadow-pink-500/30">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-sm text-pink-500 hover:underline">
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>

          <div className="mt-6">
            <Link to="/admin" className="block text-center text-xs text-gray-400 hover:text-pink-500 transition-colors">
              Admin Access →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Logged in view
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold">My Account</h1>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Welcome back, {user.name}!</p>
        </div>
        <button onClick={logout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      {/* Tabs */}
      <div className={`flex border-b mb-6 ${theme === 'dark' ? 'border-gray-700' : 'border-pink-100'}`}>
        {[
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'wishlist', label: 'Wishlist', icon: Heart },
          { id: 'orders', label: 'Orders', icon: Package },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? 'border-pink-500 text-pink-500' : `border-transparent ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} hover:text-pink-500`}`}>
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <div className={`rounded-xl p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-rose-gold flex items-center justify-center text-white text-2xl font-bold">
              {user.name[0].toUpperCase()}
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold">{user.name}</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</p>
            </div>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-pink-50'}`}>
            <div className="text-center">
              <p className="text-2xl font-bold text-pink-600">0</p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Orders</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-pink-600">{wishlist.length}</p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Wishlist Items</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-pink-600">Gold</p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Member Tier</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'wishlist' && (
        <div>
          {wishlist.length === 0 ? (
            <div className="text-center py-12">
              <Heart className={`w-12 h-12 mx-auto mb-3 ${theme === 'dark' ? 'text-gray-600' : 'text-pink-200'}`} />
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Your wishlist is empty.</p>
              <Link to="/shop" className="text-pink-500 hover:underline text-sm mt-2 inline-block">Browse products</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {wishlist.map(product => (
                <div key={product.id} className={`rounded-xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                  <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
                  </Link>
                  <div className="p-3">
                    <Link to={`/product/${product.id}`}>
                      <h4 className={`text-sm font-medium truncate hover:text-pink-500 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{product.name}</h4>
                    </Link>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-pink-600 font-bold text-sm">${product.price.toFixed(2)}</span>
                      <button onClick={() => toggleWishlist(product)} className="text-red-500 hover:text-red-600">
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="text-center py-12">
          <Package className={`w-12 h-12 mx-auto mb-3 ${theme === 'dark' ? 'text-gray-600' : 'text-pink-200'}`} />
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>No orders yet. Start shopping!</p>
          <Link to="/shop" className="text-pink-500 hover:underline text-sm mt-2 inline-block">Browse products</Link>
        </div>
      )}
    </div>
  );
}
