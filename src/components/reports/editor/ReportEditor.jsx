import React, { useState } from 'react';
import { 
  FileText, BarChart3, Map, Database, 
  Image, Table, Link, Code,
  Type, AlignLeft, AlignCenter, AlignRight,
  Bold, Italic, List, Hash,
  Plus, Trash2, Settings, Eye
} from 'lucide-react';

function ReportEditor({ activeTab, selectedTemplate, reportData, onReportDataChange }) {
  const [activeSection, setActiveSection] = useState('introduction');
  const [editorContent, setEditorContent] = useState(`# Executive Summary

## Kibera Sanitation Infrastructure Report
### Monthly Performance Analysis - January 2024

### Key Findings:
- Service coverage increased by 15% this quarter
- Citizen satisfaction reached 4.3/5 average rating
- Response time improved by 1.2 days on average
- 42 new facilities added across all zones

### Recommendations:
1. Expand coverage in Zone D (current: 45%)
2. Implement predictive maintenance program
3. Enhance community engagement initiatives
4. Optimize waste collection routes`);

  const sections = [
    { id: 'introduction', label: 'Introduction', icon: FileText },
    { id: 'methodology', label: 'Methodology', icon: Database },
    { id: 'findings', label: 'Findings', icon: BarChart3 },
    { id: 'analysis', label: 'Analysis', icon: BarChart3 },
    { id: 'recommendations', label: 'Recommendations', icon: FileText },
    { id: 'conclusion', label: 'Conclusion', icon: FileText },
    { id: 'appendices', label: 'Appendices', icon: FileText },
  ];

  const chartTypes = [
    { id: 'bar', label: 'Bar Chart', icon: BarChart3 },
    { id: 'line', label: 'Line Chart', icon: BarChart3 },
    { id: 'pie', label: 'Pie Chart', icon: BarChart3 },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'table', label: 'Data Table', icon: Table },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'editor':
        return (
          <div className="h-full flex flex-col">
            {/* Editor Toolbar */}
            <div className="flex items-center space-x-1 mb-4 p-3 bg-white/5 rounded-lg">
              <button className="p-2 text-gray-400 hover:text-white">
                <Type className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white">
                <Bold className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white">
                <Italic className="h-4 w-4" />
              </button>
              <div className="h-6 w-px bg-white/20"></div>
              <button className="p-2 text-gray-400 hover:text-white">
                <AlignLeft className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white">
                <AlignCenter className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white">
                <AlignRight className="h-4 w-4" />
              </button>
              <div className="h-6 w-px bg-white/20"></div>
              <button className="p-2 text-gray-400 hover:text-white">
                <List className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white">
                <Hash className="h-4 w-4" />
              </button>
              <div className="h-6 w-px bg-white/20"></div>
              <button className="p-2 text-gray-400 hover:text-white">
                <Image className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white">
                <Table className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white">
                <Link className="h-4 w-4" />
              </button>
            </div>

            {/* Sections Navigation */}
            <div className="flex items-center space-x-1 mb-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                    activeSection === section.id
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <section.icon className="h-4 w-4" />
                  <span className="text-sm">{section.label}</span>
                </button>
              ))}
              <button className="p-2 text-gray-400 hover:text-white">
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Editor Area */}
            <div className="flex-1 glass-effect rounded-xl p-6 overflow-y-auto">
              <div className="prose prose-invert max-w-none">
                <textarea
                  value={editorContent}
                  onChange={(e) => setEditorContent(e.target.value)}
                  className="w-full h-full bg-transparent text-white font-mono text-sm resize-none focus:outline-none"
                  rows={20}
                />
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Analytics Integration</h3>
              <div className="flex items-center space-x-2">
                {chartTypes.map((chart) => (
                  <button
                    key={chart.id}
                    className="flex items-center space-x-2 px-3 py-2 bg-white/5 rounded-lg text-gray-400 hover:text-white"
                  >
                    <chart.icon className="h-4 w-4" />
                    <span className="text-sm">{chart.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 h-[calc(100%-4rem)]">
              {/* Available Charts */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Available Charts</h4>
                <div className="space-y-3">
                  {[
                    { title: 'Service Coverage Trend', type: 'line', data: '85% accuracy' },
                    { title: 'Facility Distribution', type: 'bar', data: '48 facilities' },
                    { title: 'Response Time Analysis', type: 'line', data: '3.2 days avg' },
                    { title: 'Citizen Satisfaction', type: 'pie', data: '4.3/5 rating' },
                  ].map((chart, index) => (
                    <div key={index} className="p-4 rounded-xl bg-white/5 hover:bg-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-white">{chart.title}</div>
                        <button className="p-1 text-gray-400 hover:text-white">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>Type: {chart.type}</span>
                        <span>{chart.data}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview Area */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Chart Preview</h4>
                <div className="glass-effect rounded-xl p-6 h-[calc(100%-2rem)]">
                  <div className="h-48 mb-6 bg-white/5 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-12 w-12 text-gray-600" />
                  </div>
                  <div className="space-y-4">
                    <div className="p-3 bg-white/5 rounded-lg">
                      <div className="text-sm text-gray-400 mb-2">Chart Settings</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">Chart Type</span>
                          <select className="bg-white/5 border border-white/10 rounded px-2 py-1 text-sm text-white">
                            <option>Line Chart</option>
                            <option>Bar Chart</option>
                            <option>Pie Chart</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">Data Source</span>
                          <select className="bg-white/5 border border-white/10 rounded px-2 py-1 text-sm text-white">
                            <option>Service Coverage</option>
                            <option>Citizen Reports</option>
                            <option>Maintenance Data</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'spatial':
        return (
          <div className="h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Spatial Analysis Integration</h3>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10">
                  <Map className="h-4 w-4 inline mr-2" />
                  Add Map
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 h-[calc(100%-4rem)]">
              {/* Map Layers */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Map Layers</h4>
                <div className="space-y-3">
                  {[
                    { layer: 'Facility Locations', type: 'points', count: 48 },
                    { layer: 'Service Coverage', type: 'polygons', count: 4 },
                    { layer: 'Hotspot Analysis', type: 'heatmap', count: 3 },
                    { layer: 'Water Network', type: 'lines', count: 12 },
                  ].map((item, index) => (
                    <div key={index} className="p-4 rounded-xl bg-white/5 hover:bg-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-white">{item.layer}</div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-400">{item.type}</span>
                          <input type="checkbox" className="rounded" />
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">
                        Features: {item.count}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Preview */}
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Map Preview</h4>
                <div className="glass-effect rounded-xl p-4 h-[calc(100%-2rem)]">
                  <div className="h-64 mb-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg relative">
                    {/* Mock map elements */}
                    <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-500 rounded-full"></div>
                    <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-green-500 rounded-full"></div>
                    <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-red-500 rounded-full"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-yellow-500 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-400">
                    Interactive map visualization will be embedded in the final report
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Report Editor</h3>
              <p className="text-gray-400">Select a template and start editing your report</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 rounded-2xl overflow-hidden">
      <div className="glass-effect h-full p-6">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default ReportEditor;