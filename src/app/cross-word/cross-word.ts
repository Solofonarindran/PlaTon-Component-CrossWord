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
  results : Result[]= []
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
  

  
  /*onKeyDown(event: KeyboardEvent, y: number, x: number): void {
    const key = event.key;
    const isLetter = /^[a-zA-Z]$/.test(key);

    if (isLetter) {
      this.grid[y][x] = key.toUpperCase();
      this.focusNextCell(y, x);
      event.preventDefault();
    } else if (key === 'Backspace') {
      this.grid[y][x] = '';
      this.focusPrevCell(y, x);
      event.preventDefault();
    } else if (key === 'ArrowRight') {
      this.focusCell(y, x + 1);
    } else if (key === 'ArrowLeft') {
      this.focusCell(y, x - 1);
    } else if (key === 'ArrowDown') {
      this.focusCell(y + 1, x);
    } else if (key === 'ArrowUp') {
      this.focusCell(y - 1, x);
    }
  }

  private focusCell(y: number, x: number): void {
    if (this.grid[y]?.[x] && !this.grid[y][x]) {
      const cellInputs = document.querySelectorAll('.crossword-grid input');
      const flatIndex = y * this.grid[0].length + x;
      const target = cellInputs[flatIndex] as HTMLInputElement;
      target?.focus();
    }
  }
  
  private focusNextCell(y: number, x: number): void {
    let newX = x + 1;
    let newY = y;

    if (newX >= this.grid[0].length) {
      newX = 0;
      newY++;
    }

    while (this.grid[newY]?.[newX] && this.grid[newY][newX]) {
      newX++;
      if (newX >= this.grid[0].length) {
        newX = 0;
        newY++;
      }
    }

    this.focusCell(newY, newX);
  }

  private focusPrevCell(y: number, x: number): void {
    let newX = x - 1;
    let newY = y;

    if (newX < 0) {
      newX = this.grid[0].length - 1;
      newY--;
    }

    while (this.grid[newY]?.[newX] && this.grid[newY][newX]) {
      newX--;
      if (newX < 0) {
        newX = this.grid[0].length - 1;
        newY--;
      }
    }

    this.focusCell(newY, newX);
  }
*/
}
