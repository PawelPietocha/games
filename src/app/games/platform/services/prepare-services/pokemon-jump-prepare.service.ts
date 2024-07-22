import { combineLatest } from "rxjs";
import { JumpControlService } from "../../../../services/controlServices/jump-control.service";
import { PokemonDataService } from "../pokemon-data.service";
import { MathService } from "../../../../services/math.service";
import { PokemonHero } from "../../models/pokemon-hero";
import { FilledRectangle } from "../../../../models/shapes/filledRectangle";
import { Injectable } from "@angular/core";
import { Interval } from "../../../../shared/intervals/interval";

@Injectable({
    providedIn: 'root',
  })
  
export class PokemonJumpPrepareService {
    gravityInterval: Interval;

    constructor(private pokemonDataService: PokemonDataService,
        private jumpService: JumpControlService,
        private mathService: MathService) { }

    initJumpService(pokemonHero: PokemonHero, heroMovemenetSpeed: number, maxJumpHeight) {
        combineLatest([this.pokemonDataService.platforms$, this.pokemonDataService.grounds$])
            .subscribe((next) => {
                const platforms = next[0];
                const grounds = next[1];
                if(this.gravityInterval) {
                    this.gravityInterval.clearInterval();
                }
                this.jumpService.maxJumpHeight = maxJumpHeight;
                this.jumpService.setPrematureEndJumpInterval(this.prematureEndJumpInterval.bind(this, pokemonHero, platforms));
                this.jumpService.setConditionToPreventGravity(this.preventFallingDown.bind(this, pokemonHero, platforms, grounds));
                this.gravityInterval = this.jumpService.setGravityInterval(pokemonHero, heroMovemenetSpeed);
            })
    }

    prematureEndJumpInterval(pokemonHero: PokemonHero, platforms: FilledRectangle[]): boolean {
        return platforms.some(platform =>
            this.mathService.isImageAndRectangleTangleFromDownSide(pokemonHero, platform)
        )
    }

    preventFallingDown(pokemonHero: PokemonHero, platforms: FilledRectangle[], grounds: FilledRectangle[]): boolean {
        const isCollisionWithPlatform = platforms.some(platform =>
            this.mathService.isImageAndRectangleTangleFromTopSide(pokemonHero, platform)
        );

        const collisionWithGround = grounds.some(ground =>
            this.mathService.isImageAndRectangleTangleFromTopSide(pokemonHero, ground)
        )
        return isCollisionWithPlatform || collisionWithGround
    }

    clear() {
        this.gravityInterval.clearInterval();
    }
}