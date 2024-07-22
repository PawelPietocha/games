import { FilledRectangle } from "../../../models/shapes/filledRectangle";
import { BonusItem } from "./bonusItem-arkanoid";

export class ArkanoidBlock {
    rectangle: FilledRectangle; 
    visible: boolean; 
    bonusItem: BonusItem;
}