export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  departure: {
    airport: string;
    city: string;
    country: string;
    time: string;
    timezone: string;
    gate: string;
    terminal: string;
  };
  arrival: {
    airport: string;
    city: string;
    country: string;
    time: string;
    timezone: string;
    gate: string;
    terminal: string;
  };
  status: 'On Time' | 'Delayed' | 'Boarding' | 'Departed' | 'Arrived';
  aircraft: string;
  duration: string;
  date: string;
}

const mockFlights: Flight[] = [
  {
    id: '1',
    flightNumber: 'CY2025',
    airline: 'NeonAir',
    departure: {
      airport: 'LAX',
      city: 'Los Angeles',
      country: 'USA',
      time: '08:30',
      timezone: 'PST (UTC-8)',
      gate: 'A42',
      terminal: 'T4',
    },
    arrival: {
      airport: 'NRT',
      city: 'Tokyo',
      country: 'Japan',
      time: '14:45',
      timezone: 'JST (UTC+9)',
      gate: 'B17',
      terminal: 'T1',
    },
    status: 'On Time',
    aircraft: 'Boeing 787-9 Dreamliner',
    duration: '11h 15m',
    date: '2025-12-15',
  },
  {
    id: '2',
    flightNumber: 'CY2025',
    airline: 'NeonAir',
    departure: {
      airport: 'SFO',
      city: 'San Francisco',
      country: 'USA',
      time: '10:00',
      timezone: 'PST (UTC-8)',
      gate: 'C22',
      terminal: 'T3',
    },
    arrival: {
      airport: 'HND',
      city: 'Tokyo Haneda',
      country: 'Japan',
      time: '16:30',
      timezone: 'JST (UTC+9)',
      gate: 'D08',
      terminal: 'T2',
    },
    status: 'Boarding',
    aircraft: 'Airbus A350-1000',
    duration: '10h 30m',
    date: '2025-12-15',
  },
  {
    id: '3',
    flightNumber: 'NX1337',
    airline: 'NeonX Airways',
    departure: {
      airport: 'JFK',
      city: 'New York',
      country: 'USA',
      time: '22:00',
      timezone: 'EST (UTC-5)',
      gate: 'B88',
      terminal: 'T7',
    },
    arrival: {
      airport: 'LHR',
      city: 'London',
      country: 'UK',
      time: '10:15',
      timezone: 'GMT (UTC+0)',
      gate: 'A05',
      terminal: 'T5',
    },
    status: 'Delayed',
    aircraft: 'Boeing 777-300ER',
    duration: '7h 15m',
    date: '2025-12-16',
  },
  {
    id: '4',
    flightNumber: 'SY0101',
    airline: 'Synthwave Air',
    departure: {
      airport: 'DXB',
      city: 'Dubai',
      country: 'UAE',
      time: '01:30',
      timezone: 'GST (UTC+4)',
      gate: 'F12',
      terminal: 'T3',
    },
    arrival: {
      airport: 'SIN',
      city: 'Singapore',
      country: 'Singapore',
      time: '13:00',
      timezone: 'SGT (UTC+8)',
      gate: 'C44',
      terminal: 'T1',
    },
    status: 'On Time',
    aircraft: 'Airbus A380-800',
    duration: '7h 30m',
    date: '2025-12-17',
  },
  {
    id: '5',
    flightNumber: 'NC4444',
    airline: 'Night Express',
    departure: {
      airport: 'ICN',
      city: 'Seoul',
      country: 'South Korea',
      time: '15:45',
      timezone: 'KST (UTC+9)',
      gate: 'E23',
      terminal: 'T2',
    },
    arrival: {
      airport: 'CDG',
      city: 'Paris',
      country: 'France',
      time: '20:30',
      timezone: 'CET (UTC+1)',
      gate: 'L07',
      terminal: 'T2E',
    },
    status: 'Departed',
    aircraft: 'Boeing 787-10',
    duration: '12h 45m',
    date: '2025-12-18',
  },
  {
    id: '6',
    flightNumber: 'VK0800',
    airline: 'Void Knight',
    departure: {
      airport: 'SYD',
      city: 'Sydney',
      country: 'Australia',
      time: '07:00',
      timezone: 'AEDT (UTC+11)',
      gate: 'D55',
      terminal: 'T1',
    },
    arrival: {
      airport: 'LAX',
      city: 'Los Angeles',
      country: 'USA',
      time: '06:30',
      timezone: 'PST (UTC-8)',
      gate: 'B33',
      terminal: 'TB',
    },
    status: 'Arrived',
    aircraft: 'Airbus A350-900',
    duration: '13h 30m',
    date: '2025-12-14',
  },
];

export async function searchFlights(query: string): Promise<Flight[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  if (!query.trim()) {
    return [];
  }
  
  const normalizedQuery = query.toUpperCase().trim();
  
  return mockFlights.filter((flight) =>
    flight.flightNumber.toUpperCase().includes(normalizedQuery)
  );
}
