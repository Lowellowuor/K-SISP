import React, { useState, useEffect } from 'react';
import ReportToolbar from '../components/reports/ReportToolbar';
import ReportSidebar from '../components/reports/ReportSidebar';
import ReportEditor from '../components/reports/editor/ReportEditor';
import PreviewPanel from '../components/reports/PreviewPanel';
import ReportsMetrics from '../components/reports/ReportsMetrics';
import ReportTemplatesGrid from '../components/reports/ReportTemplatesGrid';
import ScheduledReports from '../components/reports/ScheduledReports';
import { 
  FileText, BarChart3, Map, TrendingUp, Database, 
  Download, Calendar, Settings, Eye, EyeOff, RefreshCw,
  Users, Shield, Clock, Target, Award, Brain,
  MessageSquare, Share2, Bell, Filter, Search,
  ChevronRight, MoreVertical, Plus, FileCheck,
  FileX, FilePlus, Archive, Globe, Cpu
} from 'lucide-react';

function ReportsPage() {
  const [activeTab, setActiveTab] = useState('editor');
  const [selectedTemplate, setSelectedTemplate] = useState('executive');
  const [showPreview, setShowPreview] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [viewMode, setViewMode] = useState('standard');
  const [searchQuery, setSearchQuery] = useState('');
  const [reports, setReports] = useState([
    { id: 1, title: 'Monthly Sanitation Report', status: 'published', type: 'executive', progress: 100, lastModified: '2 hours ago', views: 45 },
    { id: 2, title: 'Q4 Performance Analysis', status: 'draft', type: 'analytics', progress: 75, lastModified: 'Yesterday', views: 12 },
    { id: 3, title: 'Spatial Coverage Analysis', status: 'review', type: 'spatial', progress: 60, lastModified: '3 days ago', views: 28 },
    { id: 4, title: 'Technical Infrastructure Report', status: 'published', type: 'technical', progress: 100, lastModified: '1 week ago', views: 89 },
    { id: 5, title: 'Community Health Impact', status: 'draft', type: 'research', progress: 30, lastModified: '2 weeks ago', views: 5 },
    { id: 6, title: 'Policy Recommendations Brief', status: 'scheduled', type: 'policy', progress: 90, lastModified: 'Today', views: 0 },
  ]);

  const [reportData, setReportData] = useState({
    title: 'Kibera Sanitation Intelligence Report - Q1 2024',
    type: 'executive',
    status: 'draft',
    lastModified: 'Today, 14:30',
    author: 'Research Team',
    version: '1.0',
    sections: [
      { id: 'executive', title: 'Executive Summary', content: '', completed: true },
      { id: 'data', title: 'Data Overview', content: '', completed: true },
      { id: 'analysis', title: 'Statistical Analysis', content: '', completed: false },
      { id: 'recommendations', title: 'Recommendations', content: '', completed: false },
      { id: 'methodology', title: 'Methodology', content: '', completed: true },
      { id: 'appendices', title: 'Appendices', content: '', completed: false },
    ],
    progress: 65,
    wordCount: 4567,
    charts: 8,
    maps: 3,
    tables: 5,
    collaborators: 4
  });

  const tabs = [
    { id: 'editor', icon: FileText, label: 'Editor', color: 'text-emerald-400', description: 'Create and edit reports' },
    { id: 'templates', icon: Database, label: 'Templates', color: 'text-cyan-400', description: 'Browse report templates' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', color: 'text-green-400', description: 'Report performance metrics' },
    { id: 'spatial', icon: Map, label: 'Spatial', color: 'text-teal-400', description: 'Geographic reports' },
    { id: 'scheduled', icon: Calendar, label: 'Scheduled', color: 'text-amber-400', description: 'Automated reports' },
    { id: 'archive', icon: Archive, label: 'Archive', color: 'text-purple-400', description: 'Historical reports' },
  ];

  const reportTypes = [
    { id: 'executive', label: 'Executive Summary', icon: FileText, color: 'bg-emerald-500', desc: 'High-level overview for stakeholders' },
    { id: 'analytics', label: 'Analytical Report', icon: BarChart3, color: 'bg-green-500', desc: 'Detailed statistical analysis' },
    { id: 'spatial', label: 'Spatial Analysis', icon: Map, color: 'bg-teal-500', desc: 'Geographic data visualization' },
    { id: 'technical', label: 'Technical Report', icon: Database, color: 'bg-amber-500', desc: 'In-depth technical findings' },
    { id: 'research', label: 'Research Paper', icon: FileText, color: 'bg-emerald-600', desc: 'Academic research documentation' },
    { id: 'policy', label: 'Policy Brief', icon: FileText, color: 'bg-green-600', desc: 'Policy recommendations summary' },
    { id: 'progress', label: 'Progress Report', icon: TrendingUp, color: 'bg-cyan-500', desc: 'Project progress updates' },
    { id: 'compliance', label: 'Compliance Report', icon: Shield, color: 'bg-purple-500', desc: 'Regulatory compliance documentation' },
  ];

  const viewModes = [
    { id: 'standard', label: 'Standard', icon: Eye, description: 'Balanced view' },
    { id: 'detailed', label: 'Detailed', icon: FileText, description: 'Maximum detail' },
    { id: 'compact', label: 'Compact', icon: EyeOff, description: 'Focused view' },
  ];

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsGenerating(false);
    console.log('Report generated successfully');
  };

  const handleCreateNewReport = () => {
    const newReport = {
      id: reports.length + 1,
      title: `New Report ${reports.length + 1}`,
      status: 'draft',
      type: 'executive',
      progress: 0,
      lastModified: 'Just now',
      views: 0
    };
    setReports([newReport, ...reports]);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Auto-save simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (reportData.status === 'draft') {
        console.log('Auto-saving report...');
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [reportData]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'templates':
        return <ReportTemplatesGrid darkMode={darkMode} />;
      case 'analytics':
        return <ReportsMetrics darkMode={darkMode} reports={reports} />;
      case 'scheduled':
        return <ScheduledReports darkMode={darkMode} />;
      case 'spatial':
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Globe className="h-16 w-16 text-teal-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Spatial Reports</h3>
              <p className="text-teal-300/70 max-w-md">
                Geographic and location-based reporting with interactive maps and spatial analysis.
              </p>
            </div>
          </div>
        );
      case 'archive':
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Archive className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Report Archive</h3>
              <p className="text-purple-300/70 max-w-md">
                Historical reports archive with advanced search and filtering capabilities.
              </p>
            </div>
          </div>
        );
      default:
        return (
          <ReportEditor 
            activeTab={activeTab}
            selectedTemplate={selectedTemplate}
            reportData={reportData}
            onReportDataChange={setReportData}
            darkMode={darkMode}
          />
        );
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className={`rounded-2xl p-6 border ${
            darkMode 
              ? 'glass-green-card border-emerald-500/20' 
              : 'glass-light-card border-emerald-200'
          }`}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Left Section */}
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl ${
                  darkMode ? 'bg-emerald-500/20' : 'bg-emerald-100'
                }`}>
                  <FileText className={`h-6 w-6 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                </div>
                <div>
                  <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Sanitation Intelligence Reports
                  </h1>
                  <p className={`text-sm ${darkMode ? 'text-emerald-300/70' : 'text-emerald-600/70'}`}>
                    Professional Documentation & Analytical Reporting System
                  </p>
                </div>
              </div>

              {/* Right Section - Controls */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Search Bar */}
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                    darkMode ? 'text-emerald-400' : 'text-emerald-600'
                  }`} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search reports..."
                    className={`pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                      darkMode
                        ? 'bg-emerald-900/30 text-white placeholder-emerald-400/50'
                        : 'bg-emerald-50 text-gray-900 placeholder-emerald-600/50'
                    }`}
                  />
                </div>

                {/* View Mode Selector */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 p-1 rounded-lg bg-emerald-900/10">
                    {viewModes.map((mode) => {
                      const Icon = mode.icon;
                      return (
                        <button
                          key={mode.id}
                          onClick={() => setViewMode(mode.id)}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                            viewMode === mode.id
                              ? `${darkMode ? 'bg-emerald-600/40 text-white' : 'bg-emerald-100 text-emerald-800'}`
                              : `${darkMode ? 'text-emerald-200 hover:text-white hover:bg-emerald-800/30' : 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50'}`
                          }`}
                          title={mode.description}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{mode.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      darkMode 
                        ? 'bg-emerald-800/30 text-emerald-200 hover:bg-emerald-700/40 hover:text-white' 
                        : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                    }`}
                    title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    {darkMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>

                  <button
                    onClick={handleCreateNewReport}
                    className={`p-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                      darkMode 
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                        : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="text-sm font-medium">New Report</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm ${darkMode ? 'text-emerald-200' : 'text-emerald-700'}`}>
                  Current Report Progress
                </span>
                <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {reportData.progress}%
                </span>
              </div>
              <div className={`h-2 rounded-full overflow-hidden ${
                darkMode ? 'bg-emerald-900/50' : 'bg-emerald-100'
              }`}>
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-500"
                  style={{ width: `${reportData.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className={`flex items-center space-x-1 p-1 rounded-2xl w-fit ${
            darkMode ? 'glass-green' : 'glass-light'
          }`}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-5 py-3 rounded-xl transition-all duration-300 group ${
                    activeTab === tab.id
                      ? `${darkMode 
                          ? 'bg-gradient-to-r from-emerald-600/40 to-green-500/40 text-white shadow-lg shadow-emerald-500/20' 
                          : 'bg-emerald-100 text-emerald-800 shadow-lg shadow-emerald-200/50'}`
                      : `${darkMode 
                          ? 'text-emerald-100 hover:bg-emerald-800/20' 
                          : 'text-emerald-600 hover:bg-emerald-50'}`
                  }`}
                  title={tab.description}
                >
                  <Icon className={`h-4 w-4 ${tab.color} group-hover:scale-110 transition-transform`} />
                  <span className="font-medium">{tab.label}</span>
                  {activeTab === tab.id && (
                    <ChevronRight className="h-4 w-4 opacity-70" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Templates & Stats */}
          <div className="lg:col-span-3 space-y-6">
            {/* Report Templates */}
            <div className={`rounded-2xl overflow-hidden ${
              darkMode ? 'glass-green-card' : 'glass-light-card'
            }`}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-emerald-300">Report Templates</h3>
                  <button className="text-xs text-emerald-400 hover:text-emerald-300">
                    View All
                  </button>
                </div>
                <div className="space-y-2">
                  {reportTypes.slice(0, 4).map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedTemplate(type.id)}
                      className={`w-full p-3 rounded-lg transition-all duration-300 text-left group ${
                        selectedTemplate === type.id
                          ? `${darkMode 
                              ? 'bg-emerald-600/30 border border-emerald-400/50' 
                              : 'bg-emerald-100 border border-emerald-300'}`
                          : `${darkMode 
                              ? 'bg-emerald-900/20 border border-emerald-500/10 hover:bg-emerald-800/30' 
                              : 'bg-emerald-50 border border-emerald-200 hover:bg-emerald-100'}`
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 ${type.color} rounded-lg shadow-sm`}>
                          <type.icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-sm font-medium ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {type.label}
                          </h4>
                          <p className="text-xs text-emerald-400/70 mt-1 truncate">{type.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Report Stats */}
            <div className={`rounded-2xl p-4 ${
              darkMode ? 'glass-green-card' : 'glass-light-card'
            }`}>
              <h3 className="text-sm font-semibold text-emerald-300 mb-4">Report Statistics</h3>
              <div className="space-y-3">
                {[
                  { label: 'Word Count', value: reportData.wordCount.toLocaleString(), icon: FileText, color: 'text-emerald-400' },
                  { label: 'Charts', value: reportData.charts, icon: BarChart3, color: 'text-green-400' },
                  { label: 'Maps', value: reportData.maps, icon: Map, color: 'text-teal-400' },
                  { label: 'Tables', value: reportData.tables, icon: Database, color: 'text-amber-400' },
                  { label: 'Collaborators', value: reportData.collaborators, icon: Users, color: 'text-cyan-400' },
                ].map((stat, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-emerald-900/20">
                    <div className="flex items-center space-x-3">
                      <div className={`p-1.5 rounded ${darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'}`}>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      </div>
                      <span className="text-sm text-emerald-200">{stat.label}</span>
                    </div>
                    <span className="font-semibold text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`rounded-2xl p-4 ${
              darkMode ? 'glass-green-card' : 'glass-light-card'
            }`}>
              <h3 className="text-sm font-semibold text-emerald-300 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <button className="p-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors flex flex-col items-center">
                  <Download className="h-5 w-5 text-emerald-400 mb-1" />
                  <span className="text-xs text-emerald-300">Export</span>
                </button>
                <button className="p-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors flex flex-col items-center">
                  <Share2 className="h-5 w-5 text-emerald-400 mb-1" />
                  <span className="text-xs text-emerald-300">Share</span>
                </button>
                <button className="p-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors flex flex-col items-center">
                  <Calendar className="h-5 w-5 text-emerald-400 mb-1" />
                  <span className="text-xs text-emerald-300">Schedule</span>
                </button>
                <button className="p-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors flex flex-col items-center">
                  <MessageSquare className="h-5 w-5 text-emerald-400 mb-1" />
                  <span className="text-xs text-emerald-300">Comments</span>
                </button>
              </div>
            </div>
          </div>

          {/* Center Column - Main Content */}
          <div className="lg:col-span-6">
            <div className={`rounded-2xl overflow-hidden h-full ${
              darkMode ? 'glass-green-card' : 'glass-light-card'
            }`}>
              {/* Tab Header */}
              <div className="p-4 border-b border-emerald-500/20 bg-emerald-900/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {tabs.find(t => t.id === activeTab) && (() => {
                      const Icon = tabs.find(t => t.id === activeTab).icon;
                      return (
                        <>
                          <Icon className="h-5 w-5 text-emerald-400" />
                          <h2 className="text-lg font-bold text-white">
                            {tabs.find(t => t.id === activeTab).label}
                          </h2>
                        </>
                      );
                    })()}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 text-sm text-emerald-400">
                      <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span>Auto-saving</span>
                    </div>
                    {activeTab === 'editor' && (
                      <button
                        onClick={handleGenerateReport}
                        disabled={isGenerating}
                        className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                          darkMode
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {isGenerating ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <FileCheck className="h-4 w-4" />
                        )}
                        <span className="font-medium">
                          {isGenerating ? 'Generating...' : 'Generate'}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              <div className="h-[calc(100%-4rem)]">
                {renderTabContent()}
              </div>
            </div>
          </div>

          {/* Right Column - Preview & Recent Reports */}
          <div className="lg:col-span-3 space-y-6">
            {showPreview ? (
              <div className={`rounded-2xl overflow-hidden ${
                darkMode ? 'glass-green-card' : 'glass-light-card'
              }`}>
                <PreviewPanel 
                  onClose={() => setShowPreview(false)}
                  reportData={reportData}
                  selectedTemplate={selectedTemplate}
                  darkMode={darkMode}
                />
              </div>
            ) : (
              <>
                {/* Recent Reports */}
                <div className={`rounded-2xl p-4 ${
                  darkMode ? 'glass-green-card' : 'glass-light-card'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-emerald-300">Recent Reports</h3>
                    <button 
                      onClick={() => setShowPreview(true)}
                      className="text-xs text-emerald-400 hover:text-emerald-300"
                    >
                      Show Preview
                    </button>
                  </div>
                  <div className="space-y-3">
                    {reports.slice(0, 5).map((report) => (
                      <div 
                        key={report.id}
                        className="p-3 rounded-lg bg-emerald-900/20 hover:bg-emerald-900/30 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`h-2 w-2 rounded-full ${
                              report.status === 'published' ? 'bg-green-500' :
                              report.status === 'draft' ? 'bg-amber-500' :
                              report.status === 'review' ? 'bg-blue-500' : 'bg-purple-500'
                            }`}></div>
                            <span className="text-sm text-emerald-300 group-hover:text-white truncate">
                              {report.title}
                            </span>
                          </div>
                          <MoreVertical className="h-4 w-4 text-emerald-400/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="text-xs text-emerald-400/70">{report.lastModified}</div>
                          <div className="text-xs text-emerald-400">
                            {report.progress}% • {report.views} views
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Overview */}
                <div className={`rounded-2xl p-4 ${
                  darkMode ? 'glass-green-card' : 'glass-light-card'
                }`}>
                  <h3 className="text-sm font-semibold text-emerald-300 mb-4">Status Overview</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Published', count: 2, color: 'bg-green-500' },
                      { label: 'Draft', count: 3, color: 'bg-amber-500' },
                      { label: 'In Review', count: 1, color: 'bg-blue-500' },
                      { label: 'Scheduled', count: 1, color: 'bg-purple-500' },
                    ].map((status, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`h-2 w-2 rounded-full ${status.color}`}></div>
                          <span className="text-sm text-emerald-200">{status.label}</span>
                        </div>
                        <span className="text-sm font-semibold text-white">{status.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6">
          <div className={`rounded-xl p-4 ${
            darkMode ? 'glass-green' : 'glass-light'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <Download className="h-4 w-4 text-emerald-400" />
                  <span className={`text-sm font-medium ${darkMode ? 'text-emerald-200' : 'text-emerald-700'}`}>
                    Export PDF
                  </span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <Calendar className="h-4 w-4 text-emerald-400" />
                  <span className={`text-sm font-medium ${darkMode ? 'text-emerald-200' : 'text-emerald-700'}`}>
                    Schedule Report
                  </span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <Bell className="h-4 w-4 text-emerald-400" />
                  <span className={`text-sm font-medium ${darkMode ? 'text-emerald-200' : 'text-emerald-700'}`}>
                    Set Reminders
                  </span>
                </button>
              </div>
              
              <div className={`text-sm ${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>
                Last saved: <span className="font-medium">{reportData.lastModified}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;