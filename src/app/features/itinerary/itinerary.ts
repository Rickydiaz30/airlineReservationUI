import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../core/services/reservation-service';

@Component({
  selector: 'app-itinerary',
  imports: [RouterLink],
  templateUrl: './itinerary.html',
  styleUrl: './itinerary.css',
})
export class Itinerary {
  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) {
    this.reservations = this.reservationService.getReservations();
  }
}
