import type { PRODUCT_PROPS } from "@/services/dtos";
import { create } from "zustand";

interface ProductState {
  product: PRODUCT_PROPS | null;
  setValue: (q: PRODUCT_PROPS | null) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  product: null,
  setValue: (p) => set({ product: p }),
}));