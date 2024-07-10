import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultGameTemplateComponent } from './default-game-template.component';

describe('DefaultGameTemplateComponent', () => {
  let component: DefaultGameTemplateComponent;
  let fixture: ComponentFixture<DefaultGameTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultGameTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultGameTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
