import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const { user, loading } = useAuth();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && (!user || user.role !== 'admin')) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then(res => setProducts(res.data))
            .catch(console.error);
    }, []);

    if (loading || !user) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                    <h2 className="font-bold text-gray-800">Product Inventory</h2>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded text-sm mb-4">Add Product</button>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Retail Price</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Bulk Price</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Stock</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.map(product => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 font-medium">{product.name}</td>
                                <td className="px-6 py-4">₹{product.priceRetail}</td>
                                <td className="px-6 py-4">₹{product.priceBulk}</td>
                                <td className="px-6 py-4">{product.stock}</td>
                                <td className="px-6 py-4">
                                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
