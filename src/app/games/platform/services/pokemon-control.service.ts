import { Injectable } from "@angular/core";
import { KeyboardControlService } from "../../../services/controlServices/keyboard-control.service";
import { MathService } from "../../../services/math.service";
import { ViewportService } from "./viewport.service";
import { PokemonDataService } from "./pokemon-data.service";
import { CanvasHelper } from "../../../models/helpers/canvas-helper";
import { PokemonWeapon } from "../models/pokemon-weapon";
import { PokemonHero } from "../models/pokemon-hero";
import { FilledRectangle } from "../../../models/shapes/filledRectangle";

@Injectable({
    providedIn: 'root',
})
export class PokemonControlService {
    private canvasHelper: CanvasHelper;
    private weapon: PokemonWeapon;
    private hero: PokemonHero;
    private platforms: FilledRectangle[];


    constructor(
        private controlService: KeyboardControlService,
        private mathService: MathService,
        private viewportService: ViewportService,
        private dataService: PokemonDataService) { }

    prepareService() {
        this.canvasHelper = this.dataService.canvasHelper;
        this.weapon = this.dataService.weapon;
        this.hero = this.dataService.hero;
        this.platforms = this.dataService.platforms;

        this.setKeyboardControlServiceSettings();
    }

    private arrowRightIsPossible(): boolean {
        this.weapon.changeBulletDirection(true);

        this.hero.changeHeroLookDirection(false);

        const heroCollissionWithPlatform = this.platforms.some(platform =>
            this.mathService.isImageAndRectangleTangleFromLeftRectangleSide(this.hero, platform)
        )
        if (!heroCollissionWithPlatform && this.viewportService.isImageOnCenterOfViewPort(this.hero)) {
            this.viewportService.moveViewPortToRight(this.hero.movementSpeed);
            this.canvasHelper.canvasWidthShift += this.hero.movementSpeed;
        }
        return !heroCollissionWithPlatform;
    }

    private arrowLeftIsPossible(): boolean {
        this.weapon.changeBulletDirection(false);

        this.hero.changeHeroLookDirection(true);

        const isHeroCollisionWithPlatform = this.platforms.some(platform =>
            this.mathService.isImageAndRectangleTangleFromRightRectangleSide(this.hero, platform)
        )

        return this.viewportService.isHeroOnViewPort(this.hero) && !isHeroCollisionWithPlatform;
    }

    private setKeyboardControlServiceSettings(): void {
        this.controlService.setArrowLeftisPossible(this.arrowLeftIsPossible.bind(this));
        this.controlService.setArrowRightisPossible(this.arrowRightIsPossible.bind(this));
    }

}