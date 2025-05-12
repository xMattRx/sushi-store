// stores/ui-store.ts
import { create } from "zustand";

type UIStore = {
    isCartOpen: boolean;
    hasCartNotification: boolean;
    openCart: () => void;
    closeCart: () => void;
    resetCartNotification: () => void;
    notifyCart: () => void;
};

export const useUIStore = create<UIStore>((set) => ({
    isCartOpen: false,
    hasCartNotification: false,

    openCart: () =>
        set({ isCartOpen: true, hasCartNotification: false }), // limpa a bolinha

    closeCart: () => set({ isCartOpen: false }),

    resetCartNotification: () => set({ hasCartNotification: false }),

    notifyCart: () => set({ hasCartNotification: true }),
}));
