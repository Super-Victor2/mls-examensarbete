import { create } from "zustand";

interface Card {
  id: number;
  items: string[];
  price: string;
  time: number;
  type: string;
  tier: string;
}

interface Store {
  cart: Card[];
  addToCart: (card: Card) => void;
}

const useStore = create<Store>((set) => ({
  cart: [],
  
  addToCart: (card) =>
    set((state) => ({
      cart: [...state.cart, card], // Adds new item to cart
    })),
}));

export default useStore;