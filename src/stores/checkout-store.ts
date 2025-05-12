import { create } from "zustand";

type CheckoutData = {
  name: string;
  phone: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  zip: string;
};

type CheckoutStore = {
  data: CheckoutData;
  setCheckoutData: (data: Partial<CheckoutData>) => void;
  clearCheckoutData: () => void;
};

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  data: {
    name: "",
    phone: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    zip: "",
  },
  setCheckoutData: (newData) =>
    set((state) => ({
      data: { ...state.data, ...newData },
    })),
  clearCheckoutData: () =>
    set(() => ({
      data: {
        name: "",
        phone: "",
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        zip: "",
      },
    })),
}));
