import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useCartStore from '../store/cartStore';

const ProductPage = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addItem, openCart } = useCartStore();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/products/${slug}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) return <div className="pt-32 text-center text-white">Loading...</div>;
    if (!product) return <div className="pt-32 text-center text-white">Product not found</div>;

    return (
        <div className="pt-32 px-6 max-w-7xl mx-auto min-h-screen">
            <div className="grid md:grid-cols-2 gap-12 bg-gray-900/50 p-10 rounded-3xl border border-gray-800">
                <div className="bg-white rounded-2xl p-6 flex items-center justify-center h-[400px]">
                    <img
                        src={product.image_url ? `http://localhost:5000${product.image_url}` : '/placeholder.png'}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-2">{product.Brand?.name} | {product.Category?.name}</span>
                    <h1 className="text-4xl font-bold text-white mb-6 uppercase">{product.name}</h1>
                    <p className="text-gray-400 mb-8 leading-relaxed">{product.description || 'No description available for this product.'}</p>

                    <div className="flex items-end gap-4 mb-8">
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-xs uppercase mb-1">Standard Price</span>
                            <span className="text-3xl font-bold text-white">₹{product.retail_price}</span>
                        </div>
                        {product.bulk_price && (
                            <div className="flex flex-col">
                                <span className="text-green-500 text-xs uppercase mb-1 font-bold">Bulk Rate Available</span>
                                <span className="text-2xl font-bold text-green-500">₹{product.bulk_price}</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-auto flex gap-4">
                        <button
                            onClick={() => { addItem(product); openCart(); }}
                            className="flex-1 bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition-all active:scale-95"
                        >
                            Add To Basket
                        </button>
                        {product.moq > 1 && (
                            <div className="px-6 py-4 bg-gray-800 rounded-xl flex flex-col items-center justify-center border border-gray-700">
                                <span className="text-gray-500 text-[10px] uppercase font-bold">MOQ</span>
                                <span className="text-white font-bold">{product.moq} Units</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
