import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Truck, Clock, Award } from 'lucide-react';
import { products, categories, brands } from '../data/mock';
import ProductCard from '../components/ui/ProductCard';
import BrandCard from '../components/ui/BrandCard';

export default function Home() {
    const featuredProducts = products.slice(0, 4);

    return (
        <div className="animate-fade-in pb-20">

            {/* HERO SECTION */}
            <section className="relative bg-indigo-950 text-white overflow-hidden min-h-[600px] flex items-center">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1604719312566-b7cbacc44946?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-950 via-indigo-900/90 to-transparent"></div>

                <div className="container-custom relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 animate-slide-up">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium text-orange-200 border border-white/10 shadow-lg">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                            Official Distributors for Patanjali & Sri Sri Tattva
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                            Premium FMCG & <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200">Ayurvedic</span> Wholesale
                        </h1>

                        <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
                            Authentic products, best wholesale rates, and reliable delivery across Uttarakhand.
                            Trusted by 500+ retailers for over 10 years.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link to="/shop" className="btn bg-orange-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-600 shadow-xl shadow-orange-900/20 transition-all transform hover:-translate-y-1">
                                Shop Retail
                            </Link>
                            <Link to="/b2b" className="btn bg-white/10 text-white border border-white/20 backdrop-blur-md px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 hover:border-white/40 transition-all">
                                Business Portal
                            </Link>
                        </div>

                        <div className="flex items-center gap-6 pt-4 text-sm text-gray-400">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gray-600 border-2 border-indigo-950"></div>
                                ))}
                            </div>
                            <p>Trusted by 10k+ customers</p>
                        </div>
                    </div>

                    {/* Hero Image / Graphic */}
                    <div className="hidden md:block relative animate-fade-in delay-200">
                        <div className="relative z-10 bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 shadow-2xl skew-y-3 transform hover:skew-y-0 transition-transform duration-700">
                            <div className="grid grid-cols-2 gap-4">
                                <img src={products[0].image} className="rounded-xl shadow-lg transform translate-y-8" />
                                <img src={products[1].image} className="rounded-xl shadow-lg transform -translate-y-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUST INDICATORS */}
            <section className="bg-white border-b border-gray-100 py-12 -mt-8 relative z-20 mx-4 md:mx-0 rounded-t-3xl md:rounded-none shadow-xl md:shadow-none">
                <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { icon: ShieldCheck, title: "100% Authentic", desc: "Direct from Brands" },
                        { icon: Truck, title: "Fast Delivery", desc: "Within 24 Hours" },
                        { icon: Award, title: "Best Prices", desc: "Wholesale Rates" },
                        { icon: Clock, title: "10+ Years", desc: "Of Trust & Service" },
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">{item.title}</h4>
                                <p className="text-sm text-gray-500">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* BRANDS CAROUSEL */}
            <section className="py-20 bg-gray-50/50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Brands We Distribute</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">We are authorized distributors for India's leading FMCG and Ayurvedic brands.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                        {brands.map((brand) => (
                            <BrandCard key={brand.id} brand={brand} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CATEGORIES GRID */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="flex justify-between items-end mb-12 px-2">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Shop by Category</h2>
                            <p className="text-gray-500">Explore our wide range of authentic products</p>
                        </div>
                        <Link to="/shop" className="hidden md:flex text-indigo-600 font-bold hover:text-indigo-800 items-center bg-indigo-50 px-6 py-2 rounded-full transition-colors">
                            View All <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {categories.map((cat, idx) => (
                            <Link key={cat.id} to={`/shop?cat=${cat.slug}`} className="group relative overflow-hidden rounded-2xl aspect-[3/4] shadow-sm hover:shadow-xl transition-all duration-300">
                                <img src={cat.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-x-0 bottom-0 pt-20 pb-6 px-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                                    <h3 className="text-xl font-bold mb-1">{cat.name}</h3>
                                    <p className="text-xs text-white/70 font-medium tracking-wide flex items-center gap-1 group-hover:gap-2 transition-all">
                                        {cat.count} Products <ArrowRight className="w-3 h-3" />
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURED PRODUCTS */}
            <section className="py-20 bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <span className="text-orange-600 font-bold tracking-wider uppercase text-xs mb-2 block">Top Selling</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Products</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link to="/shop" className="btn bg-indigo-900 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-800 shadow-lg hover:shadow-xl transition-all">
                            View Full Catalog
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                        <div className="relative z-10 max-w-3xl mx-auto text-white">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">Partner with Us Today</h2>
                            <p className="text-lg text-white/90 mb-10">
                                Join our B2B network and get access to exclusive wholesale pricing, credit facilities, and priority support.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link to="/register" className="btn bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 shadow-xl transition-transform hover:-translate-y-1">
                                    Register as Retailer
                                </Link>
                                <Link to="/contact" className="btn bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
                                    Contact Sales
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
