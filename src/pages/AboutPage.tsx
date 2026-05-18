import React from "react";
import { Link } from "react-router-dom";
import { Flame, Sparkles, Trophy } from "lucide-react";

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 relative z-10 flex flex-col gap-24">
      
      {/* 1. Page Header (Editorial Spread style) */}
      <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-6 mt-6">
        <span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange font-display">
          Our Architectural Blueprint
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display uppercase tracking-tight text-offwhite leading-[0.95]">
          A Culinary <br />
          <span className="text-gradient">Sanctuary of Fire.</span>
        </h1>
        <p className="text-base sm:text-lg font-light text-gray-subtle leading-relaxed font-sans max-w-2xl mt-4">
          Moonlight Cafe was established under a single aesthetic truth: that centuries-old wood-fired heritage belongs in the light of modern minimalism and premium digital craft.
        </p>
      </div>

      {/* 2. Brand Visual Spread (Side-by-Side Grid) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Visual card */}
        <div className="lg:col-span-6 relative aspect-square w-full rounded-2xl overflow-hidden border border-glass-border shadow-2xl bg-brand-charcoal group">
          <div className="absolute inset-0 radial-glow-1 opacity-20 pointer-events-none" />
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop"
            alt="Artisanal sourdough proofing"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 filter brightness-90 saturate-[0.85] contrast-[1.05]"
          />
          <div className="absolute bottom-4 left-4 p-4 rounded-xl glass-panel border border-glass-border text-xs text-brand-beige">
            Establishment SoHo, New York • 2026
          </div>
        </div>

        {/* Brand context copy */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange font-display">
            The Wild Starter
          </span>
          <h2 className="text-2xl sm:text-4xl font-display uppercase tracking-tight text-offwhite leading-tight">
            Campanian Sourdough, Born of Volcanic Air
          </h2>
          <p className="text-sm font-light text-gray-subtle leading-relaxed font-sans">
            Our story doesn't begin in SoHo, but in the volcanic foothills of Mount Vesuvius. In 2024, our founders traveled to Campania, capturing wild airborne lactobacillus cultures directly from the orchard breezes of Sorrento.
          </p>
          <p className="text-sm font-light text-gray-subtle leading-relaxed font-sans">
            That original sourdough culture—which we call "Vesuvio"—has been fed diligently every twelve hours for over two years. It gives our pizza dough its distinct tangy structural matrix, filled with intricate pocketing and a light, digestible character that makes each wood-fired slice feel like an absolute whisper.
          </p>
          <p className="text-sm font-light text-gray-subtle leading-relaxed font-sans">
            We combined this biological miracle with absolute minimalist design. No checkered tablecloths, no generic neon menus. Instead, we forged a premium sanctuary crafted from matte charcoal, raw concrete, amber spotlights, and ambient vinyl lounge sounds.
          </p>
        </div>
      </section>

      {/* 3. The Three Pillars (Design grids) */}
      <section className="bg-brand-charcoal/30 border-y border-glass-border py-20 px-6 -mx-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange font-display">
              Creative Directives
            </span>
            <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-offwhite">
              The Moonlight Covenants
            </h2>
            <p className="text-xs font-light text-gray-subtle leading-relaxed">
              Our kitchen operates under three uncompromising architectural pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-2xl border border-glass-border flex flex-col gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-orange/5 border border-brand-orange/10 flex items-center justify-center text-brand-orange">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-offwhite font-display">
                Wood-Fire Physics
              </h3>
              <p className="text-xs font-light text-gray-subtle leading-relaxed font-sans">
                No gas lines. No electric hybrid assists. We burn 100% kiln-dried oak wood split by hand. Our custom clay dome absorbs wood smoke, radiating 900°F dry volcanic heat to blister the crust instantly.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-glass-border flex flex-col gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-orange/5 border border-brand-orange/10 flex items-center justify-center text-brand-orange">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-offwhite font-display">
                Suppliers Elite
              </h3>
              <p className="text-xs font-light text-gray-subtle leading-relaxed font-sans">
                We work directly with certified Italian cooperatives. Our olive oil is cold-pressed within 3 hours of harvest; our burrata is stretched by hand in Apulia and air-shipped to SoHo three times a week.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-glass-border flex flex-col gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-orange/5 border border-brand-orange/10 flex items-center justify-center text-brand-orange">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-offwhite font-display">
                Aesthetic Devotion
              </h3>
              <p className="text-xs font-light text-gray-subtle leading-relaxed font-sans">
                We treat dining as high fashion and fine design. Every product is framed, every beverage is curated to be highly photogenic, and the space operates at a cinematic sensory pitch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Team & Quote spread */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-6">
          <span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange font-display">
            A word from The Founders
          </span>
          <blockquote className="font-serif text-xl sm:text-2xl font-light text-brand-beige leading-relaxed italic border-l-2 border-brand-orange pl-6 my-4">
            "Pizza has always been a beautiful geometric masterpiece. We simply stripped away the generic red borders and reframed it under modern luxury aesthetics for the next generation of food lovers."
          </blockquote>
          <p className="text-xs font-semibold uppercase tracking-widest text-offwhite font-display">
            — Marc & Leo, Creative Directors, Moonlight Cafe
          </p>
        </div>

        <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden border border-glass-border shadow-2xl relative bg-brand-matte group">
          <img
            src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1200&auto=format&fit=crop"
            alt="Luxury cafe interior view"
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 filter brightness-90 saturate-[0.8]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-matte/60 via-transparent to-transparent pointer-events-none" />
        </div>
      </section>

      {/* 5. Booking callout */}
      <section className="w-full">
        <div className="w-full glass-panel border border-glass-border/30 rounded-3xl relative overflow-hidden p-12 text-center flex flex-col items-center gap-6 shadow-xl">
          <div className="absolute inset-0 radial-glow-2 opacity-15 pointer-events-none" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange font-display">
            Step Into the temple of Fire
          </span>
          <h2 className="text-2xl sm:text-4xl font-display uppercase tracking-tight text-offwhite max-w-xl leading-tight">
            Ready to Experience the leopard Char?
          </h2>
          <p className="text-xs font-light text-gray-subtle max-w-md leading-relaxed font-sans">
            Our doors in SoHo, NY are open. Taste sourdough proofed for 48 hours, fired in exatamente 60 seconds under split oak flames.
          </p>
          <div className="flex gap-4 mt-2">
            <Link
              to="/menu"
              className="px-6 py-3 rounded-full bg-brand-beige hover:bg-brand-beige-hover text-brand-matte font-display text-xs font-black tracking-widest uppercase hover:scale-[1.03] transition-transform shadow-lg cursor-pointer"
            >
              Order Pizza Online
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full border border-white/10 hover:border-white/20 bg-brand-matte/50 text-offwhite font-display text-xs font-bold tracking-widest uppercase hover:scale-[1.03] transition-transform cursor-pointer"
            >
              Book Table
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
