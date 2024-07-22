import { Point } from "../../../models/shapes/point";
import { OponentEnum } from "./oponent-enum";
import { PlatformOponent } from "./platform-oponents";

export class MeowthOponent extends PlatformOponent {

    goLeft: boolean;
    isOnFloor: boolean;
    srcRight = 'assets/Pokemons/enemies/meowth-left.png';
    srcLeft = 'assets/Pokemons/enemies/meowth.png';
    override oponentType = OponentEnum.meowth;

    constructor(
        point: Point,
        isOnFloor: boolean,
        canvas?: HTMLCanvasElement,
        visible: boolean = true,
        width = 0.05,
        height = 0.1,
        src: string = 'assets/Pokemons/enemies/meowth-left.png') {
        super(src, point, width, height, canvas, visible );
        this.isOnFloor = isOnFloor;
        this.point.height -= this.height / 2;
    }

}