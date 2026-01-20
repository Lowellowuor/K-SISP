import React from 'react';
import { MapPin, Filter, Navigation } from 'lucide-react';

function ReportMap({ onReportSelect }) {
  const reports = [
    { id: 1, lat: -1.317, lng: 36.791, type: 'water', priority: 'high' },
    { id: 2, lat: -1.318, lng: 36.792, type: 'sanitation', priority: 'medium' },
    { id: 3, lat: -1.316, lng: 36.793, type: 'waste', priority: 'low' },
  ];

  return (
    <div className="h-full relative bg-gradient-to-br from-gray-800 to-gray-900">
      {/* Map Background with Grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                             linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Report Markers */}
        {reports.map((report) => (
          <button
            key={report.id}
            onClick={() => onReportSelect(report)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${50 + (report.id * 10)}%`,
              top: `${40 + (report.id * 5)}%`
            }}
          >
            <div className={`w-8 h-8 rounded-full ${
              report.priority === 'high' ? 'bg-red-500' :
              report.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
            } border-2 border-white shadow-lg flex items-center justify-center`}>
              <MapPin className="h-4 w-4 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white border border-gray-800 flex items-center justify-center">
              <div className={`w-2 h-2 rounded-full ${
                report.type === 'water' ? 'bg-blue-500' :
                report.type === 'sanitation' ? 'bg-green-500' :
                'bg-amber-500'
              }`}></div>
            </div>
          </button>
        ))}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button className="p-3 bg-gray-900/80 backdrop-blur-sm rounded-lg border border-white/10 text-white hover:bg-gray-800">
          <Filter className="h-5 w-5" />
        </button>
        <button className="p-3 bg-gray-900/80 backdrop-blur-sm rounded-lg border border-white/10 text-white hover:bg-gray-800">
          <Navigation className="h-5 w-5" />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 border border-white/10">
        <div className="text-sm font-semibold text-white mb-2">Report Legend</div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-gray-300">High Priority</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-xs text-gray-300">Medium Priority</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-300">Low Priority</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportMap;