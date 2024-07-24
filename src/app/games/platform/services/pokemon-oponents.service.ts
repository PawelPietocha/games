import { Injectable } from "@angular/core";
import { MathService } from "../../../services/math.service";
import { Interval } from "../../../shared/intervals/interval";
import { PlatformOponent } from "../models/platform-oponents";
import { PokemonDataService } from "./pokemon-data.service";
import { ViewportService } from "./viewport.service";

@Injectable({
    providedIn: 'root',
})
export class PokemonOponentService {
    constructor(private pokemonDataService: PokemonDataService,
        private viewportService: ViewportService,
        private mathService: MathService
    ) { }

    oponents: PlatformOponent[];

    initValues() {
        this.oponents = this.pokemonDataService.oponents;
        this.setInterval();
    }

    setInterval(): Interval {
        return new Interval(
            this.action.bind(this)
        )
    }

    private action() {
        this.oponents.forEach(oponent => {
            if (!this.viewportService.isImageOnViewPort(oponent)) {
                return;
            }
            if (oponent.shouldChangeDirection(this.pokemonDataService, this.mathService)) {
                oponent.changeDirection();
            }
            oponent.move();
        })
    }
}