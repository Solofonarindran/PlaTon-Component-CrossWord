import { Injectable } from '@angular/core';
import { Word } from '../model/word';
// ❌ Pas d'import ES6 ici car on utilise "export ="
// import CrosswordLayout from 'crossword-layout-generator';

import * as clg from 'crossword-layout-generator';
import { Result } from '../model/result';
import { Coordonate } from '../model/coordonate';
import { NextCoordonate } from '../model/next-coordonate';
import { popResultSelector } from 'rxjs/internal/util/args';

@Injectable({
  providedIn: 'root'
})
export class CrossWordService {
  private grid: string[][] = [];
  private results: Result[] = [];
  private userAnswers : Result[] = []

  generateGridService(words: { clue : string; answer: string }[]) {
    const layout = clg.generateLayout(words);
    this.grid = layout.table;
    this.results = layout.result;
   this.userAnswers = this.generateUserAnswers()
    console.log(this.results)
    console.log(this.userAnswers)
  }


  /* generate user answers */
  generateUserAnswers() {
    let resultsCopy = this.results
    const userAnswers = resultsCopy.map((result) => ({
      ...result,
      answer: '-'.repeat(result.answer.length)
    }))
    return userAnswers
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

  resultByCoordonateXYService(x: number, y:number): Result {
    const result = this.results.find(result => this.isStartCell(x,y,result))
    if(!result) {
      return {clue: "", answer: "", startx: 0, starty: 0, orientation: "", position: 0}
    } else {
      return result
    }
  }
  
  /*lambda for nextResultByXYFocusService*/
  lambda(result : Result, x : number, y : number) : boolean {
    if(result.orientation == "across") {
      return result.starty === y + 1 && ((x+1) >= result.startx) && ((x+1)< result.startx + result.answer.length )
    } else {
      return result.startx === x + 1 && ( (y+1) >= result.starty) && ((y+1)< result.starty + result.answer.length )
    }
   
  }

  /* method to retrieve the next by result of x  and y */
  nextResultByXYFocusService(x : number, y : number) : Result [] {
    return this.results.filter(result => this.lambda(result,x,y))
  }

  coordonateRedirectionByTabulationService(orientation : string, size : number, x : number, y : number) : Coordonate{
    let nextX = x;
    let nextY = y;
    let status : boolean = true;
    
    switch (orientation) {
      case "across":
        nextX ++;
        (size - nextX) <= 1 ? status = false : status = true;
        return new NextCoordonate(nextX,nextY,status)
      case "down":
        nextY ++;
        (size - nextY) <= 1 ? status = false : status = true;
        return new NextCoordonate(nextX,nextY,status)
      default:
        break;
    } 
    return new NextCoordonate(nextX,nextY,status);
  }
}



