import {create} from 'zustand';

import {examStamp, STUDENT} from '@constants/student';

type AuthState = {
  account: string;
  token: string | null;
  isLoggedIn: boolean;

  login: (account: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>(set => ({
  account: '',
  token: null,
  isLoggedIn: false,

  login: (account: string) => {
    const token = `ktxgo-${STUDENT.mssv}-${examStamp()}`;

    set({
      account,
      token,
      isLoggedIn: true,
    });
  },

  logout: () => {
    set({
      account: '',
      token: null,
      isLoggedIn: false,
    });
  },
}));