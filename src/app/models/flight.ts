export interface Flight {
  id: number;
  airline: string;
  flightNumber: string;

  origin: string;
  originCity: string;

  destination: string;
  destinationCity: string;

  departureTime: string;
  arrivalTime: string;

  duration: string;
  stops: number;

  price: number;
}
