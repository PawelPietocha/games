import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStarterComponent } from './game-starter.component';

describe('GameStarterComponent', () => {
  let component: GameStarterComponent;
  let fixture: ComponentFixture<GameStarterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameStarterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameStarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
