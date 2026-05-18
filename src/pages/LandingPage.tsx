import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Flame, Heart, Sparkles, Star, Trophy } from "lucide-react";
import { INSTAGRAM_POSTS, PIZZAS, REVIEWS } from "../mock-data/pizzas";

export const LandingPage: React.FC = () => {
  // Extract a few signature pizzas for the bento grid
  const signatures = PIZZAS.slice(0, 4);

  // Animations variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: custom * 0.15, ease: [0.16, 1, 0.3, 1] } as any
    })
  };


  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center px-6 overflow-hidden pt-12 md:pt-0">
        {/* Cinematic dark pizza video/photo background placeholder */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1920&auto=format&fit=crop"
            alt="Cinematic wood-fired pizza backdrop"
            className="w-full h-full object-cover opacity-25 scale-105 filter brightness-[0.3] contrast-[1.1] saturate-[0.8]"
          />
          {/* Subtle slow dark vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-matte via-brand-matte/80 to-transparent" />
          <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 30%, #050505 100%)" />
        </div>

        {/* Ambient glow cores representing the wood fire */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full radial-glow-1 opacity-25 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl text-center flex flex-col items-center gap-8 px-4 mt-8 md:mt-0">
          {/* Tagline label */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0}
            className="px-4 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/5 text-brand-orange text-[10px] font-bold tracking-widest uppercase flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Neapolitan Sourdough • Proofed 48 Hours
          </motion.div>

          {/* Majestic Typography */}
          <motion.h1
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-4xl sm:text-6xl md:text-8xl font-display font-extrabold uppercase tracking-tight text-offwhite leading-[0.95]"
          >
            Leopard Char. <br />
            <span className="text-gradient">Amber Glows.</span>
          </motion.h1>

          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-base sm:text-lg md:text-xl font-light text-gray-subtle max-w-2xl leading-relaxed font-sans"
          >
            Step into a cinematic sensory temple where historic Neapolitan sourdough meets modern wood-fired physics, minimalist luxury, and slow-proofed ecstasy.
          </motion.p>

          {/* Floating CTAs */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-4 w-full sm:w-auto"
          >
            <Link
              to="/menu"
              className="w-full sm:w-auto px-8 py-4.5 rounded-full bg-brand-orange hover:bg-brand-orange-light text-white font-display text-xs font-black tracking-widest uppercase transition-all duration-300 hover:scale-[1.04] shadow-2xl shadow-brand-orange/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              Unlock The Menu <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto px-8 py-4.5 rounded-full border border-glass-border hover:border-offwhite/20 bg-brand-darkgray/30 hover:bg-brand-darkgray/70 text-offwhite font-display text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:scale-[1.04] flex items-center justify-center gap-2 cursor-pointer"
            >
              Our Heritage
            </Link>
          </motion.div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
          <span className="text-[9px] uppercase tracking-widest text-brand-beige font-display select-none">
            Scroll To Taste
          </span>
          <div className="w-[1.5px] h-10 bg-gradient-to-b from-brand-orange to-transparent animate-bounce" />
        </div>
      </section>


      {/* 2. SIGNATURE PIZZAS SECTION (BENTO GRID) */}
      <section className="w-full max-w-7xl px-6 py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange font-display">
              Exquisite Selections
            </span>
            <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-offwhite">
              Signature Masterpieces
            </h2>
          </div>
          <p className="text-sm font-light text-gray-subtle max-w-sm leading-relaxed">
            Curated pizza creations styled for the modern epicurean. Each crafted with slow-proved crusts and rare toppings.
          </p>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Card 1: Large Featured Card (Truffle Eclipse) */}
          <motion.div
            variants={fadeIn}
            className="md:col-span-2 glass-panel rounded-2xl overflow-hidden border border-glass-border flex flex-col md:flex-row relative group shadow-xl hover:shadow-brand-orange/5 transition-all duration-500 hover:border-white/10"
          >
            {/* Visual */}
            <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden relative bg-brand-matte shrink-0">
              <img
                src={signatures[1]?.image}
                alt={signatures[1]?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brand-charcoal via-transparent to-transparent" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-orange text-white text-[9px] font-black uppercase tracking-wider shadow-md">
                {signatures[1]?.tags[0]}
              </span>
            </div>
            {/* Context */}
            <div className="p-8 flex flex-col justify-between flex-1 gap-6 bg-brand-charcoal/40">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-semibold text-brand-beige uppercase tracking-wider">
                  {signatures[1]?.category}
                </span>
                <h3 className="text-2xl font-display font-bold uppercase text-offwhite">
                  {signatures[1]?.name}
                </h3>
                <p className="text-sm font-light text-gray-subtle leading-relaxed">
                  {signatures[1]?.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-xl font-bold text-brand-beige font-sans">
                  ${signatures[1]?.price.toFixed(2)}
                </span>
                <Link
                  to={`/product/${signatures[1]?.id}`}
                  className="px-5 py-2.5 rounded-full border border-glass-border hover:border-offwhite/20 text-offwhite font-display text-[10px] font-bold uppercase tracking-widest transition-all group-hover:bg-brand-beige group-hover:text-brand-matte cursor-pointer"
                >
                  Configure Craft
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Small Bento Item (Cosmic Margherita) */}
          <motion.div
            variants={fadeIn}
            className="glass-panel rounded-2xl overflow-hidden border border-glass-border flex flex-col group shadow-xl hover:shadow-brand-orange/5 transition-all duration-500 hover:border-white/10"
          >
            <div className="h-48 overflow-hidden relative bg-brand-matte">
              <img
                src={signatures[0]?.image}
                alt={signatures[0]?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal to-transparent" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-brand-beige text-[9px] font-bold uppercase tracking-wider border border-white/10">
                Best Seller
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between gap-4 bg-brand-charcoal/40">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-display font-bold uppercase text-offwhite">
                  {signatures[0]?.name}
                </h3>
                <p className="text-xs font-light text-gray-subtle leading-relaxed line-clamp-2">
                  {signatures[0]?.description}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-glass-border mt-auto">
                <span className="text-base font-bold text-brand-beige font-sans">
                  ${signatures[0]?.price.toFixed(2)}
                </span>
                <Link
                  to={`/product/${signatures[0]?.id}`}
                  className="p-2 rounded-full border border-glass-border hover:border-offwhite/20 text-offwhite hover:text-brand-orange transition-all cursor-pointer"
                  aria-label="View product details"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Small Bento Item (Hot Honey Hellfire) */}
          <motion.div
            variants={fadeIn}
            className="glass-panel rounded-2xl overflow-hidden border border-glass-border flex flex-col group shadow-xl hover:shadow-brand-orange/5 transition-all duration-500 hover:border-white/10"
          >
            <div className="h-48 overflow-hidden relative bg-brand-matte">
              <img
                src={signatures[2]?.image}
                alt={signatures[2]?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal to-transparent" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-red-950/40 backdrop-blur-md text-red-400 text-[9px] font-bold uppercase tracking-wider border border-red-500/10">
                🔥 Spicy
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between gap-4 bg-brand-charcoal/40">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-display font-bold uppercase text-offwhite">
                  {signatures[2]?.name}
                </h3>
                <p className="text-xs font-light text-gray-subtle leading-relaxed line-clamp-2">
                  {signatures[2]?.description}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-glass-border mt-auto">
                <span className="text-base font-bold text-brand-beige font-sans">
                  ${signatures[2]?.price.toFixed(2)}
                </span>
                <Link
                  to={`/product/${signatures[2]?.id}`}
                  className="p-2 rounded-full border border-glass-border hover:border-offwhite/20 text-offwhite hover:text-brand-orange transition-all cursor-pointer"
                  aria-label="View product details"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Large Featured Card (Fig & Prosciutto) */}
          <motion.div
            variants={fadeIn}
            className="md:col-span-2 glass-panel rounded-2xl overflow-hidden border border-glass-border flex flex-col md:flex-row relative group shadow-xl hover:shadow-brand-orange/5 transition-all duration-500 hover:border-white/10"
          >
            {/* Visual */}
            <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden relative bg-brand-matte shrink-0 md:order-2">
              <img
                src={signatures[3]?.image}
                alt={signatures[3]?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-brand-charcoal via-transparent to-transparent" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-beige text-brand-matte text-[9px] font-black uppercase tracking-wider shadow-md">
                {signatures[3]?.tags[0]}
              </span>
            </div>
            {/* Context */}
            <div className="p-8 flex flex-col justify-between flex-1 gap-6 bg-brand-charcoal/40 md:order-1">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-semibold text-brand-beige uppercase tracking-wider">
                  {signatures[3]?.category}
                </span>
                <h3 className="text-2xl font-display font-bold uppercase text-offwhite">
                  {signatures[3]?.name}
                </h3>
                <p className="text-sm font-light text-gray-subtle leading-relaxed">
                  {signatures[3]?.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-xl font-bold text-brand-beige font-sans">
                  ${signatures[3]?.price.toFixed(2)}
                </span>
                <Link
                  to={`/product/${signatures[3]?.id}`}
                  className="px-5 py-2.5 rounded-full border border-glass-border hover:border-offwhite/20 text-offwhite font-display text-[10px] font-bold uppercase tracking-widest transition-all group-hover:bg-brand-beige group-hover:text-brand-matte cursor-pointer"
                >
                  Configure Craft
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* View All CTA */}
        <div className="flex justify-center mt-14">
          <Link
            to="/menu"
            className="group px-8 py-3.5 rounded-full border border-brand-beige/20 hover:border-brand-beige hover:bg-brand-beige/5 text-offwhite font-display text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[1.03] flex items-center gap-3 cursor-pointer"
          >
            Unlock All 12 Masterpieces
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>


      {/* 3. FRESH FROM THE OVEN SECTION (STORYTELLING & FLAME EFFECTS) */}
      <section className="w-full bg-brand-charcoal/50 border-y border-glass-border py-24 px-6 relative z-10 overflow-hidden">
        {/* Flame radial background element */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] rounded-full radial-glow-1 opacity-25 blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Flame Visual Sandbox */}
          <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center bg-brand-matte/80 border border-glass-border/30 rounded-3xl overflow-hidden shadow-2xl p-12 group">
            {/* Ambient hot oven interior ring */}
            <div className="absolute inset-8 rounded-full border border-brand-orange/10 flex items-center justify-center animate-pulse-slow">
              <div className="absolute inset-8 rounded-full border border-brand-orange/5" />
            </div>

            {/* Glowing volcano pizza stone placeholder graphic */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute w-60 h-60 rounded-full border border-dashed border-brand-orange/20 flex items-center justify-center"
            >
              <div className="w-56 h-56 rounded-full border border-dotted border-brand-beige/10" />
            </motion.div>

            {/* Floating embers (Animated sparks) using Framer Motion */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-brand-orange shadow-[0_0_8px_rgba(122,28,36,0.8)]"
                initial={{
                  x: Math.random() * 120 - 60,
                  y: 100,
                  opacity: 0,
                  scale: 0.5
                }}
                animate={{
                  y: -100,
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1.2, 0.8, 0],
                  x: Math.random() * 160 - 80,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5 + Math.random() * 2,
                  delay: i * 0.4,
                  ease: "easeOut"
                }}
              />
            ))}

            {/* Center Hearth Fire Indicator */}
            <div className="flex flex-col items-center gap-3 relative z-10">
              <div className="p-6 rounded-full bg-brand-orange/10 border border-brand-orange/20 shadow-[0_0_40px_rgba(122,28,36,0.2)] text-brand-orange animate-glow">
                <Flame className="w-10 h-10 animate-bounce" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-beige font-display select-none">
                OVEN INTERIOR 900°F
              </span>
            </div>
            
            {/* Matte bottom backdrop overlay */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass-panel border border-glass-border flex items-center justify-between text-xs text-gray-subtle">
              <span>Clay Hearth: Volcanic Vesuvio Rock</span>
              <span className="text-brand-orange font-bold font-sans">100% Organic Oak Wood</span>
            </div>
          </div>

          {/* Context Copy */}
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange font-display">
              Heritage & Physics
            </span>
            <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-offwhite leading-tight">
              Slow Proofed Sourdough, <br />
              <span className="text-gradient">Fired In 60 Seconds.</span>
            </h2>
            <p className="text-sm font-light text-gray-subtle leading-relaxed font-sans">
              Our culinary physics are non-negotiable. We source fine Italian stone-ground organic wheat, combining it with our wild starter culture born in Campania. 
            </p>
            <p className="text-sm font-light text-gray-subtle leading-relaxed font-sans">
              The dough undergoes a slow, silent 48-hour cool proofing session, allowing complex lactic acid notes to enrich the protein matrix. The result? A remarkably airy, blistered, leopard-charred crust that dissolves effortlessly in the mouth, carrying the delicate oak-fired perfume of our custom-built volcanic dome hearth.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-glass-border mt-4">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold font-display text-brand-beige">48h</span>
                <span className="text-[9px] uppercase tracking-wider text-gray-subtle">Cool Fermentation</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold font-display text-brand-beige">900°F</span>
                <span className="text-[9px] uppercase tracking-wider text-gray-subtle">Oak Hearth dome</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold font-display text-brand-beige">60s</span>
                <span className="text-[9px] uppercase tracking-wider text-gray-subtle">Instantaneous Bake</span>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* 4. WHY CHOOSE US SECTION (Modern luxury pillars) */}
      <section className="w-full max-w-7xl px-6 py-24 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16 flex flex-col items-center gap-3">
          <span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange font-display">
            Our Brand Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-tight text-offwhite">
            Designed for The Sensory Elite
          </h2>
          <p className="text-sm font-light text-gray-subtle leading-relaxed font-sans">
            We operate at the sweet intersection of traditional craftsmanship, high-fashion styling, and ultra-immersive dining.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Flame className="w-6 h-6 text-brand-orange" />,
              title: "Volcanic Clay Baking",
              desc: "Baked exclusively in custom clay ovens hand-built by Neapolitan stonemasons, using split oak wood seasoned for 18 months."
            },
            {
              icon: <Trophy className="w-6 h-6 text-brand-orange" />,
              title: "Editorial Rare Ingredients",
              desc: "From sweet San Marzano tomatoes raised in volcanic ash, to fresh cream-filled burrata flown in weekly from Apulia."
            },
            {
              icon: <Heart className="w-6 h-6 text-brand-orange" />,
              title: "Cinematic Atmosphere",
              desc: "We style our space with warm ambient lighting, smooth dark contours, and deep lounge vibrations to soothe the senses."
            }
          ].map((pillar, idx) => (
            <div
              key={idx}
              className="glass-panel p-8 rounded-2xl border border-glass-border flex flex-col gap-5 hover:border-brand-orange/20 transition-colors duration-300 hover:shadow-2xl group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-orange/5 border border-brand-orange/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[inset_0_0_10px_rgba(122,28,36,0.03)]">
                {pillar.icon}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-display font-bold uppercase tracking-wider text-offwhite text-sm">
                  {pillar.title}
                </h3>
                <p className="text-xs font-light text-gray-subtle leading-relaxed font-sans">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 5. TESTIMONIALS SECTION */}
      <section className="w-full bg-brand-charcoal/30 border-y border-glass-border py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center gap-3 mb-16 max-w-xl mx-auto">
            <span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange font-display">
              Resounding Applause
            </span>
            <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-tight text-offwhite">
              Sought After by Tastemakers
            </h2>
            <p className="text-sm font-light text-gray-subtle leading-relaxed">
              Real opinions from individuals who worship deep aesthetics, design curation, and flawless culinary geometry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="glass-panel p-6 rounded-2xl border border-glass-border flex flex-col justify-between gap-6 shadow-xl"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-0.5 text-brand-orange">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-orange" />
                    ))}
                  </div>
                  <p className="text-sm font-light text-gray-subtle leading-relaxed font-sans italic">
                    "{rev.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-4 border-t border-glass-border">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <h4 className="text-xs font-bold font-display uppercase tracking-wider text-offwhite">
                      {rev.name}
                    </h4>
                    <span className="text-[10px] font-light text-gray-subtle uppercase tracking-widest">
                      {rev.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 6. INSTAGRAM/SOCIAL GALLERY */}
      <section className="w-full max-w-7xl px-6 py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange font-display">
              Social Canvas
            </span>
            <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-tight text-offwhite">
              Curation of The Grid
            </h2>
          </div>
          <a
            href="#instagram"
            className="text-xs font-bold uppercase tracking-widest text-brand-beige hover:text-brand-orange font-display flex items-center gap-2 group transition-colors cursor-pointer"
          >
            Follow @moonlight.cafe <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="aspect-square rounded-xl overflow-hidden border border-glass-border bg-brand-charcoal relative group shadow-md"
            >
              <img
                src={post.url}
                alt="Instagram food visual"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-90 saturate-95"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <svg className="w-5 h-5 text-white animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 7. CTA BANNER */}
      <section className="w-full max-w-7xl px-6 pb-24 relative z-10">
        <div className="w-full glass-panel border border-glass-border/30 rounded-3xl relative overflow-hidden p-12 md:p-20 text-center flex flex-col items-center gap-6 shadow-2xl">
          {/* Flame radial background */}
          <div className="absolute inset-0 radial-glow-1 opacity-20 pointer-events-none" />

          <span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange font-display relative z-10">
            Aesthetic Dining Reservation
          </span>
          <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-offwhite max-w-2xl relative z-10 leading-tight">
            Reserve Your Volcanic clay Experience
          </h2>
          <p className="text-sm font-light text-gray-subtle max-w-lg leading-relaxed font-sans relative z-10">
            Due to our prolonged sourdough fermentation, our dough is finite. We bake only 150 crusts each day. Book your seat in SoHo's temple of fire.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto relative z-10">
            <Link
              to="/menu"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-beige hover:bg-brand-beige-hover text-brand-matte font-display text-xs font-black tracking-widest uppercase hover:scale-[1.03] transition-transform shadow-xl cursor-pointer"
            >
              Order Sourdough Now
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/10 hover:border-white/20 bg-brand-matte/50 text-offwhite font-display text-xs font-bold tracking-widest uppercase hover:scale-[1.03] transition-transform cursor-pointer"
            >
              Table Reservations
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
