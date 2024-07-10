import { Injectable } from "@angular/core";
import { Point } from "../../../models/point";
import { FilledRectangle } from "../../../models/filledRectangle";
import { ControlKey } from "../../../models/controlKey";
import { ImageForCanvas } from "../../../models/imageForCanvas";
import { ImageCreateHelper } from "../../../models/image-create-helper";
import { PokemonToChoose } from "../models/pokemon-to-choose";
import { BaseLevel } from "../levels/baseLevel";
import { LevelOne } from "../levels/level-one";
import { PokemonSource } from "../models/pokemon-source";
import { PlatformGradientValues } from "../models/platform-gradient-values";
import { PlatformOponent } from "../models/platform-oponents";
import { MeowthOponent } from "../models/meowth-oponent";
import { LevelTwo } from "../levels/level-two";
import { PokemonHero } from "../../../models/pokemon-hero";
import { PokemonWeapon } from "../../../models/pokemon-weapon";
import { OponentEnum } from "../models/oponent-enum";
import { KoffingOponent } from "../models/koffing-oponent";

@Injectable({
    providedIn: 'root',
})

export class InitPlatformService {
    //Canvas
    private canvas: HTMLCanvasElement;

    readonly heroMovementSpeed = 1.5;
    readonly controlIntervalTime = 2; //To Faster or Slower react to hero move. 1 is fast, 30 is slow
    readonly controlKeyBoardKey = [ControlKey.arrowLeft, ControlKey.arrowRight, ControlKey.space, ControlKey.control] // Available Keys in game
    //Levels
    private dynamicLevel: BaseLevel = new LevelOne();

