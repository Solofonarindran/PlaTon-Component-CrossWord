import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CrossWord } from "./cross-word/cross-word";

@Component({
  selector: 'app-root',
  imports: [CrossWord],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'myapp';
}
