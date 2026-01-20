import React from 'react';
import { Activity, User, Settings, Database, RefreshCw, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const RecentActivity = ({ darkMode = true }) => {
  const activities = [
    {
      id: 1,
      user: 'Alex Johnson',
      action: 'Updated zone configurations',
      type: 'settings',
      time: '2 minutes ago',
      icon: Settings,
      status: 'success'
    },
    {
      id: 2,
      user: 'System',
      action: 'Completed automatic backup',
      type: 'system',
      time: '15 minutes ago',
      icon: Database,
      status: 'success'
    },
    {
      id: 3,
      user: 'Mike Rodriguez',
      action: 'Restarted North Zone server',
      type: 'maintenance',
      time: '30 minutes ago',
      icon: RefreshCw,
      status: 'warning'
    },
    {
      id: 4,
      user: 'AI System',
      action: 'Detected anomaly in East Zone',
      type: 'alert',
      time: '1 hour ago',
      icon: AlertTriangle,
      status: 'error'
    },
    {
      id: 5,
      user: 'Sarah Chen',
      action: 'Generated weekly report',
      type: 'report',
      time: '2 hours ago',
      icon: Database,
      status: 'success'
    },
    {
      id: 6,
      user: 'System',
      action: 'Performed security scan',
      type: 'security',
      time: '3 hours ago',
      icon: CheckCircle,
      status: 'success'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-400';
      case 'warning': return 'text-amber-400';
      case 'error': return 'text-red-400';
      default: return 'text-emerald-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      default: return CheckCircle;
    }
  };

  return (
    <div className="h-full p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-xl ${darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'}`}>
            <Activity className={`h-5 w-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            <p className="text-sm text-emerald-300/70">Latest system and user actions</p>
          </div>
        </div>
        
        <div className="text-xs text-emerald-400/70">
          <Clock className="inline h-3 w-3 mr-1" />
          Live
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          const StatusIcon = getStatusIcon(activity.status);
          return (
            <div 
              key={activity.id}
              className={`p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                darkMode ? 'bg-emerald-900/20 hover:bg-emerald-800/30' : 'bg-emerald-50 hover:bg-emerald-100'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'
                }`}>
                  <Icon className={`h-4 w-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-white">{activity.action}</div>
                    <StatusIcon className={`h-3 w-3 ${getStatusColor(activity.status)}`} />
                  </div>
                  
                  <div className="flex items-center space-x-3 mt-1">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3 text-emerald-500" />
                      <span className="text-xs text-emerald-400">{activity.user}</span>
                    </div>
                    <div className="text-xs text-emerald-500">•</div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3 text-emerald-500" />
                      <span className="text-xs text-emerald-400">{activity.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity Summary */}
      <div className={`mt-6 rounded-xl p-4 ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
        <div className="text-sm font-medium text-white mb-3">Activity Summary</div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-lg font-bold text-white">{activities.length}</div>
            <div className="text-xs text-emerald-400/70">Total Activities</div>
          </div>
          
          <div>
            <div className="text-lg font-bold text-green-400">
              {activities.filter(a => a.status === 'success').length}
            </div>
            <div className="text-xs text-emerald-400/70">Successful</div>
          </div>
          
          <div>
            <div className="text-lg font-bold text-amber-400">
              {activities.filter(a => a.status === 'warning').length}
            </div>
            <div className="text-xs text-emerald-400/70">Warnings</div>
          </div>
          
          <div>
            <div className="text-lg font-bold text-white">
              {activities.filter(a => a.user !== 'System').length}
            </div>
            <div className="text-xs text-emerald-400/70">User Actions</div>
          </div>
        </div>
        
        <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-emerald-500/20' : 'border-emerald-200'}`}>
          <div className="flex items-center space-x-2 text-xs text-emerald-400/70">
            <Activity className="h-3 w-3" />
            <span>Last updated: Just now</span>
          </div>
        </div>
      </div>

      {/* View More */}
      <button className={`w-full mt-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        darkMode 
          ? 'bg-emerald-800/30 text-emerald-300 hover:bg-emerald-700/40 hover:text-white' 
          : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
      }`}>
        View All Activity
      </button>
    </div>
  );
};

export default RecentActivity;