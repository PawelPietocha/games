import { Injectable } from "@angular/core";
import { Viewport } from "../../../models/viewPort";
import { FilledRectangle } from "../../../models/shapes/filledRectangle";
import { ImageForCanvas } from "../../../models/shapes/imageForCanvas";
import { CanvasHelper } from "../../../models/helpers/canvas-helper";

@Injectable({
    providedIn: 'root',
})
export class ViewportService {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D;
    private viewPort: Viewport;

    constructor() {
        
    }

    prepareService(canvasHelper: CanvasHelper) {
        this.canvas = canvasHelper.canvas;
        this.ctx = canvasHelper.ctx;
        this.resetViewportToDefaultValues();
    }

    resetViewportToDefaultValues() {
        this.viewPort = { minWidth: 0, maxWidth: this.canvas.width };
    }

    moveViewPortToRight(shift: number) {
        this.ctx.translate(-shift, 0);
        this.viewPort.minWidth += shift;
        this.viewPort.maxWidth += shift;
    }

    isImageOnViewPort(image: ImageForCanvas): boolean {
        const leftSide = image.point.width - image.width / 2;
        const rightSide = image.point.width + image.width / 2;

        return leftSide < this.viewPort.maxWidth && rightSide > this.viewPort.minWidth
    }

    isHeroOnViewPort(hero: ImageForCanvas): boolean {
        return (hero.point.width - hero.width / 2) > this.viewPort.minWidth;
    }

    isRectangleOnViewPort(rectangle: FilledRectangle): boolean {
        const leftSide = rectangle.startPoint.width
        const rightSide = rectangle.startPoint.width + rectangle.width;

        return leftSide < this.viewPort.maxWidth && rightSide > this.viewPort.minWidth
    }

    isImageOnCenterOfViewPort(image: ImageForCanvas): boolean {
        return image.point.width > (this.viewPort.minWidth + this.viewPort.maxWidth) / 2
    }
}