import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { toast } from "../store/toastStore";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid editorial email address.");
      return;
    }
    toast.success("Welcome to the inner circle. Exquisite updates are on their way.");
    setEmail("");
  };

  return (
    <footer className="bg-brand-charcoal border-t border-glass-border pt-20 pb-28 md:pb-16 px-6 relative z-10 overflow-hidden">
      {/* Background ambient glowing spheres */}
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand-orange/5 blur-[120px]" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-beige/5 blur-[120px]" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-16 border-b border-glass-border">
          {/* Brand Info */}
          <div className="flex flex-col gap-6 col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="w-7 h-7 rounded-full bg-brand-orange flex items-center justify-center text-xs">
                🌙
              </div>
              <span className="font-display font-bold tracking-wider uppercase text-offwhite group-hover:text-brand-orange transition-colors">
                Moonlight <span className="font-light text-brand-beige">Cafe</span>
              </span>
            </Link>
            <p className="text-sm font-light leading-relaxed text-gray-subtle">
              An editorial culinary sanctuary where centuries-old Neapolitan heritage meets modern, screen-lit minimalism. Proofed for 48 hours, served under amber glows.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4 text-gray-subtle">
              <a
                href="https://www.instagram.com/moonlight_cafe_kolhapur/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-glass-border hover:border-offwhite/20 hover:text-brand-orange transition-all duration-300 hover:scale-105"
                aria-label="Instagram link"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="#twitter"
                className="p-2.5 rounded-full border border-glass-border hover:border-offwhite/20 hover:text-brand-orange transition-all duration-300 hover:scale-105"
                aria-label="Twitter link"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a
                href="#tiktok"
                className="p-2.5 rounded-full border border-glass-border hover:border-offwhite/20 hover:text-brand-orange transition-all duration-300 hover:scale-105"
                aria-label="TikTok link"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-beige font-display">
              Navigate
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-light text-gray-subtle">
              <li>
                <Link to="/" className="hover:text-offwhite transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-offwhite transition-colors">Pizza Menu</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-offwhite transition-colors">Our Heritage</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-offwhite transition-colors">Get In Touch</Link>
              </li>
            </ul>
          </div>

          {/* Hours & Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-beige font-display">
              Hours & Space
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-light text-gray-subtle leading-relaxed">
              <li>
                <span className="font-semibold text-offwhite block">Lunch:</span>
                12:00 PM - 3:00 PM
              </li>
              <li>
                <span className="font-semibold text-offwhite block">Dinner:</span>
                5:00 PM - 10:00 PM
              </li>
              <li>
                <span className="font-semibold text-offwhite block">Location:</span>
                Pratibha Nagar, Redyachi Takkar,<br/>Kolhapur
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-beige font-display">
              The Inner Circle
            </h4>
            <p className="text-sm font-light leading-relaxed text-gray-subtle">
              Receive secret menu unlocks, private kitchen events, and artistic editorial launches.
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email address"
                className="w-full glass-input px-4 py-3 rounded-full text-sm font-light tracking-wide focus:pr-12"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 aspect-square rounded-full bg-brand-beige hover:bg-brand-beige-hover text-brand-matte flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Legal & Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-light text-gray-subtle">
          <p>© {new Date().getFullYear()} Moonlight Cafe. Crafted with absolute aesthetic devotion.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-offwhite transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-offwhite transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
