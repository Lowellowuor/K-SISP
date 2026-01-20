import React from 'react';
import AnalyticsSidebar from './AnalyticsSidebar';
import MainAnalysisArea from './MainAnalysisArea';
import ResultsPanel from './results/ResultsPanel';
import { Cpu, Users, Download, Share2, AlertTriangle, ChevronRight, Database, FileText, MessageSquare, Zap } from 'lucide-react';

const AnalyticsGrid = ({
  activeModule,
  modules,
  analysisData,
  setAnalysisData,
  selectedAnalysis,
  setSelectedAnalysis,
  showResults,
  setShowResults,
  darkMode,
  onCollaborationOpen,
  onRunAnalysis
}) => {
  const currentModule = modules.find(m => m.id === activeModule);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column - Analysis Controls */}
      <div className="lg:col-span-3 space-y-6">
        {/* Analysis Sidebar */}
        <div className={`rounded-2xl overflow-hidden ${
          darkMode ? 'glass-green-card' : 'glass-light-card'
        }`}>
          <AnalyticsSidebar 
            modules={modules}
            activeModule={activeModule}
            onModuleSelect={setSelectedAnalysis}
            analysisData={analysisData}
            onAnalysisDataChange={setAnalysisData}
            darkMode={darkMode}
          />
        </div>

        {/* Analysis Status */}
        <div className={`rounded-2xl p-4 ${
          darkMode ? 'glass-green-card' : 'glass-light-card'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-emerald-300">Analysis Status</h3>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-emerald-300">Queue</span>
              <span className="text-sm font-medium text-white">2 analyses</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-emerald-300">Processing</span>
              <span className="text-sm font-medium text-white">1 analysis</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-emerald-300">Completed</span>
              <span className="text-sm font-medium text-white">42 today</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-emerald-300">Success Rate</span>
              <span className="text-sm font-medium text-green-400">96%</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`rounded-2xl p-4 ${
          darkMode ? 'glass-green-card' : 'glass-light-card'
        }`}>
          <h3 className="text-sm font-semibold text-emerald-300 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button
              onClick={onRunAnalysis}
              className="w-full flex items-center justify-between px-3 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg transition-colors group"
            >
              <span className="text-sm text-emerald-200 group-hover:text-emerald-100">Run Analysis</span>
              <Cpu className="h-4 w-4 text-emerald-400 group-hover:animate-pulse" />
            </button>
            <button
              onClick={() => console.log('Schedule batch analysis')}
              className="w-full flex items-center justify-between px-3 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg transition-colors group"
            >
              <span className="text-sm text-emerald-200 group-hover:text-emerald-100">Schedule Batch</span>
              <Database className="h-4 w-4 text-emerald-400" />
            </button>
            <button
              onClick={() => console.log('Export results')}
              className="w-full flex items-center justify-between px-3 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg transition-colors group"
            >
              <span className="text-sm text-emerald-200 group-hover:text-emerald-100">Export Results</span>
              <Download className="h-4 w-4 text-emerald-400" />
            </button>
            <button
              onClick={() => console.log('Generate report')}
              className="w-full flex items-center justify-between px-3 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg transition-colors group"
            >
              <span className="text-sm text-emerald-200 group-hover:text-emerald-100">Generate Report</span>
              <FileText className="h-4 w-4 text-emerald-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Center Column - Main Analysis */}
      <div className="lg:col-span-6 space-y-6">
        {/* Module Header */}
        <div className={`rounded-2xl p-4 ${
          darkMode ? 'glass-green-card' : 'glass-light-card'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {currentModule && (
                <>
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'}`}>
                    <currentModule.icon className={`h-5 w-5 ${currentModule.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{currentModule.label}</h3>
                    <p className="text-sm text-emerald-300/70">{currentModule.description}</p>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-emerald-400">Live Processing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Analysis Area */}
        <div className={`flex-1 rounded-2xl overflow-hidden border-2 ${
          darkMode ? 'border-emerald-500/30' : 'border-emerald-300'
        } shadow-2xl shadow-emerald-500/10 min-h-0 relative`} style={{ height: '400px' }}>
          <MainAnalysisArea 
            activeModule={activeModule}
            selectedAnalysis={selectedAnalysis}
            analysisData={analysisData}
            darkMode={darkMode}
          />
          
          {/* Overlay Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button 
              className="p-2 bg-emerald-900/90 backdrop-blur-sm rounded-lg hover:bg-emerald-800/90 transition-colors border border-emerald-500/30 group"
              title="View alerts and anomalies"
            >
              <AlertTriangle className="h-5 w-5 text-emerald-300 group-hover:text-amber-400" />
            </button>
            <button 
              className="p-2 bg-emerald-900/90 backdrop-blur-sm rounded-lg hover:bg-emerald-800/90 transition-colors border border-emerald-500/30 group"
              title="Expand view"
            >
              <ChevronRight className="h-5 w-5 text-emerald-300 group-hover:text-white" />
            </button>
            <button 
              className="p-2 bg-emerald-900/90 backdrop-blur-sm rounded-lg hover:bg-emerald-800/90 transition-colors border border-emerald-500/30 group"
              title="AI Insights"
            >
              <Zap className="h-5 w-5 text-emerald-300 group-hover:text-cyan-400" />
            </button>
          </div>
        </div>

        {/* Analysis Metrics Footer */}
        <div className="grid grid-cols-4 gap-4">
          <div className={`p-4 rounded-xl text-center transition-all duration-300 hover:scale-105 cursor-pointer ${
            darkMode ? 'glass-green-card' : 'glass-light-card'
          }`}>
            <div className="text-lg font-bold text-white">{analysisData.confidence}%</div>
            <div className="text-xs text-emerald-300/70">Confidence</div>
            <div className="mt-1">
              <div className="w-full bg-emerald-900/30 rounded-full h-1 overflow-hidden">
                <div 
                  className="bg-emerald-400 h-1 rounded-full"
                  style={{ width: `${analysisData.confidence}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className={`p-4 rounded-xl text-center transition-all duration-300 hover:scale-105 cursor-pointer ${
            darkMode ? 'glass-green-card' : 'glass-light-card'
          }`}>
            <div className="text-lg font-bold text-white">{analysisData.timeRange}</div>
            <div className="text-xs text-emerald-300/70">Time Range</div>
            <div className="mt-1">
              <div className="text-xs text-emerald-400">
                {analysisData.timeRange === '30d' ? 'Last 30 Days' : 
                 analysisData.timeRange === '7d' ? 'Last 7 Days' :
                 analysisData.timeRange === '24h' ? 'Last 24 Hours' :
                 analysisData.timeRange === '1h' ? 'Last Hour' : 'Custom'}
              </div>
            </div>
          </div>
          <div className={`p-4 rounded-xl text-center transition-all duration-300 hover:scale-105 cursor-pointer ${
            darkMode ? 'glass-green-card' : 'glass-light-card'
          }`}>
            <div className="text-lg font-bold text-white">{analysisData.metrics.length}</div>
            <div className="text-xs text-emerald-300/70">Metrics</div>
            <div className="mt-1">
              <div className="text-xs text-emerald-400">
                {analysisData.metrics.length === 1 ? '1 metric' : `${analysisData.metrics.length} metrics`}
              </div>
            </div>
          </div>
          <div className={`p-4 rounded-xl text-center transition-all duration-300 hover:scale-105 cursor-pointer ${
            darkMode ? 'glass-green-card' : 'glass-light-card'
          }`}>
            <div className="text-lg font-bold text-white">{analysisData.sampleSize.toLocaleString()}</div>
            <div className="text-xs text-emerald-300/70">Samples</div>
            <div className="mt-1">
              <div className="text-xs text-emerald-400">
                {analysisData.sampleSize >= 1000 ? `${(analysisData.sampleSize/1000).toFixed(1)}k` : analysisData.sampleSize}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Results Panel */}
      <div className="lg:col-span-3 space-y-6">
        {showResults ? (
          <div className={`rounded-2xl overflow-hidden ${
            darkMode ? 'glass-green-card' : 'glass-light-card'
          }`}>
            <ResultsPanel 
              onClose={() => setShowResults(false)}
              activeModule={activeModule}
              analysisData={analysisData}
              darkMode={darkMode}
            />
          </div>
        ) : (
          <>
            {/* Quick Results */}
            <div className={`rounded-2xl p-4 ${
              darkMode ? 'glass-green-card' : 'glass-light-card'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-emerald-300">Recent Results</h3>
                <button 
                  onClick={() => setShowResults(true)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Trend Analysis', time: '10 min ago', status: 'success', module: 'trends' },
                  { label: 'Correlation Study', time: '25 min ago', status: 'success', module: 'statistical' },
                  { label: 'Forecast Model', time: '1 hour ago', status: 'warning', module: 'forecasting' },
                  { label: 'Zone Comparison', time: '2 hours ago', status: 'success', module: 'comparative' },
                  { label: 'Risk Assessment', time: '3 hours ago', status: 'success', module: 'risk' },
                  { label: 'Spatial Analysis', time: '4 hours ago', status: 'success', module: 'spatial' },
                ].map((item, idx) => {
                  const module = modules.find(m => m.id === item.module);
                  const Icon = module?.icon;
                  return (
                    <div 
                      key={idx} 
                      className="p-3 rounded-lg bg-emerald-900/20 hover:bg-emerald-900/30 transition-colors cursor-pointer group"
                      onClick={() => setSelectedAnalysis(item.module)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {Icon && <Icon className={`h-4 w-4 ${module.color}`} />}
                          <span className="text-sm text-emerald-300 group-hover:text-white">{item.label}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          item.status === 'success' ? 'bg-green-500/20 text-green-400' :
                          'bg-amber-500/20 text-amber-400'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="text-xs text-emerald-400/70 mt-1 flex items-center justify-between">
                        <span>{item.time}</span>
                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  );
                })}
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
                  className="p-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors flex flex-col items-center group"
                >
                  <Users className="h-5 w-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-emerald-300 group-hover:text-emerald-200">Team</span>
                </button>
                <button 
                  onClick={() => console.log('Share analysis')}
                  className="p-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors flex flex-col items-center group"
                >
                  <Share2 className="h-5 w-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-emerald-300 group-hover:text-emerald-200">Share</span>
                </button>
                <button 
                  onClick={() => console.log('Export data')}
                  className="p-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors flex flex-col items-center group"
                >
                  <Download className="h-5 w-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-emerald-300 group-hover:text-emerald-200">Export</span>
                </button>
                <button 
                  onClick={() => console.log('AI Chat')}
                  className="p-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors flex flex-col items-center group"
                >
                  <MessageSquare className="h-5 w-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-emerald-300 group-hover:text-emerald-200">AI Chat</span>
                </button>
              </div>
              
              {/* Quick Stats */}
              <div className="mt-4 pt-4 border-t border-emerald-500/20">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">24</div>
                    <div className="text-xs text-emerald-400/70">Team Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">8</div>
                    <div className="text-xs text-emerald-400/70">Active Sessions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Quality */}
            <div className={`rounded-2xl p-4 ${
              darkMode ? 'glass-green-card' : 'glass-light-card'
            }`}>
              <h3 className="text-sm font-semibold text-emerald-300 mb-4">Data Quality</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-emerald-400 mb-1">
                    <span>Completeness</span>
                    <span>98.5%</span>
                  </div>
                  <div className="w-full bg-emerald-900/30 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '98.5%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs text-emerald-400 mb-1">
                    <span>Accuracy</span>
                    <span>95.2%</span>
                  </div>
                  <div className="w-full bg-emerald-900/30 rounded-full h-2 overflow-hidden">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '95.2%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs text-emerald-400 mb-1">
                    <span>Timeliness</span>
                    <span>99.1%</span>
                  </div>
                  <div className="w-full bg-emerald-900/30 rounded-full h-2 overflow-hidden">
                    <div className="bg-cyan-400 h-2 rounded-full" style={{ width: '99.1%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AnalyticsGrid;