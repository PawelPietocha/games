import { Injectable } from "@angular/core";
import { ShapeCreateHelperService } from "../../../../services/shape-create-helper.service";
import { ImageForCanvas } from "../../../../models/shapes/imageForCanvas";
import { ImageCreateHelper } from "../../../../models/helpers/image-create-helper";

@Injectable({
    providedIn: 'root',
})
export class RepetableItemsCreateHelperService {
    constructor(private shapeCreateHelperService: ShapeCreateHelperService) { }

    createItems(imageCreateHelper: ImageCreateHelper, finishImage: ImageCreateHelper): ImageForCanvas[] {
        const items: ImageForCanvas[] = [];
        const countOfItems = Math.floor(finishImage.drawPointWidthMultiplier / imageCreateHelper.repetableBreakBetween);
        for (let i = 1; i <= countOfItems; i++) {
            items.push(this.shapeCreateHelperService.createBasicImage(imageCreateHelper));
            imageCreateHelper.drawPointWidthMultiplier += imageCreateHelper.repetableBreakBetween;
        }
        return items;
    }
}