import { Component, OnInit } from '@angular/core';
import { DrawService } from '../../services/draw.service';
import { MathService } from '../../services/math.service';
import { MoveService } from '../../services/move.service';
import { SliderComponent } from '../../shared/slider/slider.component';
import { CommonModule } from '@angular/common';
import { GameComponent } from '../../shared/game/game.component';
import { DefaultGameTemplateComponent } from '../../shared/default-game-template/default-game-template.component';
import { ControlKey } from '../../models/controlKey';
import { ScoreBoardComponent } from '../../shared/score-board/score-board.component';
import { ImageForCanvas } from '../../models/imageForCanvas';
import { RotateImageForCanvas } from '../../models/rotate-image-for-canvas';
import { Router } from '@angular/router';
import { GameState } from '../../models/gameState';

@Component({
  selector: 'app-dodge-the-balls',
  standalone: true,
  imports: [SliderComponent, CommonModule, DefaultGameTemplateComponent, ScoreBoardComponent],
  templateUrl: './dodge-the-balls.component.html',
  styleUrl: './dodge-the-balls.component.css'
})
export class DodgeTheBallsComponent extends GameComponent {
  oponents: ImageForCanvas[] = [];
  oponentsInterval: any;

  maxHeroMovementSpeed = 30;

  maxOponentsMovementSpeedForSlider = 15;
  maxOponentsMovementSpeedSettedByUser = 9;

  maxOponentRadiusForSlider = 72;
  maxOponentRadiusSettedByUser = 36;

  scoreInterval: any;

  constructor(
    private drawService: DrawService,
    private moveService: MoveService,
    private mathService: MathService,
    private gameRouter: Router) {
    super(gameRouter);
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
    this.hero = new ImageForCanvas(
      "assets/dodge/rocket.png",
      {
        width: 0.05,
        height: 0.5
      },
      0.05,
      0.15,
      this.canvas);
  }

  private addOponent() {
    let oponentHeight = MathService.getRandomInteger(1, this.maxOponentRadiusSettedByUser) * 2;
    let point = {
      width: this.canvas.width + oponentHeight * 2,
      height: this.hero.point.height
    };
    let oponent = new RotateImageForCanvas(
      "assets/dodge/asteroid.png",
      point,
      oponentHeight,
      oponentHeight,
      3.6)
    this.oponents.push(oponent);
  }

  private drawHero() {
    this.drawService.drawImage(this.ctx, this.hero as ImageForCanvas);
  }

  private drawOponents() {
    this.oponents.forEach(oponent => this.drawService.drawRotateImage(this.ctx, oponent as RotateImageForCanvas));
  }

  private runOponent(): void {
    let oponent = this.oponents[this.oponents.length - 1];
    let speed = MathService.getRandomInteger(1, this.maxOponentsMovementSpeedSettedByUser);
    this.moveService.runInConstHeightFromLeftToRightWithInfinityLoop(10, oponent, this.canvas.width, speed, this.gameState);
  }

  private startOponentsRun(): void {
    this.oponentsInterval = setInterval(() => {
      if(this.gameState === GameState.paused) {
        return;
      }
      this.addOponent();
      this.runOponent();
    }, 5000);
  }

  private createScoreInterval(): void {
    this.scoreInterval = setInterval(() => {
      if(this.gameState === GameState.paused) {
        return;
      }
      this.succesfullyAtempts += 1;
    }, 100)
  }
}
