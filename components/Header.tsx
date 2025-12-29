/*
 * TABLE OF CONTENTS
 * 1. Imports
 * 2. Header Component
 *    - Store Connection
 *    - Handlers (File Upload)
 *    - Render: Brand & Upload
 *    - Render: Toolbar (Theme, Typography, View)
 */

import React from 'react';
import { ThemeOption } from '../types';
import { useAppStore } from '../store/useAppStore';
import { parseJsonFile } from '../utils/fileParser';
import { 
  Upload, 
  Sun, 
  Moon, 
  Type, 
  AlignLeft, 
  AlignRight, 
  MoveVertical,
  Pin,
  PinOff
} from 'lucide-react';

/*
 * FUNCTION: Header
 * INPUTS: None (Connected to Store)
 * PROCESSING: 
 *   - Consumes global state via Zustand.
 *   - Handles file upload parsing internally.
 *   - Renders a strictly aligned toolbar with visual dividers.
 * OUTPUT: JSX.Element
 */
const Header: React.FC = () => {
  const { settings, setData, setTheme, toggleRTL, updateView } = useAppStore();

  const handleFileUpload = async (file: File) => {
    try {
      const parsedData = await parseJsonFile(file);
      setData(parsedData);
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const isSepia = settings.theme === 'sepia';
  
  // Theme-based styling
  // Removed '/90' opacity from sepia-bg to ensure correct color rendering
  const headerThemeClass = isSepia
    ? 'bg-sepia-bg border-sepia-accent text-sepia-text'
    : 'bg-white/95 border-slate-200 text-slate-700 dark:bg-slate-900/95 dark:border-slate-800 dark:text-slate-100';

  const dividerClass = isSepia 
    ? 'divide-sepia-accent/50' 
    : 'divide-gray-200 dark:divide-gray-800';

  return (
    <header 
      className={`
        z-50 border-b shadow-sm backdrop-blur-sm transition-all duration-300
        ${settings.view.isSticky ? 'sticky top-0 left-0 right-0' : 'relative'}
        ${headerThemeClass}
      `}
    >
      <div className="container mx-auto px-4 h-auto md:h-16 py-2 md:py-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 h-full">
          
          {/* --- LEFT: Brand & Import --- */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
            <h1 className="font-bold text-xl tracking-tight hidden lg:block">Reader</h1>
            
            <label className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md cursor-pointer transition-colors bg-blue-600 text-white hover:bg-blue-700 shadow-sm">
              <Upload size={14} />
              <span>Load JSON</span>
              <input 
                type="file" 
                accept=".json" 
                className="hidden" 
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                }} 
              />
            </label>
            
            {/* Mobile Sticky Toggle */}
            <button 
              className="md:hidden p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5"
              onClick={() => updateView('isSticky', !settings.view.isSticky)}
            >
               {settings.view.isSticky ? <Pin size={18} /> : <PinOff size={18} />}
            </button>
          </div>

          {/* --- RIGHT: Controls Toolbar --- */}
          <div className={`
            flex flex-wrap md:flex-nowrap items-center justify-center md:justify-end 
            gap-x-4 gap-y-2 w-full md:w-auto 
            md:divide-x ${dividerClass}
          `}>
            
            {/* Group 1: Global Settings */}
            <div className="flex items-center gap-3 md:pr-4">
              {/* Theme Dropdown */}
              <div className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 rounded-md px-2 py-1">
                {settings.theme === 'light' ? <Sun size={14}/> : <Moon size={14}/>}
                <select 
                  className="bg-transparent text-xs font-medium focus:outline-none cursor-pointer appearance-none pr-1"
                  value={settings.theme}
                  onChange={(e) => setTheme(e.target.value as ThemeOption)}
                  title="Change Theme"
                >
                  <option value="auto">Auto</option>
                  <option value="light">Light</option>
                  <option value="sepia">Sepia</option>
                  <option value="dark">Dark</option>
                </select>
              </div>

              {/* Direction Toggle */}
              <button 
                onClick={toggleRTL}
                className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                title={`Text Direction: ${settings.isRTL ? 'RTL' : 'LTR'}`}
              >
                {settings.isRTL ? <AlignRight size={18} /> : <AlignLeft size={18} />}
              </button>

              {/* Sticky Pin (Desktop) */}
              <button 
                onClick={() => updateView('isSticky', !settings.view.isSticky)}
                className={`
                  hidden md:block p-1.5 rounded-md transition-colors
                  ${settings.view.isSticky ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'hover:bg-black/5 dark:hover:bg-white/10'}
                `}
                title={settings.view.isSticky ? "Unpin Header" : "Pin Header"}
              >
                {settings.view.isSticky ? <Pin size={18} /> : <PinOff size={18} />}
              </button>
            </div>

            {/* Group 2: Typography */}
            <div className="flex items-center gap-4 md:px-4">
              <div className="flex items-center gap-2" title="Font Size">
                <Type size={16} className="opacity-60" />
                <input 
                  type="range" 
                  min="14" 
                  max="32" 
                  step="2" 
                  value={settings.view.fontSize} 
                  onChange={(e) => updateView('fontSize', Number(e.target.value))}
                  className="w-20 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
                />
              </div>
              
              <div className="flex items-center gap-2" title="Vertical Spacing">
                <MoveVertical size={16} className="opacity-60" />
                <input 
                  type="range" 
                  min="2" 
                  max="16" 
                  step="2" 
                  value={settings.view.verticalSpacing} 
                  onChange={(e) => updateView('verticalSpacing', Number(e.target.value))}
                  className="w-16 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
                />
              </div>
            </div>

            {/* Group 3: View Toggles */}
            <div className="flex items-center gap-3 md:pl-4 text-xs font-medium">
              <label className="flex items-center gap-1.5 cursor-pointer select-none opacity-80 hover:opacity-100 transition-opacity">
                <input 
                  type="checkbox" 
                  checked={settings.view.showSentence}
                  onChange={(e) => updateView('showSentence', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="hidden sm:inline">Sent</span>
                <span className="sm:hidden">S</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer select-none opacity-80 hover:opacity-100 transition-opacity">
                <input 
                  type="checkbox" 
                  checked={settings.view.showWordByWord}
                  onChange={(e) => updateView('showWordByWord', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="hidden sm:inline">Words</span>
                <span className="sm:hidden">W</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer select-none opacity-80 hover:opacity-100 transition-opacity">
                <input 
                  type="checkbox" 
                  checked={settings.view.showTranslation}
                  onChange={(e) => updateView('showTranslation', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="hidden sm:inline">Trans</span>
                <span className="sm:hidden">T</span>
              </label>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
