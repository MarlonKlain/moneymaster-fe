import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  imports: [],
  templateUrl: './custom-button.html',
  styleUrl: './custom-button.scss',
})
export class CustomButton {
  @Input() text: string = '';
  @Input() type: string = '';
  @Input() disabled: boolean = false;

  @Output() click = new EventEmitter();
}
