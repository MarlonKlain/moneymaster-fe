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
import { Budget } from '../../models/budget.model';
import { Router } from '@angular/router';

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
  private readonly budgetService = inject(BudgetService);
  private readonly router = inject(Router);

  budgetForm = new FormGroup({
    monthlyIncome: new FormControl('', [Validators.required]),
  });

  createBudget() {
    const userBudget: Budget = {
      //todo handle when the user uses comma ",".
      monthlyIncome: Number(this.budgetForm.value.monthlyIncome),
      budgetCategories: null,
    };

    this.budgetService.createBudget(userBudget).subscribe({
      next: (response) => {
        this.router.navigate(['/budget-category'], {
          state: { budget: response.budgetCategories },
        });
      },
      error: (err) => {
        console.log('Erro');
      },
      complete: () => {
        console.log('OI');
      },
    });
  }
}
