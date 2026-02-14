import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Search, Filter, Package, ShoppingCart } from 'lucide-react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products');
                // Ensure we handle the response correctly (array of products)
                setProducts(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("Failed to load products", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Our Catalog</h1>
                    <p className="text-gray-500 mt-1">Browse our extensive range of products</p>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name, brand..."
                            className="pl-10 p-3 w-full border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setCategoryFilter(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${categoryFilter === cat
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                            <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
                                <Package className="text-gray-300 h-16 w-16" />
                                <div className="absolute top-3 right-3">
                                    <span className="bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded-md shadow-sm border border-gray-100">
                                        {product.brand || 'Generic'}
                                    </span>
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="text-xs font-medium text-primary mb-1 uppercase tracking-wider">
                                    {product.category || 'General'}
                                </div>
                                <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-1" title={product.name}>
                                    {product.name}
                                </h3>
                                <p className="text-sm text-gray-500 mb-4 line-clamp-2 h-10">
                                    {product.description || 'No description available.'}
                                </p>

                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium">Retail Price</p>
                                        <p className="text-xl font-bold text-gray-900">
                                            {product.retail_price ? `₹${product.retail_price.toLocaleString()}` : 'Ask Price'}
                                        </p>
                                    </div>
                                    <button className="bg-gray-900 text-white p-2 rounded-lg hover:bg-primary transition-colors">
                                        <ShoppingCart size={20} />
                                    </button>
                                </div>
                                {product.sku && (
                                    <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400">
                                        <span>SKU: {product.sku}</span>
                                        <span>MOQ: {product.moq}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && filteredProducts.length === 0 && (
                <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                    <Package className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-lg font-bold text-gray-800">No products found</h3>
                    <p className="text-gray-500">Try adjusting your search or category filter.</p>
                </div>
            )}
        </div>
    );
};

export default Products;
