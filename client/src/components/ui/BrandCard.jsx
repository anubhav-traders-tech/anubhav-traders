import React from 'react';
import { Link } from 'react-router-dom';

export default function BrandCard({ brand }) {
    return (
        <Link to={`/shop?brand=${brand.slug}`} className="group relative block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="aspect-[4/3] bg-gray-50 p-6 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-3/4 h-3/4 object-contain filter group-hover:brightness-110 transition-all duration-300 group-hover:scale-110"
                />
            </div>
            <div className="p-4 text-center">
                <h3 className="font-bold text-gray-900 text-lg group-hover:text-indigo-700 transition-colors">{brand.name}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">{brand.description}</p>
            </div>
        </Link>
    );
}
