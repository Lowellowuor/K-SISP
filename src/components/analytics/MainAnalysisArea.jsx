import React, { useState, useEffect } from 'react';
import { TrendingUp, Brain, Globe, BarChart3, Shield, TrendingDown, Cpu, AlertCircle, Target } from 'lucide-react';

const MainAnalysisArea = ({ activeModule, selectedAnalysis, analysisData, darkMode }) => {
  const [progress, setProgress] = useState(0);
  const [simulationData, setSimulationData] = useState([]);

  useEffect(() => {
    // Simulate data generation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          generateNewData();
          return 0;
        }
        return prev + 0.5;
      });
    }, 50);

    // Initial data generation
    generateNewData();

    return () => clearInterval(interval);
  }, [activeModule]);

  const generateNewData = () => {
    const newData = Array.from({ length: 20 }, (_, i) => ({
      x: i,
      y: Math.sin(i * 0.5 + Math.random() * 0.5) * 100 + 50,
      value: Math.random() * 100,
      category: Math.floor(Math.random() * 5)
    }));
    setSimulationData(newData);
  };

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'trends':
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Trend Analysis Active</h3>
              <p className="text-emerald-300/70 max-w-md">
                Analyzing historical patterns and growth trajectories across selected zones.
                Processing {analysisData.sampleSize} data points...
              </p>
            </div>
          </div>
        );
      
      case 'forecasting':
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Brain className="h-16 w-16 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Predictive Modeling</h3>
              <p className="text-cyan-300/70 max-w-md">
                Running machine learning models for future projections with {analysisData.confidence}% confidence.
              </p>
            </div>
          </div>
        );
      
      case 'spatial':
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Globe className="h-16 w-16 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Spatial Intelligence</h3>
              <p className="text-amber-300/70 max-w-md">
                Mapping geographic data patterns and distribution analysis across zones.
              </p>
            </div>
          </div>
        );
      
      case 'statistical':
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-violet-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Statistical Analysis</h3>
              <p className="text-violet-300/70 max-w-md">
                Performing hypothesis testing, correlation analysis, and statistical significance checks.
              </p>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Cpu className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Analysis Engine</h3>
              <p className="text-emerald-300/70 max-w-md">
                Processing data with advanced algorithms and machine learning models.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-full relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 grid-rows-20 h-full">
          {Array.from({ length: 400 }).map((_, i) => (
            <div 
              key={i} 
              className="border border-emerald-500/5"
            />
          ))}
        </div>
      </div>

      {/* Module Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-1 p-6">
          {renderModuleContent()}
        </div>

        {/* Data Visualization */}
        <div className="p-4 border-t border-emerald-500/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-emerald-300">Real-time Data Stream</span>
            </div>
            <AlertCircle className="h-4 w-4 text-emerald-400/50" />
          </div>
          
          <div className="h-16 relative">
            <div className="absolute inset-0 flex items-end space-x-1">
              {simulationData.map((data, i) => (
                <div
                  key={i}
                  className="flex-1 bg-emerald-400/30 hover:bg-emerald-400/50 transition-colors rounded-t"
                  style={{ height: `${data.y}%` }}
                  title={`Value: ${data.value.toFixed(1)}`}
                />
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-emerald-400/70 mb-1">
              <span>Processing Analysis</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-emerald-900/30 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-400 to-green-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainAnalysisArea;