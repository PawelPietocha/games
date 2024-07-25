import { Injectable } from "@angular/core";
import { Interval } from "../../shared/intervals/interval";
import { CanvasHelper } from "../../models/helpers/canvas-helper";
import { Hero } from "../../games/platform/models/hero";

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

    setGravityInterval(hero: Hero): Interval {
        return new Interval(
            this.gravityIntervalAction.bind(this, hero),
            () => false,
            () => {},
            this.conditionToPreventFallDown.bind(this),
            () => this.setFallingDown(false)
        )
    }

    setJumpInterval(hero: Hero, canvasHelper: CanvasHelper): Interval | null {
        if (this.isJumping || this.isFallingDown) {
            return null
        }
        this.maxJumpHeightLocal = this.maxJumpHeight / hero.movementSpeed;
        this.switchIsJumping();
        return new Interval(
            this.jumpIntervalAction.bind(this, hero),
            this.conditionToEndJumpInterval.bind(this, canvasHelper, this.maxJumpHeightLocal),
            this.onEndJumping.bind(this))
    }

    private jumpIntervalAction(hero: Hero): void {
        hero.point.height -= hero.movementSpeed
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

    private gravityIntervalAction(hero: Hero) {
        this.setFallingDown(true);
        hero.point.height += hero.movementSpeed
    }

    private conditionToPreventGravity(): boolean {
        return false;
    }

    private conditionToPreventFallDown(): boolean {
        return this.conditionToPreventGravity() || this.isJumping
    }
}