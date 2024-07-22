import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameState } from '../../models/gameState';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../slider/slider.component';
import { ControlKey } from '../../models/controlKey';
import { CanvasHelper } from '../../models/helpers/canvas-helper';
import { Interval } from '../intervals/interval';
import { KeyboardControlService } from '../../services/controlServices/keyboard-control.service';
import { Globals } from '../globals';
import { GameStateService } from '../../services/gameState.service';
import { MoveableShape } from '../../models/shapes/moveable-shape';
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [SliderComponent, CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export abstract class GameComponent implements OnInit, OnDestroy {
  canvasHelper: CanvasHelper;
  intervals: Interval[] = [];
  GameState = GameState;
  Globals = Globals;
  hero: MoveableShape;
  heroMovementSpeed = 5;
  controlKeyBoardKeys: ControlKey[];
  succesfullyAtempts = 0;
  failedAtempts = 0;

  level = 1;

  constructor(
    private keyboardControlService: KeyboardControlService,
    private gameStateService: GameStateService) {
  }

  ngOnInit(): void {
    this.createCanvas();
  }

  ngOnDestroy(): void {
    this.clearIntervals();
  }

  pausedGame() {
    this.gameStateService.pauseGame();
    this.canvasHelper.canvas.focus();
  }

  leavedGame() {
    this.gameStateService.leavedGame();
  }

  endRun(): void {
    this.intervals.forEach(interval => interval.clearInterval());
    this.changeGameState(GameState.finished)
  }

  reRun() {
    if (Globals.gameState === GameState.finished)
      this.canvasHelper.canvas.focus();
    this.startGame();
  }

  exitToSettings() {
    this.succesfullyAtempts = 0;
    this.failedAtempts = 0;
    this.changeGameState(GameState.new)
    this.actionAfterExitToSettings();
  }

  actionAfterExitToSettings(): void {
  }

  startGame(): void {
    this.initValues();
    this.createControlInterval();
    this.createMainInterval();
    this.changeGameState(GameState.running)
    this.canvasHelper.canvas.focus();
    this.actionAfterStartGame();
    this.keyboardControlService.setHeroPosition(this.hero);
    this.keyboardControlService.setHeroMovementSpeed(this.heroMovementSpeed);
    this.initControlList();
    this.keyboardControlService.setCanvasHelper(this.canvasHelper);
    this.keyboardControlService.controlKeyBoardKeys = this.controlKeyBoardKeys;
    this.keyboardControlService.addEventListeners();
  }

  clearIntervals(): void {
    this.intervals.forEach(interval => interval.clearInterval());
  }

  private createCanvas(): void {
    this.canvasHelper = new CanvasHelper(<HTMLCanvasElement>document.getElementById('game'), 1200, 600);
  }

  private mainIntervalAction(): void {
    this.canvasHelper.clearRect();
    this.drawAll();
  }

  private createMainInterval(): void {
    const mainInterval: Interval = new Interval(
      this.mainIntervalAction.bind(this),
      this.conditionToEndMainInterval.bind(this),
      this.actionAfterEndRun.bind(this)
    );
    this.intervals.push(mainInterval);
  }

  private createControlInterval(): void {
    const controlInterval = this.keyboardControlService.createControlInterval();
    controlInterval.timeInMiliseconds = 10;
    this.intervals.push(controlInterval);
  }

  private changeGameState(gameState: GameState) {
    Globals.gameState = gameState;
  }

  setControlKeyInterval(): void { }

  abstract initValues(): void;
  abstract initControlList(): void;
  abstract drawAll(): void;
  abstract actionAfterEndRun(): void;
  abstract actionAfterStartGame(): void;
  abstract conditionToEndMainInterval(): boolean;
}
