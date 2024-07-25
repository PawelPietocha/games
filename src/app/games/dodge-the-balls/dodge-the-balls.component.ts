import { Component, OnDestroy } from '@angular/core';
import { DrawService } from '../../services/draw.service';
import { MathService } from '../../services/math.service';
import { MoveService } from '../../services/move.service';
import { SliderComponent } from '../../shared/slider/slider.component';
import { CommonModule } from '@angular/common';
import { GameComponent } from '../../shared/game/game.component';
import { DefaultGameTemplateComponent } from '../../shared/default-game-template/default-game-template.component';
import { ControlKey } from '../../models/controlKey';
import { ScoreBoardComponent } from '../../shared/score-board/score-board.component';
import { ImageForCanvas } from '../../models/shapes/imageForCanvas';
import { GameState } from '../../models/gameState';
import { KeyboardControlService } from '../../services/controlServices/keyboard-control.service';
import { Globals } from '../../shared/globals';
import { GameStateService } from '../../services/gameState.service';
import { RotateImageForCanvas } from '../../models/shapes/rotate-image-for-canvas';
import { Hero } from '../platform/models/hero';

@Component({
  selector: 'app-dodge-the-balls',
  standalone: true,
  imports: [SliderComponent, CommonModule, DefaultGameTemplateComponent, ScoreBoardComponent],
  templateUrl: './dodge-the-balls.component.html',
  styleUrl: './dodge-the-balls.component.css'
})
export class DodgeTheBallsComponent extends GameComponent implements OnDestroy{
  oponents: ImageForCanvas[] = [];
  oponentsInterval: string | number | NodeJS.Timeout;

  maxHeroMovementSpeed = 30;

  maxOponentsMovementSpeedForSlider = 15;
  maxOponentsMovementSpeedSettedByUser = 9;

  maxOponentRadiusForSlider = 72;
  maxOponentRadiusSettedByUser = 36;

  movementSpeed = 5;

  scoreInterval: string | number | NodeJS.Timeout;

  constructor(
    private drawService: DrawService,
    private moveService: MoveService,
    private mathService: MathService,
    private gameKeyboardControlService: KeyboardControlService,
    private gameGameStateService: GameStateService) {
    super(gameKeyboardControlService, gameGameStateService);
  }

  override ngOnDestroy(): void {
    this.clearIntervals();
    clearInterval(this.oponentsInterval);
    clearInterval(this.scoreInterval);
  }

  override pausedGame(): void {
    return;
  }

  initValues(): void {
    this.initHeroValue();
  }

  drawAll(): void {
    this.drawHero();
    this.drawOponents();
  }

  conditionToEndMainInterval(): boolean {
    return this.oponents?.some(oponent => this.mathService.isTwoImagesToClose(oponent, this.hero as ImageForCanvas));
  }


  initControlList(): void {
    this.controlKeyBoardKeys = [ControlKey.arrowUp, ControlKey.arrowDown, ControlKey.arrowLeft, ControlKey.arrowRight];
  }

  actionAfterEndRun(): void {
    clearInterval(this.oponentsInterval);
    clearInterval(this.scoreInterval);
  }

  actionAfterStartGame(): void {
    this.oponents = [];
    this.startOponentsRun();
    this.createScoreInterval();
    this.succesfullyAtempts = 0;
  }

  override actionAfterExitToSettings(): void {
    this.oponents = [];
  }

  private initHeroValue() {
    this.hero = new Hero(
      "assets/dodge/rocket.png",
      {
        width: 0.05,
        height: 0.5
      },
      0.05,
      0.15,
      5,
      this.canvasHelper.canvas);
  }

  private addOponent() {
    const oponentHeight = MathService.getRandomInteger(1, this.maxOponentRadiusSettedByUser) * 2;
    const point = {
      width: this.canvasHelper.canvas.width + oponentHeight * 2,
      height: this.hero.point.height
    };
    const oponent = new RotateImageForCanvas(
      "assets/dodge/asteroid.png",
      point,
      oponentHeight,
      oponentHeight,
      3.6)
    this.oponents.push(oponent);
  }

  private drawHero() {
    this.drawService.drawImage(this.canvasHelper.ctx, this.hero as ImageForCanvas);
  }

  private drawOponents() {
    this.oponents.forEach(oponent => this.drawService.drawRotateImage(this.canvasHelper.ctx, oponent as RotateImageForCanvas));
  }

  private runOponent(): void {
    const oponent = this.oponents[this.oponents.length - 1];
    const speed = MathService.getRandomInteger(1, this.maxOponentsMovementSpeedSettedByUser);
    this.moveService.runInConstHeightFromLeftToRightWithInfinityLoop(10, oponent, this.canvasHelper.canvas.width, speed, Globals.gameState);
  }

  private startOponentsRun(): void {
    this.oponentsInterval = setInterval(() => {
      if(Globals.gameState === GameState.paused) {
        return;
      }
      this.addOponent();
      this.runOponent();
    }, 5000);
  }

  private createScoreInterval(): void {
    this.scoreInterval = setInterval(() => {
      if(Globals.gameState === GameState.paused) {
        return;
      }
      this.succesfullyAtempts += 1;
    }, 100)
  }
}
