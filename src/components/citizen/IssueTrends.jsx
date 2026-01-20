import React, { useState, useEffect } from 'react';
import {
  TrendingUp, TrendingDown, AlertCircle, BarChart3,
  PieChart, LineChart, Calendar, Filter, Search,
  ChevronDown, ChevronUp, Clock, Users, Map,
  Shield, Zap, Database, Cpu, Bell, Eye,
  Download, Share2, RefreshCw, Settings
} from 'lucide-react';

const IssueTrends = ({ darkMode }) => {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTrend, setSelectedTrend] = useState(null);
  const [expandedSections, setExpandedSections] = useState(['patterns', 'hotspots']);

  const timeRanges = [
    { id: '7d', label: '7D', description: 'Last 7 days' },
    { id: '30d', label: '30D', description: 'Last 30 days' },
    { id: '90d', label: '3M', description: 'Last quarter' },
    { id: '365d', label: '1Y', description: 'Last year' },
  ];

  const categories = [
    { id: 'all', label: 'All Issues', count: 1540, color: 'text-emerald-400' },
    { id: 'sanitation', label: 'Sanitation', count: 432, color: 'text-green-400' },
    { id: 'water', label: 'Water Supply', count: 387, color: 'text-blue-400' },
    { id: 'waste', label: 'Waste Management', count: 298, color: 'text-amber-400' },
    { id: 'infrastructure', label: 'Infrastructure', count: 215, color: 'text-purple-400' },
    { id: 'health', label: 'Health Services', count: 156, color: 'text-rose-400' },
  ];

  const trendsData = [
    {
      id: 1,
      title: 'Water Supply Issues Spike',
      category: 'water',
      trend: 'up',
      change: '+42%',
      severity: 'high',
      description: '24% increase in water supply complaints in North Zone',
      timeframe: 'Last 7 days',
      impact: 156,
      zone: 'north',
      tags: ['emergency', 'priority', 'critical']
    },
    {
      id: 2,
      title: 'Sanitation Improvement Trend',
      category: 'sanitation',
      trend: 'down',
      change: '-18%',
      severity: 'low',
      description: 'Steady decrease in sanitation complaints across all zones',
      timeframe: 'Last 30 days',
      impact: 89,
      zone: 'all',
      tags: ['improvement', 'positive']
    },
    {
      id: 3,
      title: 'Waste Collection Peak Hours',
      category: 'waste',
      trend: 'stable',
      change: '+3%',
      severity: 'medium',
      description: 'Increased reports during 8-10 AM collection hours',
      timeframe: 'Weekly pattern',
      impact: 124,
      zone: 'east',
      tags: ['pattern', 'timing']
    },
    {
      id: 4,
      title: 'Infrastructure Complaints Rising',
      category: 'infrastructure',
      trend: 'up',
      change: '+27%',
      severity: 'high',
      description: 'Growing concerns about drainage and road conditions',
      timeframe: 'Last 14 days',
      impact: 187,
      zone: 'south',
      tags: ['critical', 'infrastructure']
    },
    {
      id: 5,
      title: 'Health Service Response Delays',
      category: 'health',
      trend: 'up',
      change: '+31%',
      severity: 'medium',
      description: 'Increased reports of slow health service responses',
      timeframe: 'Last 30 days',
      impact: 92,
      zone: 'west',
      tags: ['response', 'delays']
    },
    {
      id: 6,
      title: 'Community Engagement Surge',
      category: 'all',
      trend: 'up',
      change: '+58%',
      severity: 'low',
      description: 'Significant increase in community participation',
      timeframe: 'Last quarter',
      impact: 456,
      zone: 'all',
      tags: ['positive', 'engagement']
    },
  ];

  const patterns = [
    {
      id: 1,
      pattern: 'Monday Morning Peak',
      description: '40% increase in reports on Monday mornings',
      category: 'all',
      confidence: 92,
      timeframe: 'Weekly',
      recommendation: 'Increase staffing on Monday mornings'
    },
    {
      id: 2,
      pattern: 'Rainfall Correlation',
      description: '85% correlation between rainfall and drainage complaints',
      category: 'infrastructure',
      confidence: 87,
      timeframe: 'Seasonal',
      recommendation: 'Pre-emptive maintenance before rainy season'
    },
    {
      id: 3,
      pattern: 'Holiday Service Gaps',
      description: 'Service delays reported during public holidays',
      category: 'all',
      confidence: 78,
      timeframe: 'Monthly',
      recommendation: 'Implement holiday shift schedules'
    },
    {
      id: 4,
      pattern: 'Evening Sanitation Issues',
      description: 'Peak sanitation complaints between 6-9 PM',
      category: 'sanitation',
      confidence: 84,
      timeframe: 'Daily',
      recommendation: 'Adjust cleaning schedules to evening hours'
    },
  ];

  const hotspots = [
    {
      id: 1,
      zone: 'North Zone',
      issue: 'Water Supply',
      count: 156,
      trend: 'rising',
      priority: 'critical',
      coordinates: '12.34, -1.56'
    },
    {
      id: 2,
      zone: 'South Zone',
      issue: 'Waste Collection',
      count: 142,
      trend: 'stable',
      priority: 'high',
      coordinates: '12.29, -1.62'
    },
    {
      id: 3,
      zone: 'East Zone',
      issue: 'Drainage',
      count: 98,
      trend: 'rising',
      priority: 'medium',
      coordinates: '12.35, -1.58'
    },
    {
      id: 4,
      zone: 'West Zone',
      issue: 'Road Repair',
      count: 76,
      trend: 'stable',
      priority: 'medium',
      coordinates: '12.32, -1.64'
    },
  ];

  const historicalData = [
    { month: 'Jan', sanitation: 320, water: 280, waste: 195, infrastructure: 120 },
    { month: 'Feb', sanitation: 305, water: 310, waste: 210, infrastructure: 135 },
    { month: 'Mar', sanitation: 290, water: 295, waste: 205, infrastructure: 145 },
    { month: 'Apr', sanitation: 315, water: 330, waste: 220, infrastructure: 155 },
    { month: 'May', sanitation: 280, water: 350, waste: 235, infrastructure: 165 },
    { month: 'Jun', sanitation: 265, water: 365, waste: 240, infrastructure: 170 },
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return darkMode ? 'text-green-400' : 'text-green-600';
      case 'down': return darkMode ? 'text-rose-400' : 'text-rose-600';
      default: return darkMode ? 'text-amber-400' : 'text-amber-600';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return darkMode ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-100 text-rose-700';
      case 'medium': return darkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700';
      default: return darkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-rose-500';
      case 'high': return 'bg-amber-500';
      case 'medium': return 'bg-emerald-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-emerald-500/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white">Issue Trend Analysis</h3>
            <p className="text-sm text-emerald-300/70">Pattern detection and predictive insights</p>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Time Range Selector */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 p-1 rounded-lg bg-emerald-900/10">
                {timeRanges.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setTimeRange(range.id)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                      timeRange === range.id
                        ? `${darkMode ? 'bg-emerald-600/40 text-white' : 'bg-emerald-100 text-emerald-800'}`
                        : `${darkMode ? 'text-emerald-200 hover:text-white hover:bg-emerald-800/30' : 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50'}`
                    }`}
                    title={range.description}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg bg-emerald-900/30 text-emerald-400 hover:bg-emerald-800/40 hover:text-emerald-300 transition-colors">
                <Download className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg bg-emerald-900/30 text-emerald-400 hover:bg-emerald-800/40 hover:text-emerald-300 transition-colors">
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                activeCategory === category.id
                  ? `${darkMode 
                      ? 'bg-gradient-to-r from-emerald-600/40 to-green-500/40 text-white shadow-lg shadow-emerald-500/20' 
                      : 'bg-emerald-100 text-emerald-800 shadow-lg shadow-emerald-200/50'}`
                  : `${darkMode 
                      ? 'bg-emerald-900/20 text-emerald-100 hover:bg-emerald-800/30' 
                      : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`
              }`}
            >
              <span className="text-sm font-medium">{category.label}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded ${
                darkMode ? 'bg-emerald-900/40' : 'bg-emerald-200'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className={`p-4 rounded-2xl ${
            darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">6</div>
                <div className="text-sm text-emerald-400/70">Active Trends</div>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-400/30" />
            </div>
          </div>
          
          <div className={`p-4 rounded-2xl ${
            darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">4</div>
                <div className="text-sm text-emerald-400/70">Patterns Detected</div>
              </div>
              <BarChart3 className="h-8 w-8 text-green-400/30" />
            </div>
          </div>
          
          <div className={`p-4 rounded-2xl ${
            darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">92%</div>
                <div className="text-sm text-emerald-400/70">Prediction Accuracy</div>
              </div>
              <Cpu className="h-8 w-8 text-cyan-400/30" />
            </div>
          </div>
        </div>

        {/* Current Trends */}
        <div className={`mb-6 rounded-2xl p-4 ${
          darkMode ? 'glass-green-card' : 'glass-light-card'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-semibold text-emerald-300">Current Trends</h4>
              <p className="text-xs text-emerald-400/70">Real-time trend detection and analysis</p>
            </div>
            <button 
              onClick={() => toggleSection('trends')}
              className="p-1 rounded-lg hover:bg-emerald-800/30 transition-colors"
            >
              {expandedSections.includes('trends') ? 
                <ChevronUp className="h-4 w-4 text-emerald-400" /> : 
                <ChevronDown className="h-4 w-4 text-emerald-400" />
              }
            </button>
          </div>

          {expandedSections.includes('trends') && (
            <div className="space-y-3">
              {trendsData
                .filter(trend => activeCategory === 'all' || trend.category === activeCategory)
                .map((trend) => (
                  <div
                    key={trend.id}
                    onClick={() => setSelectedTrend(trend.id === selectedTrend ? null : trend.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      darkMode ? 'bg-emerald-900/20 hover:bg-emerald-900/30' : 'bg-emerald-50 hover:bg-emerald-100'
                    } ${selectedTrend === trend.id ? 'ring-2 ring-emerald-500/50' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-white">{trend.title}</span>
                          <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(trend.severity)}`}>
                            {trend.severity}
                          </span>
                        </div>
                        
                        <p className={`text-sm mb-3 ${
                          darkMode ? 'text-emerald-300/70' : 'text-emerald-600/70'
                        }`}>
                          {trend.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {trend.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className={`text-xs px-2 py-1 rounded ${
                                darkMode 
                                  ? 'bg-emerald-900/30 text-emerald-400' 
                                  : 'bg-emerald-100 text-emerald-600'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getTrendColor(trend.trend)}`}>
                          {trend.change}
                        </div>
                        <div className={`text-xs ${
                          darkMode ? 'text-emerald-400/70' : 'text-emerald-600/70'
                        }`}>
                          {trend.timeframe}
                        </div>
                        <div className="text-xs text-emerald-300 mt-1">
                          Impact: {trend.impact} reports
                        </div>
                      </div>
                    </div>
                    
                    {/* Expanded Details */}
                    {selectedTrend === trend.id && (
                      <div className="mt-3 pt-3 border-t border-emerald-500/20">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-xs font-medium text-emerald-400 mb-2">Details</h5>
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-emerald-300/70">Zone:</span>
                                <span className="text-emerald-200">{trend.zone}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-emerald-300/70">Category:</span>
                                <span className="text-emerald-200">{trend.category}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-emerald-300/70">First Detected:</span>
                                <span className="text-emerald-200">2 days ago</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h5 className="text-xs font-medium text-emerald-400 mb-2">Actions</h5>
                            <div className="flex flex-wrap gap-2">
                              <button className="px-3 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 rounded-lg text-xs transition-colors">
                                Create Alert
                              </button>
                              <button className="px-3 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 rounded-lg text-xs transition-colors">
                                Assign Team
                              </button>
                              <button className="px-3 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 rounded-lg text-xs transition-colors">
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Patterns & Hotspots Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Patterns */}
          <div className={`rounded-2xl p-4 ${
            darkMode ? 'glass-green-card' : 'glass-light-card'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-semibold text-emerald-300">Detected Patterns</h4>
                <p className="text-xs text-emerald-400/70">Recurring issue patterns</p>
              </div>
              <button 
                onClick={() => toggleSection('patterns')}
                className="p-1 rounded-lg hover:bg-emerald-800/30 transition-colors"
              >
                {expandedSections.includes('patterns') ? 
                  <ChevronUp className="h-4 w-4 text-emerald-400" /> : 
                  <ChevronDown className="h-4 w-4 text-emerald-400" />
                }
              </button>
            </div>

            {expandedSections.includes('patterns') && (
              <div className="space-y-3">
                {patterns.map((pattern) => (
                  <div
                    key={pattern.id}
                    className={`p-3 rounded-lg ${
                      darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h5 className="font-medium text-white mb-1">{pattern.pattern}</h5>
                        <p className={`text-xs ${
                          darkMode ? 'text-emerald-300/70' : 'text-emerald-600/70'
                        }`}>
                          {pattern.description}
                        </p>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        darkMode ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                      }`}>
                        {pattern.confidence}% conf
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <span className={darkMode ? 'text-emerald-400/70' : 'text-emerald-600/70'}>
                          {pattern.timeframe}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full ${
                          darkMode ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                        }`}>
                          {pattern.category}
                        </span>
                      </div>
                      <button className="text-emerald-400 hover:text-emerald-300 text-xs">
                        Apply
                      </button>
                    </div>
                    
                    <div className={`mt-2 text-xs p-2 rounded ${
                      darkMode ? 'bg-emerald-900/40 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      <strong>Recommendation:</strong> {pattern.recommendation}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hotspots */}
          <div className={`rounded-2xl p-4 ${
            darkMode ? 'glass-green-card' : 'glass-light-card'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-semibold text-emerald-300">Issue Hotspots</h4>
                <p className="text-xs text-emerald-400/70">Geographic concentration zones</p>
              </div>
              <button 
                onClick={() => toggleSection('hotspots')}
                className="p-1 rounded-lg hover:bg-emerald-800/30 transition-colors"
              >
                {expandedSections.includes('hotspots') ? 
                  <ChevronUp className="h-4 w-4 text-emerald-400" /> : 
                  <ChevronDown className="h-4 w-4 text-emerald-400" />
                }
              </button>
            </div>

            {expandedSections.includes('hotspots') && (
              <div className="space-y-3">
                {hotspots.map((hotspot) => (
                  <div
                    key={hotspot.id}
                    className={`p-3 rounded-lg ${
                      darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h5 className="font-medium text-white mb-1">{hotspot.zone}</h5>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs ${
                            darkMode ? 'text-emerald-300/70' : 'text-emerald-600/70'
                          }`}>
                            {hotspot.issue}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            hotspot.trend === 'rising' ? 'bg-rose-500/20 text-rose-400' :
                            'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {hotspot.trend}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">{hotspot.count}</div>
                        <div className={`text-xs px-2 py-1 rounded mt-1 ${getSeverityColor(hotspot.priority)}`}>
                          {hotspot.priority}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1">
                        <Map className="h-3 w-3 text-emerald-400" />
                        <span className={darkMode ? 'text-emerald-400/70' : 'text-emerald-600/70'}>
                          {hotspot.coordinates}
                        </span>
                      </div>
                      <button className="text-emerald-400 hover:text-emerald-300 text-xs">
                        View on Map
                      </button>
                    </div>
                    
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-emerald-400/70 mb-1">
                        <span>Report Density</span>
                        <span>{Math.round((hotspot.count / 200) * 100)}%</span>
                      </div>
                      <div className="w-full bg-emerald-900/30 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-2 rounded-full ${getPriorityColor(hotspot.priority)}`}
                          style={{ width: `${Math.min(100, (hotspot.count / 200) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Historical Trends Chart */}
        <div className={`rounded-2xl p-4 ${
          darkMode ? 'glass-green-card' : 'glass-light-card'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-semibold text-emerald-300">Historical Trends</h4>
              <p className="text-xs text-emerald-400/70">6-month comparison by category</p>
            </div>
            <LineChart className="h-5 w-5 text-emerald-400" />
          </div>

          <div className="h-48">
            <div className="h-full flex items-end space-x-2">
              {historicalData.map((month, index) => {
                const maxValue = Math.max(
                  ...historicalData.flatMap(m => [m.sanitation, m.water, m.waste, m.infrastructure])
                );
                
                const sanitHeight = (month.sanitation / maxValue) * 100;
                const waterHeight = (month.water / maxValue) * 100;
                const wasteHeight = (month.waste / maxValue) * 100;
                const infraHeight = (month.infrastructure / maxValue) * 100;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center space-y-1">
                    <div className="flex items-end space-x-0.5 flex-1 w-full">
                      <div 
                        className="w-1/4 bg-emerald-400/60 rounded-t hover:bg-emerald-400/80 transition-colors"
                        style={{ height: `${sanitHeight}%` }}
                        title={`Sanitation: ${month.sanitation}`}
                      />
                      <div 
                        className="w-1/4 bg-blue-400/60 rounded-t hover:bg-blue-400/80 transition-colors"
                        style={{ height: `${waterHeight}%` }}
                        title={`Water: ${month.water}`}
                      />
                      <div 
                        className="w-1/4 bg-amber-400/60 rounded-t hover:bg-amber-400/80 transition-colors"
                        style={{ height: `${wasteHeight}%` }}
                        title={`Waste: ${month.waste}`}
                      />
                      <div 
                        className="w-1/4 bg-purple-400/60 rounded-t hover:bg-purple-400/80 transition-colors"
                        style={{ height: `${infraHeight}%` }}
                        title={`Infrastructure: ${month.infrastructure}`}
                      />
                    </div>
                    <span className="text-xs text-emerald-400/70">{month.month}</span>
                  </div>
                );
              })}
            </div>
            
            {/* Legend */}
            <div className="flex flex-wrap gap-4 justify-center mt-4">
              {[
                { label: 'Sanitation', color: 'bg-emerald-400' },
                { label: 'Water Supply', color: 'bg-blue-400' },
                { label: 'Waste Management', color: 'bg-amber-400' },
                { label: 'Infrastructure', color: 'bg-purple-400' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-1">
                  <div className={`h-2 w-2 ${item.color} rounded`}></div>
                  <span className="text-xs text-emerald-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`p-4 border-t ${
        darkMode ? 'border-emerald-500/20 bg-emerald-900/20' : 'border-emerald-200 bg-emerald-50'
      }`}>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Database className="h-3 w-3 text-emerald-400" />
              <span className={darkMode ? 'text-emerald-400/70' : 'text-emerald-600/70'}>
                {activeCategory === 'all' ? 'All categories' : categories.find(c => c.id === activeCategory)?.label}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3 text-emerald-400" />
              <span className={darkMode ? 'text-emerald-400/70' : 'text-emerald-600/70'}>
                {timeRanges.find(t => t.id === timeRange)?.description}
              </span>
            </div>
          </div>
          <button className="text-emerald-400 hover:text-emerald-300 text-sm">
            Generate Trend Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueTrends;