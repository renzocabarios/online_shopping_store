import { create } from "zustand";
import data from "./items.json" assert { type: "json" };

export const useItemStore = create((set) => {
  return {
    items: [],
    getItems: () => {
      set(() => ({ items: data }));
    },
  };
});

export const useCategoryStore = create((set) => {
  return {
    categories: [],
    getCategories: () => {
      set(() => ({
        categories: [...new Set(data.map((e: any) => e.category))],
      }));
    },
  };
});

export const useCartStore = create((set) => {
  return {
    cartItems: [],
    addToCart: (item: any) => {
      set((state: any) => {
        const exists = state.cartItems.find((e: any) => e.id == item.id);
        if (exists) {
          const mapped = state.cartItems.map((e: any) => {
            if (e.id == item.id) e.quantity++;
            return e;
          });
          return {
            cartItems: [...mapped],
          };
        }
        return {
          cartItems: [...state.cartItems, { quantity: 1, ...item }],
        };
      });
    },
    removeItem: (item: any) => {
      set((state: any) => {
        const filtered = state.cartItems.filter((e: any) => {
          return e.id != item.id;
        });
        return {
          cartItems: [...filtered],
        };
      });
    },
    clearCart: () => {
      set(() => {
        return {
          cartItems: [],
        };
      });
    },
    increment: (item: any) => {
      set((state: any) => {
        const mapped = state.cartItems.map((e: any) => {
          if (e.id == item.id) e.quantity++;
          return e;
        });
        return {
          cartItems: [...mapped],
        };
      });
    },
    decrement: (item: any) => {
      set((state: any) => {
        const mapped = state.cartItems.map((e: any) => {
          if (e.id == item.id && e.quantity > 0) e.quantity--;
          return e;
        });
        return {
          cartItems: [...mapped],
        };
      });
    },
  };
});
