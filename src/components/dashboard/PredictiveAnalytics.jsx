import React from 'react';
import { TrendingUp } from 'lucide-react';

function PredictiveAnalytics() {
  const predictions = [
    { period: 'Next Week', prediction: 'High demand in Zone C', confidence: '85%' },
    { period: 'Next Month', prediction: '3 facilities need maintenance', confidence: '78%' },
    { period: 'Next Quarter', prediction: 'Capacity increase needed', confidence: '92%' },
  ];

  return (
    <div className="glass-effect rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Predictive Analytics</h2>
        <TrendingUp className="h-5 w-5 text-primary-500" />
      </div>
      
      <div className="space-y-4">
        {predictions.map((prediction, index) => (
          <div key={index} className="p-3 rounded-lg bg-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{prediction.period}</span>
              <span className="text-xs px-2 py-1 bg-primary-500/20 text-primary-400 rounded">
                {prediction.confidence} confidence
              </span>
            </div>
            <div className="text-sm text-gray-300">{prediction.prediction}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PredictiveAnalytics;