import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationAdminHotelComponent } from './reservation-admin-hotel.component';

describe('ReservationAdminHotelComponent', () => {
  let component: ReservationAdminHotelComponent;
  let fixture: ComponentFixture<ReservationAdminHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationAdminHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationAdminHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
