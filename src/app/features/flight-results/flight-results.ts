import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LucidePlane } from '@lucide/angular';

import { Flight } from '../../models/flight';
import { FlightService } from '../../core/services/flight-service';

@Component({
  selector: 'app-flight-results',
  imports: [LucidePlane],
  templateUrl: './flight-results.html',
  styleUrl: './flight-results.css',
})
export class FlightResults {
  origin = '';
  destination = '';
  departureDate = '';
  returnDate = '';
  travelers = 1;

  flights: Flight[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService,
  ) {
    this.flights = this.flightService.getFlights();

    this.route.queryParams.subscribe((params) => {
      this.origin = params['origin'] ?? '';
      this.destination = params['destination'] ?? '';
      this.departureDate = params['departureDate'] ?? '';
      this.returnDate = params['returnDate'] ?? '';
      this.travelers = Number(params['travelers']) || 1;
    });
  }

  selectFlight(flightId: number): void {
    this.router.navigate(['/booking', flightId]);
  }
}
