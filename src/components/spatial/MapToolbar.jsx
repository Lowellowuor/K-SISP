import React from 'react';
import { 
  Ruler, Search, Filter, Layers, Eye, Download, 
  Printer, Share2, Maximize2, Minimize2, MapPin,
  Navigation, Zap, Globe, Compass, Target, Home,
  AlertCircle, Layers3, Settings
} from 'lucide-react';

function MapToolbar({ tools, activeTool, onToolClick, onAnalysisClick }) {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [showAnalysisTools, setShowAnalysisTools] = React.useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const analysisTools = [
    { id: 'buffer', label: 'Buffer Zone', icon: Navigation, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { id: 'hotspot', label: 'Hotspot', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { id: 'network', label: 'Network', icon: Globe, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { id: 'proximity', label: 'Proximity', icon: Target, color: 'text-violet-400', bg: 'bg-violet-500/10' },
    { id: 'terrain', label: 'Terrain', icon: Compass, color: 'text-lime-400', bg: 'bg-lime-500/10' },
  ];

  const utilityTools = [
    { id: 'home', label: 'Home', icon: Home, color: 'text-gray-400', action: () => console.log('Reset view') },
    { id: 'layers', label: 'Layers', icon: Layers3, color: 'text-teal-400', action: () => console.log('Toggle layers') },
    { id: 'alerts', label: 'Alerts', icon: AlertCircle, color: 'text-rose-400', action: () => console.log('Show alerts') },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'text-gray-400', action: () => console.log('Open settings') },
  ];

  return (
    <div className="glass-effect-green rounded-2xl p-4 border border-emerald-500/20 shadow-lg mb-4">
      <div className="flex flex-col space-y-4">
        {/* Top Row: Main Navigation Tools */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button
                onClick={() => setShowAnalysisTools(!showAnalysisTools)}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 font-medium"
              >
                <Navigation className="h-4 w-4" />
                <span>Analysis Tools</span>
              </button>
              
              {/* Analysis Tools Dropdown */}
              {showAnalysisTools && (
                <div className="absolute top-full left-0 mt-2 w-64 glass-effect-green rounded-xl border border-emerald-500/20 shadow-2xl p-3 z-50 animate-fade-in">
                  <div className="grid grid-cols-2 gap-2">
                    {analysisTools.map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() => {
                          onToolClick(tool.id);
                          setShowAnalysisTools(false);
                        }}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all hover:scale-[1.02] ${
                          tool.bg
                        } hover:bg-opacity-30 border border-emerald-500/10`}
                      >
                        <tool.icon className={`h-5 w-5 mb-2 ${tool.color}`} />
                        <span className="text-xs font-medium text-gray-200">{tool.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Utility Tools */}
            <div className="flex items-center space-x-1">
              {utilityTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={tool.action}
                  className={`p-2.5 rounded-lg hover:bg-emerald-500/10 transition-colors border border-emerald-500/10 ${
                    tool.id === 'alerts' ? 'animate-pulse-green' : ''
                  }`}
                  title={tool.label}
                >
                  <tool.icon className={`h-4 w-4 ${tool.color}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Coordinate Display */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <MapPin className="h-4 w-4 text-emerald-400" />
              <div className="text-sm font-mono">
                <span className="text-emerald-300 font-semibold">-1.317°</span>
                <span className="text-emerald-500/60 mx-2">|</span>
                <span className="text-emerald-300 font-semibold">36.791°</span>
              </div>
              <div className="text-xs text-emerald-400/60">Kibera, Nairobi</div>
            </div>
            
            <div className="h-6 w-px bg-emerald-500/20"></div>

            <div className="flex items-center space-x-3">
              <div className="text-center">
                <div className="text-xs text-emerald-300/70">Scale</div>
                <div className="text-sm font-semibold text-white">1:5,000</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-emerald-300/70">Zoom</div>
                <div className="text-sm font-semibold text-white">15x</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Main Toolbar */}
        <div className="flex items-center justify-between">
          {/* Primary Tools */}
          <div className="flex items-center space-x-2">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => tool.id === 'analysis' ? onAnalysisClick() : onToolClick(tool.id)}
                className={`group flex flex-col items-center justify-center p-3 rounded-xl min-w-20 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${
                  activeTool === tool.id || (tool.id === 'analysis' && activeTool === 'analysis')
                    ? 'bg-gradient-to-r from-emerald-500/30 to-green-500/30 border border-emerald-500/40 glow-green-sm'
                    : 'bg-emerald-500/5 hover:bg-emerald-500/15 border border-emerald-500/10'
                }`}
              >
                <div className="relative">
                  <tool.icon className={`h-5 w-5 mb-2 ${tool.color} transition-transform group-hover:scale-110`} />
                  {tool.id === 'export' && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                <span className="text-xs font-medium text-gray-200 group-hover:text-white transition-colors">
                  {tool.label}
                </span>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleFullscreen}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                isFullscreen 
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
                  : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20'
              }`}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Exit Fullscreen</span>
                </>
              ) : (
                <>
                  <Maximize2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Fullscreen</span>
                </>
              )}
            </button>

            <button className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 font-medium">
              <Share2 className="h-4 w-4" />
              <span>Share Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Tool Panel - Enhanced */}
      {activeTool && (
        <div className="mt-4 pt-4 border-t border-emerald-500/20 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                {(() => {
                  const tool = [...tools, ...analysisTools].find(t => t.id === activeTool);
                  return tool ? <tool.icon className={`h-4 w-4 ${tool.color}`} /> : null;
                })()}
                <span className="text-sm font-semibold text-white">
                  {[...tools, ...analysisTools].find(t => t.id === activeTool)?.label || 'Active Tool'}
                </span>
              </div>
              
              <div className="text-sm text-emerald-300/80">
                Click on the map to use this tool
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="text-sm text-gray-400 hover:text-white px-3 py-1.5 hover:bg-emerald-500/10 rounded-lg transition-colors">
                Undo
              </button>
              <button className="text-sm text-gray-400 hover:text-white px-3 py-1.5 hover:bg-emerald-500/10 rounded-lg transition-colors">
                Reset
              </button>
              <button className="text-sm bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-1.5 rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all">
                Save
              </button>
            </div>
          </div>
          
          {/* Tool-specific options */}
          {activeTool === 'measure' && (
            <div className="mt-3 flex items-center space-x-4">
              <div className="text-sm text-emerald-300">Measurement Type:</div>
              <div className="flex items-center space-x-2">
                {['Distance', 'Area', 'Perimeter'].map((type) => (
                  <button
                    key={type}
                    className="px-3 py-1.5 text-sm bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg border border-emerald-500/20 text-emerald-300"
                  >
                    {type}
                  </button>
                ))}
              </div>
              <div className="ml-auto text-sm text-emerald-300">
                Click points on map • <span className="text-white">Esc to cancel</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MapToolbar;