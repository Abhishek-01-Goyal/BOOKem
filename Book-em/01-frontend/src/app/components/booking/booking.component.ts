import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SingerProfileService } from '../../services/singer-profile.service';
import { ConfirmBookingDetailsService } from '../../services/confirm-booking-details.service';
import { SingerStorageService } from '../../services/singer-storage.service';
import { LocationService } from '../../services/locations.service';
import { Country } from '../../models/country'; // Import Country model
import { State } from '../../models/state';     // Import State model
import { Singer } from '../../models/singer';   // Import Singer model

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit, OnDestroy {
  bookingForm: FormGroup;
  countries: Country[] = [];
  states: State[] = [];
  singer: Singer | null = null; // Allow null for uninitialized state

  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private locationService: LocationService,
    private singerProfileService: SingerProfileService,
    private confirmBookingDetailsService: ConfirmBookingDetailsService,
    private singerStorageService: SingerStorageService
  ) {
    // Initialize the form group with form controls and validators
    this.bookingForm = this.fb.group({
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      addressLine3: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      bookingDate: ['', Validators.required],
      bookingTime: ['', Validators.required],
      bookingHours: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadSingerDetails();
    this.loadCountries();

    // Listen for changes in the country dropdown
    this.bookingForm.get('country')?.valueChanges.subscribe(selectedCountryId => {
      if (selectedCountryId) {
        this.onCountryChange(selectedCountryId);
      }
    });
  }

  loadCountries(): void {
    const sub = this.locationService.getCountries().subscribe(
      (countries: Country[]) => {
        this.countries = countries;
      },
      error => {
        console.error('Error fetching countries:', error);
      }
    );
    this.subscriptions.add(sub); // Add subscription to cleanup list
  }

  onCountryChange(event: Event): void {
    const target = event.target as HTMLSelectElement; // Cast to HTMLSelectElement
    const countryId = Number(target?.value); // Use optional chaining
  
    if (countryId) {
      this.locationService.getStatesByCountry(countryId).subscribe(
        (states: State[]) => {
          this.states = states;
          this.bookingForm.get('state')?.setValue(''); // Reset the state control
        },
        error => {
          console.error('Failed to load states:', error); // Log errors if any
        }
      );
    } else {
      this.states = [];
    }
  }
  
  loadSingerDetails(): void {
    const storedSinger = this.singerStorageService.getSinger();
    if (storedSinger) {
      this.singer = storedSinger;
    } else {
      const singerId = this.route.snapshot.queryParamMap.get('id');
      if (singerId) {
        const idAsNumber = +singerId;
        if (!isNaN(idAsNumber)) {
          const sub = this.singerProfileService.getSingerById(idAsNumber).subscribe(
            data => {
              this.singer = data;
              this.singerStorageService.setSinger(data);
            },
            error => {
              console.error('Error fetching singer details:', error);
            }
          );
          this.subscriptions.add(sub);
        }
      }
    }
  }

  submitBooking(): void {
    if (this.bookingForm.valid) {
      const bookingDetails = {
        singer: this.singer,
        ...this.bookingForm.value
      };
      this.confirmBookingDetailsService.setBookingDetails(bookingDetails);
      this.router.navigate(['/confirm-booking-details']);
    } else {
      console.error('Booking form is invalid');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
