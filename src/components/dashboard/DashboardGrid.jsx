import React from 'react';
import InfrastructureStatus from './InfrastructureStatus';
import MonitoringPanel from './MonitoringPanel';
import PerformanceTrends from './PerformanceTrends';
import ResourceUtilization from './ResourceUtilization';
import GeographicDistribution from './GeographicDistribution';
import KPIPanel from './KPIPanel';
import QuickActions from './QuickActions';
import ZoneOverview from './ZoneOverview';
import AlertsPanel from './AlertsPanel';
import RecentActivity from './RecentActivity';
import IntegrationStatus from './IntegrationStatus';
import PredictiveAnalytics from './PredictiveAnalytics';

const DashboardGrid = ({ 
  activeZone, 
  timeRange, 
  viewMode, 
  darkMode,
  onCollaborationOpen 
}) => {
  const isCompact = viewMode === 'compact';
  const isDetailed = viewMode === 'detailed';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column - Main Content */}
      <div className={`${isCompact ? 'lg:col-span-9' : 'lg:col-span-8'} space-y-6`}>
        {/* Top Row */}
        <div className={`grid gap-6 ${isCompact ? 'grid-cols-1' : 'grid-cols-1 xl:grid-cols-2'}`}>
          <div className={`rounded-2xl overflow-hidden ${
            darkMode ? 'glass-green-card' : 'glass-light-card'
          }`}>
            <InfrastructureStatus activeZone={activeZone} darkMode={darkMode} />
          </div>
          <div className={`rounded-2xl overflow-hidden ${
            darkMode ? 'glass-green-card' : 'glass-light-card'
          }`}>
            <MonitoringPanel timeRange={timeRange} darkMode={darkMode} />
          </div>
        </div>

        {/* Middle Row */}
        <div className={`grid gap-6 ${isCompact ? 'grid-cols-1' : 'grid-cols-1 xl:grid-cols-3'}`}>
          <div className={`${isCompact ? 'xl:col-span-2' : 'xl:col-span-2'} rounded-2xl overflow-hidden ${
            darkMode ? 'glass-green-card' : 'glass-light-card'
          }`}>
            <PerformanceTrends timeRange={timeRange} activeZone={activeZone} darkMode={darkMode} />
          </div>
          <div className={`rounded-2xl overflow-hidden ${
            darkMode ? 'glass-green-card' : 'glass-light-card'
          }`}>
            <ResourceUtilization activeZone={activeZone} darkMode={darkMode} />
          </div>
        </div>

        {/* Bottom Row */}
        <div className={`grid gap-6 ${isCompact ? 'grid-cols-1' : 'grid-cols-1 xl:grid-cols-2'}`}>
          <div className={`rounded-2xl overflow-hidden ${
            darkMode ? 'glass-green-card' : 'glass-light-card'
          }`}>
            <GeographicDistribution activeZone={activeZone} darkMode={darkMode} />
          </div>
          <div className={`rounded-2xl overflow-hidden ${
            darkMode ? 'glass-green-card' : 'glass-light-card'
          }`}>
            <KPIPanel timeRange={timeRange} darkMode={darkMode} />
          </div>
        </div>

        {/* Quick Actions */}
        {!isCompact && (
          <div className={`rounded-2xl overflow-hidden ${
            darkMode ? 'glass-green-card' : 'glass-light-card'
          }`}>
            <QuickActions darkMode={darkMode} onCollaborationOpen={onCollaborationOpen} />
          </div>
        )}
      </div>

      {/* Right Column - Sidebar */}
      <div className={`${isCompact ? 'lg:col-span-3' : 'lg:col-span-4'} space-y-6`}>
        {/* Zone Overview */}
        <div className={`rounded-2xl overflow-hidden ${
          darkMode ? 'glass-green-card' : 'glass-light-card'
        }`}>
          <ZoneOverview activeZone={activeZone} darkMode={darkMode} />
        </div>

        {/* Alerts Panel */}
        <div className={`rounded-2xl overflow-hidden ${
          darkMode ? 'glass-green-card' : 'glass-light-card'
        }`}>
          <AlertsPanel darkMode={darkMode} />
        </div>

        {/* Recent Activity */}
        <div className={`rounded-2xl overflow-hidden ${
          darkMode ? 'glass-green-card' : 'glass-light-card'
        }`}>
          <RecentActivity darkMode={darkMode} />
        </div>

        {/* Integration Status */}
        <div className={`rounded-2xl overflow-hidden ${
          darkMode ? 'glass-green-card' : 'glass-light-card'
        }`}>
          <IntegrationStatus darkMode={darkMode} />
        </div>

        {/* Predictive Analytics */}
        <div className={`rounded-2xl overflow-hidden ${
          darkMode ? 'glass-green-card' : 'glass-light-card'
        }`}>
          <PredictiveAnalytics darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
};

export default DashboardGrid;