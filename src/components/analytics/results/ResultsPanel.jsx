import React from 'react';
import { X, Download, Share2, AlertCircle, CheckCircle, Clock, TrendingUp, TrendingDown } from 'lucide-react';

const ResultsPanel = ({ onClose, activeModule, analysisData, darkMode }) => {
  const results = [
    { id: 1, label: 'Sanitation Coverage', value: '87.3%', change: '+2.1%', trend: 'up', confidence: 95 },
    { id: 2, label: 'Water Access Rate', value: '92.5%', change: '+1.3%', trend: 'up', confidence: 93 },
    { id: 3, label: 'Health Reports', value: '154', change: '-12', trend: 'down', confidence: 88 },
    { id: 4, label: 'Service Efficiency', value: '78.9%', change: '+3.2%', trend: 'up', confidence: 91 },
    { id: 5, label: 'User Satisfaction', value: '4.2/5', change: '+0.3', trend: 'up', confidence: 89 },
    { id: 6, label: 'Maintenance Issues', value: '23', change: '-5', trend: 'down', confidence: 85 },
  ];

  const insights = [
    'North Zone shows 15% higher coverage compared to other zones',
    'Peak usage occurs between 7-9 AM and 6-8 PM daily',
    'Rainfall patterns correlate with 85% of maintenance issues',
    'Mobile access increased by 40% in the last quarter',
    'Predictive model accuracy reached 92% for usage forecasting'
  ];

  const recommendations = [
    'Increase maintenance frequency in East Zone by 20%',
    'Extend service hours during peak usage periods',
    'Deploy mobile units to underserved areas in South Zone',
    'Implement IoT sensors for real-time monitoring',
    'Optimize resource allocation based on predictive models'
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-emerald-500/20 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-white">Analysis Results</h3>
          <p className="text-xs text-emerald-300/70">Processed with {analysisData.confidence}% confidence</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => console.log('Export results')}
            className="p-2 rounded-lg hover:bg-emerald-900/30 transition-colors"
            title="Export"
          >
            <Download className="h-4 w-4 text-emerald-400" />
          </button>
          <button
            onClick={() => console.log('Share results')}
            className="p-2 rounded-lg hover:bg-emerald-900/30 transition-colors"
            title="Share"
          >
            <Share2 className="h-4 w-4 text-emerald-400" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-emerald-900/30 transition-colors"
          >
            <X className="h-4 w-4 text-emerald-400" />
          </button>
        </div>
      </div>

      {/* Results List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 gap-3 mb-6">
          {results.map((result) => (
            <div
              key={result.id}
              className={`p-3 rounded-lg ${
                darkMode ? 'bg-emerald-900/20' : 'bg-emerald-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {result.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-amber-400" />
                  )}
                  <span className="text-sm font-medium text-emerald-200">{result.label}</span>
                </div>
                <div className={`text-xs px-2 py-1 rounded ${
                  result.confidence >= 90 ? 'bg-green-500/20 text-green-400' :
                  result.confidence >= 80 ? 'bg-amber-500/20 text-amber-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {result.confidence}% conf
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-white">{result.value}</div>
                <div className={`text-sm font-medium ${
                  result.trend === 'up' ? 'text-green-400' : 'text-amber-400'
                }`}>
                  {result.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key Insights */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-emerald-400" />
              <h4 className="text-sm font-semibold text-emerald-300">Key Insights</h4>
            </div>
            <Clock className="h-4 w-4 text-emerald-400/50" />
          </div>
          <div className="space-y-2">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="flex items-start space-x-2 p-2 rounded-lg bg-emerald-900/10"
              >
                <div className="w-1 h-1 bg-emerald-400 rounded-full mt-2"></div>
                <p className="text-sm text-emerald-200/80">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <h4 className="text-sm font-semibold text-emerald-300">Recommendations</h4>
            </div>
            <TrendingUp className="h-4 w-4 text-emerald-400/50" />
          </div>
          <div className="space-y-2">
            {recommendations.map((recommendation, index) => (
              <div
                key={index}
                className="flex items-start space-x-2 p-2 rounded-lg bg-emerald-900/20"
              >
                <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
                <p className="text-sm text-emerald-200">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-emerald-500/20">
        <div className="flex items-center justify-between">
          <button className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg text-sm text-emerald-300 transition-colors">
            Schedule Follow-up
          </button>
          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm text-white font-medium transition-colors">
            Apply Recommendations
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;