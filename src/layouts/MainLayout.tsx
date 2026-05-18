import React from "react";
import { CartDrawer } from "../components/CartDrawer";
import { CursorGlow } from "../components/CursorGlow";

import { Footer } from "../components/Footer";
import { MobileBottomNav } from "../components/MobileBottomNav";
import { Navbar } from "../components/Navbar";
import { ScrollProgress } from "../components/ScrollProgress";
import { ToastContainer } from "../components/ToastContainer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col bg-brand-matte overflow-hidden selection:bg-brand-orange selection:text-white">
      {/* Film Grain Texture */}
      <div className="film-grain" />

      {/* Global Scroll Progress bar */}
      <ScrollProgress />

      {/* Dynamic Ambient Background Glow Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full radial-glow-1 opacity-20 pointer-events-none -translate-y-1/2 -translate-x-1/2 z-0" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full radial-glow-2 opacity-15 pointer-events-none translate-x-1/3 z-0" />
      <div className="absolute bottom-1/4 left-0 w-[550px] h-[550px] rounded-full radial-glow-1 opacity-10 pointer-events-none -translate-x-1/3 z-0" />

      {/* Desktop & Tablet Navigation */}
      <Navbar />

      {/* Active Glowing Cursor Glow for Desktop */}
      <CursorGlow />



      {/* Toast Notifications Overlay */}
      <ToastContainer />

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Main Page Layout Container */}
      <main className="flex-1 w-full flex flex-col relative z-10 pt-20">
        {children}
      </main>

      {/* Mobile Bottom Float Dock (Shown only on small viewports) */}
      <MobileBottomNav />

      {/* Global Editorial Footer */}
      <Footer />
    </div>
  );
};
