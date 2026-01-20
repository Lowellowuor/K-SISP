import React from 'react';
import { Server, Database, Network, Cpu, HardDrive, Router, Shield, Activity } from 'lucide-react';

const InfrastructureStatus = ({ activeZone = 'all', darkMode = true }) => {
  const infrastructureItems = [
    { 
      id: 1, 
      name: 'Main Servers', 
      status: 'optimal', 
      utilization: 78, 
      icon: Server,
      uptime: '99.98%',
      alerts: 0
    },
    { 
      id: 2, 
      name: 'Database Cluster', 
      status: 'good', 
      utilization: 65, 
      icon: Database,
      uptime: '99.95%',
      alerts: 1
    },
    { 
      id: 3, 
      name: 'Network Switches', 
      status: 'optimal', 
      utilization: 42, 
      icon: Network,
      uptime: '99.99%',
      alerts: 0
    },
    { 
      id: 4, 
      name: 'Processing Units', 
      status: 'warning', 
      utilization: 92, 
      icon: Cpu,
      uptime: '99.85%',
      alerts: 3
    },
    { 
      id: 5, 
      name: 'Storage Arrays', 
      status: 'optimal', 
      utilization: 58, 
      icon: HardDrive,
      uptime: '99.97%',
      alerts: 0
    },
    { 
      id: 6, 
      name: 'Edge Routers', 
      status: 'critical', 
      utilization: 95, 
      icon: Router,
      uptime: '99.70%',
      alerts: 5
    }
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

  const getStatusText = (status) => {
    switch (status) {
      case 'optimal': return 'text-green-400';
      case 'good': return 'text-emerald-400';
      case 'warning': return 'text-amber-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const calculateOverallHealth = () => {
    const weights = { optimal: 1, good: 0.8, warning: 0.5, critical: 0.2 };
    const total = infrastructureItems.reduce((acc, item) => acc + weights[item.status], 0);
    return Math.round((total / infrastructureItems.length) * 100);
  };

  const overallHealth = calculateOverallHealth();

  return (
    <div className="h-full p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-xl ${darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'}`}>
            <Activity className={`h-5 w-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Infrastructure Status</h3>
            <p className="text-sm text-emerald-300/70">System components health overview</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{overallHealth}%</div>
            <div className="text-xs text-emerald-400">Overall Health</div>
          </div>
          <Shield className={`h-6 w-6 ${getStatusText(
            overallHealth >= 90 ? 'optimal' : 
            overallHealth >= 70 ? 'good' : 
            overallHealth >= 50 ? 'warning' : 'critical'
          )}`} />
        </div>
      </div>

      <div className="space-y-4">
        {infrastructureItems.map((item) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.id}
              className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                darkMode ? 'bg-emerald-900/20 hover:bg-emerald-800/30' : 'bg-emerald-50 hover:bg-emerald-100'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'}`}>
                  <Icon className={`h-5 w-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                </div>
                <div>
                  <div className="font-medium text-white">{item.name}</div>
                  <div className="flex items-center space-x-3 mt-1">
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(item.status)}`} />
                      <span className={`text-xs ${getStatusText(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-xs text-emerald-400/70">
                      Uptime: {item.uptime}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="text-xl font-bold text-white">{item.utilization}%</div>
                  <div className="text-xs text-emerald-400/70">Utilization</div>
                </div>
                
                <div className="w-32">
                  <div className={`h-2 rounded-full ${darkMode ? 'bg-emerald-900/30' : 'bg-emerald-200'}`}>
                    <div 
                      className={`h-full rounded-full ${getStatusColor(item.status)}`}
                      style={{ width: `${item.utilization}%` }}
                    />
                  </div>
                  {item.alerts > 0 && (
                    <div className="mt-1 flex justify-end">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">
                        {item.alerts} alert{item.alerts > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`mt-6 p-4 rounded-xl ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-white">Infrastructure Summary</div>
            <div className="text-xs text-emerald-400/70">
              {infrastructureItems.filter(i => i.status === 'optimal' || i.status === 'good').length} of {infrastructureItems.length} systems operational
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-lg font-bold text-white">24</div>
              <div className="text-xs text-emerald-400/70">Total Nodes</div>
            </div>
            <div className="h-8 w-px bg-emerald-500/20" />
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">18</div>
              <div className="text-xs text-emerald-400/70">Healthy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfrastructureStatus;