import { BonusItem } from "../games/arkanoid/bonusItem-arkanoid"
import { FilledRectangle } from "./filledRectangle"

export class ArkanoidBlock {
    rectangle: FilledRectangle; 
    visible: boolean; 
    bonusItem: BonusItem;
}