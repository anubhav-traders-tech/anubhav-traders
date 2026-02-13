import { useState } from 'react';
import { products } from '../data/mock';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, ShoppingBag, FileText, Settings, LogOut, ChevronRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function B2BDashboard() {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('products');

    // Guard included in route usually, but redundancy is safe
    if (!user || user.role !== 'b2b') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Access Restricted</h2>
                    <p className="mb-4">Please login with a business account.</p>
                    <Link to="/login" className="btn btn-primary">Login</Link>
                </div>
            </div>
        )
    }

    const SidebarItem = ({ icon: Icon, label, id }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${activeTab === id ? 'bg-primary-800 text-white shadow-md' : 'text-blue-100 hover:bg-primary-800/50 hover:text-white'}`}
        >
            <Icon className="w-5 h-5" />
            {label}
            {activeTab === id && <ChevronRight className="w-4 h-4 ml-auto" />}
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-100 flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-primary-900 text-white min-h-screen flex flex-col shadow-xl z-20 fixed md:relative hidden md:flex">
                <div className="p-6 border-b border-primary-800">
                    <h2 className="text-2xl font-bold tracking-tight">Anubhav<span className="text-accent-400">.B2B</span></h2>
                    <p className="text-xs text-blue-200 mt-1">Wholesale Portal</p>
                </div>

                <div className="p-4 space-y-2 flex-1 overflow-y-auto">
                    <div className="text-xs font-bold text-primary-400 uppercase tracking-wider px-4 mb-2 mt-4">Menu</div>
                    <SidebarItem icon={LayoutDashboard} label="Overview" id="overview" />
                    <SidebarItem icon={ShoppingBag} label="Order Catalog" id="products" />
                    <SidebarItem icon={FileText} label="My Orders" id="orders" />
                    <SidebarItem icon={FileText} label="Quotes" id="quotes" />

                    <div className="text-xs font-bold text-primary-400 uppercase tracking-wider px-4 mb-2 mt-8">Account</div>
                    <SidebarItem icon={Settings} label="Settings" id="settings" />
                </div>

                <div className="p-4 border-t border-primary-800 bg-primary-950">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center font-bold text-white">
                            {user.name[0]}
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-medium truncate">{user.name}</p>
                            <p className="text-xs text-blue-300 truncate">{user.companyName || 'Business Account'}</p>
                        </div>
                    </div>
                    <button onClick={logout} className="w-full btn bg-primary-800 hover:bg-red-600 text-sm py-2">
                        <LogOut className="w-4 h-4 mr-2" /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-0 overflow-x-hidden h-screen overflow-y-auto">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
                    <div className="px-8 py-4 flex justify-between items-center">
                        <h1 className="text-xl font-bold text-gray-800 capitalize">{activeTab.replace('-', ' ')}</h1>

                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <input type="text" placeholder="Quick search..." className="bg-gray-100 border-none rounded-full px-4 py-2 pl-10 text-sm w-64 focus:ring-2 focus:ring-primary-500" />
                                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                            </div>
                            <button className="btn btn-primary px-4 py-2 text-sm">Create New Order</button>
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-gray-500 text-sm font-medium">Pending Orders</h3>
                                <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-gray-500 text-sm font-medium">This Month Spend</h3>
                                <p className="text-3xl font-bold text-gray-900 mt-2">₹1,24,500</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-gray-500 text-sm font-medium">Credit Limit</h3>
                                <p className="text-3xl font-bold text-green-600 mt-2">₹5,00,000</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'products' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-4">Product</th>
                                            <th className="px-6 py-4">Category</th>
                                            <th className="px-6 py-4 text-right">Wholesale Price</th>
                                            <th className="px-6 py-4 text-center">MOQ</th>
                                            <th className="px-6 py-4 text-center">Stock</th>
                                            <th className="px-6 py-4 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {products.map(product => (
                                            <tr key={product.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={product.image} className="w-10 h-10 rounded object-cover bg-gray-100" />
                                                        <span className="font-semibold text-gray-900">{product.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">{product.category}</td>
                                                <td className="px-6 py-4 text-right font-bold text-primary-700">₹{product.bulkPrice}</td>
                                                <td className="px-6 py-4 text-center text-gray-600">{product.moq} Units</td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${product.stock > 100 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                        {product.stock > 0 ? 'In Stock' : 'Out'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="btn btn-primary px-3 py-1.5 text-xs rounded-md">Add to Quote</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Other tabs placeholders */}
                    {activeTab !== 'overview' && activeTab !== 'products' && (
                        <div className="border border-dashed border-gray-300 rounded-xl h-64 flex items-center justify-center text-gray-400 bg-white">
                            Module under development: {activeTab}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
