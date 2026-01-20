import React, { useState } from 'react';
import { Link, Database, Cloud, Server, Wifi, CheckCircle, XCircle, RefreshCw, AlertTriangle } from 'lucide-react';

const IntegrationStatus = ({ darkMode = true }) => {
  const [integrations, setIntegrations] = useState([
    {
      id: 1,
      name: 'Main Database',
      type: 'database',
      status: 'connected',
      latency: '12ms',
      uptime: '99.98%',
      lastSync: 'Just now',
      icon: Database
    },
    {
      id: 2,
      name: 'Cloud Storage',
      type: 'storage',
      status: 'connected',
      latency: '45ms',
      uptime: '99.95%',
      lastSync: '2 min ago',
      icon: Cloud
    },
    {
      id: 3,
      name: 'IoT Network',
      type: 'network',
      status: 'warning',
      latency: '182ms',
      uptime: '99.85%',
      lastSync: '5 min ago',
      icon: Wifi
    },
    {
      id: 4,
      name: 'External API',
      type: 'api',
      status: 'connected',
      latency: '68ms',
      uptime: '99.92%',
      lastSync: '1 min ago',
      icon: Link
    },
    {
      id: 5,
      name: 'Backup Server',
      type: 'server',
      status: 'disconnected',
      latency: 'N/A',
      uptime: '99.70%',
      lastSync: '15 min ago',
      icon: Server
    },
    {
      id: 6,
      name: 'Monitoring Service',
      type: 'service',
      status: 'connected',
      latency: '28ms',
      uptime: '99.99%',
      lastSync: 'Just now',
      icon: RefreshCw
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-green-400';
      case 'warning': return 'text-amber-400';
      case 'disconnected': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'connected': return 'bg-green-500/20';
      case 'warning': return 'bg-amber-500/20';
      case 'disconnected': return 'bg-red-500/20';
      default: return 'bg-gray-500/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'disconnected': return XCircle;
      default: return AlertTriangle;
    }
  };

  const reconnectIntegration = (id) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id 
        ? { ...integration, status: 'connected', latency: '15ms', lastSync: 'Just now' }
        : integration
    ));
  };

  const calculateOverallStatus = () => {
    const connected = integrations.filter(i => i.status === 'connected').length;
    return Math.round((connected / integrations.length) * 100);
  };

  const overallStatus = calculateOverallStatus();

  return (
    <div className="h-full p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-xl ${darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'}`}>
            <Link className={`h-5 w-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Integration Status</h3>
            <p className="text-sm text-emerald-300/70">Connected services and systems</p>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          overallStatus >= 90 ? 'bg-green-500/20 text-green-400' :
          overallStatus >= 70 ? 'bg-amber-500/20 text-amber-400' :
          'bg-red-500/20 text-red-400'
        }`}>
          {overallStatus}% Connected
        </div>
      </div>

      {/* Integration List */}
      <div className="space-y-3 mb-6">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          const StatusIcon = getStatusIcon(integration.status);
          return (
            <div 
              key={integration.id}
              className={`p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                darkMode ? 'bg-emerald-900/20 hover:bg-emerald-800/30' : 'bg-emerald-50 hover:bg-emerald-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'}`}>
                    <Icon className={`h-4 w-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  </div>
                  <div>
                    <div className="font-medium text-white">{integration.name}</div>
                    <div className="text-xs text-emerald-400/70 capitalize">{integration.type}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <StatusIcon className={`h-4 w-4 ${getStatusColor(integration.status)}`} />
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusBgColor(integration.status)} ${getStatusColor(integration.status)}`}>
                    {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className={`text-sm font-bold ${
                    integration.latency === 'N/A' ? 'text-gray-400' :
                    parseInt(integration.latency) < 50 ? 'text-green-400' :
                    parseInt(integration.latency) < 100 ? 'text-amber-400' :
                    'text-red-400'
                  }`}>
                    {integration.latency}
                  </div>
                  <div className="text-xs text-emerald-400/70">Latency</div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm font-bold text-white">{integration.uptime}</div>
                  <div className="text-xs text-emerald-400/70">Uptime</div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm font-bold text-emerald-400">{integration.lastSync}</div>
                  <div className="text-xs text-emerald-400/70">Last Sync</div>
                </div>
              </div>

              {integration.status === 'disconnected' && (
                <div className="mt-3">
                  <button
                    onClick={() => reconnectIntegration(integration.id)}
                    className={`w-full py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      darkMode 
                        ? 'bg-emerald-800/30 text-emerald-300 hover:bg-emerald-700/40 hover:text-white' 
                        : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                    }`}
                  >
                    Reconnect
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Connection Summary */}
      <div className={`rounded-xl p-4 ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
        <div className="text-sm font-medium text-white mb-3">Connection Health</div>
        
        <div className={`h-2 rounded-full overflow-hidden mb-2 ${darkMode ? 'bg-emerald-900/30' : 'bg-emerald-200'}`}>
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              overallStatus >= 90 ? 'bg-green-500' :
              overallStatus >= 70 ? 'bg-amber-500' :
              'bg-red-500'
            }`}
            style={{ width: `${overallStatus}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-emerald-400/70 mb-4">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">
              {integrations.filter(i => i.status === 'connected').length}
            </div>
            <div className="text-xs text-emerald-400/70">Connected</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-amber-400">
              {integrations.filter(i => i.status === 'warning').length}
            </div>
            <div className="text-xs text-emerald-400/70">Warning</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-red-400">
              {integrations.filter(i => i.status === 'disconnected').length}
            </div>
            <div className="text-xs text-emerald-400/70">Disconnected</div>
          </div>
        </div>
      </div>

      {/* Auto-refresh Status */}
      <div className={`mt-4 p-3 rounded-xl ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4 text-emerald-400" />
            <span className="text-white">Auto-refresh: Every 30 seconds</span>
          </div>
          <div className="text-xs text-emerald-400/70">
            Last check: Just now
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationStatus;