import { Injectable } from "@angular/core";
import { DrawService } from "../../../services/draw.service";
import { PlatformOponent } from "../models/platform-oponents";
import { PlatformGradientValues } from "../models/platform-gradient-values";
import { ImageForCanvas } from "../../../models/shapes/imageForCanvas";
import { PokemonHero } from "../models/pokemon-hero";
import { OponentEnum } from "../models/oponent-enum";
import { KoffingOponent } from "../models/koffing-oponent";
import { FilledRectangle } from "../../../models/shapes/filledRectangle";
import { RotateImageForCanvas } from "../../../models/shapes/rotate-image-for-canvas";
import { PokemonDataService } from "./pokemon-data.service";
import { ViewportService } from "./viewport.service";

@Injectable({
    providedIn: 'root',
})

export class DrawPlaftormService {
    private ctx: CanvasRenderingContext2D;
    private rectangles: FilledRectangle[] = [];
    private images: ImageForCanvas[] = [];
    private hero: PokemonHero;

    constructor(
        private drawService: DrawService,
        private dataService: PokemonDataService,
        private viewportService: ViewportService
    ) { }

    initValues() {
        this.hero = this.dataService.hero;
        this.rectangles.push(
            ...this.dataService.grounds,
            ...this.dataService.platforms,
            ...this.dataService.water);
        this.images.push(
            ...this.dataService.nonIntrusiveImages,
            ...this.dataService.coins,
            ...this.dataService.pokeballs,
            ...this.dataService.oponents,
            this.dataService.finishImage,
            this.dataService.laser,
            this.dataService.weapon,
        )
    }

    drawAll() {
        this.drawRectangles(this.rectangles);
        this.drawSimpleImages(this.images);
        this.drawHero(this.hero);
    }

    prepareService(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.initValues();
    }


    drawHero(hero: PokemonHero) {
        if(!hero) {
            return;
        }
        if (!hero.visible) {
            return;
        }

        if (hero.immune) {
            this.ctx.globalAlpha = 0.4;
            this.drawService.drawImage(this.ctx, hero);
            this.ctx.globalAlpha = 1;
        }
        else {
            if (hero.opacity <= 0) {
                return;
            }
            this.ctx.globalAlpha = hero.opacity;
            this.drawService.drawImage(this.ctx, hero);
            this.ctx.globalAlpha = 1;
        }
    }

    drawRectangles(rectangles: FilledRectangle[], entryGradient?: PlatformGradientValues) {
        rectangles.forEach(rectangle => {
            if (this.viewportService.isRectangleOnViewPort(rectangle)) {
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
            if ((this.viewportService.isImageOnViewPort(oponent)) && oponent.visible) {
                if (oponent.oponentType === OponentEnum.koffing) {
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
            if (this.viewportService.isImageOnViewPort(image) && image.visible) {
                this.drawService.drawImage(this.ctx, image);
            }
        })
    }

    drawSimpleImage(image: ImageForCanvas) {
        if (this.viewportService.isImageOnViewPort(image) && image.visible) {
            this.drawService.drawImage(this.ctx, image);
        }
    }

    drawRotateImage(rotateImage: RotateImageForCanvas) {
        if (this.viewportService.isImageOnViewPort(rotateImage) && rotateImage.visible) {
            this.drawService.drawRotateImage(this.ctx, rotateImage)
        }
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