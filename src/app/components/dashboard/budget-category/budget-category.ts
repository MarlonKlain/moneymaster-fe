import { Component, inject } from '@angular/core';
import { BudgetCategoryService } from '../../../services/budget-category.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BudgetCategory } from '../../../models/budget-category.model';
import { CommonModule, Location } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { FixedCosts } from '../../../models/fixed-costs.model';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import {
  heroPencilSquareSolid,
  heroArrowLeftSolid,
  heroPlusSolid,
  heroArrowDownTraySolid,
  heroXMarkSolid,
  heroTrashSolid,
} from '@ng-icons/heroicons/solid';
import { FixedCostService } from '../../../services/fixed-cost.service';

@Component({
  selector: 'app-budget-category',
  imports: [CommonModule, ReactiveFormsModule, NgIcon],
  templateUrl: './budget-category.html',
  styleUrl: './budget-category.scss',
  viewProviders: [
    provideIcons({
      heroPencilSquareSolid,
      heroArrowLeftSolid,
      heroPlusSolid,
      heroArrowDownTraySolid,
      heroXMarkSolid,
      heroTrashSolid,
    }),
    provideNgIconsConfig({
      size: '1.2em',
    }),
  ],
})
export class BudgetCategoryComponent {
  private readonly budgetCategoryService = inject(BudgetCategoryService);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly location = inject(Location);
  private readonly fixedCostService = inject(FixedCostService);

  budgetCategoryIdUrl!: string | null;
  budgetCategory$!: Observable<BudgetCategory>;

  budgetCategoryForm: FormGroup = this.fb.group({
    budgetCategoryId: [''],
    percentage: [''],
    total: [''],
    name: [''],
    imageUrl: [''],
    totalFixedCost: [''],
    flexibleSpending: [''],
    fixedCosts: this.fb.array([]),
  });

  ngOnInit() {
    this.budgetCategoryIdUrl =
      this.route.snapshot.paramMap.get('budgetCategoryId');
    if (this.budgetCategoryIdUrl != null) {
      this.budgetCategory$ = this.loadBudgetCategoryData();
      this.loadBudgetCategoryForm(this.budgetCategory$);
    }
  }

  get fixedCosts(): FormArray {
    return this.budgetCategoryForm.get('fixedCosts') as FormArray;
  }

  loadBudgetCategoryData() {
    if (this.budgetCategoryIdUrl) {
      return this.budgetCategoryService.getBudgetCategory(
        this.budgetCategoryIdUrl
      );
    } else {
      throw new Error('An ID must be provided!');
    }
  }

  loadBudgetCategoryForm(budgetCategory$: Observable<BudgetCategory>) {
    budgetCategory$.subscribe({
      next: (budgetCategory) => {
        this.populateForm(budgetCategory);
      },
    });
  }

  populateForm(budgetCategory: BudgetCategory) {
    this.budgetCategoryForm.patchValue({
      budgetCategoryId: budgetCategory.budgetCategoryId,
      percentage: budgetCategory.percentage,
      total: budgetCategory.total,
      name: budgetCategory.name,
      imageUrl: budgetCategory.imageUrl,
      totalFixedCost: budgetCategory.totalFixedCost,
      flexibleSpending: budgetCategory.flexibleSpending,
    });

    if (budgetCategory.fixedCosts != null) {
      const fixedCosts = budgetCategory.fixedCosts.map((fixedCost) =>
        this.createFixedCostGroup(fixedCost)
      );
      const fixedCostFormArray = this.fb.array(fixedCosts);

      this.budgetCategoryForm.setControl('fixedCosts', fixedCostFormArray);
    }
  }

  createFixedCostGroup(fixedCost: FixedCosts | null): FormGroup {
    return this.fb.group({
      fixedCostId: [fixedCost?.fixedCostId || ''],
      amount: [fixedCost?.amount || ''],
      description: [fixedCost?.description || null],
    });
  }

  newFixedCost(): FormGroup {
    return this.fb.group({
      fixedCostId: [''],
      amount: [''],
      description: [''],
    });
  }

  addNewFixedCost(): void {
    this.fixedCosts.push(this.newFixedCost());
  }

  removeFixedCost(index: number): void {
    this.fixedCostService
      .deleteFixedCost(this.fixedCosts.at(index).value)
      .subscribe({
        next: (response) => {
          this.fixedCosts.removeAt(index);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onSubmit() {
    if (this.budgetCategoryForm.get('budgetCategoryId')?.value) {
      this.budgetCategoryService
        .updateBudgetCategory(this.budgetCategoryForm.value)
        .subscribe({
          next: (budgetCategoryUpdated) => {
            console.log(budgetCategoryUpdated);
            //updating the data in the screen for the user
            this.populateForm(budgetCategoryUpdated);
          },
        });
    } else {
      this.budgetCategoryService
        .createBudgetCategory(this.budgetCategoryForm.value)
        .subscribe({
          next: (budgetCategoryUpdated) => {
            console.log(budgetCategoryUpdated);
            //updating the data in the screen for the user
            this.populateForm(budgetCategoryUpdated);
          },
        });
    }
  }

  goBack(): void {
    this.location.back();
  }

  deleteBudgetCategory() {
    if (!this.budgetCategoryForm.get('budgetCategoryId')?.value) {
      throw new Error('ID must be provided!');
    } else {
      this.budgetCategoryService
        .deleteBudgetCategory(this.budgetCategoryForm.value)
        .subscribe({
          next: (value) => {
            this.goBack();
          },
          error(err) {
            console.log(err);
          },
        });
    }
  }
}
