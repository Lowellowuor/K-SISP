import React from 'react';
import { Polyline, CircleMarker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Droplets, Zap, Wifi, AlertCircle, Gauge, Thermometer } from 'lucide-react';

// Sample water network data
const waterNetworkData = {
  pipes: [
    { id: 'p1', coordinates: [[-1.318, 36.792], [-1.3185, 36.7925], [-1.319, 36.793]], status: 'good', diameter: 150, material: 'PVC' },
    { id: 'p2', coordinates: [[-1.317, 36.791], [-1.3175, 36.7915], [-1.318, 36.792]], status: 'needs_repair', diameter: 100, material: 'Steel' },
    { id: 'p3', coordinates: [[-1.319, 36.790], [-1.3195, 36.7905], [-1.320, 36.791]], status: 'good', diameter: 200, material: 'HDPE' },
  ],
  nodes: [
    { id: 'n1', lat: -1.318, lng: 36.792, type: 'junction', pressure: 2.5, flow: 150, status: 'normal' },
    { id: 'n2', lat: -1.3175, lng: 36.7915, type: 'valve', pressure: 2.2, flow: 120, status: 'warning' },
    { id: 'n3', lat: -1.319, lng: 36.793, type: 'sensor', pressure: 2.8, flow: 180, status: 'normal' },
    { id: 'n4', lat: -1.320, lng: 36.791, type: 'pump', pressure: 3.0, flow: 200, status: 'error' },
  ]
};

const getPipeColor = (status) => {
  switch (status) {
    case 'good': return '#10b981';
    case 'needs_repair': return '#f59e0b';
    case 'broken': return '#ef4444';
    default: return '#6b7280';
  }
};

const getPipeWeight = (diameter) => {
  return Math.min(5, diameter / 30);
};

const getNodeIcon = (type, status) => {
  const colors = {
    normal: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  };

  const icons = {
    junction: '🔄',
    valve: '🎛️',
    sensor: '📡',
    pump: '⚡'
  };

  return L.divIcon({
    html: `
      <div class="relative">
        <div class="w-8 h-8 rounded-full bg-white border-2 ${status === 'error' ? 'border-red-500 animate-pulse' : 'border-' + (status === 'warning' ? 'amber' : 'green') + '-500'} shadow-lg flex items-center justify-center">
          <div class="text-lg">${icons[type] || '📍'}</div>
        </div>
        <div class="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-white border border-gray-800 flex items-center justify-center">
          <div class="w-1.5 h-1.5 rounded-full ${status === 'error' ? 'bg-red-500' : status === 'warning' ? 'bg-amber-500' : 'bg-green-500'}"></div>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });
};

function WaterNetworkLayer() {
  return (
    <>
      {/* Pipes */}
      {waterNetworkData.pipes.map((pipe) => (
        <Polyline
          key={pipe.id}
          positions={pipe.coordinates}
          pathOptions={{
            color: getPipeColor(pipe.status),
            weight: getPipeWeight(pipe.diameter),
            opacity: 0.8,
            dashArray: pipe.status === 'needs_repair' ? '5, 5' : undefined
          }}
        >
          <Popup>
            <div className="p-4 min-w-[250px]">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Water Pipe {pipe.id}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      pipe.status === 'good' ? 'bg-green-100 text-green-800' :
                      pipe.status === 'needs_repair' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {pipe.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Diameter:</span>
                  <span className="font-medium">{pipe.diameter}mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Material:</span>
                  <span className="font-medium">{pipe.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Length:</span>
                  <span className="font-medium">~{pipe.coordinates.length * 100}m</span>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-200">
                <button className="w-full py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
                  View Maintenance History
                </button>
              </div>
            </div>
          </Popup>
        </Polyline>
      ))}

      {/* Nodes */}
      {waterNetworkData.nodes.map((node) => {
        const icon = getNodeIcon(node.type, node.status);
        
        return (
          <Marker
            key={node.id}
            position={[node.lat, node.lng]}
            icon={icon}
          >
            <Popup>
              <div className="p-4 min-w-[280px]">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg ${
                    node.status === 'error' ? 'bg-red-100' :
                    node.status === 'warning' ? 'bg-yellow-100' : 'bg-green-100'
                  }`}>
                    {node.type === 'pump' ? <Zap className="h-6 w-6 text-blue-600" /> :
                     node.type === 'sensor' ? <Wifi className="h-6 w-6 text-purple-600" /> :
                     node.type === 'valve' ? <Gauge className="h-6 w-6 text-amber-600" /> :
                     <AlertCircle className="h-6 w-6 text-gray-600" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {node.type.charAt(0).toUpperCase() + node.type.slice(1)} {node.id}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        node.status === 'normal' ? 'bg-green-100 text-green-800' :
                        node.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {node.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Pressure:</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${
                        node.pressure < 2 ? 'text-red-600' :
                        node.pressure < 2.5 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {node.pressure} bar
                      </span>
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            node.pressure < 2 ? 'bg-red-500' :
                            node.pressure < 2.5 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(node.pressure / 3) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Droplets className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Flow Rate:</span>
                    </div>
                    <span className="font-medium">{node.flow} L/min</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button className="py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
                    Sensor Data
                  </button>
                  <button className="py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    Diagnostics
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

// Need to import Marker for the nodes
import { Marker } from 'react-leaflet';

export default WaterNetworkLayer;