import { MoveableShape } from "./moveable-shape";
import { Point } from "./point";

export class ImageForCanvas implements MoveableShape {
    image: HTMLImageElement;
    src: string;
    point: Point;
    width: number;
    height: number;
    visible: boolean;

    constructor(src: string, point: Point, width: number, height: number, canvas?: HTMLCanvasElement, visible: boolean = true) {
        this.image = new Image();
        this.image.src = src;
        if(canvas) {
            this.point = {width: point.width * canvas.width, height: point.height * canvas.height};
            this.width = width * canvas.width;
            this.height = height * canvas.height;
        }
        else {
            this.point = {width: point.width, height: point.height};
            this.width = width;
            this.height = height;
        }
        this.visible = visible;
    }
}