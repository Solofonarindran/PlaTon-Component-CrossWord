import { Component, inject, OnInit } from '@angular/core';
import { Cell } from '../model/cell';
import { Word } from '../model/word';
import { CrossWordService } from '../service/cross-word-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import CrosswordLayout from 'crossword-layout-generator';
import { Result } from '../model/result';

@Component({
  selector: 'app-cross-word',
  imports: [ CommonModule, FormsModule],
  templateUrl: './cross-word.html',
  styleUrl: './cross-word.css'
})
export class CrossWord implements OnInit{
  grid: string [][] =  [];
  results : Result[]= [];
  cols: number = 0;
  rows: number = 0;
  size: number = 0;
 
  private crossWordService : CrossWordService = inject(CrossWordService) ;

  private words : {clue : string; answer: string}[] = [{"clue":"that which is established as a rule or model by authority, custom, or general consent","answer":"standard"},{"clue":"a machine that computes","answer":"computer"},{"clue":"the collective designation of items for a particular purpose","answer":"equipment"},{"clue":"an opening or entrance to an inclosed place","answer":"port"},{"clue":"a point where two things can connect and interact","answer":"interface"}]
  
  ngOnInit(): void {
    this.generateGrid();
  }

  generateGrid(){
    this.crossWordService.generateGridService(this.words);
    this.results = this.crossWordService.getResults();
    this.grid = this.crossWordService.getGrid();
    console.log(this.results)
  }
  
  /* check if the cell is vertical word */
  isStartCellVertical(x: number, y: number) : boolean{  
    return this.crossWordService.isStartCellDownService(x,y);
  }

  /* check if the cell is horizental word */
  isStartCellHorizental(x: number, y: number) : boolean{
    return this.crossWordService.isStartCellAcrossService(x,y);
  }

  /* methode de récuperation de position grace au startX et startY */
  resultByCoordonateXY(x: number, y:number) : Result {
    return this.crossWordService.resultByCoordonateXYService(x,y);
  
  }
 

  onKeyUp(event: KeyboardEvent,result: Result) {
   
    const key = event.key
    const isLetter = /^[a-zA-Z]$/.test(key);
    if (isLetter) {
      return;
    }else if(key === 'Tab') {
      
    }else {
      return;
    }

    console.log(event.key)
  }
 

 

  
 

}
