import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-score-board',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './score-board.component.html',
  styleUrl: './score-board.component.css'
})
export class ScoreBoardComponent {
@Input() homeScore: number | string
@Input() guestScore: number;

@Input() homeName: string = 'Gracz';
@Input() guestName: string = 'Komputer';

@Input() isJustPlayerScore: boolean = false;
}
