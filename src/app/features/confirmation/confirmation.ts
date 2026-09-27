import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

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
  isLoading = false;
  loadError = false;

  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
  ) {
    const confirmationNumber = this.route.snapshot.paramMap.get('confirmationNumber');
    if (!confirmationNumber) {
      this.reservation = this.reservationService.getCurrentReservation();
      return;
    }

    this.isLoading = true;
    this.reservationService.getReservation(confirmationNumber).subscribe({
      next: (reservation) => {
        this.reservation = reservation;
        this.isLoading = false;
        this.changeDetector.detectChanges();
      },
      error: () => {
        this.loadError = true;
        this.isLoading = false;
        this.changeDetector.detectChanges();
      },
    });
  }
}
