import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { toast } from "../store/toastStore";

export const CartPage: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    promoCode,
    promoDiscount,
    applyPromoCode,
    removePromoCode,
    getSubtotal,
    getDiscountAmount,
    getTotal,
    tableNumber,
    clearCart,
    lastOrderTime,
    setLastOrderTime,
    lastOrderItems,
    setLastOrderItems,
  } = useCartStore();

  const [promoInput, setPromoInput] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const confirmAndSendOrder = () => {
    const phone = "918446424727"; // Cafe owner/chef WhatsApp number
    let message = tableNumber 
      ? `*New Order from Table ${tableNumber}* 🍕\n\n`
      : `*New Order* 🍕\n\n`;
    
    cart.forEach((item) => {
      message += `• ${item.quantity}x ${item.name} (₹${(item.price * item.quantity).toFixed(0)})\n`;
      message += `\n`;
    });
    
    message += `*Subtotal:* ₹${getSubtotal().toFixed(0)}\n`;
    if (getDiscountAmount() > 0) {
      message += `*Discount (${promoCode}):* -₹${getDiscountAmount().toFixed(0)}\n`;
    }
    message += `*Total Bill:* ₹${getTotal().toFixed(0)}\n`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");
    
    // Clear cart after ordering
    setLastOrderTime(new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }));
    setLastOrderItems(cart);
    clearCart();
    setShowConfirmModal(false);
  };

  const handleWhatsAppOrder = () => {
    setShowConfirmModal(true);
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (res.success) {
      toast.success(res.message);
      setPromoInput("");
    } else {
      toast.error(res.message);
    }
  };


  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 relative z-10 flex flex-col gap-12">
      
      {/* Page Header */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange font-display">
          Review Your Selections
        </span>
        <h1 className="text-4xl sm:text-5xl font-display uppercase tracking-tight text-offwhite">
          Your Sourdough Bag
        </h1>
        <p className="text-sm font-light text-gray-subtle leading-relaxed font-sans max-w-xl">
          Each dough is proofed for 48 hours. Ensure your configurations, toppings, and delivery coordinates are accurate.
        </p>
      </div>

      {cart.length === 0 ? (
        /* Empty State */
        <div className="glass-panel p-16 rounded-3xl border border-glass-border flex flex-col items-center justify-center text-center gap-6 max-w-2xl mx-auto w-full my-12 shadow-2xl">
          <div className="relative w-24 h-24 flex items-center justify-center animate-glow bg-black rounded-2xl overflow-hidden p-2 shadow-[0_0_30px_rgba(122,28,36,0.2)]">
            <img src="/logo.jpg" alt="Moonlight Cafe" className="w-full h-full object-contain" />
            <span className="absolute -inset-2 rounded-2xl border border-dashed border-brand-orange/20 animate-spin-slow pointer-events-none" />
          </div>
          <div className="flex flex-col gap-2">
            {lastOrderTime ? (
              <>
                <h3 className="font-display font-bold uppercase tracking-wider text-[#25D366] text-lg">
                  Order Successfully Placed!
                </h3>
                <p className="text-sm font-light text-gray-subtle leading-relaxed max-w-md mb-4">
                  Your last order was sent to the chef on <span className="text-offwhite font-medium">{lastOrderTime}</span>.
                </p>

                {lastOrderItems && lastOrderItems.length > 0 && (
                  <div className="w-full text-left bg-white/5 rounded-2xl p-6 border border-white/5 flex flex-col gap-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] max-w-md mx-auto">
                    <span className="text-xs uppercase font-bold tracking-widest text-brand-orange/80 pb-3 border-b border-glass-border">Receipt</span>
                    <div className="flex flex-col gap-3 max-h-48 overflow-y-auto no-scrollbar">
                      {lastOrderItems.map(item => (
                        <div key={item.cartItemId} className="flex justify-between items-center text-sm">
                          <span className="text-gray-subtle"><span className="text-brand-orange">{item.quantity}x</span> {item.name}</span>
                          <span className="text-brand-beige font-sans">₹{(item.price * item.quantity).toFixed(0)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <h3 className="font-display font-bold uppercase tracking-wider text-offwhite text-lg">
                  Sourdough Bag is Empty
                </h3>
                <p className="text-sm font-light text-gray-subtle leading-relaxed max-w-md">
                  No artisanal masterworks are currently selected. Wander back to our baking gallery and configure a recipe to initiate.
                </p>
              </>
            )}
          </div>
          <Link
            to="/menu"
            className="px-8 py-3.5 rounded-full bg-brand-beige hover:bg-brand-beige-hover text-brand-matte font-display text-xs font-black tracking-widest uppercase hover:scale-[1.03] transition-transform shadow-lg cursor-pointer"
          >
            Explore Baking Index
          </Link>
        </div>
      ) : (
        /* Dynamic Split Cart Interface */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Cart List */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="glass-panel p-6 rounded-2xl border border-glass-border flex flex-col sm:flex-row gap-6 relative group shadow-lg hover:border-white/10 transition-colors"
              >
                {/* Photo */}
                <div className="w-full sm:w-28 h-28 rounded-xl overflow-hidden shrink-0 border border-white/5 relative bg-brand-matte">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between gap-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display font-bold text-lg tracking-wide text-offwhite">
                        {item.name}
                      </h3>
                      <span className="font-sans font-bold text-lg text-brand-beige">
                        ₹{(item.price * item.quantity).toFixed(0)}
                      </span>
                    </div>

                    {/* Customization options row removed as per simplified flow */}
                  </div>

                  {/* Adjuster footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-glass-border mt-2">
                    <div className="flex items-center gap-4 bg-brand-matte/50 px-3.5 py-1.5 rounded-full border border-glass-border">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="text-gray-subtle hover:text-offwhite transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-offwhite font-sans w-5 text-center select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="text-gray-subtle hover:text-offwhite transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-gray-subtle hover:text-red-400 transition-colors p-2 rounded-full hover:bg-white/5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest font-display cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" /> Remove Item
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Back CTA */}
            <Link
              to="/menu"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-beige hover:text-brand-orange transition-colors font-display w-fit mt-4"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Adding Masterpieces
            </Link>
          </div>

          {/* Right Column: Dynamic Billing Box */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-28">
            
            {/* Table Badge (If Dine-in) */}
            {tableNumber && (
              <div className="glass-panel p-4 rounded-2xl border border-brand-orange/30 bg-brand-orange/5 flex flex-col items-center gap-1 shadow-md text-center">
                <span className="text-[10px] font-bold tracking-widest uppercase text-brand-orange font-display">
                  Dine-in Order
                </span>
                <span className="text-xl font-display font-black text-offwhite">
                  Table #{tableNumber}
                </span>
              </div>
            )}

            {/* Invoice box */}
            <div className="glass-panel p-6 rounded-2xl border border-glass-border flex flex-col gap-6 shadow-xl">
              <h3 className="font-display font-bold uppercase text-xs tracking-wider text-brand-beige border-b border-glass-border pb-4">
                Invoice Breakdown
              </h3>

              {/* Promo form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="PROMO CODE"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full glass-input px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest"
                  />
                  {promoCode && (
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-brand-orange hover:text-brand-orange-light transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-white/5 border border-glass-border hover:border-offwhite/20 text-offwhite font-display text-xs font-bold uppercase tracking-widest transition-all hover:bg-white/8 cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {/* Billing totals */}
              <div className="flex flex-col gap-3.5 text-sm font-light text-gray-subtle pt-2">
                {promoCode && (
                  <div className="flex justify-between items-center text-xs px-3 py-1.5 rounded-lg bg-brand-orange/10 border border-brand-orange/15 text-brand-orange">
                    <span className="font-semibold uppercase tracking-wider">Applied ({promoCode})</span>
                    <span className="font-bold font-sans">-{(promoDiscount * 100)}%</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold font-sans text-offwhite">₹{getSubtotal().toFixed(0)}</span>
                </div>

                {promoCode && (
                  <div className="flex justify-between text-brand-orange font-semibold">
                    <span>Discount</span>
                    <span className="font-sans">-₹{getDiscountAmount().toFixed(0)}</span>
                  </div>
                )}

                <div className="h-[1px] bg-glass-border my-2" />

                <div className="flex justify-between text-lg text-offwhite font-bold font-display">
                  <span>Total Bill</span>
                  <span className="font-sans text-brand-beige">₹{getTotal().toFixed(0)}</span>
                </div>
              </div>

              {/* Promo suggestion tag */}
              {!promoCode && (
                <div className="text-[10px] text-center text-brand-orange font-semibold tracking-wider uppercase bg-brand-orange/5 border border-brand-orange/10 py-2 rounded-lg animate-pulse-slow">
                  💡 Type code <span className="font-black text-offwhite underline">MOONGLOW</span> for 20% off!
                </div>
              )}

              {/* CTA button */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full block py-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-display text-xs font-black tracking-widest uppercase text-center transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-[#25D366]/20 cursor-pointer"
              >
                Place Order on WhatsApp
              </button>
            </div>
            
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowConfirmModal(false)}
          />
          <div className="relative w-full max-w-md bg-brand-charcoal border border-glass-border rounded-2xl p-6 shadow-2xl flex flex-col gap-6 animate-fade-in">
            <div className="flex flex-col gap-2 text-center">
              <h3 className="text-xl font-display font-bold uppercase tracking-widest text-offwhite">Confirm Order</h3>
              <p className="text-sm font-light text-gray-subtle">Review your selections before sending to the kitchen.</p>
            </div>
            
            <div className="flex flex-col gap-3 max-h-[40vh] overflow-y-auto no-scrollbar border-y border-glass-border py-4">
              {cart.map(item => (
                <div key={item.cartItemId} className="flex justify-between items-center text-sm">
                  <span className="text-offwhite"><span className="text-brand-orange">{item.quantity}x</span> {item.name}</span>
                  <span className="text-brand-beige font-sans">₹{(item.price * item.quantity).toFixed(0)}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center text-lg font-bold font-display text-offwhite px-2">
              <span>TOTAL</span>
              <span className="text-brand-orange">₹{getTotal().toFixed(0)}</span>
            </div>
            
            <div className="flex flex-col gap-3 mt-2">
              <button
                onClick={confirmAndSendOrder}
                className="w-full py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-display text-xs font-black tracking-widest uppercase text-center transition-all shadow-lg hover:scale-[1.02] cursor-pointer"
              >
                Confirm & Send to Chef
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="w-full py-3.5 rounded-full border border-glass-border hover:border-offwhite/20 text-gray-subtle hover:text-offwhite font-display text-xs font-bold tracking-widest uppercase text-center transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
