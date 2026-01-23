import React, { useState, useEffect } from 'react';
import MapContainer from '../components/spatial/MapContainer';
import MapSidebar from '../components/spatial/MapSidebar';
import MapToolbar from '../components/spatial/MapToolbar';
import MapBottomPanel from '../components/spatial/MapBottomPanel';
import AnalysisPanel from '../components/spatial/analysis/AnalysisPanel';
import SpatialDashboardControls from '../components/spatial/SpatialDashboardControls';
import SpatialMetrics from '../components/spatial/SpatialMetrics';
import SpatialGrid from '../components/spatial/SpatialGrid';
import SpatialFloatingPanel from '../components/spatial/SpatialFloatingPanel';
import AISpatialAssistant from '../components/spatial/AISpatialAssistant';
import NaturalLanguageQuery from '../components/dashboard/NaturalLanguageQuery';
import CollaborationPanel from '../components/dashboard/CollaborationPanel';
import { 
  Layers, Ruler, Search, Filter, Download, Printer, Share2, Eye, 
  MapPin, Navigation, Globe, Zap, Bot, MessageSquare, Users, RefreshCw,
  Settings, Maximize2, Minimize2, EyeOff, Activity
} from 'lucide-react';

function SpatialViewPage() {
  const [activeTool, setActiveTool] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [collaborationOpen, setCollaborationOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [activeZone, setActiveZone] = useState('all');
  const [viewMode, setViewMode] = useState('standard');

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
    { id: 'measure', icon: Ruler, label: 'Measure', color: 'text-emerald-400' },
    { id: 'search', icon: Search, label: 'Search', color: 'text-green-400' },
    { id: 'filter', icon: Filter, label: 'Filter', color: 'text-lime-400' },
    { id: 'layers', icon: Layers, label: 'Layers', color: 'text-teal-400' },
    { id: 'analysis', icon: Eye, label: 'Analysis', color: 'text-cyan-400' },
    { id: 'navigation', icon: Navigation, label: 'Navigate', color: 'text-emerald-300' },
    { id: 'export', icon: Download, label: 'Export', color: 'text-gray-400' },
    { id: 'print', icon: Printer, label: 'Print', color: 'text-gray-400' },
    { id: 'share', icon: Share2, label: 'Share', color: 'text-gray-400' },
  ];

  // Updated with real Kibera village names
  const zones = [
    { id: 'all', label: 'All Villages', color: 'bg-emerald-500' },
    { id: 'kianda', label: 'Kianda Village', color: 'bg-green-500' },
    { id: 'soweto', label: 'Soweto East', color: 'bg-teal-500' },
    { id: 'lindi', label: 'Lindi Village', color: 'bg-amber-500' },
    { id: 'makina', label: 'Makina Village', color: 'bg-emerald-600' },
    { id: 'silanga', label: 'Silanga Village', color: 'bg-blue-500' },
    { id: 'laini-saba', label: 'Laini Saba', color: 'bg-purple-500' },
    { id: 'sarango', label: 'Sarango\'eni', color: 'bg-indigo-500' }
  ];

  const viewModes = [
    { id: 'standard', label: 'Standard', icon: Eye, description: 'Balanced view' },
    { id: 'detailed', label: 'Detailed', icon: Maximize2, description: 'Maximum detail' },
    { id: 'compact', label: 'Compact', icon: Minimize2, description: 'Focused view' },
  ];

  // Auto-refresh effect
  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        console.log('Auto-refreshing spatial data...');
      }, 30000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-emerald-900/10 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-emerald-50/30 to-gray-100'
    }`}>
      
      {/* Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/3 rounded-full blur-3xl"></div>
      </div>

      {/* AI Assistant */}
      {aiAssistantOpen && (
        <AISpatialAssistant 
          onClose={() => setAiAssistantOpen(false)}
          darkMode={darkMode}
        />
      )}

      {/* Collaboration Panel */}
      {collaborationOpen && (
        <CollaborationPanel 
          onClose={() => setCollaborationOpen(false)}
          darkMode={darkMode}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Natural Language Query Bar */}
        <div className="mb-6">
          <NaturalLanguageQuery 
            darkMode={darkMode}
            onAssistantToggle={() => setAiAssistantOpen(!aiAssistantOpen)}
            placeholder="Ask questions about spatial data or map features..."
          />
        </div>

        {/* Dashboard Controls */}
        <SpatialDashboardControls
          activeZone={activeZone}
          setActiveZone={setActiveZone}
          viewMode={viewMode}
          setViewMode={setViewMode}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          darkMode={darkMode}
          zones={zones}
          viewModes={viewModes}
          onDarkModeToggle={() => setDarkMode(!darkMode)}
          onFullscreenToggle={toggleFullscreen}
          autoRefresh={autoRefresh}
          setAutoRefresh={setAutoRefresh}
          mapLayers={mapLayers}
          onLayerToggle={toggleLayer}
        />

        {/* Spatial Metrics */}
        <div className="mb-8">
          <SpatialMetrics 
            timeRange={timeRange}
            activeZone={activeZone}
            darkMode={darkMode}
          />
        </div>

        {/* Main Content Grid */}
        <SpatialGrid
          mapLayers={mapLayers}
          toggleLayer={toggleLayer}
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          showAnalysis={showAnalysis}
          setShowAnalysis={setShowAnalysis}
          tools={tools}
          darkMode={darkMode}
          onCollaborationOpen={() => setCollaborationOpen(true)}
        />

        {/* Floating Action Panel */}
        <SpatialFloatingPanel
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          darkMode={darkMode}
          onExport={() => console.log('Exporting spatial data...')}
          onShare={() => setCollaborationOpen(true)}
          on3DToggle={() => console.log('Toggling 3D view...')}
        />

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-emerald-500/20 bg-gray-900/95 backdrop-blur-lg">
          <div className="flex justify-around items-center p-3">
            <button 
              onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
              className="flex flex-col items-center space-y-1 p-2"
            >
              <Bot className="h-5 w-5 text-emerald-400" />
              <span className="text-xs text-gray-400">AI Assist</span>
            </button>
            
            <button 
              onClick={() => console.log('Refresh')}
              className="flex flex-col items-center space-y-1 p-2"
            >
              <RefreshCw className="h-5 w-5 text-emerald-400" />
              <span className="text-xs text-gray-400">Refresh</span>
            </button>
            
            <button 
              onClick={() => setCollaborationOpen(!collaborationOpen)}
              className="flex flex-col items-center space-y-1 p-2"
            >
              <Users className="h-5 w-5 text-emerald-400" />
              <span className="text-xs text-gray-400">Collaborate</span>
            </button>
            
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="flex flex-col items-center space-y-1 p-2"
            >
              {darkMode ? <EyeOff className="h-5 w-5 text-emerald-400" /> : <Eye className="h-5 w-5 text-emerald-400" />}
              <span className="text-xs text-gray-400">Theme</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpatialViewPage;