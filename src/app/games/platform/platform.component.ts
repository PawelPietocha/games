import { Component, OnDestroy } from '@angular/core';
import { GameComponent } from '../../shared/game/game.component';
import { DefaultGameTemplateComponent } from '../../shared/default-game-template/default-game-template.component';
import { MathService } from '../../services/math.service';
import { ScoreBoardComponent } from '../../shared/score-board/score-board.component';
import { InitPlatformService } from './services/init-platform.service';
import { DrawPlaftormService } from './services/draw-platform.service';
import { ImageForCanvas } from '../../models/shapes/imageForCanvas';
import { CommonModule } from '@angular/common';
import { PokemonForms } from './models/pokemon-forms';
import { PokemonToChoose } from './models/pokemon-to-choose';
import { PokemonToChooseTemplateComponent } from './components/pokemon-to-choose-template/pokemon-to-choose-template.component';
import { PokemonPanelComponent } from './components/pokemon-panel/pokemon-panel.component';
import { GameHelperService } from './services/game-helper.service';
import { PokemonHero } from './models/pokemon-hero';
import { PokemonCounter } from './models/pokemon-counter';
import { KeyboardControlService } from '../../services/controlServices/keyboard-control.service';
import { GameStateService } from '../../services/gameState.service';
import { PokemonWeapon } from './models/pokemon-weapon';
import { PokemonDataService } from './services/pokemon-data.service';
import { PokemonJumpPrepareService } from './services/prepare-services/pokemon-jump-prepare.service';
import { PokemonShotPrepareService } from './services/prepare-services/pokemon-shot-prepare.service';
import { PokemonOponentService } from './services/pokemon-oponents.service';
import { ViewportService } from './services/viewport.service';
import { PokemonControlService } from './services/pokemon-control.service';
import { Subscription } from 'rxjs';
import { EndGame } from './models/end-game';
import { PokemonCatchService } from '../../services/pokemon-catch.service';
import { Interval } from '../../shared/intervals/interval';

@Component({
  selector: 'app-platform',
  standalone: true,
  imports: [
    DefaultGameTemplateComponent,
    ScoreBoardComponent,
    CommonModule,
    PokemonToChooseTemplateComponent,
    PokemonPanelComponent
  ],
  templateUrl: './platform.component.html',
  styleUrl: './platform.component.css'
})
export class PlatformComponent extends GameComponent implements OnDestroy {

  pokemonHero: PokemonHero;
  weapon: PokemonWeapon;
  finishImage: ImageForCanvas;
  laser: ImageForCanvas;

  chosenPokemonName = PokemonToChoose.notChoosed;
  pokemonToChooseArray: PokemonToChoose[];

  timeInterval: Interval;
  gameInterval: string | number | NodeJS.Timeout;

  pokemonCounter: PokemonCounter = new PokemonCounter();
  pokemonToChoose = PokemonToChoose;

  endGame: EndGame;
  time: number;

  isJumping = false;
  maxJumpHeight = 0.32;
  isFallingDown: boolean;

  endGameSubscription: Subscription;


  constructor(
    private mathService: MathService,
    private initPlatformService: InitPlatformService,
    private drawPlatformService: DrawPlaftormService,
    private gameHelperService: GameHelperService,
    private pokemonKeyboardControlService: KeyboardControlService,
    private pokemonGameStateService: GameStateService,
    private pokemonJumpPrepareService: PokemonJumpPrepareService,
    private pokemonShotPrepareService: PokemonShotPrepareService,
    private pokemonDataService: PokemonDataService,
    private viewportService: ViewportService,
    private pokemonControlService: PokemonControlService,
    private pokemonOponentService: PokemonOponentService,
    private pokemonCatchService: PokemonCatchService) {
    super(pokemonKeyboardControlService, pokemonGameStateService);
    this.pokemonToChooseArray = this.initPlatformService.getPokemonToChoose();
    this.endGameSubscription = this.gameHelperService.endGame$.subscribe(endGame => {
      this.endGame = endGame
    })
  }

  override ngOnDestroy(): void {
    this.clearIntervals();
    clearInterval(this.gameInterval);
    this.timeInterval.clearInterval();
    this.pokemonJumpPrepareService.clear();
    this.pokemonCatchService.clear();
    this.endGameSubscription.unsubscribe();
  }

