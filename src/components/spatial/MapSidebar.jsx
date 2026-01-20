import React from 'react';
import { 
  Map, Users, AlertCircle, Droplets, Target, Layers, 
  BarChart3, Filter, Download, Settings, ChevronRight 
} from 'lucide-react';

function MapSidebar({ layers, onToggleLayer }) {
  const layerGroups = [
    {
      title: 'Base Maps',
      icon: Map,
      items: [
        { id: 'satellite', label: 'Satellite', type: 'radio', checked: layers.baseMap === 'satellite' },
        { id: 'street', label: 'Street Map', type: 'radio', checked: layers.baseMap === 'street' },
        { id: 'terrain', label: 'Terrain', type: 'radio', checked: layers.baseMap === 'terrain' },
      ]
    },
    {
      title: 'Infrastructure',
      icon: Layers,
      items: [
        { id: 'facilities', label: 'Sanitation Facilities', count: 48, color: 'bg-map-functional' },
        { id: 'waterNetwork', label: 'Water Network', count: 32, color: 'bg-map-water' },
        { id: 'households', label: 'Households', count: '12.4k', color: 'bg-map-household' },
      ]
    },
    {
      title: 'Community Data',
      icon: Users,
      items: [
        { id: 'reports', label: 'Citizen Reports', count: 156, color: 'bg-amber-500' },
        { id: 'heatmap', label: 'Issue Heatmap', count: null, color: 'bg-gradient-to-r from-red-500 to-yellow-500' },
      ]
    },
    {
      title: 'Analysis',
      icon: BarChart3,
      items: [
        { id: 'coverage', label: 'Service Coverage', count: '65%', color: 'bg-gradient-to-r from-green-500 to-blue-500' },
        { id: 'accessibility', label: 'Accessibility', count: '78%', color: 'bg-gradient-to-r from-primary-500 to-secondary-500' },
      ]
    }
  ];

  const statistics = [
    { label: 'Total Facilities', value: '48', change: '+2' },
    { label: 'Service Coverage', value: '65%', change: '+3%' },
    { label: 'Avg. Distance', value: '245m', change: '-15m' },
    { label: 'Active Reports', value: '23', change: '+5' },
  ];

  return (
    <div className="w-80 glass-effect rounded-2xl p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white">Map Layers & Data</h2>
        <button className="p-2 text-gray-400 hover:text-white">
          <Settings className="h-4 w-4" />
        </button>
      </div>

      {/* Layer Groups */}
      <div className="space-y-6">
        {layerGroups.map((group) => (
          <div key={group.title} className="space-y-3">
            <div className="flex items-center space-x-2 text-gray-300">
              <group.icon className="h-4 w-4" />
              <h3 className="font-semibold text-sm">{group.title}</h3>
            </div>
            
            <div className="space-y-2">
              {group.items.map((item) => (
                <label key={item.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 cursor-pointer group">
                  <div className="flex items-center space-x-3">
                    {item.type === 'radio' ? (
                      <input
                        type="radio"
                        name="baseMap"
                        checked={item.checked}
                        onChange={() => onToggleLayer(item.id)}
                        className="text-primary-500 focus:ring-primary-500"
                      />
                    ) : (
                      <input
                        type="checkbox"
                        checked={layers[item.id]}
                        onChange={() => onToggleLayer(item.id)}
                        className="rounded border-gray-600 text-primary-500 focus:ring-primary-500"
                      />
                    )}
                    
                    <div className="flex items-center space-x-2">
                      {item.color && (
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      )}
                      <span className="text-sm text-gray-300 group-hover:text-white">{item.label}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {item.count && (
                      <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">
                        {item.count}
                      </span>
                    )}
                    <ChevronRight className="h-3 w-3 text-gray-500" />
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Statistics Panel */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <h3 className="font-semibold text-white mb-4">Area Statistics</h3>
        <div className="space-y-3">
          {statistics.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between">
              <span className="text-sm text-gray-400">{stat.label}</span>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-white">{stat.value}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  stat.change.startsWith('+') 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 space-y-2">
        <button className="w-full flex items-center justify-center space-x-2 py-2 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 hover:text-white">
          <Filter className="h-4 w-4" />
          <span className="text-sm">Advanced Filter</span>
        </button>
        <button className="w-full flex items-center justify-center space-x-2 py-2 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 hover:text-white">
          <Download className="h-4 w-4" />
          <span className="text-sm">Export Data</span>
        </button>
      </div>
    </div>
  );
}

export default MapSidebar;
