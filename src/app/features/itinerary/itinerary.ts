import { ChangeDetectorRef, Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth-service';
import { ReservationService } from '../../core/services/reservation-service';
import { Reservation } from '../../models/reservation';

@Component({
  selector: 'app-itinerary',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './itinerary.html',
  styleUrl: './itinerary.css',
})
export class Itinerary {
  reservations: Reservation[] = [];

  isLoading = true;
  loadError = false;

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.loadReservations();
  }

  private loadReservations(): void {
    const user = this.authService.currentUser();

    if (!user) {
      this.isLoading = false;
      this.loadError = true;
      return;
    }

    this.reservationService.getReservations(user.email).subscribe({
      next: (reservations) => {
        this.reservations = reservations;
        this.isLoading = false;
        this.loadError = false;

        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.error('Unable to load reservations:', error);

        this.reservations = [];
        this.isLoading = false;
        this.loadError = true;

        this.changeDetector.detectChanges();
      },
    });
  }
}
