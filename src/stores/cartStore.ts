import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import {STUDENT} from '@constants/student';
import type {Product} from '@services/productApi';

export type CartItem = Product & {
  quantity: number;
};

type CartState = {
  items: CartItem[];

  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  changeQty: (productId: number, quantity: number) => void;

  totalQuantity: () => number;
  totalAmount: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: product => {
        set(state => {
          const existingItem = state.items.find(
            item => item.id === product.id,
          );

          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.id === product.id
                  ? {...item, quantity: item.quantity + 1}
                  : item,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...product,
                quantity: 1,
              },
            ],
          };
        });
      },

      removeItem: productId => {
        set(state => ({
          items: state.items.filter(item => item.id !== productId),
        }));
      },

      changeQty: (productId, quantity) => {
        if (quantity <= 0) {
          set(state => ({
            items: state.items.filter(item => item.id !== productId),
          }));

          return;
        }

        set(state => ({
          items: state.items.map(item =>
            item.id === productId
              ? {...item, quantity}
              : item,
          ),
        }));
      },

      totalQuantity: () => {
        return get().items.reduce(
          (total, item) => total + item.quantity,
          0,
        );
      },

      totalAmount: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: `ktxgo-cart-${STUDENT.mssv}`,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);