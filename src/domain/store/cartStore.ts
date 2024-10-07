import { Cart } from "@/types/cartType";
import { create } from "zustand";

interface CartState {
  cart: Cart[];
  setCart: (cart: Cart[]) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  openCart: boolean;
  setOpenCart: (open: boolean) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  setCart: (cart) => set({ cart }),

  quantity: 0,
  setQuantity: (quantity) => set({ quantity }),

  openCart: false,
  setOpenCart: (openCart) => set({ openCart }),
}));
