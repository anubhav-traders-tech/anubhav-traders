import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const B2BProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        axios.get('http://localhost:5000/api/b2b/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const handleBulkOrder = async (p) => {
        if (!user) return alert('Login as B2B to order');
        if (p.moq > p.stock) return alert('Insufficient stock');

        try {
            const res = await axios.post('http://localhost:5000/api/checkout', {
                userId: user.id || 'anonymous',
                orderType: 'b2b',
                items: [{ productId: p.id, quantity: p.moq }]
            });
            alert(`Bulk Order Placed! Invoice: INV-${p.id.split('-')[0]}`);
            window.open(`http://localhost:5000${res.data.invoiceUrl}`, '_blank');
        } catch (e) {
            alert('Bulk order failed');
        }
    };

    if (loading) return <div className="text-white">Loading B2B Catalog...</div>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-8">B2B Wholesale Catalog</h1>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-800 text-gray-400 uppercase text-xs">
                        <tr>
                            <th className="p-4 rounded-tl-xl border-b border-gray-700">Product</th>
                            <th className="p-4 border-b border-gray-700">Brand</th>
                            <th className="p-4 border-b border-gray-700">Retail</th>
                            <th className="p-4 border-b border-gray-700 text-green-500">Wholesale</th>
                            <th className="p-4 border-b border-gray-700">MOQ</th>
                            <th className="p-4 rounded-tr-xl border-b border-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-900/40 text-gray-300">
                        {products.map(p => (
                            <tr key={p.id} className="hover:bg-gray-800/50 transition-colors border-b border-gray-800">
                                <td className="p-4 font-bold text-white">{p.name}</td>
                                <td className="p-4">{p.Brand?.name}</td>
                                <td className="p-4 text-gray-500 line-through">₹{p.retail_price}</td>
                                <td className="p-4 text-green-500 font-bold">₹{p.bulk_price || p.retail_price * 0.8}</td>
                                <td className="p-4"><span className="bg-gray-800 px-3 py-1 rounded text-xs">{p.moq} Units</span></td>
                                <td className="p-4">
                                    <button
                                        onClick={() => handleBulkOrder(p)}
                                        className="bg-green-600/20 hover:bg-green-600 text-green-500 hover:text-white px-4 py-1 rounded-full border border-green-600/50 text-xs font-bold transition-all"
                                    >
                                        Bulk Buy
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default B2BProducts;
