import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { map, Observable, of } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  heroPencilSquareSolid,
  heroTrashSolid,
} from '@ng-icons/heroicons/solid';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { BudgetCategoryService } from '../../services/budget-category.service';
import { BudgetCategory } from '../../models/budget-category.model';
import { Dashboard } from '../../models/dashboard.model';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, AsyncPipe, NgIcon],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  viewProviders: [
    provideIcons({
      heroPencilSquareSolid,
      heroTrashSolid,
    }),
  ],
})
export class DashboardComponent {
  private readonly budgetCategoryService = inject(BudgetCategoryService);
  private readonly dashboardService = inject(DashboardService);

  dashboard$!: Observable<Dashboard>;
  totalFixedCost$!: Observable<number>;

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.dashboard$ = this.dashboardService.getDashboardSummary();
  }

  deleteBudgetCategory(budgetCategory: BudgetCategory) {
    if (!budgetCategory.budgetCategoryId) {
      throw new Error('ID must be provided!');
    } else {
      this.budgetCategoryService
        .deleteBudgetCategory(budgetCategory)
        .subscribe({
          next: (value) => {
            this.loadDashboard();
          },
          error(err) {
            console.log(err);
          },
        });
    }
  }
}
