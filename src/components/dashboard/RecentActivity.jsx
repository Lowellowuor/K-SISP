import React from 'react';
import { Activity, ArrowRight } from 'lucide-react';

function RecentActivity() {
  const activities = [
    { id: 1, title: 'New water point added - Zone A', time: '2 hours ago', type: 'addition' },
    { id: 2, title: 'Maintenance completed - Toilet #12', time: '4 hours ago', type: 'maintenance' },
    { id: 3, title: 'Citizen report submitted - Drainage', time: '6 hours ago', type: 'report' },
    { id: 4, title: 'Data collection completed', time: '1 day ago', type: 'data' },
    { id: 5, title: 'System update deployed', time: '2 days ago', type: 'system' },
  ];

  const getActivityColor = (type) => {
    switch(type) {
      case 'addition': return 'bg-green-500';
      case 'maintenance': return 'bg-blue-500';
      case 'report': return 'bg-purple-500';
      case 'data': return 'bg-cyan-500';
      case 'system': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="glass-effect rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Recent Activity</h2>
        <Activity className="h-5 w-5 text-primary-500" />
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`w-2 h-2 mt-2 rounded-full ${getActivityColor(activity.type)}`}></div>
            <div className="flex-1">
              <div className="font-medium text-sm">{activity.title}</div>
              <div className="text-xs text-gray-400 mt-1">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 flex items-center justify-center space-x-2 py-2 text-sm text-gray-400 hover:text-white">
        <span>View all activities</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export default RecentActivity;