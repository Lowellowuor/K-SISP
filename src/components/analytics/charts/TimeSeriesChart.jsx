import React, { useState } from 'react';
import { TrendingUp, Calendar, Filter, Download } from 'lucide-react';

function TimeSeriesChart({ chartType }) {
  const [selectedMetric, setSelectedMetric] = useState('coverage');

  const metrics = [
    { id: 'coverage', label: 'Service Coverage', color: 'text-blue-500', data: [65, 68, 72, 70, 75, 78, 80] },
    { id: 'usage', label: 'Facility Usage', color: 'text-green-500', data: [75, 78, 82, 80, 85, 88, 90] },
    { id: 'reports', label: 'Citizen Reports', color: 'text-amber-500', data: [120, 110, 130, 125, 140, 135, 150] },
    { id: 'response', label: 'Response Time', color: 'text-purple-500', data: [5.2, 4.8, 4.5, 4.2, 4.0, 3.8, 3.5] },
  ];

  const timePeriods = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  
  const selectedData = metrics.find(m => m.id === selectedMetric)?.data || [];

  const maxValue = Math.max(...selectedData);
  const minValue = Math.min(...selectedData);

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            <h4 className="font-semibold text-white">Time Series Analysis</h4>
          </div>
          
          <div className="flex items-center space-x-2">
            {metrics.map((metric) => (
              <button
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id)}
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedMetric === metric.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                {metric.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-white">
            <Calendar className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white">
            <Filter className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="h-[calc(100%-4rem)]">
        {/* Chart Container */}
        <div className="h-full relative">
          {/* Y-axis Labels */}
          <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between py-4">
            <span className="text-xs text-gray-400 text-right">{maxValue}</span>
            <span className="text-xs text-gray-400 text-right">{Math.round((maxValue + minValue) / 2)}</span>
            <span className="text-xs text-gray-400 text-right">{minValue}</span>
          </div>
          
          {/* Chart Area */}
          <div className="ml-12 h-full relative">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              <div className="h-px bg-white/10 w-full"></div>
              <div className="h-px bg-white/10 w-full"></div>
              <div className="h-px bg-white/10 w-full"></div>
            </div>
            
            {/* Data Line/Bars */}
            <div className="absolute inset-0 flex items-end">
              {selectedData.map((value, index) => {
                const height = ((value - minValue) / (maxValue - minValue)) * 100;
                
                return chartType === 'time-series' ? (
                  // Line chart points
                  <div
                    key={index}
                    className="flex-1 flex items-center justify-center relative"
                    style={{ height: '100%' }}
                  >
                    <div
                      className="absolute w-1 h-full bg-blue-500/20"
                      style={{ left: '50%', transform: 'translateX(-50%)' }}
                    ></div>
                    <div
                      className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white absolute"
                      style={{ 
                        bottom: `${height}%`,
                        left: '50%',
                        transform: 'translate(-50%, 50%)'
                      }}
                    ></div>
                    
                    {/* Connect lines between points */}
                    {index > 0 && (
                      <div
                        className="absolute h-1 bg-blue-500"
                        style={{
                          left: `${(index - 0.5) * (100 / selectedData.length)}%`,
                          right: `${(selectedData.length - index - 0.5) * (100 / selectedData.length)}%`,
                          bottom: `${height}%`,
                          transform: 'translateY(50%)'
                        }}
                      ></div>
                    )}
                  </div>
                ) : (
                  // Bar chart
                  <div
                    key={index}
                    className="flex-1 flex items-end justify-center px-1"
                    style={{ height: '100%' }}
                  >
                    <div
                      className="w-full bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t"
                      style={{ height: `${height}%` }}
                    ></div>
                  </div>
                );
              })}
            </div>
            
            {/* X-axis Labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
              {timePeriods.map((period, index) => (
                <span key={index} className="text-xs text-gray-400">{period}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Summary */}
        <div className="mt-6 grid grid-cols-4 gap-4">
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="text-sm text-gray-400">Current Value</div>
            <div className="text-xl font-bold text-white">{selectedData[selectedData.length - 1]}</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="text-sm text-gray-400">Trend</div>
            <div className="text-xl font-bold text-green-400">+{((selectedData[selectedData.length - 1] - selectedData[0]) / selectedData[0] * 100).toFixed(1)}%</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="text-sm text-gray-400">Volatility</div>
            <div className="text-xl font-bold text-amber-400">{Math.round((maxValue - minValue) / minValue * 100)}%</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="text-sm text-gray-400">Correlation</div>
            <div className="text-xl font-bold text-blue-400">0.85</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeSeriesChart;