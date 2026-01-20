import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Toilet, Droplets, Wifi, Battery, AlertCircle, Users, Calendar, MapPin } from 'lucide-react';

// Custom icons
const createCustomIcon = (color, type) => {
  return L.divIcon({
    html: `
      <div class="relative">
        <div class="w-8 h-8 rounded-full ${color} border-2 border-white shadow-lg flex items-center justify-center">
          ${type === 'toilet' ? '🚽' : '💧'}
        </div>
        <div class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white border-2 border-gray-800 flex items-center justify-center">
          <div class="w-2 h-2 rounded-full ${color.replace('bg-', 'bg-').replace('/20', '')}"></div>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    className: 'animate-float'
  });
};

const facilitiesData = [
  { 
    id: 1, 
    lat: -1.317, 
    lng: 36.791, 
    type: 'toilet', 
    name: 'Community Toilet A', 
    status: 'functional', 
    capacity: 50, 
    usage: 75, 
    lastMaintenance: '2024-01-15',
    manager: 'Community Association',
    contact: '+254712345678',
    photos: 3,
    reports: 2
  },
  { 
    id: 2, 
    lat: -1.318, 
    lng: 36.792, 
    type: 'water', 
    name: 'Water Point 1', 
    status: 'functional', 
    capacity: 200, 
    usage: 60, 
    lastMaintenance: '2024-01-10',
    manager: 'Water Services Co.',
    contact: '+254723456789',
    photos: 5,
    reports: 1
  },
  { 
    id: 3, 
    lat: -1.316, 
    lng: 36.793, 
    type: 'toilet', 
    name: 'School Toilet', 
    status: 'needs_repair', 
    capacity: 30, 
    usage: 90, 
    lastMaintenance: '2023-12-20',
    manager: 'Local School',
    contact: '+254734567890',
    photos: 2,
    reports: 5
  },
  { 
    id: 4, 
    lat: -1.319, 
    lng: 36.790, 
    type: 'water', 
    name: 'Borehole B', 
    status: 'non_functional', 
    capacity: 150, 
    usage: 40, 
    lastMaintenance: '2023-11-05',
    manager: 'Community Well Group',
    contact: '+254745678901',
    photos: 1,
    reports: 8
  },
  { 
    id: 5, 
    lat: -1.315, 
    lng: 36.794, 
    type: 'toilet', 
    name: 'Market Toilet', 
    status: 'functional', 
    capacity: 40, 
    usage: 85, 
    lastMaintenance: '2024-01-05',
    manager: 'Market Association',
    contact: '+254756789012',
    photos: 4,
    reports: 3
  },
  { 
    id: 6, 
    lat: -1.320, 
    lng: 36.789, 
    type: 'water', 
    name: 'Public Tap C', 
    status: 'functional', 
    capacity: 100, 
    usage: 70, 
    lastMaintenance: '2024-01-12',
    manager: 'Municipal Council',
    contact: '+254767890123',
    photos: 2,
    reports: 2
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'functional': return 'bg-map-functional';
    case 'needs_repair': return 'bg-map-repair';
    case 'non_functional': return 'bg-map-nonfunctional';
    default: return 'bg-gray-500';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'functional': return 'Functional';
    case 'needs_repair': return 'Needs Repair';
    case 'non_functional': return 'Non-Functional';
    default: return 'Unknown';
  }
};

function FacilitiesLayer() {
  return (
    <>
      {facilitiesData.map((facility) => {
        const iconColor = getStatusColor(facility.status);
        const icon = createCustomIcon(iconColor, facility.type);
        
        return (
          <Marker
            key={facility.id}
            position={[facility.lat, facility.lng]}
            icon={icon}
          >
            <Popup className="custom-popup">
              <div className="p-4 min-w-[320px]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {facility.type === 'toilet' ? (
                      <div className="p-2 bg-primary-100 rounded-lg">
                        <Toilet className="h-6 w-6 text-primary-600" />
                      </div>
                    ) : (
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Droplets className="h-6 w-6 text-blue-600" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-gray-900">{facility.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          facility.status === 'functional' ? 'bg-green-100 text-green-800' :
                          facility.status === 'needs_repair' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {getStatusText(facility.status)}
                        </span>
                        <span className="text-xs text-gray-500 capitalize">{facility.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button className="p-2 hover:bg-gray-100 rounded-lg" title="Sensor Data">
                      <Wifi className="h-4 w-4 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg" title="Power Status">
                      <Battery className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Capacity</span>
                      <span className="font-medium">{facility.capacity} people</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          facility.usage > 80 ? 'bg-red-500' :
                          facility.usage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${facility.usage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Usage: {facility.usage}%</span>
                      <span>Available: {100 - facility.usage}%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Manager:</span>
                      <span className="text-sm font-medium">{facility.manager}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Last Maintenance:</span>
                      <span className="text-sm font-medium">{facility.lastMaintenance}</span>
                    </div>
                  </div>
                </div>

                {/* Reports & Photos */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-medium">{facility.reports} reports</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="h-4 w-4 text-blue-500">📷</div>
                      <span className="text-sm font-medium">{facility.photos} photos</span>
                    </div>
                  </div>
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    View Details →
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center space-x-2 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">Navigate</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    <span className="text-sm">Report Issue</span>
                  </button>
                </div>

                {/* Coordinates */}
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    Coordinates: {facility.lat.toFixed(6)}, {facility.lng.toFixed(6)}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default FacilitiesLayer;