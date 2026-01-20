import React from 'react';
import { 
  Database, Filter, Target, Cpu, Zap, 
  ChevronDown, ChevronUp, Settings, Clock 
} from 'lucide-react';

const AnalyticsSidebar = ({ 
  modules, 
  activeModule, 
  onModuleSelect, 
  analysisData, 
  onAnalysisDataChange,
  darkMode 
}) => {
  const metrics = [
    { id: 'coverage', label: 'Coverage Rate' },
    { id: 'usage', label: 'Usage Patterns' },
    { id: 'reports', label: 'Health Reports' },
    { id: 'efficiency', label: 'Efficiency' },
    { id: 'sustainability', label: 'Sustainability' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  const zones = [
    { id: 'all', label: 'All Zones' },
    { id: 'north', label: 'North Zone' },
    { id: 'south', label: 'South Zone' },
    { id: 'east', label: 'East Zone' },
    { id: 'west', label: 'West Zone' },
  ];

  const handleMetricToggle = (metricId) => {
    const newMetrics = analysisData.metrics.includes(metricId)
      ? analysisData.metrics.filter(id => id !== metricId)
      : [...analysisData.metrics, metricId];
    
    onAnalysisDataChange({
      ...analysisData,
      metrics: newMetrics
    });
  };

  const handleZoneToggle = (zoneId) => {
    const newZones = analysisData.zones.includes(zoneId)
      ? analysisData.zones.filter(id => id !== zoneId)
      : [...analysisData.zones, zoneId];
    
    onAnalysisDataChange({
      ...analysisData,
      zones: newZones
    });
  };

  const handleConfidenceChange = (value) => {
    onAnalysisDataChange({
      ...analysisData,
      confidence: value
    });
  };

  const handleSampleSizeChange = (value) => {
    onAnalysisDataChange({
      ...analysisData,
      sampleSize: value
    });
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Database className="h-5 w-5 text-emerald-400" />
          <h3 className="font-semibold text-white">Analysis Setup</h3>
        </div>
        <Settings className="h-5 w-5 text-emerald-400/50 cursor-pointer hover:text-emerald-400" />
      </div>

      {/* Metrics Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-emerald-400" />
            <h4 className="text-sm font-medium text-emerald-300">Metrics</h4>
          </div>
          <Filter className="h-4 w-4 text-emerald-400/50" />
        </div>
        <div className="space-y-2">
          {metrics.map((metric) => (
            <label key={metric.id} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={analysisData.metrics.includes(metric.id)}
                onChange={() => handleMetricToggle(metric.id)}
                className="sr-only"
              />
              <div className={`flex items-center justify-center w-5 h-5 mr-3 rounded ${
                analysisData.metrics.includes(metric.id)
                  ? 'bg-emerald-500 border-emerald-500'
                  : 'border border-emerald-500/50'
              }`}>
                {analysisData.metrics.includes(metric.id) && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-emerald-200">{metric.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Zones Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Cpu className="h-4 w-4 text-emerald-400" />
            <h4 className="text-sm font-medium text-emerald-300">Zones</h4>
          </div>
          <Zap className="h-4 w-4 text-emerald-400/50" />
        </div>
        <div className="space-y-2">
          {zones.map((zone) => (
            <label key={zone.id} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={analysisData.zones.includes(zone.id)}
                onChange={() => handleZoneToggle(zone.id)}
                className="sr-only"
              />
              <div className={`flex items-center justify-center w-5 h-5 mr-3 rounded ${
                analysisData.zones.includes(zone.id)
                  ? 'bg-emerald-500 border-emerald-500'
                  : 'border border-emerald-500/50'
              }`}>
                {analysisData.zones.includes(zone.id) && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-emerald-200">{zone.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Confidence Level */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-emerald-300">Confidence Level</h4>
          <span className="text-sm text-emerald-400">{analysisData.confidence}%</span>
        </div>
        <div className="relative pt-1">
          <input
            type="range"
            min="80"
            max="99"
            step="1"
            value={analysisData.confidence}
            onChange={(e) => handleConfidenceChange(parseInt(e.target.value))}
            className="w-full h-2 bg-emerald-900/50 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400"
          />
          <div className="flex justify-between text-xs text-emerald-400/70 mt-1">
            <span>80%</span>
            <span>90%</span>
            <span>99%</span>
          </div>
        </div>
      </div>

      {/* Sample Size */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-emerald-300">Sample Size</h4>
          <span className="text-sm text-emerald-400">{analysisData.sampleSize}</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleSampleSizeChange(Math.max(100, analysisData.sampleSize - 100))}
            className="p-2 rounded-lg bg-emerald-900/30 hover:bg-emerald-800/40 transition-colors"
          >
            <ChevronDown className="h-4 w-4 text-emerald-400" />
          </button>
          <div className="flex-1">
            <input
              type="range"
              min="100"
              max="1000"
              step="100"
              value={analysisData.sampleSize}
              onChange={(e) => handleSampleSizeChange(parseInt(e.target.value))}
              className="w-full h-2 bg-emerald-900/50 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400"
            />
          </div>
          <button
            onClick={() => handleSampleSizeChange(Math.min(1000, analysisData.sampleSize + 100))}
            className="p-2 rounded-lg bg-emerald-900/30 hover:bg-emerald-800/40 transition-colors"
          >
            <ChevronUp className="h-4 w-4 text-emerald-400" />
          </button>
        </div>
      </div>

      {/* Time Range Info */}
      <div className={`p-3 rounded-lg ${
        darkMode ? 'bg-emerald-900/20' : 'bg-emerald-100'
      }`}>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-emerald-400" />
          <div>
            <div className="text-xs text-emerald-300/70">Analysis Timeframe</div>
            <div className="text-sm font-medium text-emerald-200">
              {analysisData.timeRange === '30d' ? 'Last 30 Days' : 
               analysisData.timeRange === '7d' ? 'Last 7 Days' :
               analysisData.timeRange === '24h' ? 'Last 24 Hours' :
               analysisData.timeRange === '1h' ? 'Last Hour' : 'Custom'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSidebar;