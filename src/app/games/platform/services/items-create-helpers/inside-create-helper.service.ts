import { Injectable } from "@angular/core";
import { ImageCreateHelper } from "../../../../models/helpers/image-create-helper";
import { RectangleCreateHelper } from "../../../../models/helpers/rectangle-create-helper";
import { ImageForCanvas } from "../../../../models/shapes/imageForCanvas";

@Injectable({
    providedIn: 'root',
})

export class InsideCreateHelperService {
    getInside(itemToCreate: ImageCreateHelper, mainItems: RectangleCreateHelper[], canvas: HTMLCanvasElement): ImageForCanvas[] {
        const insides: ImageForCanvas[] = [];
        mainItems.forEach(mainItem => {
            const inside = new ImageForCanvas(
                itemToCreate.src,
                {
                    width: mainItem.startPointWidth + mainItem.width / 2,
                    height: mainItem.startPointHeightMultipier + mainItem.heightMultipier / 2
                },
                mainItem.width,
                mainItem.heightMultipier,
                canvas
            );
            insides.push(inside);
        });
        return insides;
    }
}