import React, { useState } from 'react';
import { 
  FileText, Download, Calendar, Share2, 
  Printer, Settings, RefreshCw, Eye,
  Plus, Filter, Search, Zap
} from 'lucide-react';

function ReportToolbar({ activeTab, onTabChange, tabs, reportData, onGenerate, onExport, onSchedule }) {
  const [activeTool, setActiveTool] = useState('format');

  const tools = [
    { id: 'format', icon: FileText, label: 'Format', color: 'text-blue-500' },
    { id: 'data', icon: FileText, label: 'Data', color: 'text-green-500' },
    { id: 'charts', icon: FileText, label: 'Charts', color: 'text-purple-500' },
    { id: 'tables', icon: FileText, label: 'Tables', color: 'text-amber-500' },
    { id: 'media', icon: FileText, label: 'Media', color: 'text-cyan-500' },
    { id: 'references', icon: FileText, label: 'References', color: 'text-red-500' },
  ];

  const exportFormats = [
    { id: 'pdf', label: 'PDF', color: 'text-red-500' },
    { id: 'word', label: 'Word', color: 'text-blue-500' },
    { id: 'excel', label: 'Excel', color: 'text-green-500' },
    { id: 'powerpoint', label: 'PowerPoint', color: 'text-amber-500' },
    { id: 'html', label: 'HTML', color: 'text-purple-500' },
    { id: 'json', label: 'JSON', color: 'text-cyan-500' },
  ];

  const scheduleOptions = [
    { id: 'daily', label: 'Daily' },
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'quarterly', label: 'Quarterly' },
    { id: 'custom', label: 'Custom' },
  ];

  return (
    <div className="glass-effect rounded-xl p-4 mb-4">
      <div className="flex items-center justify-between">
        {/* Left: Tabs */}
        <div className="flex items-center space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white border border-white/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="font-medium text-sm">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Center: Quick Actions */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Status:</span>
            <span className="px-3 py-1 text-xs bg-amber-500/20 text-amber-400 rounded-full">
              {reportData.status.toUpperCase()}
            </span>
          </div>
          
          <div className="h-6 w-px bg-white/20"></div>

          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-400">Preview Mode</span>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onSchedule}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
          >
            <Calendar className="h-4 w-4" />
            <span>Schedule</span>
          </button>
          
          <button
            onClick={onExport}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          
          <button
            onClick={onGenerate}
            className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full hover:shadow-lg"
          >
            <Zap className="h-4 w-4" />
            <span className="font-semibold">Generate</span>
          </button>
        </div>
      </div>

      {/* Toolbar Submenu */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          {/* Format Tools */}
          <div className="flex items-center space-x-2">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`flex flex-col items-center p-2 rounded-lg min-w-16 ${
                  activeTool === tool.id
                    ? 'bg-indigo-500/20 text-indigo-400'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tool.icon className="h-4 w-4 mb-1" />
                <span className="text-xs">{tool.label}</span>
              </button>
            ))}
          </div>

          {/* Quick Export */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Quick Export:</span>
            <div className="flex items-center space-x-1">
              {exportFormats.slice(0, 3).map((format) => (
                <button
                  key={format.id}
                  className="px-3 py-1 text-xs bg-white/5 text-gray-400 rounded hover:text-white hover:bg-white/10"
                >
                  {format.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Tool Panel */}
        {activeTool && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-400">Active Tool:</span>
                <span className="text-sm font-medium text-white">
                  {tools.find(t => t.id === activeTool)?.label}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="text-xs text-gray-400 hover:text-white px-2 py-1">
                  Reset
                </button>
                <button className="text-xs bg-indigo-500 text-white px-3 py-1 rounded">
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportToolbar;