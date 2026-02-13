import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, FileText, Settings, LogOut, ChevronRight, Menu, X, Bell } from 'lucide-react';

export default function B2BLayout({ children }) {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/b2b/dashboard' },
        { icon: ShoppingBag, label: 'Wholesale Catalog', path: '/b2b/products' },
        { icon: FileText, label: 'My Orders', path: '/b2b/orders' },
        { icon: FileText, label: 'Quotes', path: '/b2b/quotes' },
        { icon: Settings, label: 'Settings', path: '/b2b/settings' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex font-sans">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)}></div>
            )}

            {/* Sidebar */}
            <aside className={`fixed md:relative z-40 w-64 bg-slate-900 text-white min-h-screen flex flex-col shadow-2xl transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-white">Anubhav<span className="text-orange-500">.B2B</span></h2>
                        <p className="text-xs text-slate-400 mt-1">Distributor Portal</p>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                                {item.label}
                                {isActive && <ChevronRight className="w-4 h-4 ml-auto opacity-70" />}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800 bg-slate-950">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center font-bold text-white shadow-md">
                            {user?.name?.[0] || 'U'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-medium truncate text-white">{user?.name || 'User'}</p>
                            <p className="text-xs text-slate-400 truncate">{user?.companyName || 'Business Account'}</p>
                        </div>
                    </div>
                    <button onClick={logout} className="w-full btn bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white text-sm py-2 transition-colors duration-200 rounded-md flex items-center justify-center gap-2">
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6 z-10">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-500 hover:text-gray-900">
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-lg font-semibold text-gray-800 hidden sm:block">Dashboard</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-gray-200 mx-2"></div>
                        <span className="text-sm font-medium text-gray-600">{new Date().toLocaleDateString()}</span>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8 bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    );
}
