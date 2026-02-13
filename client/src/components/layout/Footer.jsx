import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-6 text-white">
                            <div className="bg-indigo-600 p-2 rounded-lg">
                                <span className="font-bold text-lg tracking-tighter">AT</span>
                            </div>
                            <span className="text-2xl font-heading font-bold">Anubhav Traders</span>
                        </div>
                        <p className="text-sm leading-relaxed mb-6 text-slate-400">
                            Your trusted partner for wholesale and retail FMCG distribution in Uttarakhand.
                            Bringing you authentic brands like Patanjali, Sri Sri Tattva, and more.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-orange-500 hover:text-white transition-all"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-orange-500 hover:text-white transition-all"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-orange-500 hover:text-white transition-all"><Twitter className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-heading font-bold text-lg mb-6">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/shop" className="hover:text-orange-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3 text-orange-500" /> Shop Retail</Link></li>
                            <li><Link to="/b2b" className="hover:text-orange-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3 text-orange-500" /> Business Portal</Link></li>
                            <li><Link to="/about" className="hover:text-orange-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3 text-orange-500" /> About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-orange-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3 text-orange-500" /> Contact Support</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-white font-heading font-bold text-lg mb-6">Categories</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/shop?cat=pooja" className="hover:text-orange-400 transition-colors">Pooja Materials</Link></li>
                            <li><Link to="/shop?cat=ayurveda" className="hover:text-orange-400 transition-colors">Ayurvedic Products</Link></li>
                            <li><Link to="/shop?cat=spices" className="hover:text-orange-400 transition-colors">Spices & Masale</Link></li>
                            <li><Link to="/shop?cat=snacks" className="hover:text-orange-400 transition-colors">Namkeen & Snacks</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-heading font-bold text-lg mb-6">Contact Us</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-4">
                                <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                                <span>123, Main Market Road,<br />Vikasnagar, Uttarakhand - 248198</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                                <span>support@anubhavtraders.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
                    <p>© {new Date().getFullYear()} Anubhav Traders. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
