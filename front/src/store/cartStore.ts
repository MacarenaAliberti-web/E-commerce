// store/cartStore.ts
import { create } from 'zustand';
import { IProduct } from '@/types/product';
import { persist } from 'zustand/middleware';

interface CartItem extends IProduct {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (id: number) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
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

      removeFromCart: (id) => {
        set({
          cart: get().cart.filter(item => item.id !== id),
        });
      },

      incrementQuantity: (id) => {
        set({
          cart: get().cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        });
      },

      decrementQuantity: (id) => {
        set({
          cart: get().cart
            .map(item =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter(item => item.quantity > 0),
        });
      },

      clearCart: () => set({ cart: [] }),
    }),
    { name: 'cart-storage' }
  )
);
