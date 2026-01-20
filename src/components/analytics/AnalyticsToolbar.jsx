import React, { useState } from 'react';
import { 
  Play, Download, Save, Filter, Calendar, 
  Share2, Printer, Settings, RefreshCw, Eye,
  Zap, Database, Layers, Target, Users,
  Clock, TrendingUp, Maximize2, Minimize2,
  ChevronDown, ChevronUp, X, Check,
  BarChart3, PieChart, LineChart, ScatterChart,
  AlertCircle, Globe, Home, Cpu, Shield
} from 'lucide-react';

function AnalyticsToolbar({ onRunAnalysis, onExport, onSave, activeModule }) {
  const [activeTool, setActiveTool] = useState('filter');
  const [timeRange, setTimeRange] = useState('30d');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState(['coverage', 'usage', 'reports']);

  const tools = [
    { id: 'filter', icon: Filter, label: 'Filters', description: 'Data filtering options', color: 'text-emerald-400' },
    { id: 'date', icon: Calendar, label: 'Date Range', description: 'Time period selection', color: 'text-green-400' },
    { id: 'metrics', icon: Target, label: 'Metrics', description: 'Select analysis metrics', color: 'text-cyan-400' },
    { id: 'visualize', icon: BarChart3, label: 'Visualize', description: 'Chart type options', color: 'text-amber-400' },
    { id: 'refresh', icon: RefreshCw, label: 'Refresh', description: 'Update data', color: 'text-violet-400' },
    { id: 'settings', icon: Settings, label: 'Settings', description: 'Advanced options', color: 'text-rose-400' },
  ];

  const timeRanges = [
    { id: '24h', label: '24 Hours', icon: Clock },
    { id: '7d', label: '7 Days', icon: Calendar },
    { id: '30d', label: '30 Days', icon: TrendingUp },
    { id: '90d', label: '90 Days', icon: Database },
    { id: 'custom', label: 'Custom', icon: Calendar },
  ];

  const availableMetrics = [
    { id: 'coverage', label: 'Service Coverage', icon: Target, color: 'bg-emerald-500' },
    { id: 'usage', label: 'Facility Usage', icon: Users, color: 'bg-green-500' },
    { id: 'reports', label: 'Citizen Reports', icon: AlertCircle, color: 'bg-amber-500' },
    { id: 'response', label: 'Response Time', icon: Clock, color: 'bg-cyan-500' },
    { id: 'satisfaction', label: 'User Satisfaction', icon: TrendingUp, color: 'bg-violet-500' },
    { id: 'cost', label: 'Cost Efficiency', icon: DollarSign, color: 'bg-rose-500' },
  ];

  const chartTypes = [
    { id: 'line', label: 'Line Chart', icon: LineChart, color: 'text-emerald-400' },
    { id: 'bar', label: 'Bar Chart', icon: BarChart3, color: 'text-green-400' },
    { id: 'pie', label: 'Pie Chart', icon: PieChart, color: 'text-amber-400' },
    { id: 'scatter', label: 'Scatter Plot', icon: ScatterChart, color: 'text-cyan-400' },
    { id: 'area', label: 'Area Chart', icon: Layers, color: 'text-violet-400' },
  ];

  const getModuleIcon = () => {
    const icons = {
      trends: TrendingUp,
      forecasting: Cpu,
      spatial: Globe,
      statistical: BarChart3,
      comparative: TrendingDown,
      risk: Shield,
    };
    return icons[activeModule] || BarChart3;
  };

  const ModuleIcon = getModuleIcon();

  const toggleMetric = (metricId) => {
    setSelectedMetrics(prev => 
      prev.includes(metricId)
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  };

  const toggleFullscreen = () => {
    const element = document.querySelector('.analytics-container');
    if (!document.fullscreenElement) {
      element.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="glass-effect-green rounded-2xl p-4 mb-4 border border-emerald-500/20 shadow-lg">
      <div className="flex flex-col space-y-4">
        {/* Top Row: Module Info & Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg">
              <ModuleIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Analytics Control Panel</h3>
              <p className="text-sm text-emerald-300/70">Configure analysis parameters & tools</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
              className="flex items-center space-x-2 px-3 py-2 bg-emerald-500/10 text-emerald-300 rounded-xl hover:bg-emerald-500/20 hover:text-white transition-all duration-200 border border-emerald-500/20"
            >
              {showAdvancedOptions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              <span className="text-sm font-medium">Advanced Options</span>
            </button>
            
            <button
              onClick={toggleFullscreen}
              className={`p-2 rounded-lg transition-colors ${
                isFullscreen 
                  ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30' 
                  : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
              } border border-emerald-500/20`}
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Main Tools Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`group flex flex-col items-center justify-center p-3 rounded-xl min-w-20 transition-all duration-200 hover:scale-[1.02] ${
                  activeTool === tool.id
                    ? 'bg-gradient-to-r from-emerald-500/30 to-green-500/30 border border-emerald-500/40 glow-green-sm'
                    : 'bg-emerald-500/5 hover:bg-emerald-500/15 border border-emerald-500/10'
                }`}
              >
                <tool.icon className={`h-5 w-5 mb-2 ${tool.color}`} />
                <span className="text-xs font-medium text-gray-200 group-hover:text-white">
                  {tool.label}
                </span>
                <span className="text-xs text-emerald-300/60 mt-0.5">{tool.description}</span>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onSave}
              className="flex items-center space-x-2 px-4 py-2.5 bg-emerald-500/10 text-emerald-300 rounded-xl hover:bg-emerald-500/20 hover:text-white transition-all duration-200 border border-emerald-500/20"
            >
              <Save className="h-4 w-4" />
              <span className="text-sm font-medium">Save Analysis</span>
            </button>
            
            <button
              onClick={onRunAnalysis}
              className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 font-medium"
            >
              <Zap className="h-4 w-4" />
              <span>Run Analysis</span>
            </button>
          </div>
        </div>

        {/* Time Range & Quick Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-emerald-300/80">Time Range:</span>
              <div className="flex items-center space-x-1 bg-emerald-500/10 rounded-lg p-1 border border-emerald-500/20">
                {timeRanges.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setTimeRange(range.id)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs rounded-lg transition-all ${
                      timeRange === range.id
                        ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/25'
                        : 'text-emerald-300 hover:text-white hover:bg-emerald-500/20'
                    }`}
                  >
                    <range.icon className="h-3 w-3" />
                    <span>{range.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="h-6 w-px bg-emerald-500/20"></div>

            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-emerald-300/80">Live Preview</span>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-300 rounded-lg hover:bg-emerald-500/20 hover:text-white transition-colors border border-emerald-500/20">
              <Share2 className="h-4 w-4" />
              <span className="text-sm">Share</span>
            </button>
            <button 
              onClick={onExport}
              className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-300 rounded-lg hover:bg-emerald-500/20 hover:text-white transition-colors border border-emerald-500/20"
            >
              <Download className="h-4 w-4" />
              <span className="text-sm">Export</span>
            </button>
          </div>
        </div>

        {/* Active Tool Panel */}
        {activeTool && (
          <div className="mt-2 pt-4 border-t border-emerald-500/20 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                  {(() => {
                    const tool = tools.find(t => t.id === activeTool);
                    return tool ? <tool.icon className={`h-4 w-4 ${tool.color}`} /> : null;
                  })()}
                  <span className="text-sm font-semibold text-white">
                    {tools.find(t => t.id === activeTool)?.label} Configuration
                  </span>
                </div>
                <div className="text-sm text-emerald-300/80">
                  {activeTool === 'filter' && 'Apply filters to refine your analysis'}
                  {activeTool === 'date' && 'Select the time period for analysis'}
                  {activeTool === 'metrics' && 'Choose metrics to include in analysis'}
                  {activeTool === 'visualize' && 'Select visualization type'}
                  {activeTool === 'refresh' && 'Update data from sources'}
                  {activeTool === 'settings' && 'Configure advanced analysis parameters'}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1 text-sm text-emerald-400 hover:text-emerald-300 px-3 py-1.5 hover:bg-emerald-500/10 rounded-lg">
                  <X className="h-3 w-3" />
                  <span>Clear</span>
                </button>
                <button className="flex items-center space-x-1 text-sm bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-1.5 rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all">
                  <Check className="h-3 w-3" />
                  <span>Apply</span>
                </button>
              </div>
            </div>

            {/* Tool-specific Options */}
            {activeTool === 'metrics' && (
              <div className="grid grid-cols-3 gap-2">
                {availableMetrics.map((metric) => (
                  <button
                    key={metric.id}
                    onClick={() => toggleMetric(metric.id)}
                    className={`flex items-center space-x-2 p-3 rounded-xl transition-all ${
                      selectedMetrics.includes(metric.id)
                        ? 'bg-gradient-to-r from-emerald-500/30 to-green-500/30 border border-emerald-500/40'
                        : 'bg-emerald-500/5 hover:bg-emerald-500/15 border border-emerald-500/10'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${metric.color}`}></div>
                    <metric.icon className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-medium text-white">{metric.label}</span>
                    {selectedMetrics.includes(metric.id) && (
                      <Check className="h-4 w-4 text-emerald-400 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {activeTool === 'visualize' && (
              <div className="flex items-center space-x-2">
                {chartTypes.map((chart) => (
                  <button
                    key={chart.id}
                    className={`flex flex-col items-center p-3 rounded-xl min-w-24 transition-all ${
                      chart.id === 'line'
                        ? 'bg-gradient-to-r from-emerald-500/30 to-green-500/30 border border-emerald-500/40'
                        : 'bg-emerald-500/5 hover:bg-emerald-500/15 border border-emerald-500/10'
                    }`}
                  >
                    <chart.icon className={`h-5 w-5 mb-2 ${chart.color}`} />
                    <span className="text-xs font-medium text-white">{chart.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Advanced Options Panel */}
        {showAdvancedOptions && (
          <div className="mt-4 pt-4 border-t border-emerald-500/20 animate-fade-in">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Analysis Parameters</h4>
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
              
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Data Sources</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="text-emerald-500" />
                    <span className="text-sm text-emerald-300">Satellite Data</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="text-emerald-500" />
                    <span className="text-sm text-emerald-300">Community Reports</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="text-emerald-500" />
                    <span className="text-sm text-emerald-300">Sensor Data</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Output Format</h4>
                <div className="space-y-2">
                  <button className="w-full text-left text-sm p-2 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
                    PDF Report
                  </button>
                  <button className="w-full text-left text-sm p-2 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
                    CSV Data
                  </button>
                  <button className="w-full text-left text-sm p-2 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
                    Interactive Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Note: You'll need to import DollarSign and TrendingDown icons if not available
// Replace with available icons from lucide-react
const DollarSign = Printer; // Using Printer as placeholder for DollarSign
const TrendingDown = TrendingUp; // Using TrendingUp as placeholder for TrendingDown

export default AnalyticsToolbar;