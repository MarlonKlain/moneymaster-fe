import {
  Component,
  ElementRef,
  inject,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { BudgetCategoryService } from '../../../services/budget-category.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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
import { AlertService } from '../../../services/alerts.service';

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
  ],
})
export class BudgetCategoryComponent {
  private readonly budgetCategoryService = inject(BudgetCategoryService);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly location = inject(Location);
  private readonly fixedCostService = inject(FixedCostService);
  private readonly alert = inject(AlertService);
  private inputsChangesSubscription!: Subscription;

  budgetCategoryIdUrl!: string | null;
  budgetCategory$!: Observable<BudgetCategory>;
  @ViewChildren('fixedCostInput') fixedCostInputs!: QueryList<ElementRef>;

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
    this.loadBudgetCategoryData();
  }

  // ngAfterViewInit(): void {

  // }

  ngOnDestroy(): void {
    if (this.inputsChangesSubscription) {
      this.inputsChangesSubscription.unsubscribe();
    }
  }

  get fixedCosts(): FormArray {
    return this.budgetCategoryForm.get('fixedCosts') as FormArray;
  }

  loadBudgetCategoryData(): void {
    if (this.budgetCategoryIdUrl) {
      this.budgetCategory$ = this.budgetCategoryService.getBudgetCategory(
        this.budgetCategoryIdUrl
      );
      this.loadBudgetCategoryForm(this.budgetCategory$);
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
    this.inputsChangesSubscription = this.fixedCostInputs.changes.subscribe(
      () => {
        if (this.fixedCostInputs.last) {
          this.fixedCostInputs.last.nativeElement.focus();
        }
      }
    );
  }

  async confirmDeletingFixedCost(
    index: number,
    fixedCostName: string
  ): Promise<void> {
    const isConfirmed = await this.alert.confirmAction(
      `Are you sure that you want to delete the fixed cost${
        fixedCostName ? ': ' + fixedCostName : '?'
      }`
    );

    if (isConfirmed) {
      this.removeFixedCost(index);
    }
  }

  removeFixedCost(index: number): void {
    if (!this.fixedCosts.at(index).value.fixedCostId) {
      this.fixedCosts.removeAt(index);
    } else {
      this.fixedCostService
        .deleteFixedCost(this.fixedCosts.at(index).value)
        .subscribe({
          next: (response) => {
            this.fixedCosts.removeAt(index);
            this.loadBudgetCategoryData();
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
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

  async confirmDeleteBudgetCategory(): Promise<void> {
    const budgetCategoryName: string = this.budgetCategoryForm.get('name')
      ?.value
      ? this.budgetCategoryForm.get('name')?.value
      : 'budget category';
    const isConfirmed = await this.alert.confirmAction(
      `Are you that you want to delete the ${budgetCategoryName}?`
    );

    if (isConfirmed) {
      this.deleteBudgetCategory();
    }
  }

  deleteBudgetCategory() {
    if (!this.budgetCategoryForm.get('budgetCategoryId')?.value) {
      this.goBack();
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
