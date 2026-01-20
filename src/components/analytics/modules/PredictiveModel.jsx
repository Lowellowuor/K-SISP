import React, { useState } from 'react';
import { Cpu, TrendingUp, Target, AlertCircle, Clock, CheckCircle } from 'lucide-react';

// Remove the 'export' keyword from the function declaration
function PredictiveModel() {
  const [modelType, setModelType] = useState('demand');
  const [predictionHorizon, setPredictionHorizon] = useState(30);

  const models = [
    { id: 'demand', label: 'Demand Forecasting', icon: TrendingUp, color: 'text-blue-500' },
    { id: 'maintenance', label: 'Maintenance Prediction', icon: AlertCircle, color: 'text-amber-500' },
    { id: 'risk', label: 'Risk Assessment', icon: Target, color: 'text-red-500' },
    { id: 'capacity', label: 'Capacity Planning', icon: TrendingUp, color: 'text-green-500' },
  ];

  const predictions = [
    { day: 'Today', demand: 85, confidence: 92 },
    { day: 'Tomorrow', demand: 87, confidence: 90 },
    { day: 'Day 7', demand: 92, confidence: 85 },
    { day: 'Day 14', demand: 95, confidence: 78 },
    { day: 'Day 30', demand: 98, confidence: 65 },
  ];

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Cpu className="h-6 w-6 text-green-500" />
          <h3 className="text-lg font-bold text-white">Predictive Analytics</h3>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 h-[calc(100%-4rem)]">
        {/* Model Selection */}
        <div className="space-y-4">
          <h4 className="font-semibold text-white mb-3">Model Selection</h4>
          <div className="space-y-2">
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => setModelType(model.id)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  modelType === model.id
                    ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-white/20'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <model.icon className={`h-5 w-5 ${model.color}`} />
                  <span className="text-sm text-white">{model.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Predictions */}
        <div className="col-span-2">
          <div className="glass-effect rounded-xl p-4 h-full">
            <h4 className="font-semibold text-white mb-4">Forecast Results</h4>
            
            {/* Prediction Chart */}
            <div className="h-48 mb-6 relative">
              <div className="absolute inset-0 flex items-end space-x-4">
                {predictions.map((pred, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gradient-to-t from-green-500 to-blue-500 rounded-t"
                      style={{ height: `${pred.demand}%` }}
                    ></div>
                    <div className="mt-2 text-center">
                      <div className="text-sm font-semibold text-white">{pred.demand}%</div>
                      <div className="text-xs text-gray-400">{pred.day}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Model Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 p-3 rounded-lg">
                <div className="text-sm text-gray-400">Model Accuracy</div>
                <div className="text-xl font-bold text-green-400">94%</div>
              </div>
              <div className="bg-white/5 p-3 rounded-lg">
                <div className="text-sm text-gray-400">Mean Error</div>
                <div className="text-xl font-bold text-blue-400">±2.1%</div>
              </div>
              <div className="bg-white/5 p-3 rounded-lg">
                <div className="text-sm text-gray-400">R² Score</div>
                <div className="text-xl font-bold text-purple-400">0.89</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ADD THIS LINE - default export
export default PredictiveModel;