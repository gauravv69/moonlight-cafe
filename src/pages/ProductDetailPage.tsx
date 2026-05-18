import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Leaf, Minus, Plus, ShieldCheck, ShoppingBag } from "lucide-react";
import { PIZZAS } from "../mock-data/pizzas";
import { useCartStore } from "../store/cartStore";
import { toast } from "../store/toastStore";

// Option pricing
const CRUST_OPTIONS = [
  { name: "48h Sourdough Classic", price: 0.00 },
  { name: "Gluten-Free Charcoal Sourdough", price: 2.50 },
  { name: "Garlic Butter Infused Sourdough", price: 1.50 },
];

const CHEESE_OPTIONS = [
  { name: "Fior Di Latte", price: 0.00 },
  { name: "Double Buffalo Mozzarella", price: 3.00 },
  { name: "Vegan Cashew Cheese", price: 1.00 },
];

const TOPPING_OPTIONS = [
  { id: "burrata-crown", name: "Burrata Crown", price: 4.00 },
  { id: "calabrian-chili", name: "Calabrian Chili Paste", price: 1.50 },
  { id: "truffle-paste", name: "Wild Forest Truffle Paste", price: 5.00 },
  { id: "prosciutto", name: "Prosciutto di Parma", price: 4.50 },
  { id: "figs", name: "Fresh Mission Figs", price: 3.00 },
];

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCartStore();

  // Find base pizza
  const pizza = useMemo(() => PIZZAS.find((p) => p.id === id), [id]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Configuration States
  const [selectedCrust, setSelectedCrust] = useState(CRUST_OPTIONS[0].name);
  const [selectedCheese, setSelectedCheese] = useState(CHEESE_OPTIONS[0].name);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [selectedSpice, setSelectedSpice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Sync initial spice level with the base recipe
  useEffect(() => {
    if (pizza) {
      setSelectedSpice(pizza.spicyLevel);
      // Reset toppings/options on route change
      setSelectedCrust(CRUST_OPTIONS[0].name);
      setSelectedCheese(CHEESE_OPTIONS[0].name);
      setSelectedToppings([]);
      setQuantity(1);
    }
  }, [pizza]);

  if (!pizza) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-24 text-center flex flex-col items-center gap-6 z-10">
        <div className="w-20 h-20 rounded-full bg-brand-darkgray/30 flex items-center justify-center border border-glass-border">
          <span className="text-3xl">🍕</span>
        </div>
        <h2 className="text-2xl font-display font-bold uppercase text-offwhite">Recipe Not Found</h2>
        <p className="text-sm font-light text-gray-subtle">
          This pizza blueprint does not exist in our volcanic index.
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

  // Calculate dynamic price in real-time
  const finalSinglePrice = useMemo(() => {
    const crustCost = CRUST_OPTIONS.find((c) => c.name === selectedCrust)?.price || 0;
    const cheeseCost = CHEESE_OPTIONS.find((c) => c.name === selectedCheese)?.price || 0;
    const toppingsCost = selectedToppings.reduce((sum, toppingId) => {
      const topOption = TOPPING_OPTIONS.find((t) => t.id === toppingId);
      return sum + (topOption?.price || 0);
    }, 0);

    return pizza.price + crustCost + cheeseCost + toppingsCost;
  }, [pizza, selectedCrust, selectedCheese, selectedToppings]);

  const handleToppingToggle = (toppingId: string) => {
    if (selectedToppings.includes(toppingId)) {
      setSelectedToppings(selectedToppings.filter((id) => id !== toppingId));
    } else {
      setSelectedToppings([...selectedToppings, toppingId]);
    }
  };

  const handleAddToBag = () => {
    const selectedToppingsNames = selectedToppings.map(
      (id) => TOPPING_OPTIONS.find((t) => t.id === id)?.name || ""
    );

    addToCart({
      pizzaId: pizza.id,
      name: pizza.name,
      price: finalSinglePrice,
      image: pizza.image,
      quantity,
      customization: {
        crust: selectedCrust,
        cheese: selectedCheese,
        toppings: selectedToppingsNames,
        spiceLevel: selectedSpice,
      },
    });

    toast.success(`Customized ${pizza.name} added to your collection.`);
  };

  // Recommendations (filtered base pizza out)
  const recommendations = PIZZAS.filter((p) => p.id !== pizza.id).slice(0, 3);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 relative z-10 flex flex-col gap-20">
      
      {/* Back Button Link */}
      <Link
        to="/menu"
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-beige hover:text-brand-orange transition-colors w-fit font-display"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Pizza Gallery
      </Link>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Sticky Cinematic Column */}
        <div className="lg:col-span-6 lg:sticky lg:top-28 flex flex-col gap-8">
          <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-2xl overflow-hidden border border-glass-border shadow-2xl bg-brand-charcoal group">
            {/* Hearth fire background glow */}
            <div className="absolute inset-0 radial-glow-1 opacity-20 pointer-events-none" />
            
            <img
              src={pizza.image}
              alt={pizza.name}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 filter brightness-95"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 via-transparent to-transparent pointer-events-none" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full bg-brand-orange text-white text-[9px] font-black uppercase tracking-wider shadow-md">
                {pizza.category}
              </span>
              {pizza.isVeg && (
                <span className="px-3 py-1 rounded-full bg-green-500/20 backdrop-blur-md text-green-400 border border-green-500/30 text-[9px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1">
                  <Leaf className="w-3 h-3" /> Veg
                </span>
              )}
            </div>
          </div>

          {/* Sourdough Storytelling */}
          <div className="glass-panel p-6 rounded-2xl border border-glass-border flex flex-col gap-4 bg-brand-charcoal/30">
            <h3 className="font-display font-bold uppercase text-xs tracking-wider text-brand-orange">
              Heirloom & Heritage
            </h3>
            <p className="text-sm font-sans font-light text-offwhite leading-relaxed">
              {pizza.story}
            </p>
            <div className="flex items-center gap-6 pt-4 border-t border-glass-border text-xs text-gray-subtle font-medium">
              <span>🕒 prep: {pizza.preparationTime}</span>
              <span>🔥 cals: {pizza.calories}</span>
            </div>
          </div>
        </div>

        {/* Right Configuration Customizer Column */}
        <div className="lg:col-span-6 flex flex-col gap-8">
          {/* Header titles */}
          <div className="flex flex-col gap-2.5">
            <h1 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-offwhite leading-tight">
              {pizza.name}
            </h1>
            <p className="text-sm font-semibold tracking-widest text-brand-orange font-display uppercase italic">
              "{pizza.tagline}"
            </p>
            <p className="text-sm font-light text-gray-subtle leading-relaxed font-sans mt-2">
              {pizza.description}
            </p>
          </div>

          <div className="h-[1px] bg-glass-border" />

          {/* Builder Step 1: Crust Options */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-beige font-display flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center text-[10px] font-black">1</span>
                Sourdough Crust Options
              </h3>
              <span className="text-[10px] font-bold text-gray-subtle uppercase">Select One</span>
            </div>
            
            <div className="flex flex-col gap-3">
              {CRUST_OPTIONS.map((crust) => (
                <button
                  key={crust.name}
                  onClick={() => setSelectedCrust(crust.name)}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-300 cursor-pointer ${
                    selectedCrust === crust.name
                      ? "border-brand-orange bg-brand-orange/5 shadow-[0_0_15px_rgba(122,28,36,0.08)]"
                      : "border-glass-border bg-brand-charcoal/30 text-gray-subtle hover:border-offwhite/20 hover:text-offwhite"
                  }`}
                >
                  <span className="text-sm font-medium tracking-wide">{crust.name}</span>
                  <span className="text-xs font-sans font-bold text-brand-beige">
                    {crust.price === 0 ? "Included" : `+$${crust.price.toFixed(2)}`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Builder Step 2: Cheese Blends */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-beige font-display flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center text-[10px] font-black">2</span>
                Creamy Cheese bases
              </h3>
              <span className="text-[10px] font-bold text-gray-subtle uppercase">Select One</span>
            </div>

            <div className="flex flex-col gap-3">
              {CHEESE_OPTIONS.map((cheese) => (
                <button
                  key={cheese.name}
                  onClick={() => setSelectedCheese(cheese.name)}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-300 cursor-pointer ${
                    selectedCheese === cheese.name
                      ? "border-brand-orange bg-brand-orange/5 shadow-[0_0_15px_rgba(122,28,36,0.08)]"
                      : "border-glass-border bg-brand-charcoal/30 text-gray-subtle hover:border-offwhite/20 hover:text-offwhite"
                  }`}
                >
                  <span className="text-sm font-medium tracking-wide">{cheese.name}</span>
                  <span className="text-xs font-sans font-bold text-brand-beige">
                    {cheese.price === 0 ? "Included" : `+$${cheese.price.toFixed(2)}`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Builder Step 3: Extra Rare Toppings */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-beige font-display flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center text-[10px] font-black">3</span>
                Rare Topping Enhancements
              </h3>
              <span className="text-[10px] font-bold text-gray-subtle uppercase">Select Multiple (Optional)</span>
            </div>

            <div className="flex flex-col gap-3">
              {TOPPING_OPTIONS.map((topping) => {
                const isSelected = selectedToppings.includes(topping.id);
                return (
                  <button
                    key={topping.id}
                    onClick={() => handleToppingToggle(topping.id)}
                    className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "border-brand-orange bg-brand-orange/5 shadow-[0_0_15px_rgba(122,28,36,0.08)]"
                        : "border-glass-border bg-brand-charcoal/30 text-gray-subtle hover:border-offwhite/20 hover:text-offwhite"
                    }`}
                  >
                    <span className="text-sm font-medium tracking-wide">{topping.name}</span>
                    <span className="text-xs font-sans font-bold text-brand-beige">
                      +${topping.price.toFixed(2)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Builder Step 4: Spice level */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-beige font-display flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center text-[10px] font-black">4</span>
              Wood Ember Spice calibration
            </h3>
            
            <div className="glass-panel p-4 rounded-xl border border-glass-border flex items-center justify-between gap-4">
              <div className="flex gap-2">
                {[0, 1, 2, 3].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedSpice(lvl)}
                    className={`px-4 py-2.5 rounded-lg border text-xs font-display font-bold uppercase tracking-widest transition-all cursor-pointer ${
                      selectedSpice === lvl
                        ? "border-brand-orange bg-brand-orange text-white shadow-md"
                        : "border-glass-border bg-brand-charcoal/30 text-gray-subtle hover:text-offwhite"
                    }`}
                  >
                    {lvl === 0 ? "MILD" : `${"🔥".repeat(lvl)}`}
                  </button>
                ))}
              </div>
              <span className="text-xs font-medium text-gray-subtle">
                {selectedSpice === 0 ? "Clean, no spice." : selectedSpice === 1 ? "Subtle glow." : selectedSpice === 2 ? "Intense flames." : "Absolute volcanic heat."}
              </span>
            </div>
          </div>

          <div className="h-[1px] bg-glass-border" />

          {/* Quantity and Checkout Trigger Panel */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 pt-4">
            {/* Quantity */}
            <div className="flex items-center justify-between sm:justify-start gap-4 bg-brand-charcoal/60 px-5 py-3 rounded-full border border-glass-border w-full sm:w-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-subtle font-display select-none">
                Bake Count:
              </span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-gray-subtle hover:text-offwhite transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold text-offwhite font-sans w-5 text-center select-none">
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
            <div className="flex items-center gap-4 justify-between sm:justify-end flex-1">
              <div className="flex flex-col text-right">
                <span className="text-[9px] uppercase tracking-wider text-gray-subtle">Total Price</span>
                <span className="text-2xl font-bold font-display text-brand-beige">
                  ${(finalSinglePrice * quantity).toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleAddToBag}
                className="flex-1 sm:flex-none px-8 py-4.5 rounded-full bg-brand-orange hover:bg-brand-orange-light text-white font-display text-xs font-black tracking-widest uppercase transition-all duration-300 hover:scale-[1.03] shadow-xl shadow-brand-orange/15 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Sourdough Bag
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-gray-subtle font-sans justify-center mt-2">
            <ShieldCheck className="w-4 h-4 text-brand-beige" /> Safe checkout. We use premium local organic supply chains.
          </div>

        </div>

      </div>

      {/* Recommended Pizzas section */}
      <div className="flex flex-col gap-10 mt-12 pt-16 border-t border-glass-border">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange font-display">
            Aesthetic Alternatives
          </span>
          <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-offwhite">
            Recommended blueprints
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
                  <p className="text-xs font-light text-gray-subtle leading-relaxed line-clamp-2">
                    {rec.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-glass-border">
                  <span className="text-sm font-bold text-brand-beige font-sans">
                    ${rec.price.toFixed(2)}
                  </span>
                  <Link
                    to={`/product/${rec.id}`}
                    className="p-1.5 rounded-full border border-glass-border hover:border-offwhite/20 text-offwhite hover:text-brand-orange transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
