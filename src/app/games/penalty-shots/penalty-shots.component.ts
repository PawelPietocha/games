import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Circle } from '../../models/shapes/circle';
import { DrawService } from '../../services/draw.service';
import { MathService } from '../../services/math.service';
import { MoveService } from '../../services/move.service';
import { ScoreBoardComponent } from '../../shared/score-board/score-board.component';
import { SliderComponent } from '../../shared/slider/slider.component';
import { GameComponent } from '../../shared/game/game.component';
import { DefaultGameTemplateComponent } from '../../shared/default-game-template/default-game-template.component';
import { ControlKey } from '../../models/controlKey';
import { ImageForCanvas } from '../../models/shapes/imageForCanvas';
import { Point } from '../../models/shapes/point';
import { KeyboardControlService } from '../../services/controlServices/keyboard-control.service';
import { GameStateService } from '../../services/gameState.service';
import { FilledRectangle } from '../../models/shapes/filledRectangle';
import { Rectangle } from '../../models/shapes/rectangle';
import { RotateImageForCanvas } from '../../models/shapes/rotate-image-for-canvas';
import { Hero } from '../platform/models/hero';

@Component({
  selector: 'app-penalty-shots',
  standalone: true,
  imports: [
    CommonModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    ScoreBoardComponent,
    SliderComponent,
    DefaultGameTemplateComponent],
  templateUrl: './penalty-shots.component.html',
  styleUrl: './penalty-shots.component.css'
})
export class PenaltyShotsComponent extends GameComponent implements OnInit {

  shooter: ImageForCanvas;
  penaltyPoint: Circle;
  penaltyArc: Circle;

  downPlatform: FilledRectangle;

  penaltyArea: Rectangle;
  goalArea: Rectangle;
  goalBars: Rectangle;

  shotPower = 20;
  maxShotPower = 40;
  maxGoalkeeperMovementSpeed = 10;

  ballImg: RotateImageForCanvas;
  shouldBallRotate = false;
  movementSpeed = 5;

  constructor(
    private drawService: DrawService,
    private moveService: MoveService,
    private mathService: MathService,
    private gameKeyboardControlService: KeyboardControlService,
    private gameGameStateService: GameStateService) {
    super(gameKeyboardControlService, gameGameStateService);
    this.gameKeyboardControlService.setArrowLeftisPossible(this.arrowLeftIsPossible.bind(this));
    this.gameKeyboardControlService.setArrowRightisPossible(this.arrowRightIsPossible.bind(this));
  }

  initControlList(): void {
    this.controlKeyBoardKeys = [ControlKey.arrowLeft, ControlKey.arrowRight];
  }

  actionAfterStartGame(): void {
    this.runShooter();
  }

  conditionToEndMainInterval(): boolean {
    return this.mathService.isTwoImagesToClose(this.hero as ImageForCanvas, this.ballImg)
      || this.ballImg.point.height === this.goalBars.pointB.height;
  }

  actionAfterEndRun(): void {
    if (this.mathService.isTwoImagesToClose(this.hero as ImageForCanvas, this.ballImg)) {
      this.succesfullyAtempts += 1;
    }
    if (this.ballImg.point.height === this.goalBars.pointB.height) {
      this.failedAtempts += 1;
    }
    this.shouldBallRotate = false;
  }

  initValues() {
    this.initPlatformValues();
    this.initPenaltyAreaValues();
    this.initGoalArea();
    this.initPenaltyPointValues();
    this.initPenaltyArcValues();
    this.initGoalkeeperValues();
    this.initBallValues();
    this.initGoalBars();
    this.initShoterValues();
  }

  drawAll(): void {
    this.drawField();
    this.drawPenaltyArea();
    this.drawPlatform();
    this.drawGoalArea();
    this.drawBars();
    this.drawGoalKeeper();
    this.drawPenaltyPoint();
    this.drawBall();
    this.drawShoter();
    this.drawPenaltyArc();
  }

  override pausedGame(): void {
    return;
  }

  arrowLeftIsPossible(): boolean {
    return this.hero.point.width > this.goalBars.pointA.width;
  }

  arrowRightIsPossible(): boolean {

    return this.hero.point.width < this.goalBars.pointD.width;
  }

  private drawPlatform() {
    this.drawService.drawFilledRectangle(this.canvasHelper.ctx, this.downPlatform);
  }

  private drawBars() {
    this.drawService.drawRectancleContours(this.canvasHelper.ctx, this.goalBars, 2, true);
  }

  private drawField() {
    const count = this.canvasHelper.canvas.height / this.downPlatform.height
    for (let i = 2; i < count + 2; i++) {
      if (i % 2 === 0) {
        this.drawService.drawFilledRectangle(this.canvasHelper.ctx,
          new FilledRectangle({ width: 0, height: this.canvasHelper.canvas.height - i * this.downPlatform.height },
            this.canvasHelper.canvas.width, this.downPlatform.height, '#11ce30'));
      }
      else {
        this.drawService.drawFilledRectangle(this.canvasHelper.ctx,
          new FilledRectangle({ width: 0, height: this.canvasHelper.canvas.height - i * this.downPlatform.height },
            this.canvasHelper.canvas.width, this.downPlatform.height, 'green'));
      }
    }
  }

  private drawPenaltyArea() {
    this.drawService.drawRectancleContours(this.canvasHelper.ctx, this.penaltyArea, 3);
  }

