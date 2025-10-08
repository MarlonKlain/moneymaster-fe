import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  heroPencilSquareSolid,
  heroXMarkSolid,
  heroCheckSolid,
  heroUserCircleSolid,
} from '@ng-icons/heroicons/solid';

import { bootstrapPlusSquareFill } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { BudgetCategoryService } from '../../services/budget-category.service';
import { Dashboard } from '../../models/dashboard.model';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Budget } from '../../models/budget.model';
import { BudgetService } from '../../services/budget.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    AsyncPipe,
    NgIcon,
    RouterLink,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  viewProviders: [
    provideIcons({
      heroPencilSquareSolid,
      heroXMarkSolid,
      bootstrapPlusSquareFill,
      heroCheckSolid,
      heroUserCircleSolid,
    }),
  ],
  providers: [provideNgxMask()],
})
export class DashboardComponent {
  private readonly dashboardService = inject(DashboardService);
  private readonly authService = inject(AuthService);
  private readonly budgetService = inject(BudgetService);

  @ViewChild('totalIncomeInput') totalIncomeInput!: ElementRef;

  dashboard$!: Observable<Dashboard>;
  isEditing: boolean = false;
  budgetForm: FormGroup = new FormGroup({
    monthlyIncome: new FormControl({ value: '', disabled: true }),
  });

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.dashboard$ = this.dashboardService.getDashboardSummary();
    this.populateForm();
  }

  populateForm() {
    this.dashboard$.subscribe({
      next: (dashboardData) => {
        this.budgetForm.patchValue({
          monthlyIncome: +dashboardData.totalIncome,
        });
      },
    });
  }

  logout() {
    this.authService.logout();
  }

  onSubmit(): void {
    const budget: Budget = {
      budgetId: null,
      monthlyIncome: this.budgetForm.get('monthlyIncome')?.value,
      budgetCategories: null,
    };

    if (this.budgetForm.get('monthlyIncome')?.value != null) {
      this.budgetService.updateBudget(budget).subscribe({
        next: () => {
          this.loadDashboard();
          this.enableInput('monthlyIncome');
        },
      });
    }
  }

  enableInput(input: string): void {
    const control = this.budgetForm.get(input);
    if (control?.disabled) {
      control.enable();
      this.isEditing = !this.isEditing;
      // 2. Call the focus method.
      // We use a small timeout to ensure the element is focusable
      // after the change detection cycle.
      setTimeout(() => {
        this.totalIncomeInput.nativeElement.focus();
      }, 0);
    } else {
      control?.disable();
      this.isEditing = !this.isEditing;
    }
  }
}
