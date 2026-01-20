import React, { useState } from 'react';
import { useMap } from 'react-leaflet';
import { 
  ZoomIn, ZoomOut, Navigation, MapPin, Layers, 
  Filter, Ruler, Target, RefreshCw, Maximize2 
} from 'lucide-react';

function MapControls({ map }) {
  const [showLocation, setShowLocation] = useState(false);
  const [measureMode, setMeasureMode] = useState(false);

  const zoomIn = () => map.zoomIn();
  const zoomOut = () => map.zoomOut();
  const zoomToLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        map.flyTo([position.coords.latitude, position.coords.longitude], 16);
        setShowLocation(true);
      });
    }
  };
  
  const resetView = () => {
    map.flyTo([-1.317, 36.791], 15);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const controlButtons = [
    { icon: ZoomIn, action: zoomIn, label: 'Zoom In', color: 'hover:bg-green-500/20' },
    { icon: ZoomOut, action: zoomOut, label: 'Zoom Out', color: 'hover:bg-red-500/20' },
    { icon: Navigation, action: zoomToLocation, label: 'My Location', color: 'hover:bg-blue-500/20' },
    { icon: Target, action: resetView, label: 'Reset View', color: 'hover:bg-purple-500/20' },
    { icon: Maximize2, action: toggleFullscreen, label: 'Fullscreen', color: 'hover:bg-amber-500/20' },
  ];

  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control leaflet-bar !border-none !bg-transparent">
        <div className="space-y-2">
          {controlButtons.map((button, index) => (
            <button
              key={index}
              onClick={button.action}
              className={`flex items-center justify-center w-10 h-10 bg-gray-900/80 backdrop-blur-sm rounded-lg border border-white/10 text-white hover:text-white transition-all ${button.color} group relative`}
              title={button.label}
            >
              <button.icon className="h-5 w-5" />
              <div className="absolute right-full mr-2 px-2 py-1 bg-gray-900 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {button.label}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Measurement Controls */}
      {measureMode && (
        <div className="leaflet-control leaflet-bar !border-none !bg-transparent mt-2">
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-3 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white">Measure Tool</span>
              <Ruler className="h-4 w-4 text-blue-400" />
            </div>
            <div className="space-y-2">
              <button className="w-full text-sm py-1 px-2 bg-blue-500/20 text-blue-300 rounded hover:bg-blue-500/30">
                Distance
              </button>
              <button className="w-full text-sm py-1 px-2 bg-green-500/20 text-green-300 rounded hover:bg-green-500/30">
                Area
              </button>
              <button className="w-full text-sm py-1 px-2 bg-amber-500/20 text-amber-300 rounded hover:bg-amber-500/30">
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapControls;