import { Injectable } from '@angular/core';

import { Reservation } from '../../models/reservation';
import { Flight } from '../../models/flight';
import { Passenger } from '../../models/passenger';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  // Store all reservations made during this session
  private reservations: Reservation[] = [];

  createReservation(flight: Flight, passenger: Passenger): Reservation {
    const reservation: Reservation = {
      confirmationNumber: this.generateConfirmationNumber(),
      status: 'CONFIRMED',
      flight,
      passenger,
      total: 0,
    };

    // Add instead of replacing
    this.reservations.push(reservation);

    return reservation;
  }

  // Used by My Itinerary
  getReservations(): Reservation[] {
    return this.reservations;
  }

  // Used by Confirmation page
  getCurrentReservation(): Reservation | undefined {
    return this.reservations.at(-1);
  }

  private generateConfirmationNumber(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let code = '';

    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return `NIM-${code}`;
  }
}
