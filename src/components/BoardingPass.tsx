'use client';

import { Flight } from '@/lib/mockFlights';
import { useMemo } from 'react';

interface BoardingPassProps {
  flight: Flight;
  index: number;
}

// Calculate flight progress based on status and times
function getFlightProgress(flight: Flight): number {
  if (flight.status === 'Arrived') return 100;
  if (flight.status === 'Departed') return 65;
  if (flight.status === 'Boarding') return 10;
  if (flight.status === 'On Time' || flight.status === 'Delayed') return 0;
  return 0;
}

// Get appropriate icon based on flight status and progress
function getFlightIcon(status: Flight['status']): string {
  switch (status) {
    case 'Arrived':
      return '🛬';
    case 'Departed':
      return '✈️';
    case 'Boarding':
      return '🛫';
    case 'On Time':
    case 'Delayed':
    default:
      return '🛫';
  }
}

export default function BoardingPass({ flight, index }: BoardingPassProps) {
  const barcode = useMemo(() => {
    const heights = [];
    for (let i = 0; i < 40; i++) {
      heights.push(Math.random() * 30 + 20);
    }
    return heights;
  }, []);

  const progress = getFlightProgress(flight);
  const flightIcon = getFlightIcon(flight.status);

  const statusColor = {
    'On Time': 'text-[#00ff00] neon-text',
    'Delayed': 'text-[#ff0000]',
    'Boarding': 'text-[#ffff00] neon-text-yellow',
    'Departed': 'text-[#00ffff] neon-text',
    'Arrived': 'text-[#ff00ff] neon-text-magenta',
  };

  return (
    <div
      className="boarding-pass rounded-lg p-6 mb-6"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-xs text-gray-400 mb-1">/// DIGITAL BOARDING PASS ///</p>
          <h2 className="text-2xl font-bold text-[#00ffff] neon-text font-[var(--font-orbitron)]">
            {flight.airline.toUpperCase()}
          </h2>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400 mb-1">FLIGHT</p>
          <p className="text-3xl font-bold text-[#ff00ff] neon-text-magenta glitch font-[var(--font-orbitron)]">
            {flight.flightNumber}
          </p>
        </div>
      </div>

      {/* Flight Route */}
      <div className="flight-path-container mb-6 py-4">
        {/* Airport codes row */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* Departure */}
          <div className="text-left z-10">
            <p className="text-4xl font-bold text-[#00ffff] neon-text font-[var(--font-orbitron)]">
              {flight.departure.airport}
            </p>
            <p className="text-sm text-gray-300 mt-1">{flight.departure.city}</p>
            <p className="text-xs text-gray-500">{flight.departure.country}</p>
          </div>

          {/* Empty center for spacing */}
          <div></div>

          {/* Arrival */}
          <div className="text-right z-10">
            <p className="text-4xl font-bold text-[#ff00ff] neon-text-magenta font-[var(--font-orbitron)]">
              {flight.arrival.airport}
            </p>
            <p className="text-sm text-gray-300 mt-1">{flight.arrival.city}</p>
            <p className="text-xs text-gray-500">{flight.arrival.country}</p>
          </div>
        </div>

        {/* Progress bar with airplane */}
        <div className="flight-progress-container relative mx-4">
          {/* Background track */}
          <div className="flight-progress-track h-1 bg-gray-700 rounded-full relative">
            {/* Progress fill */}
            <div 
              className="flight-progress-fill h-full rounded-full bg-gradient-to-r from-[#00ffff] to-[#ff00ff]"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Airplane icon positioned along track */}
          <div 
            className="plane-icon absolute -top-4 transform -translate-x-1/2 text-3xl transition-all duration-500"
            style={{ left: `${progress}%` }}
          >
            {flightIcon}
          </div>
        </div>
      </div>

      {/* Time Info */}
      <div className="grid grid-cols-2 gap-8 mb-6">
        <div className="border-l-2 border-[#00ffff] pl-4">
          <p className="text-xs text-gray-400">DEPARTURE</p>
          <p className="text-2xl font-bold text-white font-[var(--font-share-tech)]">
            {flight.departure.time}
          </p>
          <p className="text-xs text-[#00ffff]">{flight.departure.timezone}</p>
        </div>
        <div className="border-l-2 border-[#ff00ff] pl-4">
          <p className="text-xs text-gray-400">ARRIVAL</p>
          <p className="text-2xl font-bold text-white font-[var(--font-share-tech)]">
            {flight.arrival.time}
          </p>
          <p className="text-xs text-[#ff00ff]">{flight.arrival.timezone}</p>
        </div>
      </div>

      {/* Dotted Line */}
      <div className="dotted-line my-4"></div>

      {/* Details Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6 text-center">
        <div>
          <p className="text-xs text-gray-400">DATE</p>
          <p className="text-sm font-bold text-white font-[var(--font-share-tech)]">
            {flight.date}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400">DURATION</p>
          <p className="text-sm font-bold text-[#ffff00] neon-text-yellow font-[var(--font-share-tech)]">
            {flight.duration}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400">GATE</p>
          <p className="text-sm font-bold text-white font-[var(--font-share-tech)]">
            {flight.departure.gate}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400">TERMINAL</p>
          <p className="text-sm font-bold text-white font-[var(--font-share-tech)]">
            {flight.departure.terminal}
          </p>
        </div>
      </div>

      {/* Status & Aircraft */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-xs text-gray-400">AIRCRAFT</p>
          <p className="text-sm text-gray-300 font-[var(--font-share-tech)]">
            {flight.aircraft}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">STATUS</p>
          <p className={`text-lg font-bold ${statusColor[flight.status]} font-[var(--font-orbitron)]`}>
            {flight.status.toUpperCase()}
          </p>
        </div>
      </div>

      {/* Barcode */}
      <div className="barcode justify-center">
        {barcode.map((height, i) => (
          <div
            key={i}
            className="barcode-line"
            style={{ height: `${height}px` }}
          />
        ))}
      </div>
      <p className="text-center text-xs text-gray-500 mt-2 font-[var(--font-share-tech)]">
        {flight.id.padStart(12, '0')} // CYBERFLY SYSTEM v1.0
      </p>
    </div>
  );
}
