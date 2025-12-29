/*
 * TABLE OF CONTENTS
 * 1. Imports
 * 2. Interfaces
 * 3. Store Implementation
 */

import { create } from 'zustand';
import { AppSettings, SentenceData, ThemeOption } from '../types';

interface AppState {
  // State
  data: SentenceData[] | null;
  settings: AppSettings;
  
  // Actions
  setData: (data: SentenceData[]) => void;
  setTheme: (theme: ThemeOption) => void;
  toggleRTL: () => void;
  updateView: (key: keyof AppSettings['view'], value: any) => void;
}

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'auto',
  isRTL: false,
  view: {
    isSticky: true,
    fontSize: 20,
    verticalSpacing: 4,
    showSentence: true,
    showWordByWord: true,
    showTranslation: true,
  }
};

/*
 * FUNCTION: useAppStore
 * PROCESSING: Creates a Zustand store for global state management.
 *             Provides atomic actions to update nested settings state.
 */
export const useAppStore = create<AppState>((set) => ({
  data: null,
  settings: DEFAULT_SETTINGS,

  setData: (data) => set({ data }),

  setTheme: (theme) => set((state) => ({
    settings: { ...state.settings, theme }
  })),

  toggleRTL: () => set((state) => ({
    settings: { ...state.settings, isRTL: !state.settings.isRTL }
  })),

  updateView: (key, value) => set((state) => ({
    settings: {
      ...state.settings,
      view: {
        ...state.settings.view,
        [key]: value
      }
    }
  }))
}));
