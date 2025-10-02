import type { CUSTOMER_PROPS } from "@/services/dtos";
import { create } from "zustand";

interface CustomerState {
  customer: CUSTOMER_PROPS | null;
  setValue: (q: CUSTOMER_PROPS | null) => void;
}

export const useCustomerStore = create<CustomerState>((set) => ({
  customer: null,
  setValue: (p) => set({ customer: p }),
}));