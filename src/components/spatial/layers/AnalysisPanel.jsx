import React, { useState } from 'react';
import { 
  X, Ruler, Navigation, Zap, Filter, Layers, 
  TrendingUp, Target, Download, Share2, Settings,
  BarChart3, PieChart, Map, Globe, Users, Cpu,
  Shield, Database, Eye, AlertCircle, ChevronRight,
  Maximize2, Minimize2, RefreshCw, ClipboardCheck,
  Calculator, Crosshair, MapPin, Layers3
} from 'lucide-react';

function AnalysisPanel({ onClose }) {
  const [activeAnalysis, setActiveAnalysis] = useState('coverage');
  const [bufferDistance, setBufferDistance] = useState(500);
  const [selectedMetric, setSelectedMetric] = useState('accessibility');
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [analysisMode, setAnalysisMode] = useState('standard');

  const analysisTypes = [
    { id: 'coverage', icon: Target, label: 'Service Coverage', description: 'Facility reach analysis', color: 'text-emerald-400', bg: 'from-emerald-500/20 to-green-500/20' },
    { id: 'accessibility', icon: Navigation, label: 'Accessibility', description: 'Travel time analysis', color: 'text-cyan-400', bg: 'from-cyan-500/20 to-blue-500/20' },
    { id: 'hotspot', icon: Zap, label: 'Hotspot Detection', description: 'Issue density mapping', color: 'text-amber-400', bg: 'from-amber-500/20 to-orange-500/20' },
    { id: 'demographic', icon: Users, label: 'Demographic', description: 'Population analysis', color: 'text-violet-400', bg: 'from-violet-500/20 to-purple-500/20' },
    { id: 'temporal', icon: TrendingUp, label: 'Temporal Trends', description: 'Time-based patterns', color: 'text-rose-400', bg: 'from-rose-500/20 to-pink-500/20' },
    { id: 'network', icon: Globe, label: 'Network Analysis', description: 'Connectivity mapping', color: 'text-blue-400', bg: 'from-blue-500/20 to-indigo-500/20' },
  ];

  const metrics = [
    { id: 'accessibility', label: 'Accessibility Score', value: 78, change: '+3%', color: 'bg-emerald-500', icon: Navigation },
    { id: 'coverage', label: 'Service Coverage', value: 65, change: '+2%', color: 'bg-green-500', icon: Shield },
    { id: 'density', label: 'Facility Density', value: 4.2, change: '-0.3', color: 'bg-cyan-500', icon: MapPin },
    { id: 'response', label: 'Avg Response Time', value: '4.2h', change: '-0.8h', color: 'bg-amber-500', icon: Clock },
  ];

  const demographicData = [
    { category: 'Low Income', value: 45, color: 'bg-emerald-500', description: 'Basic sanitation access' },
    { category: 'Medium Income', value: 35, color: 'bg-green-500', description: 'Improved facilities' },
    { category: 'High Income', value: 20, color: 'bg-teal-500', description: 'Premium services' },
  ];

  const analysisModes = [
    { id: 'standard', label: 'Standard Analysis', icon: BarChart3 },
    { id: 'advanced', label: 'Advanced', icon: Cpu },
    { id: 'predictive', label: 'Predictive', icon: TrendingUp },
  ];

  const legendItems = [
    { color: 'bg-emerald-500', label: 'Excellent Access (>80%)', count: 24 },
    { color: 'bg-green-500', label: 'Good Access (60-80%)', count: 32 },
    { color: 'bg-amber-500', label: 'Moderate Access (40-60%)', count: 28 },
    { color: 'bg-rose-500', label: 'Poor Access (<40%)', count: 16 },
  ];

  return (
    <div className="w-96 glass-effect-green rounded-2xl p-6 animate-fade-in overflow-y-auto border border-emerald-500/20 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-emerald-500/20">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg shadow-lg">
            <Cpu className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Advanced Spatial Analysis</h2>
            <p className="text-xs text-emerald-300/70">Intelligent insights & predictive modeling</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-emerald-500/10 rounded-lg text-emerald-400 hover:text-emerald-300 transition-colors"
          title="Close panel"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Analysis Mode Selector */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-white">Analysis Mode</h3>
            <p className="text-xs text-emerald-300/60">Select analysis complexity</p>
          </div>
          <button 
            onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
            className="p-1.5 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-lg"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {analysisModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setAnalysisMode(mode.id)}
              className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                analysisMode === mode.id
                  ? 'bg-gradient-to-r from-emerald-500/30 to-green-500/30 border border-emerald-500/40 glow-green-sm'
                  : 'bg-emerald-500/5 hover:bg-emerald-500/15 border border-emerald-500/10'
              }`}
            >
              <mode.icon className={`h-4 w-4 mb-2 ${
                analysisMode === mode.id ? 'text-emerald-300' : 'text-emerald-400'
              }`} />
              <span className={`text-xs font-medium ${
                analysisMode === mode.id ? 'text-white' : 'text-emerald-300'
              }`}>
                {mode.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Type Selector */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-white mb-3">Analysis Tools</h3>
        <div className="grid grid-cols-2 gap-2">
          {analysisTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveAnalysis(type.id)}
              className={`group flex items-start p-3 rounded-xl transition-all hover:scale-[1.02] ${
                activeAnalysis === type.id
                  ? 'bg-gradient-to-r from-emerald-500/30 to-green-500/30 border border-emerald-500/40'
                  : 'bg-emerald-500/5 hover:bg-emerald-500/15 border border-emerald-500/10'
              }`}
            >
              <type.icon className={`h-5 w-5 mt-0.5 mr-3 ${type.color}`} />
              <div className="text-left">
                <div className={`text-sm font-medium ${
                  activeAnalysis === type.id ? 'text-white' : 'text-emerald-300'
                }`}>
                  {type.label}
                </div>
                <div className="text-xs text-emerald-300/60 mt-0.5">{type.description}</div>
              </div>
              {activeAnalysis === type.id && (
                <ChevronRight className="h-4 w-4 text-emerald-400 ml-auto" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Buffer Analysis Controls */}
      <div className="mb-6 p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Buffer Zone Analysis</h3>
            <p className="text-xs text-emerald-300/60">Define analysis radius</p>
          </div>
          <div className="flex items-center space-x-2">
            <Ruler className="h-4 w-4 text-emerald-400" />
            <Crosshair className="h-4 w-4 text-cyan-400" />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-emerald-300">Distance: <span className="font-bold text-white">{bufferDistance}m</span></span>
              <span className="text-emerald-300">Coverage: <span className="font-bold text-white">{Math.round(bufferDistance * 0.2)} people</span></span>
            </div>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={bufferDistance}
              onChange={(e) => setBufferDistance(parseInt(e.target.value))}
              className="w-full h-2 bg-emerald-500/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-emerald-300"
            />
            <div className="flex justify-between text-xs text-emerald-300/60 mt-1">
              <span>100m</span>
              <span>500m</span>
              <span>1000m</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center space-x-2 py-2.5 bg-emerald-500/10 text-emerald-300 rounded-xl hover:bg-emerald-500/20 hover:text-white transition-colors border border-emerald-500/20">
              <Calculator className="h-4 w-4" />
              <span className="text-sm font-medium">Calculate</span>
            </button>
            <button className="flex items-center justify-center space-x-2 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all">
              <Eye className="h-4 w-4" />
              <span className="text-sm font-medium">Visualize</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Display */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-white">Performance Metrics</h3>
            <p className="text-xs text-emerald-300/60">Live system indicators</p>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-emerald-400">Live</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`group p-3 rounded-xl cursor-pointer transition-all hover:scale-[1.02] ${
                selectedMetric === metric.id
                  ? 'bg-gradient-to-r from-emerald-500/30 to-green-500/30 border border-emerald-500/40'
                  : 'bg-emerald-500/5 hover:bg-emerald-500/15 border border-emerald-500/10'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <metric.icon className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-xs text-emerald-300/80">{metric.label}</span>
                </div>
                <div className={`w-2 h-2 rounded-full ${metric.color}`}></div>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-xl font-bold text-white">{metric.value}</div>
                <span className={`text-xs px-2 py-1 rounded font-medium ${
                  metric.change.startsWith('+') 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : 'bg-rose-500/20 text-rose-400'
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
        <h3 className="text-sm font-semibold text-white mb-3">Service Coverage by Income Level</h3>
        <div className="space-y-3">
          {demographicData.map((item) => (
            <div key={item.category} className="space-y-2">
              <div className="flex justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-emerald-300">{item.category}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-bold">{item.value}%</span>
                  <span className="text-xs text-emerald-300/60">{item.description}</span>
                </div>
              </div>
              <div className="h-2 bg-emerald-500/20 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.color} transition-all duration-500`}
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Settings (Collapsible) */}
      {showAdvancedSettings && (
        <div className="mb-6 p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-white">Advanced Parameters</h4>
            <Minimize2 className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-emerald-300/80 mb-1 block">Confidence Level</label>
              <input type="range" min="80" max="99" defaultValue="95" className="w-full" />
            </div>
            <div>
              <label className="text-xs text-emerald-300/80 mb-1 block">Sample Size</label>
              <input type="range" min="100" max="1000" defaultValue="500" className="w-full" />
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center space-x-2 py-2.5 bg-emerald-500/10 text-emerald-300 rounded-xl hover:bg-emerald-500/20 hover:text-white transition-colors border border-emerald-500/20">
            <Download className="h-4 w-4" />
            <span className="text-sm font-medium">Export Data</span>
          </button>
          <button className="flex items-center justify-center space-x-2 py-2.5 bg-emerald-500/10 text-emerald-300 rounded-xl hover:bg-emerald-500/20 hover:text-white transition-colors border border-emerald-500/20">
            <Share2 className="h-4 w-4" />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
        
        <button className="w-full flex items-center justify-center space-x-2 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all font-medium">
          <ClipboardCheck className="h-4 w-4" />
          <span>Generate Analysis Report</span>
        </button>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-emerald-500/20">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">Accessibility Legend</h3>
          <Layers3 className="h-4 w-4 text-emerald-400" />
        </div>
        <div className="space-y-2">
          {legendItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between p-2 rounded-lg hover:bg-emerald-500/5 transition-colors">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-xs text-emerald-300">{item.label}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium text-white">{item.count}</span>
                <span className="text-xs text-emerald-400/60">facilities</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-emerald-500/20">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1 text-emerald-300/60">
            <Database className="h-3 w-3" />
            <span>Data Updated: Today 14:30</span>
          </div>
          <button className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300">
            <RefreshCw className="h-3 w-3" />
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnalysisPanel;