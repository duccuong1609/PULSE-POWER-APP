import { useProductStore } from "@/store/productStore";
import { useCustomerStore } from "@/store/customerStore";

export function useTypedStore(type: "product" | "customer") {
  if (type === "product") return useProductStore();
  if (type === "customer") return useCustomerStore();

  throw new Error("Invalid type");
}