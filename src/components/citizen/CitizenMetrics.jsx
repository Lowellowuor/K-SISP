import React from 'react';
import { 
  Users, MessageSquare, Clock, CheckCircle, 
  TrendingUp, TrendingDown, AlertCircle, Heart,
  Star, Activity, Target, Award, Shield, 
  Zap, BarChart3, PieChart, LineChart
} from 'lucide-react';

const CitizenMetrics = ({ darkMode, timeRange, activeZone }) => {
  const metrics = [
    {
      id: 1,
      title: 'Active Citizens',
      value: '1,250',
      change: '+42',
      trend: 'up',
      icon: Users,
      color: 'text-emerald-400',
      description: 'Engaged community members',
      zoneComparison: {
        north: '320',
        south: '285',
        east: '315',
        west: '330'
      }
    },
    {
      id: 2,
      title: 'Reports Submitted',
      value: '5,430',
      change: '+128',
      trend: 'up',
      icon: MessageSquare,
      color: 'text-green-400',
      description: 'Total feedback received',
      zoneComparison: {
        north: '1,420',
        south: '1,380',
        east: '1,350',
        west: '1,280'
      }
    },
    {
      id: 3,
      title: 'Avg Response Time',
      value: '2.8h',
      change: '-0.5h',
      trend: 'down',
      icon: Clock,
      color: 'text-cyan-400',
      description: 'Time to initial response',
      zoneComparison: {
        north: '2.4h',
        south: '3.2h',
        east: '3.1h',
        west: '2.5h'
      }
    },
    {
      id: 4,
      title: 'Satisfaction Rate',
      value: '4.3/5',
      change: '+0.2',
      trend: 'up',
      icon: Star,
      color: 'text-amber-400',
      description: 'Average citizen rating',
      zoneComparison: {
        north: '4.5',
        south: '4.2',
        east: '4.1',
        west: '4.4'
      }
    },
    {
      id: 5,
      title: 'Resolution Rate',
      value: '92%',
      change: '+3%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-green-500',
      description: 'Issues successfully resolved',
      zoneComparison: {
        north: '94%',
        south: '90%',
        east: '91%',
        west: '93%'
      }
    },
    {
      id: 6,
      title: 'Engagement Score',
      value: '78%',
      change: '+5%',
      trend: 'up',
      icon: Activity,
      color: 'text-purple-400',
      description: 'Community participation',
      zoneComparison: {
        north: '82%',
        south: '75%',
        east: '76%',
        west: '79%'
      }
    },
  ];

  const engagementTrends = [
    { day: 'Mon', reports: 245, satisfaction: 4.2 },
    { day: 'Tue', reports: 312, satisfaction: 4.3 },
    { day: 'Wed', reports: 287, satisfaction: 4.4 },
    { day: 'Thu', reports: 354, satisfaction: 4.5 },
    { day: 'Fri', reports: 298, satisfaction: 4.3 },
    { day: 'Sat', reports: 215, satisfaction: 4.2 },
    { day: 'Sun', reports: 189, satisfaction: 4.1 },
  ];

  const getZoneComparison = (metric) => {
    if (activeZone === 'all') {
      const values = Object.values(metric.zoneComparison).map(v => parseFloat(v.replace('%', '')));
      const avg = values.reduce((a, b) => a + b) / values.length;
      return avg.toFixed(1) + (metric.title.includes('%') ? '%' : '');
    }
    return metric.zoneComparison[activeZone];
  };

  return (
    <div className="mb-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const zoneValue = getZoneComparison(metric);
          
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
                    : darkMode ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-100 text-rose-600'
                }`}>
                  {metric.change}
                </div>
              </div>
              
              <div className="mb-3">
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

              {/* Zone Comparison */}
              <div className={`p-2 rounded-lg ${
                darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'
              }`}>
                <div className="flex items-center justify-between text-xs">
                  <span className={darkMode ? 'text-emerald-300/70' : 'text-emerald-600/70'}>
                    {activeZone === 'all' ? 'Zone Avg:' : `${activeZone.charAt(0).toUpperCase() + activeZone.slice(1)}:`}
                  </span>
                  <span className={`font-semibold ${
                    darkMode ? 'text-white' : 'text-emerald-800'
                  }`}>
                    {zoneValue}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Engagement Trends */}
      <div className={`mt-6 p-4 rounded-xl ${
        darkMode ? 'glass-green-card' : 'glass-light-card'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-semibold text-emerald-300">Weekly Engagement Trends</h4>
            <p className="text-xs text-emerald-400/70">Reports vs Satisfaction Index</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 bg-emerald-400 rounded-full"></div>
              <span className="text-xs text-emerald-400">Reports</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 bg-amber-400 rounded-full"></div>
              <span className="text-xs text-amber-400">Satisfaction</span>
            </div>
          </div>
        </div>

        <div className="h-32">
          <div className="h-full flex items-end space-x-1">
            {engagementTrends.map((day, index) => {
              const maxReports = Math.max(...engagementTrends.map(d => d.reports));
              const maxSatisfaction = 5; // Max satisfaction score
              
              const reportsHeight = (day.reports / maxReports) * 100;
              const satisfactionHeight = (day.satisfaction / maxSatisfaction) * 100;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center space-y-1">
                  <div className="flex items-end space-x-1 flex-1 w-full">
                    <div 
                      className="w-1/2 bg-emerald-400/50 rounded-t hover:bg-emerald-400/70 transition-colors"
                      style={{ height: `${reportsHeight}%` }}
                      title={`${day.reports} reports`}
                    />
                    <div 
                      className="w-1/2 bg-amber-400/50 rounded-t hover:bg-amber-400/70 transition-colors"
                      style={{ height: `${satisfactionHeight}%` }}
                      title={`${day.satisfaction} satisfaction`}
                    />
                  </div>
                  <span className="text-xs text-emerald-400/70">{day.day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`p-4 rounded-xl text-center ${
          darkMode ? 'glass-green-card' : 'glass-light-card'
        }`}>
          <div className="text-lg font-bold text-white">24/7</div>
          <div className="text-xs text-emerald-300/70">Support Available</div>
        </div>
        <div className={`p-4 rounded-xl text-center ${
          darkMode ? 'glass-green-card' : 'glass-light-card'
        }`}>
          <div className="text-lg font-bold text-white">89%</div>
          <div className="text-xs text-emerald-300/70">First Contact Resolution</div>
        </div>
        <div className={`p-4 rounded-xl text-center ${
          darkMode ? 'glass-green-card' : 'glass-light-card'
        }`}>
          <div className="text-lg font-bold text-white">4.2m</div>
          <div className="text-xs text-emerald-300/70">Total Reach</div>
        </div>
        <div className={`p-4 rounded-xl text-center ${
          darkMode ? 'glass-green-card' : 'glass-light-card'
        }`}>
          <div className="text-lg font-bold text-white">98%</div>
          <div className="text-xs text-emerald-300/70">Uptime</div>
        </div>
      </div>

      {/* Time Range Info */}
      <div className={`mt-6 p-4 rounded-xl ${
        darkMode ? 'bg-emerald-900/10' : 'bg-emerald-50'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <span className={`text-sm ${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>
              Zone: <span className="font-semibold">
                {activeZone === 'all' ? 'All Zones' :
                 activeZone === 'north' ? 'North Zone' :
                 activeZone === 'south' ? 'South Zone' :
                 activeZone === 'east' ? 'East Zone' : 'West Zone'}
              </span>
            </span>
          </div>
          <div className={`text-sm ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
            Period: <span className="font-semibold">
              {timeRange === '1d' ? 'Today' : 
               timeRange === '7d' ? 'This Week' :
               timeRange === '30d' ? 'This Month' : 'This Quarter'}
            </span>
          </div>
          <div className="text-sm text-emerald-400">
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span>Live Data</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenMetrics;