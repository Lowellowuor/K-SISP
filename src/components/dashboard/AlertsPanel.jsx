import React, { useState } from 'react';
import { AlertTriangle, Bell, CheckCircle, Clock, Filter, X } from 'lucide-react';

const AlertsPanel = ({ darkMode = true }) => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'East Zone Temperature Alert',
      description: 'Temperature exceeded 35°C threshold',
      time: '5 minutes ago',
      zone: 'east',
      resolved: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'High Memory Usage',
      description: 'Memory usage above 85% for 10 minutes',
      time: '15 minutes ago',
      zone: 'north',
      resolved: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Maintenance Scheduled',
      description: 'System maintenance scheduled for tonight',
      time: '2 hours ago',
      zone: 'all',
      resolved: true
    },
    {
      id: 4,
      type: 'critical',
      title: 'Network Latency Spike',
      description: 'Network latency increased by 300%',
      time: '30 minutes ago',
      zone: 'west',
      resolved: false
    },
    {
      id: 5,
      type: 'warning',
      title: 'Database Connection Pool',
      description: 'Connection pool at 90% capacity',
      time: '1 hour ago',
      zone: 'south',
      resolved: false
    }
  ]);

  const [filter, setFilter] = useState('all');

  const getAlertColor = (type, resolved) => {
    if (resolved) return 'text-emerald-400 bg-emerald-500/20';
    switch (type) {
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'warning': return 'text-amber-400 bg-amber-500/20';
      case 'info': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getAlertIcon = (type, resolved) => {
    if (resolved) return CheckCircle;
    switch (type) {
      case 'critical': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'info': return Bell;
      default: return Bell;
    }
  };

  const resolveAlert = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, resolved: true } : alert
    ));
  };

  const dismissAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'active') return !alert.resolved;
    if (filter === 'resolved') return alert.resolved;
    return alert.type === filter;
  });

  const activeAlerts = alerts.filter(a => !a.resolved).length;
  const criticalAlerts = alerts.filter(a => !a.resolved && a.type === 'critical').length;

  return (
    <div className="h-full p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-xl ${darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'}`}>
            <Bell className={`h-5 w-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Alerts Panel</h3>
            <p className="text-sm text-emerald-300/70">
              {activeAlerts} active alert{activeAlerts !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        
        {criticalAlerts > 0 && (
          <div className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm">
            {criticalAlerts} critical
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6">
        {[
          { id: 'all', label: 'All' },
          { id: 'active', label: 'Active' },
          { id: 'critical', label: 'Critical' },
          { id: 'warning', label: 'Warning' },
          { id: 'resolved', label: 'Resolved' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              filter === tab.id
                ? darkMode 
                  ? 'bg-emerald-600/30 text-white' 
                  : 'bg-emerald-100 text-emerald-800'
                : darkMode 
                  ? 'text-emerald-300 hover:text-white hover:bg-emerald-800/30' 
                  : 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-3 mb-6" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {filteredAlerts.map((alert) => {
          const Icon = getAlertIcon(alert.type, alert.resolved);
          return (
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
                  <Icon className={`h-5 w-5 mt-0.5 ${
                    alert.resolved
                      ? 'text-emerald-400'
                      : alert.type === 'critical'
                      ? 'text-red-400'
                      : alert.type === 'warning'
                      ? 'text-amber-400'
                      : 'text-blue-400'
                  }`} />
                  <div className="flex-1">
                    <div className="font-medium text-white mb-1">{alert.title}</div>
                    <div className="text-sm text-emerald-400/70 mb-2">{alert.description}</div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-emerald-500" />
                        <span className="text-xs text-emerald-400">{alert.time}</span>
                      </div>
                      <div className={`text-xs px-2 py-0.5 rounded-full ${getAlertColor(alert.type, alert.resolved)}`}>
                        {alert.zone.charAt(0).toUpperCase() + alert.zone.slice(1)} Zone
                      </div>
                      <div className={`text-xs px-2 py-0.5 rounded-full ${
                        alert.resolved
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : alert.type === 'critical'
                          ? 'bg-red-500/20 text-red-400'
                          : alert.type === 'warning'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  {!alert.resolved && (
                    <button
                      onClick={() => resolveAlert(alert.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        darkMode 
                          ? 'hover:bg-emerald-800/30 text-emerald-400 hover:text-white' 
                          : 'hover:bg-emerald-100 text-emerald-500 hover:text-emerald-700'
                      }`}
                      title="Resolve"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      darkMode 
                        ? 'hover:bg-emerald-800/30 text-emerald-400 hover:text-white' 
                        : 'hover:bg-emerald-100 text-emerald-500 hover:text-emerald-700'
                    }`}
                    title="Dismiss"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {alert.resolved && (
                <div className="mt-3 flex items-center text-xs text-emerald-400">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Resolved
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Alert Stats */}
      <div className={`rounded-xl p-4 ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-red-400">{criticalAlerts}</div>
            <div className="text-xs text-emerald-400/70">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-amber-400">
              {alerts.filter(a => !a.resolved && a.type === 'warning').length}
            </div>
            <div className="text-xs text-emerald-400/70">Warnings</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-400">{activeAlerts}</div>
            <div className="text-xs text-emerald-400/70">Active</div>
          </div>
        </div>
        
        <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-emerald-500/20' : 'border-emerald-200'}`}>
          <div className="flex items-center justify-between text-sm">
            <div className="text-emerald-400/70">Alert Response Time</div>
            <div className="text-white font-medium">8.2 min</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`mt-4 p-3 rounded-xl ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
        <div className="flex items-center justify-between">
          <button className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
            darkMode 
              ? 'bg-emerald-800/30 text-emerald-300 hover:bg-emerald-700/40 hover:text-white' 
              : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
          }`}>
            Acknowledge All
          </button>
          <button className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
            darkMode 
              ? 'bg-emerald-800/30 text-emerald-300 hover:bg-emerald-700/40 hover:text-white' 
              : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
          }`}>
            Alert Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertsPanel;