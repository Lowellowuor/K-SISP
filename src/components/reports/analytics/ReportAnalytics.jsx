import React, { useState } from 'react';
import {
  BarChart3, TrendingUp, Users, Eye,
  Download, Clock, FileText, CheckCircle,
  AlertCircle, Star, Zap, Filter
} from 'lucide-react';

function ReportAnalytics() {
  const [timeRange, setTimeRange] = useState('month');

  const metrics = [
    {
      label: 'Reports Generated',
      value: '2,450',
      change: '+12%',
      icon: FileText,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      label: 'Avg Creation Time',
      value: '1.8 hours',
      change: '-0.3h',
      icon: Clock,
      color: 'text-green-500',
      bg: 'bg-green-500/10'
    },
    {
      label: 'Template Usage',
      value: '85%',
      change: '+5%',
      icon: Star,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10'
    },
    {
      label: 'Export Success',
      value: '99.2%',
      change: '+0.8%',
      icon: CheckCircle,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    },
    {
      label: 'Active Reporters',
      value: '45',
      change: '+3',
      icon: Users,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    {
      label: 'Reports Published',
      value: '320',
      change: '+24',
      icon: Eye,
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10'
    },
  ];

  const popularReports = [
    { id: 1, title: 'Monthly Sanitation Report', views: 1560, downloads: 890, rating: 4.8 },
    { id: 2, title: 'Water Quality Analysis', views: 1240, downloads: 760, rating: 4.6 },
    { id: 3, title: 'Infrastructure Assessment', views: 980, downloads: 540, rating: 4.7 },
    { id: 4, title: 'Community Feedback Summary', views: 890, downloads: 420, rating: 4.5 },
    { id: 5, title: 'Annual Performance Review', views: 760, downloads: 380, rating: 4.9 },
  ];

  const exportStats = [
    { format: 'PDF', count: 1540, percent: 63 },
    { format: 'Word', count: 450, percent: 18 },
    { format: 'Excel', count: 280, percent: 11 },
    { format: 'PowerPoint', count: 120, percent: 5 },
    { format: 'HTML', count: 60, percent: 2 },
  ];

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Report Analytics Dashboard</h2>
        <p className="text-gray-400">Monitor report performance and user engagement</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          {['day', 'week', 'month', 'quarter', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg ${
                timeRange === range
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-white/5 text-gray-400 rounded-lg hover:text-white">
          <Download className="h-4 w-4" />
          <span>Export Data</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {metrics.map((metric) => (
          <div key={metric.label} className={`glass-effect rounded-xl p-4 ${metric.bg}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-white/10">
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                </div>
                <div className="text-sm font-medium text-gray-300">{metric.label}</div>
              </div>
              <div className={`text-sm font-semibold ${
                metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
              }`}>
                {metric.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
            <div className="text-xs text-gray-400">Last {timeRange}</div>
          </div>
        ))}
      </div>

      {/* Charts and Stats */}
      <div className="grid grid-cols-2 gap-6">
        {/* Popular Reports */}
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Most Popular Reports</h3>
            <AlertCircle className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {popularReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="font-medium text-white">{report.title}</div>
                    <div className="text-xs text-gray-400">ID: REP-{report.id.toString().padStart(3, '0')}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="text-sm text-gray-300">{report.views.toLocaleString()} views</div>
                    <div className="text-xs text-gray-400">{report.downloads} downloads</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-amber-400" />
                    <span className="text-sm text-white">{report.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Statistics */}
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Export Format Distribution</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {exportStats.map((stat) => (
              <div key={stat.format} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10">
                      <FileText className="h-4 w-4 text-gray-300" />
                    </div>
                    <span className="font-medium text-white">{stat.format}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-300">{stat.count.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">{stat.percent}%</div>
                  </div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    style={{ width: `${stat.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quality Metrics */}
      <div className="mt-6 glass-effect rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Quality Metrics</h3>
          <Zap className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-white mb-2">98.5%</div>
            <div className="text-sm text-gray-400">Accuracy Rate</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-white mb-2">95%</div>
            <div className="text-sm text-gray-400">Timeliness</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-white mb-2">4.6/5</div>
            <div className="text-sm text-gray-400">User Satisfaction</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-white mb-2">42%</div>
            <div className="text-sm text-gray-400">Report Reuse</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportAnalytics;