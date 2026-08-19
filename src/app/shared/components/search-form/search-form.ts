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
