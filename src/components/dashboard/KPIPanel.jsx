import React from 'react';
import { TrendingUp } from 'lucide-react';

function KPIPanel() {
  const kpis = [
    { label: 'Accessibility Score', value: '78%', change: '+3%', target: '85%', color: 'primary' },
    { label: 'Facility Utilization', value: '85%', change: '+2%', target: '90%', color: 'green' },
    { label: 'Citizen Satisfaction', value: '4.2/5', change: '+0.3', target: '4.5/5', color: 'blue' },
    { label: 'Maintenance Compliance', value: '92%', change: '+5%', target: '95%', color: 'purple' },
  ];

  const getColorClass = (color) => {
    switch(color) {
      case 'primary': return 'bg-primary-500';
      case 'green': return 'bg-green-500';
      case 'blue': return 'bg-blue-500';
      case 'purple': return 'bg-purple-500';
      default: return 'bg-primary-500';
    }
  };

  return (
    <div className="glass-effect rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Key Performance Indicators</h2>
        <TrendingUp className="h-5 w-5 text-primary-500" />
      </div>
      <div className="space-y-4">
        {kpis.map((kpi, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">{kpi.label}</span>
              <div className="flex items-center space-x-2">
                <span className="font-bold">{kpi.value}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  kpi.change.startsWith('+') 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {kpi.change}
                </span>
              </div>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${getColorClass(kpi.color)}`}
                style={{ width: `${parseInt(kpi.value)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Current: {kpi.value}</span>
              <span>Target: {kpi.target}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KPIPanel;