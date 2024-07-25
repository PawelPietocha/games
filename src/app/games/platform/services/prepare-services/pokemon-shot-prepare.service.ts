import { Injectable } from "@angular/core";
import { Interval } from "../../../../shared/intervals/interval";
import { PokemonDataService } from "../pokemon-data.service";
import { PokemonHero } from "../../models/pokemon-hero";
import { PokemonWeapon } from "../../models/pokemon-weapon";
import { ShotControlService } from "../../../../services/controlServices/shot-control.service";
import { PlatformOponent } from "../../models/platform-oponents";
import { FilledRectangle } from "../../../../models/shapes/filledRectangle";
import { MathService } from "../../../../services/math.service";
import { ViewportService } from "../viewport.service";

@Injectable({
    providedIn: 'root',
})
export class PokemonShotPrepareService {
    shotInterval: Interval;
    platforms: FilledRectangle[] = [];
    oponents: PlatformOponent[] = [];
    pokemonWeapon: PokemonWeapon;
    pokemonHero: PokemonHero;

    constructor(private pokemonDataService: PokemonDataService,
        private shotService: ShotControlService,
        private mathService: MathService,
        private viewportService: ViewportService
    ) { }

    initShotService(): void {
        this.initValues();
    }

    private isWeaponReady(): boolean {
        return this.pokemonWeapon.isWeaponReady(this.pokemonHero.currentPokemonForm);
    }

    private conditionToEndInterval(): boolean {
        return this.isBulletHitPlatform(this.pokemonWeapon) || this.isBulletHitOponent(this.pokemonWeapon) || !this.isBulletOnViewPort(this.pokemonWeapon)
    }

    private isBulletHitPlatform(weapon: PokemonWeapon): boolean {
        return this.platforms.some(platform => this.mathService.isImageAndRectangleTangleFromLeftRectangleSide(weapon, platform) ||
            this.mathService.isImageAndRectangleTangleFromRightRectangleSide(weapon, platform))
    }

    private isBulletOnViewPort(weapon: PokemonWeapon): boolean {
        return this.viewportService.isImageOnViewPort(weapon);
    }

    private isBulletHitOponent(weapon: PokemonWeapon): boolean {
        const oponentToKill = this.oponents.find(oponent => oponent.visible && this.mathService.isTwoImagesToClose(oponent, weapon));
        if(oponentToKill) {
            oponentToKill.visible = false;
            return true;
        }
        return false;
    }

    private shotIntervalAction(): void {
        this.pokemonWeapon.changeWeaponWidthPosition(this.pokemonHero.movementSpeed);
    }

    private beforeShotAction(): void {
        this.pokemonWeapon.point = { width: this.pokemonHero.point.width, height: this.pokemonHero.point.height };
        this.pokemonWeapon.shouldBulletGoingRight = this.pokemonHero.looksRight;
        this.pokemonWeapon.startBullet();
    }

    private actionAfterInterval() {
        this.pokemonWeapon.clearBullet();
    }

    private initValues(): void {
        this.pokemonHero = this.pokemonDataService.hero;
        this.pokemonWeapon = this.pokemonDataService.weapon;
        this.shotService.setIsFulfilkedMainCondition(this.isWeaponReady.bind(this));
        this.shotService.setConditionToEndShotInterval(this.conditionToEndInterval.bind(this));
        this.shotService.setBeforeShotAtion(this.beforeShotAction.bind(this));
        this.shotService.setActionAfterInterval(this.actionAfterInterval.bind(this));
        this.platforms = this.pokemonDataService.platforms;
        this.oponents = this.pokemonDataService.oponents;
        this.shotService.setShotIntervalAction(this.shotIntervalAction.bind(this));
    }
}