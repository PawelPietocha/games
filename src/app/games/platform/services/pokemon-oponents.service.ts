import { Injectable } from "@angular/core";
import { MathService } from "../../../services/math.service";
import { Interval } from "../../../shared/intervals/interval";
import { PlatformOponent } from "../models/platform-oponents";
import { PokemonDataService } from "./pokemon-data.service";
import { ViewportService } from "./viewport.service";
import { PokemonHero } from "../models/pokemon-hero";
import { PokemonForms } from "../models/pokemon-forms";
import { GameHelperService } from "./game-helper.service";

@Injectable({
    providedIn: 'root',
})
export class PokemonOponentService {
    constructor(private pokemonDataService: PokemonDataService,
        private viewportService: ViewportService,
        private mathService: MathService,
        private gameService: GameHelperService
    ) { }

    oponents: PlatformOponent[];
    hero: PokemonHero;

    initValues() {
        this.oponents = this.pokemonDataService.oponents;
        this.hero = this.pokemonDataService.hero;
        this.setInterval();
    }

    setInterval(): Interval {
        return new Interval(
            this.action.bind(this)
        )
    }

    private action() {
        this.oponents.forEach(oponent => {
            if(this.checkOponentCatchHero()){
                this.actionAfterCatch();
            }
            if (!this.viewportService.isImageOnViewPort(oponent)) {
                return;
            }
            if (oponent.shouldChangeDirection(this.pokemonDataService, this.mathService)) {
                oponent.changeDirection();
            }
            oponent.move();
        })
    }

    private checkOponentCatchHero(): boolean {
        return !this.hero.immune 
        && this.oponents.some(oponent => oponent.visible && this.mathService.isTwoImagesToClose(oponent, this.hero))
    }

    private actionAfterCatch(): void {
        if (this.hero.currentPokemonForm === PokemonForms.basicForm) {
           this.gameService.endGame$.next({isFinished: true, won: false});
          }
          else {
            this.hero.immune = true;
            this.hero.devolve();
            setTimeout(() => {
              this.hero.immune = false;
            }, 2000)
          }
    }
}