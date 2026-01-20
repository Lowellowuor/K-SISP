import React from 'react';
import { 
  Ruler, Search, Filter, Layers, Eye, Download, 
  Printer, Share2, Maximize2, Minimize2, MapPin,
  Navigation, Zap, Globe
} from 'lucide-react';

function MapToolbar({ tools, activeTool, onToolClick, onAnalysisClick }) {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

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
    { id: 'buffer', label: 'Buffer Analysis', icon: Navigation, color: 'text-blue-400' },
    { id: 'hotspot', label: 'Hotspot Detection', icon: Zap, color: 'text-red-400' },
    { id: 'network', label: 'Network Analysis', icon: Globe, color: 'text-green-400' },
  ];

  return (
    <div className="glass-effect rounded-xl p-3 mb-4">
      <div className="flex items-center justify-between">
        {/* Left: Main Tools */}
        <div className="flex items-center space-x-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => tool.id === 'analysis' ? onAnalysisClick() : onToolClick(tool.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-lg min-w-16 transition-all ${
                activeTool === tool.id || (tool.id === 'analysis' && activeTool === 'analysis')
                  ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-white/20'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <tool.icon className={`h-5 w-5 mb-1 ${tool.color}`} />
              <span className="text-xs text-gray-300">{tool.label}</span>
            </button>
          ))}
        </div>

        {/* Center: Coordinate Display */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-lg">
            <MapPin className="h-4 w-4 text-gray-400" />
            <div className="text-sm">
              <span className="text-gray-300">-1.317°</span>
              <span className="text-gray-500 mx-2">|</span>
              <span className="text-gray-300">36.791°</span>
            </div>
          </div>
          
          <div className="h-6 w-px bg-white/20"></div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Scale:</span>
            <span className="text-sm text-white font-medium">1:5,000</span>
          </div>
        </div>

        {/* Right: Utility Buttons */}
        <div className="flex items-center space-x-2">
          {analysisTools.map((tool) => (
            <button
              key={tool.id}
              className="flex items-center space-x-2 px-3 py-2 bg-white/5 rounded-lg hover:bg-white/10"
            >
              <tool.icon className={`h-4 w-4 ${tool.color}`} />
              <span className="text-sm text-gray-300">{tool.label}</span>
            </button>
          ))}
          
          <button
            onClick={toggleFullscreen}
            className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5" />
            ) : (
              <Maximize2 className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Active Tool Panel */}
      {activeTool && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-400">Active:</span>
              <span className="text-sm font-medium text-white">
                {tools.find(t => t.id === activeTool)?.label}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="text-xs text-gray-400 hover:text-white px-2 py-1">
                Clear
              </button>
              <button className="text-xs bg-primary-500 text-white px-3 py-1 rounded">
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapToolbar;
