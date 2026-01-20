import React, { useState } from 'react';
import AnalyticsToolbar from '../components/analytics/AnalyticsToolbar';
import AnalyticsSidebar from '../components/analytics/AnalyticsSidebar';
import MainAnalysisArea from '../components/analytics/MainAnalysisArea';
import ResultsPanel from '../components/analytics/results/ResultsPanel';
import { BarChart3, Database, Cpu, TrendingUp } from 'lucide-react';

function AnalyticsPage() {
  const [activeModule, setActiveModule] = useState('trends');
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [showResults, setShowResults] = useState(true);
  const [analysisData, setAnalysisData] = useState({
    timeRange: '30d',
    zones: ['all'],
    metrics: ['coverage', 'usage', 'reports']
  });

  const modules = [
    { id: 'trends', icon: TrendingUp, label: 'Trend Analysis', color: 'text-blue-500' },
    { id: 'forecasting', icon: Cpu, label: 'Forecasting', color: 'text-green-500' },
    { id: 'spatial', icon: Database, label: 'Spatial Analytics', color: 'text-purple-500' },
    { id: 'statistical', icon: BarChart3, label: 'Statistical Tests', color: 'text-amber-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="glass-effect fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl rounded-full p-3">
        <div className="flex items-center justify-between px-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Advanced Analytics Platform</h1>
              <p className="text-xs text-white/70">Kibera Sanitation Intelligence & Research</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">
              <span>Research Mode</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full hover:shadow-lg">
              <span>Run Analysis</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-28 px-4 pb-4">
        <div className="flex h-[calc(100vh-10rem)] gap-4">
          {/* Left Sidebar */}
          <AnalyticsSidebar 
            modules={modules}
            activeModule={activeModule}
            onModuleSelect={setActiveModule}
            analysisData={analysisData}
            onAnalysisDataChange={setAnalysisData}
          />

          {/* Main Analysis Area */}
          <div className="flex-1 flex flex-col">
            <AnalyticsToolbar 
              onRunAnalysis={() => setShowResults(true)}
              onExport={() => {}}
              onSave={() => {}}
            />
            
            <MainAnalysisArea 
              activeModule={activeModule}
              selectedAnalysis={selectedAnalysis}
            />
          </div>

          {/* Right Results Panel */}
          {showResults && (
            <ResultsPanel 
              onClose={() => setShowResults(false)}
              activeModule={activeModule}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;