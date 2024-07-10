import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonToChoose } from '../../models/pokemon-to-choose';
import { CommonModule } from '@angular/common';
import { PokemonSource } from '../../models/pokemon-source';

@Component({
  selector: 'app-pokemon-to-choose-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-to-choose-template.component.html',
  styleUrl: './pokemon-to-choose-template.component.css'
})
export class PokemonToChooseTemplateComponent {
  @Input() pokemon: PokemonToChoose;
  @Input() greyOut: boolean = true;
  @Output() clicked = new EventEmitter<PokemonToChoose>();

  onClick() {
    this.clicked.emit(this.pokemon);
    this.greyOut = false;
  }

  getBasicFormSrc() {
    return PokemonSource.getBasicFormSrc(this.pokemon);
  }

}
