import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu, Truck, Phone, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold flex items-center gap-2">
                        <Truck className="h-8 w-8 text-secondary" />
                        Anubhav Traders
                    </Link>
                    <nav className="hidden md:flex gap-6 items-center">
                        <Link to="/" className="hover:text-secondary transition">Home</Link>
                        <Link to="/products" className="hover:text-secondary transition">Products</Link>
                        <Link to="/contact" className="hover:text-secondary transition">Contact</Link>
                        {user ? (
                            <>
                                <Link to="/admin" className="text-secondary font-semibold">Dashboard</Link>
                                <button onClick={logout} className="text-sm border border-gray-400 px-3 py-1 rounded">Logout</button>
                            </>
                        ) : (
                            <Link to="/login" className="flex items-center gap-1 text-sm bg-secondary px-4 py-2 rounded font-bold hover:bg-orange-600">
                                Worker Login <LogIn size={16} />
                            </Link>
                        )}
                    </nav>
                    {/* Mobile menu trigger would go here */}
                </div>
            </header>

            <main className="flex-grow">
                <Outlet />
            </main>

            <footer className="bg-gray-900 text-gray-300 py-10">
                <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Anubhav Traders</h3>
                        <p>Premier bulk distributor serving retailers and contractors with reliability and integrity.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/products">Product Catalog</Link></li>
                            <li><Link to="/contact">Request Quote</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4">Contact</h4>
                        <p>123 Industrial Area, State, India</p>
                        <p className="mt-2">sales@anubhavtraders.com</p>
                        <p>+91 98765 43210</p>
                    </div>
                </div>
                <div className="text-center mt-10 text-sm text-gray-500">
                    © {new Date().getFullYear()} Anubhav Traders. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Layout;
