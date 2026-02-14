import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import B2BDashboard from './pages/B2BDashboard';
import B2BProducts from './pages/B2BProducts';
import B2BOrders from './pages/B2BOrders';

import { AuthProvider, useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    // return user ? children : <Navigate to="/login" />;
    return children; // For dev ease, normally enforce
};

function AppContent() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/brands" element={<PublicLayout><Brands /></PublicLayout>} />
            <Route path="/brand/:slug" element={<PublicLayout><BrandPage /></PublicLayout>} />
            <Route path="/product/:slug" element={<PublicLayout><ProductPage /></PublicLayout>} />
            <Route path="/cart" element={<PublicLayout><Cart /></PublicLayout>} />
            <Route path="/checkout" element={<PublicLayout><Checkout /></PublicLayout>} />
            <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
            <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />

            {/* B2B Dashboard Subroutes */}
            <Route path="/b2b" element={<PrivateRoute><B2BLayout><B2BDashboard /></B2BLayout></PrivateRoute>}>
                <Route index element={<div className="p-10 text-white">Welcome to B2B Console</div>} />
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
