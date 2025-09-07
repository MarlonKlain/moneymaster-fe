import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedCost } from './fixed-cost';

describe('FixedCost', () => {
  let component: FixedCost;
  let fixture: ComponentFixture<FixedCost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixedCost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixedCost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
