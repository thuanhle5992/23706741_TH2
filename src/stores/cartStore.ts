import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createJSONStorage, persist} from 'zustand/middleware';

import {STUDENT} from '@constants/student';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];

  add: (item: Omit<CartItem, 'quantity'>) => void;
  remove: (id: string) => void;
  changeQty: (id: string, quantity: number) => void;

  totalQuantity: () => number;
  totalAmount: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      add: item =>
        set(state => {
          const existing = state.items.find(
            current => current.id === item.id,
          );

          if (existing) {
            return {
              items: state.items.map(current =>
                current.id === item.id
                  ? {
                      ...current,
                      quantity: current.quantity + 1,
                    }
                  : current,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...item,
                quantity: 1,
              },
            ],
          };
        }),

      remove: id =>
        set(state => ({
          items: state.items.filter(
            item => item.id !== id,
          ),
        })),

      changeQty: (id, quantity) =>
        set(state => ({
          items:
            quantity <= 0
              ? state.items.filter(
                  item => item.id !== id,
                )
              : state.items.map(item =>
                  item.id === id
                    ? {
                        ...item,
                        quantity,
                      }
                    : item,
                ),
        })),

      totalQuantity: () =>
        get().items.reduce(
          (total, item) => total + item.quantity,
          0,
        ),

      totalAmount: () =>
        get().items.reduce(
          (total, item) =>
            total + item.price * item.quantity,
          0,
        ),
    }),
    {
      name: `ktxgo-cart-${STUDENT.mssv}`,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);