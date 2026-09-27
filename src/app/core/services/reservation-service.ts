import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

import { Passenger } from '../../models/passenger';
import {
  CreateReservationRequest,
  Reservation,
  ReservationApiResponse,
} from '../../models/reservation';
import { API_BASE_URL } from '../api-base-url';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private readonly apiUrl = `${API_BASE_URL}/reservations`;

  private currentReservation?: Reservation;

  constructor(private http: HttpClient) {}

  createReservation(
    userEmail: string,
    flightId: number,
    passenger: Passenger,
  ): Observable<Reservation> {
    const request: CreateReservationRequest = {
      userEmail,
      flightId,
      passengerFirstName: passenger.firstName,
      passengerLastName: passenger.lastName,
      passengerEmail: passenger.email,
      passengerPhone: passenger.phone,
      passengerDateOfBirth: passenger.dateOfBirth,
      seatPreference: passenger.seatPreference,
    };

    return this.http.post<ReservationApiResponse>(this.apiUrl, request, { withCredentials: true }).pipe(
      map((response) => this.mapReservation(response)),
      tap((reservation) => {
        this.currentReservation = reservation;

        sessionStorage.setItem('currentReservation', JSON.stringify(reservation));
      }),
    );
  }

  getReservations(userEmail: string): Observable<Reservation[]> {
    const params = new HttpParams().set('userEmail', userEmail);

    return this.http
      .get<ReservationApiResponse[]>(this.apiUrl, { params, withCredentials: true })
      .pipe(map((responses) => responses.map((response) => this.mapReservation(response))));
  }

  getReservation(confirmationNumber: string): Observable<Reservation> {
    return this.http.get<ReservationApiResponse>(`${this.apiUrl}/${confirmationNumber}`, { withCredentials: true }).pipe(
      map((response) => this.mapReservation(response)),
      tap((reservation) => {
        this.currentReservation = reservation;
      }),
    );
  }

  cancelReservation(confirmationNumber: string, userEmail: string): Observable<Reservation> {
    const params = new HttpParams().set('userEmail', userEmail);

    return this.http
      .patch<ReservationApiResponse>(`${this.apiUrl}/${confirmationNumber}/cancel`, null, {
        params,
        withCredentials: true,
      })
      .pipe(
        map((response) => this.mapReservation(response)),
        tap((reservation) => {
          this.currentReservation = reservation;

          sessionStorage.setItem('currentReservation', JSON.stringify(reservation));
        }),
      );
  }

  getCurrentReservation(): Reservation | undefined {
    if (this.currentReservation) {
      return this.currentReservation;
    }

    const savedReservation = sessionStorage.getItem('currentReservation');

    if (!savedReservation) {
      return undefined;
    }

    try {
      this.currentReservation = JSON.parse(savedReservation) as Reservation;

      return this.currentReservation;
    } catch (error) {
      console.error('Could not restore current reservation:', error);

      return undefined;
    }
  }

  private mapReservation(response: ReservationApiResponse): Reservation {
    return {
      id: response.id,
      confirmationNumber: response.confirmationNumber,
      userEmail: response.userEmail,
      status: response.status,
      flight: response.flight,
      passenger: {
        firstName: response.passengerFirstName,
        lastName: response.passengerLastName,
        email: response.passengerEmail,
        phone: response.passengerPhone ?? '',
        dateOfBirth: response.passengerDateOfBirth,
        seatPreference: response.seatPreference.toLowerCase() as Passenger['seatPreference'],
      },
      total: response.totalPrice,
      bookedAt: response.bookedAt,
      cancelledAt: response.cancelledAt,
    };
  }
}
