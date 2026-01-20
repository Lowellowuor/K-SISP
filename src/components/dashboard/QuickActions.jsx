import React from 'react';
import { Link } from 'react-router-dom';
import { Map, BarChart3, Users, Cloud, ArrowRight } from 'lucide-react';

function QuickActions() {
  const quickActions = [
    { 
      title: 'Spatial Analysis', 
      description: 'Interactive map visualization',
      icon: Map, 
      color: 'from-primary-500 to-secondary-500',
      path: '/spatial-view'
    },
    { 
      title: 'Data Analytics', 
      description: 'Advanced data insights',
      icon: BarChart3, 
      color: 'from-purple-500 to-pink-500',
      path: '/analysis'
    },
    { 
      title: 'Citizen Reports', 
      description: 'Community feedback system',
      icon: Users, 
      color: 'from-amber-500 to-orange-500',
      path: '/citizen'
    },
    { 
      title: 'Simulation', 
      description: 'Predictive modeling',
      icon: Cloud, 
      color: 'from-cyan-500 to-blue-500',
      path: '/analysis'
    },
  ];

  return (
    <div className="glass-effect rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Quick Actions</h2>
        <Link to="/spatial-view" className="text-sm text-primary-400 hover:text-primary-300 flex items-center">
          View all <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.path}
            className="group relative overflow-hidden rounded-xl p-5 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
            <div className="relative">
              <div className="flex items-center space-x-4 mb-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${action.color} bg-opacity-20`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">{action.title}</h3>
              <p className="text-sm text-gray-400">{action.description}</p>
              <div className="mt-3 flex items-center text-sm text-primary-400 group-hover:text-primary-300">
                <span>Open tool</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;