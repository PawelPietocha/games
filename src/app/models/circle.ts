import { MoveableShape } from "./moveable-shape";
import { Point } from "./point";

export class Circle implements MoveableShape {
    point: Point;
    radius: number;
    color: string;
    width: number;
    height: number;

    constructor(point: Point, radius: number, color: string) {
        this.point = point;
        this.radius = radius;
        this.color = color;
        this.width = this.radius * 2;
        this.height = this.radius * 2;
    }
}
