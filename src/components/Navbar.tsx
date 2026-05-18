import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "../store/cartStore";

export const Navbar: React.FC = () => {
  const { cart, openCart } = useCartStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate total items in cart
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "py-4 bg-brand-matte/85 backdrop-blur-xl border-b border-glass-border shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(122,28,36,0.4)] group-hover:scale-105 transition-transform duration-300">
            <span className="text-white text-base select-none">🌙</span>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 animate-pulse-slow" />
          </div>
          <span className="font-display font-bold text-lg md:text-xl tracking-wider uppercase text-offwhite group-hover:text-brand-orange transition-colors duration-300">
            Moonlight <span className="font-light text-brand-beige">Cafe</span>
          </span>
        </Link>

        {/* Central Navigation (Hidden on mobile, mobile bottom nav takes over) */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { path: "/", label: "Home" },
            { path: "/menu", label: "Menu" },
            { path: "/about", label: "About" },
            { path: "/contact", label: "Contact" },
          ].map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative font-sans text-sm uppercase tracking-widest font-medium transition-colors py-1 ${
                  isActive ? "text-brand-orange" : "text-gray-subtle hover:text-offwhite"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-orange rounded-full shadow-[0_0_8px_rgba(122,28,36,0.8)]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Actions Menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={openCart}
            className="relative p-2.5 rounded-full border border-glass-border hover:border-offwhite/20 bg-brand-darkgray/30 hover:bg-brand-darkgray/80 text-offwhite transition-all duration-300 group hover:scale-105 shadow-md cursor-pointer"
            aria-label="Open cart drawer"
          >
            <ShoppingBag className="w-4.5 h-4.5 group-hover:text-brand-orange transition-colors" />
            
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange text-[10px] font-bold text-white shadow-[0_0_10px_rgba(122,28,36,0.6)] animate-pulse-slow">
                {cartItemCount}
              </span>
            )}
          </button>
          
          <Link
            to="/menu"
            className="hidden sm:inline-block px-5 py-2.5 rounded-full bg-brand-beige text-brand-matte font-display text-xs font-bold uppercase tracking-widest hover:bg-brand-beige-hover transition-all duration-300 hover:scale-[1.03] shadow-lg shadow-brand-beige/5"
          >
            Order Now
          </Link>
        </div>
      </div>
    </header>
  );
};
