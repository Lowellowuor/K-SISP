import React, { useState, useEffect } from 'react';
import { Eye, AlertTriangle, Clock, TrendingUp, TrendingDown, Activity, Zap, Thermometer } from 'lucide-react';

const MonitoringPanel = ({ timeRange = '7d', darkMode = true }) => {
  const [metrics, setMetrics] = useState([
    { id: 1, name: 'CPU Usage', value: 68, change: +12, trend: 'up', icon: Activity, unit: '%' },
    { id: 2, name: 'Memory', value: 84, change: -8, trend: 'down', icon: Zap, unit: '%' },
    { id: 3, name: 'Network I/O', value: 1.2, change: +24, trend: 'up', icon: TrendingUp, unit: 'Gbps' },
    { id: 4, name: 'Temperature', value: 42, change: +3, trend: 'up', icon: Thermometer, unit: '°C' },
  ]);

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: 'High memory usage detected', time: '15 min ago', resolved: false },
    { id: 2, type: 'critical', message: 'Temperature threshold exceeded', time: '5 min ago', resolved: false },
    { id: 3, type: 'info', message: 'Scheduled maintenance', time: '2 hours ago', resolved: true },
  ]);

  const [activeTab, setActiveTab] = useState('metrics');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.min(100, Math.max(0, metric.value + (Math.random() - 0.5) * 2))
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const resolveAlert = (id) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, resolved: true } : alert
    ));
  };

  return (
    <div className="h-full p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-xl ${darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'}`}>
            <Eye className={`h-5 w-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Live Monitoring</h3>
            <p className="text-sm text-emerald-300/70">Real-time system metrics</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-emerald-900/30 text-emerald-300' : 'bg-emerald-100 text-emerald-600'}`}>
            <Clock className="inline h-3 w-3 mr-1" />
            Live
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6">
        {['metrics', 'alerts', 'logs'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === tab
                ? darkMode 
                  ? 'bg-emerald-600/30 text-white' 
                  : 'bg-emerald-100 text-emerald-800'
                : darkMode 
                  ? 'text-emerald-300 hover:text-white hover:bg-emerald-800/30' 
                  : 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'metrics' && (
        <div className="space-y-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
            return (
              <div 
                key={metric.id}
                className={`p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                  darkMode ? 'bg-emerald-900/20 hover:bg-emerald-800/30' : 'bg-emerald-50 hover:bg-emerald-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'}`}>
                      <Icon className={`h-4 w-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    </div>
                    <div>
                      <div className="font-medium text-white">{metric.name}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <TrendIcon className={`h-3 w-3 ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`} />
                        <span className={`text-xs ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                          {metric.change > 0 ? '+' : ''}{metric.change}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {metric.value.toFixed(metric.unit === '%' ? 0 : 1)}{metric.unit}
                    </div>
                    <div className="text-xs text-emerald-400/70">Current</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-emerald-400/70 mb-1">
                    <span>0{metric.unit}</span>
                    <span>100{metric.unit}</span>
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${darkMode ? 'bg-emerald-900/30' : 'bg-emerald-200'}`}>
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        metric.value > 80 ? 'bg-red-500' :
                        metric.value > 60 ? 'bg-amber-500' :
                        'bg-emerald-500'
                      }`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                alert.resolved
                  ? darkMode 
                    ? 'border-emerald-500/30 bg-emerald-900/10' 
                    : 'border-emerald-200 bg-emerald-50/50'
                  : alert.type === 'critical'
                  ? 'border-red-500/30 bg-red-500/10'
                  : alert.type === 'warning'
                  ? 'border-amber-500/30 bg-amber-500/10'
                  : darkMode 
                    ? 'border-blue-500/30 bg-blue-500/10' 
                    : 'border-blue-200 bg-blue-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                    alert.resolved
                      ? 'text-emerald-400'
                      : alert.type === 'critical'
                      ? 'text-red-400'
                      : alert.type === 'warning'
                      ? 'text-amber-400'
                      : 'text-blue-400'
                  }`} />
                  <div>
                    <div className="font-medium text-white">{alert.message}</div>
                    <div className="text-xs text-emerald-400/70 mt-1">{alert.time}</div>
                  </div>
                </div>
                
                {!alert.resolved && (
                  <button
                    onClick={() => resolveAlert(alert.id)}
                    className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                      darkMode 
                        ? 'bg-emerald-800/30 text-emerald-300 hover:bg-emerald-700/40 hover:text-white' 
                        : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                    }`}
                  >
                    Resolve
                  </button>
                )}
              </div>
              
              {alert.resolved && (
                <div className="mt-2 flex items-center text-xs text-emerald-400">
                  <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Resolved
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="space-y-2">
          {[
            'System check completed - All services running',
            'Backup initiated - Estimated completion: 15 min',
            'User login detected - Admin session started',
            'Performance scan completed - No issues found',
            'Data sync in progress - 85% complete'
          ].map((log, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'} border-l-2 border-emerald-500`}
            >
              <div className="text-sm text-white">{log}</div>
              <div className="text-xs text-emerald-400/70 mt-1">Just now</div>
            </div>
          ))}
        </div>
      )}

      <div className={`mt-6 p-3 rounded-xl ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white">Monitoring Active</span>
          </div>
          <div className="text-emerald-400/70">
            Updates every 5 seconds
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringPanel;