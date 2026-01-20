import React, { useState } from 'react';
import { 
  X, Ruler, Navigation, Zap, Filter, Layers, 
  TrendingUp, Target, Download, Share2, Settings,
  BarChart3, PieChart, Map, Globe, Users
} from 'lucide-react';

function AnalysisPanel({ onClose }) {
  const [activeAnalysis, setActiveAnalysis] = useState('coverage');
  const [bufferDistance, setBufferDistance] = useState(500);
  const [selectedMetric, setSelectedMetric] = useState('accessibility');

  const analysisTypes = [
    { id: 'coverage', icon: Target, label: 'Service Coverage', color: 'text-primary-500' },
    { id: 'accessibility', icon: Navigation, label: 'Accessibility', color: 'text-green-500' },
    { id: 'hotspot', icon: Zap, label: 'Hotspot Detection', color: 'text-red-500' },
    { id: 'demographic', icon: Users, label: 'Demographic', color: 'text-purple-500' },
    { id: 'temporal', icon: TrendingUp, label: 'Temporal', color: 'text-amber-500' },
  ];

  const metrics = [
    { id: 'accessibility', label: 'Accessibility Score', value: 78, change: '+3%', color: 'bg-primary-500' },
    { id: 'coverage', label: 'Service Coverage', value: 65, change: '+2%', color: 'bg-green-500' },
    { id: 'density', label: 'Facility Density', value: 4.2, change: '-0.3', color: 'bg-blue-500' },
    { id: 'response', label: 'Avg Response Time', value: '4.2h', change: '-0.8h', color: 'bg-amber-500' },
  ];

  const demographicData = [
    { category: 'Low Income', value: 45, color: 'bg-red-500' },
    { category: 'Medium Income', value: 35, color: 'bg-yellow-500' },
    { category: 'High Income', value: 20, color: 'bg-green-500' },
  ];

  return (
    <div className="w-96 glass-effect rounded-2xl p-6 animate-slide-in overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Advanced Analysis</h2>
            <p className="text-xs text-gray-400">Spatial intelligence tools</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Analysis Type Selector */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-300">Analysis Type</h3>
          <Settings className="h-4 w-4 text-gray-400" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {analysisTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveAnalysis(type.id)}
              className={`flex flex-col items-center p-3 rounded-lg ${
                activeAnalysis === type.id
                  ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-white/20'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <type.icon className={`h-5 w-5 mb-2 ${type.color}`} />
              <span className="text-xs text-gray-300">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Buffer Analysis Controls */}
      <div className="mb-6 p-4 bg-white/5 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-white">Buffer Analysis</h3>
          <Ruler className="h-4 w-4 text-gray-400" />
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Distance: {bufferDistance}m</span>
              <span>Coverage: {Math.round(bufferDistance * 0.2)} people</span>
            </div>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={bufferDistance}
              onChange={(e) => setBufferDistance(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>100m</span>
              <span>500m</span>
              <span>1000m</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button className="py-2 text-sm bg-white/10 text-white rounded-lg hover:bg-white/20">
              Apply Buffer
            </button>
            <button className="py-2 text-sm bg-primary-500 text-white rounded-lg hover:bg-primary-600">
              Analyze Coverage
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Display */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-white mb-3">Key Metrics</h3>
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`p-3 rounded-xl cursor-pointer ${
                selectedMetric === metric.id
                  ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-white/20'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">{metric.label}</span>
                <div className={`w-2 h-2 rounded-full ${metric.color}`}></div>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-xl font-bold text-white">{metric.value}</div>
                <span className={`text-xs px-2 py-1 rounded ${
                  metric.change.startsWith('+') 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {metric.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Demographic Breakdown */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-white mb-3">Demographic Breakdown</h3>
        <div className="space-y-3">
          {demographicData.map((item) => (
            <div key={item.category} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">{item.category}</span>
                <span className="text-white font-medium">{item.value}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.color}`}
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center space-x-2 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">
            <Download className="h-4 w-4" />
            <span className="text-sm">Export Data</span>
          </button>
          <button className="flex items-center justify-center space-x-2 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">
            <Share2 className="h-4 w-4" />
            <span className="text-sm">Share Analysis</span>
          </button>
        </div>
        
        <button className="w-full py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-lg">
          Generate Report
        </button>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <h3 className="text-sm font-medium text-white mb-3">Analysis Legend</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-primary-500"></div>
            <span className="text-xs text-gray-300">High Accessibility (&gt;80%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-xs text-gray-300">Medium Accessibility (60-80%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-gray-300">Low Accessibility (&lt;60%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500/50 border border-blue-500"></div>
            <span className="text-xs text-gray-300">Buffer Zone ({bufferDistance}m)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisPanel;