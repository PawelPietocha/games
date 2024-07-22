import { Component, OnDestroy } from '@angular/core';
import { GameComponent } from '../../shared/game/game.component';
import { DefaultGameTemplateComponent } from '../../shared/default-game-template/default-game-template.component';
import { DrawService } from '../../services/draw.service';
import { Point } from '../../models/shapes/point';
import { ControlKey } from '../../models/controlKey';
import { Circle } from '../../models/shapes/circle';
import { MathService } from '../../services/math.service';
import { BonusItem } from './models/bonusItem-arkanoid';
import { ImageForCanvas } from '../../models/shapes/imageForCanvas';
import { ArkanoidBlockCreateHelper } from './models/arkanoid-blocks-create-helper';
import { ScoreBoardComponent } from '../../shared/score-board/score-board.component';
import { CommonModule } from '@angular/common';
import { GameState } from '../../models/gameState';
import { KeyboardControlService } from '../../services/controlServices/keyboard-control.service';
import { Globals } from '../../shared/globals';
import { GameStateService } from '../../services/gameState.service';
import { ArkanoidBlock } from './models/arkanoid-block';
import { FilledRectangle } from '../../models/shapes/filledRectangle';

@Component({
  selector: 'app-arkanoid',
  standalone: true,
  imports: [DefaultGameTemplateComponent, ScoreBoardComponent, CommonModule],
  templateUrl: './arkanoid.component.html',
  styleUrl: './arkanoid.component.css'
})
export class ArkanoidComponent extends GameComponent implements OnDestroy {

  ball: Circle;
  ballInterval: string | number | NodeJS.Timeout;
  ballBounceAngle = 90;
  isBallfallDown = true;

  rectangleRows = 5;
  spaceBetweenRows = 2;
  spaceBetweenBlocksInRow = 2;
  minBlockInRow = 6;
  maxBlockInRow = 12;
  blocks: ArkanoidBlock[] = [];
  arkanoidBlockHeight = 7;

  surpriseBoxImage: ImageForCanvas;
  surpriseBoxVisible = false;

  defaultHeroWidth = 28;
  defaultHeroMovementSpeed = 5;
  defaultBallChange = 1;
  defaultBallRadius = 2;

  activeBoost: BonusItem = null;
  timeToEndActiveBoost = 10;
  activeBoostInterval: string | number | NodeJS.Timeout;
  supriseInterval: string | number | NodeJS.Timeout;

  constructor(
    private drawService: DrawService,
    private mathService: MathService,
    private gameKeyboardControlService: KeyboardControlService,
    private gameGameStateService: GameStateService) {
    super(gameKeyboardControlService, gameGameStateService);
  }

  override ngOnDestroy(): void {
    this.clearIntervals();
    clearInterval(this.ballInterval);
    clearInterval(this.activeBoostInterval);
    clearInterval(this.supriseInterval);
  }

  initValues(): void {
    this.setDefaultCanvasValues();
    this.initHeroValues();
    this.initBallValue();
    this.initBlocks();
    this.initSurpriseBox();
  }
  initControlList(): void {
    this.controlKeyBoardKeys = [ControlKey.arrowLeft, ControlKey.arrowRight];
  }
  drawAll(): void {
    this.drawHero();
    this.drawBall();
    this.drawBlocks();
    if (this.surpriseBoxVisible) {
      this.drawSupriseBox(this.surpriseBoxImage.point);
    }
  }
  actionAfterEndRun(): void {
    clearInterval(this.ballInterval);
    clearInterval(this.activeBoostInterval);
    this.setDefaultValues();
    this.ballBounceAngle = 90;
    this.activeBoost = null;
    this.surpriseBoxVisible = false;

  }
  actionAfterStartGame(): void {
    this.createBallInterval();
  }
  conditionToEndMainInterval(): boolean {
    return this.ball.point.height > this.canvasHelper.canvas.height || !this.blocks.some(block => block.visible);
  }

  private initHeroValues(): void {
    const heroStartPoint =
    {
      width: this.canvasHelper.canvas.width / 2 - 10,
      height: this.canvasHelper.canvas.height - 5
    };
    this.hero = new FilledRectangle(heroStartPoint, this.defaultHeroWidth, 10, 'green');
  }

  private drawHero(): void {
    (this.hero as FilledRectangle).startPoint = {
      width: this.hero.point.width - this.hero.width / 2,
      height: this.hero.point.height - this.hero.height / 2
    };
    this.drawService.drawFilledRectangle(this.canvasHelper.ctx, this.hero as FilledRectangle);
  }