  initValues(): void {
    if (this.level !== 1) {
      this.resetToDefaultValues(this.level);
      return;
    }
    this.pokemonDataService.initLevel(this.level);
    this.pokemonDataService.initData(this.canvasHelper, this.chosenPokemonName);
    this.hero = this.pokemonDataService.hero;
    this.pokemonHero = this.hero as PokemonHero;
    this.weapon = this.pokemonDataService.weapon;
    this.viewportService.prepareService(this.canvasHelper);
    this.drawPlatformService.prepareService();
    this.mathService.heroMovementSpeed = this.initPlatformService.heroMovementSpeed;
    this.resetToDefaultValues(this.level);
    this.pokemonJumpPrepareService.initJumpService();
    this.pokemonShotPrepareService.initShotService();
    this.pokemonOponentService.initValues();
    this.pokemonControlService.prepareService();
    this.pokemonCatchService.initService(this.pokemonCounter);
  }
  initControlList(): void {
    this.controlKeyBoardKeys = this.initPlatformService.controlKeyBoardKey;
  }
  drawAll(): void {
    this.drawPlatformService.drawAll();
  }
  actionAfterEndRun(): void {
    this.changeLevel();
    clearInterval(this.gameInterval);
    this.timeInterval.clearInterval();
  }
  actionAfterStartGame(): void {
    this.viewportService.resetViewportToDefaultValues();
    this.initLevel(this.level);
    this.createTimeInterval();
  }

  override actionAfterExitToSettings() {
  }

  conditionToEndMainInterval(): boolean {
    const heroFellDown = this.hero.point.height >= 0.96 * this.canvasHelper.canvas.height;
    return heroFellDown || this.endGame.isFinished || this.time === 0
  }

  onChoosePokemon(name: PokemonToChoose) {
    this.chosenPokemonName = name;
  }

  private laserFunction() {
    if (!this.isHeroReachedFinish()) {
      return;
    }

    if (this.pokemonHero.opacity <= 0) {
      this.finishImage.image.src = "assets/Pokemons/other-images/closed-pokeball.png";
      setTimeout(() => {
        //   this.wonGame = true;
      }, 1000);
      return;
    }

    if (this.laser.point.width - this.laser.width / 2 < this.hero.point.width) {
      this.pokemonHero.opacity -= 0.01;
      return;
    }

    if (this.isJumping === false && this.isFallingDown === false) {
      this.laser.point.width -= 1;
      this.laser.width += 2;
    }
  }

  private createTimeInterval() {
    this.timeInterval = new Interval(
      () => this.time -= 1,
      () => this.time === 0,
      () => this.gameHelperService.endGame$.next({isFinished: true, won: false})
    );
    this.timeInterval.timeInMiliseconds = 1000;
  }

  private restoreCanvas(): void {
    this.canvasHelper.ctx.translate(this.canvasHelper.canvasWidthShift, 0);
    this.canvasHelper.canvasWidthShift = 0;
  }

  private resetToDefaultValues(level: number) {
    if (level === 1) {
      this.pokemonCounter.catchedPokeballsCount = 0;
      this.pokemonHero.currentPokemonForm = PokemonForms.basicForm;
      this.pokemonCounter.score = 0;
    }
    this.weapon.inUse = false;
    this.pokemonHero.immune = false;
    this.hero.point = { width: 0.0565 * this.canvasHelper.canvas.width, height: 0.7 * this.canvasHelper.canvas.height };
    this.restoreCanvas();
    this.time = this.initPlatformService.initTime();
    this.pokemonHero.opacity = 1;
    if (this.finishImage) {
      this.finishImage.image.src = "assets/Pokemons/other-images/opened-pokeball.png";
    }
  }

  private initLevel(level: number) {
    this.initPlatformService.initLevel(level);
    this.time = this.initPlatformService.initTime();
  }

  private isHeroReachedFinish() {
    return this.pokemonHero.isHeroReachedFinish(this.hero.point.width, this.finishImage.point.width);
  }

  private changeLevel() {
    this.level = this.endGame.won ? 2 : 1;
  }
}