    createCanvasInInitService(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    initLevel(level: number) {
        switch (level) {
            case 1: {
                this.dynamicLevel = new LevelOne();
                break;
            }
            case 2:
                this.dynamicLevel = new LevelTwo();
                break;
        }
    }

    clearLevel() {

    }

    initTime(): number {
        return this.dynamicLevel.time;
    }

    initHeroValue(chosenPokemonName: PokemonToChoose): PokemonHero {
        let pokemonSource = this.initPokemonSource(chosenPokemonName);
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

    initGroundPlatformValues(): FilledRectangle[] {
        let grounds: FilledRectangle[] = [];
        this.dynamicLevel.groundValues.forEach(ground => {
            let newGround = this.createPlatform(
                {
                    width: ground.startPointWidth,
                    height: ground.startPointHeightMultipier
                },
                ground.width,
                ground.heightMultipier);
            grounds.push(newGround);
        })
        return grounds;
    }

    initPokemonSource(name: PokemonToChoose): PokemonSource {
        return this.dynamicLevel.pokemonSource.find(pokemon => pokemon.basicName === name);
    }

    getPokemonToChoose(): PokemonToChoose[] {
        return this.dynamicLevel.pokemonSource.map(pokemon => pokemon.basicName);
    }

    getPlatformGradient(): PlatformGradientValues {
        return this.dynamicLevel.platformGradientValues;
    }

    initWaterValues(): FilledRectangle[] {
        let waters: FilledRectangle[] = [];
        this.dynamicLevel.waterValues.forEach(water => {
            let newWater = new FilledRectangle(
                {
                    width: water.startPointWidth,
                    height: water.startPointHeightMultipier
                },
                water.width,
                water.heightMultipier,
                this.dynamicLevel.waterColor,
                this.canvas);
            waters.push(newWater);
        })
        return waters;
    }

    initPlatformValues(): FilledRectangle[] {
        let platforms: FilledRectangle[] = [];

        this.dynamicLevel.platformValues.forEach(platform => {
            let newPlatform = this.createPlatform(
                {
                    width: platform.startPointWidth,
                    height: platform.startPointHeightMultipier
                },
                platform.width,
                platform.heightMultipier)
            platforms.push(newPlatform);
        })
        return platforms;
    }

    initCoins(): ImageForCanvas[] {
        let coins: ImageForCanvas[] = [];
        this.dynamicLevel.platformValues.forEach(platform => {
            let coinCreateHelper: ImageCreateHelper = {
                src: this.dynamicLevel.globalCoinValues.src,
                drawPointWidthMultiplier: platform.startPointWidth + platform.width / 2,
                drawPointHeightMultiplier: platform.startPointHeightMultipier - 0.05,
                widthMultiplier: this.dynamicLevel.globalCoinValues.widthMultiplier,
                heightMultiplier: this.dynamicLevel.globalCoinValues.heightMultiplier
            }
            let newCoin = this.createBasicImage(coinCreateHelper);
            coins.push(newCoin);
        })
        return coins;

    }

    initFinishImage(): ImageForCanvas {
        return this.createBasicImage(this.dynamicLevel.finishImage);
    }

    initNonIntrusiveImages(): ImageForCanvas[] {
        let nonIntrusiveImages: ImageForCanvas[] = [];
        let clouds = this.getClouds();
        nonIntrusiveImages.push(...clouds);
        let trees = this.getTrees();
        nonIntrusiveImages.push(...trees);
        if (this.dynamicLevel.surfaceOfGround) {
            let surfacesOfGround = this.getSurfaceOfGround();
            nonIntrusiveImages.push(...surfacesOfGround);
        }
        if (this.dynamicLevel.surfaceOfPlatform) {
            let surfacesOfPlatform = this.getSurfaceOfPlatform();
            nonIntrusiveImages.push(...surfacesOfPlatform);
        }
        let groundsInside = this.getGroundInside();
        nonIntrusiveImages.push(...groundsInside);
        let platformInside = this.getPlatformInside();
        nonIntrusiveImages.push(...platformInside);
        return nonIntrusiveImages;


    }

    getClouds(): ImageForCanvas[] {
        let clouds: ImageForCanvas[] = [];
        let actualWidth = this.dynamicLevel.cloudsValue.drawPointWidthMultiplier;
        let countOfClouds = Math.floor(this.dynamicLevel.finishImage.drawPointWidthMultiplier / this.dynamicLevel.cloudsValue.repetableBreakBetween);
        for (let i = 1; i <= countOfClouds; i++) {
            let cloud = new ImageForCanvas(
                this.dynamicLevel.cloudsValue.src,
                {
                    width: actualWidth,
                    height: this.dynamicLevel.cloudsValue.drawPointHeightMultiplier
                },
                this.dynamicLevel.cloudsValue.widthMultiplier,
                this.dynamicLevel.cloudsValue.heightMultiplier,
                this.canvas);
            clouds.push(cloud);
            actualWidth += this.dynamicLevel.cloudsValue.repetableBreakBetween;
        }
        return clouds;
    }

    getSurfaceOfPlatform(): ImageForCanvas[] {
        let surfacesOfPlatform: ImageForCanvas[] = [];
        this.dynamicLevel.platformValues.forEach(platform => {
            let surface = new ImageForCanvas(
                this.dynamicLevel.surfaceOfPlatform.src,
                {
                    width: platform.startPointWidth + platform.width / 2,
                    height: platform.startPointHeightMultipier - this.dynamicLevel.surfaceOfPlatform.heightMultiplier / 2
                },
                platform.width,
                this.dynamicLevel.surfaceOfPlatform.heightMultiplier,
                this.canvas
            );
            surfacesOfPlatform.push(surface);
        });
        return surfacesOfPlatform;
    }

    getPlatformInside(): ImageForCanvas[] {
        let platformInside: ImageForCanvas[] = [];
        this.dynamicLevel.platformValues.forEach(platform => {
            let inside = new ImageForCanvas(
                this.dynamicLevel.groundInside.src,
                {
                    width: platform.startPointWidth + platform.width / 2,
                    height: platform.startPointHeightMultipier + platform.heightMultipier / 2
                },
                platform.width,
                platform.heightMultipier,
                this.canvas
            );
            platformInside.push(inside);
        });
        return platformInside;
    }

    getGroundInside(): ImageForCanvas[] {
        let groundInside: ImageForCanvas[] = [];
        this.dynamicLevel.groundValues.forEach(ground => {
            let inside = new ImageForCanvas(
                this.dynamicLevel.groundInside.src,
                {
                    width: ground.startPointWidth + ground.width / 2,
                    height: ground.startPointHeightMultipier + ground.heightMultipier / 2
                },
                ground.width,
                ground.heightMultipier,
                this.canvas
            );
            groundInside.push(inside);
        });
        return groundInside;
    }

    getSurfaceOfGround(): ImageForCanvas[] {
        let surfacesOfGround: ImageForCanvas[] = [];
        this.dynamicLevel.groundValues.forEach(ground => {
            let count = this.calculateHowManySurfaceImageCountInGround(ground.width, 0.2, 0.4);
            let width = ground.width / count;
            let actualWidth = ground.startPointWidth + width / 2;
            for (let i = 1; i <= count; i++) {
                let surfaceOfGround = new ImageForCanvas(
                    this.dynamicLevel.surfaceOfGround.src,
                    {
                        width: actualWidth,
                        height: this.dynamicLevel.surfaceOfGround.drawPointHeightMultiplier
                    },
                    width,
                    this.dynamicLevel.surfaceOfGround.heightMultiplier,
                    this.canvas
                );
                surfacesOfGround.push(surfaceOfGround);
                actualWidth += width;
            }
        })
        return surfacesOfGround;
    }

    getTrees(): ImageForCanvas[] {
        let trees: ImageForCanvas[] = [];
        this.dynamicLevel.treesValue.forEach(tree => {
            let fullTree: ImageCreateHelper = {
                src: this.dynamicLevel.treesGlobalValues.src,
                widthMultiplier: this.dynamicLevel.treesGlobalValues.widthMultiplier,
                heightMultiplier: this.dynamicLevel.treesGlobalValues.heightMultiplier,
                drawPointWidthMultiplier: tree.drawPointWidthMultiplier,
                drawPointHeightMultiplier: this.dynamicLevel.treesGlobalValues.drawPointHeightMultiplier
            };
            trees.push(this.createBasicImage(fullTree));
        })
        return trees;
    }


    initOponentsValues(): PlatformOponent[] {
        let oponents: PlatformOponent[] = [];


        this.dynamicLevel.oponentsValues.forEach(oponent => {
            switch (oponent.oponentType) {
                case OponentEnum.meowth: {
                    let newOponent = new MeowthOponent(
                        {
                            width: oponent.drawPointWidthMultiplier,
                            height: oponent.drawPointHeightMultiplier
                        },
                        oponent.isOnFloor,
                        this.canvas)

                    oponents.push(newOponent);
                    break;
                }
                case OponentEnum.koffing: {
                    let newOponent = new KoffingOponent(
                        {
                            width: oponent.drawPointWidthMultiplier,
                            height: oponent.drawPointHeightMultiplier
                        },
                        this.canvas);
                    oponents.push(newOponent);
                    break;
                }
            }
        })


        return oponents;
    }

    initPokeballs(): ImageForCanvas[] {
        let pokeballs: ImageForCanvas[] = [];

        this.dynamicLevel.pokeballsValues.forEach(pokeball => {
            let fullPokeball: ImageCreateHelper =
            {
                src: this.dynamicLevel.pokeballGlobalValues.src,
                drawPointWidthMultiplier: pokeball.drawPointWidthMultiplier,
                drawPointHeightMultiplier: pokeball.drawPointHeightMultiplier,
                widthMultiplier: this.dynamicLevel.pokeballGlobalValues.widthMultiplier,
                heightMultiplier: this.dynamicLevel.pokeballGlobalValues.heightMultiplier
            }
            let newPokeball = this.createBasicImage(fullPokeball);
            pokeballs.push(newPokeball);
        })
        return pokeballs;
    }

    initWeapon(chosenPokemonName: PokemonToChoose): PokemonWeapon {
        let bulletSrc = this.dynamicLevel.pokemonSource.find(pokemon => pokemon.basicName === chosenPokemonName).bulletSrc;
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

    initLaser(): ImageForCanvas {
        return new ImageForCanvas(
            this.dynamicLevel.laserValue.src,
            {
                width: this.dynamicLevel.laserValue.drawPointWidthMultiplier,
                height: this.dynamicLevel.laserValue.drawPointHeightMultiplier
            },
            this.dynamicLevel.laserValue.widthMultiplier,
            this.dynamicLevel.laserValue.heightMultiplier,
            this.canvas
        )
    }

    private createPlatform(
        startPoint: Point, width: number, height: number): FilledRectangle {
        return new FilledRectangle(startPoint, width, height, this.dynamicLevel.groundColor, this.canvas)
    }

    private createBasicImage(image: ImageCreateHelper): ImageForCanvas {
        return new ImageForCanvas(
            image.src,
            {
                width: image.drawPointWidthMultiplier,
                height: image.drawPointHeightMultiplier
            },
            image.widthMultiplier, image.heightMultiplier,
            this.canvas);
    }

    private calculateHowManySurfaceImageCountInGround(groundWidth: number, minWidthOfImage: number, maxWidthOfImage: number): number {
        let minCount = groundWidth / minWidthOfImage;
        let maxCount = groundWidth / maxWidthOfImage;
        return Math.floor((minCount + maxCount) / 2);
    }
}