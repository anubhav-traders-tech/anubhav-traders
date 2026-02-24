import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, Phone, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import useCartStore from '../../store/cartStore';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const { cart } = useCartStore();
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`bg-accent-black sticky top-0 z-50 transition-all duration-300 border-b border-white/10 ${scrolled ? 'shadow-2xl py-1' : 'py-2'}`}>
                <div className="container-custom flex justify-between items-center relative gap-4">
                    <Link to="/" className="flex items-center gap-2 group shrink-0">
                        <div className="bg-accent-yellow text-accent-black p-2 rounded-lg shadow-lg group-hover:bg-white transition-colors duration-300">
                            <span className="font-black text-xl tracking-tighter">AT</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl md:text-2xl font-black text-white leading-none tracking-tight">ANUBHAV</span>
                            <span className="text-[10px] md:text-xs font-bold text-accent-yellow tracking-[0.2em] uppercase">Traders</span>
                        </div>
                    </Link>

                    <div className="hidden md:flex flex-1 max-w-lg mx-6 lg:mx-12 relative group">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-5 pr-12 focus:ring-2 focus:ring-accent-yellow/50 focus:border-accent-yellow outline-none text-sm text-white transition-all duration-300 placeholder:text-gray-500"
                            />
                            <button className="absolute right-1 top-1 bottom-1 bg-accent-yellow text-accent-black rounded-full p-1.5 hover:bg-white transition-colors">
                                <Search className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-8 shrink-0">
                        <nav className="flex items-center gap-6">
                            <Link to="/shop" className="text-xs font-bold text-gray-400 hover:text-accent-yellow transition-colors uppercase tracking-widest">Shop</Link>
                            <Link to="/brands" className="text-xs font-bold text-gray-400 hover:text-accent-yellow transition-colors uppercase tracking-widest">Our Partners</Link>
                            <Link to="/contact" className="text-xs font-bold text-gray-400 hover:text-accent-yellow transition-colors uppercase tracking-widest text-[#FFDC00]">Contact</Link>
                        </nav>

                        <Link to="/cart" className="relative group p-1">
                            <ShoppingCart className="w-6 h-6 text-gray-400 group-hover:text-accent-yellow transition-colors" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-black text-accent-black bg-accent-yellow rounded-full border-2 border-accent-black">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="relative group cursor-pointer">
                                <div className="flex items-center gap-2 py-1">
                                    <div className="w-9 h-9 rounded-full bg-navy-800 border border-white/10 flex items-center justify-center text-accent-yellow font-bold">
                                        {user.name[0]}
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                </div>
                                <div className="absolute right-0 mt-2 w-56 bg-navy-900 rounded-xl shadow-2xl py-2 hidden group-hover:block border border-white/5 origin-top-right">
                                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-300 hover:bg-navy-800 hover:text-white">My Orders</Link>
                                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10">Sign out</button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="btn bg-accent-yellow text-accent-black px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white shadow-xl transition-all">
                                Login
                            </Link>
                        )}
                    </div>

                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {isOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-white pt-20 px-6 animate-fade-in flex flex-col gap-6">
                    <Link to="/brands" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">Brands</Link>
                    <Link to="/b2b" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-orange-600 border-b border-gray-100 pb-2">B2B Portal</Link>
                    <Link to="/cart" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">Cart ({cartCount})</Link>
                </div>
            )}
        </>
    );
}
