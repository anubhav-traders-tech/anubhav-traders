import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Search } from 'lucide-react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products');
                setProducts(res.data);
            } catch (err) {
                console.error("Failed to load products");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Product Catalog</h1>
                {/* Placeholder for Search/Filter */}
                <div className="relative">
                    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="pl-10 p-2 border rounded-lg w-64 focus:outline-none focus:border-primary"
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20">Loading Catalog...</div>
            ) : (
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <div key={product.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                            <div className="h-48 bg-gray-100 flex items-center justify-center">
                                {product.image_url ? (
                                    <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
                                ) : (
                                    <span className="text-gray-400">No Image</span>
                                )}
                            </div>
                            <div className="p-4">
                                <div className="text-xs text-secondary font-bold uppercase mb-1">{product.Category?.name || 'General'}</div>
                                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">{product.price_range || 'Price on Request'}</span>
                                    <span className={`text-xs px-2 py-1 rounded ${product.stock_status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {product.stock_status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;
