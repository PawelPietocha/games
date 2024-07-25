import { Injectable } from "@angular/core";
import { PokemonDataService } from "../games/platform/services/pokemon-data.service";
import { PokemonHero } from "../games/platform/models/pokemon-hero";
import { ImageForCanvas } from "../models/shapes/imageForCanvas";
import { PokemonWeapon } from "../games/platform/models/pokemon-weapon";
import { MathService } from "./math.service";
import { Interval } from "../shared/intervals/interval";
import { PokemonCounter } from "../games/platform/models/pokemon-counter";
import { GameHelperService } from "../games/platform/services/game-helper.service";
import { ScoreCollector } from "../games/platform/models/score-collector.enum";

@Injectable({
    providedIn: 'root',
})
export class PokemonCatchService {
    private pokemonHero: PokemonHero;
    private coins: ImageForCanvas[];
    private pokeballs: ImageForCanvas[];
    private weapon: PokemonWeapon;
    private catchInterval: Interval;
    private pokemonCounter: PokemonCounter;
    constructor(
        private pokemonDataService: PokemonDataService,
        private mathService: MathService,
        private gameHelperService: GameHelperService
    ) { }

    initService(pokemonCounter: PokemonCounter) {
        this.pokemonCounter = pokemonCounter;
        this.pokemonHero = this.pokemonDataService.hero;
        this.coins = this.pokemonDataService.coins;
        this.pokeballs = this.pokemonDataService.pokeballs;
        this.weapon = this.pokemonDataService.weapon;
        this.setInterval();
    }

    clear() {
        this.catchInterval.clearInterval();
    }

    private setInterval() {
        this.catchInterval = new Interval(
            this.action.bind(this)
        )
    }

    private action() {
        this.coinAction();
        this.pokeballAction();
    }

    private coinAction(): void {
        const catchedCoin = this.coins
            .find(coin =>
                coin.visible &&
                this.mathService.isTwoImagesToClose(this.pokemonHero, coin))
        if (catchedCoin) {
            catchedCoin.visible = false;
            this.weapon.bulletCount += 1;
            this.pokemonCounter.score += this.gameHelperService.collectScore(ScoreCollector.catchedCoin);
        }

    }

    private pokeballAction() {
        const catchedPokeball = this.pokeballs.find(pokeball =>
            this.mathService.isTwoImagesToClose(this.pokemonHero, pokeball) && pokeball.visible

        )
        if (catchedPokeball) {
            this.pokemonCounter.score += this.gameHelperService.collectScore(ScoreCollector.catchedPokeball);
            catchedPokeball.visible = false;
            this.pokemonCounter.catchedPokeballsCount += 1;
            if (this.pokemonCounter.catchedPokeballsCount === 3) {
                this.pokemonHero.evolve();
                this.pokemonCounter.catchedPokeballsCount = 0;
            }
        }
    }
}