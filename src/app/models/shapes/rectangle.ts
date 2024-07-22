import { Point } from "./point";

export class Rectangle{
    pointA: Point;
    pointB: Point;
    pointC: Point;
    pointD: Point;
    color: string;
    constructor(pointA: Point, pointB: Point, pointC: Point, pointD: Point, color: string) {
        this.pointA = pointA;
        this.pointB = pointB;
        this.pointC = pointC;
        this.pointD = pointD;
        this.color = color;
    }
}
