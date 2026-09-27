import { ChangeDetectorRef, Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../core/services/auth-service';
import { FlightService } from '../../core/services/flight-service';
import { ReservationService } from '../../core/services/reservation-service';

import { Flight } from '../../models/flight';
import { Passenger } from '../../models/passenger';

@Component({
  selector: 'app-booking',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking {
  flight?: Flight;

  isLoading = true;
  loadError = false;
  isSubmitting = false;
  submitError = '';

  passenger: Passenger = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    seatPreference: 'window',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService,
    private reservationService: ReservationService,
    private authService: AuthService,
    private changeDetector: ChangeDetectorRef,
  ) {
    const flightId = Number(this.route.snapshot.paramMap.get('flightId'));

    if (!Number.isInteger(flightId) || flightId < 1) {
      this.isLoading = false;
      this.loadError = true;
      return;
    }

    this.flightService.getFlightById(flightId).subscribe({
      next: (flight) => {
        this.flight = flight;
        this.isLoading = false;
        this.loadError = false;

        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.error('Unable to load flight:', error);

        this.flight = undefined;
        this.isLoading = false;
        this.loadError = true;

        this.changeDetector.detectChanges();
      },
    });
  }

  get reservationTotal(): number {
    return this.flight?.price ?? 0;
  }

  confirmBooking(): void {
    if (!this.flight || this.isSubmitting) {
      return;
    }

    const user = this.authService.currentUser();

    if (!user) {
      this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: this.router.url,
        },
      });

      return;
    }

    this.isSubmitting = true;
    this.submitError = '';

    this.reservationService
      .createReservation(user.email, this.flight.id, this.passenger)
      .subscribe({
        next: (reservation) => {
          console.log('Reservation created:', reservation);

          this.isSubmitting = false;

          this.router.navigate(['/confirmation']);
        },
        error: (error) => {
          console.error('Unable to create reservation:', error);

          this.isSubmitting = false;
          this.submitError = 'We could not complete your reservation. Please try again.';

          this.changeDetector.detectChanges();
        },
      });
  }
}
