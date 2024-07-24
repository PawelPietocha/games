import { Injectable } from "@angular/core";
import { ImageForCanvas } from "../../../../models/shapes/imageForCanvas";
import { BaseLevel } from "../../levels/baseLevel";
import { PlatformOponent } from "../../models/platform-oponents";
import { PokemonHero } from "../../models/pokemon-hero";
import { PokemonToChoose } from "../../models/pokemon-to-choose";
import { PokemonWeapon } from "../../models/pokemon-weapon";
import { CoinsCreateHelperService } from "./coins-create-helper.service";
import { InsideCreateHelperService } from "./inside-create-helper.service";
import { OponentsCreateHelperService } from "./oponents-create-helper.service";
import { PokeballCreateHelperService } from "./pokeball-create-helper.service";
import { RepetableItemsCreateHelperService } from "./repetable-items-create-helper.service";
import { SufraceOfGroundCreateHelperService } from "./surface-of-ground-create-helper.service";
import { SurfaceOfPlatformCreateHelperService } from "./surface-of-platform-create-helper.service";
import { TreeCreateHelperService } from "./tree-create-helper.service";


@Injectable({
    providedIn: 'root',
})
export class CreatePokemonHelperService {
    private canvas: HTMLCanvasElement;
    dynamicLevel: BaseLevel;

    constructor(
        private treeCreateHelperService: TreeCreateHelperService,
        private pokeballCreateHelperService: PokeballCreateHelperService,
        private reperableItemsCreateHelperService: RepetableItemsCreateHelperService,
        private coinsCreateHelperService: CoinsCreateHelperService,
        private surfaceOfPlatformCreateHelperService: SurfaceOfPlatformCreateHelperService,
        private surfaceOfGroundCreateHelperService: SufraceOfGroundCreateHelperService,
        private insideCreateHelperService: InsideCreateHelperService,
        private oponentsCreateHelperService: OponentsCreateHelperService
    ) { }

    creteCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    initHero(chosenPokemonName: PokemonToChoose): PokemonHero {
        const pokemonSource = this.dynamicLevel.pokemonSource.find(pokemon => pokemon.basicName === chosenPokemonName);
        return new PokemonHero(
            pokemonSource.basicFormSrcRight,
            {
                width: this.dynamicLevel.heroInitValues.drawPointWidthMultiplier,
                height: this.dynamicLevel.heroInitValues.drawPointHeightMultiplier - this.dynamicLevel.heroInitValues.heightMultiplier / 2
            },
            this.dynamicLevel.heroInitValues.widthMultiplier,
            this.dynamicLevel.heroInitValues.heightMultiplier,
            pokemonSource,
            this.canvas,
        );
    }

    initWeapon(chosenPokemonName: PokemonToChoose): PokemonWeapon {
        const bulletSrc = this.dynamicLevel.pokemonSource.find(pokemon => pokemon.basicName === chosenPokemonName).bulletSrc;
        return new PokemonWeapon(
            bulletSrc,
            {
                width: 0,
                height: 0
            },
            this.dynamicLevel.bulletValue.widthMultiplier,
            this.dynamicLevel.bulletValue.heightMultiplier,
            3.6,
            this.canvas,
            false);
    }

    initPokeballs(): ImageForCanvas[] {
        return this.pokeballCreateHelperService.createPokeballs(this.dynamicLevel);
    }

    initTrees(): ImageForCanvas[] {
        return this.treeCreateHelperService.createTrees(this.dynamicLevel);
    }

    initClouds(): ImageForCanvas[] {
        return this.reperableItemsCreateHelperService.createItems(this.dynamicLevel.cloudsValue, this.dynamicLevel.finishImage);
    }

    initCoins(): ImageForCanvas[] {
        return this.coinsCreateHelperService.createCoins(this.dynamicLevel);
    }

    initSurfaceOfPlatform(): ImageForCanvas[] {
        return this.surfaceOfPlatformCreateHelperService.getSurfaceOfPlatform(this.dynamicLevel, this.canvas);
    }

    initSurfaceOfGround(): ImageForCanvas[] {
        return this.surfaceOfGroundCreateHelperService.getSurfaceOfGround(this.dynamicLevel, this.canvas);
    }

    initPlatformInside(): ImageForCanvas[] {
        return this.insideCreateHelperService.getInside(this.dynamicLevel.groundInside, this.dynamicLevel.platformValues, this.canvas);
    }

    initGroundInside(): ImageForCanvas[] {
        return this.insideCreateHelperService.getInside(this.dynamicLevel.groundInside, this.dynamicLevel.groundValues, this.canvas);
    }

    initOponents(): PlatformOponent[] {
        return this.oponentsCreateHelperService.initOponentsValues(this.dynamicLevel, this.canvas);
    }
}