import React, { useState } from 'react';
import { 
  Map, Users, AlertCircle, Droplets, Target, Layers, 
  BarChart3, Filter, Download, Settings, ChevronRight,
  Globe, Home, Zap, Shield, TrendingUp, Database,
  Maximize2, Eye, EyeOff, RefreshCw, MapPin
} from 'lucide-react';

function MapSidebar({ layers, onToggleLayer }) {
  const [expandedGroups, setExpandedGroups] = useState(['infrastructure', 'community']);
  const [opacitySettings, setOpacitySettings] = useState({
    facilities: 100,
    households: 80,
    reports: 90,
    waterNetwork: 70,
    coverage: 60
  });

  const toggleGroup = (groupTitle) => {
    setExpandedGroups(prev => 
      prev.includes(groupTitle)
        ? prev.filter(g => g !== groupTitle)
        : [...prev, groupTitle]
    );
  };

  const updateOpacity = (layer, value) => {
    setOpacitySettings(prev => ({ ...prev, [layer]: value }));
  };

  const layerGroups = [
    {
      id: 'base',
      title: 'Base Maps',
      icon: Globe,
      items: [
        { 
          id: 'satellite', 
          label: 'Satellite View', 
          description: 'High-resolution imagery',
          type: 'radio', 
          checked: layers.baseMap === 'satellite',
          color: 'from-emerald-600 to-green-600'
        },
        { 
          id: 'street', 
          label: 'Street Map', 
          description: 'Detailed road network',
          type: 'radio', 
          checked: layers.baseMap === 'street',
          color: 'from-blue-600 to-cyan-600'
        },
        { 
          id: 'terrain', 
          label: 'Terrain', 
          description: 'Elevation and topography',
          type: 'radio', 
          checked: layers.baseMap === 'terrain',
          color: 'from-amber-600 to-yellow-600'
        },
      ]
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure',
      icon: Home,
      items: [
        { 
          id: 'facilities', 
          label: 'Sanitation Facilities', 
          count: 48, 
          color: 'bg-emerald-500',
          opacity: opacitySettings.facilities,
          description: 'Public toilets, treatment plants'
        },
        { 
          id: 'waterNetwork', 
          label: 'Water Network', 
          count: 32, 
          color: 'bg-cyan-500',
          opacity: opacitySettings.waterNetwork,
          description: 'Pipes, reservoirs, stations'
        },
        { 
          id: 'households', 
          label: 'Households', 
          count: '12.4k', 
          color: 'bg-violet-500',
          opacity: opacitySettings.households,
          description: 'Residential buildings'
        },
      ]
    },
    {
      id: 'community',
      title: 'Community Data',
      icon: Users,
      items: [
        { 
          id: 'reports', 
          label: 'Citizen Reports', 
          count: 156, 
          color: 'bg-amber-500',
          opacity: opacitySettings.reports,
          description: 'Community feedback & issues'
        },
        { 
          id: 'heatmap', 
          label: 'Issue Heatmap', 
          count: null, 
          color: 'bg-gradient-to-r from-red-500 via-amber-500 to-yellow-500',
          description: 'Problem density visualization'
        },
      ]
    },
    {
      id: 'analysis',
      title: 'Analysis Layers',
      icon: BarChart3,
      items: [
        { 
          id: 'coverage', 
          label: 'Service Coverage', 
          count: '65%', 
          color: 'bg-gradient-to-r from-emerald-500 to-green-500',
          opacity: opacitySettings.coverage,
          description: 'Sanitation service reach'
        },
        { 
          id: 'accessibility', 
          label: 'Accessibility', 
          count: '78%', 
          color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
          description: 'Facility access analysis'
        },
      ]
    }
  ];

  const statistics = [
    { label: 'Total Facilities', value: '48', change: '+2', icon: Home, color: 'text-emerald-400' },
    { label: 'Service Coverage', value: '65%', change: '+3%', icon: Shield, color: 'text-green-400' },
    { label: 'Avg. Distance', value: '245m', change: '-15m', icon: MapPin, color: 'text-blue-400' },
    { label: 'Active Reports', value: '23', change: '+5', icon: AlertCircle, color: 'text-amber-400' },
  ];

  const quickActions = [
    { label: 'Reset View', icon: RefreshCw, action: () => console.log('Reset view') },
    { label: 'Zoom to Area', icon: Maximize2, action: () => console.log('Zoom to area') },
    { label: 'Show All', icon: Eye, action: () => console.log('Show all') },
    { label: 'Hide All', icon: EyeOff, action: () => console.log('Hide all') },
  ];

  return (
    <div className="w-80 glass-effect-green rounded-2xl p-6 overflow-y-auto border border-emerald-500/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-emerald-500/20">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg">
            <Layers className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Map Layers & Data</h2>
            <p className="text-xs text-emerald-300/70">Toggle layers and adjust settings</p>
          </div>
        </div>
        <button className="p-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-lg transition-colors">
          <Settings className="h-4 w-4" />
        </button>
      </div>

      {/* Quick Actions Bar */}
      <div className="mb-6 grid grid-cols-2 gap-2">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={action.action}
            className="flex items-center justify-center space-x-2 py-2 px-3 bg-emerald-500/10 text-emerald-300 rounded-lg hover:bg-emerald-500/20 hover:text-white transition-all duration-200"
          >
            <action.icon className="h-4 w-4" />
            <span className="text-xs font-medium">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Layer Groups */}
      <div className="space-y-4">
        {layerGroups.map((group) => (
          <div key={group.id} className="space-y-2">
            <button
              onClick={() => toggleGroup(group.id)}
              className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-emerald-500/10 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <group.icon className={`h-4 w-4 ${expandedGroups.includes(group.id) ? 'text-emerald-400' : 'text-gray-400'}`} />
                <h3 className={`font-semibold text-sm ${expandedGroups.includes(group.id) ? 'text-emerald-300' : 'text-gray-300'}`}>
                  {group.title}
                </h3>
              </div>
              <ChevronRight 
                className={`h-3 w-3 transition-transform ${expandedGroups.includes(group.id) ? 'rotate-90 text-emerald-400' : 'text-gray-500'}`} 
              />
            </button>
            
            {expandedGroups.includes(group.id) && (
              <div className="space-y-2 ml-2 pl-4 border-l border-emerald-500/20 animate-fade-in">
                {group.items.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-emerald-500/5 transition-colors group">
                      <div className="flex items-center space-x-3 flex-1">
                        {item.type === 'radio' ? (
                          <div className="relative">
                            <input
                              type="radio"
                              name="baseMap"
                              checked={item.checked}
                              onChange={() => onToggleLayer(item.id)}
                              className="sr-only"
                              id={`radio-${item.id}`}
                            />
                            <label 
                              htmlFor={`radio-${item.id}`}
                              className={`flex items-center justify-center w-4 h-4 rounded-full border-2 cursor-pointer ${
                                item.checked 
                                  ? 'border-emerald-400 bg-emerald-400' 
                                  : 'border-emerald-500/40 hover:border-emerald-400'
                              }`}
                            >
                              {item.checked && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                            </label>
                          </div>
                        ) : (
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={layers[item.id]}
                              onChange={() => onToggleLayer(item.id)}
                              className="sr-only"
                              id={`checkbox-${item.id}`}
                            />
                            <label 
                              htmlFor={`checkbox-${item.id}`}
                              className={`flex items-center justify-center w-4 h-4 rounded border cursor-pointer transition-all ${
                                layers[item.id]
                                  ? 'bg-gradient-to-r from-emerald-500 to-green-500 border-emerald-500' 
                                  : 'border-emerald-500/40 hover:border-emerald-400 bg-emerald-500/10'
                              }`}
                            >
                              {layers[item.id] && (
                                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </label>
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            {item.color && (
                              <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                            )}
                            <span className="text-sm font-medium text-gray-200 group-hover:text-white truncate">
                              {item.label}
                            </span>
                          </div>
                          {item.description && (
                            <p className="text-xs text-emerald-300/60 truncate">{item.description}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {item.count && (
                          <span className="text-xs font-medium text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded">
                            {item.count}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Opacity Slider for Layers */}
                    {item.opacity !== undefined && layers[item.id] && (
                      <div className="ml-7 mb-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-emerald-300/70">Opacity</span>
                          <span className="text-xs font-medium text-emerald-300">{item.opacity}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={item.opacity}
                          onChange={(e) => updateOpacity(item.id, parseInt(e.target.value))}
                          className="w-full h-1.5 bg-emerald-500/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Statistics Panel */}
      <div className="mt-8 pt-6 border-t border-emerald-500/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white">Area Statistics</h3>
          <TrendingUp className="h-4 w-4 text-emerald-400" />
        </div>
        <div className="space-y-3">
          {statistics.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between p-2 rounded-lg hover:bg-emerald-500/5 transition-colors">
              <div className="flex items-center space-x-2">
                <stat.icon className={`h-3.5 w-3.5 ${stat.color}`} />
                <span className="text-sm text-gray-300">{stat.label}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-white">{stat.value}</span>
                <span className={`text-xs px-2 py-1 rounded font-medium ${
                  stat.change.startsWith('+') 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : 'bg-rose-500/20 text-rose-400'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Export & Filter Actions */}
      <div className="mt-6 pt-6 border-t border-emerald-500/20">
        <div className="space-y-2">
          <button className="w-full flex items-center justify-center space-x-2 py-2.5 bg-gradient-to-r from-emerald-500/10 to-green-500/10 text-emerald-300 rounded-xl hover:bg-gradient-to-r hover:from-emerald-500/20 hover:to-green-500/20 hover:text-white transition-all duration-200 border border-emerald-500/20">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Advanced Filters</span>
          </button>
          <button className="w-full flex items-center justify-center space-x-2 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 font-medium">
            <Download className="h-4 w-4" />
            <span className="text-sm">Export Data & Map</span>
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-6 pt-4 border-t border-emerald-500/20">
        <div className="flex items-center justify-between text-xs">
          <span className="text-emerald-300/60">Last Updated</span>
          <span className="text-emerald-300 font-medium">Today, 14:30</span>
        </div>
        <div className="flex items-center justify-between text-xs mt-1">
          <span className="text-emerald-300/60">Data Source</span>
          <span className="text-emerald-300 font-medium">Community + Satellite</span>
        </div>
      </div>
    </div>
  );
}

export default MapSidebar;