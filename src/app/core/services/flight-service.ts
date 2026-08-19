import { Injectable } from '@angular/core';
import { Flight } from '../../models/flight';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private flights: Flight[] = this.generateMockFlights();

  searchFlights(origin: string, destination: string, departureDate: string): Flight[] {
    return this.flights.filter(
      (flight) =>
        flight.origin === origin &&
        flight.destination === destination &&
        flight.departureDate === departureDate,
    );
  }

  getFlights(): Flight[] {
    return this.flights;
  }

  getFlightById(id: number): Flight | undefined {
    return this.flights.find((flight) => flight.id === id);
  }

  private generateMockFlights(): Flight[] {
    const airports = [
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

    const flights: Flight[] = [];

    let id = 1;

    const today = new Date();

    // Generate flights for the next 90 days
    for (let day = 0; day < 90; day++) {
      const flightDate = new Date(today);

      flightDate.setDate(today.getDate() + day);

      const departureDate = this.formatDate(flightDate);

      // Every airport can be an origin
      for (const origin of airports) {
        // Every other airport can be a destination
        for (const destination of airports) {
          // Don't create DEN -> DEN, MCO -> MCO, etc.
          if (origin.code === destination.code) {
            continue;
          }

          // Create 4 flights per route per day
          for (let flightNumber = 0; flightNumber < 4; flightNumber++) {
            const departureHours = ['6:30 AM', '10:15 AM', '2:45 PM', '7:20 PM'];

            const arrivalHours = ['9:05 AM', '12:50 PM', '5:20 PM', '10:05 PM'];

            flights.push({
              id,

              airline: 'Group 3 Airways',

              flightNumber: `NB${100 + id}`,

              origin: origin.code,
              originCity: origin.city,

              destination: destination.code,
              destinationCity: destination.city,

              departureDate,

              departureTime: departureHours[flightNumber],

              arrivalTime: arrivalHours[flightNumber],

              duration: `${2 + ((id + flightNumber) % 4)}h ${15 + ((id * 7) % 40)}m`,

              stops: id % 5 === 0 ? 1 : 0,

              price: 149 + ((id * 17) % 300),
            });

            id++;
          }
        }
      }
    }

    return flights;
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, '0');

    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
