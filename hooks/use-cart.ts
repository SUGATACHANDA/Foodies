import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Products } from "@/types-db";
import { toast } from "react-hot-toast";
import { get } from "http";

interface CartStoreProps {
  items: Products[];
  addItem: (data: Products) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  updateItemQuantity: (id: string, quantity: number) => void;
}

const useCart = create(
  persist<CartStoreProps>(
    (set, get) => ({
      items: [],
      addItem: (data: Products) => {
        const currentItems = get().items;
        const exitingItems = currentItems.find((item) => item.id === data.id);
        if (exitingItems) {
          return toast.error("Item Already in Cart");
        }

        set({ items: [...get().items, data] });

        toast.success("Item Added to Cart");
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Item Removed from Cart");
      },
      removeAll: () => {set({ items: [] })},
      updateItemQuantity: (id: string, qty: number) => {
        const updatedItems = get().items.map((item) =>
          item.id === id ? { ...item, qty } : item
        );
        set({ items: updatedItems });
      },
    }),
    { name: "cart-storage", storage: createJSONStorage(() => localStorage) }
  )
);

export default useCart;
