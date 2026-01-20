import React from 'react';
import { Bell, Thermometer, Settings, Users, CheckCircle } from 'lucide-react';

function AlertsPanel() {
  const alerts = [
    { 
      id: 1, 
      type: 'warning', 
      title: 'Water pressure drop in Zone B', 
      time: '2h ago',
      priority: 'high',
      icon: Thermometer
    },
    { 
      id: 2, 
      type: 'maintenance', 
      title: 'Maintenance overdue: 3 facilities', 
      time: '4h ago',
      priority: 'medium',
      icon: Settings
    },
    { 
      id: 3, 
      type: 'report', 
      title: 'New citizen report: Drainage issue', 
      time: '1h ago',
      priority: 'high',
      icon: Users
    },
    { 
      id: 4, 
      type: 'success', 
      title: 'Resolved: Toilet repair completed', 
      time: '6h ago',
      priority: 'low',
      icon: CheckCircle
    },
  ];

  const getAlertStyles = (type, priority) => {
    const base = {
      warning: { bg: 'bg-amber-500/20', icon: 'text-amber-500' },
      maintenance: { bg: 'bg-blue-500/20', icon: 'text-blue-500' },
      report: { bg: 'bg-purple-500/20', icon: 'text-purple-500' },
      success: { bg: 'bg-green-500/20', icon: 'text-green-500' }
    };

    const priorityColors = {
      high: 'bg-red-500/20 text-red-400',
      medium: 'bg-yellow-500/20 text-yellow-400',
      low: 'bg-green-500/20 text-green-400'
    };

    return {
      ...base[type],
      priority: priorityColors[priority]
    };
  };

  return (
    <div className="glass-effect rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Alerts & Notifications</h2>
        <Bell className="h-5 w-5 text-amber-500" />
      </div>
      
      <div className="space-y-3">
        {alerts.map((alert) => {
          const styles = getAlertStyles(alert.type, alert.priority);
          
          return (
            <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <div className={`p-2 rounded-lg ${styles.bg}`}>
                <alert.icon className={`h-4 w-4 ${styles.icon}`} />
              </div>
              <div className="flex-1">
                <div className="font-medium">{alert.title}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-400">{alert.time}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${styles.priority}`}>
                    {alert.priority}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AlertsPanel;