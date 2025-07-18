import { Injectable } from '@angular/core';
import { Word } from '../model/word';
// ❌ Pas d'import ES6 ici car on utilise "export ="
// import CrosswordLayout from 'crossword-layout-generator';

import * as clg from 'crossword-layout-generator';

@Injectable({
  providedIn: 'root'
})
export class CrossWordService {

  generateGrid(words: { clue : string; answer: string }[]) {
    const layout = clg.generateLayout(words);
    return layout
  }
  
}



