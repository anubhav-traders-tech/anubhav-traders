import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-900 pt-16 pb-8 border-t border-slate-800 text-white font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand Info */}
                    <div className="space-y-6">
                        <Link to="/" className="flex flex-col">
                            <span className="text-2xl font-bold text-white tracking-tight">Anubhav Traders</span>
                            <span className="text-xs text-blue-400 font-medium tracking-wide uppercase mt-0.5">Multi-Brand Distributor</span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Authorized distributor of leading FMCG and Ayurvedic brands. Supplying retailers and bulk buyers with high-quality products across multiple categories.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><Link to="/" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Home</Link></li>
                            <li><Link to="/brands" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Our Brands</Link></li>
                            <li><Link to="/products" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">All Products</Link></li>
                            <li><Link to="/inquiry" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Send Inquiry</Link></li>
                            <li><Link to="/contact" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Brands List */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Our Brands</h4>
                        <ul className="space-y-4">
                            <li><Link to="/brand/patanjali" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Patanjali</Link></li>
                            <li><Link to="/brand/vaveda" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Vaveda</Link></li>
                            <li><Link to="/brand/sri-sri-tatva" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Sri Sri Tatva</Link></li>
                            <li><Link to="/brand/sifi-prakash" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Sifi Prakash</Link></li>
                            <li><Link to="/brands" className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-semibold">View All Brands &rarr;</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                <span className="text-slate-400 text-sm">Vikasnagar, Uttarakhand,<br />India</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                                <a href="tel:+91XXXXXXXXXX" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">+91 XXXXX XXXXX</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                                <a href="mailto:info@anubhavtraders.com" className="text-slate-400 hover:text-blue-400 transition-colors text-sm gap-2 break-all">info@anubhavtraders.com</a>
                            </li>
                            <li className="pt-2">
                                <a href="https://wa.me/91XXXXXXXXXX" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors">
                                    <MessageCircle className="w-4 h-4" />
                                    WhatsApp Us
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 text-center">
                    <p className="text-slate-500 text-sm">
                        &copy; {new Date().getFullYear()} Anubhav Traders. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
