import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmBookingDetailsService } from '../../services/confirm-booking-details.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {
  bookingDetails: any;
  totalPayableAmount: number = 0;
  bookingAmount: number = 0;
  breakdown: { basePrice: number, additionalCharges: number, discounts: number } | null = null;
  bookingBreakdown: { pricePerHour: number, discount: number } | null = null;

  constructor(
    private confirmBookingDetailsService: ConfirmBookingDetailsService,
    private router: Router // Inject Router for navigation
  ) {}

  ngOnInit(): void {
    // Retrieve the booking details
    this.bookingDetails = this.confirmBookingDetailsService.getBookingDetails();

    // Ensure booking details are available
    if (this.bookingDetails) {
      const pricePerHour = this.bookingDetails.singer.pricePerHour;
      const bookingHours = this.bookingDetails.bookingHours;
      const additionalCharges = 20; // Example additional charges
      const discounts = 10; // Example discounts

      // Calculate the total payable amount and the booking amount
      this.breakdown = {
        basePrice: pricePerHour,
        additionalCharges,
        discounts
      };
      this.totalPayableAmount = bookingHours * pricePerHour + additionalCharges - discounts;
      this.bookingAmount = (pricePerHour - 5) * 0.5; // 50% of price after discount

      this.bookingBreakdown = {
        pricePerHour,
        discount: 5 // Example discount applied
      };
    }
  }

  // Redirect to the process payment page
  pay() {
    this.router.navigate(['/process-payment-page'], {
      queryParams: { amount: this.totalPayableAmount }
    });
  }
}
