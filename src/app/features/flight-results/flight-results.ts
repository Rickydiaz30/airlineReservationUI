import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LucidePlane } from '@lucide/angular';
import { FormsModule } from '@angular/forms';
import { Flight } from '../../models/flight';
import { FlightService } from '../../core/services/flight-service';

@Component({
  selector: 'app-flight-results',
  imports: [LucidePlane, FormsModule],
  templateUrl: './flight-results.html',
  styleUrl: './flight-results.css',
})
export class FlightResults {
  origin = '';
  destination = '';
  departureDate = '';
  returnDate = '';
  travelers = 1;
  filterOrigin = '';
  filterDestination = '';
  maxPrice?: number;
  stopsFilter = 'all';
  sortBy = 'price-low';

  airports = [
    { code: 'DEN', city: 'Denver' },
    { code: 'MCO', city: 'Orlando' },
    { code: 'LAS', city: 'Las Vegas' },
    { code: 'LAX', city: 'Los Angeles' },
    { code: 'SEA', city: 'Seattle' },
    { code: 'ORD', city: 'Chicago' },
    { code: 'JFK', city: 'New York' },
    { code: 'ATL', city: 'Atlanta' },
    { code: 'DFW', city: 'Dallas' },
    { code: 'PHX', city: 'Phoenix' },
    { code: 'SFO', city: 'San Francisco' },
    { code: 'OMA', city: 'Omaha' },
  ];

  flights: Flight[] = [];
  allFlights: Flight[] = [];

  pageSize = 20;
  currentPage = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.origin = params['origin'] ?? '';
      this.destination = params['destination'] ?? '';
      this.departureDate = params['departureDate'] ?? '';
      this.returnDate = params['returnDate'] ?? '';
      this.travelers = Number(params['travelers']) || 1;

      if (this.origin && this.destination && this.departureDate) {
        this.allFlights = this.flightService.searchFlights(
          this.origin,
          this.destination,
          this.departureDate,
        );
      } else {
        this.allFlights = this.flightService.getFlights();
      }

      this.flights = [...this.allFlights];
    });
  }

  selectFlight(flightId: number): void {
    this.router.navigate(['/booking', flightId]);
  }

  applyFilters(): void {
    let filteredFlights = [...this.allFlights];

    if (this.filterOrigin.trim()) {
      filteredFlights = filteredFlights.filter(
        (flight) => flight.origin.toLowerCase() === this.filterOrigin.trim().toLowerCase(),
      );
    }

    if (this.filterDestination.trim()) {
      filteredFlights = filteredFlights.filter(
        (flight) =>
          flight.destination.toLowerCase() === this.filterDestination.trim().toLowerCase(),
      );
    }

    if (this.maxPrice) {
      filteredFlights = filteredFlights.filter((flight) => flight.price <= this.maxPrice!);
    }

    if (this.stopsFilter !== 'all') {
      filteredFlights = filteredFlights.filter(
        (flight) => flight.stops === Number(this.stopsFilter),
      );
    }

    if (this.sortBy === 'price-low') {
      filteredFlights.sort((a, b) => a.price - b.price);
    }

    if (this.sortBy === 'price-high') {
      filteredFlights.sort((a, b) => b.price - a.price);
    }

    if (this.sortBy === 'duration') {
      filteredFlights.sort(
        (a, b) => this.durationToMinutes(a.duration) - this.durationToMinutes(b.duration),
      );
    }

    this.flights = filteredFlights;
  }

  private durationToMinutes(duration: string): number {
    const match = duration.match(/(\d+)h\s+(\d+)m/);

    if (!match) {
      return 0;
    }

    const hours = Number(match[1]);
    const minutes = Number(match[2]);

    return hours * 60 + minutes;
  }

  get visibleFlights(): Flight[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;

    return this.flights.slice(start, end);
  }
}
