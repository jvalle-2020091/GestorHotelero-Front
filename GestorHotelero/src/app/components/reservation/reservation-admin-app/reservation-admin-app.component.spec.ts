import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationAdminAppComponent } from './reservation-admin-app.component';

describe('ReservationAdminAppComponent', () => {
  let component: ReservationAdminAppComponent;
  let fixture: ComponentFixture<ReservationAdminAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationAdminAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationAdminAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
