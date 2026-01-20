import React, { useState } from 'react';
import MapContainer from '../components/spatial/MapContainer';
import MapSidebar from '../components/spatial/MapSidebar';
import MapToolbar from '../components/spatial/MapToolbar';
import MapBottomPanel from '../components/spatial/MapBottomPanel';
import AnalysisPanel from '../components/spatial/analysis/AnalysisPanel';
import { Layers, Ruler, Search, Filter, Download, Printer, Share2, Eye } from 'lucide-react';

function SpatialViewPage() {
  const [activeTool, setActiveTool] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [mapLayers, setMapLayers] = useState({
    baseMap: 'satellite',
    facilities: true,
    households: true,
    reports: true,
    waterNetwork: false,
    coverage: false,
    heatmap: false,
  });

  const toggleLayer = (layer) => {
    setMapLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const tools = [
    { id: 'measure', icon: Ruler, label: 'Measure', color: 'text-blue-500' },
    { id: 'search', icon: Search, label: 'Search', color: 'text-green-500' },
    { id: 'filter', icon: Filter, label: 'Filter', color: 'text-purple-500' },
    { id: 'layers', icon: Layers, label: 'Layers', color: 'text-amber-500' },
    { id: 'analysis', icon: Eye, label: 'Analysis', color: 'text-cyan-500' },
    { id: 'export', icon: Download, label: 'Export', color: 'text-gray-500' },
    { id: 'print', icon: Printer, label: 'Print', color: 'text-gray-500' },
    { id: 'share', icon: Share2, label: 'Share', color: 'text-gray-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="glass-effect fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl rounded-full p-3">
        <div className="flex items-center justify-between px-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl">
              <Layers className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Spatial Intelligence View</h1>
              <p className="text-xs text-white/70">Kibera Sanitation Infrastructure & Analysis</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">
              <span>Simulation Mode</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full hover:shadow-lg">
              <span>Live Data</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-28 px-4 pb-4">
        <div className="flex h-[calc(100vh-10rem)] gap-4">
          {/* Left Sidebar */}
          <MapSidebar 
            layers={mapLayers}
            onToggleLayer={toggleLayer}
          />

          {/* Main Map Area */}
          <div className="flex-1 flex flex-col">
            {/* Toolbar */}
            <MapToolbar 
              tools={tools}
              activeTool={activeTool}
              onToolClick={setActiveTool}
              onAnalysisClick={() => setShowAnalysis(!showAnalysis)}
            />

            {/* Map Container */}
            <div className="flex-1 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <MapContainer layers={mapLayers} />
            </div>

            {/* Bottom Panel */}
            <MapBottomPanel />
          </div>

          {/* Right Analysis Panel */}
          {showAnalysis && (
            <AnalysisPanel onClose={() => setShowAnalysis(false)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default SpatialViewPage;