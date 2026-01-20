import React from 'react';
import MapContainer from './MapContainer';
import MapToolbar from './MapToolbar';
import MapBottomPanel from './MapBottomPanel';
import MapSidebar from './MapSidebar';
import AnalysisPanel from './analysis/AnalysisPanel';
import { 
  Navigation, 
  MapPin, 
  Search, 
  Globe, 
  Eye,
  Users,
  Download,
  Printer,
  Share2
} from 'lucide-react';

const SpatialGrid = ({
  mapLayers,
  toggleLayer,
  activeTool,
  setActiveTool,
  showAnalysis,
  setShowAnalysis,
  tools,
  darkMode,
  onCollaborationOpen
}) => {
  const isCompact = false; // Add this state if needed

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column - Map Controls */}
      <div className="lg:col-span-3 space-y-6">
        {/* Map Layers Sidebar */}
        <div className={`rounded-2xl overflow-hidden ${
          darkMode ? 'glass-green-card' : 'glass-light-card'
        }`}>
          <MapSidebar 
            layers={mapLayers}
            onToggleLayer={toggleLayer}
            darkMode={darkMode}
          />
        </div>

        {/* Map Controls */}
        <div className={`rounded-2xl p-4 ${
          darkMode ? 'glass-green-card' : 'glass-light-card'
        }`}>
          <h3 className="text-sm font-semibold text-emerald-300 mb-3">Quick Controls</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between px-3 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg transition-colors">
              <span className="text-sm text-emerald-200">Zoom to District</span>
              <Navigation className="h-4 w-4 text-emerald-400" />
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg transition-colors">
              <span className="text-sm text-emerald-200">Reset View</span>
              <Globe className="h-4 w-4 text-emerald-400" />
            </button>
            <button className="w-full flex items-center justify-between px-3 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg transition-colors">
              <span className="text-sm text-emerald-200">3D View</span>
              <Eye className="h-4 w-4 text-emerald-400" />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className={`rounded-2xl p-4 ${
          darkMode ? 'glass-green-card' : 'glass-light-card'
        }`}>
          <h3 className="text-sm font-semibold text-emerald-300 mb-3">Zone Statistics</h3>
          <div className="space-y-3">
            {[
              { label: 'Facility Density', value: '4.2/km²', trend: 'up' },
              { label: 'Coverage Rate', value: '78%', trend: 'up' },
              { label: 'Issues Reported', value: '24', trend: 'down' },
              { label: 'Response Time', value: '3.2h', trend: 'stable' },
            ].map((stat, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm text-emerald-300">{stat.label}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-white">{stat.value}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    stat.trend === 'up' ? 'bg-green-500/20 text-green-400' :
                    stat.trend === 'down' ? 'bg-red-500/20 text-red-400' :
                    'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {stat.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Center Column - Main Map */}
      <div className="lg:col-span-6 space-y-6">
        {/* Enhanced Toolbar */}
        <div className={`rounded-2xl p-3 ${
          darkMode ? 'glass-green-card' : 'glass-light-card'
        }`}>
          <MapToolbar 
            tools={tools}
            activeTool={activeTool}
            onToolClick={setActiveTool}
            onAnalysisClick={() => setShowAnalysis(!showAnalysis)}
            darkMode={darkMode}
          />
        </div>

        {/* Map Container */}
        <div className={`flex-1 rounded-2xl overflow-hidden border-2 ${
          darkMode ? 'border-emerald-500/30' : 'border-emerald-300'
        } shadow-2xl shadow-emerald-500/10 min-h-0 relative`} style={{ height: '500px' }}>
          <MapContainer layers={mapLayers} darkMode={darkMode} />
          
          {/* Map Overlay Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button className="p-2 bg-emerald-900/90 backdrop-blur-sm rounded-lg hover:bg-emerald-800/90 transition-colors border border-emerald-500/30">
              <Navigation className="h-5 w-5 text-emerald-300" />
            </button>
            <button className="p-2 bg-emerald-900/90 backdrop-blur-sm rounded-lg hover:bg-emerald-800/90 transition-colors border border-emerald-500/30">
              <MapPin className="h-5 w-5 text-emerald-300" />
            </button>
            <button className="p-2 bg-emerald-900/90 backdrop-blur-sm rounded-lg hover:bg-emerald-800/90 transition-colors border border-emerald-500/30">
              <Search className="h-5 w-5 text-emerald-300" />
            </button>
          </div>
          
          {/* Map Scale Bar */}
          <div className={`absolute bottom-4 left-4 backdrop-blur-sm rounded-lg px-3 py-2 border ${
            darkMode ? 'bg-emerald-900/90 border-emerald-500/30' : 'bg-white/90 border-emerald-200'
          }`}>
            <div className="text-xs font-medium text-emerald-300">Scale: 1:5,000</div>
            <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full mt-1"></div>
          </div>
        </div>

        {/* Enhanced Bottom Panel */}
        <div>
          <div className={`rounded-2xl overflow-hidden ${
            darkMode ? 'glass-green-card' : 'glass-light-card'
          }`}>
            <MapBottomPanel darkMode={darkMode} />
          </div>
        </div>
      </div>

      {/* Right Column - Analysis Panel */}
      <div className="lg:col-span-3 space-y-6">
        {showAnalysis ? (
          <div className={`rounded-2xl overflow-hidden ${
            darkMode ? 'glass-green-card' : 'glass-light-card'
          }`}>
            <AnalysisPanel onClose={() => setShowAnalysis(false)} darkMode={darkMode} />
          </div>
        ) : (
          <>
            {/* Quick Analysis */}
            <div className={`rounded-2xl p-4 ${
              darkMode ? 'glass-green-card' : 'glass-light-card'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-emerald-300">Quick Analysis</h3>
                <button 
                  onClick={() => setShowAnalysis(true)}
                  className="text-xs text-emerald-400 hover:text-emerald-300"
                >
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Coverage Gaps', value: '12 areas', status: 'critical' },
                  { label: 'High Density Areas', value: '8 zones', status: 'warning' },
                  { label: 'Optimal Coverage', value: '23 zones', status: 'success' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-emerald-900/20">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-emerald-300">{item.label}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        item.status === 'critical' ? 'bg-red-500/20 text-red-400' :
                        item.status === 'warning' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Collaboration Tools */}
            <div className={`rounded-2xl p-4 ${
              darkMode ? 'glass-green-card' : 'glass-light-card'
            }`}>
              <h3 className="text-sm font-semibold text-emerald-300 mb-4">Collaboration</h3>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={onCollaborationOpen}
                  className="p-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors flex flex-col items-center"
                >
                  <Users className="h-5 w-5 text-emerald-400 mb-2" />
                  <span className="text-xs text-emerald-300">Team</span>
                </button>
                <button className="p-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors flex flex-col items-center">
                  <Download className="h-5 w-5 text-emerald-400 mb-2" />
                  <span className="text-xs text-emerald-300">Export</span>
                </button>
                <button className="p-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors flex flex-col items-center">
                  <Printer className="h-5 w-5 text-emerald-400 mb-2" />
                  <span className="text-xs text-emerald-300">Print</span>
                </button>
                <button className="p-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors flex flex-col items-center">
                  <Share2 className="h-5 w-5 text-emerald-400 mb-2" />
                  <span className="text-xs text-emerald-300">Share</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SpatialGrid;