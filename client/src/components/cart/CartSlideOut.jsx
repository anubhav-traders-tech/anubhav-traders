import React, { useEffect } from 'react';
import useCartStore from '../store/cartStore';
import { ShoppingBag, X, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CartSlideOut = () => {
    const { cart, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();
    const navigate = useNavigate();

    const total = cart.reduce((acc, item) => acc + (item.retail_price * item.quantity), 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={closeCart} />

            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md bg-white shadow-2xl animate-slide-left flex flex-col">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-indigo-950 flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5 text-orange-600" />
                            Your Shopping Basket
                        </h2>
                        <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center">
                                <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900">Your basket is empty</h3>
                                <p className="text-gray-500 mt-2">Looks like you haven't added anything yet.</p>
                                <button onClick={closeCart} className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-full font-bold">Start Shopping</button>
                            </div>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} className="flex gap-4 group">
                                    <div className="w-20 h-20 bg-gray-50 rounded-xl p-2 flex items-center justify-center shrink-0 border border-gray-100">
                                        <img src={item.image_url ? `http://localhost:5000${item.image_url}` : '/placeholder.png'} className="max-h-full max-w-full object-contain" alt={item.name} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold text-indigo-950 truncate uppercase">{item.name}</h4>
                                        <p className="text-xs text-orange-600 font-bold mt-1">₹{item.retail_price}</p>

                                        <div className="mt-4 flex items-center gap-4">
                                            <div className="flex items-center bg-gray-100 rounded-lg h-8">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 px-2 hover:text-indigo-600"><Minus className="w-3 h-3" /></button>
                                                <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 px-2 hover:text-indigo-600"><Plus className="w-3 h-3" /></button>
                                            </div>
                                            <button onClick={() => removeItem(item.id)} className="text-[10px] font-bold text-gray-400 hover:text-red-500 uppercase tracking-wider">Remove</button>
                                        </div>
                                    </div>
                                    <div className="text-sm font-bold text-indigo-950">₹{item.retail_price * item.quantity}</div>
                                </div>
                            ))
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className="p-6 bg-gray-50 border-t border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-500 font-medium">Subtotal</span>
                                <span className="text-2xl font-black text-indigo-950">₹{total}</span>
                            </div>
                            <button
                                onClick={() => { closeCart(); navigate('/checkout'); }}
                                className="w-full bg-indigo-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-indigo-900/10"
                            >
                                Checkout Now <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartSlideOut;
