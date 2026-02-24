import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, FileText, Settings, LogOut, ChevronRight, Menu, X, Bell } from 'lucide-react';

export default function B2BLayout() {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/b2b/overview' },
        { icon: ShoppingBag, label: 'Wholesale Catalog', path: '/b2b/products' },
        { icon: FileText, label: 'My Orders', path: '/b2b/orders' },
        { icon: Settings, label: 'Settings', path: '/b2b/settings' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)}></div>
            )}

            {/* Sidebar */}
            <aside className={`fixed md:relative z-40 w-64 bg-[#0a0f1d] text-white min-h-screen flex flex-col shadow-2xl transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    <Link to="/">
                        <h2 className="text-2xl font-bold tracking-tight text-white">Anubhav<span className="text-orange-500">.B2B</span></h2>
                    </Link>
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
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${isActive ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                                {item.label}
                                {isActive && <ChevronRight className="w-4 h-4 ml-auto opacity-70" />}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800 bg-[#060912]">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center font-bold text-white uppercase">
                            {user?.name?.[0] || 'U'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-bold truncate text-white text-sm">{user?.name || 'Partner Account'}</p>
                            <p className="text-[10px] text-slate-500 truncate uppercase mt-0.5 tracking-tighter">Business Console</p>
                        </div>
                    </div>
                    <button onClick={logout} className="w-full bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white text-xs py-2.5 transition-all rounded-lg flex items-center justify-center gap-2 font-bold uppercase tracking-widest">
                        <LogOut className="w-3 h-3" /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 z-10">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-500 hover:text-gray-900">
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-sm font-black text-indigo-950 uppercase tracking-widest">
                            {location.pathname.split('/').pop()}
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-bold text-gray-400 border border-gray-100 px-3 py-1 rounded-full uppercase">{new Date().toDateString()}</span>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-10">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
