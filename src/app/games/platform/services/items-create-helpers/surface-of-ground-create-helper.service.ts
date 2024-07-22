import { Injectable } from "@angular/core";
import { ImageForCanvas } from "../../../../models/shapes/imageForCanvas";
import { BaseLevel } from "../../levels/baseLevel";

@Injectable({
    providedIn: 'root',
})

export class SufraceOfGroundCreateHelperService {
    getSurfaceOfGround(dynamicLevel: BaseLevel, canvas: HTMLCanvasElement ): ImageForCanvas[] {
        const surfacesOfGround: ImageForCanvas[] = [];
        dynamicLevel.groundValues.forEach(ground => {
            const count = this.calculateHowManySurfaceImageCountInGround(ground.width, 0.2, 0.4);
            const width = ground.width / count;
            let actualWidth = ground.startPointWidth + width / 2;
            for (let i = 1; i <= count; i++) {
                const surfaceOfGround = new ImageForCanvas(
                    dynamicLevel.surfaceOfGround.src,
                    {
                        width: actualWidth,
                        height: dynamicLevel.surfaceOfGround.drawPointHeightMultiplier
                    },
                    width,
                    dynamicLevel.surfaceOfGround.heightMultiplier,
                    canvas
                );
                surfacesOfGround.push(surfaceOfGround);
                actualWidth += width;
            }
        })
        return surfacesOfGround;
    }

    private calculateHowManySurfaceImageCountInGround(groundWidth: number, minWidthOfImage: number, maxWidthOfImage: number): number {
        const minCount = groundWidth / minWidthOfImage;
        const maxCount = groundWidth / maxWidthOfImage;
        return Math.floor((minCount + maxCount) / 2);
    }
}