import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBookingDetailsComponent } from './confirm-booking-details.component';

describe('ConfirmBookingDetailsComponent', () => {
  let component: ConfirmBookingDetailsComponent;
  let fixture: ComponentFixture<ConfirmBookingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmBookingDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
