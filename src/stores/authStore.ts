import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createJSONStorage, persist} from 'zustand/middleware';

type AuthState = {
  isLoggedIn: boolean;
  phone: string;
  login: (phone: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      isLoggedIn: false,
      phone: '',

      login: phone =>
        set({
          isLoggedIn: true,
          phone,
        }),

      logout: () =>
        set({
          isLoggedIn: false,
          phone: '',
        }),
    }),
    {
      name: 'ktxgo-auth',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);