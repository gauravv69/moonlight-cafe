import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Leaf, Minus, Plus, ShieldCheck, ShoppingBag, Flame, Sparkles } from "lucide-react";
import { PIZZAS } from "../mock-data/pizzas";
import { useCartStore } from "../store/cartStore";
import { toast } from "../store/toastStore";

// Option pricing configurations in INR (₹)

// 1. Pizzas & Calzones Options
const CRUST_OPTIONS = [
  { name: "48h Sourdough Classic", price: 0 },
  { name: "Gluten-Free Charcoal Sourdough", price: 60 },
  { name: "Garlic Butter Infused Sourdough", price: 40 },
];

const CHEESE_OPTIONS = [
  { name: "Fior Di Latte", price: 0 },
  { name: "Double Buffalo Mozzarella", price: 80 },
  { name: "Vegan Cashew Cheese", price: 50 },
];

const TOPPING_OPTIONS = [
  { id: "burrata-crown", name: "Burrata Crown", price: 100 },
  { id: "calabrian-chili", name: "Calabrian Chili Paste", price: 40 },
  { id: "truffle-paste", name: "Wild Forest Truffle Paste", price: 120 },
  { id: "roasted-mushrooms", name: "Earthy Wild Mushrooms", price: 50 },
  { id: "figs", name: "Fresh Mission Figs", price: 80 },
];

// 2. Pastas Options
const PASTA_SAUCE_OPTIONS = [
  { name: "Signature Recipe Sauce", price: 0 },
  { name: "Creamy Alfredo Reduction", price: 50 },
  { name: "Spicy Arrabbiata Marinara", price: 40 },
  { name: "Organic Basil Pesto", price: 60 },
];

const PASTA_TOPPING_OPTIONS = [
  { id: "parmesan", name: "Aged Shaved Parmesan", price: 30 },
  { id: "wild-mushrooms", name: "Sautéed Forest Mushrooms", price: 40 },
  { id: "roasted-chicken", name: "Herb Roasted Chicken", price: 80 },
  { id: "garlic-confit", name: "Confit Garlic Pearls", price: 30 },
];

// 3. Burgers & Sandwiches Options
const BURGER_EXTRA_OPTIONS = [
  { id: "extra-cheese", name: "Melting Cheddar Slice", price: 30 },
  { id: "egg-crown", name: "Fried Egg Crown", price: 40 },
  { id: "jalapenos", name: "Pickled Jalapeño Rounds", price: 20 },
  { id: "extra-patty", name: "Double Patty stack", price: 80 },
];

// 4. Beverages Options (Coffees, Milkshakes, Tea, Mocktails)
const BEV_MILK_OPTIONS = [
  { name: "Standard Whole Milk", price: 0 },
  { name: "Organic Almond Milk", price: 50 },
  { name: "Barista Oat Milk", price: 60 },
];

