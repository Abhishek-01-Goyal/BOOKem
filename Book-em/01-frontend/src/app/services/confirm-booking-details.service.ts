import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmBookingDetailsService {
  private bookingDetails: any = {};

  constructor() {}

  setBookingDetails(details: any): void {
    this.bookingDetails = details;
  }

  getBookingDetails(): any {
    return this.bookingDetails;
  }
}
