import { Injectable } from "@angular/core";
import { ImageCreateHelper } from "../models/helpers/image-create-helper";
import { RectangleCreateHelper } from "../models/helpers/rectangle-create-helper";
import { FilledRectangle } from "../models/shapes/filledRectangle";
import { ImageForCanvas } from "../models/shapes/imageForCanvas";

@Injectable({
    providedIn: 'root',
})
export class ShapeCreateHelperService {
    private canvas: HTMLCanvasElement;

    createCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }
    createFilledRectangle(rectangleCreateHelper: RectangleCreateHelper, color: string): FilledRectangle {
        return new FilledRectangle(
            {
                width: rectangleCreateHelper.startPointWidth,
                height: rectangleCreateHelper.startPointHeightMultipier
            },
            rectangleCreateHelper.width,
            rectangleCreateHelper.heightMultipier,
            color,
            this.canvas
        )
    }

    createFilledRectangleArray(rectangleCreateHelperArray: RectangleCreateHelper[], color: string): FilledRectangle[] {
        return rectangleCreateHelperArray.map(rectangle => this.createFilledRectangle(rectangle, color));
    }

    createBasicImage(image: ImageCreateHelper): ImageForCanvas {
        return new ImageForCanvas(
            image.src,
            {
                width: image.drawPointWidthMultiplier,
                height: image.drawPointHeightMultiplier
            },
            image.widthMultiplier, image.heightMultiplier,
            this.canvas);
    }

    createBasicImageArray(images: ImageCreateHelper[]): ImageForCanvas[] {
        return images.map(image => this.createBasicImage(image));
    }
}