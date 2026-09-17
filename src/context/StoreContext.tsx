import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, sampleProducts } from '../data/products';
import { v4 as uuidv4 } from 'uuid';

interface CartItem {
  product: Product;
  quantity: number;
}

interface User {
  email: string;
  name: string;
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  theme: 'light' | 'dark';
  user: User | null;
  isAdmin: boolean;
  setTheme: (theme: 'light' | 'dark') => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  loadSampleProducts: () => void;
  login: (email: string, password: string) => boolean;
  adminLogin: (password: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string) => boolean;
  cartTotal: number;
  cartCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('glow-products');
    return saved ? JSON.parse(saved) : sampleProducts;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('glow-cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('glow-wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('glow-theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('glow-user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('glow-admin') === 'true';
  });

  useEffect(() => { localStorage.setItem('glow-products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('glow-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('glow-wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('glow-user', JSON.stringify(user)); }, [user]);

  useEffect(() => {
    localStorage.setItem('glow-theme', theme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const setTheme = (t: 'light' | 'dark') => setThemeState(t);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      return [...prev, product];
    });
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: uuidv4() };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const loadSampleProducts = () => {
    setProducts(sampleProducts);
  };

  const login = (email: string, _password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('glow-users') || '[]');
    const found = users.find((u: any) => u.email === email);
    if (found) {
      setUser({ email: found.email, name: found.name });
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, _password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('glow-users') || '[]');
    if (users.find((u: any) => u.email === email)) return false;
    users.push({ name, email, password: _password });
    localStorage.setItem('glow-users', JSON.stringify(users));
    setUser({ name, email });
    return true;
  };

  const adminLogin = (password: string): boolean => {
    if (password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('glow-admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('glow-user');
    localStorage.removeItem('glow-admin');
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider value={{
      products, cart, wishlist, theme, user, isAdmin,
      setTheme, addToCart, removeFromCart, updateCartQuantity, clearCart,
      toggleWishlist, addProduct, updateProduct, deleteProduct,
      loadSampleProducts, login, adminLogin, logout, register,
      cartTotal, cartCount
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
}
