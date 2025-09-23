import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCategoryEdit } from './budget-category-edit';

describe('BudgetCategoryEdit', () => {
  let component: BudgetCategoryEdit;
  let fixture: ComponentFixture<BudgetCategoryEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetCategoryEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetCategoryEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
