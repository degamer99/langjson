// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
//
// // --- Types for Spaced Repetition ---
//
// // A unique ID for a word card (e.g., "verseId-wordIndex")
// type CardKey = string;
//
// interface CardProgress {
//   interval: number; // The number of days until the next review
//   repetitions: number; // How many times the card has been successfully reviewed
//   easinessFactor: number; // A measure of how easy the card is (1.3 to 2.5)
//   nextReviewDate: number; // Timestamp (ms) for the next scheduled review
// }
//
// interface SrsState {
//   // Map where key is CardKey and value is CardProgress
//   cardProgress: Record<CardKey, CardProgress>;
//   updateCardProgress: (cardKey: CardKey, grade: 0 | 1 | 2 | 3 | 4 | 5) => void;
//   // A utility function to build the key
//   buildCardKey: (verseId: number, wordIndex: number) => CardKey;
//   getScheduledCards: (allWordByWordCards: { key: CardKey, word: any }[]) => { key: CardKey, word: any }[];
// }
//
// // --- Spaced Repetition Logic (Simplified SM-2) ---
//
// const INITIAL_EASINESS = 2.5;
// const GRADE_MAP = {
//   // Grade 5: Perfect recall (Easy)
//   5: { factorChange: 0.1, intervalFactor: 1.0 },
//   // Grade 4: Correct, but some difficulty (Good)
//   4: { factorChange: 0.0, intervalFactor: 1.0 },
//   // Grade 3: Correct, but needed hints/effort (Hard)
//   3: { factorChange: -0.15, intervalFactor: 0.0 },
//   // Grade 0-2: Incorrect/Forgot (Again)
//   0: { factorChange: -0.2, intervalFactor: 0.0 },
//   1: { factorChange: -0.2, intervalFactor: 0.0 },
//   2: { factorChange: -0.2, intervalFactor: 0.0 },
// };
//
// const calculateNewProgress = (
//   current: CardProgress,
//   grade: 0 | 1 | 2 | 3 | 4 | 5
// ): CardProgress => {
//   const now = Date.now();
//   const { factorChange, intervalFactor } = GRADE_MAP[grade];
//
//   let newEF = Math.max(1.3, current.easinessFactor + factorChange);
//   let newReps = current.repetitions;
//   let newInterval = current.interval;
//
//   if (grade >= 3) {
//     newReps += 1;
//     if (newReps === 1) {
//       newInterval = 1; // 1 day for first success
//     } else if (newReps === 2) {
//       newInterval = 6; // 6 days for second success
//     } else {
//       newInterval = Math.round(newInterval * newEF);
//     }
//   } else {
//     // If grade is 0-2 (failure), reset repetitions and interval
//     newReps = 0;
//     newInterval = 1; // Review again tomorrow
//     // EF is still decreased
//   }
//
//   // Ensure EF doesn't go below the minimum of 1.3
//   newEF = Math.max(1.3, newEF);
//
//   const newReviewDate = now + newInterval * 24 * 60 * 60 * 1000; // Interval is in milliseconds
//
//   return {
//     interval: newInterval,
//     repetitions: newReps,
//     easinessFactor: newEF,
//     nextReviewDate: newReviewDate,
//   };
// };
//
// // --- Zustand Store Implementation ---
//
// export const useSrsStore = create<SrsState>()(
//   persist(
//     (set, get) => ({
//       cardProgress: {},
//
//       // Utility function to generate a consistent key
//       buildCardKey: (verseId: number, wordIndex: number) =>
//         `${verseId}-${wordIndex}`,
//
//       // Primary function to update card progress based on grade
//       updateCardProgress: (cardKey, grade) => {
//         set((state) => {
//           const current = state.cardProgress[cardKey] || {
//             interval: 0,
//             repetitions: 0,
//             easinessFactor: INITIAL_EASINESS,
//             nextReviewDate: 0, // Should be reviewable immediately
//           };
//
//           const newProgress = calculateNewProgress(current, grade);
//
//           return {
//             cardProgress: {
//               ...state.cardProgress,
//               [cardKey]: newProgress,
//             },
//           };
//         });
//       },
//
//       // Function to filter cards that are due for review
//       getScheduledCards: (allWordByWordCards) => {
//         const now = Date.now();
//         const { cardProgress } = get();
//
//         return allWordByWordCards.filter(({ key }) => {
//           const progress = cardProgress[key];
//
//           // If no progress, card is new, so it should be included
//           if (!progress) return true;
//
//           // If the card is due for review (nextReviewDate <= now)
//           return progress.nextReviewDate <= now;
//         });
//       },
//     }),
//     {
//       name: 'flashcard-srs-storage', // name of the item in storage
//       // Only persist the cardProgress map
//       partialize: (state) => ({ cardProgress: state.cardProgress }),
//     }
//   )
// );
