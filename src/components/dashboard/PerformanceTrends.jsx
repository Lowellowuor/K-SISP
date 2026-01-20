import React, { useState } from 'react';
import { TrendingUp, BarChart3, Calendar, Download, Filter, Maximize2 } from 'lucide-react';

const PerformanceTrends = ({ timeRange = '7d', activeZone = 'all', darkMode = true }) => {
  const [chartType, setChartType] = useState('line');
  const [selectedMetric, setSelectedMetric] = useState('responseTime');

  const metrics = {
    responseTime: { label: 'Response Time', unit: 'ms', color: '#10b981' },
    throughput: { label: 'Throughput', unit: 'req/s', color: '#3b82f6' },
    errorRate: { label: 'Error Rate', unit: '%', color: '#ef4444' },
    cpu: { label: 'CPU Usage', unit: '%', color: '#f59e0b' }
  };

  const timeLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const generateData = () => {
    const base = activeZone === 'north' ? 100 : 
                 activeZone === 'south' ? 120 : 
                 activeZone === 'east' ? 90 : 
                 activeZone === 'west' ? 110 : 100;
    
    return timeLabels.map((_, i) => {
      const variation = (Math.sin(i * 0.5) * 20) + (Math.random() * 10);
      return Math.max(0, base + variation);
    });
  };

  const data = generateData();
  const maxValue = Math.max(...data);
  const currentMetric = metrics[selectedMetric];

  return (
    <div className="h-full p-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
        <div className="flex items-center space-x-3 mb-4 lg:mb-0">
          <div className={`p-2 rounded-xl ${darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'}`}>
            <TrendingUp className={`h-5 w-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Performance Trends</h3>
            <p className="text-sm text-emerald-300/70">{currentMetric.label} over time</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Metric Selector */}
          <div className="flex items-center space-x-1 p-1 rounded-lg bg-emerald-900/10">
            {Object.entries(metrics).map(([key, metric]) => (
              <button
                key={key}
                onClick={() => setSelectedMetric(key)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedMetric === key
                    ? darkMode 
                      ? 'bg-emerald-600/40 text-white' 
                      : 'bg-emerald-100 text-emerald-800'
                    : darkMode 
                      ? 'text-emerald-200 hover:text-white hover:bg-emerald-800/30' 
                      : 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50'
                }`}
              >
                {metric.label}
              </button>
            ))}
          </div>

          {/* Chart Type */}
          <div className="flex items-center space-x-1 p-1 rounded-lg bg-emerald-900/10">
            <button
              onClick={() => setChartType('line')}
              className={`p-1.5 rounded-md transition-all duration-200 ${
                chartType === 'line'
                  ? darkMode ? 'bg-emerald-600/40 text-white' : 'bg-emerald-100 text-emerald-800'
                  : darkMode ? 'text-emerald-200 hover:text-white hover:bg-emerald-800/30' : 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50'
              }`}
            >
              <TrendingUp className="h-4 w-4" />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`p-1.5 rounded-md transition-all duration-200 ${
                chartType === 'bar'
                  ? darkMode ? 'bg-emerald-600/40 text-white' : 'bg-emerald-100 text-emerald-800'
                  : darkMode ? 'text-emerald-200 hover:text-white hover:bg-emerald-800/30' : 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className={`rounded-xl p-4 mb-6 ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
        <div className="h-64 relative">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-emerald-400/70">
            <div>{maxValue.toFixed(0)}{currentMetric.unit}</div>
            <div>{(maxValue * 0.75).toFixed(0)}{currentMetric.unit}</div>
            <div>{(maxValue * 0.5).toFixed(0)}{currentMetric.unit}</div>
            <div>{(maxValue * 0.25).toFixed(0)}{currentMetric.unit}</div>
            <div>0{currentMetric.unit}</div>
          </div>

          {/* Chart */}
          <div className="ml-12 h-full relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[0, 25, 50, 75, 100].map((percent) => (
                <div 
                  key={percent}
                  className={`border-t ${darkMode ? 'border-emerald-500/20' : 'border-emerald-200'}`}
                  style={{ top: `${percent}%` }}
                />
              ))}
            </div>

            {/* Data points */}
            <div className="absolute inset-0 flex items-end justify-between px-2">
              {data.map((value, index) => {
                const height = (value / maxValue) * 100;
                return (
                  <div key={index} className="flex flex-col items-center" style={{ width: `${80 / data.length}%` }}>
                    {/* Bar or Line */}
                    {chartType === 'bar' ? (
                      <div
                        className="w-8 rounded-t-lg transition-all duration-500 hover:w-10"
                        style={{ 
                          height: `${height}%`,
                          background: `linear-gradient(to top, ${currentMetric.color}66, ${currentMetric.color})`
                        }}
                      />
                    ) : (
                      <div
                        className="w-1.5 h-1.5 rounded-full absolute"
                        style={{ 
                          bottom: `${height}%`,
                          left: `${(index / (data.length - 1)) * 100}%`,
                          backgroundColor: currentMetric.color,
                          transform: 'translate(-50%, 50%)'
                        }}
                      />
                    )}
                    
                    {/* Label */}
                    <div className="mt-2 text-xs text-emerald-400/70">{timeLabels[index]}</div>
                  </div>
                );
              })}

              {/* Line for line chart */}
              {chartType === 'line' && (
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                  <polyline
                    fill="none"
                    stroke={currentMetric.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={data.map((value, index) => 
                      `${(index / (data.length - 1)) * 100},${100 - (value / maxValue) * 100}`
                    ).join(' ')}
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`p-4 rounded-xl ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
          <div className="text-sm text-emerald-300/70 mb-1">Current</div>
          <div className="text-2xl font-bold text-white">
            {data[data.length - 1].toFixed(1)}{currentMetric.unit}
          </div>
        </div>
        
        <div className={`p-4 rounded-xl ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
          <div className="text-sm text-emerald-300/70 mb-1">Average</div>
          <div className="text-2xl font-bold text-white">
            {(data.reduce((a, b) => a + b, 0) / data.length).toFixed(1)}{currentMetric.unit}
          </div>
        </div>
        
        <div className={`p-4 rounded-xl ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
          <div className="text-sm text-emerald-300/70 mb-1">Peak</div>
          <div className="text-2xl font-bold text-white">
            {maxValue.toFixed(1)}{currentMetric.unit}
          </div>
        </div>
        
        <div className={`p-4 rounded-xl ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
          <div className="text-sm text-emerald-300/70 mb-1">Trend</div>
          <div className={`text-2xl font-bold flex items-center ${
            data[data.length - 1] > data[0] ? 'text-green-400' : 'text-red-400'
          }`}>
            {data[data.length - 1] > data[0] ? '↗' : '↘'}
            <span className="ml-1">
              {Math.abs(((data[data.length - 1] - data[0]) / data[0]) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Time Range Info */}
      <div className={`mt-6 p-3 rounded-xl ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-emerald-400" />
            <span className="text-white">
              Showing {timeRange === '7d' ? 'last 7 days' : 
                      timeRange === '30d' ? 'last 30 days' : 
                      'current week'} data
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button className={`p-1.5 rounded-lg ${darkMode ? 'hover:bg-emerald-800/30 text-emerald-400 hover:text-white' : 'hover:bg-emerald-100 text-emerald-500 hover:text-emerald-700'}`}>
              <Download className="h-4 w-4" />
            </button>
            <button className={`p-1.5 rounded-lg ${darkMode ? 'hover:bg-emerald-800/30 text-emerald-400 hover:text-white' : 'hover:bg-emerald-100 text-emerald-500 hover:text-emerald-700'}`}>
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceTrends;