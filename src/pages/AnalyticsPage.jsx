import React, { useState, useEffect } from 'react';
import AnalyticsToolbar from '../components/analytics/AnalyticsToolbar';
import AnalyticsSidebar from '../components/analytics/AnalyticsSidebar';
import MainAnalysisArea from '../components/analytics/MainAnalysisArea';
import ResultsPanel from '../components/analytics/results/ResultsPanel';
import AnalyticsDashboardControls from '../components/analytics/AnalyticsDashboardControls';
import AnalyticsMetrics from '../components/analytics/AnalyticsMetrics';
import AnalyticsGrid from '../components/analytics/AnalyticsGrid';
import AnalyticsFloatingPanel from '../components/analytics/AnalyticsFloatingPanel';
import AIAnalyticsAssistant from '../components/analytics/AIAnalyticsAssistant';
import NaturalLanguageQuery from '../components/dashboard/NaturalLanguageQuery';
import CollaborationPanel from '../components/dashboard/CollaborationPanel';
import { 
  BarChart3, Database, Cpu, TrendingUp, Brain, 
  Globe, Zap, Shield, Users, Target, Activity,
  Award, Clock, TrendingDown, AlertCircle, Bot,
  MessageSquare, RefreshCw, Settings, Maximize2,
  Minimize2, EyeOff, Eye, Download, Share2,
  ChevronRight, AlertTriangle, PieChart, LineChart
} from 'lucide-react';

function AnalyticsPage() {
  const [activeModule, setActiveModule] = useState('trends');
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [showResults, setShowResults] = useState(true);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [collaborationOpen, setCollaborationOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');
  const [activeZone, setActiveZone] = useState('all');
  const [viewMode, setViewMode] = useState('standard');

  const [analysisData, setAnalysisData] = useState({
    timeRange: '30d',
    zones: ['all'],
    metrics: ['coverage', 'usage', 'reports'],
    confidence: 95,
    sampleSize: 500
  });

  const modules = [
    { id: 'trends', icon: TrendingUp, label: 'Trend Analysis', description: 'Historical patterns & growth', color: 'text-emerald-400' },
    { id: 'forecasting', icon: Brain, label: 'Predictive Analytics', description: 'Future projections & modeling', color: 'text-cyan-400' },
    { id: 'spatial', icon: Globe, label: 'Spatial Intelligence', description: 'Geographic analysis & mapping', color: 'text-amber-400' },
    { id: 'statistical', icon: BarChart3, label: 'Statistical Analysis', description: 'Hypothesis testing & correlations', color: 'text-violet-400' },
    { id: 'comparative', icon: TrendingDown, label: 'Comparative Analysis', description: 'Benchmarking & performance', color: 'text-rose-400' },
    { id: 'risk', icon: Shield, label: 'Risk Assessment', description: 'Vulnerability & impact analysis', color: 'text-blue-400' },
  ];

  const zones = [
    { id: 'all', label: 'All Zones', color: 'bg-emerald-500' },
    { id: 'north', label: 'North Zone', color: 'bg-green-500' },
    { id: 'south', label: 'South Zone', color: 'bg-teal-500' },
    { id: 'east', label: 'East Zone', color: 'bg-amber-500' },
    { id: 'west', label: 'West Zone', color: 'bg-emerald-600' },
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
        console.log('Auto-refreshing analytics data...');
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

  const handleRunAnalysis = () => {
    setShowResults(true);
    console.log('Running analysis with:', analysisData);
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
        <AIAnalyticsAssistant 
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
            placeholder="Ask questions about analytics, trends, or data patterns..."
          />
        </div>

        {/* Dashboard Controls */}
        <AnalyticsDashboardControls
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
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          modules={modules}
        />

        {/* Analytics Metrics */}
        <div className="mb-8">
          <AnalyticsMetrics 
            timeRange={timeRange}
            activeZone={activeZone}
            darkMode={darkMode}
          />
        </div>

        {/* Main Content Grid */}
        <AnalyticsGrid
          activeModule={activeModule}
          modules={modules}
          analysisData={analysisData}
          setAnalysisData={setAnalysisData}
          selectedAnalysis={selectedAnalysis}
          setSelectedAnalysis={setSelectedAnalysis}
          showResults={showResults}
          setShowResults={setShowResults}
          darkMode={darkMode}
          onCollaborationOpen={() => setCollaborationOpen(true)}
          onRunAnalysis={handleRunAnalysis}
        />

        {/* Floating Action Panel */}
        <AnalyticsFloatingPanel
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          darkMode={darkMode}
          onExport={() => console.log('Exporting analytics...')}
          onShare={() => setCollaborationOpen(true)}
          onRunAnalysis={handleRunAnalysis}
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
              onClick={handleRunAnalysis}
              className="flex flex-col items-center space-y-1 p-2"
            >
              <Cpu className="h-5 w-5 text-emerald-400" />
              <span className="text-xs text-gray-400">Run</span>
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

export default AnalyticsPage;