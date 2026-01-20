import React from 'react';
import { Target, TrendingUp, TrendingDown, CheckCircle, XCircle, Clock, Users } from 'lucide-react';

const KPIPanel = ({ timeRange = '7d', darkMode = true }) => {
  const kpis = [
    {
      id: 1,
      name: 'System Uptime',
      value: '99.98%',
      target: '99.95%',
      status: 'exceeded',
      change: '+0.03%',
      trend: 'up',
      icon: CheckCircle
    },
    {
      id: 2,
      name: 'Response Time',
      value: '142ms',
      target: '200ms',
      status: 'achieved',
      change: '-23ms',
      trend: 'down',
      icon: Clock
    },
    {
      id: 3,
      name: 'Error Rate',
      value: '0.12%',
      target: '0.5%',
      status: 'exceeded',
      change: '-0.08%',
      trend: 'down',
      icon: XCircle
    },
    {
      id: 4,
      name: 'User Satisfaction',
      value: '4.8/5',
      target: '4.5/5',
      status: 'exceeded',
      change: '+0.3',
      trend: 'up',
      icon: Users
    },
    {
      id: 5,
      name: 'Throughput',
      value: '2.4k',
      target: '2.0k',
      status: 'exceeded',
      change: '+400',
      trend: 'up',
      icon: TrendingUp
    },
    {
      id: 6,
      name: 'Cost Efficiency',
      value: '92%',
      target: '85%',
      status: 'exceeded',
      change: '+7%',
      trend: 'up',
      icon: TrendingUp
    }
  ];

  const calculatePerformance = () => {
    const achieved = kpis.filter(kpi => kpi.status === 'achieved' || kpi.status === 'exceeded').length;
    return Math.round((achieved / kpis.length) * 100);
  };

  const performance = calculatePerformance();

  return (
    <div className="h-full p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-xl ${darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'}`}>
            <Target className={`h-5 w-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">KPI Dashboard</h3>
            <p className="text-sm text-emerald-300/70">Key Performance Indicators</p>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          performance >= 90 ? 'bg-green-500/20 text-green-400' :
          performance >= 70 ? 'bg-amber-500/20 text-amber-400' :
          'bg-red-500/20 text-red-400'
        }`}>
          {performance}% Achieved
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <div 
              key={kpi.id}
              className={`p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                darkMode ? 'bg-emerald-900/20 hover:bg-emerald-800/30' : 'bg-emerald-50 hover:bg-emerald-100'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    kpi.status === 'exceeded' ? 'bg-green-500/20' :
                    kpi.status === 'achieved' ? 'bg-emerald-500/20' :
                    'bg-red-500/20'
                  }`}>
                    <Icon className={`h-4 w-4 ${
                      kpi.status === 'exceeded' ? 'text-green-400' :
                      kpi.status === 'achieved' ? 'text-emerald-400' :
                      'text-red-400'
                    }`} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{kpi.name}</div>
                    <div className="text-xs text-emerald-400/70">Target: {kpi.target}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <TrendIcon className={`h-3 w-3 ${
                    (kpi.trend === 'up' && kpi.name !== 'Response Time' && kpi.name !== 'Error Rate') ||
                    (kpi.trend === 'down' && (kpi.name === 'Response Time' || kpi.name === 'Error Rate'))
                      ? 'text-green-400' : 'text-red-400'
                  }`} />
                  <span className={`text-xs ${
                    (kpi.trend === 'up' && kpi.name !== 'Response Time' && kpi.name !== 'Error Rate') ||
                    (kpi.trend === 'down' && (kpi.name === 'Response Time' || kpi.name === 'Error Rate'))
                      ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {kpi.change}
                  </span>
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">{kpi.value}</div>
                  <div className={`text-xs mt-1 px-2 py-1 rounded-full inline-block ${
                    kpi.status === 'exceeded' ? 'bg-green-500/20 text-green-400' :
                    kpi.status === 'achieved' ? 'bg-emerald-500/20 text-emerald-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {kpi.status === 'exceeded' ? 'Exceeded Target' :
                     kpi.status === 'achieved' ? 'Target Achieved' :
                     'Below Target'}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Summary */}
      <div className={`rounded-xl p-4 ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-medium text-white">Performance Summary</div>
          <div className={`text-sm font-medium ${
            performance >= 90 ? 'text-green-400' :
            performance >= 70 ? 'text-amber-400' :
            'text-red-400'
          }`}>
            {performance}%
          </div>
        </div>
        
        <div className={`h-2 rounded-full overflow-hidden ${darkMode ? 'bg-emerald-900/30' : 'bg-emerald-200'}`}>
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              performance >= 90 ? 'bg-green-500' :
              performance >= 70 ? 'bg-amber-500' :
              'bg-red-500'
            }`}
            style={{ width: `${performance}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-emerald-400/70 mt-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">
              {kpis.filter(k => k.status === 'exceeded').length}
            </div>
            <div className="text-xs text-emerald-400/70">Exceeded</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-400">
              {kpis.filter(k => k.status === 'achieved').length}
            </div>
            <div className="text-xs text-emerald-400/70">Achieved</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">
              {kpis.filter(k => k.status !== 'exceeded' && k.status !== 'achieved').length}
            </div>
            <div className="text-xs text-emerald-400/70">Below Target</div>
          </div>
        </div>
      </div>

      {/* Time Period Info */}
      <div className={`mt-4 p-3 rounded-xl ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
        <div className="flex items-center justify-between text-sm">
          <div className="text-emerald-400/70">
            Showing {timeRange === '7d' ? 'weekly' : 
                    timeRange === '30d' ? 'monthly' : 
                    timeRange === '90d' ? 'quarterly' : 
                    'real-time'} KPIs
          </div>
          <div className={`px-2 py-1 rounded text-xs ${
            performance >= 90 ? 'bg-green-500/20 text-green-400' :
            performance >= 70 ? 'bg-amber-500/20 text-amber-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {performance >= 90 ? 'Excellent' :
             performance >= 70 ? 'Good' :
             'Needs Attention'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPIPanel;