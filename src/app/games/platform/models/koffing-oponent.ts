import { Point } from "../../../models/point";
import { OponentEnum } from "./oponent-enum";
import { PlatformOponent } from "./platform-oponents";

export class KoffingOponent extends PlatformOponent {
    isGoingUp: boolean = true;
    override oponentType = OponentEnum.koffing;
    rotateDegree = 0;
    actualRotateDegree = 0;
    defaultRotateDegree = -9;
    highestPoint = 0.7;
    nearestPoint = 1.3;
    

    constructor(
        point: Point,
        canvas?: HTMLCanvasElement, 
        width: number = 0.1,
        height: number = 0.2,
        src: string = "assets/Pokemons/enemies/koffing.png",
        visible: boolean = true) {
        super(src, point, width, height, canvas, visible);
    }
}