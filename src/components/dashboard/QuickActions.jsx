import React from 'react';
import { Download, Share2, Bell, RefreshCw, Settings, BarChart3, Database, MessageSquare, Video, Phone, Mail, Calendar } from 'lucide-react';

const QuickActions = ({ darkMode = true, onCollaborationOpen }) => {
  const actions = [
    {
      id: 1,
      name: 'Export Report',
      description: 'Generate and download PDF report',
      icon: Download,
      color: 'bg-emerald-500',
      action: () => console.log('Exporting report...')
    },
    {
      id: 2,
      name: 'Share Dashboard',
      description: 'Share with team members',
      icon: Share2,
      color: 'bg-blue-500',
      action: () => onCollaborationOpen && onCollaborationOpen()
    },
    {
      id: 3,
      name: 'Create Alert',
      description: 'Set up new monitoring alerts',
      icon: Bell,
      color: 'bg-amber-500',
      action: () => console.log('Creating alert...')
    },
    {
      id: 4,
      name: 'Refresh Data',
      description: 'Force data refresh',
      icon: RefreshCw,
      color: 'bg-purple-500',
      action: () => console.log('Refreshing data...')
    },
    {
      id: 5,
      name: 'System Settings',
      description: 'Configure dashboard settings',
      icon: Settings,
      color: 'bg-gray-500',
      action: () => console.log('Opening settings...')
    },
    {
      id: 6,
      name: 'Analytics',
      description: 'Advanced analytics tools',
      icon: BarChart3,
      color: 'bg-teal-500',
      action: () => console.log('Opening analytics...')
    }
  ];

  const collaborationTools = [
    { icon: MessageSquare, name: 'Chat', action: () => console.log('Open chat') },
    { icon: Video, name: 'Video', action: () => console.log('Start video call') },
    { icon: Phone, name: 'Call', action: () => console.log('Start call') },
    { icon: Mail, name: 'Email', action: () => console.log('Send email') },
  ];

  return (
    <div className="h-full p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-xl ${darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'}`}>
            <Database className={`h-5 w-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
            <p className="text-sm text-emerald-300/70">Frequently used tools & actions</p>
          </div>
        </div>
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={action.action}
              className={`p-4 rounded-xl transition-all duration-200 hover:scale-105 flex flex-col items-center text-center ${
                darkMode ? 'bg-emerald-900/20 hover:bg-emerald-800/30' : 'bg-emerald-50 hover:bg-emerald-100'
              }`}
            >
              <div className={`p-3 rounded-xl ${action.color} mb-3`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div className="font-medium text-white mb-1">{action.name}</div>
              <div className="text-xs text-emerald-400/70">{action.description}</div>
            </button>
          );
        })}
      </div>

      {/* Collaboration Tools */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-white">Collaboration Tools</div>
          <Calendar className="h-4 w-4 text-emerald-400" />
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {collaborationTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <button
                key={index}
                onClick={tool.action}
                className={`p-3 rounded-xl transition-all duration-200 flex flex-col items-center ${
                  darkMode ? 'bg-emerald-900/20 hover:bg-emerald-800/30' : 'bg-emerald-50 hover:bg-emerald-100'
                }`}
              >
                <Icon className={`h-5 w-5 mb-1 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <div className="text-xs text-emerald-300">{tool.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className={`rounded-xl p-4 ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
        <div className="text-sm font-medium text-white mb-3">Recent Actions</div>
        <div className="space-y-3">
          {[
            'Report generated 10 min ago',
            'Dashboard shared with team',
            'Alert threshold updated',
            'Data export completed'
          ].map((action, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${index < 2 ? 'bg-green-400' : 'bg-emerald-400'}`} />
              <div className="text-sm text-emerald-300">{action}</div>
            </div>
          ))}
        </div>
        
        <button className={`w-full mt-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          darkMode 
            ? 'bg-emerald-800/30 text-emerald-300 hover:bg-emerald-700/40 hover:text-white' 
            : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
        }`}>
          View All Actions
        </button>
      </div>
    </div>
  );
};

export default QuickActions;