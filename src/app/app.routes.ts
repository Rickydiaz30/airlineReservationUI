import { Routes } from '@angular/router';

import { Home } from './features/home/home';
import { FlightResults } from './features/flight-results/flight-results';
import { Booking } from './features/booking/booking';
import { Confirmation } from './features/confirmation/confirmation';
import { Itinerary } from './features/itinerary/itinerary';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'flights',
    component: FlightResults,
  },
  {
    path: 'booking/:flightId',
    component: Booking,
  },
  {
    path: 'confirmation',
    component: Confirmation,
  },
  {
    path: 'my-booking',
    component: Itinerary,
  },
];
