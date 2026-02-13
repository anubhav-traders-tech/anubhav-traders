import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, Phone, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { categories } from '../../data/mock';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const [cartCount, setCartCount] = useState(2);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Category Tabs
    const Tabs = () => (
        <div className={`hidden md:block border-b border-gray-100 bg-white transition-all duration-300 ${scrolled ? 'shadow-sm sticky top-[72px] z-40' : ''}`}>
            <div className="container-custom">
                <ul className="flex items-center gap-8 overflow-x-auto no-scrollbar py-3">
                    {categories.map((cat) => (
                        <li key={cat.id} className="shrink-0">
                            <Link
                                to={`/shop?cat=${cat.slug}`}
                                className={`text-sm font-medium hover:text-orange-600 transition-colors ${location.search.includes(cat.slug) ? 'text-orange-600 border-b-2 border-orange-600 pb-2.5' : 'text-gray-600'}`}
                            >
                                {cat.name}
                            </Link>
                        </li>
                    ))}
                    <li className="ml-auto shrink-0">
                        <Link to="/shop" className="text-sm font-semibold text-indigo-900 hover:text-indigo-700">Browse All Brands &rarr;</Link>
                    </li>
                </ul>
            </div>
        </div>
    );

    return (
        <>
            <nav className={`bg-white sticky top-0 z-50 transition-all duration-300 border-b border-gray-100 ${scrolled ? 'shadow-md py-2' : 'py-3'}`}>

                {/* Top Utility Bar (Mobile Hidden) */}
                {!scrolled && (
                    <div className="hidden md:block bg-indigo-950 text-white text-[11px] py-1.5 absolute top-0 w-full left-0 -mt-[30px] h-[30px]">
                        <div className="container-custom flex justify-between items-center h-full">
                            <p className="opacity-90">Official Distributors for Patanjali, Sri Sri Tattva & Keya in Vikasnagar</p>
                            <div className="flex items-center gap-6">
                                <a href="tel:+919876543210" className="flex items-center hover:text-orange-300 transition-colors">
                                    <Phone className="w-3 h-3 mr-1" /> +91 98765 43210
                                </a>
                                <span className="opacity-30">|</span>
                                <Link to="/contact" className="hover:text-orange-300 transition-colors">Support</Link>
                                <Link to="/b2b" className="hover:text-orange-300 transition-colors font-semibold text-orange-200">For Retailers</Link>
                            </div>
                        </div>
                    </div>
                )}

                <div className="container-custom flex justify-between items-center relative">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-indigo-600 text-white p-2 rounded-lg shadow-sm group-hover:bg-indigo-700 transition-colors duration-300">
                            <span className="font-bold text-xl tracking-tighter">AT</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl md:text-2xl font-bold text-indigo-950 leading-none tracking-tight">Anubhav</span>
                            <span className="text-[10px] md:text-xs font-bold text-orange-600 tracking-[0.2em] uppercase">Traders</span>
                        </div>
                    </Link>

                    {/* Search Bar - Centered */}
                    <div className="hidden md:flex flex-1 max-w-lg mx-12 relative group">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search for products, brands or categories..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-5 pr-12 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none text-sm transition-all duration-300 group-hover:shadow-sm group-hover:bg-white"
                            />
                            <button className="absolute right-1 top-1 bottom-1 bg-indigo-600 text-white rounded-full p-1.5 hover:bg-indigo-700 transition-colors">
                                <Search className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/b2b" className="text-sm font-medium text-gray-600 hover:text-indigo-700 transition-colors">
                            Business Portal
                        </Link>

                        <Link to="/cart" className="relative group p-1">
                            <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-indigo-600 transition-colors" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-orange-500 rounded-full border-2 border-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="relative group cursor-pointer">
                                <div className="flex items-center gap-2 py-1">
                                    <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-bold shadow-sm">
                                        {user.name[0]}
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                                </div>

                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 hidden group-hover:block border border-gray-100 animate-slide-up origin-top-right">
                                    <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    </div>
                                    {user.role === 'b2b' && <Link to="/b2b" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors">Dashboard</Link>}
                                    {user.role === 'admin' && <Link to="/admin" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors">Admin Panel</Link>}
                                    <Link to="/orders" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors">My Orders</Link>
                                    <div className="h-px bg-gray-100 my-1"></div>
                                    <button onClick={logout} className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">Sign out</button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="btn bg-indigo-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            <Tabs />

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-white pt-20 px-6 animate-fade-in flex flex-col gap-6">
                    <div className="relative">
                        <input type="text" placeholder="Search..." className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 pl-4 pr-10 focus:ring-2 focus:ring-indigo-500 outline-none" />
                        <Search className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                    </div>

                    <div className="space-y-4">
                        <Link to="/" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">Home</Link>
                        <Link to="/shop" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">Shop All</Link>
                        <Link to="/b2b" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-orange-600 border-b border-gray-100 pb-2">Business Portal</Link>
                        <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">Contact</Link>
                    </div>

                    {!user && (
                        <Link to="/login" className="w-full btn bg-indigo-600 text-white py-3 rounded-lg text-center font-bold text-lg mt-4">
                            Login / Sign Up
                        </Link>
                    )}
                </div>
            )}
        </>
    );
}
