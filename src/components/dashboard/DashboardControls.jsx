import React from 'react';

const DashboardControls = ({
  activeZone,
  setActiveZone,
  viewMode,
  setViewMode,
  timeRange,
  setTimeRange,
  darkMode,
  zones,
  onDarkModeToggle,
  onFullscreenToggle,
  autoRefresh,
  setAutoRefresh
}) => {
  const viewModes = [
    { id: 'standard', label: 'Standard', icon: '📊' },
    { id: 'detailed', label: 'Detailed', icon: '📈' },
    { id: 'compact', label: 'Compact', icon: '🔍' },
  ];

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
            <div className="h-6 w-6 text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
              </svg>
            </div>
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Smart City Dashboard
            </h1>
            <p className={`text-sm ${
              darkMode ? 'text-emerald-300/70' : 'text-emerald-600/70'
            }`}>
              Real-time monitoring & analytics
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Zone Selector */}
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${
              darkMode ? 'text-emerald-300' : 'text-emerald-600'
            }`}>
              Zone:
            </span>
            <div className="flex items-center space-x-1 p-1 rounded-lg bg-emerald-900/10">
              {zones.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setActiveZone(zone.id)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeZone === zone.id
                      ? `${zone.color} text-white shadow-md`
                      : darkMode 
                        ? 'text-emerald-200 hover:text-white hover:bg-emerald-800/30' 
                        : 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  {zone.label}
                </button>
              ))}
            </div>
          </div>

          {/* View Mode Selector */}
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${
              darkMode ? 'text-emerald-300' : 'text-emerald-600'
            }`}>
              View:
            </span>
            <div className="flex items-center space-x-1 p-1 rounded-lg bg-emerald-900/10">
              {viewModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    viewMode === mode.id
                      ? darkMode 
                        ? 'bg-emerald-600/40 text-white' 
                        : 'bg-emerald-100 text-emerald-800'
                      : darkMode 
                        ? 'text-emerald-200 hover:text-white hover:bg-emerald-800/30' 
                        : 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50'
                  }`}
                >
                  <span>{mode.icon}</span>
                  <span>{mode.label}</span>
                </button>
              ))}
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
              <div className="h-4 w-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-8 3.58-8 8s3.58 8 8 8c3.95 0 7.23-2.86 7.88-6.65h-2.23A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                </svg>
              </div>
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
              <div className="h-4 w-4">
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM18 14.48V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48zM12 6.5v11c3.03 0 5.5-2.47 5.5-5.5S15.03 6.5 12 6.5z"/>
                  </svg>
                )}
              </div>
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
              <div className="h-4 w-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
              </div>
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

export default DashboardControls;