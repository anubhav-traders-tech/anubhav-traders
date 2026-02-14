import React from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import CartSlideOut from '../cart/CartSlideOut';

export default function PublicLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen bg-[#070707] font-sans text-gray-200">
            <Navbar />
            <CartSlideOut />
            <main className="flex-1 w-full relative">
                {children}
            </main>
            <Footer />
        </div>
    );
}
