import { PokemonForms } from "../games/platform/models/pokemon-forms";
import { Point } from "./point";
import { RotateImageForCanvas } from "./rotate-image-for-canvas";

export class PokemonWeapon extends RotateImageForCanvas {
    shouldBulletGoingRight = true;
    inUse = false;
    bulletCount: number = 0;

    constructor(src: string, point: Point, width: number, height: number, rotateDegree: number, canvas?: HTMLCanvasElement, visible: boolean = true) {
        super(src, point, width, height, rotateDegree, canvas, visible);
    }

    changeBulletDirection() {
        if (!this.inUse) {
            this.shouldBulletGoingRight = this.shouldBulletGoingRight ? false : true;
        }
    }

    startBullet() {
        this.inUse = true;
        this.visible = true;
        this.bulletCount -= 1;
    }

    isWeaponReady(pokemonForm: PokemonForms): boolean {
        return !(this.inUse ||
            pokemonForm !== PokemonForms.finalForm ||
            this.bulletCount === 0)
    }

    changeWeaponWidthPosition(shift: number) {
        if (this.shouldBulletGoingRight) {
            this.point.width += shift;
        }
        else {
            this.point.width -= shift;
        }
    }
}