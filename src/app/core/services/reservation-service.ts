import { Injectable } from '@angular/core';

import { Reservation } from '../../models/reservation';
import { Flight } from '../../models/flight';
import { Passenger } from '../../models/passenger';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private readonly storageKey = 'airlineReservations';

  // Load existing reservations when the application starts.
  private reservations: Reservation[] = this.loadReservations();

  createReservation(flight: Flight, passenger: Passenger): Reservation {
    const reservation: Reservation = {
      confirmationNumber: this.generateConfirmationNumber(),
      status: 'CONFIRMED',

      // Store copies so later form changes do not alter the reservation.
      flight: { ...flight },
      passenger: { ...passenger },

      total: flight.price,
    };

    this.reservations.push(reservation);
    this.saveReservations();

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

  private saveReservations(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.reservations));
  }

  private loadReservations(): Reservation[] {
    const savedReservations = localStorage.getItem(this.storageKey);

    if (!savedReservations) {
      return [];
    }

    try {
      return JSON.parse(savedReservations) as Reservation[];
    } catch (error) {
      console.error('Could not load saved reservations:', error);
      return [];
    }
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
