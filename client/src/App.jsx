import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';

// Pages
import Home from './pages/Home';
import Brands from './pages/Brands';
import BrandPage from './pages/BrandPage';
import Shop from './pages/Shop'; // For Products
import Contact from './pages/Contact'; // For Inquiry/Contact

function App() {
    return (
        <Routes>
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/shop" element={<PublicLayout><Shop /></PublicLayout>} />
            <Route path="/products" element={<PublicLayout><Shop /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
            <Route path="/inquiry" element={<PublicLayout><Contact /></PublicLayout>} />
            <Route path="/brands" element={<PublicLayout><Brands /></PublicLayout>} />
            <Route path="/brand/:slug" element={<PublicLayout><BrandPage /></PublicLayout>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;
