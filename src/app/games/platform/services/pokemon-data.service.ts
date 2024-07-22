import { BehaviorSubject } from "rxjs"
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

    constructor(private initPlatformService: InitPlatformService) {
        console.log('pokemonDataService');
    }

    grounds$: BehaviorSubject<FilledRectangle[]> = new BehaviorSubject<FilledRectangle[]>([]);
    water$: BehaviorSubject<FilledRectangle[]> = new BehaviorSubject<FilledRectangle[]>([]);
    platforms$: BehaviorSubject<FilledRectangle[]> = new BehaviorSubject<FilledRectangle[]>([]);
    finishImage$: BehaviorSubject<ImageForCanvas> = new BehaviorSubject<ImageForCanvas>(null);
    pokeballs$: BehaviorSubject<ImageForCanvas[]> = new BehaviorSubject<ImageForCanvas[]>([]);
    coins$: BehaviorSubject<ImageForCanvas[]> = new BehaviorSubject<ImageForCanvas[]>([]);
    laser$: BehaviorSubject<ImageForCanvas> = new BehaviorSubject<ImageForCanvas>(null);
    nonIntrusiveImages$: BehaviorSubject<ImageForCanvas[]> = new BehaviorSubject<ImageForCanvas[]>([]);
    oponents$: BehaviorSubject<PlatformOponent[]> = new BehaviorSubject<PlatformOponent[]>([]);
    weapon$: BehaviorSubject<PokemonWeapon> = new BehaviorSubject<PokemonWeapon>(null);
    hero$: BehaviorSubject<PokemonHero> = new BehaviorSubject<PokemonHero>(null);


    initData(canvas: HTMLCanvasElement, chosenPokemonName: PokemonToChoose): void {
        this.initPlatformService.createCanvas(canvas);
        this.grounds$.next(this.initPlatformService.initGround());
        this.water$.next(this.initPlatformService.initWater());
        this.platforms$.next(this.initPlatformService.initPlatforms());
        this.pokeballs$.next(this.initPlatformService.initPokeballs());
        this.coins$.next(this.initPlatformService.initCoins());
        this.laser$.next(this.initPlatformService.initLaser());
        this.nonIntrusiveImages$.next(this.initPlatformService.initNonIntrusiveImages());
        this.oponents$.next(this.initPlatformService.initOponents());
        this.weapon$.next(this.initPlatformService.initWeaponValue(chosenPokemonName));
        this.hero$.next(this.initPlatformService.initHeroValue(chosenPokemonName));
    }

    initLevel(level: number): void {
        this.initPlatformService.initLevel(level);
    }
}