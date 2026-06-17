import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { BackendMenu } from '@/features/auth/types/auth.type'

interface MenuState {
  menus: BackendMenu[]
  setMenus: (menus: BackendMenu[]) => void
  clearMenus: () => void
}

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      menus: [],
      setMenus: (menus) => set({ menus }),
      clearMenus: () => set({ menus: [] }),
    }),
    { name: 'menu-storage' }
  )
)