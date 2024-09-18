import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocationService } from '../../services/locations.service';
import { ConfirmBookingDetailsService } from '../../services/confirm-booking-details.service';
import { SingerStorageService } from '../../services/singer-storage.service';
import { Country } from '../../models/country';
import { State } from '../../models/state';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './confirm-booking-details.component.html',
  styleUrls: ['./confirm-booking-details.component.css']
})
export class ConfirmBookingDetailsComponent implements OnInit {
  countries: Country[] = [];
  states: State[] = [];
  bookingForm: FormGroup;
  selectedCountryName: string = '';
  selectedStateName: string = '';
  bookingDetails: any; // Will hold the booking details
  singer: any; // Retrieve singer details from the service

  constructor(
    private locationService: LocationService,
    private fb: FormBuilder,
    private router: Router,
    private confirmBookingDetailsService: ConfirmBookingDetailsService,
    private singerStorageService: SingerStorageService
  ) {
    this.bookingForm = this.fb.group({
      country: [''],
      state: ['']
    });
  }

  ngOnInit(): void {
    // Retrieve the booking details and singer from services
    this.bookingDetails = this.confirmBookingDetailsService.getBookingDetails();
    this.singer = this.singerStorageService.getSinger();
    
    // Initialize countries and form listeners
    this.loadCountries();
    this.setupFormListeners();

    // Optionally handle cases where booking details or singer details are not available
    if (!this.bookingDetails) {
      console.error('Booking details are not available.');
      // Handle missing booking details if necessary
    }

    if (!this.singer) {
      console.error('Singer details are not available.');
      // Handle missing singer details if necessary
    }
  }

  loadCountries(): void {
    this.locationService.getCountries().subscribe(
      (data: Country[]) => {
        this.countries = data;
        if (this.bookingDetails?.country) {
          this.onCountryChange(this.bookingDetails.country);
        }
      },
      error => {
        console.error('Error loading countries', error);
      }
    );
  }

  loadStates(countryId: number): void {
    this.locationService.getStatesByCountry(countryId).subscribe(
      (data: State[]) => {
        this.states = data;
        if (this.bookingDetails?.state) {
          this.onStateChange(this.bookingDetails.state);
        }
      },
      error => {
        console.error('Error loading states', error);
      }
    );
  }

  onCountryChange(countryId: number): void {
    const selectedCountry = this.countries.find(c => c.id === +countryId);
    this.selectedCountryName = selectedCountry ? selectedCountry.name : '';
    this.loadStates(+countryId);
  }

  onStateChange(stateId: number): void {
    const selectedState = this.states.find(s => s.id === +stateId);
    this.selectedStateName = selectedState ? selectedState.name : '';
  }

  private setupFormListeners(): void {
    this.bookingForm.get('country')?.valueChanges.subscribe(value => {
      this.onCountryChange(value);
    });

    this.bookingForm.get('state')?.valueChanges.subscribe(value => {
      this.onStateChange(value);
    });
  }

  editBooking(): void {
    // Redirect to the booking page
    this.router.navigate(['/booking']);
  }

  proceedToPayment(): void {
    // Navigate to the payment page
    this.router.navigate(['/payment-page']);
  }
}
