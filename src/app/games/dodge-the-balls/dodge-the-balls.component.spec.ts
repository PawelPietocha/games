import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodgeTheBallsComponent } from './dodge-the-balls.component';

describe('DodgeTheBallsComponent', () => {
  let component: DodgeTheBallsComponent;
  let fixture: ComponentFixture<DodgeTheBallsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DodgeTheBallsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DodgeTheBallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
