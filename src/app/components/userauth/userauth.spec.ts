import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userauth } from './userauth';

describe('Userauth', () => {
  let component: Userauth;
  let fixture: ComponentFixture<Userauth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Userauth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Userauth);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
