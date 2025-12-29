/*
 * TABLE OF CONTENTS
 * 1. Data Interfaces - JSON structure definitions
 * 2. Settings Interfaces - Application state definitions
 */

// --- 1. Data Interfaces ---

export interface WordData {
  src: string;
  tr: string;
}

export interface SentenceData {
  sentence: string;
  translation: string;
  wordbyword: WordData[];
}

// --- 2. Settings Interfaces ---

export type ThemeOption = 'light' | 'dark' | 'sepia' | 'auto';

export interface ViewOptions {
  isSticky: boolean;
  fontSize: number; // in px or rem scale
  verticalSpacing: number; // tailwind scale (e.g., 4, 8, 12)
  showSentence: boolean;
  showWordByWord: boolean;
  showTranslation: boolean;
}

export interface AppSettings {
  theme: ThemeOption;
  isRTL: boolean;
  view: ViewOptions;
}
