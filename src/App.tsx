import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { AboutPage } from "./pages/AboutPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { ContactPage } from "./pages/ContactPage";
import { LandingPage } from "./pages/LandingPage";
import { MenuPage } from "./pages/MenuPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import "./App.css";

// Helper component to reset scroll position on page transitions
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* Dynamic Scroll position restorer */}
      <ScrollToTop />
      
      {/* Sticky Main layout wrapper */}
      <MainLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Fallback route */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
