import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  LucideSearch,
  LucideMapPin,
  LucideCalendarDays,
  LucideUsers,
  LucidePlaneTakeoff,
} from '@lucide/angular';

import { FlightSearch } from '../../../models/flight-search';

@Component({
  selector: 'app-search-form',
  imports: [
    FormsModule,
    LucideSearch,
    LucideMapPin,
    LucideCalendarDays,
    LucideUsers,
    LucidePlaneTakeoff,
  ],
  templateUrl: './search-form.html',
  styleUrl: './search-form.css',
})
export class SearchForm {
  roundTrip: boolean = false;

  search: FlightSearch = {
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    travelers: 1,
  };

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

  constructor(private router: Router) {}

  searchFlights(): void {
    this.router.navigate(['/flights'], {
      queryParams: {
        origin: this.search.origin,
        destination: this.search.destination,
        departureDate: this.search.departureDate,
        returnDate: this.roundTrip ? this.search.returnDate : null,
        travelers: this.search.travelers,
      },
    });
  }
}
