import { ImageForCanvas } from "../../../models/shapes/imageForCanvas";
import { Point } from "../../../models/shapes/point";

export class Hero extends ImageForCanvas {
    movementSpeed: number;

    constructor(src: string, point: Point, width: number, height: number, movementSpeed: number, canvas?: HTMLCanvasElement, visible: boolean = true) {
        super(src, point, width, height, canvas, visible);
        this.movementSpeed = movementSpeed;
    }
}