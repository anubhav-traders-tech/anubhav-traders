import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { ArrowLeft, Filter, Phone } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';

const BrandPage = () => {
    const { slug } = useParams();
    const [brand, setBrand] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            try {
                const bRes = await api.get(`/brands/${slug}`);
                setBrand(bRes.data);
                const pRes = await api.get(`/brands/${slug}/products`);
                setProducts(pRes.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [slug]);

    if (loading) return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Loading Brand Details...</p>
        </div>
    );

    if (!brand) return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-6">
            <h1 className="text-3xl font-bold text-slate-900">Brand Not Found</h1>
            <p className="text-slate-500">The brand you are looking for does not exist in our catalog.</p>
            <Link to="/brands" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors font-semibold">
                Back to All Brands
            </Link>
        </div>
    );

    return (
        <div className="bg-slate-50 min-h-screen py-10 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Back Link */}
                <div className="mb-6">
                    <Link to="/brands" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> back to brands
                    </Link>
                </div>

                {/* Brand Banner */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
                    <div className="shrink-0">
                        {brand.image ? (
                            <img src={brand.image} alt={brand.name} className="w-32 h-32 object-cover rounded-full border border-gray-100 shadow-sm" />
                        ) : (
                            <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center">
                                <span className="text-4xl font-bold text-slate-400">{brand.name?.charAt(0)}</span>
                            </div>
                        )}
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{brand.name}</h1>
                        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                            {brand.description}
                        </p>
                    </div>
                </div>

                {/* Categories / Filters (Optional) */}
                {brand.Categories && brand.Categories.length > 0 && (
                    <div className="mb-10 flex flex-wrap gap-3 items-center">
                        <Filter className="w-5 h-5 text-slate-400 mr-2" />
                        <Link to={`/brand/${brand.slug}`} className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-semibold shadow-sm">
                            All Products
                        </Link>
                        {brand.Categories.map(cat => (
                            <Link key={cat.id} to={`/brand/${brand.slug}/category/${cat.slug}`} className="px-4 py-2 bg-white text-slate-600 hover:text-blue-600 border border-gray-200 rounded text-sm font-medium transition-colors">
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Product Grid */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b border-gray-200 pb-4">Products Inventory</h2>
                    {products.length === 0 ? (
                        <div className="bg-white rounded-lg border border-gray-100 p-12 text-center">
                            <p className="text-slate-500 font-medium">No products available for this brand at the moment.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Inquiry CTA Section */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-10 text-center flex flex-col items-center">
                    <Phone className="w-10 h-10 text-blue-600 mb-4" />
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">Interested in Bulk Supply?</h2>
                    <p className="text-slate-600 mb-6 max-w-xl">
                        Send us an inquiry for wholesale rates, MOQ details, and dealership options for {brand.name} and other brands.
                    </p>
                    <Link to="/inquiry" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded font-bold shadow-sm transition-colors">
                        Send Specific Inquiry
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default BrandPage;
