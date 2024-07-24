import { InitPlatformService } from "./init-platform.service"
import { Injectable } from "@angular/core"
import { FilledRectangle } from "../../../models/shapes/filledRectangle";
import { ImageForCanvas } from "../../../models/shapes/imageForCanvas";
import { PlatformOponent } from "../models/platform-oponents";
import { PokemonWeapon } from "../models/pokemon-weapon";
import { PokemonToChoose } from "../models/pokemon-to-choose";
import { PokemonHero } from "../models/pokemon-hero";

@Injectable({
    providedIn: 'root',
})
export class PokemonDataService {

    constructor(private initPlatformService: InitPlatformService) { }

    grounds: FilledRectangle[];
    water: FilledRectangle[];
    platforms: FilledRectangle[];
    finishImage: ImageForCanvas;
    pokeballs: ImageForCanvas[];
    coins: ImageForCanvas[];
    laser: ImageForCanvas;
    nonIntrusiveImages: ImageForCanvas[];
    oponents: PlatformOponent[];
    weapon: PokemonWeapon;
    hero: PokemonHero;
    canvas: HTMLCanvasElement;


    initData(canvas: HTMLCanvasElement, chosenPokemonName: PokemonToChoose): void {
        this.canvas = canvas;
        this.initPlatformService.createCanvas(canvas);
        this.grounds = this.initPlatformService.initGround();
        this.water = this.initPlatformService.initWater();
        this.platforms = this.initPlatformService.initPlatforms();
        this.pokeballs = this.initPlatformService.initPokeballs();
        this.coins = this.initPlatformService.initCoins();
        this.laser = this.initPlatformService.initLaser();
        this.nonIntrusiveImages = this.initPlatformService.initNonIntrusiveImages();
        this.oponents = this.initPlatformService.initOponents();
        this.weapon = this.initPlatformService.initWeaponValue(chosenPokemonName);
        this.hero = this.initPlatformService.initHeroValue(chosenPokemonName);
        this.finishImage = this.initPlatformService.initFinishImage();
    }

    initLevel(level: number): void {
        this.initPlatformService.initLevel(level);
    }
}