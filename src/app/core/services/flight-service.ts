import { Injectable } from '@angular/core';
import { Flight } from '../../models/flight';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private flights: Flight[] = [
    {
      id: 1,
      airline: 'Nimbus Airways',
      flightNumber: 'NB102',
      origin: 'DEN',
      originCity: 'Denver',
      destination: 'MCO',
      destinationCity: 'Orlando',
      departureTime: '8:30 AM',
      arrivalTime: '1:05 PM',
      duration: '2h 35m',
      stops: 0,
      price: 219,
    },
    {
      id: 2,
      airline: 'Nimbus Airways',
      flightNumber: 'NB214',
      origin: 'DEN',
      originCity: 'Denver',
      destination: 'MCO',
      destinationCity: 'Orlando',
      departureTime: '11:45 AM',
      arrivalTime: '4:20 PM',
      duration: '2h 35m',
      stops: 0,
      price: 249,
    },
    {
      id: 3,
      airline: 'Nimbus Airways',
      flightNumber: 'NB330',
      origin: 'DEN',
      originCity: 'Denver',
      destination: 'MCO',
      destinationCity: 'Orlando',
      departureTime: '5:10 PM',
      arrivalTime: '9:50 PM',
      duration: '2h 40m',
      stops: 1,
      price: 189,
    },
  ];

  getFlights(): Flight[] {
    return this.flights;
  }

  getFlightById(id: number): Flight | undefined {
    return this.flights.find((flight) => flight.id === id);
  }
}
