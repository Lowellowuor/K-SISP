import React from 'react';

const SpatialFloatingPanel = ({ timeRange, setTimeRange, darkMode, onExport, onShare, on3DToggle }) => {
  const timeRanges = [
    { id: '1h', label: '1H' },
    { id: '24h', label: '24H' },
    { id: '7d', label: '7D' },
    { id: '30d', label: '30D' },
    { id: '90d', label: '3M' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className={`rounded-2xl p-4 shadow-xl backdrop-blur-lg ${
        darkMode 
          ? 'glass-green border-emerald-500/20' 
          : 'glass-light border-emerald-200'
      }`}>
        <div className="flex items-center space-x-4">
          {/* Time Range Selector */}
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>
              Time:
            </span>
            <div className="flex items-center space-x-1">
              {timeRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setTimeRange(range.id)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-300 ${
                    timeRange === range.id
                      ? darkMode 
                        ? 'bg-gradient-to-r from-emerald-600 to-green-500 text-white' 
                        : 'bg-gradient-to-r from-emerald-500 to-green-400 text-white'
                      : darkMode 
                        ? 'bg-emerald-800/30 text-emerald-200 hover:text-white hover:bg-emerald-700/40' 
                        : 'bg-emerald-100 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-200'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className={`h-6 w-px ${darkMode ? 'bg-emerald-500/30' : 'bg-emerald-300'}`}></div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={on3DToggle}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                darkMode 
                  ? 'bg-emerald-800/30 border border-emerald-500/20 text-emerald-200 hover:bg-emerald-700/40 hover:border-emerald-400/30' 
                  : 'bg-emerald-100 border border-emerald-200 text-emerald-600 hover:bg-emerald-200'
              }`}
            >
              <div className="h-4 w-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span className="text-sm font-medium">3D View</span>
            </button>
            
            <button
              onClick={onExport}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                darkMode 
                  ? 'bg-emerald-800/30 border border-emerald-500/20 text-emerald-200 hover:bg-emerald-700/40 hover:border-emerald-400/30' 
                  : 'bg-emerald-100 border border-emerald-200 text-emerald-600 hover:bg-emerald-200'
              }`}
            >
              <div className="h-4 w-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                </svg>
              </div>
              <span className="text-sm font-medium">Export</span>
            </button>
            
            <button
              onClick={onShare}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                darkMode 
                  ? 'bg-gradient-to-r from-emerald-600 to-green-500 text-white hover:shadow-lg' 
                  : 'bg-gradient-to-r from-emerald-500 to-green-400 text-white hover:shadow-lg'
              }`}
            >
              <div className="h-4 w-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                </svg>
              </div>
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpatialFloatingPanel;