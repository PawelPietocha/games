import { Point } from "../../../models/shapes/point";
import { PokemonDataService } from "../services/pokemon-data.service";
import { OponentEnum } from "./oponent-enum";
import { PlatformOponent } from "./platform-oponents";

export class KoffingOponent extends PlatformOponent {
    isGoingUp: boolean = true;
    override oponentType = OponentEnum.koffing;
    rotateDegree = 0;
    actualRotateDegree = 0;
    defaultRotateDegree = -9;
    highestPoint = 0.7;
    lowestPoint = 1.3;


    constructor(
        point: Point,
        canvas?: HTMLCanvasElement,
        width: number = 0.1,
        height: number = 0.2,
        src: string = "assets/Pokemons/enemies/koffing.png",
        visible: boolean = true) {
        super(src, point, width, height, canvas, visible);
    }

    override move(): void {
        if (this.isGoingUp) {
            this.point.height -= 1;
        }
        else {
            this.point.height += 1;
        }
    }

    override changeDirection(): void {
        this.isGoingUp = !this.isGoingUp;
    }

    override shouldChangeDirection(dataService: PokemonDataService): boolean {
       return this.point.height <= this.highestPoint * dataService.canvasHelper.canvas.height || 
        this.point.height >= this.lowestPoint * dataService.canvasHelper.canvas.height
    }
}
