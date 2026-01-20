import React, { useState } from 'react';
import { Brain, TrendingUp, TrendingDown, AlertTriangle, Calendar, BarChart3, Target, Zap } from 'lucide-react';

const PredictiveAnalytics = ({ darkMode = true }) => {
  const [timeframe, setTimeframe] = useState('7d');

  const predictions = [
    {
      id: 1,
      title: 'System Load Forecast',
      description: 'Expected increase in 48 hours',
      confidence: 92,
      impact: 'high',
      trend: 'up',
      time: 'Next 2 days',
      icon: TrendingUp
    },
    {
      id: 2,
      title: 'Energy Consumption',
      description: 'Predicted 15% reduction possible',
      confidence: 85,
      impact: 'medium',
      trend: 'down',
      time: 'Next week',
      icon: TrendingDown
    },
    {
      id: 3,
      title: 'Maintenance Alert',
      description: 'Critical components need attention',
      confidence: 78,
      impact: 'high',
      trend: 'warning',
      time: 'Within 24h',
      icon: AlertTriangle
    },
    {
      id: 4,
      title: 'Performance Peak',
      description: 'Optimal performance window identified',
      confidence: 95,
      impact: 'low',
      trend: 'up',
      time: 'Tomorrow 10AM',
      icon: Zap
    }
  ];

  const trends = [
    { day: 'Mon', actual: 65, predicted: 68 },
    { day: 'Tue', actual: 72, predicted: 70 },
    { day: 'Wed', actual: 68, predicted: 72 },
    { day: 'Thu', actual: 75, predicted: 74 },
    { day: 'Fri', actual: 80, predicted: 78 },
    { day: 'Sat', actual: 82, predicted: 82 },
    { day: 'Sun', actual: 78, predicted: 84 }
  ];

  const maxValue = Math.max(...trends.map(t => Math.max(t.actual, t.predicted)));

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-amber-400 bg-amber-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      case 'warning': return 'text-amber-400';
      default: return 'text-gray-400';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      case 'warning': return AlertTriangle;
      default: return TrendingUp;
    }
  };

  return (
    <div className="h-full p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-xl ${darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'}`}>
            <Brain className={`h-5 w-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Predictive Analytics</h3>
            <p className="text-sm text-emerald-300/70">AI-powered insights and forecasts</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          {['24h', '7d', '30d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeframe(range)}
              className={`px-2 py-1 text-xs rounded-lg transition-colors ${
                timeframe === range
                  ? darkMode 
                    ? 'bg-emerald-600/40 text-white' 
                    : 'bg-emerald-100 text-emerald-800'
                  : darkMode 
                    ? 'text-emerald-300 hover:text-white hover:bg-emerald-800/30' 
                    : 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Predictions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {predictions.map((prediction) => {
          const Icon = prediction.icon;
          const TrendIcon = getTrendIcon(prediction.trend);
          return (
            <div 
              key={prediction.id}
              className={`p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                darkMode ? 'bg-emerald-900/20 hover:bg-emerald-800/30' : 'bg-emerald-50 hover:bg-emerald-100'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    prediction.trend === 'up' ? 'bg-green-500/20' :
                    prediction.trend === 'down' ? 'bg-blue-500/20' :
                    'bg-amber-500/20'
                  }`}>
                    <Icon className={`h-4 w-4 ${
                      prediction.trend === 'up' ? 'text-green-400' :
                      prediction.trend === 'down' ? 'text-blue-400' :
                      'text-amber-400'
                    }`} />
                  </div>
                  <div>
                    <div className="font-medium text-white">{prediction.title}</div>
                    <div className="text-xs text-emerald-400/70">{prediction.description}</div>
                  </div>
                </div>
                
                <TrendIcon className={`h-4 w-4 ${getTrendColor(prediction.trend)}`} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`text-xs px-2 py-1 rounded-full ${getImpactColor(prediction.impact)}`}>
                    {prediction.impact.charAt(0).toUpperCase() + prediction.impact.slice(1)} impact
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Target className="h-3 w-3 text-emerald-500" />
                    <span className="text-xs text-emerald-400">{prediction.confidence}%</span>
                  </div>
                </div>
                
                <div className="text-xs text-emerald-400">{prediction.time}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trend Chart */}
      <div className={`rounded-xl p-4 mb-6 ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-white">Performance Forecast</div>
          <BarChart3 className="h-4 w-4 text-emerald-400" />
        </div>
        
        <div className="h-32 relative">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 25, 50, 75, 100].map((percent) => (
              <div 
                key={percent}
                className={`border-t ${darkMode ? 'border-emerald-500/20' : 'border-emerald-200'}`}
                style={{ top: `${percent}%` }}
              />
            ))}
          </div>

          {/* Data points */}
          <div className="absolute inset-0 flex items-end justify-between px-2">
            {trends.map((trend, index) => {
              const actualHeight = (trend.actual / maxValue) * 100;
              const predictedHeight = (trend.predicted / maxValue) * 100;
              
              return (
                <div key={index} className="flex flex-col items-center" style={{ width: `${80 / trends.length}%` }}>
                  <div className="relative w-6">
                    {/* Predicted (transparent) */}
                    <div
                      className="w-4 rounded-t-lg absolute bottom-0 left-1/2 transform -translate-x-1/2"
                      style={{ 
                        height: `${predictedHeight}%`,
                        background: 'linear-gradient(to top, rgba(16, 185, 129, 0.3), rgba(16, 185, 129, 0.1))'
                      }}
                    />
                    {/* Actual (solid) */}
                    <div
                      className="w-4 rounded-t-lg absolute bottom-0 left-1/2 transform -translate-x-1/2"
                      style={{ 
                        height: `${actualHeight}%`,
                        background: 'linear-gradient(to top, #10b981, #34d399)'
                      }}
                    />
                  </div>
                  
                  <div className="mt-2 text-xs text-emerald-400/70">{trend.day}</div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="absolute bottom-0 right-4">
            <div className={`flex items-center space-x-3 text-xs ${darkMode ? 'bg-emerald-900/80' : 'bg-white/80'} backdrop-blur-sm px-3 py-2 rounded-lg border ${darkMode ? 'border-emerald-500/20' : 'border-emerald-200'}`}>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-sm bg-emerald-500" />
                <span className="text-emerald-300">Actual</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-sm bg-emerald-500/30" />
                <span className="text-emerald-300">Predicted</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className={`rounded-xl p-4 ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
        <div className="text-sm font-medium text-white mb-3">AI Insights</div>
        
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <Brain className="h-4 w-4 text-emerald-400 mt-0.5" />
            <div className="text-sm text-emerald-300">
              System performance expected to remain stable for the next 48 hours
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Calendar className="h-4 w-4 text-amber-400 mt-0.5" />
            <div className="text-sm text-emerald-300">
              Schedule maintenance for East Zone within next 24 hours
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <Zap className="h-4 w-4 text-green-400 mt-0.5" />
            <div className="text-sm text-emerald-300">
              Energy optimization opportunity detected - potential 12% savings
            </div>
          </div>
        </div>
        
        <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-emerald-500/20' : 'border-emerald-200'}`}>
          <div className="flex items-center justify-between text-xs">
            <div className="text-emerald-400/70">
              Model accuracy: 94.2%
            </div>
            <div className="text-emerald-400">
              Last updated: Just now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;