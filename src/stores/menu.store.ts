import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { MenuList } from '@/features/auth/types/auth.type'

interface MenuState {
  menus: MenuList[]
  setMenus: (menus: MenuList[]) => void
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
