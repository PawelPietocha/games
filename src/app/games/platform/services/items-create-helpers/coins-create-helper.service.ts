import { Injectable } from "@angular/core";
import { ShapeCreateHelperService } from "../../../../services/shape-create-helper.service";
import { BaseLevel } from "../../levels/baseLevel";
import { ImageForCanvas } from "../../../../models/shapes/imageForCanvas";

@Injectable({
    providedIn: 'root',
})
export class CoinsCreateHelperService {
    constructor(private shapeCreateHelperService: ShapeCreateHelperService) { }
    createCoins(dynamicLevel: BaseLevel): ImageForCanvas[] {
        
        const coins = dynamicLevel.platformValues.map(platform => {
            return {
                src: dynamicLevel.globalCoinValues.src,
                drawPointWidthMultiplier: platform.startPointWidth + platform.width / 2,
                drawPointHeightMultiplier: platform.startPointHeightMultipier - 0.05,
                widthMultiplier: dynamicLevel.globalCoinValues.widthMultiplier,
                heightMultiplier: dynamicLevel.globalCoinValues.heightMultiplier
            }
        })
        return this.shapeCreateHelperService.createBasicImageArray(coins);
    }
}