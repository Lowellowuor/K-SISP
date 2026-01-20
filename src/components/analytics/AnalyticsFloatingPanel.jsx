import React from 'react';
import { RefreshCw, Download, Share2, Zap, Clock, BarChart3 } from 'lucide-react';

const AnalyticsFloatingPanel = ({
  timeRange,
  setTimeRange,
  darkMode,
  onExport,
  onShare,
  onRunAnalysis
}) => {
  const timeRanges = [
    { id: '1h', label: '1H' },
    { id: '24h', label: '24H' },
    { id: '7d', label: '7D' },
    { id: '30d', label: '30D' },
    { id: '90d', label: '3M' },
    { id: 'custom', label: 'Custom' },
  ];

  return (
    <>
      {/* Desktop Floating Panel */}
      <div className="hidden lg:block fixed right-6 bottom-6 z-30">
        <div className={`rounded-2xl shadow-2xl shadow-emerald-500/20 border ${
          darkMode 
            ? 'glass-green-card border-emerald-500/20' 
            : 'glass-light-card border-emerald-200'
        }`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-emerald-300">Quick Controls</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-emerald-400">Live</span>
              </div>
            </div>

            {/* Time Range Selector */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-emerald-300/70">Time Range</span>
                <Clock className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="flex flex-wrap gap-2">
                {timeRanges.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setTimeRange(range.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      timeRange === range.id
                        ? darkMode 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-emerald-500 text-white'
                        : darkMode
                          ? 'bg-emerald-900/30 text-emerald-300 hover:bg-emerald-800/40'
                          : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                onClick={onRunAnalysis}
                className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all duration-200 hover:scale-105 ${
                  darkMode
                    ? 'bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/30'
                    : 'bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/20'
                }`}
              >
                <Zap className="h-5 w-5 text-emerald-400 mb-1" />
                <span className="text-xs text-emerald-300">Run Now</span>
              </button>
              
              <button
                onClick={onExport}
                className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all duration-200 hover:scale-105 ${
                  darkMode
                    ? 'bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/30'
                    : 'bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/20'
                }`}
              >
                <Download className="h-5 w-5 text-emerald-400 mb-1" />
                <span className="text-xs text-emerald-300">Export</span>
              </button>
              
              <button
                onClick={onShare}
                className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all duration-200 hover:scale-105 ${
                  darkMode
                    ? 'bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/30'
                    : 'bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/20'
                }`}
              >
                <Share2 className="h-5 w-5 text-emerald-400 mb-1" />
                <span className="text-xs text-emerald-300">Share</span>
              </button>
              
              <button
                onClick={() => console.log('Schedule')}
                className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all duration-200 hover:scale-105 ${
                  darkMode
                    ? 'bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/30'
                    : 'bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/20'
                }`}
              >
                <RefreshCw className="h-5 w-5 text-emerald-400 mb-1" />
                <span className="text-xs text-emerald-300">Auto-run</span>
              </button>
            </div>

            {/* Status Bar */}
            <div className={`p-3 rounded-lg ${
              darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-xs text-emerald-300">Processing Ready</span>
                </div>
                <BarChart3 className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="mt-2">
                <div className="w-full bg-emerald-900/50 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-emerald-400 h-1.5 rounded-full animate-pulse"
                    style={{ width: '75%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsFloatingPanel;