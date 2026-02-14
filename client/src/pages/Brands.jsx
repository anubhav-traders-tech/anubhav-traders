import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Brands = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/api/brands')
            .then(res => setBrands(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="pt-32 text-center text-white">Loading Brands...</div>;

    return (
        <div className="pt-24 px-6 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-4xl font-bold text-white mb-10">Our Partners</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {brands.map(brand => (
                    <Link
                        key={brand.id}
                        to={`/brand/${brand.slug}`}
                        className="group bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-orange-500/50 transition-all text-center"
                    >
                        <div className="h-32 mb-4 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                            {/* Brand logic/icon fallback */}
                            <span className="text-2xl font-bold text-gray-400 group-hover:text-orange-500">{brand.name}</span>
                        </div>
                        <p className="text-gray-500 group-hover:text-white transition-colors">View Products →</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Brands;
