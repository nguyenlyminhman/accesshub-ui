import { create } from 'zustand';

interface DepartmentUIState {
  isCreateModalOpen: boolean;
  selectedDepartmentId: string | null;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  selectDepartment: (id: string | null) => void;
}

export const useDepartmentStore = create<DepartmentUIState>((set) => ({
  isCreateModalOpen: false,
  selectedDepartmentId: null,
  openCreateModal: () => set({ isCreateModalOpen: true }),
  closeCreateModal: () => set({ isCreateModalOpen: false }),
  selectDepartment: (id) => set({ selectedDepartmentId: id }),
}));