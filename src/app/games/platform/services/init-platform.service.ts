import { Injectable } from "@angular/core";
import { ControlKey } from "../../../models/controlKey";
import { PokemonToChoose } from "../models/pokemon-to-choose";
import { BaseLevel } from "../levels/baseLevel";
import { LevelOne } from "../levels/level-one";
import { LevelTwo } from "../levels/level-two";
import { ShapeCreateHelperService } from "../../../services/shape-create-helper.service";
import { ImageForCanvas } from "../../../models/shapes/imageForCanvas";
import { CreatePokemonHelperService } from "./items-create-helpers/create-pokemon-helper.service";

@Injectable({
    providedIn: 'root',
})

export class InitPlatformService {

    readonly heroMovementSpeed = 3;
    readonly controlKeyBoardKey = [ControlKey.arrowLeft, ControlKey.arrowRight, ControlKey.space, ControlKey.control];
    private dynamicLevel: BaseLevel = new LevelOne();
    nonIntrusiveImages: ImageForCanvas[] = [];
    maxJumpHeight = 0.32;

    constructor(private createPokemonHelperService: CreatePokemonHelperService,
        private shapeCreateHelperService: ShapeCreateHelperService) { }

    createCanvas(canvas: HTMLCanvasElement) {
        this.createPokemonHelperService.creteCanvas(canvas);
        this.shapeCreateHelperService.createCanvas(canvas);
    }

    initLevel(level: number) {
        this.nonIntrusiveImages = [];
        switch (level) {
            case 1: {
                this.createPokemonHelperService.dynamicLevel = new LevelOne();
                break;
            }
            case 2:
                this.createPokemonHelperService.dynamicLevel = new LevelTwo();
                break;
        }
    }

    clearLevel() {
    }

    initTime(): number {
        return this.dynamicLevel.time;
    }

    getPokemonToChoose(): PokemonToChoose[] {
        return this.dynamicLevel.pokemonSource.map(pokemon => pokemon.basicName);
    }

    initHeroValue(chosenPokemonName: PokemonToChoose) {
        this.createPokemonHelperService.dynamicLevel = new LevelOne();
        return this.createPokemonHelperService.initHero(chosenPokemonName, this.heroMovementSpeed);
    }

    initWeaponValue(chosenPokemonName: PokemonToChoose) {
        return this.createPokemonHelperService.initWeapon(chosenPokemonName);

    }

    initGround() {
        return this.shapeCreateHelperService.createFilledRectangleArray(this.dynamicLevel.groundValues, this.dynamicLevel.groundColor);
    }

    initWater() {
        return this.shapeCreateHelperService.createFilledRectangleArray(this.dynamicLevel.waterValues, this.dynamicLevel.waterColor);
    }

    initPlatforms() {
        return this.shapeCreateHelperService.createFilledRectangleArray(this.dynamicLevel.platformValues, this.dynamicLevel.groundColor);
    }

    initCoins() {
        return this.createPokemonHelperService.initCoins();
    }

    initFinishImage() {
        return this.shapeCreateHelperService.createBasicImage(this.dynamicLevel.finishImage);
    }

    initClouds(): void {
        this.nonIntrusiveImages.push(...this.createPokemonHelperService.initClouds());
    }

    initSurfaceOfPlatform(): void {
        if (this.dynamicLevel.surfaceOfPlatform) {
            this.nonIntrusiveImages.push(...this.createPokemonHelperService.initSurfaceOfPlatform());
        }
    }

    initPlatformInside(): void {
        this.nonIntrusiveImages.push(...this.createPokemonHelperService.initPlatformInside());
    }

    initGroundInside(): void {
        this.nonIntrusiveImages.push(...this.createPokemonHelperService.initGroundInside());
    }

    initSurfaceOfGround(): void {
        if (this.dynamicLevel.surfaceOfGround) {
            this.nonIntrusiveImages.push(...this.createPokemonHelperService.initSurfaceOfGround());
        }
    }

    initTrees(): void {
        this.nonIntrusiveImages.push(...this.createPokemonHelperService.initTrees());
    }


    initOponents() {
        return this.createPokemonHelperService.initOponents();
    }

    initPokeballs() {
        return this.createPokemonHelperService.initPokeballs();
    }

    initLaser() {
        return this.shapeCreateHelperService.createBasicImage(this.dynamicLevel.laserValue);
    }

    initNonIntrusiveImages() {
        this.initClouds();
        this.initSurfaceOfPlatform();
        this.initPlatformInside();
        this.initGroundInside();
        this.initSurfaceOfGround();
        this.initTrees();

      return this.nonIntrusiveImages;
    }
}