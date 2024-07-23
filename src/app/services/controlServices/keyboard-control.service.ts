import { Injectable } from "@angular/core";
import { ControlKey } from "../../models/controlKey";
import { CanvasHelper } from "../../models/helpers/canvas-helper";
import { GameStateService } from "../gameState.service";
import { Globals } from "../../shared/globals";
import { GameState } from "../../models/gameState";
import { Interval } from "../../shared/intervals/interval";
import { JumpControlService } from "./jump-control.service";
import { MoveableShape } from "../../models/shapes/moveable-shape";
import { ShotControlService } from "./shot-control.service";

@Injectable({
  providedIn: 'root',
})

export class KeyboardControlService {

  constructor(
    private gameStateService: GameStateService,
    private jumpControlService: JumpControlService,
    private shotControlService: ShotControlService
  ) { }
  private controlKeysState: { controlKey: ControlKey, isClicked: boolean }[] = [];

  set controlKeyBoardKeys(keys: ControlKey[]) {
    this.controlKeysState = keys.map(key => { return { controlKey: key, isClicked: false } });
  }
  private canvasHelper: CanvasHelper;
  setCanvasHelper(canvasHelper: CanvasHelper) {
    this.canvasHelper = canvasHelper;
  }
  private hero: MoveableShape;
  setHeroPosition(hero: MoveableShape) {
    this.hero = hero;
  }
  private heroMovementSpeed: number;
  setHeroMovementSpeed(speed: number) {
    this.heroMovementSpeed = speed;
  }
  private arrowUpIsPossible(): boolean {
    return this.hero.point.height - this.hero.height / 2 > 0;
  }
  setArrowUpisPossible(fn: () => boolean) {
    this.arrowUpIsPossible = fn;
  }
  private arrowDownIsPossible(): boolean {
    return this.hero.point.height + this.hero.height / 2 < this.canvasHelper.getCanvasHeight();
  }
  setArrowDownisPossible(fn: () => boolean) {
    this.arrowDownIsPossible = fn;
  }
  private arrowRightIsPossible(): boolean {
    return this.hero.point.width + this.hero.width / 2 < this.canvasHelper.getCanvasWidth()
  }
  setArrowRightisPossible(fn: () => boolean) {
    this.arrowRightIsPossible = fn;
  }
  private arrowLeftIsPossible(): boolean {
    return this.hero.point.width - this.hero.width / 2 > 0
  }
  setArrowLeftisPossible(fn: () => boolean) {
    this.arrowLeftIsPossible = fn;
  }

  addEventListeners(): void {
    this.canvasHelper.canvas.addEventListener('keydown', this.controlKeyDown.bind(this), false);
    this.canvasHelper.canvas.addEventListener('keyup', this.controlKeyUp.bind(this), false);
  }

  createControlInterval(): Interval {
    return new Interval(
      this.controlIntervalAction.bind(this))
  }

  private isClickedServedKey(event: KeyboardEvent): boolean {
    return this.controlKeysState.find(keyState => keyState.controlKey === event.key) ? true : false;
  }

  private onClickedServedKey(event: KeyboardEvent, isKeyDown: boolean): void {
    const found = this.controlKeysState.find(keyState => keyState.controlKey === event.key);
    if (found) {
      found.isClicked = isKeyDown;
      if (event.key === ' ') {
        this.jumpControlService.setJumpInterval(this.hero, this.heroMovementSpeed, this.canvasHelper);
      }
      if (event.key === 'Control') {
        this.shotControlService.setShotInterval();
      }
    }
  }

  private controlKeyDown(event: KeyboardEvent): void {
    if (event.key === 'p') {
      this.gameStateService.pauseGame();
      return;
    }
    if (event.key === 'Escape') {
      this.gameStateService.leavedGame();
      return;
    }
    if (Globals.gameState === GameState.paused) {
      return;
    }

    if (!this.isClickedServedKey(event)) {
      return;
    }
    this.onClickedServedKey(event, true);
  }

  private controlKeyUp(event: KeyboardEvent): void {
    this.onClickedServedKey(event, false);
  }

  private controlIntervalAction() {
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
}