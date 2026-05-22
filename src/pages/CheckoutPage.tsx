import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Flame, ShieldAlert, Sparkles } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { toast } from "../store/toastStore";

export const CheckoutPage: React.FC = () => {
  const { cart, getSubtotal, getDiscountAmount, getDeliveryFee, getTotal, clearCart, deliveryMethod } = useCartStore();

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // System states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Quick validation
    if (!name || !phone || (deliveryMethod === "delivery" && !address)) {
      toast.error("Please fill in all coordinates and delivery details.");
      return;
    }
    if (!cardNumber || !cardHolder || !cardExpiry || !cardCvv) {
      toast.error("Please complete the payment card authorization mockup.");
      return;
    }

    // Trigger mock baking skeleton loading
    setIsSubmitting(true);
    toast.info("Entering wood-fired baking queue...");

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      const generatedId = "MLC-" + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
      toast.success("Order meets the flame! Baked in 60s.");
      
      // Clear cart after order is successfully placed (delayed slightly to allow transition)
      clearCart();
    }, 2800);
  };

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // If order was successfully placed, render aesthetic success state
  if (isSuccess) {
    return (
      <div className="w-full max-w-3xl mx-auto px-6 py-24 text-center flex flex-col items-center gap-8 relative z-10">
        
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full radial-glow-1 opacity-30 blur-[100px] pointer-events-none" />

        <div className="relative">
          {/* Volcanic ring */}
          <div className="w-28 h-28 rounded-full border border-brand-orange/30 flex items-center justify-center bg-brand-charcoal animate-glow">
            <CheckCircle2 className="w-14 h-14 text-brand-orange animate-bounce" />
          </div>
          {/* Sparkles */}
          <Sparkles className="absolute -top-2 -right-2 text-brand-beige w-6 h-6 animate-pulse" />
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange font-display">
            Hearth booking Confirmed
          </span>
          <h1 className="text-4xl sm:text-5xl font-display uppercase tracking-tight text-offwhite">
            Order Meets The Flame
          </h1>
          <p className="text-sm font-light text-gray-subtle font-sans max-w-md mx-auto leading-relaxed">
            Your sourdough crust has been locked into volcanic hearth slot <span className="text-brand-orange font-bold font-sans">#12</span>. Our bakers are ready.
          </p>
        </div>

        {/* Invoice reference summary card */}
        <div className="glass-panel p-6 rounded-2xl border border-glass-border w-full max-w-md flex flex-col gap-4 text-left shadow-2xl relative bg-brand-charcoal/40 mt-4">
          <div className="flex justify-between items-center text-xs text-gray-subtle border-b border-glass-border pb-3">
            <span>Reference ID:</span>
            <span className="font-bold text-offwhite font-sans">{orderId}</span>
          </div>

          <div className="flex justify-between items-center text-xs text-gray-subtle">
            <span>Baking queue spot:</span>
            <span className="font-semibold text-brand-orange font-sans">Queue #3 (Baking soon)</span>
          </div>

          <div className="flex justify-between items-center text-xs text-gray-subtle">
            <span>Estimated Bake & Ride:</span>
            <span className="font-bold text-brand-beige font-sans">
              {deliveryMethod === "delivery" ? "25 - 35 Minutes" : "15 Minutes (Pickup)"}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs text-gray-subtle pt-3 border-t border-glass-border">
            <span>Bake Coordinates:</span>
            <span className="font-sans text-offwhite truncate max-w-[200px]">
              {name} ({phone})
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <Link
            to="/menu"
            className="px-8 py-3.5 rounded-full bg-brand-beige hover:bg-brand-beige-hover text-brand-matte font-display text-xs font-black tracking-widest uppercase transition-transform hover:scale-[1.03] shadow-lg cursor-pointer"
          >
            Explore More Masterpieces
          </Link>
          <Link
            to="/"
            className="px-8 py-3.5 rounded-full border border-white/10 hover:border-white/20 bg-brand-matte/50 text-offwhite font-display text-xs font-bold tracking-widest uppercase transition-transform hover:scale-[1.03] cursor-pointer"
          >
            Back to Home
          </Link>
        </div>

      </div>
    );
  }

  // Handle checkout empty state
  if (cart.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-24 text-center flex flex-col items-center gap-6 z-10">
        <div className="w-20 h-20 rounded-full bg-brand-darkgray/30 flex items-center justify-center border border-glass-border">
          <ShieldAlert className="w-8 h-8 text-brand-orange" />
        </div>
        <h2 className="text-2xl font-display font-bold uppercase text-offwhite">Checkout Unavailable</h2>
        <p className="text-sm font-light text-gray-subtle">
          Your collection is empty. You must configure at least one sourdough to authorize baking coordinate routes.
        </p>
        <Link
          to="/menu"
          className="px-6 py-3 rounded-full bg-brand-beige text-brand-matte font-display text-xs font-bold uppercase tracking-widest hover:scale-[1.03] transition-transform shadow-lg cursor-pointer"
        >
          Browse Pizza Index
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 relative z-10 flex flex-col gap-12">
      
      {/* Editorial Header */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange font-display">
          Lock Hearth Coordinates
        </span>
        <h1 className="text-4xl sm:text-5xl font-display uppercase tracking-tight text-offwhite">
          Hearth checkout
        </h1>
        <p className="text-sm font-light text-gray-subtle leading-relaxed font-sans max-w-xl">
          Enter coordinates to authorize shipping routes and configure your payment mockups.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Form Coordinates */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Section 1: Customer details */}
          <div className="glass-panel p-6 rounded-2xl border border-glass-border flex flex-col gap-6 shadow-md bg-brand-charcoal/30">
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-beige font-display border-b border-glass-border pb-4 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center text-[10px] font-black">1</span>
              Delivery Coordinates
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-subtle font-display">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Alessia Thorne"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full glass-input px-4 py-3 rounded-xl text-sm font-light"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-subtle font-display">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 232-0941"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full glass-input px-4 py-3 rounded-xl text-sm font-light"
                />
              </div>
            </div>

            {deliveryMethod === "delivery" ? (
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-subtle font-display">
                  Physical Address coordinates
                </label>
                <input
                  type="text"
                  required={deliveryMethod === "delivery"}
                  placeholder="Pratibha Nagar, Redyachi Takkar, Kolhapur"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full glass-input px-4 py-3 rounded-xl text-sm font-light"
                />
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-white/5 border border-glass-border text-xs text-gray-subtle leading-relaxed">
                📍 You have selected <span className="font-bold text-brand-beige">Pickup</span>. Your order will be prepared at: <span className="text-brand-orange">Pratibha Nagar, Redyachi Takkar, Kolhapur</span> for ready hand-off in 15 mins.
              </div>
            )}
          </div>

          {/* Section 2: Payment Details (Mockup card details) */}
          <div className="glass-panel p-6 rounded-2xl border border-glass-border flex flex-col gap-6 shadow-md bg-brand-charcoal/30">
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-beige font-display border-b border-glass-border pb-4 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center text-[10px] font-black">2</span>
              Payment Card Authorization (Mockup)
            </h3>

            {/* Aesthetic Card graphic */}
            <div className="w-full max-w-sm aspect-[1.58/1] rounded-2xl bg-gradient-to-tr from-brand-charcoal to-brand-darkgray border border-white/10 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-brand-orange/20 transition-colors duration-500">
              <div className="absolute inset-0 radial-glow-1 opacity-15 pointer-events-none" />
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center text-[10px]">
                    🌙
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-offwhite font-display">
                    Moonlight Cafe
                  </span>
                </div>
                <span className="text-xs font-sans font-light tracking-widest text-gray-subtle uppercase">
                  HEARTH PASS
                </span>
              </div>
              <div className="flex flex-col gap-1.5 mt-8">
                <div className="text-lg font-bold font-sans tracking-widest text-offwhite truncate">
                  {cardNumber || "•••• •••• •••• ••••"}
                </div>
                <div className="flex justify-between items-center text-[10px] font-light uppercase text-gray-subtle tracking-wider mt-2">
                  <span className="truncate max-w-[150px]">{cardHolder || "Alessia Thorne"}</span>
                  <span>{cardExpiry || "MM/YY"}</span>
                </div>
              </div>
            </div>

            {/* Form Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-subtle font-display">
                  Card Holder name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Alessia Thorne"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="w-full glass-input px-4 py-3 rounded-xl text-sm font-light"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-subtle font-display">
                  Card Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="4111 2222 3333 4444"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full glass-input px-4 py-3 rounded-xl text-sm font-light"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-subtle font-display">
                  Expiration date
                </label>
                <input
                  type="text"
                  required
                  placeholder="08/29"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  className="w-full glass-input px-4 py-3 rounded-xl text-sm font-light"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-subtle font-display">
                  Security CVV
                </label>
                <input
                  type="password"
                  required
                  maxLength={4}
                  placeholder="•••"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                  className="w-full glass-input px-4 py-3 rounded-xl text-sm font-light font-sans"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Checkout Invoice Breakdowns */}
        <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-28">
          
          <div className="glass-panel p-6 rounded-2xl border border-glass-border flex flex-col gap-6 shadow-xl bg-brand-charcoal/30">
            <h3 className="font-display font-bold uppercase text-xs tracking-wider text-brand-beige border-b border-glass-border pb-4">
              Order index ({cartItemCount})
            </h3>

            {/* Micro items summary list */}
            <div className="flex flex-col gap-4 max-h-48 overflow-y-auto no-scrollbar">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex gap-3 justify-between items-center text-xs text-gray-subtle">
                  <div className="truncate flex-1 pr-4">
                    <span className="font-bold text-offwhite">{item.quantity}x</span> {item.name}
                    <span className="block text-[8px] font-light text-gray-subtle truncate">
                      {item.customization.crust}
                    </span>
                  </div>
                  <span className="font-semibold font-sans text-brand-beige shrink-0">
                    ₹{(item.price * item.quantity).toFixed(0)}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-[1px] bg-glass-border" />

            {/* Sum Invoice pricing details */}
            <div className="flex flex-col gap-2.5 text-xs font-light text-gray-subtle">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-offwhite">₹{getSubtotal().toFixed(0)}</span>
              </div>
              {getDiscountAmount() > 0 && (
                <div className="flex justify-between text-brand-orange">
                  <span>Discount</span>
                  <span>-₹{getDiscountAmount().toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery/Handling</span>
                <span className="font-semibold text-offwhite">
                  {getDeliveryFee() === 0 ? "FREE" : `₹${getDeliveryFee().toFixed(0)}`}
                </span>
              </div>

              <div className="h-[1px] bg-glass-border my-1" />

              <div className="flex justify-between text-sm text-offwhite font-bold font-display">
                <span>Total Charge</span>
                <span className="font-sans text-brand-beige">₹{getTotal().toFixed(0)}</span>
              </div>
            </div>

            {/* Live baker queue status indicator */}
            <div className="p-4 rounded-xl bg-brand-orange/5 border border-brand-orange/15 text-[10px] text-gray-subtle flex flex-col gap-2">
              <div className="flex items-center gap-1.5 font-semibold text-brand-orange font-display uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 animate-pulse" /> Volcanic Hearth slot live queue
              </div>
              <p className="leading-relaxed">
                Your order is ready to queue. Hearth queue is running fast. Current baker slot capacity: 12 open.
              </p>
            </div>

            {/* Main Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-full font-display text-xs font-black tracking-widest uppercase text-center transition-all duration-300 shadow-xl shadow-brand-orange/10 cursor-pointer flex items-center justify-center gap-2 ${
                isSubmitting
                  ? "bg-brand-orange/60 text-white cursor-not-allowed scale-[0.98]"
                  : "bg-brand-orange hover:bg-brand-orange-light text-white hover:scale-[1.02]"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Baking Sourdough...
                </>
              ) : (
                `Place Sourdough Order • ₹${getTotal().toFixed(0)}`
              )}
            </button>
          </div>

        </div>

      </form>

    </div>
  );
};
