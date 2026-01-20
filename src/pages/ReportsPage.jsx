import React, { useState } from 'react';
import ReportToolbar from '../components/reports/ReportToolbar';
import ReportSidebar from '../components/reports/ReportSidebar';
import ReportEditor from '../components/reports/editor/ReportEditor';
import PreviewPanel from '../components/reports/PreviewPanel';
import { FileText, BarChart3, Map, TrendingUp, Database } from 'lucide-react';

function ReportsPage() {
  const [activeTab, setActiveTab] = useState('editor');
  const [selectedTemplate, setSelectedTemplate] = useState('executive');
  const [reportData, setReportData] = useState({
    title: 'Monthly Sanitation Report',
    type: 'analytics',
    status: 'draft',
    lastModified: 'Today, 14:30',
    author: 'Research Team',
    version: '1.0',
    sections: []
  });
  const [showPreview, setShowPreview] = useState(true);

  const tabs = [
    { id: 'editor', icon: FileText, label: 'Editor', color: 'text-blue-500' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', color: 'text-purple-500' },
    { id: 'spatial', icon: Map, label: 'Spatial', color: 'text-green-500' },
    { id: 'scheduled', icon: TrendingUp, label: 'Scheduled', color: 'text-amber-500' },
    { id: 'templates', icon: Database, label: 'Templates', color: 'text-cyan-500' },
  ];

  const reportTypes = [
    { id: 'executive', label: 'Executive Summary', icon: FileText, color: 'text-blue-500' },
    { id: 'analytics', label: 'Analytical Report', icon: BarChart3, color: 'text-purple-500' },
    { id: 'spatial', label: 'Spatial Analysis', icon: Map, color: 'text-green-500' },
    { id: 'technical', label: 'Technical Report', icon: Database, color: 'text-amber-500' },
    { id: 'research', label: 'Research Paper', icon: FileText, color: 'text-red-500' },
    { id: 'policy', label: 'Policy Brief', icon: FileText, color: 'text-indigo-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="glass-effect fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl rounded-full p-3">
        <div className="flex items-center justify-between px-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Professional Reporting System</h1>
              <p className="text-xs text-white/70">Research-Grade Documentation & Analytics</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-300">
              Drafting: <span className="text-white font-semibold">{reportData.title}</span>
            </div>
            <button className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full hover:shadow-lg">
              <span>Generate Report</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-28 px-4 pb-4">
        <ReportToolbar 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={tabs}
          reportData={reportData}
          onGenerate={() => console.log('Generate report')}
          onExport={() => console.log('Export report')}
          onSchedule={() => console.log('Schedule report')}
        />

        <div className="flex h-[calc(100vh-12rem)] gap-4">
          {/* Left Sidebar */}
          <ReportSidebar 
            reportTypes={reportTypes}
            selectedTemplate={selectedTemplate}
            onTemplateSelect={setSelectedTemplate}
            reportData={reportData}
          />

          {/* Main Editor Area */}
          <div className="flex-1 flex flex-col">
            <ReportEditor 
              activeTab={activeTab}
              selectedTemplate={selectedTemplate}
              reportData={reportData}
              onReportDataChange={setReportData}
            />
          </div>

          {/* Right Preview Panel */}
          {showPreview && (
            <PreviewPanel 
              onClose={() => setShowPreview(false)}
              reportData={reportData}
              selectedTemplate={selectedTemplate}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;