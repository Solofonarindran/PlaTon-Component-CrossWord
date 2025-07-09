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

  private words : Word [] = [
    { clue: "Un félin domestique", answer: "Lion"},
    { clue: "Un animal qui aboie", answer : "Chien"}
  ]
  constructor(private crossWordService : CrossWordService) {}

  ngOnInit(): void {
    const layout = this.crossWordService.generateGrid(this.words);
  }
}
