import React from 'react';
import useCartStore from '../../store/cartStore';
import { ShoppingBag, X, Plus, Minus, ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartSlideOut = () => {
    const { cart, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();
    const navigate = useNavigate();

    const total = cart.reduce((acc, item) => acc + (item.retail_price * item.quantity), 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            <div className="absolute inset-0 bg-accent-black/80 backdrop-blur-md transition-opacity" onClick={closeCart} />

            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md bg-accent-black shadow-2xl flex flex-col border-l border-white/10 animate-slide-in-right">
                    <div className="p-8 border-b border-white/5 flex items-center justify-between bg-navy-900/20">
                        <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
                            <Zap className="w-6 h-6 text-accent-yellow fill-accent-yellow" />
                            Your Haul
                        </h2>
                        <button onClick={closeCart} className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors">
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/5">
                                    <ShoppingBag className="w-10 h-10 text-gray-700" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white uppercase italic">Cart is empty</h3>
                                    <p className="text-gray-500 text-sm font-medium">Looks like you haven't snatched any deals yet.</p>
                                </div>
                                <button onClick={closeCart} className="bg-accent-yellow text-accent-black px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform">Start Exploring</button>
                            </div>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} className="flex gap-6 group relative">
                                    <div className="w-24 h-24 bg-[#0d0d0d] rounded-2xl p-3 flex items-center justify-center shrink-0 border border-white/5 overflow-hidden group-hover:border-accent-yellow/20 transition-colors">
                                        <img src={item.image_url} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500" alt={item.name} />
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                                        <div>
                                            <h4 className="text-xs font-black text-white truncate uppercase tracking-widest mb-1 italic group-hover:text-accent-yellow transition-colors">{item.name}</h4>
                                            <p className="text-lg font-black text-gray-400 italic">₹{item.retail_price}</p>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl h-10">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white"><Minus className="w-3 h-3" /></button>
                                                <span className="text-xs font-black w-8 text-center text-white">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-accent-yellow hover:text-white"><Plus className="w-3 h-3" /></button>
                                            </div>
                                            <button onClick={() => removeItem(item.id)} className="text-[10px] font-black text-gray-600 hover:text-red-500 uppercase tracking-widest border-b border-transparent hover:border-red-500 transition-all">Discard</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className="p-10 bg-navy-950/20 border-t border-white/5 space-y-8">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
                                    <span>Subtotal</span>
                                    <span>₹{total}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-gray-400 italic uppercase">To Pay</span>
                                    <span className="text-4xl font-black text-accent-yellow italic">₹{total}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => { closeCart(); navigate('/checkout'); }}
                                className="w-full bg-accent-yellow text-accent-black h-20 rounded-[30px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(250,204,21,0.2)]"
                            >
                                Secure Checkout <ArrowRight className="w-5 h-5" />
                            </button>
                            <p className="text-center text-[8px] font-black uppercase tracking-[0.5em] text-gray-700">Protected by Anubhav Traders Vikasnagar</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartSlideOut;
