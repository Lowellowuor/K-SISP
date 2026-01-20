import React, { useState } from 'react';
import { 
  Play, Download, Save, Filter, Calendar, 
  Share2, Printer, Settings, RefreshCw, Eye 
} from 'lucide-react';

function AnalyticsToolbar({ onRunAnalysis, onExport, onSave }) {
  const [activeTool, setActiveTool] = useState('filter');

  const tools = [
    { id: 'filter', icon: Filter, label: 'Filter', color: 'text-blue-500' },
    { id: 'date', icon: Calendar, label: 'Date Range', color: 'text-green-500' },
    { id: 'refresh', icon: RefreshCw, label: 'Refresh', color: 'text-purple-500' },
    { id: 'settings', icon: Settings, label: 'Settings', color: 'text-amber-500' },
    { id: 'export', icon: Download, label: 'Export', color: 'text-cyan-500' },
    { id: 'print', icon: Printer, label: 'Print', color: 'text-gray-500' },
    { id: 'share', icon: Share2, label: 'Share', color: 'text-gray-500' },
  ];

  const timeRanges = [
    { id: '24h', label: '24 Hours' },
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: 'custom', label: 'Custom Range' },
  ];

  return (
    <div className="glass-effect rounded-xl p-3 mb-4">
      <div className="flex items-center justify-between">
        {/* Left: Tools */}
        <div className="flex items-center space-x-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-lg min-w-16 transition-all ${
                activeTool === tool.id
                  ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-white/20'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <tool.icon className={`h-5 w-5 mb-1 ${tool.color}`} />
              <span className="text-xs text-gray-300">{tool.label}</span>
            </button>
          ))}
        </div>

        {/* Center: Time Range Selector */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Time Range:</span>
            <div className="flex items-center space-x-1 bg-white/5 rounded-lg p-1">
              {timeRanges.map((range) => (
                <button
                  key={range.id}
                  className={`px-3 py-1 text-xs rounded ${
                    range.id === '30d'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-6 w-px bg-white/20"></div>

          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-400">Preview Mode</span>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onSave}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
          >
            <Save className="h-4 w-4" />
            <span className="text-sm">Save Analysis</span>
          </button>
          
          <button
            onClick={onRunAnalysis}
            className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full hover:shadow-lg"
          >
            <Play className="h-4 w-4" />
            <span className="font-semibold">Run Analysis</span>
          </button>
        </div>
      </div>

      {/* Active Tool Panel */}
      {activeTool && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-400">Active Tool:</span>
              <span className="text-sm font-medium text-white">
                {tools.find(t => t.id === activeTool)?.label}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="text-xs text-gray-400 hover:text-white px-2 py-1">
                Clear
              </button>
              <button className="text-xs bg-blue-500 text-white px-3 py-1 rounded">
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnalyticsToolbar;