import { Injectable } from "@angular/core";
import { BaseLevel } from "../../levels/baseLevel";
import { KoffingOponent } from "../../models/koffing-oponent";
import { MeowthOponent } from "../../models/meowth-oponent";
import { OponentEnum } from "../../models/oponent-enum";
import { PlatformOponent } from "../../models/platform-oponents";

@Injectable({
    providedIn: 'root',
})

export class OponentsCreateHelperService {
    initOponentsValues(dynamicLevel: BaseLevel, canvas: HTMLCanvasElement): PlatformOponent[] {
        const oponents: PlatformOponent[] = [];


        dynamicLevel.oponentsValues.forEach(oponent => {
            switch (oponent.oponentType) {
                case OponentEnum.meowth: {
                    const newOponent = new MeowthOponent(
                        {
                            width: oponent.drawPointWidthMultiplier,
                            height: oponent.drawPointHeightMultiplier
                        },
                        oponent.isOnFloor,
                        canvas)

                    oponents.push(newOponent);
                    break;
                }
                case OponentEnum.koffing: {
                    const newOponent = new KoffingOponent(
                        {
                            width: oponent.drawPointWidthMultiplier,
                            height: oponent.drawPointHeightMultiplier
                        },
                        canvas);
                    oponents.push(newOponent);
                    break;
                }
            }
        })
        return oponents;
    }
}