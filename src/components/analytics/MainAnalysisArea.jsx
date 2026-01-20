import React, { useState } from 'react';
import TimeSeriesChart from './charts/TimeSeriesChart';
import StatisticalChart from './charts/StatisticalChart';
import SpatialVisualization from './charts/SpatialVisualization';
import PredictiveModel from './modules/PredictiveModel';
import { 
  BarChart3, LineChart, PieChart, 
  ScatterChart, Map, Cpu, TrendingUp
} from 'lucide-react';

function MainAnalysisArea({ activeModule, selectedAnalysis }) {
  const [activeChart, setActiveChart] = useState('time-series');

  const chartTypes = [
    { id: 'time-series', icon: LineChart, label: 'Time Series', color: 'text-blue-500' },
    { id: 'bar', icon: BarChart3, label: 'Bar Chart', color: 'text-green-500' },
    { id: 'pie', icon: PieChart, label: 'Pie Chart', color: 'text-purple-500' },
    { id: 'scatter', icon: ScatterChart, label: 'Scatter Plot', color: 'text-amber-500' },
    { id: 'spatial', icon: Map, label: 'Spatial', color: 'text-cyan-500' },
  ];

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'trends':
        return (
          <div className="h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Trend Analysis Dashboard</h3>
              <div className="flex items-center space-x-2">
                {chartTypes.map((chart) => (
                  <button
                    key={chart.id}
                    onClick={() => setActiveChart(chart.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                      activeChart === chart.id
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <chart.icon className="h-4 w-4" />
                    <span className="text-sm">{chart.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[calc(100%-4rem)]">
              <TimeSeriesChart chartType={activeChart} />
            </div>
          </div>
        );
      
      case 'forecasting':
        return <PredictiveModel />;
      
      case 'spatial':
        return <SpatialVisualization />;
      
      case 'statistical':
        return <StatisticalChart />;
      
      default:
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Cpu className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Select an Analysis Module</h3>
              <p className="text-gray-400">Choose a module from the sidebar to begin analysis</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 rounded-2xl overflow-hidden">
      <div className="glass-effect h-full p-6">
        {renderModuleContent()}
      </div>
    </div>
  );
}

export default MainAnalysisArea;