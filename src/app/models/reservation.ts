import { Flight } from './flight';
import { Passenger } from './passenger';

export type ReservationStatus = 'CONFIRMED' | 'CANCELLED';

export interface Reservation {
  id: number;
  confirmationNumber: string;
  userEmail: string;
  status: ReservationStatus;
  flight: Flight;
  passenger: Passenger;
  total: number;
  bookedAt: string;
  cancelledAt: string | null;
}

export interface CreateReservationRequest {
  userEmail: string;
  flightId: number;
  passengerFirstName: string;
  passengerLastName: string;
  passengerEmail: string;
  passengerPhone: string;
  passengerDateOfBirth: string;
  seatPreference: string;
}

export interface ReservationApiResponse {
  id: number;
  confirmationNumber: string;
  userEmail: string;
  flight: Flight;
  passengerFirstName: string;
  passengerLastName: string;
  passengerEmail: string;
  passengerPhone: string | null;
  passengerDateOfBirth: string;
  seatPreference: string;
  totalPrice: number;
  status: ReservationStatus;
  bookedAt: string;
  cancelledAt: string | null;
}
