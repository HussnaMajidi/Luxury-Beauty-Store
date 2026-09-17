import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Trash2, Minus, Plus, ShoppingBag, Tag, ArrowLeft } from 'lucide-react';

export default function Cart() {
  const { cart, theme, updateCartQuantity, removeFromCart, clearCart, cartTotal } = useStore();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'GLOW10') {
      setDiscount(0.1);
      setCouponApplied(true);
    } else if (couponCode.toUpperCase() === 'SPARKLE20') {
      setDiscount(0.2);
      setCouponApplied(true);
    } else {
      setDiscount(0);
      setCouponApplied(false);
    }
  };

  const discountedTotal = cartTotal * (1 - discount);
  const shipping = discountedTotal > 50 ? 0 : 5.99;
  const finalTotal = discountedTotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className={`w-20 h-20 mx-auto mb-6 ${theme === 'dark' ? 'text-gray-600' : 'text-pink-200'}`} />
        <h2 className="font-heading text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <p className={`mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop" className="btn-shimmer inline-flex items-center gap-2 px-8 py-4 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-all shadow-lg shadow-pink-500/30">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/shop" className={`flex items-center gap-1 text-sm hover:text-pink-500 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.product.id} className={`flex gap-4 p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <Link to={`/product/${item.product.id}`} className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.product.id}`}>
                  <h3 className={`font-medium text-sm mb-1 hover:text-pink-500 transition-colors truncate ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{item.product.name}</h3>
                </Link>
                <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{item.product.brand} • {item.product.category}</p>
                <div className="flex items-center justify-between">
                  <div className={`flex items-center border rounded-full ${theme === 'dark' ? 'border-gray-600' : 'border-pink-200'}`}>
                    <button onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)} className="p-2 hover:text-pink-500"><Minus className="w-3 h-3" /></button>
                    <span className="px-3 text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)} className="p-2 hover:text-pink-500"><Plus className="w-3 h-3" /></button>
                  </div>
                  <span className="font-bold text-pink-600">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.product.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors self-start">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button onClick={clearCart} className={`text-sm text-red-500 hover:text-red-600 font-medium`}>Clear Cart</button>
        </div>

        {/* Order Summary */}
        <div className={`rounded-2xl p-6 h-fit sticky top-24 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <h3 className="font-heading text-xl font-bold mb-4">Order Summary</h3>

          {/* Coupon */}
          <div className="mb-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" value={couponCode} onChange={e => setCouponCode(e.target.value)}
                  placeholder="Coupon code"
                  className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`} />
              </div>
              <button onClick={applyCoupon} className="px-4 py-2 bg-pink-500 text-white text-sm rounded-lg hover:bg-pink-600 transition-colors">Apply</button>
            </div>
            {couponApplied && <p className="text-xs text-green-500 mt-1">✓ Coupon applied! {discount * 100}% off</p>}
            <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Try: GLOW10 or SPARKLE20</p>
          </div>

          <div className={`space-y-3 py-4 border-t border-b ${theme === 'dark' ? 'border-gray-700' : 'border-pink-100'}`}>
            <div className="flex justify-between text-sm">
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Subtotal</span>
              <span className="font-medium">${cartTotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-500">Discount ({discount * 100}%)</span>
                <span className="text-green-500">-${(cartTotal * discount).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Shipping</span>
              <span className="font-medium">{shipping === 0 ? <span className="text-green-500">Free</span> : `$${shipping.toFixed(2)}`}</span>
            </div>
          </div>

          <div className="flex justify-between items-center py-4">
            <span className="font-heading text-lg font-bold">Total</span>
            <span className="text-2xl font-bold text-pink-600">${finalTotal.toFixed(2)}</span>
          </div>

          {!showCheckout ? (
            <button onClick={() => setShowCheckout(true)} className="btn-shimmer w-full py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-all shadow-lg shadow-pink-500/30">
              Proceed to Checkout
            </button>
          ) : (
            <div className="space-y-3">
              <input type="text" placeholder="Full Name" className={`w-full px-4 py-2 text-sm rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`} />
              <input type="text" placeholder="Address" className={`w-full px-4 py-2 text-sm rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`} />
              <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="City" className={`w-full px-4 py-2 text-sm rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`} />
                <input type="text" placeholder="ZIP Code" className={`w-full px-4 py-2 text-sm rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`} />
              </div>
              <input type="text" placeholder="Card Number" className={`w-full px-4 py-2 text-sm rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`} />
              <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="MM/YY" className={`w-full px-4 py-2 text-sm rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`} />
                <input type="text" placeholder="CVV" className={`w-full px-4 py-2 text-sm rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-pink-200'}`} />
              </div>
              <button onClick={() => { alert('Order placed successfully! 🎉'); clearCart(); setShowCheckout(false); }}
                className="btn-shimmer w-full py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-all shadow-lg shadow-pink-500/30">
                Place Order — ${finalTotal.toFixed(2)}
              </button>
            </div>
          )}

          <div className={`mt-4 flex items-center justify-center gap-2 text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            <span>🔒</span> Secure checkout powered by Stripe & PayPal
          </div>
        </div>
      </div>
    </div>
  );
}
