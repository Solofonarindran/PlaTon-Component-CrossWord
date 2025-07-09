import { Component, OnInit } from '@angular/core';
import { Cell } from '../model/cell';
import { Word } from '../model/word';
import { CrossWordService } from '../service/cross-word-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cross-word',
  imports: [ CommonModule, FormsModule],
  templateUrl: './cross-word.html',
  styleUrl: './cross-word.css'
})
export class CrossWord implements OnInit{
  grid: Cell [][] =  [];
  size : number = 0;

  private words : Word [] = [
    { clue: "Un félin domestique", answer: "Lion"},
    { clue: "Un animal qui aboie", answer : "Chien"},
    { clue: "Un animal qui a un barbe", answer : "mouton"}
  ]
  constructor(private crossWordService : CrossWordService) {}

  ngOnInit(): void {
    const layout = this.crossWordService.generateGrid(this.words);
    this.size = layout.size;
    this.grid = this.buildGrid(layout.words);
  }
  
  buildGrid(wordsWithPlacement: Word[]): Cell[][] {
    const grid: Cell[][] = Array.from({ length: this.size }, () =>
      Array.from({ length: this.size }, () => ({
        x: 0,
        y: 0,
        value: '',
        isBlocked: false
      }))
    );
    for (const word of wordsWithPlacement) {
      if(word.startX == null || word.startY == null || !word.direction) continue;

      for( let i = 0;  i < word.answer.length;i++) {
        const x = word.startX + (word.direction === 'horizontal' ? i : 0);
        const y = word.startY + (word.direction === 'vertical' ? i : 0);
        grid[y][x] = {
          x: x,
          y: y,
          value: word.answer[i],
          isBlocked: false
        };
      }
    }

    return grid;

  }

  onKeyDown(event: KeyboardEvent, y: number, x: number): void {
    const key = event.key;
    const isLetter = /^[a-zA-Z]$/.test(key);

    if (isLetter) {
      this.grid[y][x].value = key.toUpperCase();
      this.focusNextCell(y, x);
      event.preventDefault();
    } else if (key === 'Backspace') {
      this.grid[y][x].value = '';
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
    if (this.grid[y]?.[x] && !this.grid[y][x].isBlocked) {
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

    while (this.grid[newY]?.[newX] && this.grid[newY][newX].isBlocked) {
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

    while (this.grid[newY]?.[newX] && this.grid[newY][newX].isBlocked) {
      newX--;
      if (newX < 0) {
        newX = this.grid[0].length - 1;
        newY--;
      }
    }

    this.focusCell(newY, newX);
  }


}
