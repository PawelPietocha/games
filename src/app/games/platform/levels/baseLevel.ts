import { ImageCreateHelper } from "../../../models/image-create-helper";
import { PlatformGradientValues } from "../models/platform-gradient-values";
import { PokemonToChoose } from "../models/pokemon-to-choose";
import { RectangleCreateHelper } from "../../../models/rectangle-create-helper";
import { PokemonSource } from "../models/pokemon-source";

export abstract class BaseLevel {
    heroInitValues: Omit<ImageCreateHelper, 'src'> =
        {
            drawPointWidthMultiplier: 0.0265,  //If half of width then it is leftmost
            drawPointHeightMultiplier: 0.9, // Between 0 and 1.  If same as groundmStartPointHeightMultiplier hero is on ground
            widthMultiplier: 0.053,
            heightMultiplier: 0.106
        };
    pokemonSource: PokemonSource[] = [
        new PokemonSource(PokemonToChoose.charmander),
        new PokemonSource(PokemonToChoose.squirtle),
        new PokemonSource(PokemonToChoose.bulbasaur)
    ];

    cloudsValue: ImageCreateHelper =
        {
            drawPointWidthMultiplier: 0.16,
            drawPointHeightMultiplier: 0.1,
            widthMultiplier: 0.15,
            heightMultiplier: 0.073,
            repetableBreakBetween: 0.66,
            src: "assets/Pokemons/other-images/cloud.png"
        };

    surfaceOfGround: ImageCreateHelper = {
        drawPointWidthMultiplier: 0,
        drawPointHeightMultiplier: 0.855,
        heightMultiplier: 0.1,
        src: "assets/Pokemons/other-images/grass-with-stones.png"
    }

    surfaceOfPlatform: ImageCreateHelper = {
        heightMultiplier: 0.05,
        src: "assets/Pokemons/other-images/grass1.png"
    }

    groundInside: ImageCreateHelper = {
        src: "assets/Pokemons/other-images/ground-inside.jpg"
    }

    bulletValue: Pick<ImageCreateHelper, 'widthMultiplier' | 'heightMultiplier'>
        = {
            widthMultiplier: 0.05,
            heightMultiplier: 0.065
        };

    groundColor = '#674107';
    waterColor = '#0f5e9c';
    grassColor = '#41980a';

    platformGradientValues: PlatformGradientValues
        = { higherColor: this.grassColor, lowerColor: this.groundColor, higherColorHeight: 12 };

    pokeballGlobalValues: Pick<ImageCreateHelper, 'src' | 'widthMultiplier' | 'heightMultiplier'> =
        { src: "assets/Pokemons/other-images/pokeball.png", widthMultiplier: 0.027, heightMultiplier: 0.054 };

    treesGlobalValues: Pick<ImageCreateHelper, 'src' | 'widthMultiplier' | 'heightMultiplier' | 'drawPointHeightMultiplier'> =
        { src: "assets/Pokemons/other-images/tree.png", widthMultiplier: 0.33, heightMultiplier: 1, drawPointHeightMultiplier: 0.6 };

    globalCoinValues: Pick<ImageCreateHelper, 'src' | 'widthMultiplier' | 'heightMultiplier'>
        = { src: "assets/Pokemons/other-images/pokemonCoin.png", widthMultiplier: 0.04, heightMultiplier: 0.08 };

    finishImage: Pick<ImageCreateHelper, 'drawPointWidthMultiplier' | 'drawPointHeightMultiplier' | 'src' | 'widthMultiplier' | 'heightMultiplier'> =
        { src: "assets/Pokemons/other-images/opened-pokeball.png", drawPointWidthMultiplier: 4.83, drawPointHeightMultiplier: 0.8, widthMultiplier: 0.1, heightMultiplier: 0.2 };

    laserValue: ImageCreateHelper = {
        src: "assets/Pokemons/other-images/laser-beam.png",
        drawPointWidthMultiplier: 4.83,
        drawPointHeightMultiplier: 0.8,
        widthMultiplier: 0,
        heightMultiplier: 0.01
    }

    abstract platformValues: RectangleCreateHelper[];
    abstract groundValues: RectangleCreateHelper[];
    abstract waterValues: RectangleCreateHelper[];
    abstract pokeballsValues: Pick<ImageCreateHelper, 'drawPointWidthMultiplier' | 'drawPointHeightMultiplier'>[];
    abstract readonly time: number;
    abstract oponentsValues: ImageCreateHelper[]
    abstract treesValue: Pick<ImageCreateHelper, 'drawPointWidthMultiplier'>[];
}