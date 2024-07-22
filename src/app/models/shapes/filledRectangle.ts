import { MoveableShape } from "./moveable-shape";
import { Point } from "./point";


export class FilledRectangle implements MoveableShape {
    startPoint: Point;
    width: number;
    height: number;
    color: string;
    point: Point;

    constructor(startPoint: Point, width: number, height: number, color: string, canvas?: HTMLCanvasElement) {
        if (canvas) {
            this.startPoint = {
                width: startPoint.width * canvas.width,
                height: startPoint.height * canvas.height
            };
            this.width = width * canvas.width,
                this.height = height * canvas.height
            this.point =
            {
                width: (startPoint.width + width / 2) * canvas.width,
                height: (startPoint.height + height / 2) * canvas.height
            };
        }
        else {
            this.startPoint = startPoint;
            this.width = width;
            this.height = height;
            this.point =
            {
                width: startPoint.width + width / 2,
                height: startPoint.height + height / 2
            };
        }

        this.color = color;
    }
}