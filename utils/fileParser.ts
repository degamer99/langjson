/*
 * TABLE OF CONTENTS
 * 1. parseJsonFile - Main entry point for processing File objects
 * 2. validateStructure - Internal helper to check JSON schema
 */

import { SentenceData } from '../types';

/*
 * FUNCTION: validateStructure
 * INPUTS: data (any)
 * PROCESSING: Checks if the data is an array and if the first item matches expected shape.
 *             Note: This is a shallow check for performance.
 * OUTPUT: boolean
 */
const validateStructure = (data: any): data is SentenceData[] => {
  if (!Array.isArray(data)) return false;
  if (data.length === 0) return true; // Empty array is valid but useless
  
  // Check the first item as a sample
  const sample = data[0];
  return (
    typeof sample === 'object' &&
    'sentence' in sample &&
    'translation' in sample &&
    'wordbyword' in sample &&
    Array.isArray(sample.wordbyword)
  );
};

/*
 * FUNCTION: parseJsonFile
 * INPUTS: file (File)
 * PROCESSING: Uses FileReader to read text, parses JSON, and validates structure.
 * OUTPUT: Promise<SentenceData[]>
 */
export const parseJsonFile = (file: File): Promise<SentenceData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const json = JSON.parse(text);

        if (validateStructure(json)) {
          resolve(json);
        } else {
          reject(new Error("Invalid JSON structure. Expected array of sentence objects."));
        }
      } catch (err) {
        reject(new Error("Failed to parse JSON file."));
      }
    };

    reader.onerror = () => {
      reject(new Error("File reading error."));
    };

    reader.readAsText(file);
  });
};
