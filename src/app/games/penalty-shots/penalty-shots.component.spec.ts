import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltyShotsComponent } from './penalty-shots.component';

describe('PenaltyShotsComponent', () => {
  let component: PenaltyShotsComponent;
  let fixture: ComponentFixture<PenaltyShotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PenaltyShotsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PenaltyShotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
