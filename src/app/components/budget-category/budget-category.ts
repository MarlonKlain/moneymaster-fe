import { Component, inject } from '@angular/core';
import { CentralCard } from '../shared/central-card/central-card';
import { Router } from '@angular/router';
import { BudgetCategoryService } from '../../services/budget-category.service';
import { Observable } from 'rxjs';
import { BudgetCategory } from '../../models/budget-category.model';

@Component({
  selector: 'app-budget-category',
  imports: [CentralCard],
  templateUrl: './budget-category.html',
  styleUrl: './budget-category.scss',
})
export class BudgetCategoryComponent {
  private readonly router = inject(Router);
  private readonly budgetCategoryService = inject(BudgetCategoryService);
  budgetCategories$!: Observable<BudgetCategory[]>;

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    this.budgetCategories$ = navigation?.extras?.state?.['budget'];

    if (!this.budgetCategories$) {
      this.budgetCategoryService.getBudgetCategories().subscribe({
        next: (response) => {
          console.log(response);
        },
        error(err) {
          console.log(err);
        },
        complete() {
          console.log('COMPLETED');
        },
      });
    }
  }
}
