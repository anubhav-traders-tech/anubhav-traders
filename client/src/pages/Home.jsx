import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, ShieldCheck, Truck, Star, Phone, MapPin } from 'lucide-react';
import { products, brands } from '../data/mock';
import ProductCard from '../components/ui/ProductCard';

export default function Home() {
    const featuredProducts = products.slice(0, 4);

    return (
        <div className="bg-[#0a0a0a] text-white">
            {/* HERO SECTION - REDESIGNED */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-navy-900/50 via-accent-black to-accent-black z-0"></div>

                {/* Abstract Background Element */}
                <div className="absolute -top-[10%] -right-[5%] w-[60%] h-[120%] bg-navy-800/20 blur-[120px] rounded-full rotate-12"></div>
                <div className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[80%] bg-accent-yellow/5 blur-[100px] rounded-full"></div>

                <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-16 items-center py-20">
                    <div className="space-y-10 animate-slide-up">
                        <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-2xl px-5 py-2 rounded-full border border-white/10 shadow-2xl">
                            <span className="w-2.5 h-2.5 rounded-full bg-accent-yellow animate-pulse"></span>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-300">Trusted Trader in Vikasnagar</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter">
                            THE HOUSE OF <br />
                            <span className="text-accent-yellow">PREMIUM</span> <br />
                            TRADING.
                        </h1>

                        <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl font-medium">
                            Anubhav Traders brings the finest selection of Patanjali, Sri Sri Tattva, and premium FMCG brands directly to your doorstep in Vikasnagar.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 pt-6">
                            <Link to="/shop" className="group bg-accent-yellow text-accent-black px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_-15px_rgba(250,204,21,0.3)]">
                                Shop Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </Link>
                            <Link to="/contact" className="bg-white/5 border border-white/10 text-white hover:bg-white/10 px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center">
                                Direct Inquiry
                            </Link>
                        </div>

                        <div className="flex items-center gap-10 pt-8">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className={`w-12 h-12 rounded-full border-4 border-accent-black bg-navy-800 flex items-center justify-center text-[10px] font-bold`}>BRAND</div>
                                ))}
                            </div>
                            <div className="h-10 w-[1px] bg-white/10"></div>
                            <div>
                                <p className="text-xl font-black">7+ Brands</p>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Official Distribution</p>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block relative">
                        <div className="relative z-10 aspect-square rounded-[40px] overflow-hidden border border-white/10 shadow-2xl group">
                            <img
                                src="https://images.unsplash.com/photo-1604719312566-b7cbacc44946?auto=format&fit=crop&q=80"
                                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100"
                                alt="Store"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-accent-black via-transparent to-transparent"></div>
                            <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10">
                                <p className="text-accent-yellow font-black text-xs uppercase tracking-[0.3em] mb-3">Our Mission</p>
                                <h3 className="text-2xl font-black mb-4">Quality & Trust Delivered.</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">Serving Vikasnagar since 2014 with authentic products and unbeatable local service.</p>
                            </div>
                        </div>
                        {/* Decorative Badge */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-yellow rounded-full flex items-center justify-center rotate-12 shadow-2xl animate-pulse-slow">
                            <div className="text-accent-black text-center">
                                <p className="text-xs font-black uppercase tracking-tighter">100%</p>
                                <p className="text-xl font-black uppercase leading-none">Genuine</p>
                                <p className="text-[10px] font-bold uppercase">Products</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PARTNERS TICKER */}
            <section className="py-10 bg-accent-yellow overflow-hidden">
                <div className="flex whitespace-nowrap animate-infinite-scroll">
                    {[...brands, ...brands].map((brand, i) => (
                        <div key={i} className="flex items-center gap-4 mx-12">
                            <span className="text-accent-black font-black text-2xl uppercase tracking-tighter italic">{brand.name}</span>
                            <div className="w-2 h-2 rounded-full bg-accent-black"></div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ABOUT ANUBHAV TRADERS */}
            <section className="py-32 relative">
                <div className="container-custom grid md:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                            LOCAL ROOTS. <br />
                            <span className="text-gray-600">PREMIUM REACH.</span>
                        </h2>
                        <div className="grid gap-6">
                            <div className="p-8 bg-white/5 hover:bg-white/10 rounded-3xl border border-white/10 transition-colors group">
                                <div className="w-12 h-12 bg-accent-yellow rounded-2xl flex items-center justify-center mb-6 text-accent-black group-hover:scale-110 transition-transform">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <h4 className="text-xl font-black mb-2 uppercase tracking-tight">Main Market, Vikasnagar</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">Located in the heart of Vikasnagar, we are the primary hub for authentic FMCG distribution.</p>
                            </div>
                            <div className="p-8 bg-white/5 hover:bg-white/10 rounded-3xl border border-white/10 transition-colors group">
                                <div className="w-12 h-12 bg-accent-yellow rounded-2xl flex items-center justify-center mb-6 text-accent-black group-hover:scale-110 transition-transform">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <h4 className="text-xl font-black mb-2 uppercase tracking-tight">Official Distribution</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">Direct partner for Patanjali Aastha, Sri Sri Tattva, and Sifi Namkeen. No middleman, just quality.</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-[4/5] bg-navy-900 rounded-[60px] p-2 overflow-hidden border border-white/10">
                            <img
                                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80"
                                className="w-full h-full object-cover rounded-[55px] opacity-40"
                                alt="Service"
                            />
                            <div className="absolute inset-x-8 bottom-8 p-10 bg-accent-black/80 backdrop-blur-2xl rounded-[40px] border border-white/10 text-center">
                                <p className="text-accent-yellow font-black text-5xl mb-2">10+</p>
                                <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-xs">Years of Excellence</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURED PRODUCTS */}
            <section className="py-32 bg-white text-accent-black rounded-[60px] mx-4 md:mx-6 mb-10 overflow-hidden">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div>
                            <p className="text-orange-600 font-black text-xs uppercase tracking-[0.4em] mb-4">New Arrivals</p>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                                TOP <br />
                                COLLECTIONS.
                            </h2>
                        </div>
                        <Link to="/shop" className="group flex items-center gap-4 text-xs font-black uppercase tracking-widest border-b-2 border-accent-black pb-2 hover:gap-6 transition-all">
                            View All Products <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            </section>

            {/* BRANDS SHOWCASE */}
            <section className="py-32 bg-[#050505]">
                <div className="container-custom text-center space-y-20">
                    <div className="max-w-2xl mx-auto space-y-6">
                        <h2 className="text-5xl font-black tracking-tighter uppercase italic">Our Powerhouse Partners</h2>
                        <p className="text-gray-500 font-medium leading-relaxed">We exclusively deal with brands that define quality and tradition. Each product on our shelf is handpicked for our Vikasnagar family.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {brands.map((brand) => (
                            <div key={brand.id} className="group relative aspect-video bg-white/5 rounded-[40px] overflow-hidden border border-white/10 p-1">
                                <div className="absolute inset-0 bg-navy-900/40 group-hover:bg-accent-yellow/10 transition-colors z-10"></div>
                                <img src={brand.image} alt={brand.name} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 opacity-30 group-hover:opacity-100 grayscale hover:grayscale-0" />
                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8">
                                    <h3 className="text-2xl font-black uppercase italic group-hover:text-accent-yellow transition-colors">{brand.name}</h3>
                                    <p className="text-xs font-bold text-gray-500 mt-2 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{brand.description}</p>
                                </div>
                                <div className="absolute bottom-6 right-6 z-30 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                                    <Link to={`/shop?brand=${brand.slug}`} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-accent-black">
                                        <ArrowRight className="w-6 h-6" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-32 container-custom">
                <div className="bg-accent-yellow rounded-[60px] p-16 md:p-32 text-accent-black text-center relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(250,204,21,0.4)]">
                    <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[200%] bg-white/20 blur-[150px] rounded-full"></div>
                    <div className="relative z-10 max-w-4xl mx-auto space-y-10">
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none italic uppercase">Ready to upgrade your shopping?</h2>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <Link to="/contact" className="bg-accent-black text-white px-16 py-6 rounded-[30px] font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl">
                                Get in touch
                            </Link>
                            <Link to="/shop" className="bg-white text-accent-black px-12 py-6 rounded-[30px] font-black text-sm uppercase tracking-widest hover:bg-accent-black hover:text-white transition-all shadow-xl">
                                Explore Shop
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Bottom Info */}
            <section className="py-20 border-t border-white/5 opacity-50">
                <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">
                    <div className="flex items-center gap-4">
                        <Phone className="w-4 h-4" /> +91-XXXXXXXXXX
                    </div>
                    <div>Anubhav Traders Vikasnagar © 2026</div>
                    <div className="flex items-center gap-4">
                        <MapPin className="w-4 h-4" /> Uttarakhand, India
                    </div>
                </div>
            </section>
        </div>
    );
}
