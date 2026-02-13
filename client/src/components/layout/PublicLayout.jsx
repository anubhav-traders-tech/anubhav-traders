import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

export default function PublicLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-800">
            <Navbar />
            <main className="flex-1 w-full animate-fade-in">
                {children}
            </main>
            <Footer />
        </div>
    );
}