const BEV_SWEET_OPTIONS = [
  { name: "Normal Sweetness", price: 0 },
  { name: "Sugar-Free Stevia", price: 20 },
  { name: "Natural Forest Honey", price: 30 },
];

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

  // ------------------ Builder States ------------------
  
  // 1. Pizzas & Calzones states
  const [selectedCrust, setSelectedCrust] = useState(CRUST_OPTIONS[0].name);
  const [selectedCheese, setSelectedCheese] = useState(CHEESE_OPTIONS[0].name);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  
  // 2. Pasta states
  const [selectedPastaSauce, setSelectedPastaSauce] = useState(PASTA_SAUCE_OPTIONS[0].name);
  const [selectedPastaToppings, setSelectedPastaToppings] = useState<string[]>([]);
  
  // 3. Burger & Sandwich states
  const [selectedBurgerExtras, setSelectedBurgerExtras] = useState<string[]>([]);
  
  // 4. Beverage states
  const [selectedBevMilk, setSelectedBevMilk] = useState(BEV_MILK_OPTIONS[0].name);
  const [selectedBevSweet, setSelectedBevSweet] = useState(BEV_SWEET_OPTIONS[0].name);

  // Common states
  const [selectedSpice, setSelectedSpice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Sync initial parameters on item change
  useEffect(() => {
    if (item) {
      setSelectedSpice(item.spicyLevel);
      setSelectedCrust(CRUST_OPTIONS[0].name);
      setSelectedCheese(CHEESE_OPTIONS[0].name);
      setSelectedToppings([]);
      setSelectedPastaSauce(PASTA_SAUCE_OPTIONS[0].name);
      setSelectedPastaToppings([]);
      setSelectedBurgerExtras([]);
      setSelectedBevMilk(BEV_MILK_OPTIONS[0].name);
      setSelectedBevSweet(BEV_SWEET_OPTIONS[0].name);
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

  // Type categorizations
  const isPizzaOrCalzone = item.category.toLowerCase().includes("pizza") || item.category.toLowerCase().includes("calzone");
  const isPasta = item.category.toLowerCase().includes("pasta");
  const isBurgerOrSandwich = item.category.toLowerCase().includes("burger") || item.category.toLowerCase().includes("sandwich");
  const isBeverage = ["coffees", "milkshakes", "tea", "mocktails"].includes(item.category.toLowerCase());

  // Calculate dynamic price based on category
  const finalSinglePrice = useMemo(() => {
    let extraCost = 0;

    if (isPizzaOrCalzone) {
      const crustCost = CRUST_OPTIONS.find((c) => c.name === selectedCrust)?.price || 0;
      const cheeseCost = CHEESE_OPTIONS.find((c) => c.name === selectedCheese)?.price || 0;
      const toppingsCost = selectedToppings.reduce((sum, toppingId) => {
        const topOption = TOPPING_OPTIONS.find((t) => t.id === toppingId);
        return sum + (topOption?.price || 0);
      }, 0);
      extraCost = crustCost + cheeseCost + toppingsCost;
    } else if (isPasta) {
      const sauceCost = PASTA_SAUCE_OPTIONS.find((s) => s.name === selectedPastaSauce)?.price || 0;
      const toppingsCost = selectedPastaToppings.reduce((sum, toppingId) => {
        const topOption = PASTA_TOPPING_OPTIONS.find((t) => t.id === toppingId);
        return sum + (topOption?.price || 0);
      }, 0);
      extraCost = sauceCost + toppingsCost;
    } else if (isBurgerOrSandwich) {
      extraCost = selectedBurgerExtras.reduce((sum, extraId) => {
        const extOption = BURGER_EXTRA_OPTIONS.find((e) => e.id === extraId);
        return sum + (extOption?.price || 0);
      }, 0);
    } else if (isBeverage) {
      // Warm black coffee/tea has no milk customization usually, but let's offer standard calculations
      const milkCost = BEV_MILK_OPTIONS.find((m) => m.name === selectedBevMilk)?.price || 0;
      const sweetCost = BEV_SWEET_OPTIONS.find((s) => s.name === selectedBevSweet)?.price || 0;
      extraCost = milkCost + sweetCost;
    }

    return item.price + extraCost;
  }, [item, isPizzaOrCalzone, isPasta, isBurgerOrSandwich, isBeverage, selectedCrust, selectedCheese, selectedToppings, selectedPastaSauce, selectedPastaToppings, selectedBurgerExtras, selectedBevMilk, selectedBevSweet]);

  const handleToppingToggle = (toppingId: string) => {
    if (selectedToppings.includes(toppingId)) {
      setSelectedToppings(selectedToppings.filter((id) => id !== toppingId));
    } else {
      setSelectedToppings([...selectedToppings, toppingId]);
    }
  };

  const handlePastaToppingToggle = (toppingId: string) => {
    if (selectedPastaToppings.includes(toppingId)) {
      setSelectedPastaToppings(selectedPastaToppings.filter((id) => id !== toppingId));
    } else {
      setSelectedPastaToppings([...selectedPastaToppings, toppingId]);
    }
  };

  const handleBurgerExtraToggle = (extraId: string) => {
    if (selectedBurgerExtras.includes(extraId)) {
      setSelectedBurgerExtras(selectedBurgerExtras.filter((id) => id !== extraId));
    } else {
      setSelectedBurgerExtras([...selectedBurgerExtras, extraId]);
    }
  };

  const handleAddToBag = () => {
    let customCrust = "Standard";
    let customCheese = "None";
    let customToppingsNames: string[] = [];

    if (isPizzaOrCalzone) {
      customCrust = selectedCrust;
      customCheese = selectedCheese;
      customToppingsNames = selectedToppings.map(
        (id) => TOPPING_OPTIONS.find((t) => t.id === id)?.name || ""
      );
    } else if (isPasta) {
      customCrust = selectedPastaSauce;
      customCheese = "Standard";
      customToppingsNames = selectedPastaToppings.map(
        (id) => PASTA_TOPPING_OPTIONS.find((t) => t.id === id)?.name || ""
      );
    } else if (isBurgerOrSandwich) {
      customCrust = "Toasted Bun";
      customCheese = selectedBurgerExtras.includes("extra-cheese") ? "Cheddar Melt" : "Standard";
      customToppingsNames = selectedBurgerExtras.map(
        (id) => BURGER_EXTRA_OPTIONS.find((e) => e.id === id)?.name || ""
      );
    } else if (isBeverage) {
      customCrust = selectedBevMilk;
      customCheese = selectedBevSweet;
    }

    addToCart({
      pizzaId: item.id,
      name: item.name,
      price: finalSinglePrice,
      image: item.image,
      quantity,
      customization: {
        crust: customCrust,
        cheese: customCheese,
        toppings: customToppingsNames,
        spiceLevel: selectedSpice,
      },
    });

    toast.success(`Customized ${item.name} added to your collection.`);
  };

  // Category-specific recommendations
  const recommendations = useMemo(() => {
    const sameCat = PIZZAS.filter((p) => p.category === item.category && p.id !== item.id);
    if (sameCat.length >= 3) return sameCat.slice(0, 3);
    const general = PIZZAS.filter((p) => p.id !== item.id);
    return [...sameCat, ...general].slice(0, 3);
  }, [item]);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 relative z-10 flex flex-col gap-16 md:gap-20">
      
      {/* Back Button Link */}
      <Link
        to="/menu"
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-beige hover:text-brand-orange transition-colors w-fit font-display"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Gallery
      </Link>

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

          {/* DYNAMIC BUILDER FOR PIZZAS & CALZONES */}
          {isPizzaOrCalzone && (
            <div className="flex flex-col gap-8">
              
              {/* Step 1: Crust */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-beige font-display flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center text-[10px] font-black">1</span>
                    Sourdough Crust Options
                  </h3>
                  <span className="text-[9px] font-bold text-gray-subtle uppercase">Select One</span>
                </div>
                <div className="flex flex-col gap-3">
                  {CRUST_OPTIONS.map((crust) => (
                    <button
                      key={crust.name}
                      onClick={() => setSelectedCrust(crust.name)}
                      className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-300 cursor-pointer ${
                        selectedCrust === crust.name
                          ? "border-brand-orange bg-brand-orange/5 shadow-[0_0_15px_rgba(122,28,36,0.08)] text-offwhite"
                          : "border-glass-border bg-brand-charcoal/30 text-gray-subtle hover:border-offwhite/20 hover:text-offwhite"
                      }`}
                    >
                      <span className="text-sm font-semibold tracking-wide">{crust.name}</span>
                      <span className="text-xs font-sans font-bold text-brand-beige">
                        {crust.price === 0 ? "Included" : `+₹${crust.price}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Cheese */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-beige font-display flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center text-[10px] font-black">2</span>
                    Creamy Cheese Bases
                  </h3>
                  <span className="text-[9px] font-bold text-gray-subtle uppercase">Select One</span>
                </div>
                <div className="flex flex-col gap-3">
                  {CHEESE_OPTIONS.map((cheese) => (
                    <button
                      key={cheese.name}
                      onClick={() => setSelectedCheese(cheese.name)}
                      className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-300 cursor-pointer ${
                        selectedCheese === cheese.name
                          ? "border-brand-orange bg-brand-orange/5 shadow-[0_0_15px_rgba(122,28,36,0.08)] text-offwhite"
                          : "border-glass-border bg-brand-charcoal/30 text-gray-subtle hover:border-offwhite/20 hover:text-offwhite"
                      }`}
                    >
                      <span className="text-sm font-semibold tracking-wide">{cheese.name}</span>
                      <span className="text-xs font-sans font-bold text-brand-beige">
                        {cheese.price === 0 ? "Included" : `+₹${cheese.price}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Toppings */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-beige font-display flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center text-[10px] font-black">3</span>
                    Rare Topping Enhancements
                  </h3>
                  <span className="text-[9px] font-bold text-gray-subtle uppercase">Select Multiple (Optional)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TOPPING_OPTIONS.map((topping) => {
                    const isSelected = selectedToppings.includes(topping.id);
                    return (
                      <button
                        key={topping.id}
                        onClick={() => handleToppingToggle(topping.id)}
                        className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "border-brand-orange bg-brand-orange/5 shadow-[0_0_15px_rgba(122,28,36,0.08)] text-offwhite"
                            : "border-glass-border bg-brand-charcoal/30 text-gray-subtle hover:border-offwhite/20 hover:text-offwhite"
                        }`}
                      >
                        <span className="text-xs font-semibold tracking-wide">{topping.name}</span>
                        <span className="text-xs font-sans font-bold text-brand-beige">
                          +₹{topping.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* DYNAMIC BUILDER FOR PASTAS */}
          {isPasta && (
            <div className="flex flex-col gap-8">
              
              {/* Step 1: Pasta Sauce */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-beige font-display flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center text-[10px] font-black">1</span>
                    Italian Pasta Sauces
                  </h3>
                  <span className="text-[9px] font-bold text-gray-subtle uppercase">Select One</span>
                </div>
                <div className="flex flex-col gap-3">
                  {PASTA_SAUCE_OPTIONS.map((sauce) => (
                    <button
                      key={sauce.name}
                      onClick={() => setSelectedPastaSauce(sauce.name)}
                      className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-300 cursor-pointer ${
                        selectedPastaSauce === sauce.name
                          ? "border-brand-orange bg-brand-orange/5 shadow-[0_0_15px_rgba(122,28,36,0.08)] text-offwhite"
                          : "border-glass-border bg-brand-charcoal/30 text-gray-subtle hover:border-offwhite/20 hover:text-offwhite"
                      }`}
                    >
                      <span className="text-sm font-semibold tracking-wide">{sauce.name}</span>
                      <span className="text-xs font-sans font-bold text-brand-beige">
                        {sauce.price === 0 ? "Included" : `+₹${sauce.price}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Pasta Toppings */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-beige font-display flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center text-[10px] font-black">2</span>
                    Grated Cheeses & Proteins
                  </h3>
                  <span className="text-[9px] font-bold text-gray-subtle uppercase">Select Multiple</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PASTA_TOPPING_OPTIONS.map((topping) => {
                    const isSelected = selectedPastaToppings.includes(topping.id);
                    return (
                      <button
                        key={topping.id}
                        onClick={() => handlePastaToppingToggle(topping.id)}
                        className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "border-brand-orange bg-brand-orange/5 shadow-[0_0_15px_rgba(122,28,36,0.08)] text-offwhite"
                            : "border-glass-border bg-brand-charcoal/30 text-gray-subtle hover:border-offwhite/20 hover:text-offwhite"
                        }`}
                      >
                        <span className="text-xs font-semibold tracking-wide">{topping.name}</span>
                        <span className="text-xs font-sans font-bold text-brand-beige">
                          +₹{topping.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* DYNAMIC BUILDER FOR BURGERS & SANDWICHES */}
          {isBurgerOrSandwich && (
            <div className="flex flex-col gap-8">
              
              {/* Step 1: Extras */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-beige font-display flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center text-[10px] font-black">1</span>
                    Premium Stack Enhancements
                  </h3>
                  <span className="text-[9px] font-bold text-gray-subtle uppercase">Select Multiple (Optional)</span>
                </div>
                <div className="flex flex-col gap-3">
                  {BURGER_EXTRA_OPTIONS.map((extra) => {
                    const isSelected = selectedBurgerExtras.includes(extra.id);
                    return (
                      <button
                        key={extra.id}
                        onClick={() => handleBurgerExtraToggle(extra.id)}
                        className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "border-brand-orange bg-brand-orange/5 shadow-[0_0_15px_rgba(122,28,36,0.08)] text-offwhite"
                            : "border-glass-border bg-brand-charcoal/30 text-gray-subtle hover:border-offwhite/20 hover:text-offwhite"
                        }`}
                      >
                        <span className="text-sm font-semibold tracking-wide">{extra.name}</span>
                        <span className="text-xs font-sans font-bold text-brand-beige">
                          +₹{extra.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* DYNAMIC BUILDER FOR BEVERAGES */}
          {isBeverage && (
            <div className="flex flex-col gap-8">
              
              {/* Step 1: Milk Choice */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-beige font-display flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center text-[10px] font-black">1</span>
                    Steamed Milk Options
                  </h3>
                  <span className="text-[9px] font-bold text-gray-subtle uppercase">Select One</span>
                </div>
                <div className="flex flex-col gap-3">
                  {BEV_MILK_OPTIONS.map((milk) => (
                    <button
                      key={milk.name}
                      onClick={() => setSelectedBevMilk(milk.name)}
                      className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-300 cursor-pointer ${
                        selectedBevMilk === milk.name
                          ? "border-brand-orange bg-brand-orange/5 shadow-[0_0_15px_rgba(122,28,36,0.08)] text-offwhite"
                          : "border-glass-border bg-brand-charcoal/30 text-gray-subtle hover:border-offwhite/20 hover:text-offwhite"
                      }`}
                    >
                      <span className="text-sm font-semibold tracking-wide">{milk.name}</span>
                      <span className="text-xs font-sans font-bold text-brand-beige">
                        {milk.price === 0 ? "Included" : `+₹${milk.price}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Sweetness */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-beige font-display flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center text-[10px] font-black">2</span>
                    Sweetness Level
                  </h3>
                  <span className="text-[9px] font-bold text-gray-subtle uppercase">Select One</span>
                </div>
                <div className="flex flex-col gap-3">
                  {BEV_SWEET_OPTIONS.map((sweet) => (
                    <button
                      key={sweet.name}
                      onClick={() => setSelectedBevSweet(sweet.name)}
                      className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-300 cursor-pointer ${
                        selectedBevSweet === sweet.name
                          ? "border-brand-orange bg-brand-orange/5 shadow-[0_0_15px_rgba(122,28,36,0.08)] text-offwhite"
                          : "border-glass-border bg-brand-charcoal/30 text-gray-subtle hover:border-offwhite/20 hover:text-offwhite"
                      }`}
                    >
                      <span className="text-sm font-semibold tracking-wide">{sweet.name}</span>
                      <span className="text-xs font-sans font-bold text-brand-beige">
                        {sweet.price === 0 ? "Included" : `+₹${sweet.price}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Simple items placeholder details */}
          {!isPizzaOrCalzone && !isPasta && !isBurgerOrSandwich && !isBeverage && (
            <div className="glass-panel p-6 rounded-xl border border-glass-border bg-brand-charcoal/20 text-center flex flex-col gap-3">
              <span className="text-3xl">🍲</span>
              <h4 className="font-display font-bold uppercase tracking-wide text-xs text-brand-beige">
                Artisanal Made to Order
              </h4>
              <p className="text-xs font-sans font-light text-gray-subtle leading-relaxed">
                This recipe is carefully prepared by our master chefs using exact measurements of fresh local supplies. No customizable additions are required to experience its pristine culinary layout.
              </p>
            </div>
          )}

          {/* Spice Calibration Block (Omit for dessert/sweet shakes) */}
          {item.spicyLevel > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-beige font-display flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center text-[10px] font-black">
                  {isPizzaOrCalzone ? 4 : isPasta ? 3 : 2}
                </span>
                Volcanic Spice Calibration
              </h3>
              
              <div className="glass-panel p-4 rounded-xl border border-glass-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex gap-2">
                  {[0, 1, 2, 3].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSelectedSpice(lvl)}
                      className={`px-4 py-2 rounded-lg border text-[9px] font-display font-extrabold uppercase tracking-widest transition-all cursor-pointer ${
                        selectedSpice === lvl
                          ? "border-brand-orange bg-brand-orange text-white shadow-md"
                          : "border-glass-border bg-brand-charcoal/30 text-gray-subtle hover:text-offwhite"
                      }`}
                    >
                      {lvl === 0 ? "Mild" : `${"🔥".repeat(lvl)}`}
                    </button>
                  ))}
                </div>
                <span className="text-[11px] font-medium text-gray-subtle">
                  {selectedSpice === 0 ? "Clean, no spice." : selectedSpice === 1 ? "Subtle glow." : selectedSpice === 2 ? "Intense flames." : "Absolute volcanic heat."}
                </span>
              </div>
            </div>
          )}

          <div className="h-[1px] bg-glass-border" />

          {/* Quantity and Checkout Trigger Panel */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 pt-4">
            
            {/* Quantity adjust */}
            <div className="flex items-center justify-between sm:justify-start gap-4 bg-brand-charcoal/60 px-5 py-3.5 rounded-full border border-glass-border w-full sm:w-auto shadow-md">
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
            <div className="flex items-center gap-5 justify-between sm:justify-end flex-1">
              <div className="flex flex-col text-right">
                <span className="text-[9px] uppercase tracking-wider text-gray-subtle">Total Price</span>
                <span className="text-2xl font-black font-display text-brand-beige">
                  ₹{finalSinglePrice * quantity}
                </span>
              </div>

              <button
                onClick={handleAddToBag}
                className="flex-1 sm:flex-none px-8 py-4.5 rounded-full bg-brand-orange hover:bg-brand-orange-light text-white font-display text-[10px] font-black tracking-widest uppercase transition-all duration-300 hover:scale-[1.03] shadow-xl shadow-brand-orange/15 flex items-center justify-center gap-2.5 cursor-pointer"
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
            Aesthetic Alternatives
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold uppercase tracking-tight text-offwhite">
            Recommended Blueprints
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
                    ₹{rec.price}
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
