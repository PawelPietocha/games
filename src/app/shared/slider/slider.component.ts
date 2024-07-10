import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [MatSliderModule, MatCardModule, FormsModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  @Input() max: number;
  @Input() sliderValue: number;
  @Input() min: number = 1;
  @Input() step: number = 1;
  @Input() name: string;

  @Output() sliderValueChange = new EventEmitter<number>();

}
