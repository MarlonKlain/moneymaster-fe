import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralCard } from './central-card';

describe('CentralCard', () => {
  let component: CentralCard;
  let fixture: ComponentFixture<CentralCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentralCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentralCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
