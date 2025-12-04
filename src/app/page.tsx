'use client';

import { useState, useCallback } from 'react';
import { Flight, searchFlights } from '@/lib/mockFlights';
import BoardingPass from '@/components/BoardingPass';

export default function Home() {
  const [query, setQuery] = useState('');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setHasSearched(true);
    
    const results = await searchFlights(query);
    setFlights(results);
    setIsLoading(false);
  }, [query]);

  return (
    <div className="min-h-screen grid-bg py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="mb-4">
            <span className="text-xs text-[#00ffff] tracking-[0.5em]">
              /// SYSTEM ONLINE ///
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#00ffff] neon-text mb-4 glitch font-[var(--font-orbitron)]">
            CYBERFLY
          </h1>
          <p className="text-xl text-[#ff00ff] neon-text-magenta font-[var(--font-share-tech)]">
            FLIGHT TRACKING SYSTEM v1.0
          </p>
          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-[#00ffff] to-transparent"></div>
        </header>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ENTER FLIGHT NUMBER (e.g., CY2077, NX1337)"
                className="input-cyber w-full px-6 py-4 text-lg rounded font-[var(--font-share-tech)] tracking-wider"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00ffff] opacity-50">
                ⌘
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-cyber px-8 py-4 rounded text-lg font-[var(--font-orbitron)] disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⟳</span> SCANNING...
                </span>
              ) : (
                'SEARCH'
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 font-[var(--font-share-tech)]">
            Try: CY2025 | NX1337 | SY0101 | NC4444 | VK0800
          </p>
        </form>

        {/* Results */}
        <div>
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block">
                <p className="text-2xl text-[#00ffff] neon-text animate-pulse font-[var(--font-share-tech)]">
                  ▓▓▓ SCANNING DATABASE ▓▓▓
                </p>
                <div className="mt-4 h-1 bg-gray-800 rounded overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00ffff] to-[#ff00ff] animate-pulse"
                    style={{ width: '60%' }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {!isLoading && hasSearched && flights.length === 0 && (
            <div className="text-center py-12 boarding-pass rounded-lg">
              <p className="text-4xl mb-4">⚠</p>
              <p className="text-xl text-[#ff0000] font-[var(--font-orbitron)]">
                NO FLIGHTS FOUND
              </p>
              <p className="text-sm text-gray-400 mt-2 font-[var(--font-share-tech)]">
                Flight &quot;{query}&quot; not found in database. Try another search query.
              </p>
            </div>
          )}

          {!isLoading && flights.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-[#00ffff] to-transparent"></div>
                <p className="text-sm text-[#00ffff] font-[var(--font-share-tech)]">
                  {flights.length} FLIGHT{flights.length > 1 ? 'S' : ''} FOUND
                </p>
                <div className="h-px flex-1 bg-gradient-to-l from-[#ff00ff] to-transparent"></div>
              </div>
              
              {flights.map((flight, index) => (
                <BoardingPass key={flight.id} flight={flight} index={index} />
              ))}
            </div>
          )}

          {!hasSearched && (
            <div className="text-center py-12 opacity-50">
              <p className="text-lg text-gray-400 font-[var(--font-share-tech)]">
                Enter a flight number above to begin tracking
              </p>
              <p className="text-6xl mt-4">✈</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-[#ff00ff] to-transparent mb-4"></div>
          <p className="text-xs text-gray-500 font-[var(--font-share-tech)]">
            CYBERFLY TRACKING SYSTEM // © 2025 NEON AEROSPACE DIVISION
          </p>
          <p className="text-xs text-gray-600 mt-1">
            ALL FLIGHTS MONITORED IN REAL-TIME
          </p>
        </footer>
      </div>
    </div>
  );
}
