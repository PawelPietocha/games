import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Circle } from '../../models/circle';
import { GameState } from '../../models/gameState';
import { ImageForCanvas } from '../../models/imageForCanvas';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../slider/slider.component';
import { ControlKey } from '../../models/controlKey';
import { FilledRectangle } from '../../models/filledRectangle';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [SliderComponent, CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export abstract class GameComponent implements OnInit, OnDestroy {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  readonly dialog = inject(MatDialog);

  mainInterval: string | number | NodeJS.Timeout;
  controlInterval: string | number | NodeJS.Timeout;
  jumpInterval: string | number | NodeJS.Timeout;
  fallDownInterval: string | number | NodeJS.Timeout;

  gameState: GameState = GameState.new;
  GameState = GameState;

  hero: Circle | ImageForCanvas | FilledRectangle;
  heroMovementSpeed = 5;

  controlKeyBoardKeys: ControlKey[];
  controlKeysState: { controlKey: ControlKey, isClicked: boolean }[] = [];

  succesfullyAtempts = 0;
  failedAtempts = 0;

  //Properties for Jump Components
  isJumping = false;
  isFallingDown = false;
  maxJumpHeight = 0.32;

  controlIntervalTime = 30;

  canvasWidthShift = 0;

  level = 1;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.initControlList();
    this.initControlKeysWithState();
    this.createCtx();
    this.canvas.width = 1200;
    this.canvas.height = 600;
    this.addEventListeners();
  }

  ngOnDestroy(): void {
    this.clearIntervals();
  }

  pausedGame() {
    if (this.gameState === GameState.running) {
      this.gameState = GameState.paused;
      this.canvas.focus();
      return;
    }
    if (this.gameState === GameState.paused) {
      this.gameState = GameState.running;
      this.canvas.focus();
      return;
    }
  }

  leavedGame() {
    setTimeout(() => {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '250px'
      });
      dialogRef.afterClosed().subscribe((value: boolean) => {
        if (value) {
          this.router.navigate(['']);
        }
      })
    });
  }

  arrowUpIsPossible(): boolean {
    return this.hero.point.height - this.hero.height / 2 > 0;
  }

  arrowDownIsPossible(): boolean {
    return this.hero.point.height + this.hero.height / 2 < this.canvas.height;
  }

  arrowRightIsPossible(): boolean {
    return this.hero.point.width + this.hero.width / 2 < this.canvas.width
  }

  arrowLeftIsPossible(): boolean {
    return this.hero.point.width - this.hero.width / 2 > 0;
  }

  endRun(): void {
    clearInterval(this.mainInterval);
    clearInterval(this.controlInterval);
    this.gameState = this.GameState.finished;
  }

  reRun() {
    if (this.gameState === GameState.finished)
      this.canvas.focus();
    this.startGame();
  }

  exitToSettings() {
    this.succesfullyAtempts = 0;
    this.failedAtempts = 0;
    this.gameState = GameState.new;
    this.actionAfterExitToSettings();
  }

  actionAfterExitToSettings(): void {
  }

  startGame(): void {
    this.initValues();
    this.createControlInterval();
    this.createMainInterval();
    this.gameState = this.GameState.running;
    this.canvas.focus();
    this.actionAfterStartGame();
  }

  clearIntervals(): void {
    clearInterval(this.mainInterval);
    clearInterval(this.controlInterval);
    clearInterval(this.jumpInterval);
    clearInterval(this.fallDownInterval);
  }

  private initControlKeysWithState(): void {
    this.controlKeysState = this.controlKeyBoardKeys.map(key => { return { controlKey: key, isClicked: false } });
  }

  private createCtx(): void {
    this.canvas = <HTMLCanvasElement>document.getElementById('game')!;
    this.ctx = this.canvas.getContext('2d')!;
  }

  private createMainInterval(): void {
    this.mainInterval = setInterval(() => {
      if (this.gameState === GameState.paused) {
        return;
      }
      if (this.conditionToEndMainInterval()) {
        this.endRun();
        this.actionAfterEndRun();
      }
      this.ctx?.clearRect(0, 0, this.canvas.width + this.canvasWidthShift, this.canvas.height);
      this.drawAll();
    }, 10);
  }

  private addEventListeners(): void {
    this.canvas.addEventListener('keydown', this.controlKeyDown.bind(this), false);
    this.canvas.addEventListener('keyup', this.controlKeyUp.bind(this), false);
  }

  private createControlInterval(): void {
    this.controlInterval = setInterval(() => {
      if (this.gameState === GameState.paused) {
        return;
      }
      if (this.isKeyClicked(ControlKey.arrowUp)) {
        if (this.arrowUpIsPossible()) {
          this.hero.point.height -= this.heroMovementSpeed;
        }
      }

      if (this.isKeyClicked(ControlKey.arrowDown)) {
        if (this.arrowDownIsPossible()) {
          this.hero.point.height += this.heroMovementSpeed;
        }
      }

      if (this.isKeyClicked(ControlKey.arrowRight)) {
        if (this.arrowRightIsPossible()) {
          this.hero.point.width += this.heroMovementSpeed;
        }
      }

      if (this.isKeyClicked(ControlKey.arrowLeft)) {
        if (this.arrowLeftIsPossible()) {
          this.hero.point.width -= this.heroMovementSpeed;
        }
      }
    }, this.controlIntervalTime)

  }

  private isKeyClicked(controlKey: ControlKey): boolean {
    const key = this.controlKeysState.find(key => key.controlKey === controlKey);
    if (key) {
      return key.isClicked;
    }
    else {
      return false;
    }
  }

  private controlKeyUp(event: KeyboardEvent): void {
    switch (event.key) {

      case ControlKey.arrowUp: {
        const arrowUp = this.controlKeysState.find(keyState => keyState.controlKey === ControlKey.arrowUp);
        if (arrowUp) {
          arrowUp.isClicked = false;
        }
        break;
      }

      case ControlKey.arrowDown: {
        const arrowDown = this.controlKeysState.find(keyState => keyState.controlKey === ControlKey.arrowDown);
        if (arrowDown) {
          arrowDown.isClicked = false;
        }
        break;
      }

      case ControlKey.arrowRight: {
        const arrowRight = this.controlKeysState.find(keyState => keyState.controlKey === ControlKey.arrowRight);
        if (arrowRight) {
          arrowRight.isClicked = false;
        }
        break;
      }

      case ControlKey.arrowLeft: {
        const arrowLeft = this.controlKeysState.find(keyState => keyState.controlKey === ControlKey.arrowLeft);
        if (arrowLeft) {
          arrowLeft.isClicked = false;
        }
        break;
      }

      case ControlKey.space: {
        const space = this.controlKeysState.find(keyState => keyState.controlKey === ControlKey.space);
        if (space) {
          space.isClicked = false;
        }
        break;
      }

      case ControlKey.control: {
        const control = this.controlKeysState.find(keyState => keyState.controlKey === ControlKey.control);
        if (control) {
          control.isClicked = false;

        }
        break;
      }
    }
  }

  private controlKeyDown(event: KeyboardEvent): void {
    if (event.key === 'p') {
      this.pausedGame();
      return;
    }
    if (event.key === 'Escape') {
      this.leavedGame();
      return;
    }
    if (this.gameState === GameState.paused) {
      return;
    }
    switch (event.key) {
      case ControlKey.arrowUp: {
        const arrowUp = this.controlKeysState.find(keyState => keyState.controlKey === ControlKey.arrowUp);
        if (arrowUp) {
          arrowUp.isClicked = true;
        }
        break;
      }

      case ControlKey.arrowDown: {
        const arrowDown = this.controlKeysState.find(keyState => keyState.controlKey === ControlKey.arrowDown);
        if (arrowDown) {
          arrowDown.isClicked = true;
        }
        break;
      }

      case ControlKey.arrowRight: {
        const arrowRight = this.controlKeysState.find(keyState => keyState.controlKey === ControlKey.arrowRight);
        if (arrowRight) {
          arrowRight.isClicked = true;
        }
        break;
      }

      case ControlKey.arrowLeft: {
        const arrowLeft = this.controlKeysState.find(keyState => keyState.controlKey === ControlKey.arrowLeft);
        if (arrowLeft) {
          arrowLeft.isClicked = true;
        }
        break;
      }

      case ControlKey.space: {
        const space = this.controlKeysState.find(keyState => keyState.controlKey === ControlKey.space);
        if (space) {
          space.isClicked = true;
          this.setJumpInterval();
        }
        break;
      }

      case ControlKey.control: {
        const control = this.controlKeysState.find(keyState => keyState.controlKey === ControlKey.control);
        if (control) {
          control.isClicked = true;
          this.setControlKeyInterval();
        }
        break;
      }
    }
  }

  setControlKeyInterval(): void { }

  private setJumpInterval() {
    if (this.isJumping || this.isFallingDown) {
      return
    }
    this.isJumping = true;
    let count = 0;
    this.jumpInterval = setInterval(() => {
      if (this.gameState === GameState.paused) {
        return;
      }
      if (count === Math.floor(this.maxJumpHeight * this.canvas.height) || this.shouldEndJumpInterval()) {
        clearInterval(this.jumpInterval);
        this.setFallDownInterval();
        return;
      }
      this.hero.point.height -= this.heroMovementSpeed;
      count++;
    })
  }

  private setFallDownInterval() {
    this.fallDownInterval = setInterval(() => {
      if (this.gameState === GameState.paused) {
        return;
      }
      if (this.shouldEndFallDownInterval()) {
        clearInterval(this.fallDownInterval);
        this.isJumping = false;
        return;
      }
      this.hero.point.height += this.heroMovementSpeed;
    })
  }
  //method to override with Jump Components
  shouldEndFallDownInterval(): boolean {
    return false;
  }
  //method to override with Jump Componennts
  shouldEndJumpInterval(): boolean {
    return false;
  }

  abstract initValues(): void;
  abstract initControlList(): void;
  abstract drawAll(): void;
  abstract actionAfterEndRun(): void;
  abstract actionAfterStartGame(): void;
  abstract conditionToEndMainInterval(): boolean;
}
