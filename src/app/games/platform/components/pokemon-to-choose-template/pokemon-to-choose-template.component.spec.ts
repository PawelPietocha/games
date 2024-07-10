import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonToChooseTemplateComponent } from './pokemon-to-choose-template.component';

describe('PokemonToChooseTemplateComponent', () => {
  let component: PokemonToChooseTemplateComponent;
  let fixture: ComponentFixture<PokemonToChooseTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonToChooseTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonToChooseTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
