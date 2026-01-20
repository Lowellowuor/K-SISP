import React from 'react';
import { Navigation } from 'lucide-react';

function GeographicDistribution() {
  const zones = [
    { name: 'Zone A', coverage: 72, population: '3.2k', facilities: 12, color: 'bg-primary-500' },
    { name: 'Zone B', coverage: 85, population: '2.8k', facilities: 15, color: 'bg-green-500' },
    { name: 'Zone C', coverage: 58, population: '4.1k', facilities: 10, color: 'bg-yellow-500' },
    { name: 'Zone D', coverage: 45, population: '2.3k', facilities: 11, color: 'bg-red-500' },
  ];

  return (
    <div className="glass-effect rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Geographic Distribution</h2>
        <Navigation className="h-5 w-5 text-green-500" />
      </div>
      <div className="space-y-4">
        {zones.map((zone, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${zone.color}`}></div>
                <span className="font-medium">{zone.name}</span>
              </div>
              <div className="text-right">
                <div className="font-bold">{zone.coverage}% coverage</div>
                <div className="text-xs text-gray-400">{zone.facilities} facilities</div>
              </div>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${zone.color}`}
                style={{ width: `${zone.coverage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Population: {zone.population}</span>
              <span>Facilities: {zone.facilities}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GeographicDistribution;