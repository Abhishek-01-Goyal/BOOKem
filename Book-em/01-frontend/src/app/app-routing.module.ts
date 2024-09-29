import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BrowseSingersComponent } from './components/browse-singers/browse-singers.component';
import { GenreSingersComponent } from './components/genre-singers/genre-singers.component';
import { AllSingersComponent } from './components/all-singers/all-singers.component';
import { SingerProfileComponent } from './components/singer-profile/singer-profile.component';
import { BookingComponent } from './components/booking/booking.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';
import { ConfirmBookingDetailsComponent } from './components/confirm-booking-details/confirm-booking-details.component';
import { ProcessPaymentPageComponent } from './components/process-payment-page/process-payment-page.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'landing-page', pathMatch: 'full' }, // Redirect to landing page
  { path: '', component: HomeComponent }, // Landing page
  { path: 'landing-page', component: LandingPageComponent }, // Landing page
  { path: 'home', component: HomeComponent }, // Home page
  { path: 'browse-singers', component: BrowseSingersComponent },
  { path: 'singers/:genre', component: GenreSingersComponent },
  { path: 'all-singers', component: AllSingersComponent },
  { path: 'singer-profile/:id', component: SingerProfileComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'confirm-booking-details', component: ConfirmBookingDetailsComponent },
  { path: 'payment-page', component: PaymentPageComponent},
  { path: 'process-payment-page', component: ProcessPaymentPageComponent },

  //{ path: '**', redirectTo: 'landing-page' } // Redirect unknown paths to landing page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
