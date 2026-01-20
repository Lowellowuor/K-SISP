import React from 'react';
import { MapPin, Users, Droplet, AlertTriangle, TrendingUp, Home } from 'lucide-react';

const SpatialMetrics = ({ timeRange, activeZone, darkMode }) => {
  const metrics = [
    {
      id: 1,
      title: 'Facilities Mapped',
      value: '1,247',
      change: '+12',
      trend: 'up',
      icon: MapPin,
      color: 'text-emerald-400',
      description: 'Sanitation facilities'
    },
    {
      id: 2,
      title: 'Households Covered',
      value: '42.8K',
      change: '+2.4K',
      trend: 'up',
      icon: Home,
      color: 'text-green-400',
      description: 'Connected households'
    },
    {
      id: 3,
      title: 'Water Coverage',
      value: '78%',
      change: '+5.2%',
      trend: 'up',
      icon: Droplet,
      color: 'text-blue-400',
      description: 'Service coverage'
    },
    {
      id: 4,
      title: 'Active Reports',
      value: '156',
      change: '-8',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-amber-400',
      description: 'Open issues'
    },
    {
      id: 5,
      title: 'Population Served',
      value: '184.5K',
      change: '+12.3K',
      trend: 'up',
      icon: Users,
      color: 'text-purple-400',
      description: 'People served'
    },
    {
      id: 6,
      title: 'Efficiency',
      value: '92%',
      change: '+3.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-teal-400',
      description: 'System efficiency'
    },
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
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
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'} inline-block mb-2`}>
                    <Icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
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
          );
        })}
      </div>
      
      {/* Zone and Time Info */}
      <div className={`mt-6 p-4 rounded-xl ${
        darkMode ? 'bg-emerald-900/10' : 'bg-emerald-50'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <span className={`text-sm ${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>
              Showing data for: <span className="font-semibold">
                {activeZone === 'all' ? 'All Zones' : `${activeZone.charAt(0).toUpperCase() + activeZone.slice(1)} Zone`}
              </span>
            </span>
          </div>
          <div className={`text-sm ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
            Period: <span className="font-semibold">
              {timeRange === '1h' ? 'Last Hour' : 
               timeRange === '24h' ? 'Last 24 Hours' :
               timeRange === '7d' ? 'Last 7 Days' :
               timeRange === '30d' ? 'Last 30 Days' : 'Last Quarter'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpatialMetrics;