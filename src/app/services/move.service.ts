import { Injectable } from "@angular/core";
import { Point } from "../models/point";
import { Circle } from "../models/circle";
import { Subject } from "rxjs";
import { ImageForCanvas } from "../models/imageForCanvas";
import { GameState } from "../models/gameState";

@Injectable({
    providedIn: 'root',
})
export class MoveService {

    shooterRun = new Subject<boolean>();

    simpleRunFromAToB(intervalDelay: number, endPoint: Point, object: Circle | ImageForCanvas, functionAtEnd: () => void) {
        const runUp = endPoint.height < object.point.height;
        const calculateCountLoop = runUp ? object.point.height - endPoint.height : endPoint.height - object.point.height;
        let count = 0;
        const ratio = this.calculateChangeWidthDependingOnHeight(object.point, endPoint);
        const defaultShift = 3;
        const interval = setInterval(() => {
            count++;
            runUp ? object.point.height -= defaultShift : object.point.height += defaultShift;
            object.point.width += ratio * defaultShift;
            if (count * defaultShift >= Math.round(calculateCountLoop)) {
                clearInterval(interval);
                functionAtEnd();
            }
        }, intervalDelay)
    }

    runInConstHeightFromLeftToRightWithInfinityLoop
        (intervalDelay: number, object: ImageForCanvas, canvasWitdh: number, speed: number, gameState: GameState) {

        setInterval(() => {
            if (gameState === GameState.paused) {
                return;
            }
            object.point.width -= speed;
            if (object.point.width < 0 - object.height / 2) {
                object.point.width = canvasWitdh + object.height;

            }
        }, intervalDelay)
    }

    private calculateChangeWidthDependingOnHeight(startPoint: Point, endPoint: Point): number {
        const dx = endPoint.width - startPoint.width;
        const dy = endPoint.height - startPoint.height;
        return dx / dy;
    }
}