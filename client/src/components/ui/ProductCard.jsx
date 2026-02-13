import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    return (
        <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden">
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                {product.stock < 20 && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                        Low Stock
                    </span>
                )}
                {product.bulkPrice && (
                    <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                        Bulk Available
                    </span>
                )}
            </div>

            {/* Image Area */}
            <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden p-6">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 ease-out"
                />

                {/* Quick Actions Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2 justify-center bg-white/90 backdrop-blur-sm border-t border-gray-100">
                    <button className="p-2 rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white transition-colors" title="Quick View">
                        <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-full bg-indigo-900 text-white hover:bg-indigo-800 transition-colors" title="Add to Cart">
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{product.category}</div>
                <Link to={`/product/${product.id}`} className="block">
                    <h3 className="font-bold text-gray-900 text-lg leading-snug mb-2 group-hover:text-indigo-700 transition-colors line-clamp-2">
                        {product.name}
                    </h3>
                </Link>

                {/* Rating Placeholder */}
                <div className="flex items-center gap-1 mb-4">
                    <div className="flex text-yellow-400 text-xs">★★★★☆</div>
                    <span className="text-xs text-gray-400">({product.reviews})</span>
                </div>

                <div className="mt-auto flex items-end justify-between">
                    <div>
                        <p className="text-xs text-gray-500 mb-0.5">Retail Price</p>
                        <p className="text-xl font-bold text-gray-900">₹{product.retailPrice}</p>
                    </div>
                    {product.bulkPrice && (
                        <div className="text-right">
                            <p className="text-xs text-orange-600 font-medium mb-0.5">Bulk ({product.moq}+)</p>
                            <p className="text-sm font-bold text-orange-700">₹{product.bulkPrice}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
