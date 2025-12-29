/*
 * TABLE OF CONTENTS
 * 1. Imports
 * 2. App Component
 *    - Effect: Theme Application (Subscribes to Store)
 *    - Render: Layout composition
 */

import React, { useEffect } from 'react';
import Header from './components/Header';
import ReaderList from './components/ReaderList';
import { useAppStore } from './store/useAppStore';

/*
 * FUNCTION: App
 * INPUTS: None
 * PROCESSING: 
 *   - Subscribes to `settings.theme` from Zustand store.
 *   - Manages the top-level CSS class on the <html> element for dark/sepia modes.
 * OUTPUT: JSX.Element
 */
const App: React.FC = () => {
  const theme = useAppStore((state) => state.settings.theme);

  /*
   * EFFECT: Theme Management
   * Logic: Removes existing theme classes. Checks 'auto' against matchMedia.
   *        Adds 'dark' or 'sepia' class to document.documentElement (html tag).
   */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'sepia');

    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'sepia') {
      root.classList.add('sepia');
    } else if (theme === 'auto') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      }
    }
  }, [theme]);

  return (
    <div className={`min-h-screen transition-colors duration-300 
      ${theme === 'sepia' ? 'bg-sepia-bg text-sepia-text' : ''}
    `}>
      <Header />
      <ReaderList />
    </div>
  );
};

export default App;
