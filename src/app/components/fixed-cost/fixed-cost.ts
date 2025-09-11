import { Component, inject } from '@angular/core';
import { CentralCard } from '../shared/central-card/central-card';
import { CustomInput } from '../shared/custom-input/custom-input';
import { FixedCostService } from '../../services/fixed-cost.service';
import { Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CustomButton } from '../shared/custom-button/custom-button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXMarkSolid } from '@ng-icons/heroicons/solid';
import { BudgetCategoryService } from '../../services/budget-category.service';
import { BudgetCategory } from '../../models/budget-category.model';

@Component({
  selector: 'app-fixed-cost',
  imports: [
    CentralCard,
    CustomInput,
    ReactiveFormsModule,
    CustomButton,
    NgIcon,
  ],
  templateUrl: './fixed-cost.html',
  styleUrl: './fixed-cost.scss',
  viewProviders: [
    provideIcons({
      heroXMarkSolid,
    }),
  ],
})
export class FixedCostComponent {
  private readonly fixedCostService = inject(FixedCostService);
  private readonly budgetCategoryService = inject(BudgetCategoryService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  budgetCategories$!: BudgetCategory[];

  fixedCostForm: FormGroup = this.fb.group({
    fixedCosts: this.fb.array([]),
  });

  ngOnInit() {
    this.budgetCategoryService.getBudgetCategories().subscribe({
      next: (budgetCategories) => {
        this.budgetCategories$ = budgetCategories;
      },
    });
  }

  get fixedCosts(): FormArray {
    return this.fixedCostForm.get('fixedCosts') as FormArray;
  }

  newFixedCost(): FormGroup {
    return this.fb.group({
      amount: [0],
      description: [''],
      budgetCategoryId: [null],
    });
  }

  addNewFixedCost(): void {
    this.fixedCosts.push(this.newFixedCost());
  }

  removeFixedCost(index: number): void {
    if (this.fixedCosts.at(index).value.fixedCostId === null) {
      this.fixedCosts.removeAt(index);
    } else {
      this.fixedCostService
        .deleteFixedCost(this.fixedCosts.at(index).value.fixedCostId)
        .subscribe({
          next: (value) => {
            this.fixedCosts.removeAt(index);
          },
          error(err) {
            console.log(err);
          },
        });
    }
  }

  onSubmit() {
    console.log(this.fixedCosts.value);

    this.fixedCostService.saveFixedCosts(this.fixedCosts.value).subscribe({
      next: (value) => {
        console.log('SALVO COM SUCESSO: ', value);
        this.router.navigate(['/dashboard']);
        //criar o objeto do budget com os fixec costs dentros
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
