import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PokemonForms } from '../../models/pokemon-forms';
import { PlatformBoostName } from '../../models/platform-boost-name';
import { PokemonSource } from '../../models/pokemon-source';

@Component({
  selector: 'app-pokemon-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-panel.component.html',
  styleUrl: './pokemon-panel.component.css'
})
export class PokemonPanelComponent {
  @Input() currentPokemonForm: PokemonForms;
  @Input() pokemonSource: PokemonSource;
  @Input() catchedCoinCount: number;
  @Input() catchedPokeballsCount: number;
  @Input() score: number;
  @Input() time: number;
  @Input() level: number;

  pokemonForms = PokemonForms;

  getNextHeroSrc() {
    if (!this.pokemonSource) {
      return ''
    }
    switch (this.currentPokemonForm) {
      case PokemonForms.basicForm:
        return this.pokemonSource.middleFormSrcRight;
      case PokemonForms.middleForm:
        return this.pokemonSource.finalFormSrcRight;
      default:
        return '';
    }
  }

  getBoostName(): PlatformBoostName {
    if (this.currentPokemonForm === PokemonForms.basicForm) {
      return PlatformBoostName.extraLife;
    }
    if (this.currentPokemonForm === PokemonForms.middleForm) {
      return PlatformBoostName.shooting
    }
    return PlatformBoostName.evolvedMax
  }

  getBoostSrc(): string {
    if (!this.pokemonSource) {
      return ''
    }
    if (this.currentPokemonForm === PokemonForms.basicForm) {
      return "../../../assets/Pokemons/other-images/heart.png";
    }
    if (this.currentPokemonForm === PokemonForms.middleForm) {
      return this.pokemonSource.bulletSrc
    }
    return ''
  }

  shouldPokeballBeGreyOut(pokeballNumber: number): boolean {
    if (pokeballNumber === 1 && this.catchedPokeballsCount >= 1) {
      return false;
    }
    if (pokeballNumber === 2 && this.catchedPokeballsCount >= 2) {
      return false;
    }
    if (pokeballNumber === 3 && this.catchedPokeballsCount >= 3) {
      return false;
    }
    return true;
  }

  getCoinOrBulletSrc(): string {
    return (this.currentPokemonForm === PokemonForms.finalForm)?
     this.pokemonSource.bulletSrc : 'assets/Pokemons/other-images/pokemonCoin.png';

  }

}
