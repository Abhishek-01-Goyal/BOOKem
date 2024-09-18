import { Component, OnInit } from '@angular/core';
import { ConfirmBookingDetailsService } from '../../services/confirm-booking-details.service';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';

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

  private stripePromise: Promise<Stripe | null>;
  cardElement: StripeCardElement | undefined;

  constructor(private confirmBookingDetailsService: ConfirmBookingDetailsService) {
    // Load the Stripe library using the publishable key
    this.stripePromise = loadStripe('your-publishable-key-here'); // Replace with your actual publishable key
  }

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

    // Setup Stripe card element
    this.initializeStripe();
  }

  // Initialize Stripe card element
  async initializeStripe() {
    const stripe = await this.stripePromise;

    if (stripe) {
      const elements: StripeElements = stripe.elements();
      this.cardElement = elements.create('card');
      this.cardElement.mount('#card-element');
    } else {
      console.error('Stripe failed to load');
    }
  }

  // Handle payment with Stripe
  async pay() {
    const stripe = await this.stripePromise;

    if (!stripe || !this.cardElement) {
      console.error('Stripe or card element is not available');
      return;
    }

    // Create a PaymentIntent on your server (example API request)
    const response = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: this.totalPayableAmount * 100 }) // Convert to cents
    });

    if (!response.ok) {
      console.error('Failed to create PaymentIntent');
      return;
    }

    const { clientSecret } = await response.json();

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: this.cardElement,
        billing_details: {
          name: 'Customer Name' // Replace with actual customer name if available
        }
      }
    });

    if (error) {
      console.error('Payment error:', error);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log('Payment successful');
      // Handle successful payment (e.g., show success message or redirect)
    }
  }
}
