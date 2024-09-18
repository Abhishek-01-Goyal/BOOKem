import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BrowseSingersComponent } from './components/browse-singers/browse-singers.component';
import { GenreSingersComponent } from './components/genre-singers/genre-singers.component';
import { AllSingersComponent } from './components/all-singers/all-singers.component';
import { SingerProfileComponent } from './components/singer-profile/singer-profile.component';
import { BookingComponent } from './components/booking/booking.component';
import { ConfirmBookingDetailsComponent } from './components/confirm-booking-details/confirm-booking-details.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingPageComponent,
    BrowseSingersComponent,
    GenreSingersComponent,
    AllSingersComponent,
    SingerProfileComponent,
    BookingComponent,
    ConfirmBookingDetailsComponent,
    PaymentPageComponent
  
        
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
