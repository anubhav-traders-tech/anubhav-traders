import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, ArrowRight, Package, Building2 } from 'lucide-react';
import { products, brands } from '../data/mock';
import ProductCard from '../components/ui/ProductCard';

export default function Home() {
    const featuredProducts = products.slice(0, 8);

    return (
        <div className="bg-slate-50 text-slate-900 font-sans">

            {/* 1. HERO SECTION (Credibility Focused) */}
            <section className="bg-white border-b border-gray-100 overflow-hidden relative">
                <div className="absolute inset-0 bg-blue-50/50"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-8 text-center md:text-left">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold tracking-wide">
                            B2B Distributor Network
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
                            Authorized Distributor of Leading FMCG & Ayurvedic Brands
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto md:mx-0">
                            Supplying retailers and bulk buyers across multiple product categories with reliable, fast, and authentic distribution.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
                            <a href="#brands-section" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow-sm transition-colors text-center">
                                View Brands
                            </a>
                            <Link to="/inquiry" className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-300 hover:border-blue-600 hover:text-blue-600 text-slate-700 font-semibold rounded transition-colors text-center">
                                Send Inquiry
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. OUR BRANDS SECTION (Primary Focus) */}
            <section id="brands-section" className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Brands</h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto rounded"></div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {brands.map((brand) => (
                            <Link key={brand.id} to={`/brand/${brand.slug}`} className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group flex flex-col items-center justify-center text-center aspect-square md:aspect-[4/3]">
                                <img src={brand.image} alt={brand.name} className="w-24 h-24 object-cover rounded-full mb-4 opacity-90 group-hover:scale-105 transition-transform" />
                                <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{brand.name}</h3>
                                <p className="text-sm text-slate-500 mt-2 line-clamp-2">{brand.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. FEATURED PRODUCTS SECTION */}
            <section className="py-20 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Products</h2>
                            <div className="w-20 h-1 bg-blue-600 rounded"></div>
                        </div>
                        <Link to="/products" className="hidden sm:flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                            View Catalog <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>

                    <div className="mt-12 text-center sm:hidden">
                        <Link to="/products" className="inline-flex items-center text-blue-600 font-semibold">
                            View Catalog <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 4. ABOUT / CREDIBILITY SECTION */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 md:p-16">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Distributor Credentials</h2>
                                <p className="text-slate-600 mb-8 text-lg">
                                    A reliable pillar for FMCG distribution. We prioritize supply chain efficiency and product authenticity above all.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <Building2 className="w-6 h-6 text-blue-600 mr-4 shrink-0" />
                                        <span className="text-slate-700 font-medium">Over 10 Years in Distribution Excellence</span>
                                    </li>
                                    <li className="flex items-start">
                                        <ShieldCheck className="w-6 h-6 text-blue-600 mr-4 shrink-0" />
                                        <span className="text-slate-700 font-medium">Authorized Primary Partnerships with Top Brands</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Package className="w-6 h-6 text-blue-600 mr-4 shrink-0" />
                                        <span className="text-slate-700 font-medium">High Volume Bulk Supply Capabilities</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Truck className="w-6 h-6 text-blue-600 mr-4 shrink-0" />
                                        <span className="text-slate-700 font-medium">Trusted Network of 500+ Retailers</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-slate-100 rounded-lg p-8 h-full flex items-center justify-center">
                                <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800" alt="Warehouse Distribution" className="rounded shadow-sm mix-blend-multiply opacity-90 object-cover w-full h-full min-h-[300px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. INQUIRY CTA SECTION */}
            <section className="py-24 bg-blue-600 text-white text-center px-4">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Looking for Bulk Orders or Dealership?</h2>
                    <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
                        Connect with our sales team to discuss wholesale pricing, credit terms, and distribution opportunities for your retail store.
                    </p>
                    <div className="pt-4">
                        <Link to="/inquiry" className="inline-block bg-white text-blue-600 px-10 py-4 rounded font-bold text-lg hover:bg-slate-50 transition-colors shadow-sm">
                            Send Inquiry
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
