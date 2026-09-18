import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../data/products';
import { Plus, Edit3, Trash2, Search, Package, DollarSign, BarChart3, Lock, LogOut, Database, X, Save, Image } from 'lucide-react';

export default function Admin() {
  const { products, theme, isAdmin, adminLogin, addProduct, updateProduct, deleteProduct, loadSampleProducts } = useStore();
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '', price: '', originalPrice: '', category: 'makeup' as Product['category'],
    brand: 'Glow & Sparkle', description: '', ingredients: '', image: '',
    rating: '4.5', reviews: '0', quantity: '100', bestseller: false, isNew: false
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(password)) {
      setLoginError('');
    } else {
      setLoginError('Invalid password. Hint: admin123');
    }
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    if (filterCategory) {
      result = result.filter(p => p.category === filterCategory);
    }
    return result;
  }, [products, searchQuery, filterCategory]);

  const resetForm = () => {
    setFormData({ name: '', price: '', originalPrice: '', category: 'makeup', brand: 'Glow & Sparkle', description: '', ingredients: '', image: '', rating: '4.5', reviews: '0', quantity: '100', bestseller: false, isNew: false });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name, price: product.price.toString(), originalPrice: product.originalPrice?.toString() || '',
      category: product.category, brand: product.brand, description: product.description,
      ingredients: product.ingredients || '', image: product.image, rating: product.rating.toString(),
      reviews: product.reviews.toString(), quantity: product.quantity.toString(),
      bestseller: product.bestseller || false, isNew: product.isNew || false
    });
    setShowForm(true);
  };

  const handleSave = () => {
    const productData = {
      name: formData.name,
      price: parseFloat(formData.price) || 0,
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      category: formData.category,
      brand: formData.brand,
      description: formData.description,
      ingredients: formData.ingredients,
      image: formData.image || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
      rating: parseFloat(formData.rating) || 4.5,
      reviews: parseInt(formData.reviews) || 0,
      quantity: parseInt(formData.quantity) || 0,
      bestseller: formData.bestseller,
      isNew: formData.isNew
    };

    if (editingProduct) {
      updateProduct({ ...productData, id: editingProduct.id });
    } else {
      addProduct(productData);
    }
    resetForm();
  };

  // Login Screen
  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className={`rounded-2xl p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center`}>
          <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-pink-500" />
          </div>
          <h2 className="font-heading text-2xl font-bold mb-2">Admin Panel</h2>
          <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Enter the admin password to continue</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Admin Password"
              className={`w-full px-4 py-3 rounded-xl border text-center ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`} />
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
            <button type="submit" className="btn-shimmer w-full py-3 bg-pink-500 text-white rounded-xl font-semibold hover:bg-pink-600 transition-all">
              Access Panel
            </button>
          </form>
          <p className={`text-xs mt-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Default password: admin123</p>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const lowStock = products.filter(p => p.quantity < 50).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold">Admin Dashboard</h1>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Manage your products and inventory</p>
        </div>
        <button onClick={() => { localStorage.removeItem('glow-admin'); window.location.reload(); }}
          className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Package, label: 'Total Products', value: totalProducts, color: 'bg-pink-500' },
          { icon: DollarSign, label: 'Inventory Value', value: `$${totalValue.toFixed(0)}`, color: 'bg-green-500' },
          { icon: BarChart3, label: 'Low Stock Items', value: lowStock, color: 'bg-yellow-500' },
          { icon: Database, label: 'Categories', value: '3', color: 'bg-purple-500' },
        ].map((stat, i) => (
          <div key={i} className={`rounded-xl p-5 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions Bar */}
      <div className={`flex flex-wrap items-center gap-3 p-4 rounded-xl mb-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`} />
        </div>
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}
          className={`px-3 py-2 text-sm rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`}>
          <option value="">All Categories</option>
          <option value="makeup">Makeup</option>
          <option value="skincare">Skincare</option>
          <option value="haircare">Haircare</option>
        </select>
        <button onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white text-sm rounded-lg hover:bg-pink-600 transition-colors">
          <Plus className="w-4 h-4" /> Add Product
        </button>
        <button onClick={loadSampleProducts}
          className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg border ${theme === 'dark' ? 'border-gray-600 hover:bg-gray-700' : 'border-pink-200 hover:bg-pink-50'} transition-colors`}>
          <Database className="w-4 h-4" /> Load Samples
        </button>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-xl font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-1 block">Product Name *</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`} placeholder="e.g. Velvet Matte Lipstick" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Price ($) *</label>
                <input type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`} placeholder="29.99" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Original Price ($)</label>
                <input type="number" step="0.01" value={formData.originalPrice} onChange={e => setFormData({...formData, originalPrice: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`} placeholder="39.99" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Category *</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as Product['category']})}
                  className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`}>
                  <option value="makeup">Makeup</option>
                  <option value="skincare">Skincare</option>
                  <option value="haircare">Haircare</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Brand</label>
                <input type="text" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Quantity</label>
                <input type="number" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Rating</label>
                <input type="number" step="0.1" min="0" max="5" value={formData.rating} onChange={e => setFormData({...formData, rating: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`} />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-1 block">Image URL</label>
                <div className="flex gap-2">
                  <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})}
                    className={`flex-1 px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`} placeholder="https://..." />
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${theme === 'dark' ? 'border-gray-600' : 'border-pink-200'}`}>
                    <Image className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-1 block">Description</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                  rows={3} className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`} placeholder="Product description..." />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-1 block">Ingredients</label>
                <textarea value={formData.ingredients} onChange={e => setFormData({...formData, ingredients: e.target.value})}
                  rows={2} className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`} placeholder="Key ingredients..." />
              </div>
              <div className="md:col-span-2 flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.bestseller} onChange={e => setFormData({...formData, bestseller: e.target.checked})}
                    className="w-4 h-4 rounded border-pink-300 text-pink-500" />
                  <span className="text-sm">Bestseller</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.isNew} onChange={e => setFormData({...formData, isNew: e.target.checked})}
                    className="w-4 h-4 rounded border-pink-300 text-pink-500" />
                  <span className="text-sm">New Arrival</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave}
                className="btn-shimmer flex-1 flex items-center justify-center gap-2 py-3 bg-pink-500 text-white rounded-xl font-semibold hover:bg-pink-600 transition-all">
                <Save className="w-4 h-4" /> {editingProduct ? 'Update Product' : 'Save Product'}
              </button>
              <button onClick={resetForm}
                className={`px-6 py-3 rounded-xl font-medium border ${theme === 'dark' ? 'border-gray-600 hover:bg-gray-700' : 'border-pink-200 hover:bg-pink-50'} transition-colors`}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className={`rounded-xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-pink-100'} border shadow-sm`}>
            <div className="flex gap-3 p-4">
              <img src={product.image} alt={product.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium text-sm truncate ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{product.name}</h4>
                <p className={`text-xs capitalize ${theme === 'dark' ? 'text-pink-400' : 'text-pink-500'}`}>{product.category}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-pink-600 text-sm">${product.price.toFixed(2)}</span>
                  <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Qty: {product.quantity}</span>
                </div>
                <p className={`text-xs mt-1 line-clamp-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{product.description}</p>
              </div>
            </div>
            <div className={`flex border-t ${theme === 'dark' ? 'border-gray-700' : 'border-pink-50'}`}>
              <button onClick={() => handleEdit(product)}
                className={`flex-1 flex items-center justify-center gap-1 py-2 text-xs font-medium hover:bg-pink-50 dark:hover:bg-gray-700 transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <Edit3 className="w-3 h-3" /> Edit
              </button>
              <button onClick={() => { if (confirm('Delete this product?')) deleteProduct(product.id); }}
                className="flex-1 flex items-center justify-center gap-1 py-2 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-l border-inherit">
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className={`w-12 h-12 mx-auto mb-3 ${theme === 'dark' ? 'text-gray-600' : 'text-pink-200'}`} />
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>No products found. Try adjusting your search or add a new product.</p>
        </div>
      )}
    </div>
  );
}
