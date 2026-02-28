import React, { useState } from 'react';
import useCartStore from '../store/cartStore';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, CreditCard, ShoppingBag, ArrowLeft } from 'lucide-react';

const Checkout = () => {
    const { cart, clearCart } = useCartStore();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [form, setForm] = useState({
        address: '',
        phone: '',
        city: 'Vikasnagar',
        paymentMethod: 'COD'
    });

    const subtotal = cart.reduce((acc, item) => acc + (item.retail_price * item.quantity), 0);
    const delivery = subtotal > 500 ? 0 : 40;
    const total = subtotal + delivery;

    const handleCheckout = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const orderData = {
                items: cart.map(i => ({
                    productId: i.id,
                    quantity: i.quantity,
                    price: i.retail_price
                })),
                total_amount: total,
                shipping_address: `${form.address}, ${form.city}`,
                phone: form.phone,
                order_type: 'b2c'
            };

            const res = await api.post('/ecommerce/checkout', orderData);

            setSuccess(true);
            clearCart();

            // In a real app, the backend would return a PDF URL
            if (res.data.invoiceUrl) {
                window.open(`http://localhost:5000${res.data.invoiceUrl}`, '_blank');
            }

            setTimeout(() => navigate('/'), 3000);
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.error || 'Checkout failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-accent-black flex items-center justify-center p-6 text-center">
                <div className="max-w-md w-full animate-fade-in space-y-8">
                    <div className="w-24 h-24 bg-accent-yellow rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(250,204,21,0.3)]">
                        <ShieldCheck className="w-12 h-12 text-accent-black" />
                    </div>
                    <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">Order Success!</h1>
                    <p className="text-gray-400 font-medium">Thank you for choosing Anubhav Traders. Your order for Vikasnagar delivery is being processed. Returning to home...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-accent-black pt-32 pb-20 px-4">
            <div className="container-custom">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-accent-yellow mb-10 transition-colors uppercase text-[10px] font-black tracking-widest">
                    <ArrowLeft className="w-4 h-4" /> Back to Shop
                </button>

                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    {/* Left Column: Form */}
                    <div className="lg:col-span-7 space-y-10">
                        <div className="space-y-2">
                            <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter">Checkout.</h1>
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Secure Vikasnagar Delivery Service</p>
                        </div>

                        <form onSubmit={handleCheckout} className="space-y-8">
                            <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 space-y-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 bg-accent-yellow rounded-xl flex items-center justify-center text-accent-black">
                                        <Truck className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl font-black text-white uppercase italic">Shipping Info</h2>
                                </div>

                                <div className="space-y-4">
                                    <input
                                        required
                                        type="text"
                                        placeholder="STREET ADDRESS / HOUSE NO."
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-white focus:ring-2 focus:ring-accent-yellow/50 focus:border-accent-yellow outline-none text-xs font-bold uppercase tracking-widest placeholder:text-gray-600 transition-all"
                                        value={form.address}
                                        onChange={e => setForm({ ...form, address: e.target.value })}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            readOnly
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-gray-500 outline-none text-xs font-bold uppercase tracking-widest"
                                            value="VIKASNAGAR"
                                        />
                                        <input
                                            required
                                            type="tel"
                                            placeholder="PHONE NUMBER"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-white focus:ring-2 focus:ring-accent-yellow/50 focus:border-accent-yellow outline-none text-xs font-bold uppercase tracking-widest placeholder:text-gray-600 transition-all"
                                            value={form.phone}
                                            onChange={e => setForm({ ...form, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 space-y-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 bg-accent-yellow rounded-xl flex items-center justify-center text-accent-black">
                                        <CreditCard className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl font-black text-white uppercase italic">Payment Method</h2>
                                </div>
                                <div className="p-6 bg-accent-yellow rounded-2xl flex items-center justify-between group cursor-default">
                                    <div className="flex items-center gap-4">
                                        <div className="w-6 h-6 rounded-full border-4 border-accent-black flex items-center justify-center">
                                            <div className="w-2 h-2 bg-accent-black rounded-full"></div>
                                        </div>
                                        <span className="text-accent-black font-black uppercase tracking-widest text-xs">Cash on Delivery</span>
                                    </div>
                                    <p className="text-[10px] font-black uppercase text-accent-black/50">Vikasnagar Only</p>
                                </div>
                            </div>

                            <button
                                disabled={loading || cart.length === 0}
                                className="w-full bg-accent-yellow text-accent-black font-black py-6 rounded-[30px] uppercase tracking-[0.3em] text-sm hover:bg-white transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                            >
                                {loading ? 'PROCESSING...' : `CONFIRM ORDER - ₹${total}`}
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Summary */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-40 bg-navy-900 rounded-[50px] p-12 border border-white/5 shadow-2xl overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-yellow/5 blur-3xl group-hover:bg-accent-yellow/10 transition-colors"></div>

                            <h2 className="text-2xl font-black text-white uppercase italic mb-8">Order Summary</h2>

                            <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                                {cart.map(item => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <div className="w-16 h-16 bg-white/5 rounded-2xl overflow-hidden p-2 flex-shrink-0">
                                            <img src={item.image_url} className="w-full h-full object-contain" alt={item.name} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-black text-white uppercase line-clamp-1">{item.name}</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase">{item.quantity} UNITS</p>
                                        </div>
                                        <p className="font-black text-white italic">₹{item.retail_price * item.quantity}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-10 border-t border-white/10">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                                    <span>Delivery</span>
                                    <span>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
                                </div>
                                <div className="flex justify-between text-3xl font-black text-accent-yellow italic pt-4">
                                    <span>TOTAL</span>
                                    <span>₹{total}</span>
                                </div>
                            </div>

                            <div className="mt-10 p-4 bg-white/5 rounded-2xl flex items-center gap-4 border border-white/5">
                                <ShieldCheck className="text-accent-yellow w-5 h-5" />
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Secure local distribution guarantee</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
