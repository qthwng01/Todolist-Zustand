import { create } from 'zustand'

interface ModalState {
  openModal: boolean
  setOpenModal: (openModal: boolean) => void
}

export const useModalStore = create<ModalState>((set) => ({
  openModal: false,
  setOpenModal: () => set((state) => ({ openModal: !state.openModal })),
}))
