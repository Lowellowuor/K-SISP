import React from 'react';
import { Target, Globe, AlertCircle, Clock, Users, Cpu } from 'lucide-react';

function SummaryMetrics() {
  const metrics = [
    { 
      label: 'Total Facilities', 
      value: '48', 
      change: '+2', 
      icon: Target, 
      color: 'text-primary-500',
      bgColor: 'bg-primary-500/10',
      trend: 'up'
    },
    { 
      label: 'Service Coverage', 
      value: '65%', 
      change: '+3%', 
      icon: Globe, 
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      trend: 'up'
    },
    { 
      label: 'Active Reports', 
      value: '23', 
      change: '+5', 
      icon: AlertCircle, 
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      trend: 'up'
    },
    { 
      label: 'Avg Response Time', 
      value: '4.2h', 
      change: '-0.8h', 
      icon: Clock, 
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      trend: 'down'
    },
    { 
      label: 'Population Served', 
      value: '12.4k', 
      change: '+0.3k', 
      icon: Users, 
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      trend: 'up'
    },
    { 
      label: 'System Uptime', 
      value: '99.5%', 
      change: '+0.2%', 
      icon: Cpu, 
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10',
      trend: 'up'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {metrics.map((metric, index) => (
        <div key={index} className="glass-effect p-5 rounded-2xl hover:scale-[1.02] transition-transform">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg ${metric.bgColor}`}>
              <metric.icon className={`h-5 w-5 ${metric.color}`} />
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              metric.trend === 'up' 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-blue-500/20 text-blue-400'
            }`}>
              {metric.change}
            </span>
          </div>
          <div className="text-2xl font-bold mb-1">{metric.value}</div>
          <div className="text-sm text-gray-400">{metric.label}</div>
        </div>
      ))}
    </div>
  );
}

export default SummaryMetrics;