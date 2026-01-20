import React from 'react';
import { CircleMarker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Home, Users, DollarSign, Droplet, Wifi, AlertCircle } from 'lucide-react';

// Sample household data
const householdsData = [
  { id: 1, lat: -1.3175, lng: 36.7915, density: 85, income: 'low', waterAccess: true, sanitation: 'improved', population: 240, reports: 3 },
  { id: 2, lat: -1.3182, lng: 36.7922, density: 92, income: 'very_low', waterAccess: false, sanitation: 'unimproved', population: 310, reports: 8 },
  { id: 3, lat: -1.3168, lng: 36.7935, density: 78, income: 'medium', waterAccess: true, sanitation: 'improved', population: 180, reports: 2 },
  { id: 4, lat: -1.3191, lng: 36.7908, density: 95, income: 'low', waterAccess: true, sanitation: 'shared', population: 420, reports: 12 },
  { id: 5, lat: -1.3152, lng: 36.7942, density: 65, income: 'medium', waterAccess: true, sanitation: 'improved', population: 150, reports: 1 },
  { id: 6, lat: -1.3203, lng: 36.7891, density: 88, income: 'very_low', waterAccess: false, sanitation: 'open', population: 290, reports: 7 },
];

const getIncomeColor = (income) => {
  switch (income) {
    case 'very_low': return '#ef4444'; // red
    case 'low': return '#f59e0b'; // amber
    case 'medium': return '#10b981'; // green
    case 'high': return '#3b82f6'; // blue
    default: return '#6b7280'; // gray
  }
};

const getSanitationColor = (sanitation) => {
  switch (sanitation) {
    case 'improved': return '#10b981';
    case 'shared': return '#f59e0b';
    case 'unimproved': return '#ef4444';
    case 'open': return '#8b5cf6';
    default: return '#6b7280';
  }
};

const getRadius = (density) => {
  return Math.min(20 + density * 0.3, 50);
};

function HouseholdsLayer() {
  return (
    <>
      {householdsData.map((household) => (
        <CircleMarker
          key={household.id}
          center={[household.lat, household.lng]}
          radius={getRadius(household.density)}
          pathOptions={{
            fillColor: getIncomeColor(household.income),
            color: '#ffffff',
            weight: 2,
            opacity: 0.8,
            fillOpacity: 0.6
          }}
        >
          <Popup className="custom-popup">
            <div className="p-4 min-w-[300px]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Home className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Household Cluster {household.id}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        household.income === 'very_low' ? 'bg-red-100 text-red-800' :
                        household.income === 'low' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {household.income.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Population</span>
                    </div>
                    <span className="font-medium">{household.population}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 text-gray-400">📊</div>
                      <span className="text-sm text-gray-600">Density</span>
                    </div>
                    <span className="font-medium">{household.density}/ha</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Droplet className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Water Access</span>
                    </div>
                    <span className={`font-medium ${household.waterAccess ? 'text-green-600' : 'text-red-600'}`}>
                      {household.waterAccess ? 'Yes' : 'No'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Sanitation</span>
                    </div>
                    <span className={`font-medium ${
                      household.sanitation === 'improved' ? 'text-green-600' :
                      household.sanitation === 'shared' ? 'text-yellow-600' :
                      household.sanitation === 'unimproved' ? 'text-red-600' : 'text-purple-600'
                    }`}>
                      {household.sanitation.charAt(0).toUpperCase() + household.sanitation.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Reports Section */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-medium">Community Reports</span>
                  </div>
                  <span className="text-sm bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                    {household.reports} active
                  </span>
                </div>
                <div className="space-y-2">
                  {household.reports > 0 && (
                    <>
                      <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
                        • Water availability issues
                      </div>
                      <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
                        • Sanitation maintenance needed
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Accessibility Score */}
              <div className="p-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600">Accessibility Score</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.round((100 - household.density) / 2 + (household.waterAccess ? 30 : 0))}%
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Based on density & services
                  </div>
                </div>
              </div>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </>
  );
}

export default HouseholdsLayer;