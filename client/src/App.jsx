import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import B2BLayout from './components/layout/B2BLayout';

// Pages
import Home from './pages/Home';
import Brands from './pages/Brands';
import BrandPage from './pages/BrandPage';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';

// B2B Pages
import B2BOverview from './pages/B2BOverview';
import B2BProducts from './pages/B2BProducts';
import B2BOrders from './pages/B2BOrders';
import Shop from './pages/Shop';
import Contact from './pages/Contact';

import { AuthProvider } from './context/AuthContext';

function AppContent() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/shop" element={<PublicLayout><Shop /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
            <Route path="/brands" element={<PublicLayout><Brands /></PublicLayout>} />
            <Route path="/brand/:slug" element={<PublicLayout><BrandPage /></PublicLayout>} />
            <Route path="/product/:slug" element={<PublicLayout><ProductPage /></PublicLayout>} />
            <Route path="/cart" element={<PublicLayout><Cart /></PublicLayout>} />
            <Route path="/checkout" element={<PublicLayout><Checkout /></PublicLayout>} />
            <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
            <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />

            {/* B2B Dashboard */}
            <Route path="/b2b" element={<B2BLayout />}>
                <Route index element={<Navigate to="/b2b/overview" replace />} />
                <Route path="overview" element={<B2BOverview />} />
                <Route path="products" element={<B2BProducts />} />
                <Route path="orders" element={<B2BOrders />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
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
