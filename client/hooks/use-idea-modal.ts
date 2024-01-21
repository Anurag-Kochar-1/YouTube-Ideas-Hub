import { create } from "zustand";

interface useIdeaModalState {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useIdeaModal = create<useIdeaModalState>()((set) => ({
  isOpen: false,
  onClose() {
    set({ isOpen: false });
  },
  onOpen() {
    set({ isOpen: true });
  },
}));
