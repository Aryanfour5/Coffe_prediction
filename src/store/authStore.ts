import { create } from 'zustand';
import { AuthState } from '../types';

// Simulated authentication for now
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({
      user: {
        id: '1',
        email,
        name: email.split('@')[0],
      },
      isAuthenticated: true,
    });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));