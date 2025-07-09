export interface Word {
    clue: string;
    answer: string;
    startX?: number;
    startY?: number;
    direction?: 'horizontal' | 'vertical';
    number?: number
}
