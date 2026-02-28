import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    return (
        <div className="group bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col h-full overflow-hidden">

            {/* Visual Asset Container */}
            <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden">
                <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Data Section */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">{product.brand}</span>
                    <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded">{product.category}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-lg mb-4 line-clamp-2">
                    {product.name}
                </h3>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-slate-500 font-medium mb-1">MRP</p>
                        <p className="text-lg font-bold text-slate-900 leading-none">₹{product.retail_price}</p>
                    </div>

                    <Link to="/inquiry" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-semibold transition-colors">
                        Send Inquiry
                    </Link>
                </div>
            </div>

        </div>
    );
}
