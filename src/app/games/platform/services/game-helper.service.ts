import { Injectable } from "@angular/core";
import { ScoreCollector } from "../models/score-collector.enum";
import { BehaviorSubject } from "rxjs";
import { EndGame } from "../models/end-game";

@Injectable({
    providedIn: 'root',
})

export class GameHelperService {

    endGame$: BehaviorSubject<EndGame> = new BehaviorSubject<EndGame>({isFinished: false, won: false})

    collectScore(item: ScoreCollector): number {
        switch (item) {
            case ScoreCollector.simpleRun:
                return 1;
            case ScoreCollector.killOponent:
                return 75;
            case ScoreCollector.firstEvolve:
                return 100;
            case ScoreCollector.secondEvolve:
                return 250;
            case ScoreCollector.catchedPokeball:
                return 50;
            case ScoreCollector.catchedCoin:
                return 20;
        }
    }
}