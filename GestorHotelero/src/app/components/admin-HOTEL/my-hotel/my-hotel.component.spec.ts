import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHotelComponent } from './my-hotel.component';

describe('MyHotelComponent', () => {
  let component: MyHotelComponent;
  let fixture: ComponentFixture<MyHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
