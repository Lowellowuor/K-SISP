import React, { useState } from 'react';
import { 
  FileText, Download, Calendar, Share2, 
  Printer, Settings, RefreshCw, Eye, EyeOff,
  Plus, Filter, Search, Zap, Save, 
  Layers, BarChart3, Table, Image,
  Code, BookOpen, CheckCircle, AlertCircle
} from 'lucide-react';

function ReportToolbar({ 
  activeTab, 
  onTabChange, 
  tabs, 
  reportData, 
  onGenerate, 
  onExport, 
  onSchedule,
  onPreviewToggle,
  isGenerating = false
}) {
  const [activeTool, setActiveTool] = useState('format');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showScheduleMenu, setShowScheduleMenu] = useState(false);

  const tools = [
    { 
      id: 'format', 
      icon: FileText, 
      label: 'Format', 
      color: 'bg-emerald-500',
      description: 'Formatting and styling options'
    },
    { 
      id: 'data', 
      icon: Layers, 
      label: 'Data Sources', 
      color: 'bg-green-500',
      description: 'Manage data connections'
    },
    { 
      id: 'charts', 
      icon: BarChart3, 
      label: 'Visualizations', 
      color: 'bg-teal-500',
      description: 'Charts and graphs'
    },
    { 
      id: 'tables', 
      icon: Table, 
      label: 'Tables', 
      color: 'bg-amber-500',
      description: 'Data tables and grids'
    },
    { 
      id: 'media', 
      icon: Image, 
      label: 'Media', 
      color: 'bg-emerald-600',
      description: 'Images and videos'
    },
    { 
      id: 'references', 
      icon: BookOpen, 
      label: 'References', 
      color: 'bg-green-600',
      description: 'Citations and sources'
    },
    { 
      id: 'code', 
      icon: Code, 
      label: 'Code Blocks', 
      color: 'bg-teal-600',
      description: 'Custom code and scripts'
    },
  ];

  const exportFormats = [
    { id: 'pdf', label: 'PDF Document', icon: FileText, color: 'bg-red-500', desc: 'Print-ready format' },
    { id: 'word', label: 'Word Document', icon: FileText, color: 'bg-blue-500', desc: 'Editable document' },
    { id: 'excel', label: 'Excel Spreadsheet', icon: Table, color: 'bg-green-500', desc: 'Data tables' },
    { id: 'powerpoint', label: 'PowerPoint', icon: FileText, color: 'bg-amber-500', desc: 'Presentation' },
    { id: 'html', label: 'Web Page', icon: Code, color: 'bg-purple-500', desc: 'Interactive web page' },
    { id: 'json', label: 'JSON Data', icon: Code, color: 'bg-emerald-500', desc: 'Machine-readable data' },
  ];

  const scheduleOptions = [
    { id: 'daily', label: 'Daily', icon: RefreshCw, desc: 'Every day at specified time' },
    { id: 'weekly', label: 'Weekly', icon: Calendar, desc: 'Every week on selected day' },
    { id: 'monthly', label: 'Monthly', icon: Calendar, desc: 'Monthly on selected date' },
    { id: 'quarterly', label: 'Quarterly', icon: Calendar, desc: 'Every 3 months' },
    { id: 'yearly', label: 'Yearly', icon: Calendar, desc: 'Annual report' },
  ];

  const handleExport = (format) => {
    onExport(format);
    setShowExportMenu(false);
  };

  return (
    <div className="glass-green rounded-2xl p-5 mb-6 shadow-green-lg">
      {/* Main Toolbar Row */}
      <div className="flex items-center justify-between mb-4">
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1 p-1 bg-emerald-900/30 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-emerald-600/40 to-green-500/40 text-white shadow-lg shadow-emerald-500/20'
                  : 'text-emerald-100 hover:bg-emerald-800/30 hover:text-white'
              }`}
            >
              <tab.icon className={`h-4 w-4 ${tab.color}`} />
              <span className="font-medium text-sm">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Center: Status & Actions */}
        <div className="flex items-center space-x-6">
          {/* Auto-save Indicator */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse mr-2"></div>
              <span className="text-sm text-emerald-300">Auto-save</span>
            </div>
            <div className="text-sm text-emerald-200 font-medium">On</div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-emerald-300">Status:</span>
            <div className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-2 ${
              reportData.status === 'draft' 
                ? 'bg-amber-500/20 text-amber-400'
                : reportData.status === 'published'
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-blue-500/20 text-blue-400'
            }`}>
              <div className={`h-1.5 w-1.5 rounded-full ${
                reportData.status === 'draft' ? 'bg-amber-400' :
                reportData.status === 'published' ? 'bg-emerald-400' : 'bg-blue-400'
              } animate-pulse`}></div>
              <span>{reportData.status.toUpperCase()}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-emerald-500/30"></div>

          {/* Preview Toggle */}
          <button
            onClick={onPreviewToggle}
            className="flex items-center space-x-2 px-3 py-2 bg-emerald-800/30 border border-emerald-500/20 text-emerald-200 rounded-xl hover:bg-emerald-700/40 hover:border-emerald-400/30 transition-all duration-300"
          >
            {reportData.previewMode ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">
              {reportData.previewMode ? 'Hide Preview' : 'Show Preview'}
            </span>
          </button>
        </div>

        {/* Right: Primary Actions */}
        <div className="flex items-center space-x-3">
          {/* Schedule Button */}
          <div className="relative">
            <button
              onClick={() => setShowScheduleMenu(!showScheduleMenu)}
              onBlur={() => setTimeout(() => setShowScheduleMenu(false), 200)}
              className="flex items-center space-x-2 px-4 py-2.5 bg-emerald-800/30 border border-emerald-500/20 text-emerald-200 rounded-xl hover:bg-emerald-700/40 hover:border-emerald-400/30 transition-all duration-300"
            >
              <Calendar className="h-4 w-4" />
              <span>Schedule</span>
            </button>

            {showScheduleMenu && (
              <div className="absolute top-full right-0 mt-2 w-64 glass-green-card rounded-xl p-2 shadow-green-lg z-50">
                <div className="p-2 border-b border-emerald-500/20">
                  <h4 className="font-medium text-white mb-1">Schedule Options</h4>
                  <p className="text-xs text-emerald-300">Set up automated delivery</p>
                </div>
                <div className="space-y-1 py-2">
                  {scheduleOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        onSchedule(option.id);
                        setShowScheduleMenu(false);
                      }}
                      className="w-full flex items-center space-x-3 p-3 text-sm text-emerald-200 hover:bg-emerald-800/30 rounded-lg transition-colors"
                    >
                      <option.icon className="h-4 w-4" />
                      <div className="text-left flex-1">
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs text-emerald-300/70">{option.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Export Button */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              onBlur={() => setTimeout(() => setShowExportMenu(false), 200)}
              className="flex items-center space-x-2 px-4 py-2.5 bg-emerald-800/30 border border-emerald-500/20 text-emerald-200 rounded-xl hover:bg-emerald-700/40 hover:border-emerald-400/30 transition-all duration-300"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>

            {showExportMenu && (
              <div className="absolute top-full right-0 mt-2 w-72 glass-green-card rounded-xl p-2 shadow-green-lg z-50">
                <div className="p-2 border-b border-emerald-500/20">
                  <h4 className="font-medium text-white mb-1">Export Format</h4>
                  <p className="text-xs text-emerald-300">Choose output format</p>
                </div>
                <div className="grid grid-cols-2 gap-2 py-2">
                  {exportFormats.map((format) => (
                    <button
                      key={format.id}
                      onClick={() => handleExport(format.id)}
                      className="flex flex-col items-center p-3 bg-emerald-900/20 border border-emerald-500/20 rounded-xl hover:bg-emerald-800/30 hover:border-emerald-400/30 transition-all duration-300 group"
                    >
                      <div className={`p-2 ${format.color} rounded-lg mb-2`}>
                        <format.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-white">{format.label}</span>
                      <span className="text-xs text-emerald-300/70 text-center mt-1">{format.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Generate Button */}
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-green-500 text-white rounded-xl hover:shadow-green hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isGenerating ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Zap className="h-4 w-4 group-hover:animate-pulse" />
            )}
            <span className="font-semibold">
              {isGenerating ? 'Generating...' : 'Generate Report'}
            </span>
          </button>
        </div>
      </div>

      {/* Toolbar Submenu */}
      <div className="pt-4 border-t border-emerald-500/20">
        {/* Format Tools */}
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 min-w-20 group ${
                  activeTool === tool.id
                    ? 'bg-gradient-to-r from-emerald-600/30 to-green-500/30 border-2 border-emerald-400/50 shadow-lg shadow-emerald-500/20'
                    : 'bg-emerald-900/20 border border-emerald-500/20 hover:bg-emerald-800/30'
                }`}
                title={tool.description}
              >
                <div className={`p-2 ${tool.color} rounded-lg mb-2 group-hover:scale-110 transition-transform`}>
                  <tool.icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs font-medium text-white group-hover:text-emerald-100">{tool.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Tool Panel */}
        {activeTool && (
          <div className="glass-green-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-emerald-600 to-green-500 rounded-lg">
                  {tools.find(t => t.id === activeTool)?.icon({ className: "h-4 w-4 text-white" })}
                </div>
                <div>
                  <h4 className="font-semibold text-white">
                    {tools.find(t => t.id === activeTool)?.label} Settings
                  </h4>
                  <p className="text-sm text-emerald-300">
                    {tools.find(t => t.id === activeTool)?.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="px-3 py-1.5 text-sm bg-emerald-800/30 border border-emerald-500/20 text-emerald-200 rounded-lg hover:bg-emerald-700/40 transition-colors">
                  Reset to Default
                </button>
                <button className="px-4 py-1.5 text-sm bg-gradient-to-r from-emerald-600 to-green-500 text-white rounded-lg hover:shadow-green transition-all duration-300">
                  Apply Changes
                </button>
              </div>
            </div>
            
            {/* Tool-specific Settings */}
            <div className="pt-3 border-t border-emerald-500/20">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-emerald-300">
                  Tool Options:
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1.5 text-sm bg-emerald-900/30 border border-emerald-500/20 text-emerald-200 rounded-lg hover:bg-emerald-800/30">
                    Presets
                  </button>
                  <button className="px-3 py-1.5 text-sm bg-emerald-900/30 border border-emerald-500/20 text-emerald-200 rounded-lg hover:bg-emerald-800/30">
                    Templates
                  </button>
                  <button className="px-3 py-1.5 text-sm bg-emerald-900/30 border border-emerald-500/20 text-emerald-200 rounded-lg hover:bg-emerald-800/30">
                    Custom
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions Bar */}
        <div className="mt-4 pt-4 border-t border-emerald-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-emerald-300">Quick Actions:</span>
              <button className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-900/30 border border-emerald-500/20 text-emerald-200 rounded-lg hover:bg-emerald-800/30 transition-colors">
                <Save className="h-3.5 w-3.5" />
                <span className="text-sm">Save Draft</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-900/30 border border-emerald-500/20 text-emerald-200 rounded-lg hover:bg-emerald-800/30 transition-colors">
                <Printer className="h-3.5 w-3.5" />
                <span className="text-sm">Print Preview</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-900/30 border border-emerald-500/20 text-emerald-200 rounded-lg hover:bg-emerald-800/30 transition-colors">
                <Share2 className="h-3.5 w-3.5" />
                <span className="text-sm">Share</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-900/30 border border-emerald-500/20 text-emerald-200 rounded-lg hover:bg-emerald-800/30 transition-colors">
                <Settings className="h-3.5 w-3.5" />
                <span className="text-sm">Settings</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-emerald-300">
                Version: <span className="text-white font-medium">{reportData.version}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-emerald-400" />
                <span className="text-sm text-emerald-300">Filter</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportToolbar;