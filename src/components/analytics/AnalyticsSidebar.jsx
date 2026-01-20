import React, { useState } from 'react';
import { 
  TrendingUp, Cpu, Database, BarChart3, 
  Map, Target, Users, Cloud, Zap,
  Layers, Filter, CheckCircle, XCircle,
  ChevronRight, Settings, Download
} from 'lucide-react';

function AnalyticsSidebar({ modules, activeModule, onModuleSelect, analysisData, onAnalysisDataChange }) {
  const [expandedSections, setExpandedSections] = useState(['analysis', 'metrics']);

  const toggleSection = (section) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const analysisModules = [
    {
      id: 'trends',
      icon: TrendingUp,
      label: 'Trend Analysis',
      description: 'Time series and pattern detection',
      color: 'text-blue-500',
      subModules: [
        { id: 'time-series', label: 'Time Series' },
        { id: 'seasonality', label: 'Seasonality' },
        { id: 'anomaly', label: 'Anomaly Detection' },
        { id: 'correlation', label: 'Correlation Analysis' },
      ]
    },
    {
      id: 'forecasting',
      icon: Cpu,
      label: 'Predictive Analytics',
      description: 'Machine learning and forecasting',
      color: 'text-green-500',
      subModules: [
        { id: 'demand-forecast', label: 'Demand Forecasting' },
        { id: 'maintenance', label: 'Maintenance Prediction' },
        { id: 'risk-assessment', label: 'Risk Assessment' },
        { id: 'scenario', label: 'Scenario Analysis' },
      ]
    },
    {
      id: 'spatial',
      icon: Database,
      label: 'Spatial Analytics',
      description: 'Geospatial and network analysis',
      color: 'text-purple-500',
      subModules: [
        { id: 'hotspot', label: 'Hotspot Analysis' },
        { id: 'coverage', label: 'Coverage Analysis' },
        { id: 'accessibility', label: 'Accessibility Modeling' },
        { id: 'network', label: 'Network Analysis' },
      ]
    },
    {
      id: 'statistical',
      icon: BarChart3,
      label: 'Statistical Tests',
      description: 'Hypothesis testing and validation',
      color: 'text-amber-500',
      subModules: [
        { id: 'hypothesis', label: 'Hypothesis Testing' },
        { id: 'regression', label: 'Regression Analysis' },
        { id: 'anova', label: 'ANOVA' },
        { id: 'clustering', label: 'Clustering' },
      ]
    },
  ];

  const metrics = [
    { id: 'coverage', label: 'Service Coverage', icon: Target, default: true },
    { id: 'usage', label: 'Facility Usage', icon: Users, default: true },
    { id: 'reports', label: 'Citizen Reports', icon: Cloud, default: true },
    { id: 'response', label: 'Response Time', icon: Zap, default: false },
    { id: 'maintenance', label: 'Maintenance', icon: Settings, default: false },
    { id: 'cost', label: 'Cost Efficiency', icon: TrendingUp, default: false },
  ];

  const zones = [
    { id: 'all', label: 'All Zones', default: true },
    { id: 'zone-a', label: 'Zone A', default: false },
    { id: 'zone-b', label: 'Zone B', default: false },
    { id: 'zone-c', label: 'Zone C', default: false },
    { id: 'zone-d', label: 'Zone D', default: false },
  ];

  const toggleMetric = (metricId) => {
    const newMetrics = analysisData.metrics.includes(metricId)
      ? analysisData.metrics.filter(id => id !== metricId)
      : [...analysisData.metrics, metricId];
    
    onAnalysisDataChange({
      ...analysisData,
      metrics: newMetrics
    });
  };

  const toggleZone = (zoneId) => {
    const newZones = analysisData.zones.includes(zoneId)
      ? analysisData.zones.filter(id => id !== zoneId)
      : zoneId === 'all' ? ['all'] : [...analysisData.zones.filter(id => id !== 'all'), zoneId];
    
    onAnalysisDataChange({
      ...analysisData,
      zones: newZones
    });
  };

  return (
    <div className="w-80 glass-effect rounded-2xl p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white">Analysis Modules</h2>
        <button className="p-2 text-gray-400 hover:text-white">
          <Settings className="h-4 w-4" />
        </button>
      </div>

      {/* Analysis Modules */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-gray-300 mb-3">
          <Layers className="h-4 w-4" />
          <h3 className="font-semibold text-sm">Analysis Type</h3>
        </div>
        
        <div className="space-y-2">
          {analysisModules.map((module) => (
            <button
              key={module.id}
              onClick={() => onModuleSelect(module.id)}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                activeModule === module.id
                  ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-white/20'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center space-x-3">
                <module.icon className={`h-5 w-5 ${module.color}`} />
                <div className="flex-1">
                  <div className="font-medium text-white">{module.label}</div>
                  <div className="text-xs text-gray-400">{module.description}</div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-500" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-gray-300">
            <Target className="h-4 w-4" />
            <h3 className="font-semibold text-sm">Metrics</h3>
          </div>
          <Filter className="h-4 w-4 text-gray-400" />
        </div>
        
        <div className="space-y-2">
          {metrics.map((metric) => (
            <label key={metric.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 cursor-pointer">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={analysisData.metrics.includes(metric.id)}
                  onChange={() => toggleMetric(metric.id)}
                  className="rounded border-gray-600 text-blue-500"
                />
                <metric.icon className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-300">{metric.label}</span>
              </div>
              {metric.default && (
                <span className="text-xs text-gray-500">Default</span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Zone Selection */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-gray-300 mb-3">
          <Map className="h-4 w-4" />
          <h3 className="font-semibold text-sm">Geographic Zones</h3>
        </div>
        
        <div className="space-y-2">
          {zones.map((zone) => (
            <label key={zone.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 cursor-pointer">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={analysisData.zones.includes(zone.id)}
                  onChange={() => toggleZone(zone.id)}
                  className="rounded border-gray-600 text-blue-500"
                />
                <span className="text-sm text-gray-300">{zone.label}</span>
              </div>
              {zone.default && (
                <span className="text-xs text-gray-500">Default</span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <h3 className="font-semibold text-white mb-4">Analysis Summary</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Selected Metrics:</span>
            <span className="font-semibold text-white">{analysisData.metrics.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Time Range:</span>
            <span className="font-semibold text-white">{analysisData.timeRange}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Active Zones:</span>
            <span className="font-semibold text-white">
              {analysisData.zones.includes('all') ? 'All' : analysisData.zones.length}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 space-y-2">
        <button className="w-full flex items-center justify-center space-x-2 py-2 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 hover:text-white">
          <Download className="h-4 w-4" />
          <span className="text-sm">Export Configuration</span>
        </button>
        <button className="w-full flex items-center justify-center space-x-2 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30">
          <span className="text-sm">Reset to Defaults</span>
        </button>
      </div>
    </div>
  );
}

export default AnalyticsSidebar;