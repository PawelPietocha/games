import { ImageCreateHelper } from "../../../models/image-create-helper";
import { RectangleCreateHelper } from "../../../models/rectangle-create-helper";
import { OponentEnum } from "../models/oponent-enum";
import { BaseLevel } from "./baseLevel";

export class LevelOne extends BaseLevel {
    platformValues: RectangleCreateHelper[] = [
        { startPointWidth: 0.2, startPointHeightMultipier: 0.7, width: 0.33, heightMultipier: 0.05 },
        { startPointWidth: 0.1, startPointHeightMultipier: 0.5, width: 0.165, heightMultipier: 0.05 },
        { startPointWidth: 0.0667, startPointHeightMultipier: 0.2, width: 0.066, heightMultipier: 0.05 },
        { startPointWidth: 0.383, startPointHeightMultipier: 0.3, width: 0.116, heightMultipier: 0.05 },
        { startPointWidth: 0.6, startPointHeightMultipier: 0.2, width: 0.04, heightMultipier: 0.7 },
        { startPointWidth: 0.733, startPointHeightMultipier: 0.3, width: 0.13, heightMultipier: 0.05 },
        { startPointWidth: 1.033, startPointHeightMultipier: 0.5, width: 0.2, heightMultipier: 0.05 },
        { startPointWidth: 1.2, startPointHeightMultipier: 0, width: 0.04, heightMultipier: 0.65 },
        { startPointWidth: 1.667, startPointHeightMultipier: 0.6, width: 0.066, heightMultipier: 0.05 },
        { startPointWidth: 1.5, startPointHeightMultipier: 0.4, width: 0.066, heightMultipier: 0.05 },
        { startPointWidth: 3.5, startPointHeightMultipier: 0.7, width: 0.1, heightMultipier: 0.05 },
        { startPointWidth: 3.3, startPointHeightMultipier: 0.5, width: 0.1, heightMultipier: 0.05 },
        { startPointWidth: 3.53, startPointHeightMultipier: 0.2, width: 0.04, heightMultipier: 0.3 },
        { startPointWidth: 3.66, startPointHeightMultipier: 0.35, width: 0.04, heightMultipier: 0.65 },
        { startPointWidth: 3.7, startPointHeightMultipier: 0.35, width: 0.13, heightMultipier: 0.05 },
        { startPointWidth: 3.83, startPointHeightMultipier: 0.65, width: 0.27, heightMultipier: 0.05 },
        { startPointWidth: 4.1, startPointHeightMultipier: 0.4, width: 0.04, heightMultipier: 0.6 },
        { startPointWidth: 2.16, startPointHeightMultipier: 0.7, width: 0.06, heightMultipier: 0.05 },
        { startPointWidth: 2.33, startPointHeightMultipier: 0.5, width: 0.06, heightMultipier: 0.05 },
        { startPointWidth: 2.50, startPointHeightMultipier: 0.3, width: 0.06, heightMultipier: 0.05 },
        { startPointWidth: 2.66, startPointHeightMultipier: 0.1, width: 0.06, heightMultipier: 0.05 },
        { startPointWidth: 3.033, startPointHeightMultipier: 0.5, width: 0.06, heightMultipier: 0.05 },
        { startPointWidth: 4.2, startPointHeightMultipier: 0.1, width: 0.1, heightMultipier: 0.05 },
    ];
    groundValues = [
        { startPointWidth: 0, startPointHeightMultipier: 0.9, width: 1.33, heightMultipier: 0.1 },
        { startPointWidth: 1.5, startPointHeightMultipier: 0.9, width: 0.83, heightMultipier: 0.1 },
        { startPointWidth: 3, startPointHeightMultipier: 0.9, width: 1.33, heightMultipier: 0.1 },
        { startPointWidth: 4.5, startPointHeightMultipier: 0.9, width: 1.33, heightMultipier: 0.1 },
    ];

    waterValues = [
        { startPointWidth: 1.33, startPointHeightMultipier: 0.96, width: 0.17, heightMultipier: 0.04 },
        { startPointWidth: 2.33, startPointHeightMultipier: 0.96, width: 0.67, heightMultipier: 0.04 },
        { startPointWidth: 4.33, startPointHeightMultipier: 0.96, width: 0.17, heightMultipier: 0.04 },
    ];

    pokeballsValues: Pick<ImageCreateHelper, 'drawPointWidthMultiplier' | 'drawPointHeightMultiplier'>[] = [
        { drawPointWidthMultiplier: 0.033, drawPointHeightMultiplier: 0.25 },
        { drawPointWidthMultiplier: 1.166, drawPointHeightMultiplier: 0.4 },
        { drawPointWidthMultiplier: 1.32, drawPointHeightMultiplier: 0.3 },
        { drawPointWidthMultiplier: 2.75, drawPointHeightMultiplier: 0.05 },
        { drawPointWidthMultiplier: 3.76, drawPointHeightMultiplier: 0.85 },
        { drawPointWidthMultiplier: 4.41, drawPointHeightMultiplier: 0.35 },
    ];

    oponentsValues: ImageCreateHelper[] = [
        { drawPointWidthMultiplier: 0.3, drawPointHeightMultiplier: 0.7, isOnFloor: false, oponentType: OponentEnum.meowth},
        { drawPointWidthMultiplier: 0.8, drawPointHeightMultiplier: 0.9, isOnFloor: true, oponentType: OponentEnum.meowth },
        { drawPointWidthMultiplier: 2, drawPointHeightMultiplier: 0.9, isOnFloor: true, oponentType: OponentEnum.meowth },
        { drawPointWidthMultiplier: 3.33, drawPointHeightMultiplier: 0.9, isOnFloor: true, oponentType: OponentEnum.meowth },
        { drawPointWidthMultiplier: 3.93, drawPointHeightMultiplier: 0.9, isOnFloor: true, oponentType: OponentEnum.meowth },
    ]

    treesValue: Pick<ImageCreateHelper, 'drawPointWidthMultiplier'>[] =
        [
            { drawPointWidthMultiplier: 0.33 },
            { drawPointWidthMultiplier: 0.95 },
            { drawPointWidthMultiplier: 1.95},
            { drawPointWidthMultiplier: 3.2 },
            { drawPointWidthMultiplier: 4.23 },
        ];
    readonly time = 240;


}