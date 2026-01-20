import React from 'react';
import { Globe, Filter, LayoutGrid, RefreshCw, Settings, Maximize2, Minimize2, Eye, EyeOff } from 'lucide-react';

const SpatialDashboardControls = ({
  activeZone,
  setActiveZone,
  viewMode,
  setViewMode,
  timeRange,
  setTimeRange,
  darkMode,
  zones,
  viewModes,
  onDarkModeToggle,
  onFullscreenToggle,
  autoRefresh,
  setAutoRefresh,
  mapLayers,
  onLayerToggle
}) => {
  const timeRanges = [
    { id: '1h', label: '1H' },
    { id: '24h', label: '24H' },
    { id: '7d', label: '7D' },
    { id: '30d', label: '30D' },
    { id: '90d', label: '3M' },
  ];

  return (
    <div className={`mb-6 rounded-2xl p-6 border ${
      darkMode 
        ? 'glass-green-card border-emerald-500/20' 
        : 'glass-light-card border-emerald-200'
    }`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-xl ${
            darkMode ? 'bg-emerald-500/20' : 'bg-emerald-100'
          }`}>
            <Globe className={`h-6 w-6 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Spatial Intelligence Platform
            </h1>
            <p className={`text-sm ${darkMode ? 'text-emerald-300/70' : 'text-emerald-600/70'}`}>
              Kibera Sanitation Infrastructure & Geographic Analysis
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Zone Selector */}
          <div className="flex items-center space-x-2">
            <Filter className={`h-4 w-4 ${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`} />
            <div className="flex items-center space-x-1 p-1 rounded-lg bg-emerald-900/10">
              {zones.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setActiveZone(zone.id)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeZone === zone.id
                      ? `${zone.color} text-white shadow-md`
                      : `${darkMode ? 'text-emerald-200 hover:text-white hover:bg-emerald-800/30' : 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100'}`
                  }`}
                >
                  {zone.label}
                </button>
              ))}
            </div>
          </div>

          {/* View Mode Selector */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 p-1 rounded-lg bg-emerald-900/10">
              {viewModes.map((mode) => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      viewMode === mode.id
                        ? `${darkMode ? 'bg-emerald-600/40 text-white' : 'bg-emerald-100 text-emerald-800'}`
                        : `${darkMode ? 'text-emerald-200 hover:text-white hover:bg-emerald-800/30' : 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50'}`
                    }`}
                    title={mode.description}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{mode.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => console.log('Refresh')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                darkMode 
                  ? 'bg-emerald-800/30 text-emerald-200 hover:bg-emerald-700/40 hover:text-white' 
                  : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
              }`}
              title="Refresh Data"
            >
              <RefreshCw className="h-4 w-4" />
            </button>

            <button
              onClick={onDarkModeToggle}
              className={`p-2 rounded-lg transition-all duration-200 ${
                darkMode 
                  ? 'bg-emerald-800/30 text-emerald-200 hover:bg-emerald-700/40 hover:text-white' 
                  : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
              }`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>

            <button
              onClick={onFullscreenToggle}
              className={`p-2 rounded-lg transition-all duration-200 ${
                darkMode 
                  ? 'bg-emerald-800/30 text-emerald-200 hover:bg-emerald-700/40 hover:text-white' 
                  : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
              }`}
              title="Toggle Fullscreen"
            >
              {darkMode ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>

            {/* Auto Refresh Toggle */}
            <div className="flex items-center space-x-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={() => setAutoRefresh(!autoRefresh)}
                  className="sr-only peer"
                />
                <div className={`w-11 h-6 rounded-full peer ${
                  darkMode 
                    ? 'bg-gray-700 peer-checked:bg-emerald-600' 
                    : 'bg-gray-300 peer-checked:bg-emerald-400'
                } peer-focus:ring-4 peer-focus:ring-emerald-300/30`}>
                  <div className={`absolute top-0.5 left-0.5 bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform ${
                    autoRefresh ? 'translate-x-5' : ''
                  }`}></div>
                </div>
                <span className={`ml-2 text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Auto-refresh
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpatialDashboardControls;