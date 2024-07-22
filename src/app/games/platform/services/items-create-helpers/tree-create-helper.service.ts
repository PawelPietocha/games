import { Injectable } from "@angular/core";
import { ImageForCanvas } from "../../../../models/shapes/imageForCanvas";
import { ShapeCreateHelperService } from "../../../../services/shape-create-helper.service";
import { BaseLevel } from "../../levels/baseLevel";

@Injectable({
    providedIn: 'root',
})
export class TreeCreateHelperService {
    constructor(private shapeCreateHelperService: ShapeCreateHelperService){

    }
    createTrees(dynamicLevel: BaseLevel): ImageForCanvas[] {
        const treesArray = dynamicLevel.treesValue.map(tree => {
            return {
                src: dynamicLevel.treesGlobalValues.src,
                widthMultiplier: dynamicLevel.treesGlobalValues.widthMultiplier,
                heightMultiplier: dynamicLevel.treesGlobalValues.heightMultiplier,
                drawPointWidthMultiplier: tree.drawPointWidthMultiplier,
                drawPointHeightMultiplier: dynamicLevel.treesGlobalValues.drawPointHeightMultiplier
            }
        })
        return this.shapeCreateHelperService.createBasicImageArray(treesArray);
    }

}