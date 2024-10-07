import { User } from "@/types/userType";
import { create } from "zustand";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

export const useLoginStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
