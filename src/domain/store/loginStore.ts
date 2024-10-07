import { create } from "zustand";

interface LoginState {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useLoginStore = create<LoginState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}));
