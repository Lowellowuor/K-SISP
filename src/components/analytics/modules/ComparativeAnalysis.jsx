import React, { useState } from 'react';
import {
  BarChart3, TrendingUp, TrendingDown, Users, Target,
  Shield, Clock, DollarSign, Award, Activity, Zap,
  Filter, Download, Maximize2, ChevronDown, ChevronUp,
  Globe, MapPin, Home, Droplets, Wifi, AlertCircle,
  RefreshCw, Settings, Eye, EyeOff, Layers
} from 'lucide-react';

function ComparativeAnalysis() {
  const [selectedDimension, setSelectedDimension] = useState('coverage');
  const [timeRange, setTimeRange] = useState('30d');
  const [showBenchmarks, setShowBenchmarks] = useState(true);
  const [comparisonType, setComparisonType] = useState('zones');
  const [expandedSection, setExpandedSection] = useState('overview');

  const dimensions = [
    { id: 'coverage', label: 'Service Coverage', icon: Target, color: 'text-emerald-400', unit: '%' },
    { id: 'usage', label: 'Facility Usage', icon: Users, color: 'text-green-400', unit: '%' },
    { id: 'response', label: 'Response Time', icon: Clock, color: 'text-amber-400', unit: 'h' },
    { id: 'satisfaction', label: 'User Satisfaction', icon: Award, color: 'text-cyan-400', unit: '/5' },
    { id: 'cost', label: 'Cost Efficiency', icon: DollarSign, color: 'text-violet-400', unit: 'per user' },
    { id: 'reliability', label: 'System Reliability', icon: Shield, color: 'text-rose-400', unit: '%' },
  ];

  const comparisonTypes = [
    { id: 'zones', label: 'Geographic Zones', icon: MapPin },
    { id: 'facilities', label: 'Facility Types', icon: Home },
    { id: 'time', label: 'Time Periods', icon: Clock },
    { id: 'demographic', label: 'Demographic Groups', icon: Users },
  ];

  const zones = [
    { id: 'zone-a', name: 'Zone A', coverage: 78, usage: 85, response: 3.2, satisfaction: 4.5, trend: 'up' },
    { id: 'zone-b', name: 'Zone B', coverage: 65, usage: 72, response: 4.8, satisfaction: 3.8, trend: 'stable' },
    { id: 'zone-c', name: 'Zone C', coverage: 42, usage: 58, response: 6.5, satisfaction: 2.9, trend: 'down' },
    { id: 'zone-d', name: 'Zone D', coverage: 89, usage: 91, response: 2.1, satisfaction: 4.8, trend: 'up' },
    { id: 'zone-e', name: 'Zone E', coverage: 71, usage: 79, response: 3.8, satisfaction: 4.1, trend: 'up' },
  ];

  const facilityTypes = [
    { type: 'Public Toilets', count: 24, coverage: 68, satisfaction: 3.9 },
    { type: 'Water Points', count: 18, coverage: 72, satisfaction: 4.2 },
    { type: 'Treatment Plants', count: 4, coverage: 95, satisfaction: 4.7 },
    { type: 'Collection Centers', count: 12, coverage: 61, satisfaction: 3.5 },
  ];

  const benchmarks = [
    { metric: 'Global Standard', value: '80%', status: 'above', color: 'text-emerald-400' },
    { metric: 'National Average', value: '65%', status: 'at', color: 'text-amber-400' },
    { metric: 'Regional Target', value: '75%', status: 'below', color: 'text-rose-400' },
    { metric: 'Previous Period', value: '58%', status: 'above', color: 'text-emerald-400' },
  ];

  const timeRanges = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: '1y', label: '1 Year' },
  ];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-emerald-400" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-rose-400" />;
      default: return <Activity className="h-4 w-4 text-amber-400" />;
    }
  };

  const getStatusBadge = (value, unit, target = 70) => {
    const numericValue = parseInt(value);
    if (numericValue >= target + 10) return 'bg-emerald-500/20 text-emerald-400';
    if (numericValue >= target) return 'bg-green-500/20 text-green-400';
    if (numericValue >= target - 10) return 'bg-amber-500/20 text-amber-400';
    return 'bg-rose-500/20 text-rose-400';
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-emerald-400" />
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-emerald-500/10 text-emerald-300 text-sm rounded-lg px-3 py-1.5 border border-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            >
              {timeRanges.map((range) => (
                <option key={range.id} value={range.id}>{range.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Layers className="h-4 w-4 text-emerald-400" />
            <div className="flex space-x-1">
              {comparisonTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setComparisonType(type.id)}
                  className={`flex items-center space-x-1 px-3 py-1.5 text-sm rounded-lg ${
                    comparisonType === type.id
                      ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white'
                      : 'bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
                  }`}
                >
                  <type.icon className="h-3 w-3" />
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowBenchmarks(!showBenchmarks)}
            className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-300 rounded-lg hover:bg-emerald-500/20 hover:text-white transition-colors border border-emerald-500/20"
          >
            {showBenchmarks ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span className="text-sm">Benchmarks</span>
          </button>
          <button className="p-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-lg transition-colors">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Dimension Selector */}
      <div className="bg-emerald-500/5 rounded-xl p-4 border border-emerald-500/10">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-white">Analysis Dimensions</h4>
          <span className="text-xs text-emerald-400">Select metric to compare</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {dimensions.map((dim) => (
            <button
              key={dim.id}
              onClick={() => setSelectedDimension(dim.id)}
              className={`group flex items-center p-3 rounded-lg transition-all hover:scale-[1.02] ${
                selectedDimension === dim.id
                  ? 'bg-gradient-to-r from-emerald-500/30 to-green-500/30 border border-emerald-500/40'
                  : 'bg-emerald-500/5 hover:bg-emerald-500/15 border border-emerald-500/10'
              }`}
            >
              <dim.icon className={`h-5 w-5 mr-3 ${dim.color}`} />
              <div className="text-left">
                <div className="text-sm font-medium text-gray-200 group-hover:text-white">
                  {dim.label}
                </div>
                <div className="text-xs text-emerald-300/60">Unit: {dim.unit}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Comparison Chart */}
        <div className="lg:col-span-2">
          <div className="bg-emerald-500/5 rounded-xl p-4 border border-emerald-500/10 h-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Performance Comparison</h3>
                <p className="text-sm text-emerald-300/70">
                  {dimensions.find(d => d.id === selectedDimension)?.label} across {comparisonType}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-xs text-emerald-400 hover:text-emerald-300">
                  <RefreshCw className="h-3 w-3" />
                </button>
                <button className="text-xs text-emerald-400 hover:text-emerald-300">
                  <Settings className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Chart Visualization (Placeholder) */}
            <div className="h-64 mb-4">
              <div className="h-full flex items-end space-x-2">
                {zones.map((zone) => (
                  <div key={zone.id} className="flex-1 group relative">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-300 hover:opacity-90 ${
                        zone.trend === 'up' ? 'bg-gradient-to-t from-emerald-500 to-green-500' :
                        zone.trend === 'down' ? 'bg-gradient-to-t from-rose-500 to-red-500' :
                        'bg-gradient-to-t from-amber-500 to-yellow-500'
                      }`}
                      style={{ height: `${zone[selectedDimension] || 50}%` }}
                    >
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="bg-emerald-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          {zone[selectedDimension]}{dimensions.find(d => d.id === selectedDimension)?.unit}
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-2">
                      <div className="text-sm font-medium text-white">{zone.name}</div>
                      <div className="flex items-center justify-center mt-1">
                        {getTrendIcon(zone.trend)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-emerald-500/20">
                    <th className="text-left py-2 px-3 text-emerald-300 font-medium">Zone</th>
                    <th className="text-left py-2 px-3 text-emerald-300 font-medium">Coverage</th>
                    <th className="text-left py-2 px-3 text-emerald-300 font-medium">Usage</th>
                    <th className="text-left py-2 px-3 text-emerald-300 font-medium">Response</th>
                    <th className="text-left py-2 px-3 text-emerald-300 font-medium">Satisfaction</th>
                    <th className="text-left py-2 px-3 text-emerald-300 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {zones.map((zone) => (
                    <tr key={zone.id} className="border-b border-emerald-500/10 hover:bg-emerald-500/5">
                      <td className="py-2 px-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                          <span className="font-medium text-white">{zone.name}</span>
                        </div>
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-white">{zone.coverage}%</span>
                          <div className="w-16 h-1.5 bg-emerald-500/20 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                              style={{ width: `${zone.coverage}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-white">{zone.usage}%</span>
                          <div className="w-16 h-1.5 bg-emerald-500/20 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                              style={{ width: `${zone.usage}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-3">
                        <div className={`text-sm px-2 py-0.5 rounded-full ${getStatusBadge(zone.response, 'h', 4)}`}>
                          {zone.response}h
                        </div>
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex items-center space-x-1">
                          <span className="text-white">{zone.satisfaction}</span>
                          <span className="text-emerald-300/60">/5</span>
                        </div>
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex items-center space-x-1">
                          {getTrendIcon(zone.trend)}
                          <span className={`text-xs ${
                            zone.trend === 'up' ? 'text-emerald-400' :
                            zone.trend === 'down' ? 'text-rose-400' :
                            'text-amber-400'
                          }`}>
                            {zone.trend}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Benchmarks & Insights */}
        <div className="space-y-4">
          {/* Benchmarks Panel */}
          {showBenchmarks && (
            <div className="bg-emerald-500/5 rounded-xl p-4 border border-emerald-500/10">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-white">Performance Benchmarks</h4>
                <Award className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="space-y-3">
                {benchmarks.map((benchmark) => (
                  <div key={benchmark.metric} className="flex items-center justify-between p-2 rounded-lg hover:bg-emerald-500/5 transition-colors">
                    <span className="text-sm text-emerald-300">{benchmark.metric}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${benchmark.color}`}>{benchmark.value}</span>
                      <div className={`w-2 h-2 rounded-full ${
                        benchmark.status === 'above' ? 'bg-emerald-400' :
                        benchmark.status === 'at' ? 'bg-amber-400' :
                        'bg-rose-400'
                      }`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Facility Type Comparison */}
          <div className="bg-emerald-500/5 rounded-xl p-4 border border-emerald-500/10">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-white">Facility Type Performance</h4>
              <Home className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="space-y-3">
              {facilityTypes.map((facility) => (
                <div key={facility.type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-emerald-300">{facility.type}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-emerald-300/60">{facility.count} units</span>
                      <span className="text-sm font-medium text-white">{facility.coverage}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-emerald-500/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                      style={{ width: `${facility.coverage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-emerald-500/5 rounded-xl p-4 border border-emerald-500/10">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-white">Key Insights</h4>
              <Zap className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="space-y-2">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <div className="text-xs text-emerald-400 font-medium mb-1">Zone D Leads Performance</div>
                <div className="text-xs text-emerald-300/80">89% coverage, 91% usage, 4.8/5 satisfaction</div>
              </div>
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <div className="text-xs text-amber-400 font-medium mb-1">Zone C Requires Attention</div>
                <div className="text-xs text-amber-300/80">42% coverage, 2.9/5 satisfaction needs improvement</div>
              </div>
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <div className="text-xs text-cyan-400 font-medium mb-1">Treatment Plants Excel</div>
                <div className="text-xs text-cyan-300/80">95% coverage, highest satisfaction (4.7/5)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-emerald-500/20">
        <div className="text-sm text-emerald-300/70">
          Analysis completed: Today 14:30 • Data range: Last {timeRange}
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-500/10 text-emerald-300 rounded-lg hover:bg-emerald-500/20 hover:text-white transition-colors border border-emerald-500/20">
            <Settings className="h-4 w-4" />
            <span>Customize Report</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all">
            <Download className="h-4 w-4" />
            <span>Export Analysis</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComparativeAnalysis;