import { GameState } from "../../models/gameState";
import { Globals } from "../globals";

export class Interval {

    timeInMiliseconds: number;
    private interval: string | number | NodeJS.Timeout;
    action(): void { }
    conditionToEnd(): boolean { return false; }
    actionAfterEndInterval(): void { }
    conditionToPreventAction(): boolean { return false; }
    insteadAction(): void { }

    constructor(
        action: () => void,
        conditionToEnd = () => false,
        actionAfterEndInterval = () => { },
        conditionToPreventAction = () => false,
        insteadAction = () => { },
        timeInMiliseconds: number = 10) {
        this.action = action;
        this.conditionToEnd = conditionToEnd;
        this.actionAfterEndInterval = actionAfterEndInterval;
        this.conditionToPreventAction = conditionToPreventAction;
        this.insteadAction = insteadAction;
        this.timeInMiliseconds = timeInMiliseconds;
        this.startInterval();
    }

    startInterval(): void {
        this.interval = setInterval(() => {
            if (Globals.gameState !== GameState.running) {
                return;
            }
            if (this.conditionToPreventAction()) {
                this.insteadAction();
                return;
            }
            if (this.conditionToEnd()) {
                clearInterval(this.interval);
                this.actionAfterEndInterval();
            }
            this.action();
        }, this.timeInMiliseconds)
    }

    clearInterval(): void {
        if (this.interval !== null) {
            clearInterval(this.interval);
        }
    }
}