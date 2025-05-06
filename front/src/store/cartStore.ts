// cartStore.ts
import { create } from 'zustand';
import { IProduct } from '@/types/product';
import { persist } from 'zustand/middleware';

interface CartItem extends IProduct {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: IProduct) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const existingProduct = get().cart.find(p => p.id === product.id);
        if (existingProduct) {
          set({
            cart: get().cart.map(p =>
              p.id === product.id
                ? { ...p, quantity: p.quantity + 1 }
                : p
            ),
          });
        } else {
          set({
            cart: [...get().cart, { ...product, quantity: 1 }],
          });
        }
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage', // clave de localStorage
    }
  )
);
