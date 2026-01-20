import React, { useState } from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import SummaryMetrics from '../components/dashboard/SummaryMetrics';
import InfrastructureStatus from '../components/dashboard/InfrastructureStatus';
import MonitoringPanel from '../components/dashboard/MonitoringPanel';
import KPIPanel from '../components/dashboard/KPIPanel';
import GeographicDistribution from '../components/dashboard/GeographicDistribution';
import AlertsPanel from '../components/dashboard/AlertsPanel';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivity from '../components/dashboard/RecentActivity';
import IntegrationStatus from '../components/dashboard/IntegrationStatus';
import PredictiveAnalytics from '../components/dashboard/PredictiveAnalytics';

function Dashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeZone, setActiveZone] = useState('all');

  return (
    <div className="text-white pb-8">
      <DashboardHeader 
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        activeZone={activeZone}
        setActiveZone={setActiveZone}
      />
      
      <SummaryMetrics />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InfrastructureStatus />
            <MonitoringPanel />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <KPIPanel />
            <GeographicDistribution />
          </div>
          
          <QuickActions />
        </div>
        
        {/* Right Column */}
        <div className="space-y-8">
          <AlertsPanel />
          <RecentActivity />
          <IntegrationStatus />
          <PredictiveAnalytics />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;