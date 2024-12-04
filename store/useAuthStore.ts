import { create } from 'zustand';

export interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthStore {
  user: User | null;
  isAuth: boolean;
  login: (userData: User) => void;
  logout: () => void;
}
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuth: false,
  login: (userData) => {
    console.log('Login:', userData);
    // Сохраняем данные пользователя в localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAuth', 'true');
    set({ user: userData, isAuth: true });
  },
  logout: () => {
    // Удаляем данные пользователя из localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('isAuth');
    set({ user: null, isAuth: false });
  },
}));
export const hydrateAuthStore = () => {
  const user = localStorage.getItem('user');
  const isAuth = localStorage.getItem('isAuth');
  if (user && isAuth === 'true') {
    useAuthStore.setState({ user: JSON.parse(user), isAuth: true });
  }
};
