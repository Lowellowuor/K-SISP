import React from 'react';
import { Zap, Droplets, Home } from 'lucide-react';

function MonitoringPanel() {
  const monitoringData = {
    waterNetwork: {
      pressure: { value: '85%', status: 'normal', trend: 'up' },
      leaks: { value: '2', status: 'warning' },
      pumps: { value: 'All Online', status: 'success' }
    },
    wasteManagement: {
      collection: { value: '78%', trend: '+2%' },
      capacity: { value: '82%', trend: '+5%' },
      recycling: { value: '45%', trend: '+8%' }
    }
  };

  return (
    <div className="glass-effect rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Real-time Monitoring</h2>
        <Zap className="h-5 w-5 text-amber-500" />
      </div>
      
      <div className="space-y-6">
        {/* Water Network */}
        <div>
          <h3 className="font-medium text-gray-300 mb-3 flex items-center">
            <Droplets className="h-4 w-4 mr-2 text-blue-500" />
            Water Network Health
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-lg font-bold text-green-400">{monitoringData.waterNetwork.pressure.value}</div>
              <div className="text-xs text-gray-400">Pressure</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-lg font-bold text-amber-400">{monitoringData.waterNetwork.leaks.value}</div>
              <div className="text-xs text-gray-400">Leaks</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-sm font-bold text-green-400">{monitoringData.waterNetwork.pumps.value}</div>
              <div className="text-xs text-gray-400">Pumps</div>
            </div>
          </div>
        </div>

        {/* Waste Management */}
        <div>
          <h3 className="font-medium text-gray-300 mb-3 flex items-center">
            <Home className="h-4 w-4 mr-2 text-green-500" />
            Waste Management
          </h3>
          <div className="space-y-2">
            {Object.entries(monitoringData.wasteManagement).map(([key, value], index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-400 capitalize">{key}</span>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{value.value}</span>
                  <span className="text-xs text-green-400">{value.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonitoringPanel;