import React from 'react';
import { useAuth } from './context/AuthContext';
import { Routes, Route, useLocation } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import B2BLayout from './components/layout/B2BLayout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Products from './pages/Products'; // Import Products page
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import B2BDashboard from './pages/B2BDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';

function AppContent() {
    const location = useLocation();
    const isB2B = location.pathname.startsWith('/b2b') || location.pathname.startsWith('/admin');

    return (
        <Routes>
            {/* Public Routes with Public Layout */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            {/* Use Products page for /shop and /products */}
            <Route path="/shop" element={<PublicLayout><Products /></PublicLayout>} />
            <Route path="/products" element={<PublicLayout><Products /></PublicLayout>} />

            <Route path="/cart" element={<PublicLayout><Cart /></PublicLayout>} />
            <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
            <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><div className="pt-20 text-center font-bold text-3xl text-gray-300">Contact Page Placeholder</div></PublicLayout>} />

            {/* B2B Routes with B2B Layout */}
            <Route path="/b2b" element={<B2BLayout><B2BDashboard /></B2BLayout>} />
            <Route path="/b2b/*" element={<B2BLayout><B2BDashboard /></B2BLayout>} />
            <Route path="/admin" element={<B2BLayout><AdminDashboard /></B2BLayout>} />
        </Routes>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
