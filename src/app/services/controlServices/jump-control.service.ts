import { Injectable } from "@angular/core";
import { Interval } from "../../shared/intervals/interval";
import { CanvasHelper } from "../../models/helpers/canvas-helper";
import { MoveableShape } from "../../models/shapes/moveable-shape";

@Injectable({
    providedIn: 'root',
})
export class JumpControlService {

    private isJumping = false;
    private loopCount = 0;
    private maxJumpHeightLocal: number;
    private isFallingDown: boolean;
    maxJumpHeight: number;

    setPrematureEndJumpInterval(fn: () => boolean): void {
        this.prematureEndJumpInterval = fn;
    }

    setConditionToPreventGravity(fn: () => boolean): void {
        this.conditionToPreventGravity = fn;
    }

    setGravityInterval(hero: MoveableShape, heroMovementSpeed: number): Interval {
        return new Interval(
            this.gravityIntervalAction.bind(this, hero, heroMovementSpeed),
            () => false,
            () => {},
            this.conditionToPreventFallDown.bind(this),
            () => this.setFallingDown(false)
        )
    }

    setJumpInterval(hero: MoveableShape, heroMovementSpeed: number, canvasHelper: CanvasHelper): Interval | null {
        if (this.isJumping || this.isFallingDown) {
            return null
        }
        this.maxJumpHeightLocal = this.maxJumpHeight / heroMovementSpeed;
        this.switchIsJumping();
        return new Interval(
            this.jumpIntervalAction.bind(this, hero, heroMovementSpeed),
            this.conditionToEndJumpInterval.bind(this, canvasHelper, this.maxJumpHeightLocal),
            this.onEndJumping.bind(this))
    }

    private jumpIntervalAction(hero: MoveableShape, heroMovementSpeed: number): void {
        hero.point.height -= heroMovementSpeed;
        this.loopCount += 1;
    }

    private conditionToEndJumpInterval(canvasHelper: CanvasHelper, maxJumpHeight: number): boolean {
        return this.loopCount === Math.floor(maxJumpHeight * canvasHelper.canvas.height) || this.prematureEndJumpInterval()
    }

    private prematureEndJumpInterval(): boolean {
        return false;
    }

    private switchIsJumping(): void {
        this.isJumping = !this.isJumping;
    }

    private setFallingDown(isFallingDown: boolean): void {
        this.isFallingDown = isFallingDown;
    }

    private onEndJumping(): void {
        this.loopCount = 0;
        this.switchIsJumping();
    }

    private gravityIntervalAction(hero: MoveableShape, heroMovementSpeed: number) {
        this.setFallingDown(true);
        hero.point.height += heroMovementSpeed;
    }

    private conditionToPreventGravity(): boolean {
        return false;
    }

    private conditionToPreventFallDown(): boolean {
        return this.conditionToPreventGravity() || this.isJumping
    }
}