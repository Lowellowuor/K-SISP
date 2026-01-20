import React, { useState } from 'react';
import { Map, Navigation, Target, Layers, Filter, Crosshair, ZoomIn, ZoomOut } from 'lucide-react';

function SpatialVisualization() {
  const [analysisType, setAnalysisType] = useState('hotspot');
  const [radius, setRadius] = useState(500);
  const [zoom, setZoom] = useState(1);

  const analysisTypes = [
    { id: 'hotspot', label: 'Hotspot Analysis', color: 'text-emerald-500', icon: Target },
    { id: 'coverage', label: 'Coverage Analysis', color: 'text-green-500', icon: Layers },
    { id: 'accessibility', label: 'Accessibility', color: 'text-teal-500', icon: Navigation },
    { id: 'network', label: 'Network Analysis', color: 'text-emerald-400', icon: Crosshair },
  ];

  const zones = [
    { name: 'North Zone', lat: -1.317, lng: 36.791, intensity: 85, coverage: 72 },
    { name: 'South Zone', lat: -1.318, lng: 36.792, intensity: 45, coverage: 85 },
    { name: 'East Zone', lat: -1.316, lng: 36.793, intensity: 65, coverage: 58 },
    { name: 'West Zone', lat: -1.319, lng: 36.790, intensity: 25, coverage: 45 },
  ];

  const getColorForIntensity = (intensity) => {
    if (intensity >= 80) return 'bg-red-500';
    if (intensity >= 60) return 'bg-orange-500';
    if (intensity >= 40) return 'bg-yellow-500';
    if (intensity >= 20) return 'bg-green-500';
    return 'bg-emerald-300';
  };

  return (
    <div className="h-full p-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl">
            <Map className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Spatial Analytics</h3>
            <p className="text-sm text-emerald-300/70">Geospatial analysis and visualization</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-emerald-300">Buffer Radius:</span>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="100"
                max="1000"
                step="100"
                value={radius}
                onChange={(e) => setRadius(parseInt(e.target.value))}
                className="w-32 accent-emerald-500"
              />
              <span className="text-sm font-medium text-white bg-emerald-900/30 px-3 py-1 rounded-lg">{radius}m</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 h-[calc(100%-4rem)]">
        {/* Left Panel: Controls */}
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center">
              <Target className="h-4 w-4 mr-2 text-emerald-400" />
              Analysis Type
            </h4>
            <div className="space-y-3">
              {analysisTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setAnalysisType(type.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 border ${
                      analysisType === type.id
                        ? 'bg-gradient-to-r from-emerald-600/40 to-green-500/40 border-emerald-500/50 shadow-emerald-500/20'
                        : 'bg-emerald-900/20 border-emerald-500/10 hover:bg-emerald-800/30 hover:border-emerald-400/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-emerald-900/30 ${
                        analysisType === type.id ? 'bg-emerald-800/50' : ''
                      }`}>
                        <Icon className={`h-4 w-4 ${type.color}`} />
                      </div>
                      <span className="text-sm font-medium text-white">{type.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 flex items-center">
              <Filter className="h-4 w-4 mr-2 text-teal-400" />
              Analysis Parameters
            </h4>
            <div className="space-y-3">
              <div className="p-4 bg-emerald-900/20 rounded-xl border border-emerald-500/10">
                <div className="text-sm text-emerald-300 mb-1">Search Radius</div>
                <div className="text-xl font-bold text-white">{radius}m</div>
                <div className="text-xs text-emerald-400 mt-1">Distance for analysis buffer</div>
              </div>
              <div className="p-4 bg-emerald-900/20 rounded-xl border border-emerald-500/10">
                <div className="text-sm text-emerald-300 mb-1">Confidence Level</div>
                <div className="text-xl font-bold text-green-400">95%</div>
                <div className="text-xs text-emerald-400 mt-1">Statistical confidence</div>
              </div>
            </div>
          </div>

          {/* Zone Selector */}
          <div>
            <h4 className="font-semibold text-white mb-3">Zones Overview</h4>
            <div className="space-y-2">
              {zones.map((zone, index) => (
                <div 
                  key={index}
                  className="p-3 bg-emerald-900/20 rounded-lg border border-emerald-500/10 hover:bg-emerald-800/30 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getColorForIntensity(zone.intensity)}`}></div>
                      <span className="text-sm text-white">{zone.name}</span>
                    </div>
                    <div className="text-xs font-medium px-2 py-1 rounded bg-emerald-800/30 text-emerald-300">
                      {zone.intensity}%
                    </div>
                  </div>
                  <div className="text-xs text-emerald-400 mt-2">
                    Coverage: <span className="text-white">{zone.coverage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Panel: Map Visualization */}
        <div className="col-span-2">
          <div className="glass-green-card rounded-2xl p-4 h-full relative overflow-hidden border border-emerald-500/20">
            {/* Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 to-gray-900">
              {/* Grid */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `linear-gradient(to right, rgba(16, 185, 129, 0.3) 1px, transparent 1px),
                                   linear-gradient(to bottom, rgba(16, 185, 129, 0.3) 1px, transparent 1px)`,
                  backgroundSize: '50px 50px'
                }} />
              </div>

              {/* Buffer Circles */}
              {zones.map((zone, index) => (
                <div
                  key={index}
                  className="absolute rounded-full border-2 border-emerald-400/30"
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
                  className="absolute transition-transform duration-300 hover:scale-110"
                  style={{
                    left: `${20 + (index * 20)}%`,
                    top: `${30 + (index * 10)}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className={`w-12 h-12 rounded-full ${getColorForIntensity(zone.intensity)} border-2 border-white/90 flex items-center justify-center shadow-lg`}>
                    <span className="text-white text-sm font-bold">{zone.name.charAt(zone.name.length - 1)}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-900 border border-emerald-500 flex items-center justify-center">
                    <div className={`w-3 h-3 rounded-full ${getColorForIntensity(zone.intensity)}`}></div>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-emerald-900/90 backdrop-blur-sm rounded text-xs text-white whitespace-nowrap">
                    {zone.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Overlay Information */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-emerald-900/30 rounded-lg inline-block">
                  <h4 className="font-semibold text-white">Spatial Analysis Map</h4>
                  <p className="text-sm text-emerald-300">{analysisType.replace('-', ' ')} results</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 p-1 bg-emerald-900/30 rounded-lg">
                    <button 
                      onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                      className="p-2 text-emerald-300 hover:text-white hover:bg-emerald-800/40 rounded transition-all"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </button>
                    <span className="text-sm text-emerald-300 px-2">{Math.round(zoom * 100)}%</span>
                    <button 
                      onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                      className="p-2 text-emerald-300 hover:text-white hover:bg-emerald-800/40 rounded transition-all"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                  </div>
                  <button className="p-2 text-emerald-300 hover:text-white hover:bg-emerald-800/40 rounded-lg transition-all">
                    <Layers className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-emerald-300 hover:text-white hover:bg-emerald-800/40 rounded-lg transition-all">
                    <Filter className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-emerald-300 hover:text-white hover:bg-emerald-800/40 rounded-lg transition-all">
                    <Navigation className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-emerald-900/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/20 shadow-lg">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <div className="text-sm font-semibold text-white">Intensity Legend</div>
              </div>
              <div className="space-y-2">
                {[
                  { range: '80-100%', color: 'bg-red-500', label: 'Critical' },
                  { range: '60-79%', color: 'bg-orange-500', label: 'High' },
                  { range: '40-59%', color: 'bg-yellow-500', label: 'Medium' },
                  { range: '20-39%', color: 'bg-green-500', label: 'Low' },
                  { range: '0-19%', color: 'bg-emerald-300', label: 'Normal' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-xs text-emerald-300">{item.range}</span>
                    </div>
                    <span className="text-xs text-white">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Analysis Results */}
            <div className="absolute bottom-4 right-4 bg-emerald-900/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/20">
              <div className="text-sm font-semibold text-white mb-3">Analysis Results</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-300">Hotspots</span>
                  <span className="text-sm font-bold text-red-400">3 zones</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-300">Coverage Gaps</span>
                  <span className="text-sm font-bold text-amber-400">2 areas</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-300">Access Issues</span>
                  <span className="text-sm font-bold text-blue-400">4 points</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="bg-emerald-900/20 p-4 rounded-xl border border-emerald-500/10">
              <div className="text-sm text-emerald-300">Average Intensity</div>
              <div className="text-xl font-bold text-white">55%</div>
              <div className="text-xs text-emerald-400 mt-1">Across all zones</div>
            </div>
            <div className="bg-emerald-900/20 p-4 rounded-xl border border-emerald-500/10">
              <div className="text-sm text-emerald-300">Coverage Rate</div>
              <div className="text-xl font-bold text-green-400">72%</div>
              <div className="text-xs text-emerald-400 mt-1">Average coverage</div>
            </div>
            <div className="bg-emerald-900/20 p-4 rounded-xl border border-emerald-500/10">
              <div className="text-sm text-emerald-300">Response Time</div>
              <div className="text-xl font-bold text-teal-400">3.2h</div>
              <div className="text-xs text-emerald-400 mt-1">Average response</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Actions */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="glass-green rounded-xl p-3 shadow-emerald-500/20 border border-emerald-500/20 flex items-center space-x-3">
          <button className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-500 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium">
            Export Analysis
          </button>
          <button className="px-4 py-2 bg-emerald-800/30 border border-emerald-500/20 text-emerald-200 rounded-lg hover:bg-emerald-700/40 transition-all text-sm font-medium">
            Share Map
          </button>
        </div>
      </div>
    </div>
  );
}

export default SpatialVisualization;