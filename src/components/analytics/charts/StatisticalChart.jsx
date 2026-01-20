import React, { useState } from 'react';
import { BarChart3, TrendingUp, Target, CheckCircle, XCircle } from 'lucide-react';

function StatisticalChart() {
  const [activeTest, setActiveTest] = useState('t-test');

  const statisticalTests = [
    { id: 't-test', name: 'T-test', description: 'Compare two groups', pValue: 0.023, significant: true },
    { id: 'anova', name: 'ANOVA', description: 'Compare multiple groups', pValue: 0.001, significant: true },
    { id: 'chi-square', name: 'Chi-square', description: 'Test independence', pValue: 0.145, significant: false },
    { id: 'regression', name: 'Regression', description: 'Predict relationships', pValue: 0.008, significant: true },
  ];

  const testResults = {
    't-test': {
      groups: ['Zone A', 'Zone B'],
      mean: [72, 65],
      stdDev: [8.2, 7.5],
      effectSize: 'Medium',
      confidence: '95%'
    },
    'anova': {
      groups: ['Zone A', 'Zone B', 'Zone C', 'Zone D'],
      mean: [72, 65, 58, 45],
      stdDev: [8.2, 7.5, 6.8, 9.1],
      effectSize: 'Large',
      confidence: '99%'
    },
    'chi-square': {
      groups: ['Functional', 'Repair', 'Non-functional'],
      observed: [35, 8, 5],
      expected: [32, 10, 6],
      effectSize: 'Small',
      confidence: '90%'
    },
    'regression': {
      variables: ['Population', 'Distance', 'Income'],
      coefficients: [0.85, -0.42, 0.28],
      rSquared: 0.89,
      effectSize: 'Medium',
      confidence: '95%'
    }
  };

  const currentResults = testResults[activeTest] || testResults['t-test'];

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BarChart3 className="h-6 w-6 text-amber-500" />
          <h3 className="text-lg font-bold text-white">Statistical Analysis</h3>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 h-[calc(100%-4rem)]">
        {/* Left Panel: Test Selection */}
        <div className="space-y-4">
          <h4 className="font-semibold text-white mb-3">Statistical Tests</h4>
          <div className="space-y-2">
            {statisticalTests.map((test) => (
              <button
                key={test.id}
                onClick={() => setActiveTest(test.id)}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  activeTest === test.id
                    ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-white/20'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">{test.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{test.description}</div>
                  </div>
                  <div className={`p-1 rounded ${
                    test.significant 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {test.significant ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  p-value: {test.pValue.toFixed(3)}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Center Panel: Visualization */}
        <div className="col-span-2">
          <div className="glass-effect rounded-xl p-4 h-full">
            <h4 className="font-semibold text-white mb-4">Test Results Visualization</h4>
            
            <div className="h-48 mb-6 relative">
              {/* Bar Chart for Means */}
              <div className="absolute inset-0 flex items-end space-x-2 px-4">
                {currentResults.mean?.map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gradient-to-t from-amber-500 to-yellow-500 rounded-t"
                      style={{ height: `${(value / 100) * 100}%` }}
                    ></div>
                    <div className="mt-2 text-center">
                      <div className="text-sm font-semibold text-white">{value}</div>
                      <div className="text-xs text-gray-400">{currentResults.groups?.[index] || `Group ${index + 1}`}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Error bars for standard deviation */}
              {currentResults.stdDev && (
                <div className="absolute inset-0 flex items-end space-x-2 px-4">
                  {currentResults.stdDev.map((std, index) => (
                    <div
                      key={index}
                      className="flex-1 flex justify-center"
                      style={{ height: '100%' }}
                    >
                      <div
                        className="w-px bg-red-400 absolute"
                        style={{
                          height: `${(std / 20) * 100}%`,
                          bottom: `${(currentResults.mean?.[index] || 0) - (std / 2)}%`,
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Test Statistics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-3 rounded-lg">
                <div className="text-sm text-gray-400">Effect Size</div>
                <div className={`text-xl font-bold ${
                  currentResults.effectSize === 'Large' ? 'text-green-400' :
                  currentResults.effectSize === 'Medium' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {currentResults.effectSize}
                </div>
              </div>
              <div className="bg-white/5 p-3 rounded-lg">
                <div className="text-sm text-gray-400">Confidence Level</div>
                <div className="text-xl font-bold text-blue-400">{currentResults.confidence}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Interpretation */}
        <div className="space-y-4">
          <h4 className="font-semibold text-white">Interpretation</h4>
          <div className="glass-effect p-4 rounded-xl">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-blue-400" />
                <div>
                  <div className="text-sm font-medium text-white">Significance</div>
                  <div className="text-xs text-gray-400">
                    {statisticalTests.find(t => t.id === activeTest)?.significant 
                      ? 'Results are statistically significant'
                      : 'Results are not statistically significant'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <div>
                  <div className="text-sm font-medium text-white">Practical Significance</div>
                  <div className="text-xs text-gray-400">
                    {currentResults.effectSize === 'Large' && 'Large practical impact'}
                    {currentResults.effectSize === 'Medium' && 'Moderate practical impact'}
                    {currentResults.effectSize === 'Small' && 'Small practical impact'}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="text-sm text-gray-300 mb-2">Recommendation:</div>
              <div className="text-xs text-gray-400">
                {activeTest === 't-test' && 'Focus improvement efforts on Zone B'}
                {activeTest === 'anova' && 'Prioritize interventions in Zone D'}
                {activeTest === 'chi-square' && 'Maintenance schedule is adequate'}
                {activeTest === 'regression' && 'Population density is key predictor'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticalChart;