import React from 'react';
import { useAuth } from '../context/AuthContext';

const B2BOverview = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Welcome Back, {user?.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Pending Orders</h3>
                    <p className="text-3xl font-black text-indigo-950 mt-2">0</p>
                    <div className="mt-4 text-xs font-bold text-gray-400">WAITING FOR APPROVAL</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Orders</h3>
                    <p className="text-3xl font-black text-indigo-950 mt-2">0</p>
                    <div className="mt-4 text-xs font-bold text-green-500">SYSTEM ACTIVE</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Credit Limit</h3>
                    <p className="text-3xl font-black text-indigo-950 mt-2">₹0</p>
                    <div className="mt-4 text-xs font-bold text-orange-500">RESTRICTED ACCOUNT</div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Bulk Activity</h2>
                <div className="text-center py-10 text-gray-400 border-2 border-dashed border-gray-50 rounded-xl">
                    No recent bulk orders or quotes found.
                </div>
            </div>
        </div>
    );
};

export default B2BOverview;
