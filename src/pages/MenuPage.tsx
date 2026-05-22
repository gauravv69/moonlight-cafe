import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Leaf, Search, ShoppingBag, SlidersHorizontal, Sparkles, Flame, Eye } from "lucide-react";
import { CATEGORIES, PIZZAS } from "../mock-data/pizzas";
import { useCartStore } from "../store/cartStore";
import { toast } from "../store/toastStore";

export const MenuPage: React.FC = () => {
  const { addToCart } = useCartStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dietFilter, setDietFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [sortBy, setSortBy] = useState<"default" | "price-low" | "price-high">("default");

  // Filter and Sort Menu Items
  const filteredItems = useMemo(() => {
    return PIZZAS.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      
      let matchesDiet = true;
      if (dietFilter === "veg") {
        matchesDiet = p.isVeg;
      } else if (dietFilter === "non-veg") {
        matchesDiet = !p.isVeg;
      }

      return matchesSearch && matchesCategory && matchesDiet;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0; // default order
    });
  }, [searchTerm, selectedCategory, dietFilter, sortBy]);

  // Direct quick add to cart
  const handleQuickAdd = (e: React.MouseEvent, item: typeof PIZZAS[0]) => {
    e.preventDefault();
    e.stopPropagation();

    const isPizzaOrCalzone = item.category.toLowerCase().includes("pizza") || item.category.toLowerCase().includes("calzone");

    addToCart({
      pizzaId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      customization: {
        crust: isPizzaOrCalzone ? "48h Sourdough Classic" : "Standard",
        cheese: isPizzaOrCalzone ? "Fior Di Latte" : "None",
        toppings: [],
        spiceLevel: item.spicyLevel,
      },
    });

    toast.success(`Added ${item.name} to your collection.`);
  };

  return (
    <div className="w-full relative z-10 flex flex-col">
      
      {/* Editorial Header Section */}
      <div className="w-full max-w-7xl mx-auto px-6 pt-12 pb-8 flex flex-col gap-4 text-center md:text-left">
        <div className="inline-flex items-center justify-center md:justify-start gap-2 text-[10px] font-bold tracking-widest uppercase text-brand-orange font-display">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          The Epicurean Standard
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold uppercase tracking-tight text-offwhite leading-[0.95]">
          The <span className="text-gradient">Culinary</span> Gallery
        </h1>
        <p className="text-sm font-light text-gray-subtle leading-relaxed font-sans max-w-xl md:max-w-2xl">
          An editorial index of slow-proved wood-fired sourdough pizzas, handcrafted pastas, and artisanal cafe beverages. Baked, brewed, and styled for the modern sensory elite.
        </p>
      </div>

      {/* Sticky Category Tabs Navigation */}
      <div className="sticky top-[64px] md:top-[76px] z-30 bg-brand-matte/90 backdrop-blur-xl border-y border-glass-border py-4 overflow-x-auto no-scrollbar shadow-[0_10px_30px_rgba(0,0,0,0.7)]">
        <div className="max-w-7xl mx-auto px-6 flex gap-2.5 min-w-max">
          {["All", ...CATEGORIES].map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-[10px] font-display font-extrabold uppercase tracking-widest transition-all duration-300 relative cursor-pointer ${
                  isSelected
                    ? "bg-brand-orange text-white border border-brand-orange/40 shadow-[0_0_20px_rgba(122,28,36,0.5)]"
                    : "bg-brand-charcoal/40 text-gray-subtle border border-glass-border hover:border-offwhite/20 hover:text-offwhite"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Panel: Search & Diet & Sorting */}
      <div className="w-full max-w-7xl mx-auto px-6 mt-10 mb-12">
        <div className="glass-panel p-6 rounded-2xl border border-glass-border flex flex-col xl:flex-row gap-6 items-center justify-between shadow-2xl bg-brand-charcoal/40">
          
          {/* Search Input */}
          <div className="relative w-full xl:max-w-md">
            <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-subtle" />
            <input
              type="text"
              placeholder="Search recipe, ingredients, tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full glass-input pl-12 pr-4 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold"
            />
          </div>

          {/* Filters & Sorting */}
          <div className="w-full xl:w-auto flex flex-col md:flex-row items-center gap-4 justify-end">
            
            {/* Premium Three-State Diet Filter */}
            <div className="flex bg-brand-matte/50 p-1.5 rounded-full border border-glass-border shrink-0 w-full md:w-auto">
              {[
                { id: "all", label: "All Recipes" },
                { id: "veg", label: "Veg Only", icon: <Leaf className="w-3 h-3" /> },
                { id: "non-veg", label: "Non-Veg Only", icon: <Flame className="w-3 h-3" /> },
              ].map((diet) => {
                const isActive = dietFilter === diet.id;
                return (
                  <button
                    key={diet.id}
                    onClick={() => setDietFilter(diet.id as any)}
                    className={`flex-1 md:flex-none px-4 py-2 rounded-full text-[9px] font-display font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${
                      isActive
                        ? diet.id === "veg"
                          ? "bg-green-950/40 text-green-400 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                          : diet.id === "non-veg"
                            ? "bg-red-950/40 text-red-400 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                            : "bg-brand-orange text-white border border-brand-orange/20 shadow-[0_0_15px_rgba(122,28,36,0.3)]"
                        : "text-gray-subtle hover:text-offwhite"
                    }`}
                  >
                    {diet.icon}
                    {diet.label}
                  </button>
                );
              })}
            </div>

            {/* Sort Select */}
            <div className="relative shrink-0 w-full md:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full appearance-none glass-input px-5 py-3.5 pr-10 rounded-full text-xs font-display font-bold uppercase tracking-widest cursor-pointer text-offwhite"
              >
                <option value="default">Sort: Fermentation</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <SlidersHorizontal className="absolute right-4.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-subtle pointer-events-none" />
            </div>

          </div>
        </div>
      </div>

      {/* Grid Canvas Section */}
      <div className="w-full max-w-7xl mx-auto px-6 pb-24 min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {filteredItems.length === 0 ? (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center gap-6 py-24 glass-panel rounded-3xl border border-glass-border/30 max-w-xl mx-auto"
            >
              <div className="w-20 h-20 rounded-full bg-brand-darkgray/30 flex items-center justify-center border border-glass-border/30">
                <Search className="w-7 h-7 text-brand-orange" />
              </div>
              <div className="flex flex-col gap-2 max-w-sm px-4">
                <h3 className="font-display font-bold uppercase tracking-wider text-offwhite">
                  No Selections Found
                </h3>
                <p className="text-xs font-light text-gray-subtle leading-relaxed">
                  We couldn't locate any culinary masterpieces matching your criteria in <span className="text-brand-beige font-semibold">"{selectedCategory}"</span>. Try adjusting your Veg / Non-Veg filters.
                </p>
              </div>
            </motion.div>
          ) : (
            /* Cards Grid Layout */
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredItems.map((item) => {
                const isBestseller = item.tags.some(t => t.toUpperCase() === "BESTSELLER" || t.toUpperCase() === "BEST SELLER");
                
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="glass-panel rounded-2xl overflow-hidden border border-glass-border flex flex-col group hover:border-brand-orange/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(122,28,36,0.12)] shadow-xl relative"
                  >
                    
                    {/* Media Block */}
                    <Link to={`/product/${item.id}`} className="block h-56 md:h-60 overflow-hidden relative bg-brand-matte">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-95"
                      />
                      
                      {/* Dark Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                      
                      {/* Bestseller Glow Badge */}
                      {isBestseller && (
                        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-brand-orange text-white border border-brand-orange/40 text-[9px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(122,28,36,0.6)] flex items-center gap-1">
                          <Sparkles className="w-3 h-3 fill-white" />
                          Bestseller
                        </div>
                      )}

                      {/* Tag pill */}
                      {!isBestseller && item.tags.length > 0 && (
                        <div className="absolute top-4 left-4 z-10 px-2.5 py-0.5 rounded-full bg-brand-matte/60 backdrop-blur-md text-brand-beige border border-glass-border text-[8px] font-extrabold uppercase tracking-widest">
                          {item.tags[0]}
                        </div>
                      )}

                      {/* Diet Indicator (Veg/Non-veg Dot) */}
                      <div className="absolute top-4 right-4 z-10">
                        {item.isVeg ? (
                          <span className="p-2.5 rounded-full bg-green-950/65 backdrop-blur-md text-green-400 border border-green-500/20 shadow-md flex items-center justify-center">
                            <Leaf className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="p-2.5 rounded-full bg-red-950/65 backdrop-blur-md text-red-400 border border-red-500/20 shadow-md flex items-center justify-center">
                            <Flame className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </Link>

                    {/* Context descriptions */}
                    <div className="p-6 flex-1 flex flex-col justify-between gap-6 bg-brand-charcoal/40">
                      <div className="flex flex-col gap-2.5">
                        
                        {/* Title & Pricing */}
                        <div className="flex items-start justify-between gap-3">
                          <Link 
                            to={`/product/${item.id}`} 
                            className="font-display font-extrabold text-base md:text-lg tracking-wide text-offwhite hover:text-brand-orange transition-colors duration-300 line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <span className="font-sans font-black text-base text-brand-beige shrink-0">
                            ₹{item.price}
                          </span>
                        </div>

                        {/* Tagline */}
                        {item.tagline && (
                          <p className="text-[9px] font-bold text-brand-orange tracking-widest uppercase font-display italic">
                            "{item.tagline}"
                          </p>
                        )}

                        {/* Description */}
                        <p className="text-xs font-light text-gray-subtle leading-relaxed font-sans line-clamp-3">
                          {item.description}
                        </p>

                        {/* Metadata row */}
                        <div className="flex items-center gap-4 pt-3 text-[10px] text-gray-subtle font-sans font-semibold">
                          <span>🕒 {item.preparationTime}</span>
                          <span>🔥 {item.calories} kCal</span>
                          {item.spicyLevel > 0 && (
                            <span className="text-red-400 font-extrabold flex items-center gap-0.5 tracking-wider">
                              🌶️ SPICY
                            </span>
                          )}
                        </div>

                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-3 pt-4 border-t border-glass-border mt-auto">
                        <Link
                          to={`/product/${item.id}`}
                          className="flex-1 py-3 rounded-full border border-glass-border hover:border-offwhite/25 text-offwhite font-display text-[9px] font-black uppercase tracking-widest text-center transition-all cursor-pointer hover:bg-white/5 flex items-center justify-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" /> Details
                        </Link>
                        
                        <button
                          onClick={(e) => handleQuickAdd(e, item)}
                          className="p-3 rounded-full bg-brand-orange hover:bg-brand-orange-light text-white transition-all duration-300 shadow-lg hover:scale-105 cursor-pointer"
                          aria-label="Quick add to collection"
                          title="Quick Add to Bag"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>

                    </div>

                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};
