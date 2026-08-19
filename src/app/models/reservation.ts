import { Flight } from './flight';
import { Passenger } from './passenger';

export interface Reservation {
  confirmationNumber: string;
  status: 'CONFIRMED';
  flight: Flight;
  passenger: Passenger;
  total: number;
}
