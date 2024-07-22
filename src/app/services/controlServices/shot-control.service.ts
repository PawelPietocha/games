import { Injectable } from "@angular/core";
import { MoveableShape } from "../../models/shapes/moveable-shape";
import { Interval } from "../../shared/intervals/interval";

@Injectable({
    providedIn: 'root',
})
export class ShotControlService {

    shape: MoveableShape;
    speed: number;
    movingFromRightToLeft: boolean;

    setIsEnoughtAmunition(fn: () => boolean) {
        this.isEnoughtAmunition = fn;
    }

    setIsFulfilkedMainCondition(fn: () => boolean) {
        this.isFulfilledMainCondition = fn;
    }

    setShotInterval(): Interval | null {
        if (!(this.isEnoughtAmunition && this.isFulfilledMainCondition)) {
            return null
        }

        return new Interval(
            this.shotIntervalAction.bind(this),
        )
    }

    private isEnoughtAmunition(): boolean {
        return false;
    }

    private isFulfilledMainCondition(): boolean {
        return false;
    }

    private shotIntervalAction(): void {
        if (this.movingFromRightToLeft) {
            this.shape.point.width -= this.speed;
        }
        this.shape.point.width += this.speed;
    }

    private conditionToEndShotInterval(): boolean {
        return false;
    }

}