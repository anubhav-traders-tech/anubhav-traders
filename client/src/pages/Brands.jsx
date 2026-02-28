import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

const Brands = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/brands')
            .then(res => setBrands(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Loading Brands...</p>
        </div>
    );

    return (
        <div className="bg-slate-50 min-h-screen py-20 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our Partner Brands</h1>
                    <div className="w-20 h-1 bg-blue-600 mx-auto rounded mb-6"></div>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        We represent top FMCG and Ayurvedic brands, ensuring quality and authenticity for all our retail partners.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {brands.map((brand) => (
                        <Link
                            key={brand.id}
                            to={`/brand/${brand.slug}`}
                            className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group flex flex-col items-center justify-center text-center aspect-square md:aspect-[4/3]"
                        >
                            {brand.image ? (
                                <img src={brand.image} alt={brand.name} className="w-24 h-24 object-cover rounded-full mb-4 opacity-90 group-hover:scale-105 transition-transform" />
                            ) : (
                                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-2xl font-bold text-slate-400">{brand.name.charAt(0)}</span>
                                </div>
                            )}
                            <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{brand.name}</h3>
                            <p className="text-sm text-slate-500 mt-2 line-clamp-2">{brand.description}</p>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Brands;
