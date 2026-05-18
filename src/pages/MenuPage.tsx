import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Leaf, Search, ShoppingBag, SlidersHorizontal } from "lucide-react";
import { CATEGORIES, PIZZAS } from "../mock-data/pizzas";
import { useCartStore } from "../store/cartStore";
import { toast } from "../store/toastStore";

export const MenuPage: React.FC = () => {
  const { addToCart } = useCartStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Pizzas");
  const [onlyVeg, setOnlyVeg] = useState(false);
  const [sortBy, setSortBy] = useState<"default" | "price-low" | "price-high">("default");

  // Filter and Sort Pizza List
  const filteredPizzas = useMemo(() => {
    return PIZZAS.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "All Pizzas" || p.category === selectedCategory;
      const matchesVeg = !onlyVeg || p.isVeg;

      return matchesSearch && matchesCategory && matchesVeg;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0; // default order
    });
  }, [searchTerm, selectedCategory, onlyVeg, sortBy]);

  // Direct quick add to cart with standard options
  const handleQuickAdd = (e: React.MouseEvent, pizza: typeof PIZZAS[0]) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      pizzaId: pizza.id,
      name: pizza.name,
      price: pizza.price,
      image: pizza.image,
      quantity: 1,
      customization: {
        crust: "48h Sourdough Classic",
        cheese: "Fior Di Latte",
        toppings: [],
        spiceLevel: pizza.spicyLevel,
      },
    });

    toast.success(`Added ${pizza.name} to your collection.`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-16 relative z-10 flex flex-col gap-12">
      
      {/* Editorial Header */}
      <div className="flex flex-col gap-4 text-center md:text-left max-w-2xl">
        <span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange font-display">
          Artisanal Fire-Baked Gallery
        </span>
        <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-offwhite">
          Our Pizza Gallery
        </h1>
        <p className="text-sm font-light text-gray-subtle leading-relaxed font-sans">
          Bake count is restricted to 150 daily units. Browse our live fermentation index. Configure toppings and bake metrics to order.
        </p>
      </div>

      {/* Control Panel: Search & Filters */}
      <div className="glass-panel p-6 rounded-2xl border border-glass-border flex flex-col lg:flex-row gap-6 items-center justify-between shadow-xl">
        {/* Search Input */}
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-subtle" />
          <input
            type="text"
            placeholder="Search pizza name, ingredients, tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full glass-input pl-11 pr-4 py-3 rounded-full text-xs uppercase tracking-wider font-semibold"
          />
        </div>

        {/* Filters and Sorting */}
        <div className="w-full lg:w-auto flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-end gap-4 w-full">
          {/* Veg Toggle */}
          <button
            onClick={() => setOnlyVeg(!onlyVeg)}
            className={`px-5 py-3 rounded-full border transition-all duration-300 text-xs font-display font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer ${
              onlyVeg
                ? "border-green-500/40 bg-green-500/10 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.15)]"
                : "border-glass-border text-gray-subtle hover:border-offwhite/20 hover:text-offwhite"
            }`}
          >
            <Leaf className="w-3.5 h-3.5" />
            Veg Only
          </button>

          {/* Sort Select */}
          <div className="relative shrink-0 w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full sm:w-auto appearance-none glass-input px-5 py-3 pr-10 rounded-full text-xs font-display font-bold uppercase tracking-widest cursor-pointer"
            >
              <option value="default">Sort: Fermentation</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-subtle pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Category Tabs (Scrollable on mobile) */}
      <div className="w-full overflow-x-auto no-scrollbar border-b border-glass-border pb-1">
        <div className="flex gap-2 min-w-max">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 text-xs font-display font-bold uppercase tracking-widest transition-all relative cursor-pointer ${
                selectedCategory === cat
                  ? "text-brand-orange"
                  : "text-gray-subtle hover:text-offwhite"
              }`}
            >
              {cat}
              {selectedCategory === cat && (
                <motion.span
                  layoutId="activeCategory"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-orange shadow-[0_0_10px_rgba(122,28,36,0.8)]"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Live Pizza Gallery Grid */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {filteredPizzas.length === 0 ? (
            /* Empty Search Results */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center gap-6 py-24"
            >
              <div className="w-20 h-20 rounded-full bg-brand-darkgray/30 flex items-center justify-center border border-glass-border/30">
                <Search className="w-7 h-7 text-brand-orange" />
              </div>
              <div className="flex flex-col gap-2 max-w-sm">
                <h3 className="font-display font-bold uppercase tracking-wider text-offwhite">
                  No Recipes Found
                </h3>
                <p className="text-xs font-light text-gray-subtle leading-relaxed">
                  We couldn't locate any wood-fired configurations fitting your parameters. Try searching general tags like 'truffle', 'spicy', or 'white'.
                </p>
              </div>
            </motion.div>
          ) : (
            /* Pizza Cards Grid */
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPizzas.map((pizza) => (
                <motion.div
                  key={pizza.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-panel rounded-2xl overflow-hidden border border-glass-border flex flex-col group hover:border-brand-orange/20 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)] shadow-xl relative"
                >
                  {/* Photo Visuals */}
                  <Link to={`/product/${pizza.id}`} className="block h-56 md:h-64 overflow-hidden relative bg-brand-matte">
                    <img
                      src={pizza.image}
                      alt={pizza.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    
                    {/* Visual Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {pizza.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full bg-brand-matte/60 backdrop-blur-md text-brand-beige border border-glass-border text-[9px] font-bold uppercase tracking-wider w-fit"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Vegetarian Indicator */}
                    {pizza.isVeg && (
                      <span className="absolute top-4 right-4 p-1.5 rounded-full bg-green-500/10 backdrop-blur-md text-green-400 border border-green-500/20 shadow-md">
                        <Leaf className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </Link>

                  {/* Context Descriptions */}
                  <div className="p-6 flex-1 flex flex-col justify-between gap-6 bg-brand-charcoal/40">
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-start justify-between gap-3">
                        <Link to={`/product/${pizza.id}`} className="font-display font-bold text-base md:text-lg tracking-wide text-offwhite hover:text-brand-orange transition-colors">
                          {pizza.name}
                        </Link>
                        <span className="font-sans font-bold text-base text-brand-beige shrink-0">
                          ${pizza.price.toFixed(2)}
                        </span>
                      </div>
                      
                      <p className="text-[10px] font-semibold text-brand-orange tracking-widest uppercase font-display italic">
                        "{pizza.tagline}"
                      </p>

                      <p className="text-xs font-light text-gray-subtle leading-relaxed font-sans line-clamp-3">
                        {pizza.description}
                      </p>

                      {/* Info Metadata */}
                      <div className="flex items-center gap-4 pt-3 text-[10px] text-gray-subtle font-sans font-medium">
                        <span>🕒 {pizza.preparationTime}</span>
                        <span>🔥 {pizza.calories} kCal</span>
                        {pizza.spicyLevel > 0 && (
                          <span className="text-red-400 font-semibold flex items-center gap-0.5">
                            {"🌶️".repeat(pizza.spicyLevel)} SPICY
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions Panel */}
                    <div className="flex items-center gap-3 pt-4 border-t border-glass-border mt-auto">
                      <Link
                        to={`/product/${pizza.id}`}
                        className="flex-1 py-2.5 rounded-full border border-glass-border hover:border-offwhite/20 text-offwhite font-display text-[10px] font-bold uppercase tracking-widest text-center transition-all cursor-pointer hover:bg-white/5"
                      >
                        Customize Craft
                      </Link>
                      
                      <button
                        onClick={(e) => handleQuickAdd(e, pizza)}
                        className="p-2.5 rounded-full bg-brand-orange hover:bg-brand-orange-light text-white transition-all shadow-lg hover:scale-105 cursor-pointer"
                        aria-label="Quick add to collection"
                        title="Quick Add to Bag"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};
