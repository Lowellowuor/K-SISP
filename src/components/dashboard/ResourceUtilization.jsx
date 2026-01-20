import React, { useState } from 'react';
import { Cpu, Database, HardDrive, Network, Activity, PieChart, Target } from 'lucide-react';

const ResourceUtilization = ({ activeZone = 'all', darkMode = true }) => {
  const [selectedResource, setSelectedResource] = useState('cpu');

  const resources = {
    cpu: {
      icon: Cpu,
      name: 'CPU',
      usage: 68,
      capacity: 100,
      unit: '%',
      trend: 'up',
      breakdown: [
        { name: 'System', value: 25, color: '#10b981' },
        { name: 'User', value: 35, color: '#3b82f6' },
        { name: 'I/O Wait', value: 8, color: '#f59e0b' }
      ]
    },
    memory: {
      icon: Database,
      name: 'Memory',
      usage: 84,
      capacity: 128,
      unit: 'GB',
      trend: 'stable',
      breakdown: [
        { name: 'Used', value: 108, color: '#10b981' },
        { name: 'Cache', value: 12, color: '#3b82f6' },
        { name: 'Free', value: 8, color: '#f59e0b' }
      ]
    },
    storage: {
      icon: HardDrive,
      name: 'Storage',
      usage: 42,
      capacity: 2000,
      unit: 'GB',
      trend: 'up',
      breakdown: [
        { name: 'Database', value: 650, color: '#10b981' },
        { name: 'Logs', value: 150, color: '#3b82f6' },
        { name: 'Backup', value: 40, color: '#f59e0b' }
      ]
    },
    network: {
      icon: Network,
      name: 'Network',
      usage: 1.2,
      capacity: 10,
      unit: 'Gbps',
      trend: 'up',
      breakdown: [
        { name: 'Inbound', value: 0.8, color: '#10b981' },
        { name: 'Outbound', value: 0.4, color: '#3b82f6' }
      ]
    }
  };

  const currentResource = resources[selectedResource];
  const Icon = currentResource.icon;
  const percentage = (currentResource.usage / currentResource.capacity) * 100;

  return (
    <div className="h-full p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-xl ${darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'}`}>
            <Activity className={`h-5 w-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Resource Utilization</h3>
            <p className="text-sm text-emerald-300/70">System resource allocation</p>
          </div>
        </div>
        <Target className={`h-5 w-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
      </div>

      {/* Resource Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {Object.entries(resources).map(([key, resource]) => {
          const ResourceIcon = resource.icon;
          return (
            <button
              key={key}
              onClick={() => setSelectedResource(key)}
              className={`p-3 rounded-xl transition-all duration-200 flex flex-col items-center ${
                selectedResource === key
                  ? darkMode 
                    ? 'bg-emerald-600/30 border-emerald-500/50' 
                    : 'bg-emerald-100 border-emerald-300'
                  : darkMode 
                    ? 'bg-emerald-900/20 hover:bg-emerald-800/30' 
                    : 'bg-emerald-50 hover:bg-emerald-100'
              } border`}
            >
              <ResourceIcon className={`h-5 w-5 mb-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <div className="text-sm font-medium text-white">{resource.name}</div>
              <div className="text-xs text-emerald-400/70">
                {((resource.usage / resource.capacity) * 100).toFixed(0)}%
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Gauge */}
      <div className={`rounded-xl p-6 mb-6 text-center ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
        <div className="relative w-48 h-48 mx-auto mb-4">
          {/* Background circle */}
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={darkMode ? 'rgba(6, 95, 70, 0.3)' : 'rgba(16, 185, 129, 0.1)'}
              strokeWidth="8"
            />
            {/* Progress arc */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={percentage > 80 ? '#ef4444' : percentage > 60 ? '#f59e0b' : '#10b981'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${percentage * 2.827} 283`}
              transform="rotate(-90 50 50)"
            />
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-white">{currentResource.usage}{currentResource.unit}</div>
            <div className="text-sm text-emerald-400/70">of {currentResource.capacity}{currentResource.unit}</div>
            <div className="text-xs text-emerald-500 mt-1">{percentage.toFixed(1)}% utilized</div>
          </div>
        </div>
        
        <div className="text-lg font-semibold text-white mb-2">{currentResource.name} Utilization</div>
        <div className="text-sm text-emerald-400/70">
          Trend: <span className={
            currentResource.trend === 'up' ? 'text-green-400' :
            currentResource.trend === 'down' ? 'text-red-400' :
            'text-blue-400'
          }>{currentResource.trend}</span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-medium text-white">Breakdown</div>
          <PieChart className="h-4 w-4 text-emerald-400" />
        </div>
        
        <div className="space-y-3">
          {currentResource.breakdown.map((item, index) => {
            const itemPercentage = (item.value / currentResource.capacity) * 100;
            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-emerald-300">{item.name}</span>
                  </div>
                  <div className="text-white">
                    {item.value}{currentResource.unit} ({itemPercentage.toFixed(1)}%)
                  </div>
                </div>
                <div className={`h-2 rounded-full overflow-hidden ${darkMode ? 'bg-emerald-900/30' : 'bg-emerald-200'}`}>
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${itemPercentage}%`,
                      backgroundColor: item.color 
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      {percentage > 80 && (
        <div className={`p-3 rounded-xl ${darkMode ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200'} border`}>
          <div className="text-sm font-medium text-amber-400 mb-1">High Utilization Alert</div>
          <div className="text-xs text-amber-400/70">
            Consider scaling {currentResource.name.toLowerCase()} resources
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceUtilization;