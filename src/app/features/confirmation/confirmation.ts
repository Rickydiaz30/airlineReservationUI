import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../core/services/reservation-service';

@Component({
  selector: 'app-confirmation',
  imports: [RouterLink],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css',
})
export class Confirmation {
  reservation?: Reservation;

  constructor(private reservationService: ReservationService) {
    this.reservation = this.reservationService.getCurrentReservation();
  }
}
