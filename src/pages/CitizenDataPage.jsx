import React, { useState } from 'react';
import CitizenToolbar from '../components/citizen/CitizenToolbar';
import ReportMap from '../components/citizen/reports/ReportMap';
import ReportList from '../components/citizen/reports/ReportList';
import ReportDetails from '../components/citizen/reports/ReportDetails';
import CommunityForum from '../components/citizen/community/CommunityForum';
import EngagementAnalytics from '../components/citizen/analytics/EngagementAnalytics';
import CommunicationPanel from '../components/citizen/communication/CommunicationPanel';
import { Users, MessageSquare, BarChart3, Bell, Map } from 'lucide-react';

function CitizenDataPage() {
  const [activeTab, setActiveTab] = useState('reports');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    dateRange: '30d',
    zone: 'all'
  });

  const tabs = [
    { id: 'reports', icon: MessageSquare, label: 'Reports', color: 'text-blue-500' },
    { id: 'community', icon: Users, label: 'Community', color: 'text-green-500' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', color: 'text-purple-500' },
    { id: 'map', icon: Map, label: 'Map View', color: 'text-amber-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="glass-effect fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl rounded-full p-3">
        <div className="flex items-center justify-between px-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Citizen Data Platform</h1>
              <p className="text-xs text-white/70">Community Engagement & Feedback System</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">
              <Bell className="h-4 w-4" />
              <span>New Campaign</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full hover:shadow-lg">
              <span>Submit Report</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-28 px-4 pb-4">
        <CitizenToolbar 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={tabs}
          filters={filters}
          onFilterChange={setFilters}
        />

        <div className="flex h-[calc(100vh-12rem)] gap-4">
          {/* Left Sidebar */}
          <div className="w-80">
            {activeTab === 'reports' && (
              <ReportList 
                onReportSelect={(report) => {
                  setSelectedReport(report);
                  setShowDetails(true);
                }}
                filters={filters}
              />
            )}
            {activeTab === 'community' && (
              <CommunityForum />
            )}
            {activeTab === 'analytics' && (
              <EngagementAnalytics />
            )}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {activeTab === 'map' ? (
              <div className="flex-1 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <ReportMap 
                  onReportSelect={(report) => {
                    setSelectedReport(report);
                    setShowDetails(true);
                  }}
                />
              </div>
            ) : (
              <div className="flex-1 glass-effect rounded-2xl p-6 overflow-y-auto">
                <div className="h-full">
                  {activeTab === 'reports' && !showDetails && (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <MessageSquare className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Select a Report</h3>
                        <p className="text-gray-400">Choose a report from the list to view details</p>
                      </div>
                    </div>
                  )}
                  {activeTab === 'reports' && showDetails && selectedReport && (
                    <ReportDetails 
                      report={selectedReport}
                      onBack={() => setShowDetails(false)}
                    />
                  )}
                  {activeTab === 'community' && (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <Users className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Community Hub</h3>
                        <p className="text-gray-400">Community discussions and engagement tools</p>
                      </div>
                    </div>
                  )}
                  {activeTab === 'analytics' && (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Engagement Analytics</h3>
                        <p className="text-gray-400">Community participation and feedback analysis</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Bottom Panel for Communication */}
            <CommunicationPanel />
          </div>

          {/* Right Panel - Quick Stats */}
          <div className="w-80 glass-effect rounded-2xl p-6">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white">Community Snapshot</h3>
              <p className="text-sm text-gray-400 mt-1">Real-time engagement metrics</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">1,250</div>
                    <div className="text-sm text-gray-400">Active Reporters</div>
                  </div>
                  <div className="text-green-400 text-sm font-medium">+12%</div>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">5,430</div>
                    <div className="text-sm text-gray-400">Reports Submitted</div>
                  </div>
                  <div className="text-blue-400 text-sm font-medium">89% resolved</div>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">4.3/5</div>
                    <div className="text-sm text-gray-400">Satisfaction Score</div>
                  </div>
                  <div className="text-amber-400 text-sm font-medium">+0.3</div>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">3.2 days</div>
                    <div className="text-sm text-gray-400">Avg. Resolution Time</div>
                  </div>
                  <div className="text-green-400 text-sm font-medium">-1.1 days</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <h4 className="font-semibold text-white mb-3">Top Issues</h4>
              <div className="space-y-2">
                {[
                  { issue: 'Water Supply', count: 320, trend: 'up' },
                  { issue: 'Sanitation', count: 280, trend: 'down' },
                  { issue: 'Waste Collection', count: 195, trend: 'up' },
                  { issue: 'Drainage', count: 150, trend: 'stable' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{item.issue}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{item.count}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        item.trend === 'up' ? 'bg-red-500/20 text-red-400' :
                        item.trend === 'down' ? 'bg-green-500/20 text-green-400' :
                        'bg-gray-500/20 text-gray-400'
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
      </div>
    </div>
  );
}

export default CitizenDataPage;