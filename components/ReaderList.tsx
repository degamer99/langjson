/*
 * TABLE OF CONTENTS
 * 1. Imports
 * 2. ReaderList Component
 *    - Logic: Retrieve state from Store
 *    - Render: Content
 */

import React from 'react';
import { useAppStore } from '../store/useAppStore';

/*
 * FUNCTION: ReaderList
 * INPUTS: None (Connected to Store)
 * PROCESSING: Retrieves 'data' and 'settings' from Zustand store. 
 *             Calculates layout classes based on settings.
 * OUTPUT: JSX.Element
 */
const ReaderList: React.FC = () => {
  const { data, settings } = useAppStore();

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 opacity-60">
        <p className="text-2xl font-semibold mb-2">No content loaded</p>
        <p>Please upload a JSON file using the controls above.</p>
        <code className="block mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded text-xs text-left">
          Example Format:<br/>
          [<br/>
          &nbsp;&nbsp;{'{'}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;"sentence": "Foreign text...",<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;"translation": "English translation...",<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;"wordbyword": [{'{'} "src": "...", "tr": "..." {'}'}]<br/>
          &nbsp;&nbsp;{'}'}<br/>
          ]
        </code>
      </div>
    );
  }

  // Common styling calculations
  const spacingClass = `gap-y-${settings.view.verticalSpacing}`;
  const isSepia = settings.theme === 'sepia';
  
  // RTL Specific logic
  const sentenceAlign = settings.isRTL ? 'text-right font-arabic' : 'text-left font-sans';
  const wbWDirection = settings.isRTL ? 'flex-row-reverse' : 'flex-row';

  return (
    <main className="container mx-auto max-w-[90vw] px-4 pb-20">
      <div className="flex flex-col gap-12 py-8">
        {data.map((item, index) => (
          <article 
            key={index} 
            className={`
              flex flex-row gap-6 
              ${index !== data.length - 1 ? 'border-b border-gray-100 dark:border-gray-800 pb-12' : ''}
              ${isSepia ? 'border-sepia-accent/30' : ''}
            `}
          >
            {/* --- Left Column: Index --- */}
            <div className="flex-shrink-0 w-8 md:w-12 pt-2">
              <span className={`
                block text-xs md:text-sm font-bold opacity-40 text-center
                ${isSepia ? 'text-sepia-text' : ''}
              `}>
                {index + 1}
              </span>
            </div>

            {/* --- Right Column: Content Stack --- */}
            <div className={`flex flex-col w-full ${spacingClass}`}>
              
              {/* 1. Full Sentence */}
              {settings.view.showSentence && (
                <div 
                  className={`leading-relaxed transition-all duration-200 ${sentenceAlign}`}
                  style={{ fontSize: `${settings.view.fontSize * 1.25}px` }}
                >
                  {item.sentence}
                </div>
              )}

              {/* 2. Word by Word Cards */}
              {settings.view.showWordByWord && item.wordbyword && (
                <div className={`flex flex-wrap gap-2 ${wbWDirection}`}>
                  {item.wordbyword.map((word, wIndex) => (
                    <div 
                      key={wIndex}
                      className={`
                        flex flex-col items-center justify-between
                        rounded px-2 py-1.5 min-w-[3rem]
                        bg-black/5 dark:bg-white/5
                        ${isSepia ? 'bg-sepia-accent/20' : ''}
                      `}
                    >
                      <span 
                        className="mb-1 font-medium" 
                        style={{ fontSize: `${settings.view.fontSize}px` }}
                      >
                        {word.src}
                      </span>
                      <span className="text-xs opacity-70 italic border-t border-current pt-1 w-full text-center">
                        {word.tr}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* 3. Translation */}
              {settings.view.showTranslation && (
                <div 
                  className={`
                    text-base md:text-lg opacity-80 leading-relaxed
                    ${isSepia ? 'text-sepia-text' : 'text-gray-600 dark:text-gray-300'}
                  `}
                >
                  {item.translation}
                </div>
              )}

            </div>
          </article>
        ))}
      </div>
    </main>
  );
};

export default ReaderList;
