import React, { useState } from 'react';
import useCartStore from '../store/cartStore';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, clearCart } = useCartStore();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ address: '', phone: '' });

    const total = cart.reduce((acc, item) => acc + (item.retail_price * item.quantity), 0);

    const handleCheckout = async (e) => {
        e.preventDefault();
        if (!user) return alert('Please login to checkout');
        if (cart.length === 0) return alert('Cart is empty');

        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/checkout', {
                userId: user.id || 'anonymous', // In real app, enforce auth
                orderType: 'b2c',
                items: cart.map(i => ({ productId: i.id, quantity: i.quantity }))
            });

            alert('Order successful! Invoice generated.');
            // Open invoice in new tab
            window.open(`http://localhost:5000${res.data.invoiceUrl}`, '_blank');
            clearCart();
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Checkout failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-32 px-6 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-3xl font-bold text-white mb-8 text-center uppercase tracking-widest">Secure Checkout</h1>
            <div className="grid md:grid-cols-2 gap-10">
                <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
                    <h2 className="text-xl font-bold text-white mb-6">Delivery Details</h2>
                    <form onSubmit={handleCheckout} className="space-y-4">
                        <input
                            required
                            type="text"
                            placeholder="Full Address"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-orange-500"
                            value={form.address}
                            onChange={e => setForm({ ...form, address: e.target.value })}
                        />
                        <input
                            required
                            type="text"
                            placeholder="Phone Number"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-orange-500"
                            value={form.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                        />
                        <button
                            disabled={loading}
                            className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : `Pay ₹${total}`}
                        </button>
                    </form>
                </div>

                <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 h-fit">
                    <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
                    <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                        {cart.map(item => (
                            <div key={item.id} className="flex justify-between items-center text-sm border-b border-gray-800 pb-2">
                                <span className="text-gray-400">{item.name} x {item.quantity}</span>
                                <span className="text-white font-bold">₹{item.retail_price * item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xl font-bold text-white pt-4">
                        <span>Grand Total</span>
                        <span className="text-orange-500">₹{total}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
