import { Injectable } from "@angular/core";
import { KeyboardControlService } from "../../../services/controlServices/keyboard-control.service";
import { MathService } from "../../../services/math.service";
import { ViewportService } from "./viewport.service";
import { PokemonDataService } from "./pokemon-data.service";
import { CanvasHelper } from "../../../models/helpers/canvas-helper";

@Injectable({
    providedIn: 'root',
})
export class PokemonControlService {
    private canvasHelper: CanvasHelper;
    private heroMovementSpeed: number;

    constructor(
        private controlService: KeyboardControlService,
        private mathService: MathService,
        private viewportService: ViewportService,
        private dataService: PokemonDataService) { }

    prepareService(canvasHelper: CanvasHelper, heroMovementSpeed: number) {
        this.canvasHelper = canvasHelper;
        this.heroMovementSpeed = heroMovementSpeed;

        this.setKeyboardControlServiceSettings();
    }

    private arrowRightIsPossible(): boolean {
        this.dataService.weapon.changeBulletDirection(true);

        this.dataService.hero.changeHeroLookDirection(false);

        const heroCollissionWithPlatform = this.dataService.platforms.some(platform =>
            this.mathService.isImageAndRectangleTangleFromLeftRectangleSide(this.dataService.hero, platform)
        )
        if (!heroCollissionWithPlatform && this.viewportService.isImageOnCenterOfViewPort(this.dataService.hero)) {
            this.viewportService.moveViewPortToRight(this.heroMovementSpeed);
            this.canvasHelper.canvasWidthShift += this.heroMovementSpeed;
        }
        return !heroCollissionWithPlatform;
    }

    private arrowLeftIsPossible(): boolean {
        this.dataService.weapon.changeBulletDirection(false);

        this.dataService.hero.changeHeroLookDirection(true);

        const isHeroCollisionWithPlatform = this.dataService.platforms.some(platform =>
            this.mathService.isImageAndRectangleTangleFromRightRectangleSide(this.dataService.hero, platform)
        )

        return this.viewportService.isHeroOnViewPort(this.dataService.hero) && !isHeroCollisionWithPlatform;
    }

    private setKeyboardControlServiceSettings(): void {
        this.controlService.setArrowLeftisPossible(this.arrowLeftIsPossible.bind(this));
        this.controlService.setArrowRightisPossible(this.arrowRightIsPossible.bind(this));
    }

}