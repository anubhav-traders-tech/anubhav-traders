import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Search, Package, SlidersHorizontal, PackageSearch } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { products as mockProducts } from '../data/mock';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products');
                const fetchedProducts = Array.isArray(res.data) ? res.data : [];

                if (fetchedProducts.length === 0) {
                    setProducts(mockProducts);
                } else {
                    setProducts(fetchedProducts);
                }
            } catch (err) {
                console.error("Failed to load products, using local vault", err);
                setProducts(mockProducts);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product => {
        const brandName = product.Brand?.name || product.brand || '';
        const categoryName = product.Category?.name || product.category || 'General';
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            brandName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || categoryName === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const categories = ['All', ...new Set(products.map(p => p.Category?.name || p.category).filter(Boolean))];

    return (
        <div className="bg-slate-50 min-h-screen py-20 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Product Catalog</h1>
                    <div className="w-20 h-1 bg-blue-600 mx-auto rounded mb-6"></div>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Explore our extensive range of high-quality FMCG products, ready for bulk distribution and wholesale supply.
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-12">
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">

                        {/* Search Input */}
                        <div className="relative w-full md:w-96">
                            <input
                                type="text"
                                placeholder="Search products or brands..."
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-gray-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>

                        {/* Category Pills */}
                        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                            <span className="text-slate-500 font-semibold text-sm flex items-center mr-2">
                                <SlidersHorizontal className="w-4 h-4 mr-2" /> Filter:
                            </span>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategoryFilter(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${categoryFilter === cat
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Product Grid */}
                {loading ? (
                    <div className="flex flex-col justify-center items-center h-64 space-y-4">
                        <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Loading Catalog...</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-100 p-16 text-center shadow-sm">
                        <PackageSearch className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">No Products Found</h3>
                        <p className="text-slate-500 mb-6 max-w-md mx-auto">
                            We couldn't find any products matching your current search or category filters.
                        </p>
                        <button
                            onClick={() => { setSearchTerm(''); setCategoryFilter('All'); }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Shop;
