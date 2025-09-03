import { Component, inject } from '@angular/core';
import { CentralCard } from '../shared/central-card/central-card';
import { Router } from '@angular/router';
import { BudgetCategoryService } from '../../services/budget-category.service';
import { Observable, of } from 'rxjs';
import { BudgetCategory } from '../../models/budget-category.model';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-budget-category',
  imports: [CentralCard, CommonModule, ReactiveFormsModule],
  templateUrl: './budget-category.html',
  styleUrl: './budget-category.scss',
})
export class BudgetCategoryComponent {
  budgetCategories$!: Observable<BudgetCategory[]>;

  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly budgetCategoryService = inject(BudgetCategoryService);

  budgetCategoryForm: FormGroup = this.fb.group({
    budgetCategories: this.fb.array([]),
  });

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const budgetCategoriesState = navigation?.extras?.state?.['budget'];

    if (!budgetCategoriesState) {
      this.budgetCategories$ = this.budgetCategoryService.getBudgetCategories();
    } else {
      this.budgetCategories$ = of(budgetCategoriesState);
    }

    this.budgetCategories$.subscribe({
      next: (defaultCategories) => {
        const categoryFormGroups = defaultCategories.map((category) => {
          return this.fb.group({
            name: [category.name],
            percentage: [category.percentage],
          });
        });

        const categoryFormArray = this.fb.array(categoryFormGroups);

        this.budgetCategoryForm.setControl(
          'budgetCategories',
          categoryFormArray
        );
      },
      error: (error) => {
        console.log('Error');
      },
      complete() {
        console.log('DONE');
      },
    });
  }

  get budgetCategories(): FormArray {
    return this.budgetCategoryForm.get('budgetCategories') as FormArray;
  }

  private newCategory(): FormGroup {
    return this.fb.group({
      name: [''],
      percentage: [0],
    });
  }

  addNewCategory(): void {
    this.budgetCategories.push(this.newCategory());
  }

  removeCategory(index: number): void {
    this.budgetCategories.removeAt(index);
  }

  onSubmit() {
    if (this.budgetCategoryForm.valid) {
      //
    }
  }
}
