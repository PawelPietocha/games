import { Injectable } from "@angular/core";
import { DrawService } from "../../../services/draw.service";
import { FilledRectangle } from "../../../models/filledRectangle";
import { PlatformOponent } from "../models/platform-oponents";
import { PlatformGradientValues } from "../models/platform-gradient-values";
import { ImageForCanvas } from "../../../models/imageForCanvas";
import { Viewport } from "../../../models/viewPort";
import { RotateImageForCanvas } from "../../../models/rotate-image-for-canvas";
import { PokemonHero } from "../../../models/pokemon-hero";
import { OponentEnum } from "../models/oponent-enum";
import { KoffingOponent } from "../models/koffing-oponent";

@Injectable({
    providedIn: 'root',
})

export class DrawPlaftormService {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D;
    private viewPort: Viewport;

    constructor(private drawService: DrawService) { }

    prepareService(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
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

    drawHero(hero: PokemonHero) {
        if (!hero.visible) {
            return;
        }

        if (hero.immune) {
            this.ctx.globalAlpha = 0.4;
            this.drawService.drawImage(this.ctx, hero);
            this.ctx.globalAlpha = 1;
        }
        else {
            if(hero.opacity <= 0) {
                return;
            }
            this.ctx.globalAlpha = hero.opacity;
            this.drawService.drawImage(this.ctx, hero);
            this.ctx.globalAlpha = 1;

        }
    }

    drawRectangles(rectangles: FilledRectangle[], entryGradient?: PlatformGradientValues) {

        rectangles.forEach(rectangle => {
            if (this.isRectangleOnViewPort(rectangle)) {
                if (entryGradient) {
                    const gradient = this.getLinearGradient(rectangle, entryGradient);
                    this.drawService.drawLinearGradientRectangle(this.ctx, rectangle, gradient);
                }
                else {
                    this.drawService.drawFilledRectangle(this.ctx, rectangle);
                }
            }
        })
    }

    drawOponents(oponents: PlatformOponent[]) {
        oponents.forEach(oponent => {
            if ((this.isImageOnViewPort(oponent)) && oponent.visible) {
                if(oponent.oponentType === OponentEnum.koffing) {
                    this.drawService.drawKoffing(this.ctx, oponent as KoffingOponent);
                }
                else {
                    this.drawService.drawImage(this.ctx, oponent);
                }
            }
        })
    }

    drawSimpleImages(images: ImageForCanvas[]) {
        images.forEach(image => {
            if (this.isImageOnViewPort(image) && image.visible) {
                this.drawService.drawImage(this.ctx, image);
            }
        })
    }

    drawSimpleImage(image: ImageForCanvas) {
        if (this.isImageOnViewPort(image) && image.visible) {
            this.drawService.drawImage(this.ctx, image);
        }
    }

    drawRotateImage(rotateImage: RotateImageForCanvas) {
        if (this.isImageOnViewPort(rotateImage) && rotateImage.visible) {
            this.drawService.drawRotateImage(this.ctx, rotateImage)
        }
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

    getLinearGradient(platform: FilledRectangle, gradientValues: PlatformGradientValues): CanvasGradient {
        const gradient = this.ctx.createLinearGradient(
            platform.startPoint.width, platform.startPoint.height,
            platform.startPoint.width, platform.startPoint.height + platform.height);
        const ratio = gradientValues.higherColorHeight / platform.height;
        gradient.addColorStop(0, gradientValues.higherColor);
        gradient.addColorStop(ratio, gradientValues.lowerColor);
        return gradient;
    }
}