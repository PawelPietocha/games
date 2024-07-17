import { Injectable } from "@angular/core";
import { PokemonForms } from "../models/pokemon-forms";
import { ScoreCollector } from "../models/score-collector.enum";
import { PokemonSource } from "../models/pokemon-source";
import { PokemonHero } from "../../../models/pokemon-hero";

@Injectable({
    providedIn: 'root',
})

export class GameHelperService {

    changeHeroImageLeftRight(
        isGoingRight: boolean,
        hero: PokemonHero,
        pokemonSource: PokemonSource
    ) {
        if (isGoingRight) {
            switch (hero.currentPokemonForm) {
                case PokemonForms.basicForm: {
                    hero.image.src = pokemonSource.basicFormSrcRight;
                    return;
                }
                case PokemonForms.middleForm: {
                    hero.image.src = pokemonSource.middleFormSrcRight;
                    return;
                }
                case PokemonForms.finalForm: {
                    hero.image.src = pokemonSource.finalFormSrcRight;
                    return;
                }
            }
        }
        else {
            switch (hero.currentPokemonForm) {
                case PokemonForms.basicForm: {
                    hero.image.src = pokemonSource.basicFormSrcLeft;
                    return;
                }
                case PokemonForms.middleForm: {
                    hero.image.src = pokemonSource.middleFormSrcLeft;
                    return;
                }
                case PokemonForms.finalForm: {
                    hero.image.src = pokemonSource.finalFormSrcLeft;
                    return;
                }
            }

        }
    }

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

    isHeroReachedFinish(heroWidth: number, finishWidth: number): boolean {
        return heroWidth + 200 >= finishWidth;
    }
}