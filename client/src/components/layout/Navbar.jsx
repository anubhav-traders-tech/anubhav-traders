import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Brands', path: '/brands' },
        { name: 'Products', path: '/products' },
        { name: 'Inquiry', path: '/inquiry' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <header className="w-full relative z-50 font-sans">
            {/* Top Bar - Professional Contact Info */}
            <div className="hidden md:block bg-slate-900 text-white py-2 text-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="flex space-x-6">
                        <span className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-300" />
                            +91 XXXXX XXXXX
                        </span>
                        <span className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-300" />
                            info@anubhavtraders.com
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-300" />
                        Authorized Distributor | Vikasnagar, Uttarakhand
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className={`transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-4' : 'bg-white py-6'} border-b border-gray-100`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">

                    {/* Brand Logo */}
                    <Link to="/" className="flex flex-col">
                        <span className="text-2xl font-bold text-slate-900 tracking-tight">Anubhav Traders</span>
                        <span className="text-xs text-slate-500 font-medium tracking-wide uppercase mt-0.5">Multi-Brand Distributor</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-[15px] font-semibold transition-colors ${location.pathname === link.path ? 'text-blue-600' : 'text-slate-700 hover:text-blue-600'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden lg:block">
                        <Link to="/inquiry" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded text-sm font-semibold transition-colors">
                            Send Inquiry
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden text-slate-900 p-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-white border-b border-gray-100 shadow-lg absolute w-full left-0 top-full">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-3 text-base font-medium rounded-md ${location.pathname === link.path
                                        ? 'text-blue-600 bg-blue-50'
                                        : 'text-slate-900 hover:bg-gray-50'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/inquiry"
                            onClick={() => setIsOpen(false)}
                            className="block mt-4 text-center bg-blue-600 text-white px-4 py-3 rounded-md font-semibold"
                        >
                            Send Inquiry
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}

