import { GameEnum } from "./game.enum";

export interface GameItem {
    name: GameEnum;
    source: string;
    path: string;
}