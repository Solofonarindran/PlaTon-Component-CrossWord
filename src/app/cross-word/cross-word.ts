import { Component, inject, OnInit } from '@angular/core';
import { CrossWordService } from '../service/cross-word-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import CrosswordLayout from 'crossword-layout-generator';
import { Result } from '../model/result';
import { CellActiveInterface } from '../model/cell-active-interface';
import CellActive from '../model/cell-active'

@Component({
  selector: 'app-cross-word',
  imports: [ CommonModule, FormsModule],
  templateUrl: './cross-word.html',
  styleUrl: './cross-word.css'
})
export class CrossWord implements OnInit{
  grid: string [][] =  [];
  results : Result[]= []; 
  inProgress : boolean = false;
  cellActive : CellActiveInterface = new CellActive(0,"",0,0);

  private crossWordService : CrossWordService = inject(CrossWordService) ;

  private words : {clue : string; answer: string}[] = [{"clue":"Un animal domestique qui boie","answer":"chien"},{"clue":"je suis vide et rien ne m'empêche de m'appeler","answer":"néant"},{"clue":"the collective designation of items for a particular purpose","answer":"equipment"},{"clue":"an opening or entrance to an inclosed place","answer":"port"},{"clue":"Capital de Mada","answer":"interface"}]
  
  ngOnInit(): void {
    this.generateGrid();
  }

  generateGrid(){
    this.crossWordService.generateGridService(this.words);
    this.results = this.crossWordService.getResults();
    this.grid = this.crossWordService.getGrid();
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
 
  /* focus for the next cell */
  /*focusNextCell(x : number, y : number) {
    if(!this.inProgress) {
      const result = this.crossWordService.resultByCoordonateXYService(x, y)
      this.cellActive = new CellActive(result.answer.length,result.orientation,x,y);
      this.inProgress = true;
    }
    const nextCoordonate = this.crossWordService.coordonateRedirectionByTabulationService(this.cellActive.orientationWordActive,this.cellActive.sizeOfWordActive,this.cellActive.x, this.cellActive.y)
    console.log(nextCoordonate)
    const nextX = nextCoordonate.x
    const nextY = nextCoordonate.y
    const status = nextCoordonate.status

    if(!status) {
      this.inProgress = false
    }

    this.cellActive.x = nextX;
    this.cellActive.y = nextY;
    
    /* put the next coordonate with the focus 
    const nextCell = document.querySelector(`[data-x="${nextX}"][data-y="${nextY}"]`) as HTMLInputElement
    nextCell.focus()

  }*/

  focusNextCell(x : number, y : number) {
    let result ;
    let nextX = x;
    let nextY = y;
    const results = this.crossWordService.nextResultByXYFocusService(x, y)
    if (results.length > 1) {
      if(this.inProgress) {
        result = results.find(result => result.orientation === this.cellActive.orientationWordActive)
      }else {
        /* prend la première position du tableau quoi se soit de l'orientation */
        result = results[0]
      }
    } else {
        result = results[0]
    }
    
    if(result) {
      const nextCoordonate = this.crossWordService.coordonateRedirectionByTabulationService(result.orientation, result.answer.length, x, y)
      nextX = nextCoordonate.x
      nextY = nextCoordonate.y

      this.cellActive = new CellActive(result.answer.length,result.orientation,x,y);
      this.inProgress = nextCoordonate.status;

      const nextCell = document.querySelector(`[data-x="${nextX}"][data-y="${nextY}"]`) as HTMLInputElement
      nextCell.focus()
    }
    
  }

  onKeyDown(event: KeyboardEvent, x : number, y : number) {
   
    const key = event.key
    console.log(key)
    const isLetter = /^[a-zA-Z]$/.test(key);
    if (isLetter) {
      return;
    }else if(key === 'Tab' || key === 'ArrowRight') {

      /* désactiver le comportement par défaut du navigateur */
      event.preventDefault()
      this.focusNextCell(x, y)
      
    }else {
      return;
    }
  }
 

}