import React, { useState } from 'react';
import { 
  Clock, TrendingUp, AlertCircle, CheckCircle, XCircle, 
  ChevronUp, ChevronDown, BarChart3, Filter, Activity,
  MapPin, Users, Zap, RefreshCw, Download, Calendar
} from 'lucide-react';

function MapBottomPanel() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedAlert, setSelectedAlert] = useState(null);

  const alerts = [
    { 
      id: 1, 
      type: 'warning', 
      message: 'Low water pressure detected at Zone B', 
      time: '2h ago', 
      location: 'Area A',
      priority: 'medium',
      status: 'pending'
    },
    { 
      id: 2, 
      type: 'success', 
      message: 'Toilet maintenance completed successfully', 
      time: '1d ago', 
      location: 'School Block',
      priority: 'low',
      status: 'resolved'
    },
    { 
      id: 3, 
      type: 'error', 
      message: 'Major drainage blockage detected', 
      time: '5h ago', 
      location: 'Market Area',
      priority: 'high',
      status: 'investigating'
    },
    { 
      id: 4, 
      type: 'info', 
      message: 'New citizen sanitation report received', 
      time: '3h ago', 
      location: 'Residential Zone',
      priority: 'low',
      status: 'new'
    },
  ];

  const timeRanges = [
    { id: '24h', label: '24 Hours', icon: Clock },
    { id: '7d', label: '7 Days', icon: Calendar },
    { id: '30d', label: '30 Days', icon: TrendingUp },
    { id: 'all', label: 'All Time', icon: BarChart3 },
  ];

  const metrics = [
    { label: 'Total Reports', value: '156', change: '+12', color: 'text-emerald-400', icon: AlertCircle },
    { label: 'Resolved', value: '89%', change: '+3%', color: 'text-green-400', icon: CheckCircle },
    { label: 'Avg Response', value: '4.2h', change: '-0.8h', color: 'text-amber-400', icon: Clock },
    { label: 'Active Alerts', value: '23', change: '-5', color: 'text-rose-400', icon: Activity },
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'error': return <XCircle className="h-4 w-4 text-rose-500" />;
      default: return <AlertCircle className="h-4 w-4 text-cyan-500" />;
    }
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      high: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
      medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    };
    return (
      <span className={`text-xs px-2 py-0.5 rounded-full border ${styles[priority] || styles.low}`}>
        {priority}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const styles = {
      new: 'bg-cyan-500/20 text-cyan-400',
      pending: 'bg-amber-500/20 text-amber-400',
      investigating: 'bg-blue-500/20 text-blue-400',
      resolved: 'bg-emerald-500/20 text-emerald-400'
    };
    return (
      <span className={`text-xs px-2 py-0.5 rounded ${styles[status] || styles.new}`}>
        {status}
      </span>
    );
  };

  return (
    <div className={`glass-effect-green rounded-2xl mt-4 transition-all duration-300 overflow-hidden border border-emerald-500/20 ${
      isExpanded ? 'h-72' : 'h-16'
    }`}>
      {/* Header - Always Visible */}
      <div className={`p-4 transition-all duration-300 ${isExpanded ? 'border-b border-emerald-500/20' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">Real-Time Monitoring</h3>
                <p className="text-xs text-emerald-300/70">Live system alerts & temporal analysis</p>
              </div>
            </div>
            
            {/* Time Range Selector */}
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

          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-300 rounded-lg hover:bg-emerald-500/20 hover:text-white transition-colors border border-emerald-500/20">
              <Filter className="h-3.5 w-3.5" />
              <span className="text-sm">Filter</span>
            </button>
            
            <button className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-300 rounded-lg hover:bg-emerald-500/20 hover:text-white transition-colors border border-emerald-500/20">
              <Download className="h-3.5 w-3.5" />
              <span className="text-sm">Export</span>
            </button>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-lg transition-colors"
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content - Only shown when expanded */}
      {isExpanded && (
        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Alerts Panel */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white">Recent System Alerts</h4>
                <div className="flex items-center space-x-1">
                  <button className="text-xs text-emerald-300 hover:text-white p-1">
                    <RefreshCw className="h-3 w-3" />
                  </button>
                  <span className="text-xs text-emerald-300/60">Live</span>
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse-green"></div>
                </div>
              </div>
              
              <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {alerts.map((alert) => (
                  <button
                    key={alert.id}
                    onClick={() => setSelectedAlert(alert.id)}
                    className={`w-full text-left flex items-center justify-between p-3 rounded-xl transition-all ${
                      selectedAlert === alert.id
                        ? 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30'
                        : 'bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/10'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="pt-0.5">
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-200">{alert.message}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1 text-xs text-emerald-300/80">
                            <MapPin className="h-3 w-3" />
                            <span>{alert.location}</span>
                          </div>
                          {getPriorityBadge(alert.priority)}
                          {getStatusBadge(alert.status)}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-emerald-300/60 whitespace-nowrap">{alert.time}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Middle: Time Series Chart */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {metrics.map((metric) => (
                  <div key={metric.label} className="bg-emerald-500/5 rounded-xl p-3 border border-emerald-500/10 hover:bg-emerald-500/10 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <metric.icon className={`h-4 w-4 ${metric.color}`} />
                        <span className="text-sm text-emerald-300/80">{metric.label}</span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        metric.change.startsWith('+') 
                          ? 'bg-emerald-500/20 text-emerald-400' 
                          : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-white">{metric.value}</div>
                  </div>
                ))}
              </div>
              
              {/* Time Series Visualization */}
              <div className="bg-emerald-500/5 rounded-xl p-4 border border-emerald-500/10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-white">Report Frequency Trend</h4>
                    <p className="text-xs text-emerald-300/60">Last {timeRange}</p>
                  </div>
                  <button className="flex items-center space-x-1 text-sm text-emerald-300 hover:text-white">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>View Details</span>
                  </button>
                </div>
                
                <div className="h-32">
                  <div className="flex items-end h-full space-x-1.5">
                    {[30, 45, 60, 75, 80, 65, 50, 70, 85, 90, 75, 60, 85, 95].map((height, index) => (
                      <div
                        key={index}
                        className="relative flex-1 group"
                      >
                        <div
                          className="bg-gradient-to-t from-emerald-500 to-green-500 rounded-t-lg transition-all duration-300 hover:opacity-90"
                          style={{ height: `${height}%` }}
                        >
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <div className="bg-emerald-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              {height} reports
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-emerald-300/60 mt-2 px-1">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                      <span key={index}>{day}</span>
                    ))}
                  </div>
                </div>
                
                {/* Trend Indicators */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-emerald-500/20">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                      <span className="text-xs text-emerald-300">Sanitation Reports</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-cyan-500 rounded"></div>
                      <span className="text-xs text-cyan-300">Water Issues</span>
                    </div>
                  </div>
                  <div className="text-xs text-emerald-400 font-medium">
                    Overall trend: <span className="text-white">+24% this month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer - Quick Actions */}
      {isExpanded && (
        <div className="p-3 border-t border-emerald-500/20 bg-emerald-500/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-emerald-300/80">
              <Users className="h-4 w-4" />
              <span>23 active responders • 156 total reports • 89% resolution rate</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-xs text-emerald-300 hover:text-white px-2 py-1">
                View All Reports
              </button>
              <button className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all">
                <Zap className="h-3.5 w-3.5" />
                <span>Generate Report</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapBottomPanel;