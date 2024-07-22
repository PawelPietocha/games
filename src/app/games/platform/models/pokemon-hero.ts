import { PokemonForms } from "./pokemon-forms";
import { PokemonSource } from "./pokemon-source";
import { ImageForCanvas } from "../../../models/shapes/imageForCanvas";
import { Point } from "../../../models/shapes/point";

export class PokemonHero extends ImageForCanvas {
    looksRight: boolean = true;
    opacity: number = 1;
    immune: boolean = false;
    currentPokemonForm: PokemonForms = PokemonForms.basicForm;
    pokemonSource: PokemonSource;

    constructor(src: string, point: Point, width: number, height: number, pokemonSource: PokemonSource, canvas?: HTMLCanvasElement, visible: boolean = true) {
        super(src, point, width, height, canvas, visible);
        this.pokemonSource = pokemonSource;
    }

    changeHeroLookDirection(toLeft: boolean) {
        if (this.shouldChangeDirection(toLeft)) {
            this.changeDirection(toLeft);
        }
    }

    evolve() {
        switch (this.currentPokemonForm) {
            case PokemonForms.basicForm: {
                this.image.src = this.pokemonSource.middleFormSrcRight;
                this.currentPokemonForm = PokemonForms.middleForm;
                this.width = this.width * 1.3;
                this.height = this.height * 1.3;
                return;
            }
            case PokemonForms.middleForm: {
                this.image.src = this.pokemonSource.finalFormSrcRight;
                this.currentPokemonForm = PokemonForms.finalForm;
                this.width = this.width * 1.3;
                this.height = this.height * 1.3;
                return;
            }
        }
    }

    devolve() {
        this.image.src = this.pokemonSource.basicFormSrcRight;
    if (this.currentPokemonForm === PokemonForms.finalForm) {
      this.width = this.width / 1.69;
      this.height = this.height / 1.69;
    }
    else {
      this.width = this.width / 1.3;
      this.height = this.height / 1.3;
    }
    this.currentPokemonForm = PokemonForms.basicForm;
    }

    private shouldChangeDirection(toLeft: boolean): boolean {
        if (!this.looksRight && toLeft) {
            return false;
        }
        if (this.looksRight && !toLeft) {
            return false;
        }
        return true;
    }

    private changeDirection(toLeft: boolean) {
        this.looksRight = !toLeft;
        if (!toLeft) {
            switch (this.currentPokemonForm) {
                case PokemonForms.basicForm: {
                    this.image.src = this.pokemonSource.basicFormSrcRight;
                    return;
                }
                case PokemonForms.middleForm: {
                    this.image.src = this.pokemonSource.middleFormSrcRight;
                    return;
                }
                case PokemonForms.finalForm: {
                    this.image.src = this.pokemonSource.finalFormSrcRight;
                    return;
                }
            }
        }
        else {
            switch (this.currentPokemonForm) {
                case PokemonForms.basicForm: {
                    this.image.src = this.pokemonSource.basicFormSrcLeft;
                    return;
                }
                case PokemonForms.middleForm: {
                    this.image.src = this.pokemonSource.middleFormSrcLeft;
                    return;
                }
                case PokemonForms.finalForm: {
                    this.image.src = this.pokemonSource.finalFormSrcLeft;
                    return;
                }
            }
        }
    }
}