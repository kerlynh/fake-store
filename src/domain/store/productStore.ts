import { create } from "zustand";
import { Product } from "@/types/productType";

interface ProductsState {
  products: Product[] | null;
  setProducts: (products: Product[]) => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: null,
  setProducts: (products) => set({ products }),
}));
