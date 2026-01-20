import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import SpatialViewPage from './pages/SpatialViewPage';
import AnalyticsPage from './pages/AnalyticsPage';
import CitizenDataPage from './pages/CitizenDataPage';
import ReportingPage from './pages/ReportsPage';  

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/spatial-view" element={<SpatialViewPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/citizen" element={<CitizenDataPage />} />
          <Route path="/reports" element={<ReportingPage />} />
          
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;