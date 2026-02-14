import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const B2BOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;
        axios.get(`http://localhost:5000/api/b2b/orders/${user.id || 'anonymous'}`)
            .then(res => setOrders(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [user]);

    if (loading) return <div className="text-white">Fetching orders...</div>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-8">Purchase History</h1>
            <div className="space-y-4">
                {orders.map(order => (
                    <div key={order.id} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 flex justify-between items-center group hover:border-gray-700 transition-all">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-white font-bold">{order.Invoice?.invoice_number}</span>
                                <span className="bg-green-600/20 text-green-500 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">{order.status}</span>
                            </div>
                            <p className="text-gray-500 text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                            <p className="text-orange-500 font-bold mt-2">₹{order.total_amount}</p>
                        </div>
                        <a
                            href={`http://localhost:5000${order.Invoice?.pdf_path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-800 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-white hover:text-black transition-all"
                        >
                            Download Invoice
                        </a>
                    </div>
                ))}
                {orders.length === 0 && <div className="text-gray-500 py-10 text-center border-2 border-dashed border-gray-800 rounded-3xl">No bulk orders found.</div>}
            </div>
        </div>
    );
};

export default B2BOrders;
