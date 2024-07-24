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

    constructor(private pokemonDataService: PokemonDataService,
        private shotService: ShotControlService,
        private mathService: MathService,
        private viewportService: ViewportService
    ) { }

    initShotService(pokemonHero: PokemonHero, pokemonWeapon: PokemonWeapon, speed: number): void {
        this.initValues(pokemonHero, pokemonWeapon, speed);
    }

    private isWeaponReady(pokemonWeapon: PokemonWeapon, pokemonHero: PokemonHero): boolean {
        return pokemonWeapon.isWeaponReady(pokemonHero.currentPokemonForm);
    }

    private conditionToEndInterval(weapon: PokemonWeapon): boolean {
        return this.isBulletHitPlatform(weapon) || this.isBulletHitOponent(weapon) || !this.isBulletOnViewPort(weapon)
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

    private shotIntervalAction(weapon: PokemonWeapon, speed: number): void {
        weapon.changeWeaponWidthPosition(speed);
    }

    private beforeShotAction(pokemonHero: PokemonHero, pokemonWeapon: PokemonWeapon): void {
        pokemonWeapon.point = { width: pokemonHero.point.width, height: pokemonHero.point.height };
        pokemonWeapon.shouldBulletGoingRight = pokemonHero.looksRight;
        pokemonWeapon.startBullet();
    }

    private actionAfterInterval(pokemonWeapon: PokemonWeapon) {
        pokemonWeapon.clearBullet();
    }

    private initValues(pokemonHero: PokemonHero, pokemonWeapon: PokemonWeapon, speed: number): void {
        this.shotService.setIsFulfilkedMainCondition(this.isWeaponReady.bind(this, pokemonWeapon, pokemonHero));
        this.shotService.setConditionToEndShotInterval(this.conditionToEndInterval.bind(this, pokemonWeapon));
        this.shotService.setBeforeShotAtion(this.beforeShotAction.bind(this, pokemonHero, pokemonWeapon));
        this.shotService.setActionAfterInterval(this.actionAfterInterval.bind(this, pokemonWeapon));
        this.platforms = this.pokemonDataService.platforms;
        this.oponents = this.pokemonDataService.oponents;
        this.shotService.setShotIntervalAction(this.shotIntervalAction.bind(this, pokemonWeapon, speed));
    }
}