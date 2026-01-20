import React from 'react';
import { Activity, Clock, Shield, Zap, RefreshCw, Database, Wifi, Cpu } from 'lucide-react';

const DashboardFooter = ({ darkMode = true }) => {
  const stats = [
    {
      icon: Clock,
      value: '24/7',
      label: 'Live Monitoring',
      description: 'Continuous system tracking',
      trend: 'stable'
    },
    {
      icon: Shield,
      value: '99.98%',
      label: 'System Uptime',
      description: 'Monthly average',
      trend: 'up'
    },
    {
      icon: Zap,
      value: '≤ 2s',
      label: 'Data Refresh',
      description: 'Real-time updates',
      trend: 'improved'
    },
    {
      icon: Activity,
      value: '0.1%',
      label: 'Error Rate',
      description: 'Low error frequency',
      trend: 'down'
    }
  ];

  const systemHealth = [
    { name: 'API Response', value: 98, status: 'optimal', icon: RefreshCw },
    { name: 'Database', value: 95, status: 'good', icon: Database },
    { name: 'Network', value: 99, status: 'optimal', icon: Wifi },
    { name: 'CPU Usage', value: 42, status: 'optimal', icon: Cpu }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal': return 'bg-green-500';
      case 'good': return 'bg-emerald-400';
      case 'warning': return 'bg-amber-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-400 bg-green-500/20';
      case 'down': return 'text-red-400 bg-red-500/20';
      case 'improved': return 'text-emerald-400 bg-emerald-500/20';
      case 'stable': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <footer className="mt-8 pt-6 border-t border-emerald-500/20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Stats */}
        <div className="col-span-1 lg:col-span-2">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">Performance Summary</h3>
            <p className="text-sm text-emerald-300/70">System metrics and health indicators</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className={`dashboard-card hover:bg-emerald-900/20 transition-all duration-300`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'}`}>
                      <Icon className={`h-4 w-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getTrendColor(stat.trend)}`}>
                      {stat.trend}
                    </span>
                  </div>
                  
                  <div className="mb-1">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm font-medium text-emerald-300">{stat.label}</div>
                  </div>
                  
                  <p className="text-xs text-emerald-400/70">{stat.description}</p>
                </div>
              );
            })}
          </div>

          {/* System Health Bars */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-white mb-3">System Health</h4>
            <div className="space-y-3">
              {systemHealth.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm text-emerald-300">{item.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 h-2 rounded-full bg-emerald-900/30 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${getStatusColor(item.status)}`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-white w-12 text-right">
                        {item.value}%
                      </span>
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(item.status)}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Status & Updates */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-900/20">
                <div>
                  <div className="text-sm font-medium text-white">Last Backup</div>
                  <div className="text-xs text-emerald-400">2 hours ago</div>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-900/20">
                <div>
                  <div className="text-sm font-medium text-white">Security Scan</div>
                  <div className="text-xs text-emerald-400">Completed 5 min ago</div>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-400" />
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-900/20">
                <div>
                  <div className="text-sm font-medium text-white">Next Maintenance</div>
                  <div className="text-xs text-emerald-400">Tomorrow 02:00 AM</div>
                </div>
                <div className="w-2 h-2 rounded-full bg-amber-400" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-medium text-white mb-3">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              <button className="p-2 text-sm text-emerald-300 hover:text-white hover:bg-emerald-800/30 rounded-lg transition-colors">
                Documentation
              </button>
              <button className="p-2 text-sm text-emerald-300 hover:text-white hover:bg-emerald-800/30 rounded-lg transition-colors">
                API Status
              </button>
              <button className="p-2 text-sm text-emerald-300 hover:text-white hover:bg-emerald-800/30 rounded-lg transition-colors">
                Support
              </button>
              <button className="p-2 text-sm text-emerald-300 hover:text-white hover:bg-emerald-800/30 rounded-lg transition-colors">
                Settings
              </button>
            </div>
          </div>

          {/* Footer Credits */}
          <div className="pt-4 border-t border-emerald-500/20">
            <div className="flex items-center justify-between text-xs text-emerald-400/70">
              <span>Smart City Dashboard v2.1.4</span>
              <span>© 2024 City Analytics</span>
            </div>
            <div className="mt-2 text-xs text-emerald-500/50">
              Data updates every 30 seconds • Last sync: Just now
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;