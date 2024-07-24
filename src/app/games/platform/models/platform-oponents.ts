import { ImageForCanvas } from "../../../models/shapes/imageForCanvas";
import { Point } from "../../../models/shapes/point";
import { MathService } from "../../../services/math.service";
import { PokemonDataService } from "../services/pokemon-data.service";
import { OponentEnum } from "./oponent-enum";


export class PlatformOponent extends ImageForCanvas {

    oponentType: OponentEnum;

    constructor(src: string, point: Point, width: number, height: number, canvas?: HTMLCanvasElement, visible: boolean = true) {
        super(src, point, width, height, canvas, visible);
    }

    move(): void { }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    shouldChangeDirection(_dataService: PokemonDataService, _mathService?: MathService): boolean { return false }
    changeDirection(): void {}
}