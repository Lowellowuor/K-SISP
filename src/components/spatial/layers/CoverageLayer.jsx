import React from 'react';
import { Circle, Popup } from 'react-leaflet';

const coverageZones = [
  { lat: -1.317, lng: 36.791, radius: 300, coverage: 85, population: 1200 },
  { lat: -1.318, lng: 36.792, radius: 250, coverage: 72, population: 800 },
];

function CoverageLayer() {
  const getCoverageColor = (coverage) => {
    if (coverage >= 80) return 'rgba(16, 185, 129, 0.2)';
    if (coverage >= 60) return 'rgba(245, 158, 11, 0.2)';
    return 'rgba(239, 68, 68, 0.2)';
  };

  const getBorderColor = (coverage) => {
    if (coverage >= 80) return '#10b981';
    if (coverage >= 60) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <>
      {coverageZones.map((zone, index) => (
        <Circle
          key={index}
          center={[zone.lat, zone.lng]}
          radius={zone.radius}
          pathOptions={{
            fillColor: getCoverageColor(zone.coverage),
            color: getBorderColor(zone.coverage),
            weight: 2,
            opacity: 0.8,
            fillOpacity: 0.3,
            dashArray: zone.coverage < 60 ? '5, 5' : undefined
          }}
        >
          <Popup>
            <div className="p-3 min-w-[200px]">
              <h3 className="font-bold text-gray-900 mb-2">Service Coverage Zone</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Coverage:</span>
                  <span className={`font-medium ${
                    zone.coverage >= 80 ? 'text-green-600' :
                    zone.coverage >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {zone.coverage}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Population:</span>
                  <span className="font-medium">{zone.population} people</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Radius:</span>
                  <span className="font-medium">{zone.radius}m</span>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  Within 5-min walk of facilities
                </div>
              </div>
            </div>
          </Popup>
        </Circle>
      ))}
    </>
  );
}

export default CoverageLayer;