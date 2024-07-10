import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameItem } from '../../models/game-item';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-starter',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './game-starter.component.html',
  styleUrl: './game-starter.component.css'
})
export class GameStarterComponent {
  @Input() game: GameItem;

  constructor(private router: Router,) {

  }

  start():void {
    this.router.navigate([this.game.path]);
  }

}
