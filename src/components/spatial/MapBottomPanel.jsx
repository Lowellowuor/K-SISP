import React, { useState } from 'react';
import { Clock, TrendingUp, AlertCircle, CheckCircle, XCircle, ChevronUp, ChevronDown } from 'lucide-react';

function MapBottomPanel() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');

  const alerts = [
    { id: 1, type: 'warning', message: 'Low water pressure at Zone B', time: '2h ago', location: 'Area A' },
    { id: 2, type: 'success', message: 'Toilet maintenance completed', time: '1d ago', location: 'School Block' },
    { id: 3, type: 'error', message: 'Drainage blockage detected', time: '5h ago', location: 'Market Area' },
    { id: 4, type: 'info', message: 'New citizen report received', time: '3h ago', location: 'Residential Zone' },
  ];

  const timeRanges = [
    { id: '24h', label: '24 Hours' },
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: 'all', label: 'All Time' },
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <AlertCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className={`glass-effect rounded-xl mt-4 transition-all duration-300 ${
      isExpanded ? 'h-64' : 'h-20'
    }`}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-400" />
              <h3 className="font-semibold text-white">Temporal Analysis</h3>
            </div>
            
            <div className="flex items-center space-x-1 bg-white/5 rounded-lg p-1">
              {timeRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setTimeRange(range.id)}
                  className={`px-3 py-1 text-xs rounded ${
                    timeRange === range.id
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white">
              <TrendingUp className="h-4 w-4" />
              <span>View Trends</span>
            </button>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-gray-400 hover:text-white"
            >
              {isExpanded ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronUp className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alerts Panel */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-300">Recent Alerts</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10">
                  <div className="flex items-center space-x-3">
                    {getAlertIcon(alert.type)}
                    <div>
                      <p className="text-sm text-gray-300">{alert.message}</p>
                      <p className="text-xs text-gray-500">{alert.location}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Time Series Chart (Placeholder) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Report Frequency ({timeRange})</h4>
            <div className="h-32 bg-white/5 rounded-lg p-4">
              <div className="flex items-end h-full space-x-2">
                {[30, 45, 60, 75, 80, 65, 50, 70, 85, 90, 75, 60].map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-gradient-to-t from-primary-500 to-secondary-500 rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-white">156</div>
                <div className="text-xs text-gray-400">Total Reports</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-green-400">89%</div>
                <div className="text-xs text-gray-400">Resolved</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-amber-400">4.2h</div>
                <div className="text-xs text-gray-400">Avg Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapBottomPanel;
