import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  heroPencilSquareSolid,
  heroTrashSolid,
  heroXMarkSolid,
} from '@ng-icons/heroicons/solid';

import { bootstrapPlusSquareFill } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { BudgetCategoryService } from '../../services/budget-category.service';
import { BudgetCategory } from '../../models/budget-category.model';
import { Dashboard } from '../../models/dashboard.model';
import { DashboardService } from '../../services/dashboard.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, AsyncPipe, NgIcon, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  viewProviders: [
    provideIcons({
      heroPencilSquareSolid,
      heroTrashSolid,
      heroXMarkSolid,
      bootstrapPlusSquareFill,
    }),
  ],
})
export class DashboardComponent {
  private readonly budgetCategoryService = inject(BudgetCategoryService);
  private readonly dashboardService = inject(DashboardService);
  private readonly authService = inject(AuthService);

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

  logout() {
    this.authService.logout();
  }
}
