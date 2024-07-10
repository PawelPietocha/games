import { PokemonToChoose } from "./pokemon-to-choose";


export class PokemonSource {
    basicName: PokemonToChoose;
    basicFormSrcRight: string;
    basicFormSrcLeft: string;
    middleFormSrcRight: string;
    middleFormSrcLeft: string;
    finalFormSrcRight: string;
    finalFormSrcLeft: string;
    bulletSrc: string;
    constructor(basicName: PokemonToChoose) {
        this.basicName = basicName;
        let basicSrc = 'assets/Pokemons/' + basicName.toString() + '/';
        this.basicFormSrcRight = basicSrc + '1' + '.png';
        this.basicFormSrcLeft = basicSrc + '1l' + '.png';
        this.middleFormSrcRight = basicSrc + '2' + '.png';
        this.middleFormSrcLeft = basicSrc + '2l' + '.png';
        this.finalFormSrcRight = basicSrc + '3' + '.png';
        this.finalFormSrcLeft = basicSrc + '3l' + '.png';
        this.bulletSrc = basicSrc + 'shot' + '.png';
    }

    static getBasicFormSrc(basicName: PokemonToChoose) {
        return 'assets/Pokemons/' + basicName.toString() + '/' + '1' + '.png';
    }
}