import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  imports: [CommonModule],
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInput),
      multi: true,
    },
  ],
})
export class CustomInput implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = '';

  value: string = '';
  isDisabled: boolean = false;

  /**
   * A placeholder for the callback function that Angular provides.
   * We call this function to report any value changes back to the parent form.
   *
   * It's initialized to an empty function `() => {}` as a safety net. This ensures that
   * if the function is called before Angular has registered its own callback
   * (via `registerOnChange`), the application will not crash.
   *
   * The type `(value: string) => void` describes the function's signature:
   * it must accept a single string argument and return nothing.
   */
  private onChange: (value: string) => void = () => {};

  /**
   * A placeholder for the callback function that is called when the control is "touched".
   * Angular provides this function via `registerOnTouched`, and we call it, for example,
   * when the input element loses focus (on blur).
   */
  public onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.onTouched();
  }
}
