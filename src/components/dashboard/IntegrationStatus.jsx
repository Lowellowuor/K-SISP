import React from 'react';
import { Layers, Wifi, Users, Database, Cloud, Bell } from 'lucide-react';

function IntegrationStatus() {
  const integrations = [
    { name: 'GIS Data', status: 'synced', icon: Layers, color: 'text-green-500' },
    { name: 'Sensor Network', status: 'active', icon: Wifi, color: 'text-green-500' },
    { name: 'Citizen Reports', status: 'live', icon: Users, color: 'text-green-500' },
    { name: 'Government Data', status: 'updated', icon: Database, color: 'text-green-500' },
    { name: 'Weather API', status: 'connected', icon: Cloud, color: 'text-blue-500' },
    { name: 'SMS Gateway', status: 'online', icon: Bell, color: 'text-blue-500' },
  ];

  return (
    <div className="glass-effect rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Integration Status</h2>
        <div className="text-sm text-green-400 font-medium">All Systems Operational</div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {integrations.map((integration, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
            <integration.icon className={`h-5 w-5 ${integration.color}`} />
            <div className="flex-1">
              <div className="text-sm font-medium">{integration.name}</div>
              <div className="text-xs text-gray-400 capitalize">{integration.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IntegrationStatus;