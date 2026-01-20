import React, { useState } from 'react';
import { 
  FileText, BarChart3, Map, Database, 
  Calendar, Users, Settings, Folder,
  ChevronRight, Star, Clock, CheckCircle,
  Download, Share2, Eye
} from 'lucide-react';

function ReportSidebar({ reportTypes, selectedTemplate, onTemplateSelect, reportData }) {
  const [expandedSections, setExpandedSections] = useState(['templates', 'recent']);

  const toggleSection = (section) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const templates = [
    { id: 'executive', label: 'Executive Summary', icon: FileText, color: 'text-blue-500', starred: true, uses: 245 },
    { id: 'analytics', label: 'Analytical Report', icon: BarChart3, color: 'text-purple-500', starred: true, uses: 189 },
    { id: 'spatial', label: 'Spatial Analysis', icon: Map, color: 'text-green-500', starred: false, uses: 156 },
    { id: 'technical', label: 'Technical Report', icon: Database, color: 'text-amber-500', starred: false, uses: 98 },
    { id: 'research', label: 'Research Paper', icon: FileText, color: 'text-red-500', starred: true, uses: 76 },
    { id: 'policy', label: 'Policy Brief', icon: FileText, color: 'text-indigo-500', starred: false, uses: 112 },
  ];

  const recentReports = [
    { id: 1, title: 'Monthly Sanitation Report', date: 'Today, 10:30', status: 'draft' },
    { id: 2, title: 'Water Quality Analysis', date: 'Yesterday, 14:20', status: 'published' },
    { id: 3, title: 'Infrastructure Assessment', date: 'Jan 19, 09:15', status: 'archived' },
    { id: 4, title: 'Community Feedback Summary', date: 'Jan 18, 16:45', status: 'published' },
  ];

  const scheduledReports = [
    { id: 1, title: 'Weekly Performance', schedule: 'Every Monday', next: 'Tomorrow, 08:00' },
    { id: 2, title: 'Monthly Analytics', schedule: '1st of month', next: 'Feb 1, 00:00' },
    { id: 3, title: 'Quarterly Review', schedule: 'Quarterly', next: 'Mar 31, 23:59' },
  ];

  return (
    <div className="w-80 glass-effect rounded-2xl p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white">Report Library</h2>
        <button className="p-2 text-gray-400 hover:text-white">
          <Settings className="h-4 w-4" />
        </button>
      </div>

      {/* Template Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-gray-300">
            <Folder className="h-4 w-4" />
            <h3 className="font-semibold text-sm">Templates</h3>
          </div>
          <button 
            onClick={() => toggleSection('templates')}
            className="p-1 text-gray-400 hover:text-white"
          >
            <ChevronRight className={`h-4 w-4 transition-transform ${
              expandedSections.includes('templates') ? 'rotate-90' : ''
            }`} />
          </button>
        </div>
        
        {expandedSections.includes('templates') && (
          <div className="space-y-2">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => onTemplateSelect(template.id)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  selectedTemplate === template.id
                    ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-white/20'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <template.icon className={`h-4 w-4 ${template.color}`} />
                    <span className="text-sm text-white">{template.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {template.starred && <Star className="h-3 w-3 text-amber-400" />}
                    <span className="text-xs text-gray-400">{template.uses} uses</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Recent Reports */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-gray-300">
            <Clock className="h-4 w-4" />
            <h3 className="font-semibold text-sm">Recent Reports</h3>
          </div>
          <button 
            onClick={() => toggleSection('recent')}
            className="p-1 text-gray-400 hover:text-white"
          >
            <ChevronRight className={`h-4 w-4 transition-transform ${
              expandedSections.includes('recent') ? 'rotate-90' : ''
            }`} />
          </button>
        </div>
        
        {expandedSections.includes('recent') && (
          <div className="space-y-2">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5">
                <div className="flex items-center space-x-3">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="text-sm text-white">{report.title}</div>
                    <div className="text-xs text-gray-400">{report.date}</div>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  report.status === 'draft' ? 'bg-amber-500/20 text-amber-400' :
                  report.status === 'published' ? 'bg-green-500/20 text-green-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {report.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scheduled Reports */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 text-gray-300 mb-3">
          <Calendar className="h-4 w-4" />
          <h3 className="font-semibold text-sm">Scheduled Reports</h3>
        </div>
        
        <div className="space-y-2">
          {scheduledReports.map((report) => (
            <div key={report.id} className="p-3 rounded-lg bg-white/5">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-white">{report.title}</div>
                <CheckCircle className="h-4 w-4 text-green-400" />
              </div>
              <div className="text-xs text-gray-400 space-y-1">
                <div>Schedule: {report.schedule}</div>
                <div>Next: {report.next}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Report Info */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <h3 className="font-semibold text-white mb-4">Current Report</h3>
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
            <div className="text-sm font-medium text-white mb-1">{reportData.title}</div>
            <div className="text-xs text-indigo-300 space-y-1">
              <div>Type: {reportData.type}</div>
              <div>Author: {reportData.author}</div>
              <div>Version: {reportData.version}</div>
              <div>Modified: {reportData.lastModified}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button className="flex flex-col items-center p-2 text-gray-400 hover:text-white">
              <Eye className="h-4 w-4 mb-1" />
              <span className="text-xs">Preview</span>
            </button>
            <button className="flex flex-col items-center p-2 text-gray-400 hover:text-white">
              <Download className="h-4 w-4 mb-1" />
              <span className="text-xs">Export</span>
            </button>
            <button className="flex flex-col items-center p-2 text-gray-400 hover:text-white">
              <Share2 className="h-4 w-4 mb-1" />
              <span className="text-xs">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportSidebar;