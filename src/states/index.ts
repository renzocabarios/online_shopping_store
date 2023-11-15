import { create } from "zustand";
import data from "./items.json" assert { type: "json" };
import {
  ICartItem,
  IItem,
  IUseCartStore,
  IUseCategoryStore,
  IUseItemStore,
} from "../interfaces";

const ITEMS: IItem[] = JSON.parse(JSON.stringify(data)) as IItem[];

export const useItemStore = create<IUseItemStore>((set) => {
  return {
    items: [],
    getItems: () => {
      set(() => ({ items: ITEMS }));
    },
  };
});

export const useCategoryStore = create<IUseCategoryStore>((set) => {
  return {
    categories: [],
    getCategories: () => {
      set(() => ({
        categories: [...new Set(data.map((e: any) => e.category))],
      }));
    },
  };
});

export const useCartStore = create<IUseCartStore>((set) => {
  return {
    cartItems: [],
    addToCart: (item: IItem) => {
      set((state: any) => {
        const exists = state.cartItems.find((e: ICartItem) => e.id == item.id);
        if (exists) {
          const mapped = state.cartItems.map((e: ICartItem) => {
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
    removeItem: (item: IItem) => {
      set((state: IUseCartStore) => {
        const filtered = state.cartItems.filter((e: ICartItem) => {
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
    increment: (item: IItem) => {
      set((state: IUseCartStore) => {
        const mapped = state.cartItems.map((e: ICartItem) => {
          if (e.id == item.id) e.quantity++;
          return e;
        });
        return {
          cartItems: [...mapped],
        };
      });
    },
    decrement: (item: IItem) => {
      set((state: IUseCartStore) => {
        const mapped = state.cartItems.map((e: ICartItem) => {
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
