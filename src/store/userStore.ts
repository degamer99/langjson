// src/store/useUserStore.ts
"use client"

import { create } from "zustand"

interface ComponentState {
  wordByWordVisibility: boolean;
  setWordByWordVisibility: () => void;
}

export const useComponentStore = create<ComponentState>((set) => {
  return {
    wordByWordVisibility: true,
    setWordByWordVisibility: () => {
      set((state) => ({ // <-- Corrected opening parenthesis for object
        wordByWordVisibility: !state.wordByWordVisibility
      })); // <-- Corrected closing parentheses
    }, // <-- Added comma to separate methods/properties
  }
})
