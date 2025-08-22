import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bugdet } from './bugdet';

describe('Bugdet', () => {
  let component: Bugdet;
  let fixture: ComponentFixture<Bugdet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bugdet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bugdet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
