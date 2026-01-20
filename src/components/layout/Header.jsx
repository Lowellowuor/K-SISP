import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map, BarChart3, Users, Cloud, Play, Home } from 'lucide-react';

function Header() {
  const location = useLocation();
  
  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/spatial-view', icon: Map, label: 'Spatial View' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/reports', icon: Cloud, label: 'Reports' },
    { path: '/citizen', icon: Users, label: 'Citizen Data' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      {/* Glass effect container */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-full shadow-2xl shadow-primary/10 p-3">
        <div className="flex items-center justify-between px-6">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl">
              <Map className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">K-SISP</h1>
              <p className="text-xs text-white/70">Kibera Sanitation Intelligence</p>
            </div>
          </Link>

          {/* Navigation Items */}
          <nav className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-5 py-3 rounded-full transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-white border border-white/30'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Run Simulation Button */}
          <Link 
            to="/spatial-view" 
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 group"
          >
            <Play className="h-4 w-4 group-hover:animate-pulse" />
            <span className="font-semibold">Run Simulation</span>
          </Link>

        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary-400/30 rounded-full blur-sm"></div>
      <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-secondary-400/20 rounded-full blur-md"></div>
    </header>
  );
}

export default Header;