  private initBallValue(): void {
    this.ball = new Circle(
      {
        width: MathService.getRandomInteger(this.canvasHelper.canvas.width * 2 / 5, this.canvasHelper.canvas.width * 3 / 5),
        height: this.canvasHelper.canvas.height / 2
      },
      2,
      'red');
  }

  private drawBall(): void {
    this.drawService.drawCircle(this.canvasHelper.ctx, this.ball);
  }

  private initBlocks(): void {
    this.blocks = [];
    const creator: ArkanoidBlockCreateHelper = {
      currentHeight: 0,
      countOfBlocksInFloor: 0,
      blocksWidth: 0,
      currentWidth: 0,
      blockHeight: this.arkanoidBlockHeight
    };


    for (let i = 0; i < this.rectangleRows; i++) {
      this.prepareBlocksRow(creator)
      for (let j = 0; j < creator.countOfBlocksInFloor; j++) {
        this.blocks.push(this.generateArkanoidBlock(creator));
        this.changeBlocksCurrentChangeForNextBlockInRow(creator);
      }
      this.changeBlocksCurrentHeightForNextRow(creator);
    }
  }

  private selectBonusItem(chance: number): BonusItem {
    const countOfBonusItems = Object.keys(BonusItem).length / 2;
    const lastIndexOfBonusItems = countOfBonusItems - 1;
    if (Math.random() <= chance) {
      return MathService.getRandomInteger(0, lastIndexOfBonusItems);
    }
    return null;
  }

  private changeBlocksCurrentChangeForNextBlockInRow(creator: ArkanoidBlockCreateHelper) {
    creator.currentWidth += creator.blocksWidth + (2 * creator.countOfBlocksInFloor) / (creator.countOfBlocksInFloor - 1);
  }

  private changeBlocksCurrentHeightForNextRow(creator: ArkanoidBlockCreateHelper) {
    creator.currentHeight += creator.blockHeight + this.spaceBetweenRows;
  }

  private prepareBlocksRow(creator: ArkanoidBlockCreateHelper) {
    creator.countOfBlocksInFloor = MathService.getRandomInteger(this.minBlockInRow, this.maxBlockInRow);
    creator.blocksWidth = this.canvasHelper.canvas.width / creator.countOfBlocksInFloor - this.spaceBetweenBlocksInRow;
    creator.currentWidth = 0;

  }

  private generateArkanoidBlock(creator: ArkanoidBlockCreateHelper): ArkanoidBlock {
    const rectangleStartPoint = {
      width: creator.currentWidth,
      height: creator.currentHeight
    };
    const rectangle = new FilledRectangle(rectangleStartPoint, creator.blocksWidth, creator.blockHeight, this.drawService.getRandomColor());
    const bonusItem = this.selectBonusItem(0.5);
    return { rectangle: rectangle, visible: true, bonusItem: bonusItem };
  }

  private drawBlocks(): void {
    this.blocks.forEach(block => {
      if (block.visible) {
        this.drawService.drawFilledRectangle(this.canvasHelper.ctx, block.rectangle);
      }
    }
    )
  }

  private createBallInterval(): void {
    this.ballInterval = setInterval(() => {
      if(Globals.gameState === GameState.paused) {
        return;
      }
      // Hero bounce ball
      if (this.mathService.isCircleAndRectangleToClose(this.ball, this.hero as FilledRectangle)) {
        this.isBallfallDown = false;
        // calculate angle
        this.ballBounceAngle = 90 - ((this.ball.point.width - this.hero.point.width) * 70 / (this.hero.width / 2));
      }
      // Ball bounce from top border
      if (this.ball.point.height <= 0) {
        this.isBallfallDown = true;
      }
      //Ball bounce from left or right border
      if (this.ball.point.width <= 0 || this.ball.point.width >= this.canvasHelper.canvas.width) {
        this.ballBounceAngle = 180 - this.ballBounceAngle;
      }

      //Move when ball falling down
      if (this.isBallfallDown) {
        this.ball.point.height += this.defaultBallChange;
        this.ball.point.width += this.defaultBallChange / Math.tan(this.ballBounceAngle * Math.PI / 180);
      }
      //Move when ball rises

      if (!this.isBallfallDown) {
        this.ball.point.height -= this.defaultBallChange;
        this.ball.point.width += this.defaultBallChange / Math.tan(this.ballBounceAngle * Math.PI / 180);
      }
      //Ball hit some rectangle
      if (this.isCollision()) {
        this.actionAfterCollision();
      }
    }, 10)
  }

  private isCollision(): boolean {
    return this.blocks
      .some(block => this.mathService.isCircleAndRectangleToClose(this.ball, block.rectangle) && block.visible);

  }

