import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCategory } from './budget-category';

describe('BudgetCategory', () => {
  let component: BudgetCategory;
  let fixture: ComponentFixture<BudgetCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
