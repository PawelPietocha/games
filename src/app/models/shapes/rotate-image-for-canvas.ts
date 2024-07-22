import { ImageForCanvas } from "./imageForCanvas";
import { Point } from "./point";


export class RotateImageForCanvas extends ImageForCanvas {
    rotateDegree: number;
    actualRotateDegree: number;

    constructor(src: string, point: Point, width: number, height: number, rotateDegree: number, canvas?: HTMLCanvasElement, visible: boolean = true) {
        super(src, point, width, height, canvas, visible);
        this.rotateDegree = rotateDegree;
        this.actualRotateDegree = 0;
    }
}