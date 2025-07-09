import { Component, OnInit } from '@angular/core';
import { Cell } from '../model/cell';
import { Word } from '../model/word';
import { CrossWordService } from '../service/cross-word-service';

@Component({
  selector: 'app-cross-word',
  imports: [],
  templateUrl: './cross-word.html',
  styleUrl: './cross-word.css'
})
export class CrossWord implements OnInit{
  grid: Cell [][] =  [];
  size : number = 0;

  private words : Word [] = [
    { clue: "Un félin domestique", answer: "Lion"},
    { clue: "Un animal qui aboie", answer : "Chien"}
  ]
  constructor(private crossWordService : CrossWordService) {}

  ngOnInit(): void {
    const layout = this.crossWordService.generateGrid(this.words);
    this.size = layout.size;
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

}
