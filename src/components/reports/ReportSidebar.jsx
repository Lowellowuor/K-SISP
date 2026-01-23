import React, { useState } from 'react';
import { 
  FileText, BarChart3, Map, Database, 
  Calendar, Users, Settings, Folder,
  ChevronRight, Star, Clock, CheckCircle,
  Download, Share2, Eye, Zap, BookOpen,
  TrendingUp, MapPin, FileCheck, FileSearch
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
    { 
      id: 'executive', 
      label: 'Executive Summary', 
      icon: FileCheck, 
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      starred: true, 
      uses: 245,
      description: 'High-level overview'
    },
    { 
      id: 'analytics', 
      label: 'Analytical Report', 
      icon: TrendingUp, 
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      starred: true, 
      uses: 189,
      description: 'Detailed analysis'
    },
    { 
      id: 'spatial', 
      label: 'Spatial Analysis', 
      icon: MapPin, 
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10',
      starred: false, 
      uses: 156,
      description: 'Geographic insights'
    },
    { 
      id: 'technical', 
      label: 'Technical Report', 
      icon: Database, 
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      starred: false, 
      uses: 98,
      description: 'Technical details'
    },
    { 
      id: 'research', 
      label: 'Research Paper', 
      icon: FileSearch, 
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      starred: true, 
      uses: 76,
      description: 'Research findings'
    },
    { 
      id: 'policy', 
      label: 'Policy Brief', 
      icon: BookOpen, 
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      starred: false, 
      uses: 112,
      description: 'Policy recommendations'
    },
  ];

  const recentReports = [
    { id: 1, title: 'Monthly Sanitation Report', date: 'Today, 10:30', status: 'draft', icon: FileText },
    { id: 2, title: 'Water Quality Analysis', date: 'Yesterday, 14:20', status: 'published', icon: BarChart3 },
    { id: 3, title: 'Infrastructure Assessment', date: 'Jan 19, 09:15', status: 'archived', icon: Map },
    { id: 4, title: 'Community Feedback Summary', date: 'Jan 18, 16:45', status: 'published', icon: Users },
  ];

  const scheduledReports = [
    { id: 1, title: 'Weekly Performance', schedule: 'Every Monday', next: 'Tomorrow, 08:00' },
    { id: 2, title: 'Monthly Analytics', schedule: '1st of month', next: 'Feb 1, 00:00' },
    { id: 3, title: 'Quarterly Review', schedule: 'Quarterly', next: 'Mar 31, 23:59' },
  ];

  return (
    <div className="w-80 glass-effect rounded-2xl p-6 overflow-y-auto border border-emerald-500/20 shadow-2xl h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-lg font-bold text-white mb-1">Report Library</h2>
          <p className="text-sm text-emerald-300/70">Templates & History</p>
        </div>
        <button className="p-2 text-emerald-300/70 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-lg transition-colors">
          <Settings className="h-4 w-4" />
        </button>
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-2 mb-6">
        <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-emerald-500/10 text-emerald-300 rounded-lg hover:bg-emerald-500/20 transition-colors">
          <Zap className="h-3 w-3" />
          <span className="text-xs font-medium">Quick Create</span>
        </button>
        <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-emerald-500/10 text-emerald-300 rounded-lg hover:bg-emerald-500/20 transition-colors">
          <Folder className="h-3 w-3" />
          <span className="text-xs font-medium">Browse All</span>
        </button>
      </div>

      {/* Template Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-emerald-500/20 rounded-lg">
              <Folder className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <h3 className="font-semibold text-sm text-emerald-300">Templates</h3>
          </div>
          <button 
            onClick={() => toggleSection('templates')}
            className="p-1 text-emerald-300/70 hover:text-emerald-300 hover:bg-emerald-500/10 rounded transition-colors"
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
                className={`w-full text-left p-3 rounded-xl transition-all duration-200 ${
                  selectedTemplate === template.id
                    ? 'bg-emerald-500/20 border border-emerald-500/30 shadow-md shadow-emerald-500/10'
                    : 'bg-emerald-500/5 hover:bg-emerald-500/10 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${template.bgColor}`}>
                    <template.icon className={`h-4 w-4 ${template.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{template.label}</span>
                      <div className="flex items-center space-x-2">
                        {template.starred && <Star className="h-3 w-3 text-amber-400" />}
                        <span className="text-xs text-emerald-300/70">{template.uses} uses</span>
                      </div>
                    </div>
                    <p className="text-xs text-emerald-300/70 mt-1">{template.description}</p>
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
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-emerald-500/20 rounded-lg">
              <Clock className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <h3 className="font-semibold text-sm text-emerald-300">Recent Reports</h3>
          </div>
          <button 
            onClick={() => toggleSection('recent')}
            className="p-1 text-emerald-300/70 hover:text-emerald-300 hover:bg-emerald-500/10 rounded transition-colors"
          >
            <ChevronRight className={`h-4 w-4 transition-transform ${
              expandedSections.includes('recent') ? 'rotate-90' : ''
            }`} />
          </button>
        </div>
        
        {expandedSections.includes('recent') && (
          <div className="space-y-2">
            {recentReports.map((report) => (
              <div 
                key={report.id} 
                className="flex items-center justify-between p-3 rounded-xl hover:bg-emerald-500/10 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500/30">
                    <report.icon className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-emerald-300">{report.title}</div>
                    <div className="text-xs text-emerald-300/70">{report.date}</div>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  report.status === 'draft' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                  report.status === 'published' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                  'bg-gray-500/20 text-gray-400 border border-gray-500/30'
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
        <div className="flex items-center space-x-2 mb-3">
          <div className="p-1.5 bg-emerald-500/20 rounded-lg">
            <Calendar className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <h3 className="font-semibold text-sm text-emerald-300">Scheduled Reports</h3>
        </div>
        
        <div className="space-y-2">
          {scheduledReports.map((report) => (
            <div key={report.id} className="p-3 rounded-xl bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-white">{report.title}</div>
                <CheckCircle className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="text-xs text-emerald-300/70 space-y-1">
                <div>⏰ Schedule: {report.schedule}</div>
                <div>📅 Next: {report.next}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Report Info */}
      <div className="mt-8 pt-6 border-t border-emerald-500/20">
        <h3 className="font-semibold text-white mb-4 flex items-center">
          <div className="p-1.5 bg-emerald-500/20 rounded-lg mr-2">
            <FileText className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          Current Report
        </h3>
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-gray-900 border border-emerald-500/20">
            <div className="text-sm font-bold text-white mb-2">{reportData.title}</div>
            <div className="text-xs text-emerald-300/70 space-y-1.5">
              <div className="flex justify-between">
                <span>Type:</span>
                <span className="text-emerald-300">{reportData.type}</span>
              </div>
              <div className="flex justify-between">
                <span>Author:</span>
                <span className="text-emerald-300">{reportData.author}</span>
              </div>
              <div className="flex justify-between">
                <span>Version:</span>
                <span className="text-emerald-300">{reportData.version}</span>
              </div>
              <div className="flex justify-between">
                <span>Modified:</span>
                <span className="text-emerald-300">{reportData.lastModified}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button className="flex flex-col items-center p-2 text-emerald-300/70 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-xl transition-colors group">
              <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 mb-1.5">
                <Eye className="h-4 w-4" />
              </div>
              <span className="text-xs font-medium">Preview</span>
            </button>
            <button className="flex flex-col items-center p-2 text-emerald-300/70 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-xl transition-colors group">
              <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 mb-1.5">
                <Download className="h-4 w-4" />
              </div>
              <span className="text-xs font-medium">Export</span>
            </button>
            <button className="flex flex-col items-center p-2 text-emerald-300/70 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-xl transition-colors group">
              <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 mb-1.5">
                <Share2 className="h-4 w-4" />
              </div>
              <span className="text-xs font-medium">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="mt-6 pt-4 border-t border-emerald-500/20">
        <div className="text-xs text-emerald-300/70 flex justify-between">
          <span>📊 24 reports generated</span>
          <span>⚡ 12 templates available</span>
        </div>
      </div>
    </div>
  );
}

export default ReportSidebar;