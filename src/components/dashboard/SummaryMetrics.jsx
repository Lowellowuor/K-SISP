import React from 'react';

const SummaryMetrics = ({ timeRange, activeZone, darkMode }) => {
  const metrics = [
    {
      id: 1,
      title: 'System Health',
      value: '98.5%',
      change: '+2.3%',
      trend: 'up',
      icon: '🟢',
      description: 'Overall system performance'
    },
    {
      id: 2,
      title: 'Active Users',
      value: '2,847',
      change: '+14%',
      trend: 'up',
      icon: '👥',
      description: 'Currently connected users'
    },
    {
      id: 3,
      title: 'Avg Response',
      value: '142ms',
      change: '-23ms',
      trend: 'down',
      icon: '⚡',
      description: 'System response time'
    },
    {
      id: 4,
      title: 'Energy Usage',
      value: '84.2 kWh',
      change: '-8%',
      trend: 'down',
      icon: '🔋',
      description: 'Current consumption'
    },
    {
      id: 5,
      title: 'Data Throughput',
      value: '1.2 Gbps',
      change: '+5.4%',
      trend: 'up',
      icon: '🌐',
      description: 'Network throughput'
    },
    {
      id: 6,
      title: 'Uptime',
      value: '99.98%',
      change: '+0.02%',
      trend: 'up',
      icon: '🛡️',
      description: 'System availability'
    },
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className={`group cursor-pointer rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
              darkMode
                ? 'bg-emerald-900/20 border border-emerald-500/20 hover:border-emerald-400/40'
                : 'bg-white border border-emerald-100 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-2xl mb-1">{metric.icon}</div>
                <p className={`text-sm font-medium ${
                  darkMode ? 'text-emerald-300/70' : 'text-emerald-600/70'
                }`}>
                  {metric.title}
                </p>
              </div>
              <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                metric.trend === 'up'
                  ? darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                  : darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'
              }`}>
                {metric.change}
              </div>
            </div>
            
            <div className="flex items-end justify-between">
              <div>
                <h3 className={`text-2xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {metric.value}
                </h3>
                <p className={`text-xs mt-1 ${
                  darkMode ? 'text-emerald-400/60' : 'text-emerald-600/60'
                }`}>
                  {metric.description}
                </p>
              </div>
              
              <div className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                darkMode ? 'text-emerald-400' : 'text-emerald-600'
              }`}>
                <div className="h-4 w-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Time Range Stats */}
      <div className={`mt-6 p-4 rounded-xl ${
        darkMode ? 'bg-emerald-900/10' : 'bg-emerald-50'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <span className={`text-sm ${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>
              Showing data for: <span className="font-semibold">
                {timeRange === '1h' ? 'Last Hour' : 
                 timeRange === '24h' ? 'Last 24 Hours' :
                 timeRange === '7d' ? 'Last 7 Days' :
                 timeRange === '30d' ? 'Last 30 Days' : 'Last Quarter'}
              </span>
            </span>
          </div>
          <div className={`text-sm ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
            Zone: <span className="font-semibold">{activeZone === 'all' ? 'All Zones' : `${activeZone.charAt(0).toUpperCase() + activeZone.slice(1)} Zone`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryMetrics;