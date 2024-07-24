import { FilledRectangle } from "../../../models/shapes/filledRectangle";
import { Point } from "../../../models/shapes/point";
import { MathService } from "../../../services/math.service";
import { PokemonDataService } from "../services/pokemon-data.service";
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
        super(src, point, width, height, canvas, visible);
        this.isOnFloor = isOnFloor;
        this.point.height -= this.height / 2;
    }

    override move(): void {
        if (this.goLeft) {
            this.point.width -= 1;
        }
        else {
            this.point.width += 1;
        }
    }

    override shouldChangeDirection(dataService: PokemonDataService, mathService: MathService): boolean {
        const surface = this.isOnFloor ? dataService.grounds : dataService.platforms;
        return !this.isMeowthTangleWithSurface(surface, mathService) || this.didMeowthHitPlatform(dataService.platforms, mathService)
    }

    override changeDirection(): void {
        this.goLeft = !this.goLeft;
        if (this.goLeft) {
            this.image.src = this.srcLeft;
        }
        else {
            this.image.src = this.srcRight;
        }
    }

    private didMeowthHitPlatform(platforms: FilledRectangle[], mathService: MathService): boolean {
        return platforms.some(platform =>
            mathService.isImageAndRectangleTangleFromRightRectangleSide(this, platform)
        ) ||
            platforms.some(platform =>
                mathService.isImageAndRectangleTangleFromLeftRectangleSide(this, platform)
            )
    }

    private isMeowthTangleWithSurface(surface: FilledRectangle[], mathService: MathService): boolean {
        return surface.some(rectangle =>
            mathService.isAllImageAndRectangleTangleFromTopSide(this, rectangle)
        )
    }
}