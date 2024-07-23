import { Injectable } from "@angular/core";
import { Interval } from "../../shared/intervals/interval";

@Injectable({
    providedIn: 'root',
})
export class ShotControlService {
    
    setIsFulfilkedMainCondition(fn: () => boolean) {
        this.isFulfilledMainCondition = fn;
    }

    setConditionToEndShotInterval(fn: () => boolean) {
        this.conditionToEndShotInterval = fn;
    }

    setBeforeShotAtion(fn: () => boolean) {
        this.beforeShotAction = fn;
    }

    setActionAfterInterval(fn: () => boolean) {
        this.actionAfterInterval = fn;
    }

    setShotIntervalAction(fn: () => boolean) {
        this.shotIntervalAction = fn;
    }

    setShotInterval(): Interval | null {
        if (! this.isFulfilledMainCondition()) {
            return null
        }
        this.beforeShotAction();
        return new Interval(
            this.shotIntervalAction.bind(this),
            this.conditionToEndShotInterval.bind(this),
            this.actionAfterInterval.bind(this),
        )
    }

    private isFulfilledMainCondition(): boolean {
        return false;
    }

    private shotIntervalAction(): void {
    }

    private beforeShotAction(): void {
    }

    private conditionToEndShotInterval(): boolean {
        return false;
    }

    private actionAfterInterval(): void {
    }
}