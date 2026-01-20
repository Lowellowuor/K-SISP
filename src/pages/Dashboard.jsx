import React, { useState, useEffect } from 'react';
import DashboardControls from '../components/DashBoard/DashboardControls';
import SummaryMetrics from '../components/dashboard/SummaryMetrics';
import DashboardGrid from '../components/DashBoard/DashboardGrid';
import FloatingActionPanel from '../components/DashBoard/FloatingActionPanel';
import DashboardFooter from '../components/DashBoard/DashboardFooter';
import AIDashboardAssistant from '../components/DashBoard/AIDashboardAssistant';
import NaturalLanguageQuery from '../components/DashBoard/NaturalLanguageQuery';
import CollaborationPanel from '../components/DashBoard/CollaborationPanel';

function Dashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeZone, setActiveZone] = useState('all');
  const [viewMode, setViewMode] = useState('standard');
  const [darkMode, setDarkMode] = useState(true);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [collaborationOpen, setCollaborationOpen] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(null);

  // Sample data
  const zones = [
    { id: 'all', label: 'All Zones', color: 'bg-emerald-500' },
    { id: 'north', label: 'North Zone', color: 'bg-green-500' },
    { id: 'south', label: 'South Zone', color: 'bg-teal-500' },
    { id: 'east', label: 'East Zone', color: 'bg-amber-500' },
    { id: 'west', label: 'West Zone', color: 'bg-emerald-600' },
  ];

  // Auto-refresh effect
  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        console.log('Auto-refreshing data...');
      }, 30000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-emerald-900/10 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-emerald-50/30 to-gray-100'
    }`}>
      
      {/* Background Effects */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/3 rounded-full blur-3xl"></div>
      </div>

      {/* AI Assistant */}
      {aiAssistantOpen && (
        <AIDashboardAssistant 
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
          />
        </div>

        {/* Dashboard Controls */}
        <DashboardControls
          activeZone={activeZone}
          setActiveZone={setActiveZone}
          viewMode={viewMode}
          setViewMode={setViewMode}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          darkMode={darkMode}
          zones={zones}
          onDarkModeToggle={() => setDarkMode(!darkMode)}
          onFullscreenToggle={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen();
              setFullscreen(true);
            } else {
              document.exitFullscreen();
              setFullscreen(false);
            }
          }}
          autoRefresh={autoRefresh}
          setAutoRefresh={setAutoRefresh}
        />

        {/* Summary Metrics */}
        <div className="mb-8">
          <SummaryMetrics 
            timeRange={timeRange}
            activeZone={activeZone}
            darkMode={darkMode}
          />
        </div>

        {/* Main Dashboard Grid */}
        <DashboardGrid
          activeZone={activeZone}
          timeRange={timeRange}
          viewMode={viewMode}
          darkMode={darkMode}
          onCollaborationOpen={() => setCollaborationOpen(true)}
        />

        {/* Dashboard Footer */}
        <DashboardFooter darkMode={darkMode} />
      </div>

      {/* Floating Action Panel */}
      <FloatingActionPanel
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        darkMode={darkMode}
        onExport={() => console.log('Exporting...')}
        onShare={() => setCollaborationOpen(true)}
      />

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-emerald-500/20 bg-gray-900/95 backdrop-blur-lg">
        <div className="flex justify-around items-center p-3">
          <button 
            onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
            className="flex flex-col items-center space-y-1 p-2"
          >
            <div className="h-6 w-6 text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.5 14.5V16H19v-1.5h1.5zm-15 0H6V16H4.5v-1.5zm9.25-5.25L15.5 8 12 4.5 8.5 8l1.25 1.25L11 7.5v5h2V7.5l1.25 1.75zM12 20a8 8 0 100-16 8 8 0 000 16z"/>
              </svg>
            </div>
            <span className="text-xs text-gray-400">AI Assist</span>
          </button>
          
          <button 
            onClick={() => console.log('Refresh')}
            className="flex flex-col items-center space-y-1 p-2"
          >
            <div className="h-6 w-6 text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-8 3.58-8 8s3.58 8 8 8c3.95 0 7.23-2.86 7.88-6.65h-2.23A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
              </svg>
            </div>
            <span className="text-xs text-gray-400">Refresh</span>
          </button>
          
          <button 
            onClick={() => setCollaborationOpen(!collaborationOpen)}
            className="flex flex-col items-center space-y-1 p-2"
          >
            <div className="h-6 w-6 text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
            </div>
            <span className="text-xs text-gray-400">Collaborate</span>
          </button>
          
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="flex flex-col items-center space-y-1 p-2"
          >
            <div className="h-6 w-6 text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
              </svg>
            </div>
            <span className="text-xs text-gray-400">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;