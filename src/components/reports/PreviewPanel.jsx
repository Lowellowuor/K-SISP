import React, { useState } from 'react';
import { 
  X, Eye, Download, Share2, Printer,
  Settings, CheckCircle, Clock, Users,
  FileText, BarChart3, Map, Database,
  Smartphone, Monitor, Globe, Mail,
  Lock, Users as UsersIcon, Globe as GlobeIcon,
  Zap, AlertCircle
} from 'lucide-react';

function PreviewPanel({ onClose, reportData, selectedTemplate }) {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [sharingOption, setSharingOption] = useState('private');
  const [activePreview, setActivePreview] = useState('desktop');

  const exportFormats = [
    { id: 'pdf', label: 'PDF', icon: FileText, color: 'text-red-500', description: 'Print-ready document' },
    { id: 'word', label: 'Word', icon: FileText, color: 'text-blue-500', description: 'Editable document' },
    { id: 'excel', label: 'Excel', icon: BarChart3, color: 'text-emerald-500', description: 'Data tables' },
    { id: 'powerpoint', label: 'PowerPoint', icon: FileText, color: 'text-amber-500', description: 'Presentation' },
    { id: 'html', label: 'HTML', icon: Globe, color: 'text-teal-500', description: 'Web page' },
    { id: 'json', label: 'JSON', icon: Database, color: 'text-cyan-500', description: 'Structured data' },
  ];

  const sharingOptions = [
    { id: 'private', label: 'Private', icon: Lock, description: 'Only you can access' },
    { id: 'team', label: 'Team', icon: UsersIcon, description: 'Team members only' },
    { id: 'public', label: 'Public', icon: GlobeIcon, description: 'Anyone with link' },
    { id: 'restricted', label: 'Restricted', icon: Users, description: 'Specific users only' },
  ];

  const previewModes = [
    { id: 'desktop', label: 'Desktop', icon: Monitor },
    { id: 'mobile', label: 'Mobile', icon: Smartphone },
    { id: 'print', label: 'Print', icon: Printer },
  ];

  const reportMetrics = [
    { label: 'Pages', value: '12', icon: FileText, color: 'text-blue-400' },
    { label: 'Charts', value: '8', icon: BarChart3, color: 'text-emerald-400' },
    { label: 'Maps', value: '3', icon: Map, color: 'text-teal-400' },
    { label: 'Tables', value: '5', icon: Database, color: 'text-amber-400' },
  ];

  return (
    <div className="w-96 glass-effect rounded-2xl overflow-hidden flex flex-col h-full border border-emerald-500/20 shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-emerald-500/20 bg-gradient-to-r from-emerald-900/20 to-gray-900">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">Preview & Export</h3>
            <p className="text-sm text-emerald-300/70">Real-time preview and export options</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-emerald-300/70 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Preview Mode Selector */}
        <div className="flex items-center space-x-1 mb-6">
          {previewModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActivePreview(mode.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                activePreview === mode.id
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-emerald-300/70 hover:text-emerald-300 hover:bg-emerald-500/10'
              }`}
            >
              <mode.icon className="h-4 w-4" />
              <span className="text-sm">{mode.label}</span>
            </button>
          ))}
        </div>

        {/* Report Metrics */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          {reportMetrics.map((metric) => (
            <div 
              key={metric.label} 
              className="text-center p-3 rounded-lg bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors group"
            >
              <metric.icon className={`h-4 w-4 mx-auto mb-1 ${metric.color}`} />
              <div className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">{metric.value}</div>
              <div className="text-xs text-emerald-300/70">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Section */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900/90 to-gray-900">
        <div className="p-6 border-b border-emerald-500/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-white">Export Formats</h4>
            <button className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors flex items-center">
              <Zap className="h-4 w-4 inline mr-2" />
              Quick Export
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            {exportFormats.map((format) => (
              <button
                key={format.id}
                onClick={() => setExportFormat(format.id)}
                className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                  exportFormat === format.id
                    ? 'bg-emerald-500/20 border border-emerald-500/30 shadow-lg shadow-emerald-500/10'
                    : 'bg-emerald-500/5 hover:bg-emerald-500/10 hover:shadow-md'
                }`}
              >
                <format.icon className={`h-6 w-6 mb-2 ${format.color}`} />
                <span className="text-sm font-medium text-white mb-1">{format.label}</span>
                <span className="text-xs text-emerald-300/70 text-center">{format.description}</span>
              </button>
            ))}
          </div>

          <button className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/20 transition-all">
            <Download className="h-4 w-4" />
            <span className="font-semibold">Export as {exportFormat.toUpperCase()}</span>
          </button>
        </div>

        {/* Sharing Section */}
        <div className="p-6 border-b border-emerald-500/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-white">Sharing Options</h4>
            <Share2 className="h-4 w-4 text-emerald-400/70" />
          </div>

          <div className="space-y-3 mb-4">
            {sharingOptions.map((option) => (
              <label
                key={option.id}
                className={`flex items-center p-3 rounded-xl cursor-pointer transition-all ${
                  sharingOption === option.id
                    ? 'bg-emerald-500/20 border border-emerald-500/30 shadow-md shadow-emerald-500/10'
                    : 'bg-emerald-500/5 hover:bg-emerald-500/10 hover:shadow-sm'
                }`}
              >
                <input
                  type="radio"
                  name="sharing"
                  value={option.id}
                  checked={sharingOption === option.id}
                  onChange={(e) => setSharingOption(e.target.value)}
                  className="mr-3 text-emerald-500 focus:ring-emerald-500"
                />
                <div className="flex items-center space-x-3">
                  <option.icon className="h-5 w-5 text-emerald-400" />
                  <div>
                    <div className="font-medium text-white">{option.label}</div>
                    <div className="text-xs text-emerald-300/70">{option.description}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <button className="w-full flex items-center justify-center space-x-2 py-3 bg-emerald-500/10 text-emerald-300 rounded-xl hover:bg-emerald-500/20 hover:text-white transition-all">
            <Share2 className="h-4 w-4" />
            <span className="font-medium">Share Report</span>
          </button>
        </div>

        {/* Status & Actions */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-white">Report Status</h4>
            <div className={`px-3 py-1 text-xs rounded-full font-medium ${
              reportData.status === 'draft' 
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}>
              {reportData.status.toUpperCase()}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-sm text-emerald-300/70">
              <Clock className="h-4 w-4 mr-2 text-emerald-400" />
              <span>Last modified: {reportData.lastModified}</span>
            </div>
            <div className="flex items-center text-sm text-emerald-300/70">
              <Users className="h-4 w-4 mr-2 text-emerald-400" />
              <span>Author: {reportData.author}</span>
            </div>
            <div className="flex items-center text-sm text-emerald-300/70">
              <FileText className="h-4 w-4 mr-2 text-emerald-400" />
              <span>Version: {reportData.version}</span>
            </div>

            <div className="pt-4 mt-4 border-t border-emerald-500/20">
              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-emerald-500/10 text-emerald-300 rounded-xl hover:bg-emerald-500/20 hover:text-white transition-all">
                  <Printer className="h-4 w-4" />
                  <span className="font-medium">Print</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/20 transition-all">
                  <CheckCircle className="h-4 w-4" />
                  <span className="font-medium">Publish</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewPanel;