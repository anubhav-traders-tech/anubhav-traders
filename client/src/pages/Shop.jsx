import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Search, Package, ShoppingCart } from 'lucide-react';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products');
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
        const brandName = product.Brand?.name || '';
        const categoryName = product.Category?.name || 'General';
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            brandName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || categoryName === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const categories = ['All', ...new Set(products.map(p => p.Category?.name).filter(Boolean))];

    return (
        <div className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-indigo-950">Our Product Catalog</h1>
                    <p className="text-gray-500 mt-1">Browse our extensive range of authentic FMGC & Ayurvedic products</p>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name, brand..."
                            className="pl-10 p-3 w-full border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 bg-white shadow-sm"
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
                        className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${categoryFilter === cat
                            ? 'bg-orange-500 text-white shadow-md'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                            <div className="h-56 bg-gradient-to-br from-indigo-50 to-gray-50 flex items-center justify-center relative overflow-hidden">
                                {product.image_url ? (
                                    <img src={product.image_url} alt={product.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <Package className="text-indigo-200 h-20 w-20" />
                                )}
                                <div className="absolute top-4 right-4">
                                    <span className="bg-white/90 backdrop-blur text-[10px] font-bold px-3 py-1 rounded-full shadow-sm border border-gray-100 uppercase tracking-wider text-indigo-600">
                                        {product.Brand?.name || 'Generic'}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="text-[10px] font-bold text-orange-600 mb-1 uppercase tracking-widest">
                                    {product.Category?.name || 'General'}
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors" title={product.name}>
                                    {product.name}
                                </h3>
                                <p className="text-sm text-gray-500 mb-6 line-clamp-2 h-10 leading-relaxed">
                                    {product.description || 'Premium quality product distributed by Anubhav Traders.'}
                                </p>

                                <div className="flex justify-between items-end bg-gray-50 -mx-6 -mb-6 p-6 mt-2">
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Wholesale Price</p>
                                        <p className="text-2xl font-black text-indigo-950">
                                            {product.retail_price ? `₹${product.retail_price.toLocaleString()}` : 'Ask Price'}
                                        </p>
                                    </div>
                                    <button className="bg-orange-500 text-white p-3 rounded-xl hover:bg-indigo-900 transition-all shadow-lg shadow-orange-500/20 hover:shadow-indigo-900/20">
                                        <ShoppingCart size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && filteredProducts.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <Package className="mx-auto h-20 w-20 text-gray-200 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900">No products found</h3>
                    <p className="text-gray-500">Try adjusting your search or category filter.</p>
                </div>
            )}
        </div>
    );
};

export default Shop;
