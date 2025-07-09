declare module 'crossword-layout-generator' {
    export function generateLayout(words: { clue: string; answer: string; }[]): {
      size: number;
      words: Array<
        {
          clue: string;
          answer: string;
          x: number;
          y: number;
          direction: 'across' | 'down';
        }
      >;
    };
}
