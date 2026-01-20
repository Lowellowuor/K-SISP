import React, { useState } from 'react';
import { 
  X, Download, FileText, CheckCircle, 
  AlertCircle, TrendingUp, BarChart3,
  Target, Users, Clock, Shield
} from 'lucide-react';

function ResultsPanel({ onClose, activeModule }) {
  const [selectedTab, setSelectedTab] = useState('results');

  const tabs = [
    { id: 'results', label: 'Results', icon: BarChart3 },
    { id: 'statistics', label: 'Statistics', icon: TrendingUp },
    { id: 'recommendations', label: 'Recommendations', icon: Target },
    { id: 'export', label: 'Export', icon: Download },
  ];

  const statisticalTests = [
    { test: 'T-test', pValue: 0.023, significant: true, effect: 'Medium' },
    { test: 'ANOVA', pValue: 0.001, significant: true, effect: 'Large' },
    { test: 'Chi-square', pValue: 0.145, significant: false, effect: 'Small' },
    { test: 'Regression', pValue: 0.008, significant: true, effect: 'Medium' },
  ];

  const recommendations = [
    { priority: 'high', text: 'Immediate maintenance required for 3 facilities in Zone C' },
    { priority: 'medium', text: 'Increase monitoring frequency in high-usage areas' },
    { priority: 'low', text: 'Consider adding 2 new water points in Zone D' },
  ];

  return (
    <div className="w-96 glass-effect rounded-2xl p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Analysis Results</h2>
            <p className="text-xs text-gray-400">
              {activeModule === 'trends' && 'Trend Analysis Results'}
              {activeModule === 'forecasting' && 'Predictive Model Output'}
              {activeModule === 'spatial' && 'Spatial Analysis Results'}
              {activeModule === 'statistical' && 'Statistical Test Results'}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              selectedTab === tab.id
                ? 'bg-blue-500/20 text-blue-400'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Results Content */}
      {selectedTab === 'results' && (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-4 w-4 text-blue-400" />
                <div className="text-sm text-gray-400">Significance Level</div>
              </div>
              <div className="text-xl font-bold text-white">95%</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-4 w-4 text-green-400" />
                <div className="text-sm text-gray-400">Confidence Interval</div>
              </div>
              <div className="text-xl font-bold text-white">±2.5%</div>
            </div>
          </div>

          {/* Key Findings */}
          <div>
            <h3 className="font-semibold text-white mb-3">Key Findings</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-3 p-3 bg-green-500/10 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                <div className="text-sm">Service coverage increased by 15% over the last quarter</div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-amber-500/10 rounded-lg">
                <AlertCircle className="h-4 w-4 text-amber-400 mt-0.5" />
                <div className="text-sm">Response time needs improvement in Zone D</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'statistics' && (
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Statistical Tests</h3>
          <div className="space-y-2">
            {statisticalTests.map((test, index) => (
              <div key={index} className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-white">{test.test}</div>
                  <div className={`text-xs px-2 py-1 rounded ${
                    test.significant 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    p = {test.pValue.toFixed(3)}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Effect Size:</span>
                  <span className={`font-medium ${
                    test.effect === 'Large' ? 'text-green-400' :
                    test.effect === 'Medium' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {test.effect}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'recommendations' && (
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Actionable Recommendations</h3>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className={`p-4 rounded-lg ${
                rec.priority === 'high' ? 'bg-red-500/10 border border-red-500/20' :
                rec.priority === 'medium' ? 'bg-yellow-500/10 border border-yellow-500/20' :
                'bg-green-500/10 border border-green-500/20'
              }`}>
                <div className="flex items-start space-x-3">
                  {rec.priority === 'high' && <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />}
                  {rec.priority === 'medium' && <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />}
                  {rec.priority === 'low' && <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />}
                  <div className="flex-1">
                    <div className="text-sm">{rec.text}</div>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        rec.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                        rec.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {rec.priority.toUpperCase()} PRIORITY
                      </span>
                      <button className="text-xs text-blue-400 hover:text-blue-300">
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'export' && (
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Export Options</h3>
          <div className="space-y-2">
            {[
              { format: 'PDF Report', icon: FileText, color: 'text-red-500' },
              { format: 'Excel Data', icon: FileText, color: 'text-green-500' },
              { format: 'CSV Export', icon: FileText, color: 'text-blue-500' },
              { format: 'JSON Data', icon: FileText, color: 'text-yellow-500' },
            ].map((option, index) => (
              <button
                key={index}
                className="w-full flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10"
              >
                <div className="flex items-center space-x-3">
                  <option.icon className={`h-5 w-5 ${option.color}`} />
                  <span className="text-sm text-white">{option.format}</span>
                </div>
                <Download className="h-4 w-4 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Analysis Notes */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <h3 className="font-semibold text-white mb-3">Analysis Notes</h3>
        <div className="text-sm text-gray-400 space-y-2">
          <p>• Analysis based on 30-day historical data</p>
          <p>• Confidence level set at 95%</p>
          <p>• Model trained using Random Forest algorithm</p>
          <p>• Last updated: Today, 14:30</p>
        </div>
      </div>
    </div>
  );
}

export default ResultsPanel;