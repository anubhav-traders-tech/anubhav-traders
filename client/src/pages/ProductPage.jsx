import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import useCartStore from '../store/cartStore';
import { ShoppingBag, ArrowLeft, Star, ShieldCheck, Truck, Zap, Plus, Minus, Package, Globe } from 'lucide-react';
import { products as mockProducts } from '../data/mock';

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart, openCart } = useCartStore();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error("Using mock product as fallback", err);
                const mock = mockProducts.find(p => p.id === parseInt(id));
                setProduct(mock);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center space-y-8 animate-pulse">
            <div className="w-20 h-20 border-4 border-white/5 border-t-accent-yellow rounded-full animate-spin"></div>
            <p className="text-[10px] font-black text-gray-700 uppercase tracking-[0.8em]">Authenticating Product Data...</p>
        </div>
    );

    if (!product) return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center space-y-12">
            <Package className="w-20 h-20 text-white/5" />
            <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter">ITEM NOT FOUND.</h1>
            <button
                onClick={() => navigate('/shop')}
                className="bg-accent-yellow text-accent-black px-12 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-2xl"
            >
                Back to Inventory
            </button>
        </div>
    );

    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
        openCart();
    };

    return (
        <div className="min-h-screen bg-[#050505] pt-40 pb-40">
            <div className="container-custom">
                <button
                    onClick={() => navigate(-1)}
                    className="group inline-flex items-center gap-4 text-gray-600 hover:text-accent-yellow mb-16 transition-all uppercase text-[10px] font-black tracking-[0.5em]"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
                    <span>Return to Strategic Catalog</span>
                </button>

                <div className="grid lg:grid-cols-12 gap-20 items-start">
                    {/* Visual Asset Section */}
                    <div className="lg:col-span-7 animate-slide-up">
                        <div className="relative aspect-square bg-navy-950/20 rounded-[80px] overflow-hidden border border-white/5 p-16 group shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-tr from-accent-yellow/5 to-transparent"></div>
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-[2s] ease-out relative z-10"
                            />

                            {/* Distribution Status */}
                            <div className="absolute bottom-12 left-12 z-20 flex items-center gap-4">
                                <span className="bg-accent-yellow text-accent-black text-[10px] font-black px-6 py-3 rounded-2xl uppercase tracking-[0.2em] shadow-[0_20px_40px_-10px_rgba(250,204,21,0.5)]">
                                    IN STOCK: VIKASNAGAR HUB
                                </span>
                            </div>

                            <div className="absolute top-12 right-12 z-20">
                                <div className="bg-navy-950/80 backdrop-blur-3xl p-6 rounded-[32px] border border-white/5 shadow-2xl">
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Official Brand</p>
                                    <p className="text-xl font-black text-white italic uppercase tracking-tighter">{product.brand}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Specifications Section */}
                    <div className="lg:col-span-5 space-y-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full">
                                <Globe className="w-3 h-3 text-accent-yellow" />
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">{product.category}</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.85]">
                                {product.name.split(' ').map((word, i) => i === 1 ? <span key={i} className="text-accent-yellow block">{word}</span> : word + ' ')}
                            </h1>
                            <div className="flex items-center gap-6">
                                <div className="flex text-accent-yellow gap-1">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className={`w-3 h-3 ${i === 5 ? 'text-gray-800' : 'fill-accent-yellow'}`} />)}
                                </div>
                                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest leading-none border-l border-white/10 pl-6">Verified Distribution</span>
                            </div>
                        </div>

                        <p className="text-xl text-gray-500 font-medium leading-[1.6] italic border-l-4 border-navy-800 pl-8">
                            {product.description || 'This premium grade product represents the pinnacle of FMCG excellence. Hand-picked and verified for our local distribution network in Uttarakhand.'}
                        </p>

                        <div className="pt-12 border-t border-white/5 space-y-10">
                            <div className="flex items-end justify-between">
                                <div className="space-y-2">
                                    <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em]">Official MSRP</p>
                                    <p className="text-7xl font-black text-white italic tracking-tighter">₹{product.retail_price}</p>
                                </div>
                                {product.bulk_price && (
                                    <div className="text-right p-6 bg-white/5 rounded-[32px] border border-accent-yellow/10">
                                        <p className="text-[10px] text-accent-yellow font-black uppercase tracking-[0.3em] mb-2">Bulk B2B Rate</p>
                                        <p className="text-3xl font-black text-accent-yellow italic tracking-tighter opacity-90">₹{product.bulk_price}</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch gap-6">
                                <div className="flex items-center bg-[#0d0d0d] border border-white/10 rounded-[30px] h-20 px-4 group">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-14 h-14 flex items-center justify-center text-gray-600 hover:text-white transition-all hover:bg-white/5 rounded-2xl"
                                    >
                                        <Minus className="w-5 h-5" />
                                    </button>
                                    <span className="text-2xl font-black text-white w-16 text-center tabular-nums">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-14 h-14 flex items-center justify-center text-accent-yellow hover:text-white transition-all hover:bg-white/5 rounded-2xl"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-accent-yellow text-accent-black h-20 rounded-[30px] font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 hover:bg-white hover:scale-105 transition-all shadow-[0_40px_80px_-20px_rgba(250,204,21,0.4)] active:scale-95"
                                >
                                    <ShoppingBag className="w-5 h-5" /> Add to Shopping Vault
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-6">
                            {[
                                { icon: <ShieldCheck className="w-5 h-5 text-accent-yellow" />, text: "Direct Official Sourcing" },
                                { icon: <Truck className="w-5 h-5 text-accent-yellow" />, text: "Express Hub Delivery" }
                            ].map((item, i) => (
                                <div key={i} className="p-8 bg-white/5 rounded-[40px] border border-white/5 flex flex-col items-center text-center space-y-4 hover:bg-navy-950/20 transition-all">
                                    <div className="w-12 h-12 bg-navy-950 rounded-2xl flex items-center justify-center border border-white/10">{item.icon}</div>
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
