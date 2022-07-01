import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoteLComponent } from './hote-l.component';

describe('HoteLComponent', () => {
  let component: HoteLComponent;
  let fixture: ComponentFixture<HoteLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoteLComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoteLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
