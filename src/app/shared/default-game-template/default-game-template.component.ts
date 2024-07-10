import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';
import { GameState } from '../../models/gameState';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-default-game-template',
  standalone: true,
  imports: [SliderComponent, CommonModule, MatIconModule],
  templateUrl: './default-game-template.component.html',
  styleUrl: './default-game-template.component.css'
})
export class DefaultGameTemplateComponent {
  @Input() gameState: GameState;
  @Input() class: string;
  @Input() canvasRightFromStart: number;
  @Input() startGameDisabled: boolean;
  @Input() levelOfGame: number = 1;
  @Input() pausedGameDisabled: boolean;

  @Output() gameStarted = new EventEmitter();
  @Output() gameReRunned = new EventEmitter();
  @Output() movedToexitToSettings = new EventEmitter();
  @Output() pausedGame = new EventEmitter();
  @Output() leavedGame = new EventEmitter();
  GameState = GameState;

  startGame() {
    this.gameStarted.emit();
  }
  reRun() {
    this.gameReRunned.emit();
  }
  exitToSettings() {
    this.movedToexitToSettings.emit();
  }

  getReRunLabel(): string {
    return this.levelOfGame === 1 ? "Ponów (enter)" : "Rozpocznij poziom " + this.levelOfGame;
  }

  pauseGame() {
    this.pausedGame.emit();
  }

  leaveGame() {
    this.leavedGame.emit();
  }



}