  private actionAfterCollision(): void {
    const block = this.blocks
      .find(block => this.mathService.isCircleAndRectangleToClose(this.ball, block.rectangle) && block.visible);

    block.visible = false;
    if (this.isCollisionFromTopOrDownBorder(block)) {
      this.isBallfallDown = !this.isBallfallDown;
    }
    // Collision from right or left border
    else {
      this.ballBounceAngle = 180 - this.ballBounceAngle;
    }
    if (block.bonusItem !== null) {
      //some surpriseBox is falling down
      if (this.surpriseBoxVisible || this.activeBoost) {
        return;
      }

      this.surpriseBoxVisible = true;
      this.surpriseBoxImage.point = block.rectangle.point;
      // surprise box falling down
      this.supriseInterval = setInterval(() => {
        if(Globals.gameState === GameState.paused) {
          return;
        }
        this.surpriseBoxImage.point.height += 0.25;
        if (this.didSurpriseBoxReachHeroHeightLevel()) {
          if (this.didHeroCatchSurpriseBox()) {
            this.bonusItemEffects(block);
          }
          clearInterval(this.supriseInterval);
          this.surpriseBoxVisible = false;
        }
      })
    }
  }

  private drawSupriseBox(point: Point): void {
    this.surpriseBoxImage.point = point;
    this.drawService
      .drawImage(this.canvasHelper.ctx, this.surpriseBoxImage);
  }

  private isCollisionFromTopOrDownBorder(block: ArkanoidBlock): boolean {
    return Math.abs(block.rectangle.point.height - this.ball.point.height) - this.ball.radius === block.rectangle.height / 2
  }

  private didSurpriseBoxReachHeroHeightLevel(): boolean {
    return this.surpriseBoxImage.point.height + this.surpriseBoxImage.height / 2 >= this.hero.point.height;
  }

  private didHeroCatchSurpriseBox(): boolean {
    return this.mathService.isImageAndRectangleToClose(this.surpriseBoxImage, this.hero as FilledRectangle);
  }

  private setActiveBoostInterval(bonusItem: BonusItem) {
    this.activeBoost = bonusItem;
    this.activeBoostInterval = setInterval(() => {
      if(Globals.gameState === GameState.paused) {
        return;
      }
      this.timeToEndActiveBoost -= 0.1
      if (this.timeToEndActiveBoost <= 0) {
        clearInterval(this.activeBoostInterval);
        this.setDefaultValues();
        this.activeBoost = null;
        this.timeToEndActiveBoost = 10;
        this.ball.point.height = Math.floor(this.ball.point.height);
      }
    }, 100)
  }

  private bonusItemEffects(block: ArkanoidBlock) {
    this.setActiveBoostInterval(block.bonusItem);

    switch (block.bonusItem) {
      case BonusItem.widthUp:
        this.hero.width = this.defaultHeroWidth * 2;
        break;
      case BonusItem.widthDown:
        this.hero.width = this.defaultHeroWidth / 1.5;
        break;
      case BonusItem.heroSpeedUp:
        this.heroMovementSpeed = this.defaultHeroMovementSpeed * 1.4;
        break;
      case BonusItem.heroSpeedDown:
        this.heroMovementSpeed = this.defaultHeroMovementSpeed * 0.8;
        break;
      case BonusItem.ballSpeedDown:
        this.defaultBallChange = 0.5;
        break;
      case BonusItem.radiusUp:
        this.ball.radius = this.defaultBallRadius * 4;
        break;
      case BonusItem.radiusDown:
        this.ball.radius = this.defaultBallRadius / 2;
    }
  }

  private initSurpriseBox(): void {
    this.surpriseBoxImage = new ImageForCanvas('../../../assets/arkanoid/question-mark.webp', { width: 0, height: 0 }, 10, 10);
  }

  private setDefaultValues(): void {
    this.hero.width = this.defaultHeroWidth;
    this.defaultBallChange = 1;
    this.heroMovementSpeed = this.defaultHeroMovementSpeed;
    this.ball.radius = this.defaultBallRadius;
  }

  getBonusItemNameToDisplay(bonusItem: BonusItem): string {
    switch (bonusItem) {
      case BonusItem.widthUp:
        return 'Hero width increased'
      case BonusItem.widthDown:
        return "Hero width reduced"
      case BonusItem.heroSpeedUp:
        return "Hero movement increased"
      case BonusItem.heroSpeedDown:
        return "Hero movement reduced"
      case BonusItem.ballSpeedDown:
        return "Ball speed reduced"
      case BonusItem.radiusUp:
        return "Ball radius increased"
      case BonusItem.radiusDown:
        return "Ball radius reduced"
    }
  }

  setDefaultCanvasValues() {
    this.canvasHelper.canvas.width = 300;
    this.canvasHelper.canvas.height = 150;
  }
}
