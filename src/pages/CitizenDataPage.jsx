import React, { useState, useEffect } from 'react';
import CitizenToolbar from '../components/citizen/CitizenToolbar';
import ReportMap from '../components/citizen/reports/ReportMap';
import ReportList from '../components/citizen/reports/ReportList';
import ReportDetails from '../components/citizen/reports/ReportDetails';
import CommunityForum from '../components/citizen/community/CommunityForum';
import EngagementAnalytics from '../components/citizen/analytics/EngagementAnalytics';
import CommunicationPanel from '../components/citizen/communication/CommunicationPanel';
import CitizenMetrics from '../components/citizen/CitizenMetrics';
import IssueTrends from '../components/citizen/IssueTrends';
import { 
  Users, MessageSquare, BarChart3, Bell, Map, TrendingUp, AlertCircle, CheckCircle, Clock,
  Shield, Target, Award, Eye, Download, Filter, Search, RefreshCw, Settings,
  FileText, Globe, Home, Phone, Mail, Calendar, UserPlus, Activity,
  Zap, Heart, Star, TrendingDown, Cpu, Database, PieChart, LineChart
} from 'lucide-react';

function CitizenDataPage() {
  const [activeTab, setActiveTab] = useState('reports');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');
  const [activeZone, setActiveZone] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);

  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    dateRange: '30d',
    zone: 'all',
    priority: 'all'
  });

  const tabs = [
    { id: 'reports', icon: MessageSquare, label: 'Reports', color: 'text-emerald-400', description: 'Citizen feedback and issues' },
    { id: 'community', icon: Users, label: 'Community', color: 'text-green-400', description: 'Forums and discussions' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', color: 'text-teal-400', description: 'Engagement metrics' },
    { id: 'map', icon: Map, label: 'Map View', color: 'text-amber-400', description: 'Geographic visualization' },
    { id: 'trends', icon: TrendingUp, label: 'Trends', color: 'text-cyan-400', description: 'Pattern analysis' },
    { id: 'response', icon: Clock, label: 'Response', color: 'text-blue-400', description: 'Service metrics' },
  ];

  const zones = [
    { id: 'all', label: 'All Zones', color: 'bg-emerald-500' },
    { id: 'north', label: 'North Zone', color: 'bg-green-500' },
    { id: 'south', label: 'South Zone', color: 'bg-teal-500' },
    { id: 'east', label: 'East Zone', color: 'bg-amber-500' },
    { id: 'west', label: 'West Zone', color: 'bg-emerald-600' },
  ];

  const timeRanges = [
    { id: '1d', label: 'Today' },
    { id: '7d', label: 'Week' },
    { id: '30d', label: 'Month' },
    { id: '90d', label: 'Quarter' },
  ];

  // Auto-refresh effect
  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        console.log('Auto-refreshing citizen data...');
      }, 30000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmitReport = () => {
    console.log('Opening report submission form...');
  };

  const handleExportData = () => {
    console.log('Exporting citizen data...');
  };

  const handleRefreshData = () => {
    console.log('Refreshing data...');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'community':
        return (
          <div className="h-full flex flex-col">
            <div className={`p-6 border-b ${
              darkMode ? 'border-emerald-500/20' : 'border-emerald-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Community Forum</h2>
                  <p className="text-sm text-emerald-300/70">Active discussions and community engagement</p>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm font-medium">New Discussion</span>
                </button>
              </div>
            </div>
            <div className="flex-1 p-6">
              <CommunityForum darkMode={darkMode} />
            </div>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="h-full flex flex-col">
            <div className={`p-6 border-b ${
              darkMode ? 'border-emerald-500/20' : 'border-emerald-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Engagement Analytics</h2>
                  <p className="text-sm text-emerald-300/70">Citizen participation and feedback analysis</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Download className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm text-emerald-300">Export Report</span>
                </div>
              </div>
            </div>
            <div className="flex-1 p-6">
              <EngagementAnalytics darkMode={darkMode} />
            </div>
          </div>
        );
      
      case 'map':
        return (
          <div className="h-full flex flex-col">
            <div className={`p-6 border-b ${
              darkMode ? 'border-emerald-500/20' : 'border-emerald-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Geographic Dashboard</h2>
                  <p className="text-sm text-emerald-300/70">Interactive map visualization of citizen reports</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm text-emerald-300">Live Tracking</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <ReportMap 
                onReportSelect={(report) => {
                  setSelectedReport(report);
                  setShowDetails(true);
                }}
                darkMode={darkMode}
              />
            </div>
          </div>
        );
      
      case 'trends':
        return (
          <div className="h-full flex flex-col">
            <div className={`p-6 border-b ${
              darkMode ? 'border-emerald-500/20' : 'border-emerald-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Issue Trends</h2>
                  <p className="text-sm text-emerald-300/70">Pattern analysis and predictive insights</p>
                </div>
              </div>
            </div>
            <div className="flex-1 p-6">
              <IssueTrends darkMode={darkMode} />
            </div>
          </div>
        );
      
      case 'response':
        return (
          <div className="h-full flex flex-col">
            <div className={`p-6 border-b ${
              darkMode ? 'border-emerald-500/20' : 'border-emerald-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Response Metrics</h2>
                  <p className="text-sm text-emerald-300/70">Service performance and resolution times</p>
                </div>
              </div>
            </div>
            <div className="flex-1 p-6">
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Clock className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Response Analytics</h3>
                  <p className="text-blue-300/70 max-w-md">
                    Track resolution times, service level agreements, and response team performance metrics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      
      default: // reports
        if (showDetails && selectedReport) {
          return (
            <ReportDetails 
              report={selectedReport}
              onBack={() => setShowDetails(false)}
              darkMode={darkMode}
            />
          );
        } else {
          return (
            <div className="h-full flex flex-col">
              <div className={`p-6 border-b ${
                darkMode ? 'border-emerald-500/20' : 'border-emerald-200'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">Citizen Reports</h2>
                    <p className="text-sm text-emerald-300/70">Community feedback and issue tracking</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-emerald-400" />
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters({...filters, status: e.target.value})}
                      className={`px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                        darkMode
                          ? 'bg-emerald-900/30 text-white'
                          : 'bg-emerald-50 text-gray-900'
                      }`}
                    >
                      <option value="all">All Status</option>
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <ReportList 
                  onReportSelect={(report) => {
                    setSelectedReport(report);
                    setShowDetails(true);
                  }}
                  filters={filters}
                  darkMode={darkMode}
                />
              </div>
            </div>
          );
        }
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
        <div className="mb-6">
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
                  <Users className={`h-6 w-6 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                </div>
                <div>
                  <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Citizen Engagement Intelligence
                  </h1>
                  <p className={`text-sm ${darkMode ? 'text-emerald-300/70' : 'text-emerald-600/70'}`}>
                    Community Feedback & Real-time Monitoring System
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
                    placeholder="Search reports, discussions, or citizens..."
                    className={`pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                      darkMode
                        ? 'bg-emerald-900/30 text-white placeholder-emerald-400/50'
                        : 'bg-emerald-50 text-gray-900 placeholder-emerald-600/50'
                    }`}
                  />
                </div>

                {/* Zone Selector */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 p-1 rounded-lg bg-emerald-900/10">
                    {zones.map((zone) => (
                      <button
                        key={zone.id}
                        onClick={() => setActiveZone(zone.id)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                          activeZone === zone.id
                            ? `${darkMode ? 'bg-emerald-600/40 text-white' : 'bg-emerald-100 text-emerald-800'}`
                            : `${darkMode ? 'text-emerald-200 hover:text-white hover:bg-emerald-800/30' : 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50'}`
                        }`}
                      >
                        <div className={`h-2 w-2 rounded-full ${zone.color}`}></div>
                        <span>{zone.label}</span>
                      </button>
                    ))}
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
                    {darkMode ? <Eye className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>

                  <button
                    onClick={handleRefreshData}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      darkMode 
                        ? 'bg-emerald-800/30 text-emerald-200 hover:bg-emerald-700/40 hover:text-white' 
                        : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                    }`}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>

                  <button
                    onClick={handleSubmitReport}
                    className={`p-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                      darkMode 
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                        : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                    }`}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-sm font-medium">Submit Report</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Status Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className={`text-xs ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      Live Updates Active
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3 text-emerald-400" />
                    <span className={`text-xs ${darkMode ? 'text-emerald-400/70' : 'text-emerald-600/70'}`}>
                      1,250 Active Citizens
                    </span>
                  </div>
                </div>
                
                {/* Auto Refresh Toggle */}
                <div className="flex items-center space-x-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoRefresh}
                      onChange={() => setAutoRefresh(!autoRefresh)}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 rounded-full peer ${
                      darkMode 
                        ? 'bg-gray-700 peer-checked:bg-emerald-600' 
                        : 'bg-gray-300 peer-checked:bg-emerald-400'
                    } peer-focus:ring-4 peer-focus:ring-emerald-300/30`}>
                      <div className={`absolute top-0.5 left-0.5 bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform ${
                        autoRefresh ? 'translate-x-5' : ''
                      }`}></div>
                    </div>
                    <span className={`ml-2 text-sm ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Auto-refresh
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Dashboard */}
        <div className="mb-6">
          <CitizenMetrics 
            darkMode={darkMode}
            timeRange={timeRange}
            activeZone={activeZone}
          />
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className={`flex items-center space-x-1 p-1 rounded-2xl ${
            darkMode ? 'glass-green' : 'glass-light'
          }`}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setShowDetails(false);
                  }}
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
                    <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Reports List */}
          <div className="lg:col-span-3">
            <div className={`rounded-2xl overflow-hidden h-full ${
              darkMode ? 'glass-green-card' : 'glass-light-card'
            }`}>
              <div className="p-4 border-b border-emerald-500/20">
                <h3 className="text-sm font-semibold text-emerald-300">Recent Reports</h3>
              </div>
              <div className="h-[calc(100%-4rem)]">
                <ReportList 
                  onReportSelect={(report) => {
                    setSelectedReport(report);
                    setShowDetails(true);
                    setActiveTab('reports');
                  }}
                  filters={filters}
                  darkMode={darkMode}
                  compact={true}
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`mt-6 rounded-2xl p-4 ${
              darkMode ? 'glass-green-card' : 'glass-light-card'
            }`}>
              <h3 className="text-sm font-semibold text-emerald-300 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between px-3 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg transition-colors">
                  <span className="text-sm text-emerald-200">Export Data</span>
                  <Download className="h-4 w-4 text-emerald-400" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg transition-colors">
                  <span className="text-sm text-emerald-200">Share Dashboard</span>
                  <Users className="h-4 w-4 text-emerald-400" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg transition-colors">
                  <span className="text-sm text-emerald-200">Settings</span>
                  <Settings className="h-4 w-4 text-emerald-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Center Column - Main Content */}
          <div className="lg:col-span-6">
            <div className={`rounded-2xl overflow-hidden h-full ${
              darkMode ? 'glass-green-card' : 'glass-light-card'
            }`}>
              {renderTabContent()}
            </div>
          </div>

          {/* Right Column - Communication & Stats */}
          <div className="lg:col-span-3 space-y-6">
            {/* Communication Panel */}
            <div className={`rounded-2xl overflow-hidden ${
              darkMode ? 'glass-green-card' : 'glass-light-card'
            }`}>
              <CommunicationPanel darkMode={darkMode} />
            </div>

            {/* Community Stats */}
            <div className={`rounded-2xl p-4 ${
              darkMode ? 'glass-green-card' : 'glass-light-card'
            }`}>
              <h3 className="text-sm font-semibold text-emerald-300 mb-4">Community Health</h3>
              <div className="space-y-3">
                {[
                  { label: 'Satisfaction', value: '4.3/5', change: '+0.2', trend: 'up', icon: Star, color: 'text-amber-400' },
                  { label: 'Engagement', value: '78%', change: '+5%', trend: 'up', icon: Heart, color: 'text-rose-400' },
                  { label: 'Response Time', value: '2.8h', change: '-0.5h', trend: 'down', icon: Clock, color: 'text-green-400' },
                  { label: 'Resolution Rate', value: '92%', change: '+3%', trend: 'up', icon: CheckCircle, color: 'text-emerald-400' },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-emerald-900/20">
                      <div className="flex items-center space-x-3">
                        <Icon className={`h-4 w-4 ${stat.color}`} />
                        <span className="text-sm text-emerald-200">{stat.label}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-white">{stat.value}</div>
                        <div className={`text-xs ${
                          stat.trend === 'up' ? 'text-green-400' : 'text-amber-400'
                        }`}>
                          {stat.change}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Issues */}
            <div className={`rounded-2xl p-4 ${
              darkMode ? 'glass-green-card' : 'glass-light-card'
            }`}>
              <h3 className="text-sm font-semibold text-emerald-300 mb-4">Trending Issues</h3>
              <div className="space-y-3">
                {[
                  { issue: 'Water Supply', count: 324, trend: 'rising', color: 'bg-red-500' },
                  { issue: 'Sanitation', count: 287, trend: 'stable', color: 'bg-green-500' },
                  { issue: 'Waste Management', count: 198, trend: 'rising', color: 'bg-amber-500' },
                  { issue: 'Infrastructure', count: 156, trend: 'stable', color: 'bg-blue-500' },
                  { issue: 'Health Services', count: 124, trend: 'declining', color: 'bg-purple-500' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between group hover:bg-emerald-900/20 p-2 rounded-lg transition-colors">
                    <div className="flex items-center space-x-2">
                      <div className={`h-2 w-2 rounded-full ${item.color}`}></div>
                      <span className="text-sm text-emerald-200 group-hover:text-white">{item.issue}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-white">{item.count}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        item.trend === 'rising' ? 'bg-red-500/20 text-red-400' :
                        item.trend === 'declining' ? 'bg-green-500/20 text-green-400' :
                        'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {item.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-emerald-500/20 bg-gray-900/95 backdrop-blur-lg">
          <div className="flex justify-around items-center p-3">
            {tabs.slice(0, 4).map((tab) => {
              const Icon = tab.icon;
              return (
                <button 
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setShowDetails(false);
                  }}
                  className="flex flex-col items-center space-y-1 p-2"
                >
                  <Icon className={`h-5 w-5 ${
                    activeTab === tab.id ? 'text-emerald-400' : 'text-emerald-400/50'
                  }`} />
                  <span className="text-xs text-gray-400">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CitizenDataPage;