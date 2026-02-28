import React from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

export default function PublicLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900 transition-colors duration-300">
            <Navbar />
            <main className="flex-1 w-full relative">
                {children}
            </main>
            <Footer />
        </div>
    );
}
