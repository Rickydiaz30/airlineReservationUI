import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../core/services/reservation-service';
import { Flight } from '../../models/flight';
import { Passenger } from '../../models/passenger';
import { FlightService } from '../../core/services/flight-service';

@Component({
  selector: 'app-booking',
  imports: [FormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking {
  flight?: Flight;

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
  ) {
    const flightId = Number(this.route.snapshot.paramMap.get('flightId'));

    this.flight = this.flightService.getFlightById(flightId);
  }

  confirmBooking(): void {
    if (!this.flight) {
      return;
    }

    const reservation = this.reservationService.createReservation(this.flight, this.passenger);

    console.log('Reservation created:', reservation);

    this.router.navigate(['/confirmation']);
  }
}
