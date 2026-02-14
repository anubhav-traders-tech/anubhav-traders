import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import useCartStore from '../store/cartStore';

const BrandPage = () => {
    const { slug } = useParams();
    const [brand, setBrand] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addItem, openCart } = useCartStore();

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            try {
                const bRes = await axios.get(`http://localhost:5000/api/brands/${slug}`);
                setBrand(bRes.data);
                const pRes = await axios.get(`http://localhost:5000/api/brands/${slug}/products`);
                setProducts(pRes.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [slug]);

    if (loading) return <div className="pt-32 text-center text-white">Loading...</div>;
    if (!brand) return <div className="pt-32 text-center text-white">Brand Not Found</div>;

    return (
        <div className="pt-24 px-6 max-w-7xl mx-auto min-h-screen">
            <div className="mb-12 text-center">
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mb-4 uppercase">
                    {brand.name}
                </h1>
                <div className="flex justify-center gap-4 overflow-x-auto pb-4">
                    <Link to={`/brand/${brand.slug}`} className="px-6 py-2 rounded-full bg-orange-600 text-white font-medium">All</Link>
                    {brand.Categories?.map(cat => (
                        <Link
                            key={cat.id}
                            to={`/brand/${brand.slug}/category/${cat.slug}`}
                            className="px-6 py-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                        >
                            {cat.name}
                        </Link>
                    ))}
                </div>
            </div>

            {products.length === 0 ? (
                <div className="text-center bg-gray-900/50 p-20 rounded-3xl border border-gray-800">
                    <h2 className="text-2xl text-gray-500">No products found for this brand yet.</h2>
                    <p className="text-gray-600 mt-2">Our sync is scheduled weekly, check back soon!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <div key={product.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all p-4">
                            <Link to={`/product/${product.slug}`}>
                                <img
                                    src={product.image_url ? `http://localhost:5000${product.image_url}` : '/placeholder.png'}
                                    alt={product.name}
                                    className="w-full h-48 object-contain mb-4"
                                />
                                <h3 className="text-white font-semibold truncate">{product.name}</h3>
                            </Link>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-orange-500 font-bold text-lg">₹{product.retail_price}</span>
                                <button
                                    onClick={() => { addItem(product); openCart(); }}
                                    className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-700 transition-colors"
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BrandPage;
