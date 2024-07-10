import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonPanelComponent } from './pokemon-panel.component';

describe('PokemonPanelComponent', () => {
  let component: PokemonPanelComponent;
  let fixture: ComponentFixture<PokemonPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
