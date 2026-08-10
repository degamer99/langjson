/*
 * TABLE OF CONTENTS
 * 1. Imports
 * 2. Interfaces
 * 3. Store Implementation
 */

import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { get as idbGet, set as idbSet, del as idbDel } from 'idb-keyval';
import { AppSettings, SentenceData, ThemeOption } from '../types';

interface AppState {
  // State
  data: SentenceData[] | null;
  settings: AppSettings;
  scrollPosition: number;
  hasHydrated: boolean;

  // Actions
  setData: (data: SentenceData[]) => void;
  setTheme: (theme: ThemeOption) => void;
  toggleRTL: () => void;
  updateView: (key: keyof AppSettings['view'], value: any) => void;
  setScrollPosition: (position: number) => void;
  clearSavedData: () => void;
  setHasHydrated: (state: boolean) => void;
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
 * IndexedDB-backed storage adapter (ADR-006).
 * Document data can run several MB for book-length texts, which is too
 * large/risky for localStorage's synchronous API and ~5-10MB cap, so we
 * back Zustand's persist middleware with idb-keyval instead.
 */
const indexedDBStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await idbGet(name)) ?? null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await idbSet(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await idbDel(name);
  },
};

const STORAGE_KEY = 'langjson-store';

/*
 * FUNCTION: useAppStore
 * PROCESSING: Creates a Zustand store for global state management, persisted
 *             to IndexedDB (settings, last-loaded document, scroll position).
 *             Provides atomic actions to update nested settings state.
 */
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      data: null,
      settings: DEFAULT_SETTINGS,
      scrollPosition: 0,
      hasHydrated: false,

      setData: (data) => set({ data, scrollPosition: 0 }),

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
      })),

      setScrollPosition: (position) => set({ scrollPosition: position }),

      // ADR-008: lets users wipe persisted document/settings/scroll data
      // (privacy on shared machines, or just starting fresh).
      clearSavedData: () => set({
        data: null,
        settings: DEFAULT_SETTINGS,
        scrollPosition: 0,
      }),

      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => indexedDBStorage),
      // Only persist actual state, not the hydration flag or actions.
      partialize: (state) => ({
        data: state.data,
        settings: state.settings,
        scrollPosition: state.scrollPosition,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
