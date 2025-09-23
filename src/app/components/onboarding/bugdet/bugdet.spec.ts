import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugdetComponent } from './bugdet';

describe('BugdetComponent', () => {
  let component: BugdetComponent;
  let fixture: ComponentFixture<BugdetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BugdetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BugdetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
