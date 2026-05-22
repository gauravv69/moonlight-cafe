import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Leaf, Minus, Plus, ShieldCheck, ShoppingBag, Flame, Sparkles } from "lucide-react";
import { PIZZAS } from "../mock-data/pizzas";
import { useCartStore } from "../store/cartStore";
import { toast } from "../store/toastStore";

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCartStore();

  // Find base item
  const item = useMemo(() => PIZZAS.find((p) => p.id === id), [id]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const [quantity, setQuantity] = useState(1);

  // Sync initial parameters on item change
  useEffect(() => {
    if (item) {
      setQuantity(1);
    }
  }, [item]);

  if (!item) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-24 text-center flex flex-col items-center gap-6 z-10">
        <div className="w-20 h-20 rounded-full bg-brand-darkgray/30 flex items-center justify-center border border-glass-border">
          <span className="text-3xl">🌙</span>
        </div>
        <h2 className="text-2xl font-display font-bold uppercase text-offwhite">Recipe Not Found</h2>
        <p className="text-sm font-light text-gray-subtle">
          This culinary blueprint does not exist in our baking index.
        </p>
        <button
          onClick={() => navigate("/menu")}
          className="px-6 py-3 rounded-full bg-brand-beige text-brand-matte font-display text-xs font-bold uppercase tracking-widest hover:scale-[1.03] transition-transform shadow-lg cursor-pointer"
        >
          Return to Gallery
        </button>
      </div>
    );
  }

  const handleAddToBag = () => {
    addToCart({
      pizzaId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity,
      customization: {
        crust: "Standard",
        cheese: "Standard",
        toppings: [],
        spiceLevel: 0,
      },
    });

    toast.success(`${item.name} added to your collection.`);
  };

  const handleQuickAdd = (e: React.MouseEvent, rec: typeof PIZZAS[0]) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      pizzaId: rec.id,
      name: rec.name,
      price: rec.price,
      image: rec.image,
      quantity: 1,
      customization: {
        crust: "Standard",
        cheese: "Standard",
        toppings: [],
        spiceLevel: 0,
      },
    });

    toast.success(`${rec.name} added to your collection.`);
  };

  // Business-Mindset Cross-Selling Recommendations
  const recommendations = useMemo(() => {
    let targetIds: string[] = [];

    // Smart pairings based on category
    switch (item.category) {
      case "Veg Pizzas":
      case "Calzone":
        targetIds = ["classic-garlic-bread", "watermelon-mojito", "ice-cream-chocolate"];
        break;
      case "Non-Veg Pizzas":
        targetIds = ["chicken-wings", "cranberry-sangria", "ice-cream-vanilla"];
        break;
      case "Veg Pastas":
        targetIds = ["cheese-garlic-bread", "ice-cream-strawberry", "watermelon-mojito"];
        break;
      case "Non-Veg Pastas":
        targetIds = ["garlic-chicken-bread", "cranberry-sangria", "ice-cream-chocolate"];
        break;
      case "Veg Burgers":
      case "Veg Sandwiches":
        targetIds = ["watermelon-mojito", "ice-cream-butterscotch", "classic-garlic-bread"];
        break;
      case "Non-Veg Burgers":
      case "Non-Veg Sandwiches":
        targetIds = ["chicken-fries", "cranberry-sangria", "ice-cream-mango"];
        break;
      case "Garlic Breads":
      case "Starters":
        targetIds = item.isVeg 
          ? ["classic-margarita", "spaghetti-pesto", "watermelon-mojito"]
          : ["peri-peri-chicken-pizza", "grande-chicken-burger", "cranberry-sangria"];
        break;
      case "Mocktails":
      case "Coffees":
      case "Tea":
      case "Milkshakes":
        targetIds = ["classic-margarita", "chicken-club-sandwich", "cheese-garlic-bread"];
        break;
      case "Ice Cream":
        targetIds = ["classic-margarita", "veggie-burger", "classic-garlic-bread"];
        break;
      default:
        targetIds = ["cheese-garlic-bread", "cranberry-sangria", "ice-cream-vanilla"];
    }

    // Map IDs to actual items
    let crossSells = targetIds
      .map(id => PIZZAS.find(p => p.id === id))
      .filter(Boolean) as typeof PIZZAS;

    // Filter out current item just in case
    crossSells = crossSells.filter(p => p.id !== item.id);

    // Fallback if not enough items
    if (crossSells.length < 3) {
      const general = PIZZAS.filter((p) => p.id !== item.id && !crossSells.find(x => x.id === p.id));
      crossSells = [...crossSells, ...general].slice(0, 3);
    }

    return crossSells;
  }, [item]);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 relative z-10 flex flex-col gap-16 md:gap-20">
      
      {/* Back Button Link */}
      <button
        onClick={() => {
          if (window.history.length > 2) {
            navigate(-1);
          } else {
            navigate("/menu");
          }
        }}
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-beige hover:text-brand-orange transition-colors w-fit font-display bg-transparent border-none p-0 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Gallery
      </button>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column (Sticky visual block) */}
        <div className="lg:col-span-6 lg:sticky lg:top-28 flex flex-col gap-8">
          <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-2xl overflow-hidden border border-glass-border shadow-2xl bg-brand-charcoal group">
            
            {/* Ambient hot oven interior ring */}
            <div className="absolute inset-0 radial-glow-1 opacity-20 pointer-events-none" />
            
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 filter brightness-95"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 via-transparent to-transparent pointer-events-none" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full bg-brand-orange text-white text-[9px] font-black uppercase tracking-wider shadow-md">
                {item.category}
              </span>
              {item.isVeg ? (
                <span className="px-3 py-1 rounded-full bg-green-950/65 backdrop-blur-md text-green-400 border border-green-500/20 text-[9px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1">
                  <Leaf className="w-3 h-3" /> Veg
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-red-950/65 backdrop-blur-md text-red-400 border border-red-500/20 text-[9px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> Non-Veg
                </span>
              )}
            </div>
          </div>

          {/* Sourdough Storytelling */}
          {item.story && (
            <div className="glass-panel p-6 rounded-2xl border border-glass-border flex flex-col gap-4 bg-brand-charcoal/30">
              <h3 className="font-display font-bold uppercase text-[10px] tracking-wider text-brand-orange flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Heritage & Culinary Chemistry
              </h3>
              <p className="text-sm font-sans font-light text-offwhite leading-relaxed">
                {item.story}
              </p>
              <div className="flex items-center gap-6 pt-4 border-t border-glass-border text-xs text-gray-subtle font-medium">
                <span>🕒 Prep: {item.preparationTime}</span>
                <span>🔥 Energy: {item.calories} kCal</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Configuration Builder Column */}
        <div className="lg:col-span-6 flex flex-col gap-8">
          
          {/* Header titles */}
          <div className="flex flex-col gap-2.5">
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-offwhite leading-tight">
              {item.name}
            </h1>
            {item.tagline && (
              <p className="text-sm font-bold tracking-widest text-brand-orange font-display uppercase italic">
                "{item.tagline}"
              </p>
            )}
            <p className="text-sm font-light text-gray-subtle leading-relaxed font-sans mt-2">
              {item.description}
            </p>
          </div>

          <div className="h-[1px] bg-glass-border" />

          <div className="glass-panel p-6 rounded-xl border border-glass-border bg-brand-charcoal/20 text-center flex flex-col gap-3">
            <span className="text-3xl">🍲</span>
            <h4 className="font-display font-bold uppercase tracking-wide text-xs text-brand-beige">
              Artisanal Made to Order
            </h4>
            <p className="text-xs font-sans font-light text-gray-subtle leading-relaxed">
              This recipe is carefully prepared by our master chefs using exact measurements of fresh local supplies. No customizable additions are required to experience its pristine culinary layout.
            </p>
          </div>

          <div className="h-[1px] bg-glass-border" />

          {/* Quantity and Checkout Trigger Panel */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
            
            {/* Quantity adjust */}
            <div className="flex items-center justify-between w-full md:w-auto gap-4 bg-brand-charcoal/60 px-5 py-3.5 rounded-full border border-glass-border shadow-md">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-subtle font-display select-none">
                Bake Count:
              </span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-gray-subtle hover:text-offwhite transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-black text-offwhite font-sans w-5 text-center select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-gray-subtle hover:text-offwhite transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Price tag + Add button */}
            <div className="flex items-center justify-between w-full md:w-auto gap-6">
              <div className="flex flex-col text-right">
                <span className="text-[9px] uppercase tracking-wider text-gray-subtle">Total Price</span>
                <span className="text-2xl font-black font-display text-brand-beige leading-none">
                  ₹{item.price * quantity}
                </span>
              </div>

              <button
                onClick={handleAddToBag}
                className="flex-1 md:flex-none px-8 py-4 rounded-full bg-brand-orange hover:bg-brand-orange-light text-white font-display text-[10px] font-black tracking-widest uppercase transition-all duration-300 hover:scale-[1.03] shadow-xl shadow-brand-orange/15 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <ShoppingBag className="w-4.5 h-4.5" /> Add to Sourdough Bag
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-gray-subtle font-sans justify-center mt-2">
            <ShieldCheck className="w-4 h-4 text-brand-beige" /> Safe checkout. We use premium local organic supply chains.
          </div>

        </div>

      </div>

      {/* Recommended items section */}
      <div className="flex flex-col gap-10 mt-12 pt-16 border-t border-glass-border">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange font-display">
            Complete Your Meal
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold uppercase tracking-tight text-offwhite">
            Perfect Add-Ons
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="glass-panel rounded-xl overflow-hidden border border-glass-border flex flex-col group hover:border-brand-orange/20 transition-all duration-500 shadow-lg relative"
            >
              <Link to={`/product/${rec.id}`} className="block h-48 overflow-hidden relative bg-brand-matte">
                <img
                  src={rec.image}
                  alt={rec.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 to-transparent" />
              </Link>
              <div className="p-5 flex-1 flex flex-col justify-between gap-4 bg-brand-charcoal/40">
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display font-bold uppercase text-sm tracking-wide text-offwhite leading-tight">
                    {rec.name}
                  </h3>
                  <p className="text-[10px] font-light text-gray-subtle leading-relaxed line-clamp-2">
                    {rec.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-glass-border">
                  <span className="text-sm font-bold text-brand-beige font-sans">
                    ₹{rec.price}
                  </span>
                  <button
                    onClick={(e) => handleQuickAdd(e, rec)}
                    className="p-1.5 px-3 rounded-full bg-brand-orange hover:bg-brand-orange-light text-white font-display text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1.5 shadow-lg"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
