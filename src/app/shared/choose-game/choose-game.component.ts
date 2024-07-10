import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { GameItem } from '../../models/game-item';
import { GameEnum } from '../../models/game.enum';
import { CommonModule } from '@angular/common';
import { GameStarterComponent } from '../game-starter/game-starter.component';

@Component({
  selector: 'app-choose-game',
  standalone: true,
  imports: [MatGridListModule, CommonModule, GameStarterComponent],
  templateUrl: './choose-game.component.html',
  styleUrl: './choose-game.component.css'
})
export class ChooseGameComponent {
  games: GameItem[] = [
    {
      name: GameEnum.pokemon,
      source: 'assets/movies/pokemon-movie.mp4',
      path: "pokemon"
    },
    {
      name: GameEnum.arkanoid,
      source: 'assets/movies/arkanoid-movie.mp4',
      path: "arkanoid"
    },
    {
      name: GameEnum.penalty,
      source: 'assets/movies/penalty-movie.mp4',
      path: "penalty"
    },
    {
      name: GameEnum.dodgeTheAsteroids,
      source: 'assets/movies/dodge-movie.mp4',
      path: "dodgeTheAsteroids"
    },
  ]

}
