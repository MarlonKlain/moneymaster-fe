import { CommonModule, Location } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowUturnLeftSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-back-button',
  imports: [NgIcon, CommonModule],
  templateUrl: './back-button.html',
  styleUrl: './back-button.scss',
  viewProviders: [
    provideIcons({
      heroArrowUturnLeftSolid,
    }),
  ],
})
export class BackButton {
  private readonly location = inject(Location);

  backIcon: string = 'heroArrowUturnLeftSolid';

  goBack() {
    this.location.back();
  }
}
