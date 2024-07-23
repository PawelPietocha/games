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
    platforms: FilledRectangle[] = [];
    grounds: FilledRectangle[] = [];
    pokemonHero: PokemonHero;

    constructor(private pokemonDataService: PokemonDataService,
        private jumpService: JumpControlService,
        private mathService: MathService) { }

    initJumpService(pokemonHero: PokemonHero, heroMovemenetSpeed: number, maxJumpHeight: number): void{
        this.initValues(pokemonHero, heroMovemenetSpeed, maxJumpHeight);
    }

    prematureEndJumpInterval(): boolean {
        return this.platforms.some(platform =>
            this.mathService.isImageAndRectangleTangleFromDownSide(this.pokemonHero, platform)
        )
    }

    preventFallingDown(): boolean {
        const isCollisionWithPlatform = this.platforms.some(platform =>
            this.mathService.isImageAndRectangleTangleFromTopSide(this.pokemonHero, platform)
        );

        const collisionWithGround = this.grounds.some(ground =>
            this.mathService.isImageAndRectangleTangleFromTopSide(this.pokemonHero, ground)
        )
        return isCollisionWithPlatform || collisionWithGround
    }

    clear() {
        this.gravityInterval.clearInterval();
    }

    private initValues(pokemonHero: PokemonHero, heroMovemenetSpeed: number, maxJumpHeight: number) {
        this.pokemonHero = pokemonHero;
        this.platforms = this.pokemonDataService.platforms;
        this.grounds = this.pokemonDataService.grounds;
        this.jumpService.maxJumpHeight = maxJumpHeight;
        this.jumpService.setPrematureEndJumpInterval(this.prematureEndJumpInterval.bind(this));
        this.jumpService.setConditionToPreventGravity(this.preventFallingDown.bind(this));
        this.gravityInterval = this.jumpService.setGravityInterval(this.pokemonHero, heroMovemenetSpeed);
    }
}