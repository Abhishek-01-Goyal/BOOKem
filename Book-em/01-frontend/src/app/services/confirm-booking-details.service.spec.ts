import { TestBed } from '@angular/core/testing';

import { ConfirmBookingDetailsService } from './confirm-booking-details.service';

describe('ConfirmBookingDetailsService', () => {
  let service: ConfirmBookingDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmBookingDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
