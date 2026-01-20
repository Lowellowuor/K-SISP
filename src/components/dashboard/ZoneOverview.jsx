import React from 'react';
import { Globe, Thermometer, Droplets, Wind, Activity, TrendingUp, AlertTriangle } from 'lucide-react';

const ZoneOverview = ({ activeZone = 'all', darkMode = true }) => {
  const zones = [
    {
      id: 'north',
      name: 'North Zone',
      icon: Thermometer,
      status: 'warning',
      temperature: '28°C',
      devices: 42,
      alerts: 3,
      efficiency: 85,
      color: 'bg-green-500'
    },
    {
      id: 'south',
      name: 'South Zone',
      icon: Droplets,
      status: 'optimal',
      temperature: '22°C',
      devices: 35,
      alerts: 1,
      efficiency: 92,
      color: 'bg-teal-500'
    },
    {
      id: 'east',
      name: 'East Zone',
      icon: Wind,
      status: 'critical',
      temperature: '32°C',
      devices: 28,
      alerts: 5,
      efficiency: 65,
      color: 'bg-amber-500'
    },
    {
      id: 'west',
      name: 'West Zone',
      icon: Globe,
      status: 'good',
      temperature: '25°C',
      devices: 39,
      alerts: 2,
      efficiency: 78,
      color: 'bg-emerald-600'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal': return 'text-green-400';
      case 'good': return 'text-emerald-400';
      case 'warning': return 'text-amber-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'optimal': return 'bg-green-500/20';
      case 'good': return 'bg-emerald-500/20';
      case 'warning': return 'bg-amber-500/20';
      case 'critical': return 'bg-red-500/20';
      default: return 'bg-gray-500/20';
    }
  };

  const activeZones = zones.filter(zone => 
    activeZone === 'all' || zone.id === activeZone
  );

  const calculateTotal = (key) => {
    return activeZones.reduce((sum, zone) => sum + zone[key], 0);
  };

  return (
    <div className="h-full p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-xl ${darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'}`}>
            <Globe className={`h-5 w-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Zone Overview</h3>
            <p className="text-sm text-emerald-300/70">
              {activeZone === 'all' ? 'All Zones' : `${activeZone.charAt(0).toUpperCase() + activeZone.slice(1)} Zone`}
            </p>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-emerald-900/30' : 'bg-emerald-100'} text-emerald-400`}>
          {activeZones.length} zones
        </div>
      </div>

      {/* Zone Cards */}
      <div className="space-y-4 mb-6">
        {activeZones.map((zone) => {
          const Icon = zone.icon;
          return (
            <div 
              key={zone.id}
              className={`p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                darkMode ? 'bg-emerald-900/20 hover:bg-emerald-800/30' : 'bg-emerald-50 hover:bg-emerald-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${zone.color}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-white">{zone.name}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusBgColor(zone.status)} ${getStatusColor(zone.status)}`}>
                        {zone.status.charAt(0).toUpperCase() + zone.status.slice(1)}
                      </span>
                      {zone.alerts > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">
                          {zone.alerts} alert{zone.alerts > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-white">{zone.temperature}</div>
                  <div className="text-xs text-emerald-400/70">Temperature</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{zone.devices}</div>
                  <div className="text-xs text-emerald-400/70">Devices</div>
                </div>
                
                <div className="text-center">
                  <div className={`text-xl font-bold ${getStatusColor(zone.status)}`}>
                    {zone.efficiency}%
                  </div>
                  <div className="text-xs text-emerald-400/70">Efficiency</div>
                </div>
                
                <div className="text-center">
                  <div className={`text-xl font-bold flex items-center justify-center ${
                    zone.efficiency > 80 ? 'text-green-400' :
                    zone.efficiency > 60 ? 'text-amber-400' :
                    'text-red-400'
                  }`}>
                    {zone.efficiency > zone.efficiency ? '↗' : '↘'}
                  </div>
                  <div className="text-xs text-emerald-400/70">Trend</div>
                </div>
              </div>

              {/* Efficiency Bar */}
              <div className="mt-3">
                <div className={`h-2 rounded-full overflow-hidden ${darkMode ? 'bg-emerald-900/30' : 'bg-emerald-200'}`}>
                  <div 
                    className={`h-full rounded-full ${
                      zone.efficiency > 80 ? 'bg-green-500' :
                      zone.efficiency > 60 ? 'bg-amber-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${zone.efficiency}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Zone Summary */}
      <div className={`rounded-xl p-4 ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-white">Zone Summary</div>
          <Activity className="h-4 w-4 text-emerald-400" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-lg font-bold text-white">{calculateTotal('devices')}</div>
            <div className="text-xs text-emerald-400/70">Total Devices</div>
          </div>
          
          <div>
            <div className="text-lg font-bold text-green-400">
              {Math.round(activeZones.reduce((sum, zone) => sum + zone.efficiency, 0) / activeZones.length)}%
            </div>
            <div className="text-xs text-emerald-400/70">Avg Efficiency</div>
          </div>
          
          <div>
            <div className="text-lg font-bold text-amber-400">
              {calculateTotal('alerts')}
            </div>
            <div className="text-xs text-emerald-400/70">Active Alerts</div>
          </div>
          
          <div>
            <div className="text-lg font-bold text-white">
              {activeZones.filter(z => z.status === 'optimal' || z.status === 'good').length}
            </div>
            <div className="text-xs text-emerald-400/70">Healthy Zones</div>
          </div>
        </div>
        
        <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-emerald-500/20' : 'border-emerald-200'}`}>
          <div className="flex items-center space-x-2 text-xs text-emerald-400/70">
            <AlertTriangle className="h-3 w-3" />
            <span>
              {calculateTotal('alerts')} alerts across {activeZones.length} zones
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoneOverview;