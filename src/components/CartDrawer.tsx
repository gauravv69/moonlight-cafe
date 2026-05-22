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
    getTotal,
    tableNumber,
    clearCart,
    orderHistory,
    addOrderToHistory,
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
    
    // Clear cart and close everything after ordering
    addOrderToHistory({
      time: new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }),
      items: cart,
      total: getTotal(),
    });
    clearCart();
    setShowConfirmModal(false);
    closeCart();
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
                  <div className="relative w-24 h-24 flex items-center justify-center animate-glow bg-black rounded-2xl overflow-hidden p-2 shadow-[0_0_30px_rgba(122,28,36,0.2)]">
                    <img src="/logo.jpg" alt="Moonlight Cafe" className="w-full h-full object-contain" />
                    <span className="absolute -inset-2 rounded-2xl border border-dashed border-brand-orange/20 animate-spin-slow pointer-events-none" />
                  </div>
                  <div className="flex flex-col gap-4 w-full">
                    {orderHistory.length > 0 ? (
                      <>
                        <h3 className="font-display font-bold uppercase tracking-wider text-[#25D366] text-md text-center mb-2">
                          Order History
                        </h3>
                        <div className="flex flex-col gap-4">
                          {orderHistory.map((order) => (
                            <div key={order.id} className="w-full text-left bg-white/5 rounded-xl p-4 border border-white/5 flex flex-col gap-2 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                              <div className="flex justify-between items-center pb-2 border-b border-glass-border">
                                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-orange/80">Order</span>
                                <span className="text-[10px] font-medium text-gray-subtle">{order.time}</span>
                              </div>
                              <div className="flex flex-col gap-2 my-2">
                                {order.items.map(item => (
                                  <div key={item.cartItemId} className="flex justify-between items-center text-xs">
                                    <span className="text-gray-subtle"><span className="text-brand-orange">{item.quantity}x</span> {item.name}</span>
                                    <span className="text-brand-beige font-sans">₹{(item.price * item.quantity).toFixed(0)}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="flex justify-between items-center pt-2 border-t border-glass-border">
                                <span className="text-xs uppercase font-bold text-offwhite">Total</span>
                                <span className="text-xs font-bold text-brand-orange">₹{order.total.toFixed(0)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col gap-2 text-center max-w-sm mx-auto">
                        <h3 className="font-display font-bold uppercase tracking-wider text-offwhite text-md">
                          Aesthetic Gallery is Empty
                        </h3>
                        <p className="text-sm font-light text-gray-subtle leading-relaxed">
                          Your wood-fired culinary masterpiece collection is currently empty. Add dynamic recipes to begin your journey.
                        </p>
                      </div>
                    )}
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
                            ₹{(item.price * item.quantity).toFixed(0)}
                          </span>
                        </div>

                        {/* Customization Badging removed as per simplified flow */}
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
              <div className="p-6 pb-10 md:pb-6 border-t border-glass-border bg-brand-charcoal relative">
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="mb-6 flex gap-2">
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
                    <span className="font-medium font-sans text-offwhite">₹{getSubtotal().toFixed(0)}</span>
                  </div>

                  {promoCode && (
                    <div className="flex justify-between text-brand-orange font-medium">
                      <span>Discount</span>
                      <span className="font-sans">-₹{getDiscountAmount().toFixed(0)}</span>
                    </div>
                  )}

                  <div className="flex justify-between pt-3 border-t border-glass-border text-base text-offwhite font-bold font-display">
                    <span>Total Amount</span>
                    <span className="font-sans text-brand-beige">₹{getTotal().toFixed(0)}</span>
                  </div>
                </div>

                {/* CTA Action */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full block py-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-display text-xs font-black tracking-widest uppercase text-center transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-[#25D366]/20 cursor-pointer"
                >
                  Place Order on WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
      
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowConfirmModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-brand-charcoal border border-glass-border rounded-2xl p-6 shadow-2xl flex flex-col gap-6"
          >
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
