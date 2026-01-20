import React, { useState } from 'react';
import { Map, Navigation, Target, Layers, Filter } from 'lucide-react';

function SpatialVisualization() {
  const [analysisType, setAnalysisType] = useState('hotspot');
  const [radius, setRadius] = useState(500);

  const analysisTypes = [
    { id: 'hotspot', label: 'Hotspot Analysis', color: 'text-red-500' },
    { id: 'coverage', label: 'Coverage Analysis', color: 'text-blue-500' },
    { id: 'accessibility', label: 'Accessibility', color: 'text-green-500' },
    { id: 'network', label: 'Network Analysis', color: 'text-purple-500' },
  ];

  const zones = [
    { name: 'Zone A', lat: -1.317, lng: 36.791, intensity: 85, coverage: 72 },
    { name: 'Zone B', lat: -1.318, lng: 36.792, intensity: 45, coverage: 85 },
    { name: 'Zone C', lat: -1.316, lng: 36.793, intensity: 65, coverage: 58 },
    { name: 'Zone D', lat: -1.319, lng: 36.790, intensity: 25, coverage: 45 },
  ];

  const getColorForIntensity = (intensity) => {
    if (intensity >= 80) return 'bg-red-500';
    if (intensity >= 60) return 'bg-orange-500';
    if (intensity >= 40) return 'bg-yellow-500';
    if (intensity >= 20) return 'bg-green-500';
    return 'bg-blue-500';
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Map className="h-6 w-6 text-purple-500" />
          <h3 className="text-lg font-bold text-white">Spatial Analytics</h3>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Buffer Radius:</span>
            <input
              type="range"
              min="100"
              max="1000"
              step="100"
              value={radius}
              onChange={(e) => setRadius(parseInt(e.target.value))}
              className="w-32"
            />
            <span className="text-sm text-white">{radius}m</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 h-[calc(100%-4rem)]">
        {/* Left Panel: Controls */}
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-white mb-3">Analysis Type</h4>
            <div className="space-y-2">
              {analysisTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setAnalysisType(type.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all ${
                    analysisType === type.id
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/20'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${type.color.replace('text-', 'bg-')}`}></div>
                    <span className="text-sm text-white">{type.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Analysis Parameters</h4>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Search Radius</div>
                <div className="text-xl font-bold text-white">{radius}m</div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Confidence Level</div>
                <div className="text-xl font-bold text-green-400">95%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel: Map Visualization */}
        <div className="col-span-2">
          <div className="glass-effect rounded-xl p-4 h-full relative overflow-hidden">
            {/* Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
              {/* Grid */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                                   linear-gradient(to bottom, white 1px, transparent 1px)`,
                  backgroundSize: '50px 50px'
                }} />
              </div>

              {/* Buffer Circles */}
              {zones.map((zone, index) => (
                <div
                  key={index}
                  className="absolute rounded-full border-2 border-blue-400/30"
                  style={{
                    left: `${20 + (index * 20)}%`,
                    top: `${30 + (index * 10)}%`,
                    width: `${radius / 10}px`,
                    height: `${radius / 10}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                ></div>
              ))}

              {/* Zone Markers */}
              {zones.map((zone, index) => (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    left: `${20 + (index * 20)}%`,
                    top: `${30 + (index * 10)}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className={`w-8 h-8 rounded-full ${getColorForIntensity(zone.intensity)} border-2 border-white flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">{zone.name.charAt(zone.name.length - 1)}</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white border border-gray-800 flex items-center justify-center">
                    <div className={`w-2 h-2 rounded-full ${getColorForIntensity(zone.intensity)}`}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Overlay Information */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-white">Spatial Analysis Map</h4>
                  <p className="text-sm text-gray-400">Showing {analysisType.replace('-', ' ')} results</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-white">
                    <Layers className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white">
                    <Filter className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white">
                    <Navigation className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="text-sm font-semibold text-white mb-2">Intensity Legend</div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs text-gray-300">High (80-100%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-xs text-gray-300">Medium-High (60-79%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-xs text-gray-300">Medium (40-59%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-gray-300">Low (20-39%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs text-gray-300">Very Low (0-19%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-sm text-gray-400">Hotspots Detected</div>
              <div className="text-xl font-bold text-red-400">3 zones</div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-sm text-gray-400">Coverage Gaps</div>
              <div className="text-xl font-bold text-amber-400">2 areas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpatialVisualization;