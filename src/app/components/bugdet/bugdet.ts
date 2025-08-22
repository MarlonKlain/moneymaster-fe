import { Component, inject } from '@angular/core';
import { CustomInput } from '../shared/custom-input/custom-input';
import {
  FormControl,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CustomButton } from '../shared/custom-button/custom-button';
import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-bugdet',
  imports: [
    CustomInput,
    ɵInternalFormsSharedModule,
    CustomButton,
    ReactiveFormsModule,
  ],
  templateUrl: './bugdet.html',
  styleUrl: './bugdet.scss',
})
export class BugdetComponent {
  readonly budgetService = inject(BudgetService);

  budgetForm = new FormGroup({
    monthlyIncome: new FormControl('', [Validators.required]),
  });

  createBudget() {
    this.budgetService
      .createBudget(Number(this.budgetForm.value.monthlyIncome))
      .subscribe({
        next(response) {
          console.log('OI');
        },
        error(err) {
          console.log('Erro');
        },
        complete() {
          console.log('OI');
        },
      });
  }
}
