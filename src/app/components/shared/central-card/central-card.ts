import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BackButton } from '../back-button/back-button';

@Component({
  selector: 'app-central-card',
  imports: [CommonModule, BackButton],
  templateUrl: './central-card.html',
  styleUrl: './central-card.scss',
})
export class CentralCard {
  @Input() subtitle: string = 'true';
}