  private drawGoalArea() {
    this.drawService.drawRectancleContours(this.canvasHelper.ctx, this.goalArea, 3, true);
  }

  private drawPenaltyArc() {
    this.drawService.drawCircle(this.canvasHelper.ctx, this.penaltyArc, 0.5, false);
  }

  private drawGoalKeeper() {
    this.drawService.drawImage(this.canvasHelper.ctx, this.hero as ImageForCanvas);
  }

  private drawShoter() {
    this.drawService.drawImage(this.canvasHelper.ctx, this.shooter);
  }

  private drawPenaltyPoint() {
    this.drawService.drawCircle(this.canvasHelper.ctx, this.penaltyPoint);
  }

  private drawBall() {
    this.shouldBallRotate ?
      this.drawService.drawRotateImage(this.canvasHelper.ctx, this.ballImg) :
      this.drawService.drawImage(this.canvasHelper.ctx, this.ballImg);
  }

  private runShooter() {
    const tangentPoint: Point = {
      width: this.penaltyPoint.point.width + this.ballImg.width / 2,
      height: this.penaltyPoint.point.height - this.ballImg.height / 2
    }
    this.moveService.simpleRunFromAToB(20, tangentPoint, this.shooter,
      () => this.startBall());
  }

  private startBall() {
    this.shouldBallRotate = true;
    const generatedRandomWidthInGoal = MathService.getRandomInteger(this.goalBars.pointA.width, this.goalBars.pointD.width);
    const endPoint = {
      width: generatedRandomWidthInGoal,
      height: this.goalBars.pointB.height
    };
    this.moveService
      .simpleRunFromAToB(this.convertShotPowerToRefreshInterval(
        this.maxShotPower, this.shotPower), endPoint, this.ballImg, () => { });
  }

  private convertShotPowerToRefreshInterval(maxValue: number, shotPower: number): number {
    const average = maxValue / 2;
    const diffrence = shotPower - average;
    return average - diffrence;
  }

  private initBallValues() {
    this.ballImg = new RotateImageForCanvas(
      "assets/penalty/Soccer_ball.svg.png",
      {
        width: 0.5,
        height: 0.35
      },
      0.04,
      0.08,
      3.6,
      this.canvasHelper.canvas);
  }

  private initGoalArea() {
    this.goalArea = new Rectangle(
      { width: this.canvasHelper.canvas.width * 0.18, height: this.downPlatform.startPoint.height },
      { width: this.canvasHelper.canvas.width * 0.18, height: this.canvasHelper.canvas.height * 0.6 },
      { width: this.canvasHelper.canvas.width * 0.82, height: this.canvasHelper.canvas.height * 0.6 },
      { width: this.canvasHelper.canvas.width * 0.82, height: this.downPlatform.startPoint.height },
      'white'
    );
  }

  private initShoterValues() {
    this.shooter = new ImageForCanvas(
      "assets/penalty/football-shoe.png",
      {
        width: this.canvasHelper.canvas.width / 2 + 0.5 * this.penaltyArc.radius,
        height: this.penaltyArea.pointB.height
      },
      60,
      60
    )
  }

  private initGoalkeeperValues() {
    this.hero = new Hero(
      "assets/penalty/goalkeepersGloove.png",
      {
        width: 0.5,
        height: 0.9
      },
      0.04,
      0.08,
      5,
      this.canvasHelper.canvas
    )
  }

  private initPenaltyArcValues() {
    this.penaltyArc = new Circle(
      { width: this.canvasHelper.canvas.width / 2, height: this.penaltyArea.pointB.height },
      this.canvasHelper.canvas.width * 0.1,
      'white'
    );
  }

  private initPenaltyPointValues() {
    this.penaltyPoint = new Circle(
      { width: this.canvasHelper.canvas.width / 2, height: this.canvasHelper.canvas.height * 0.35 },
      6,
      'white'
    );
  }

  private initPenaltyAreaValues() {
    this.penaltyArea = new Rectangle(
      { width: this.canvasHelper.canvas.width * 0.1, height: this.downPlatform.startPoint.height },
      { width: this.canvasHelper.canvas.width * 0.1, height: this.canvasHelper.canvas.height * 0.2 },
      { width: this.canvasHelper.canvas.width * 0.9, height: this.canvasHelper.canvas.height * 0.2 },
      { width: this.canvasHelper.canvas.width * 0.9, height: this.downPlatform.startPoint.height },
      'white'
    )
  }

  private initPlatformValues() {
    this.downPlatform = new FilledRectangle(
      { width: 0, height: 0.9 * this.canvasHelper.canvas.height },
      this.canvasHelper.canvas.width,
      0.1 * this.canvasHelper.canvas.height,
      'lightgrey'
    );
  }

  private initGoalBars() {
    this.goalBars = new Rectangle(
      { width: this.canvasHelper.canvas.width / 4, height: this.downPlatform.startPoint.height },
      { width: this.canvasHelper.canvas.width / 4, height: this.downPlatform.startPoint.height + 0.05 * this.canvasHelper.canvas.height },
      { width: 3 * this.canvasHelper.canvas.width / 4, height: this.downPlatform.startPoint.height + 0.05 * this.canvasHelper.canvas.height },
      { width: 3 * this.canvasHelper.canvas.width / 4, height: this.downPlatform.startPoint.height },
      'black'
    )
  }
}
