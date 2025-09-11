import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedCostComponent } from './fixed-cost';

describe('FixedCost', () => {
  let component: FixedCostComponent;
  let fixture: ComponentFixture<FixedCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixedCostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FixedCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
