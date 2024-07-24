import { Component, OnDestroy } from '@angular/core';
import { GameComponent } from '../../shared/game/game.component';
import { DefaultGameTemplateComponent } from '../../shared/default-game-template/default-game-template.component';
import { MathService } from '../../services/math.service';
import { ScoreBoardComponent } from '../../shared/score-board/score-board.component';
import { InitPlatformService } from './services/init-platform.service';
import { PlatformOponent } from './models/platform-oponents';
import { DrawPlaftormService } from './services/draw-platform.service';
import { ImageForCanvas } from '../../models/shapes/imageForCanvas';
import { CommonModule } from '@angular/common';
import { PokemonForms } from './models/pokemon-forms';
import { ScoreCollector } from './models/score-collector.enum';
import { PokemonToChoose } from './models/pokemon-to-choose';
import { PokemonToChooseTemplateComponent } from './components/pokemon-to-choose-template/pokemon-to-choose-template.component';
import { PokemonPanelComponent } from './components/pokemon-panel/pokemon-panel.component';
import { GameHelperService } from './services/game-helper.service';
import { PlatformGradientValues } from './models/platform-gradient-values';
import { PokemonHero } from './models/pokemon-hero';
import { PokemonCounter } from './models/pokemon-counter';
import { GameState } from '../../models/gameState';
import { KeyboardControlService } from '../../services/controlServices/keyboard-control.service';
import { Globals } from '../../shared/globals';
import { GameStateService } from '../../services/gameState.service';
import { FilledRectangle } from '../../models/shapes/filledRectangle';
import { PokemonWeapon } from './models/pokemon-weapon';
import { PokemonDataService } from './services/pokemon-data.service';
import { PokemonJumpPrepareService } from './services/prepare-services/pokemon-jump-prepare.service';
import { PokemonShotPrepareService } from './services/prepare-services/pokemon-shot-prepare.service';
import { PokemonOponentService } from './services/pokemon-oponents.service';
import { ViewportService } from './services/viewport.service';
import { PokemonControlService } from './services/pokemon-control.service';

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

  grounds: FilledRectangle[];
  platforms: FilledRectangle[] = [];
  oponents: PlatformOponent[] = [];
  pokeballs: ImageForCanvas[] = [];
  coins: ImageForCanvas[] = [];
  weapon: PokemonWeapon;
  nonIntrusiveImages: ImageForCanvas[] = [];
  waters: FilledRectangle[] = [];
  finishImage: ImageForCanvas;
  laser: ImageForCanvas;
  platformGradientValues: PlatformGradientValues;

  chosenPokemonName = PokemonToChoose.notChoosed;
  pokemonToChooseArray: PokemonToChoose[];

  timeInterval: string | number | NodeJS.Timeout;
  gameInterval: string | number | NodeJS.Timeout;

  pokemonCounter: PokemonCounter = new PokemonCounter();

  pokemonForms = PokemonForms;
  pokemonToChoose = PokemonToChoose;

  loseGame = false;
  wonGame = false;
  time: number;

  isJumping = false;
  maxJumpHeight = 0.32;
  isFallingDown: boolean;

  constructor(
    private mathService: MathService,
    private initPlatformService: InitPlatformService,
    private drawPlatformService: DrawPlaftormService,
    private gameHelperService: GameHelperService,
    private gameKeyboardControlService: KeyboardControlService,
    private gameGameStateService: GameStateService,
    private pokemonJumpPrepareService: PokemonJumpPrepareService,
    private pokemonShotPrepareService: PokemonShotPrepareService,
    private pokemonDataService: PokemonDataService,
    private viewportService: ViewportService,
    private pokemonControlService: PokemonControlService,
    private pokemonOponentService: PokemonOponentService) {
    super(gameKeyboardControlService, gameGameStateService);
    this.pokemonToChooseArray = this.initPlatformService.getPokemonToChoose();
  }

  override ngOnDestroy(): void {
    this.clearIntervals();
    clearInterval(this.gameInterval);
    clearInterval(this.timeInterval);
    this.pokemonJumpPrepareService.clear();
  }

  initValues(): void {
    if (this.level !== 1) {
      this.resetToDefaultValues(this.level);
      return;
    }
    this.initPlatformService.createCanvas(this.canvasHelper.canvas);
    this.pokemonDataService.initLevel(this.level);
    this.pokemonDataService.initData(this.canvasHelper.canvas, this.chosenPokemonName);
    this.hero = this.pokemonDataService.hero;
    this.pokemonHero = this.hero as PokemonHero;
    this.weapon = this.initPlatformService.initWeaponValue(this.chosenPokemonName);
    this.viewportService.prepareService(this.canvasHelper.canvas, this.canvasHelper.ctx);
    this.drawPlatformService.prepareService(this.canvasHelper.ctx);
    this.heroMovementSpeed = this.initPlatformService.heroMovementSpeed;
    this.mathService.heroMovementSpeed = this.initPlatformService.heroMovementSpeed;
    this.resetToDefaultValues(this.level);
    this.pokemonJumpPrepareService.initJumpService(this.pokemonHero, this.heroMovementSpeed, this.maxJumpHeight);
    this.pokemonShotPrepareService.initShotService(this.pokemonHero, this.weapon, this.heroMovementSpeed);
    this.pokemonOponentService.initValues();
    this.pokemonControlService.prepareService(this.canvasHelper, this.heroMovementSpeed);
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
    clearInterval(this.timeInterval);
  }
  actionAfterStartGame(): void {
    this.viewportService.resetViewportToDefaultValues();
    this.initLevel(this.level);
    this.createGameInterval();
    this.createTimeInterval();
  }

  override actionAfterExitToSettings() {
  }

  conditionToEndMainInterval(): boolean {
    const heroFellDown = this.hero.point.height >= 0.96 * this.canvasHelper.canvas.height;
    return heroFellDown || this.loseGame || this.time === 0 || this.wonGame
  }

  onChoosePokemon(name: PokemonToChoose) {
    this.chosenPokemonName = name;
  }

  private createGameInterval() {
    this.gameInterval = setInterval(() => {
      if (Globals.gameState === GameState.paused) {
        return;
      }
      this.pokeballFunction();
      this.coinFunction();
      // this.laserFunction();
    })
  }

  private laserFunction() {
    if (!this.isHeroReachedFinish()) {
      return;
    }

    if (this.pokemonHero.opacity <= 0) {
      this.finishImage.image.src = "assets/Pokemons/other-images/closed-pokeball.png";
      setTimeout(() => {
        this.wonGame = true;
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

  private coinFunction() {
    const catchedCoin = this.coins
      .find(coin =>
        coin.visible &&
        this.mathService.isTwoImagesToClose(this.pokemonHero, coin))
    if (catchedCoin) {
      catchedCoin.visible = false;
      this.weapon.bulletCount += 1;
      this.pokemonCounter.score += this.gameHelperService.collectScore(ScoreCollector.catchedCoin);
    }
  }

  private pokeballFunction() {
    const catchedPokeball = this.pokeballs.find(pokeball =>
      this.mathService.isTwoImagesToClose(this.pokemonHero, pokeball) && pokeball.visible

    )
    if (catchedPokeball) {
      this.pokemonCounter.score += this.gameHelperService.collectScore(ScoreCollector.catchedPokeball);
      catchedPokeball.visible = false;
      this.pokemonCounter.catchedPokeballsCount += 1;
      if (this.pokemonCounter.catchedPokeballsCount === 3) {
        this.evolve();
      }
    }
  }

  private checkOponentCatchHeroWithEffects() {
    if (!this.pokemonHero.immune && this.oponents.some(oponent => oponent.visible && this.mathService.isTwoImagesToClose(oponent, this.hero as ImageForCanvas))) {
      if (this.pokemonHero.currentPokemonForm === PokemonForms.basicForm) {
        this.loseGame = true;
      }
      else {
        this.pokemonHero.immune = true;
        this.devolve();
        setTimeout(() => {
          this.pokemonHero.immune = false;
        }, 2000)
      }
    }
  }

  private createTimeInterval() {
    this.timeInterval = setInterval(() => {
      if (Globals.gameState === GameState.paused) {
        return;
      }
      if (this.time === 0) {
        clearInterval(this.timeInterval);
      }
      this.time -= 1;
    }, 1000)
  }

  private restoreCanvas(): void {
    this.canvasHelper.ctx.translate(this.canvasHelper.canvasWidthShift, 0);
    this.canvasHelper.canvasWidthShift = 0;
  }

  private evolve(): void {
    this.pokemonHero.evolve();
    this.pokemonCounter.catchedPokeballsCount = 0;
    if (this.pokemonHero.currentPokemonForm === PokemonForms.middleForm) {
      this.pokemonCounter.score += this.gameHelperService.collectScore(ScoreCollector.firstEvolve);
    }
    else {
      this.pokemonCounter.score += this.gameHelperService.collectScore(ScoreCollector.secondEvolve);
    }

  }

  private devolve(): void {
    this.pokemonHero.devolve();
  }

  private resetToDefaultValues(level: number) {
    if (level === 1) {
      this.pokemonCounter.catchedPokeballsCount = 0;
      this.pokemonHero.currentPokemonForm = PokemonForms.basicForm;
      this.pokemonCounter.score = 0;
    }
    this.weapon.inUse = false;
    this.loseGame = false;
    this.pokemonHero.immune = false;
    this.hero.point = { width: 0.0565 * this.canvasHelper.canvas.width, height: 0.7 * this.canvasHelper.canvas.height };
    this.restoreCanvas();
    this.time = this.initPlatformService.initTime();
    this.pokemonHero.opacity = 1;
    this.wonGame = false;
    if (this.finishImage) {
      this.finishImage.image.src = "assets/Pokemons/other-images/opened-pokeball.png";
    }
  }

  private initLevel(level: number) {
    this.initPlatformService.initLevel(level);
    this.time = this.initPlatformService.initTime();
  }

  private isHeroReachedFinish() {
    return this.gameHelperService.isHeroReachedFinish(this.hero.point.width, this.finishImage.point.width);
  }

  private changeLevel() {
    this.level = this.wonGame ? 2 : 1;
  }
}