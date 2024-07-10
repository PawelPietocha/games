import { ImageCreateHelper } from "../../../models/image-create-helper";
import { RectangleCreateHelper } from "../../../models/rectangle-create-helper";
import { OponentEnum } from "../models/oponent-enum";
import { BaseLevel } from "./baseLevel";

export class LevelTwo extends BaseLevel {
    override treesValue: Pick<ImageCreateHelper, 'drawPointWidthMultiplier'>[] =
        [
            { drawPointWidthMultiplier: 0.33 },
            { drawPointWidthMultiplier: 0.95 },
            { drawPointWidthMultiplier: 1.95 },
            { drawPointWidthMultiplier: 3.2 },
            { drawPointWidthMultiplier: 4.23 },
        ];
    override platformValues: RectangleCreateHelper[] = [
        { startPointWidth: 1.2, startPointHeightMultipier: 0.8, width: 0.1, heightMultipier: 0.05 },
        { startPointWidth: 1.55, startPointHeightMultipier: 0.1, width: 0.05, heightMultipier: 0.9 },
        { startPointWidth: 1.4, startPointHeightMultipier: 0.6, width: 0.1, heightMultipier: 0.05 },
        { startPointWidth: 1.2, startPointHeightMultipier: 0.4, width: 0.1, heightMultipier: 0.05 },
        { startPointWidth: 1.8, startPointHeightMultipier: 0.8, width: 0.6, heightMultipier: 0.05 },
        { startPointWidth: 1.4, startPointHeightMultipier: 0.2, width: 0.1, heightMultipier: 0.05 },
        { startPointWidth: 2.8, startPointHeightMultipier: 0.8, width: 0.3, heightMultipier: 0.1 },
        { startPointWidth: 3.1, startPointHeightMultipier: 0.7, width: 0.3, heightMultipier: 0.1 },
        { startPointWidth: 3.4, startPointHeightMultipier: 0.6, width: 0.3, heightMultipier: 0.1 },
        { startPointWidth: 3.7, startPointHeightMultipier: 0.5, width: 0.3, heightMultipier: 0.1 },
        { startPointWidth: 4.0, startPointHeightMultipier: 0.4, width: 0.3, heightMultipier: 0.1 },
        { startPointWidth: 4.3, startPointHeightMultipier: 0.3, width: 0.3, heightMultipier: 0.1 },
    ];
    groundValues = [
        { startPointWidth: 0, startPointHeightMultipier: 0.9, width: 0.6, heightMultipier: 0.1 },
        { startPointWidth: 0.8, startPointHeightMultipier: 0.9, width: 0.8, heightMultipier: 0.1 },
        { startPointWidth: 2.6, startPointHeightMultipier: 0.9, width: 2.7, heightMultipier: 0.1 }
    ];
    waterValues = [
        { startPointWidth: 0.6, startPointHeightMultipier: 0.96, width: 0.2, heightMultipier: 0.04 },
        { startPointWidth: 1.6, startPointHeightMultipier: 0.96, width: 1, heightMultipier: 0.04 }
    ];
    override pokeballsValues: Pick<ImageCreateHelper, "drawPointWidthMultiplier" | "drawPointHeightMultiplier">[] = [];
    override time: number = 240;
    override oponentsValues: ImageCreateHelper[] = [
        { drawPointWidthMultiplier: 0.7, drawPointHeightMultiplier: 0.96, oponentType: OponentEnum.koffing },
        { drawPointWidthMultiplier: 0.4, drawPointHeightMultiplier: 0.9, isOnFloor: true, oponentType: OponentEnum.meowth },
        { drawPointWidthMultiplier: 1.7, drawPointHeightMultiplier: 0.96, oponentType: OponentEnum.koffing },
        { drawPointWidthMultiplier: 1.9, drawPointHeightMultiplier: 0.96, oponentType: OponentEnum.koffing },
        { drawPointWidthMultiplier: 2.1, drawPointHeightMultiplier: 0.96, oponentType: OponentEnum.koffing },
        { drawPointWidthMultiplier: 2.3, drawPointHeightMultiplier: 0.96, oponentType: OponentEnum.koffing },
        { drawPointWidthMultiplier: 2.5, drawPointHeightMultiplier: 0.96, oponentType: OponentEnum.koffing },
        { drawPointWidthMultiplier: 1, drawPointHeightMultiplier: 0.9, isOnFloor: true, oponentType: OponentEnum.meowth },
        { drawPointWidthMultiplier: 1.4, drawPointHeightMultiplier: 0.9, isOnFloor: true, oponentType: OponentEnum.meowth },
        { drawPointWidthMultiplier: 3, drawPointHeightMultiplier: 0.8, isOnFloor: false, oponentType: OponentEnum.meowth },
        { drawPointWidthMultiplier: 3.3, drawPointHeightMultiplier: 0.7, isOnFloor: false, oponentType: OponentEnum.meowth },
        { drawPointWidthMultiplier: 3.6, drawPointHeightMultiplier: 0.6, isOnFloor: false, oponentType: OponentEnum.meowth },
        { drawPointWidthMultiplier: 3.9, drawPointHeightMultiplier: 0.5, isOnFloor: false, oponentType: OponentEnum.meowth },
        { drawPointWidthMultiplier: 4.2, drawPointHeightMultiplier: 0.4, isOnFloor: false, oponentType: OponentEnum.meowth },
        { drawPointWidthMultiplier: 4.5, drawPointHeightMultiplier: 0.3, isOnFloor: false, oponentType: OponentEnum.meowth },

    ];

    override waterColor = '#223622';

    override groundInside: ImageCreateHelper = {
        src: "assets/Pokemons/other-images/sand.png"
    }

    override surfaceOfGround: ImageCreateHelper = null;

    override surfaceOfPlatform: ImageCreateHelper = null;

    override treesGlobalValues: Pick<ImageCreateHelper, 'src' | 'widthMultiplier' | 'heightMultiplier' | 'drawPointHeightMultiplier'> =
        { src: "assets/Pokemons/other-images/died-tree.png", widthMultiplier: 0.33, heightMultiplier: 1, drawPointHeightMultiplier: 0.6 };


}