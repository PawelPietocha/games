import { Injectable } from "@angular/core";
import { ImageForCanvas } from "../../../../models/shapes/imageForCanvas";
import { BaseLevel } from "../../levels/baseLevel";
import { ShapeCreateHelperService } from "../../../../services/shape-create-helper.service";

@Injectable({
    providedIn: 'root',
})
export class PokeballCreateHelperService {
    constructor(private shapeCreateHelperService: ShapeCreateHelperService) { }
    createPokeballs(dynamicLevel: BaseLevel): ImageForCanvas[] {
        const pokeballsAray = dynamicLevel.pokeballsValues.map(pokeball => {
            return {
                src: dynamicLevel.pokeballGlobalValues.src,
                drawPointWidthMultiplier: pokeball.drawPointWidthMultiplier,
                drawPointHeightMultiplier: pokeball.drawPointHeightMultiplier,
                widthMultiplier: dynamicLevel.pokeballGlobalValues.widthMultiplier,
                heightMultiplier: dynamicLevel.pokeballGlobalValues.heightMultiplier
            }
        })
        return this.shapeCreateHelperService.createBasicImageArray(pokeballsAray);
    }
}