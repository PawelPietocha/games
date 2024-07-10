import { ImageForCanvas } from "../../../models/imageForCanvas";
import { Point } from "../../../models/point";
import { OponentEnum } from "./oponent-enum";


export class PlatformOponent extends ImageForCanvas {

    oponentType: OponentEnum;

    constructor(src: string, point: Point, width: number, height: number, canvas?: HTMLCanvasElement, visible: boolean = true) {
        super(src, point, width, height, canvas, visible);
    }
}