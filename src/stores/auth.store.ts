import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserInfo } from '@/features/auth/types/auth.type'

interface AuthState {
  accessToken: string | null
  user: UserInfo | null
  isAuthenticated: boolean
  setAuth: (token: string, user: UserInfo) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      isAuthenticated: false,

      setAuth: (token, user) =>
        set({ accessToken: token, user, isAuthenticated: true }),

      logout: () =>
        set({ accessToken: null, user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage', // key trong localStorage
      // Chỉ persist những gì cần
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)