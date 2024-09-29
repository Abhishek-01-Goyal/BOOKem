import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process-payment-page',
  templateUrl: './process-payment-page.component.html',
  styleUrls: ['./process-payment-page.component.css']
})
export class ProcessPaymentPageComponent implements OnInit {
  paymentAmount: number = 1000; // Example amount in INR paise

  ngOnInit(): void {
  }


  // Razorpay Integration
  payWithRazorpay(method: string) {
    const options = {
      key: 'rzp_test_2KWR3nNagQdO9J', // Replace with your Razorpay Key ID
      amount: this.paymentAmount, // Payment amount in paise
      currency: 'INR',
      name: 'Gozira Tech',
      description: 'Payment for Order',
      handler: function (response: any) {
        console.log('Payment successful:', response);
        alert('Payment Successful!');
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#3399cc'
      },
      method: {
        netbanking: method === 'netbanking',
        card: method === 'card',
        upi: method === 'upi'
      },
      "modal": {
        "ondismiss": function () {
          console.log('Payment dismissed');
        }
      }
    };

    const rzp1 = new (window as any).Razorpay(options);
    rzp1.open();
  }
}
