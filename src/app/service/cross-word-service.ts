import { Injectable } from '@angular/core';
import { Word } from '../model/word';
// ❌ Pas d'import ES6 ici car on utilise "export ="
// import CrosswordLayout from 'crossword-layout-generator';

import * as clg from 'crossword-layout-generator';
import { Result } from '../model/result';

@Injectable({
  providedIn: 'root'
})
export class CrossWordService {
  private grid: string[][] = [];
  private results: Result[] = [];
  
  generateGridService(words: { clue : string; answer: string }[]) {
    const layout = clg.generateLayout(words);
    this.grid = layout.table;
    this.results = layout.result;
    console.log(layout)
  }

  /* getter of retrieve grid */
  getGrid(): string[][] {
    const grid = this.grid;
    return grid;
  }

  /* getter of retrieve result */
  getResults(): Result[] {
    const result = this.results
    return result;
  }

  /* check if the cell is the start of a word */
  private isStartCell(x: number, y: number, result: Result): boolean{
    return result.startx === x + 1 && result.starty === y + 1
  }

  /* check if the cell is a vertical word */
  isStartCellDownService(x: number, y: number): boolean {
    return this.results.some(result => result.orientation === "down" 
                                       && this.isStartCell(x,y,result))
  }

  /* check if the cell is a horizental word */
  isStartCellAcrossService(x: number, y: number): boolean {
    return this.results.some(result => result.orientation === "across" 
                                       && this.isStartCell(x,y,result))
  }

  /* This methode return the position (index) of the word in clue */

 /* indexByCoordonateXY(x: number, y: number) {
    let index = 0;
    this.results.forEach((result,index) => {
      if (this.isStartCell(x,y,result)) {
        index = result.position
      }
    })
    return index
  } */

  resultByCoordonateXYService(x: number, y:number): Result {
    const result = this.results.find(result => this.isStartCell(x,y,result))
    if(!result) {
      return {clue: "", answer: "", startx: 0, starty: 0, orientation: "", position: 0}
    } else {
      return result
    }
  }
  

}



