import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '../../models/flight';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private readonly apiUrl = 'http://localhost:8081/api/flights';

  constructor(private http: HttpClient) {}

  searchFlights(origin: string, destination: string, departureDate: string): Observable<Flight[]> {
    const params = new HttpParams()
      .set('origin', origin)
      .set('destination', destination)
      .set('date', departureDate);

    return this.http.get<Flight[]>(`${this.apiUrl}/search`, { params });
  }

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.apiUrl);
  }

  getFlightById(id: number): Observable<Flight> {
    return this.http.get<Flight>(`${this.apiUrl}/${id}`);
  }
}
