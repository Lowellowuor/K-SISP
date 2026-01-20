import React from 'react';
import { Calendar, Download, Filter } from 'lucide-react';

function DashboardHeader({ timeRange, setTimeRange, activeZone, setActiveZone }) {
  const timeRanges = [
    { id: '24h', label: '24 Hours' },
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: 'all', label: 'All Time' },
  ];

  const zoneFilters = [
    { id: 'all', label: 'All Zones' },
    { id: 'zone-a', label: 'Zone A' },
    { id: 'zone-b', label: 'Zone B' },
    { id: 'zone-c', label: 'Zone C' },
    { id: 'zone-d', label: 'Zone D' },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold">Sanitation Intelligence Dashboard</h1>
        <p className="text-gray-400 mt-2">Real-time monitoring and analytics for Kibera sanitation infrastructure</p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Time Range Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <div className="flex items-center space-x-1 bg-white/5 rounded-lg p-1">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-3 py-1 text-xs rounded ${
                  timeRange === range.id
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Zone Filter */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-white/5 rounded-lg p-1">
            {zoneFilters.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setActiveZone(zone.id)}
                className={`px-3 py-1 text-xs rounded ${
                  activeZone === zone.id
                    ? 'bg-secondary-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {zone.label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white/5 rounded-full px-4 py-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-sm">Today, 14:30</span>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full hover:shadow-lg">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;