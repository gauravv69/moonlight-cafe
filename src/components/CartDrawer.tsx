import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { toast } from "../store/toastStore";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    promoCode,
    promoDiscount,
    applyPromoCode,
    removePromoCode,
    getSubtotal,
    getDiscountAmount,
    getDeliveryFee,
    getTotal,
  } = useCartStore();

  const [promoInput, setPromoInput] = useState("");

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

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 cursor-pointer"
          />

          {/* Cart Panel Slider */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] bg-brand-charcoal border-l border-glass-border z-50 flex flex-col shadow-[rgba(0,0,0,0.8)_0px_0px_50px_0px]"
          >
            {/* Header */}
            <div className="p-6 border-b border-glass-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-brand-orange" />
                <h2 className="text-lg font-bold uppercase tracking-widest text-offwhite font-display">
                  Your Collection
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded-full bg-brand-orange/15 text-brand-orange border border-brand-orange/20">
                  {cartItemCount} Items
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full border border-glass-border hover:border-offwhite/20 text-gray-subtle hover:text-offwhite transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Items */}
            <div className="flex-1 overflow-y-auto p-6 no-scrollbar flex flex-col gap-6">
              {cart.length === 0 ? (
                /* Empty State */
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-20">
                  <div className="relative w-24 h-24 rounded-full bg-brand-darkgray/40 flex items-center justify-center border border-glass-border/20 shadow-[inset_0_0_20px_rgba(122,28,36,0.05)]">
                    <span className="text-4xl">🌙</span>
                    <div className="absolute inset-0 rounded-full border border-dashed border-brand-orange/25 animate-spin-slow" />
                  </div>
                  <div className="flex flex-col gap-2 max-w-sm">
                    <h3 className="font-display font-bold uppercase tracking-wider text-offwhite text-md">
                      Aesthetic Gallery is Empty
                    </h3>
                    <p className="text-sm font-light text-gray-subtle leading-relaxed">
                      Your wood-fired culinary masterpiece collection is currently empty. Add dynamic recipes to begin your journey.
                    </p>
                  </div>
                  <Link
                    to="/menu"
                    onClick={closeCart}
                    className="px-6 py-3 rounded-full bg-brand-beige hover:bg-brand-beige-hover text-brand-matte font-display text-xs font-black tracking-widest uppercase hover:scale-[1.03] transition-transform shadow-lg"
                  >
                    Explore Our Gallery
                  </Link>
                </div>
              ) : (
                /* Item Cards */
                cart.map((item) => (
                  <motion.div
                    key={item.cartItemId}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass-panel p-4 rounded-xl border border-glass-border flex gap-4 relative group"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-white/5 relative bg-brand-matte">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-display font-bold text-sm tracking-wide text-offwhite leading-tight">
                            {item.name}
                          </h4>
                          <span className="font-sans font-bold text-sm text-brand-beige shrink-0">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Customization Badging */}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          <span className="text-[9px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-white/5 text-brand-beige">
                            {item.customization.crust}
                          </span>
                          <span className="text-[9px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-white/5 text-brand-beige">
                            {item.customization.cheese}
                          </span>
                          {item.customization.toppings.map((t) => (
                            <span
                              key={t}
                              className="text-[9px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-brand-orange/10 text-brand-orange border border-brand-orange/15"
                            >
                              + {t}
                            </span>
                          ))}
                          {item.customization.spiceLevel > 0 && (
                            <span className="text-[9px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-red-950/20 text-red-400 border border-red-500/10">
                              {"🔥".repeat(item.customization.spiceLevel)} Spicy
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Toggles */}
                      <div className="flex items-center justify-between mt-3.5 pt-2.5 border-t border-glass-border">
                        <div className="flex items-center gap-3 bg-brand-matte/50 px-2.5 py-1 rounded-full border border-glass-border">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="text-gray-subtle hover:text-offwhite transition-colors cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold text-offwhite font-sans w-4 text-center select-none">
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
                          className="text-gray-subtle hover:text-red-400 transition-colors p-1.5 rounded-full hover:bg-white/5 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Bottom Billing Details (Rendered if items exist) */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-glass-border bg-brand-charcoal relative">
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="mb-6 flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="PROMO CODE (e.g. MOONGLOW)"
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
                        Remove
                      </button>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-white/5 border border-glass-border hover:border-offwhite/20 text-offwhite font-display text-xs font-bold uppercase tracking-widest transition-all cursor-pointer hover:bg-white/8"
                  >
                    Apply
                  </button>
                </form>

                {/* Billing Summary Box */}
                <div className="flex flex-col gap-2.5 mb-6 text-sm font-light text-gray-subtle">
                  {promoCode && (
                    <div className="flex justify-between items-center text-xs px-3 py-1.5 rounded-lg bg-brand-orange/10 border border-brand-orange/15 text-brand-orange">
                      <span className="font-semibold uppercase tracking-wider">Coupon Applied ({promoCode})</span>
                      <span className="font-bold font-sans">-{(promoDiscount * 100)}%</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium font-sans text-offwhite">${getSubtotal().toFixed(2)}</span>
                  </div>

                  {promoCode && (
                    <div className="flex justify-between text-brand-orange font-medium">
                      <span>Discount</span>
                      <span className="font-sans">-${getDiscountAmount().toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-medium font-sans text-offwhite">
                      {getDeliveryFee() === 0 ? "FREE" : `$${getDeliveryFee().toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between pt-3 border-t border-glass-border text-base text-offwhite font-bold font-display">
                    <span>Total Amount</span>
                    <span className="font-sans text-brand-beige">${getTotal().toFixed(2)}</span>
                  </div>
                </div>

                {/* CTA Action */}
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="w-full block py-4 rounded-full bg-brand-orange hover:bg-brand-orange-light text-white font-display text-xs font-black tracking-widest uppercase text-center transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-brand-orange/15 cursor-pointer"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
