import React from "react";
import { NavLink } from "react-router-dom";
import { Compass, Home, Phone, ShoppingBag, Users } from "lucide-react";
import { useCartStore } from "../store/cartStore";

export const MobileBottomNav: React.FC = () => {
  const { cart, openCart, isOpen: isCartOpen } = useCartStore();

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 px-4 md:hidden flex justify-center pointer-events-none">
      <nav className="glass-panel-heavy border border-glass-border/12 px-3 py-2.5 rounded-full flex items-center justify-between w-full max-w-[370px] pointer-events-auto shadow-[0_12px_40px_rgba(0,0,0,0.7)]">
        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center py-1 transition-all ${
              isActive ? "text-brand-orange scale-105" : "text-gray-subtle hover:text-offwhite"
            }`
          }
        >
          <Home className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-widest mt-1 font-display font-bold">Home</span>
        </NavLink>

        {/* Menu */}
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center py-1 transition-all ${
              isActive ? "text-brand-orange scale-105" : "text-gray-subtle hover:text-offwhite"
            }`
          }
        >
          <Compass className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-widest mt-1 font-display font-bold">Menu</span>
        </NavLink>

        {/* Dynamic Cart Button */}
        <button
          onClick={openCart}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            isCartOpen ? "text-brand-orange scale-105" : "text-gray-subtle hover:text-offwhite"
          }`}
          aria-label="Open mobile cart"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-brand-orange text-[8px] font-black text-white shadow-sm border border-brand-orange/10 animate-pulse-slow">
                {cartItemCount}
              </span>
            )}
          </div>
          <span className="text-[9px] uppercase tracking-widest mt-1 font-display font-bold">Cart</span>
        </button>

        {/* About */}
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center py-1 transition-all ${
              isActive ? "text-brand-orange scale-105" : "text-gray-subtle hover:text-offwhite"
            }`
          }
        >
          <Users className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-widest mt-1 font-display font-bold">About</span>
        </NavLink>

        {/* Contact */}
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center py-1 transition-all ${
              isActive ? "text-brand-orange scale-105" : "text-gray-subtle hover:text-offwhite"
            }`
          }
        >
          <Phone className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-widest mt-1 font-display font-bold">Contact</span>
        </NavLink>
      </nav>
    </div>
  );
};
