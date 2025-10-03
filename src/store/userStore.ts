
import { create } from "zustand";

interface UserStore {
  userParam: string | "user";
  setUserParam: (q: string | "user") => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userParam: "user",
  setUserParam: (p) => set({ userParam: p }),
}));