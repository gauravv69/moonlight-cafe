import { create } from "zustand";

export interface PizzaCustomization {
  crust: string;
  cheese: string;
  toppings: string[];
  spiceLevel: number;
}

export interface CartItem {
  cartItemId: string; // Unique combination of pizzaId + customizations
  pizzaId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  customization: PizzaCustomization;
}

interface CartState {
  cart: CartItem[];
  isOpen: boolean;
  promoCode: string;
  promoDiscount: number; // Decimal representing percentage (e.g., 0.15 for 15%)
  deliveryMethod: "delivery" | "pickup";
  deliveryFee: number;
  tableNumber: string | null;
  setTableNumber: (table: string | null) => void;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: Omit<CartItem, "cartItemId">) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  setDeliveryMethod: (method: "delivery" | "pickup") => void;
  clearCart: () => void;
  
  // Computed values
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getDeliveryFee: () => number;
  getTotal: () => number;
}

// Helper to generate unique cart item ID based on pizza ID and custom choices
export const generateCartItemId = (pizzaId: string, custom: PizzaCustomization): string => {
  const toppingsStr = [...custom.toppings].sort().join(",");
  return `${pizzaId}-${custom.crust.replace(/\s+/g, "")}-${custom.cheese.replace(/\s+/g, "")}-${toppingsStr}-${custom.spiceLevel}`;
};

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  isOpen: false,
  promoCode: "",
  promoDiscount: 0,
  deliveryMethod: "delivery",
  deliveryFee: 120,
  tableNumber: null,

  setTableNumber: (table) => set({ tableNumber: table }),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  addToCart: (newItem) => {
    const cartItemId = generateCartItemId(newItem.pizzaId, newItem.customization);
    const existingCart = get().cart;
    const existingIndex = existingCart.findIndex((item) => item.cartItemId === cartItemId);

    if (existingIndex > -1) {
      // Item already exists with exact same customizations, increment quantity
      const updatedCart = [...existingCart];
      updatedCart[existingIndex].quantity += newItem.quantity;
      set({ cart: updatedCart });
    } else {
      // Add as new item
      set({
        cart: [...existingCart, { ...newItem, cartItemId }],
      });
    }
    // Automatically open cart when adding
    set({ isOpen: true });
  },

  removeFromCart: (cartItemId) => {
    set({
      cart: get().cart.filter((item) => item.cartItemId !== cartItemId),
    });
  },

  updateQuantity: (cartItemId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(cartItemId);
      return;
    }
    set({
      cart: get().cart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      ),
    });
  },

  applyPromoCode: (code) => {
    const formattedCode = code.trim().toUpperCase();
    if (formattedCode === "MOONGLOW") {
      set({ promoCode: "MOONGLOW", promoDiscount: 0.20 }); // 20% Off
      return { success: true, message: "20% promo discount applied." };
    } else if (formattedCode === "FIRESIDE") {
      set({ promoCode: "FIRESIDE", promoDiscount: 0.10 }); // 10% Off
      return { success: true, message: "10% fireside discount applied." };
    } else if (formattedCode === "GENZPIZZA") {
      set({ promoCode: "GENZPIZZA", promoDiscount: 0.15 }); // 15% Off
      return { success: true, message: "15% Gen Z discount applied." };
    }
    return { success: false, message: "Invalid promo code." };
  },

  removePromoCode: () => {
    set({ promoCode: "", promoDiscount: 0 });
  },

  setDeliveryMethod: (method) => {
    set({ deliveryMethod: method });
  },

  clearCart: () => {
    set({ cart: [], promoCode: "", promoDiscount: 0 });
  },

  // Computed values
  getSubtotal: () => {
    return get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getDiscountAmount: () => {
    return get().getSubtotal() * get().promoDiscount;
  },

  getDeliveryFee: () => {
    const subtotal = get().getSubtotal();
    const method = get().deliveryMethod;
    const tableNumber = get().tableNumber;
    if (tableNumber || subtotal === 0 || method === "pickup" || subtotal > 1000) {
      return 0; // Free delivery over 1000 or on pickup or dine-in
    }
    return get().deliveryFee;
  },

  getTotal: () => {
    return get().getSubtotal() - get().getDiscountAmount() + get().getDeliveryFee();
  },
}));
