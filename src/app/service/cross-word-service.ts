import { Injectable } from '@angular/core';
import {generateLayout} from 'crossword-layout-generator';
import { Word } from '../model/word';

@Injectable({
  providedIn: 'root'
})
export class CrossWordService {
 generateGrid(words : Word []) {
  const layout = generateLayout(
    words.map(word => ({ 
      clue: word.clue, 
      answer: word.answer.toUpperCase()
    }))
  );
  return layout;
 }
}
