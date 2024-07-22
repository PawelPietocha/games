import { Injectable } from "@angular/core";
import { ImageForCanvas } from "../../../../models/shapes/imageForCanvas";
import { BaseLevel } from "../../levels/baseLevel";

@Injectable({
    providedIn: 'root',
})
export class SurfaceOfPlatformCreateHelperService {
    getSurfaceOfPlatform(dynamicLevel: BaseLevel, canvas: HTMLCanvasElement): ImageForCanvas[] {
        const surfacesOfPlatform: ImageForCanvas[] = [];
        dynamicLevel.platformValues.forEach(platform => {
            const surface = new ImageForCanvas(
                dynamicLevel.surfaceOfPlatform.src,
                {
                    width: platform.startPointWidth + platform.width / 2,
                    height: platform.startPointHeightMultipier - dynamicLevel.surfaceOfPlatform.heightMultiplier / 2
                },
                platform.width,
                dynamicLevel.surfaceOfPlatform.heightMultiplier,
                canvas
            );
            surfacesOfPlatform.push(surface);
        });
        return surfacesOfPlatform;
    }
}