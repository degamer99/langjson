
export interface WordByWord {
  language: string;
  translation: string;
}

export interface Verse {
  id: number;
  language: string;
  translation: string;
  wordByWord: WordByWord[];
  metadata: string;
}
