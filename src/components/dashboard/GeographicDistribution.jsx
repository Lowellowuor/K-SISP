import React from 'react';
import { Map, Navigation, Target, Layers, Filter, ZoomIn, ZoomOut } from 'lucide-react';

const GeographicDistribution = ({ activeZone = 'all', darkMode = true }) => {
  const zones = [
    { id: 'north', name: 'North Zone', x: 25, y: 20, intensity: 85, devices: 42 },
    { id: 'south', name: 'South Zone', x: 25, y: 65, intensity: 45, devices: 28 },
    { id: 'east', name: 'East Zone', x: 60, y: 35, intensity: 65, devices: 35 },
    { id: 'west', name: 'West Zone', x: 75, y: 50, intensity: 25, devices: 19 },
  ];

  const getColorForIntensity = (intensity) => {
    if (intensity >= 80) return 'bg-red-500';
    if (intensity >= 60) return 'bg-amber-500';
    if (intensity >= 40) return 'bg-yellow-500';
    if (intensity >= 20) return 'bg-green-500';
    return 'bg-emerald-300';
  };

  const getZoneStats = () => {
    const stats = zones.reduce((acc, zone) => {
      acc.totalDevices += zone.devices;
      acc.totalIntensity += zone.intensity;
      if (zone.intensity >= 80) acc.critical++;
      else if (zone.intensity >= 60) acc.high++;
      else if (zone.intensity >= 40) acc.medium++;
      else acc.low++;
      return acc;
    }, { totalDevices: 0, totalIntensity: 0, critical: 0, high: 0, medium: 0, low: 0 });

    stats.avgIntensity = (stats.totalIntensity / zones.length).toFixed(1);
    return stats;
  };

  const stats = getZoneStats();

  return (
    <div className="h-full p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-xl ${darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'}`}>
            <Map className={`h-5 w-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Geographic Distribution</h3>
            <p className="text-sm text-emerald-300/70">Zone activity and device density</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className={`p-1.5 rounded-lg ${darkMode ? 'hover:bg-emerald-800/30 text-emerald-400 hover:text-white' : 'hover:bg-emerald-100 text-emerald-500 hover:text-emerald-700'}`}>
            <ZoomIn className="h-4 w-4" />
          </button>
          <button className={`p-1.5 rounded-lg ${darkMode ? 'hover:bg-emerald-800/30 text-emerald-400 hover:text-white' : 'hover:bg-emerald-100 text-emerald-500 hover:text-emerald-700'}`}>
            <ZoomOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Map Visualization */}
      <div className={`relative rounded-xl overflow-hidden mb-6 ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`} style={{ height: '300px' }}>
        {/* Grid background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, ${darkMode ? '#10b981' : '#059669'} 1px, transparent 1px),
                             linear-gradient(to bottom, ${darkMode ? '#10b981' : '#059669'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Zone markers */}
        {zones.map((zone) => (
          <div
            key={zone.id}
            className="absolute cursor-pointer group"
            style={{
              left: `${zone.x}%`,
              top: `${zone.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="relative">
              <div 
                className={`w-12 h-12 rounded-full ${getColorForIntensity(zone.intensity)} border-2 ${
                  darkMode ? 'border-white/90' : 'border-white'
                } flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-125`}
              >
                <span className="text-white text-sm font-bold">{zone.name.charAt(0)}</span>
              </div>
              
              {/* Intensity indicator */}
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-900 border border-emerald-500 flex items-center justify-center">
                <div className={`w-3 h-3 rounded-full ${getColorForIntensity(zone.intensity)}`} />
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className={`px-3 py-2 rounded-lg whitespace-nowrap ${darkMode ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-sm shadow-lg`}>
                  <div className="text-sm font-medium text-white">{zone.name}</div>
                  <div className="text-xs text-emerald-400">Intensity: {zone.intensity}%</div>
                  <div className="text-xs text-emerald-400">Devices: {zone.devices}</div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Connections */}
        <svg className="absolute inset-0 w-full h-full">
          {zones.slice(0, -1).map((zone1, i) => 
            zones.slice(i + 1).map((zone2, j) => (
              <line
                key={`${zone1.id}-${zone2.id}`}
                x1={`${zone1.x}%`}
                y1={`${zone1.y}%`}
                x2={`${zone2.x}%`}
                y2={`${zone2.y}%`}
                stroke={darkMode ? 'rgba(16, 185, 129, 0.3)' : 'rgba(5, 150, 105, 0.3)'}
                strokeWidth="1"
                strokeDasharray="5,5"
              />
            ))
          )}
        </svg>

        {/* Legend */}
        <div className={`absolute bottom-4 left-4 px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-sm border ${darkMode ? 'border-emerald-500/20' : 'border-emerald-200'}`}>
          <div className="text-xs font-medium text-white mb-2">Intensity</div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-xs text-emerald-300">High</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-xs text-emerald-300">Low</span>
            </div>
          </div>
        </div>
      </div>

      {/* Zone Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
          <div className="text-lg font-bold text-white">{stats.totalDevices}</div>
          <div className="text-xs text-emerald-400/70">Total Devices</div>
        </div>
        
        <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
          <div className="text-lg font-bold text-white">{stats.avgIntensity}%</div>
          <div className="text-xs text-emerald-400/70">Avg Intensity</div>
        </div>
        
        <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
          <div className="text-lg font-bold text-white">{stats.critical}</div>
          <div className="text-xs text-emerald-400/70">Critical Zones</div>
        </div>
        
        <div className={`p-3 rounded-xl text-center ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
          <div className="text-lg font-bold text-white">{zones.length}</div>
          <div className="text-xs text-emerald-400/70">Active Zones</div>
        </div>
      </div>

      {/* Zone Details */}
      <div className="space-y-3">
        <div className="text-sm font-medium text-white mb-2">Zone Details</div>
        {zones.map((zone) => (
          <div 
            key={zone.id} 
            className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
              darkMode ? 'bg-emerald-900/20 hover:bg-emerald-800/30' : 'bg-emerald-50 hover:bg-emerald-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${getColorForIntensity(zone.intensity)}`} />
              <div>
                <div className="text-sm font-medium text-white">{zone.name}</div>
                <div className="text-xs text-emerald-400/70">{zone.devices} devices</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-white">{zone.intensity}%</div>
              <div className="text-xs text-emerald-400/70">Intensity</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeographicDistribution;