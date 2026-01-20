import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Eye, Download, Clock, 
  Users, FileText, BarChart3, Share2, Target, 
  Award, Calendar, Zap, AlertCircle, CheckCircle,
  PieChart, LineChart, Database, MessageSquare,
  ChevronRight, Filter, Search, RefreshCw
} from 'lucide-react';

const ReportsMetrics = ({ darkMode, reports = [] }) => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [stats, setStats] = useState({
    totalReports: 0,
    published: 0,
    draft: 0,
    totalViews: 0,
    avgCompletion: 0,
    teamEngagement: 0
  });

  const timeRanges = [
    { id: '7d', label: '7D', description: 'Last 7 days' },
    { id: '30d', label: '30D', description: 'Last 30 days' },
    { id: '90d', label: '3M', description: 'Last quarter' },
    { id: '365d', label: '1Y', description: 'Last year' },
  ];

  const metrics = [
    { id: 'all', label: 'All Reports', color: 'text-emerald-400' },
    { id: 'published', label: 'Published', color: 'text-green-400' },
    { id: 'draft', label: 'Draft', color: 'text-amber-400' },
    { id: 'review', label: 'In Review', color: 'text-blue-400' },
    { id: 'scheduled', label: 'Scheduled', color: 'text-purple-400' },
  ];

  // Calculate statistics based on reports data
  useEffect(() => {
    const totalReports = reports.length;
    const published = reports.filter(r => r.status === 'published').length;
    const draft = reports.filter(r => r.status === 'draft').length;
    const totalViews = reports.reduce((sum, report) => sum + report.views, 0);
    const avgCompletion = reports.reduce((sum, report) => sum + report.progress, 0) / totalReports;
    const teamEngagement = reports.filter(r => r.views > 0).length / totalReports * 100;

    setStats({
      totalReports,
      published,
      draft,
      totalViews,
      avgCompletion: Math.round(avgCompletion),
      teamEngagement: Math.round(teamEngagement)
    });
  }, [reports]);

  const performanceMetrics = [
    {
      id: 1,
      title: 'Total Reports',
      value: stats.totalReports.toString(),
      change: '+4',
      trend: 'up',
      icon: FileText,
      color: 'text-emerald-400',
      description: 'Reports created'
    },
    {
      id: 2,
      title: 'Published Reports',
      value: stats.published.toString(),
      change: '+2',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-green-400',
      description: 'Completed reports'
    },
    {
      id: 3,
      title: 'Average Views',
      value: Math.round(stats.totalViews / Math.max(1, stats.totalReports)).toString(),
      change: '+12',
      trend: 'up',
      icon: Eye,
      color: 'text-cyan-400',
      description: 'Per report'
    },
    {
      id: 4,
      title: 'Avg Completion',
      value: `${stats.avgCompletion}%`,
      change: '+5%',
      trend: 'up',
      icon: Target,
      color: 'text-amber-400',
      description: 'Report progress'
    },
    {
      id: 5,
      title: 'Team Engagement',
      value: `${stats.teamEngagement}%`,
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-400',
      description: 'Active participation'
    },
    {
      id: 6,
      title: 'Avg Creation Time',
      value: '2.4d',
      change: '-0.6d',
      trend: 'down',
      icon: Clock,
      color: 'text-rose-400',
      description: 'Time to publish'
    },
  ];

  const popularReports = [
    { id: 1, title: 'Monthly Sanitation Report', views: 145, downloads: 42, shares: 18, status: 'published' },
    { id: 2, title: 'Q4 Performance Analysis', views: 89, downloads: 23, shares: 9, status: 'published' },
    { id: 3, title: 'Technical Infrastructure', views: 67, downloads: 15, shares: 5, status: 'review' },
    { id: 4, title: 'Spatial Coverage Map', views: 54, downloads: 12, shares: 4, status: 'published' },
  ];

  const engagementData = [
    { day: 'Mon', views: 45, downloads: 12 },
    { day: 'Tue', views: 67, downloads: 18 },
    { day: 'Wed', views: 89, downloads: 23 },
    { day: 'Thu', views: 54, downloads: 15 },
    { day: 'Fri', views: 78, downloads: 21 },
    { day: 'Sat', views: 34, downloads: 8 },
    { day: 'Sun', views: 23, downloads: 6 },
  ];

  const reportTypesData = [
    { type: 'Executive', count: 8, color: 'bg-emerald-500' },
    { type: 'Analytical', count: 12, color: 'bg-green-500' },
    { type: 'Technical', count: 6, color: 'bg-amber-500' },
    { type: 'Research', count: 4, color: 'bg-cyan-500' },
    { type: 'Policy', count: 3, color: 'bg-purple-500' },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-emerald-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Report Analytics Dashboard</h3>
            <p className="text-sm text-emerald-300/70">Performance metrics and engagement insights</p>
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

            {/* Refresh Button */}
            <button className="p-2 rounded-lg bg-emerald-900/30 text-emerald-400 hover:bg-emerald-800/40 hover:text-emerald-300 transition-colors">
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Performance Metrics */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-emerald-300">Performance Overview</h4>
            <div className="flex items-center space-x-2">
              {metrics.map((metric) => (
                <button
                  key={metric.id}
                  onClick={() => setSelectedMetric(metric.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    selectedMetric === metric.id
                      ? `${darkMode ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white'}`
                      : `${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'}`
                  }`}
                >
                  {metric.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {performanceMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.id}
                  className={`group cursor-pointer rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                    darkMode
                      ? 'bg-emerald-900/20 border border-emerald-500/20 hover:border-emerald-400/40'
                      : 'bg-white border border-emerald-100 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className={`p-2 rounded-lg ${darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'} inline-block mb-2`}>
                        <Icon className={`h-4 w-4 ${metric.color}`} />
                      </div>
                      <p className={`text-xs font-medium ${
                        darkMode ? 'text-emerald-300/70' : 'text-emerald-600/70'
                      }`}>
                        {metric.title}
                      </p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      metric.trend === 'up'
                        ? darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                        : darkMode ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-100 text-rose-600'
                    }`}>
                      {metric.change}
                    </div>
                  </div>
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className={`text-xl font-bold ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {metric.value}
                      </h3>
                      <p className={`text-xs mt-1 ${
                        darkMode ? 'text-emerald-400/60' : 'text-emerald-600/60'
                      }`}>
                        {metric.description}
                      </p>
                    </div>
                    
                    <div className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      darkMode ? 'text-emerald-400' : 'text-emerald-600'
                    }`}>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Engagement Chart */}
          <div className={`rounded-2xl p-4 ${
            darkMode ? 'glass-green-card' : 'glass-light-card'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-semibold text-emerald-300">Weekly Engagement</h4>
                <p className="text-xs text-emerald-400/70">Views vs Downloads</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="h-2 w-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-xs text-emerald-400">Views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-2 w-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-xs text-cyan-400">Downloads</span>
                </div>
              </div>
            </div>

            <div className="h-48">
              <div className="h-full flex items-end space-x-1">
                {engagementData.map((day, index) => {
                  const maxValue = Math.max(...engagementData.map(d => d.views));
                  const viewsHeight = (day.views / maxValue) * 100;
                  const downloadsHeight = (day.downloads / maxValue) * 100;
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center space-y-1">
                      <div className="flex items-end space-x-1 flex-1 w-full">
                        <div 
                          className="w-1/2 bg-emerald-400/50 rounded-t hover:bg-emerald-400/70 transition-colors"
                          style={{ height: `${viewsHeight}%` }}
                          title={`${day.views} views`}
                        />
                        <div 
                          className="w-1/2 bg-cyan-400/50 rounded-t hover:bg-cyan-400/70 transition-colors"
                          style={{ height: `${downloadsHeight}%` }}
                          title={`${day.downloads} downloads`}
                        />
                      </div>
                      <span className="text-xs text-emerald-400/70">{day.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Report Types Distribution */}
          <div className={`rounded-2xl p-4 ${
            darkMode ? 'glass-green-card' : 'glass-light-card'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-semibold text-emerald-300">Report Types Distribution</h4>
                <p className="text-xs text-emerald-400/70">By category</p>
              </div>
              <PieChart className="h-5 w-5 text-emerald-400" />
            </div>

            <div className="space-y-3">
              {reportTypesData.map((item, index) => {
                const total = reportTypesData.reduce((sum, i) => sum + i.count, 0);
                const percentage = Math.round((item.count / total) * 100);
                
                return (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`h-3 w-3 rounded-full ${item.color}`}></div>
                        <span className="text-sm text-emerald-200">{item.type}</span>
                      </div>
                      <div className="text-sm text-white font-medium">
                        {item.count} ({percentage}%)
                      </div>
                    </div>
                    <div className="w-full bg-emerald-900/30 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Popular Reports */}
        <div className={`rounded-2xl p-4 ${
          darkMode ? 'glass-green-card' : 'glass-light-card'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-semibold text-emerald-300">Most Popular Reports</h4>
              <p className="text-xs text-emerald-400/70">Highest engagement metrics</p>
            </div>
            <button className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center space-x-1">
              <span>View All</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-3">
            {popularReports.map((report) => (
              <div
                key={report.id}
                className="p-3 rounded-lg bg-emerald-900/20 hover:bg-emerald-900/30 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`h-2 w-2 rounded-full ${
                      report.status === 'published' ? 'bg-green-500' :
                      'bg-blue-500'
                    }`}></div>
                    <span className="text-sm font-medium text-emerald-200 group-hover:text-white">
                      {report.title}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-emerald-400">
                    <Eye className="h-3 w-3" />
                    <span>{report.views}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center space-x-1 text-xs text-emerald-400">
                    <Download className="h-3 w-3" />
                    <span>{report.downloads} downloads</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-emerald-400">
                    <Share2 className="h-3 w-3" />
                    <span>{report.shares} shares</span>
                  </div>
                  <div className="text-xs text-emerald-400 text-right">
                    Engagement Score: {Math.round((report.views + report.downloads * 2 + report.shares * 3) / 6)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights & Recommendations */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Key Insights */}
          <div className={`rounded-2xl p-4 ${
            darkMode ? 'glass-green-card' : 'glass-light-card'
          }`}>
            <div className="flex items-center space-x-2 mb-4">
              <Lightbulb className="h-5 w-5 text-amber-400" />
              <h4 className="text-sm font-semibold text-emerald-300">Key Insights</h4>
            </div>
            <div className="space-y-3">
              {[
                'Executive reports receive 45% more views than technical reports',
                'Reports published on Tuesday get 30% higher engagement',
                'Interactive charts increase read time by 65%',
                'Team collaboration improves completion rate by 40%',
              ].map((insight, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="h-1.5 w-1.5 bg-emerald-400 rounded-full mt-2"></div>
                  <p className="text-sm text-emerald-200/80 flex-1">{insight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className={`rounded-2xl p-4 ${
            darkMode ? 'glass-green-card' : 'glass-light-card'
          }`}>
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="h-5 w-5 text-cyan-400" />
              <h4 className="text-sm font-semibold text-emerald-300">Recommendations</h4>
            </div>
            <div className="space-y-3">
              {[
                'Schedule report publications for Tuesday mornings',
                'Add more interactive visualizations to executive summaries',
                'Enable team commenting on draft reports',
                'Set up automated weekly analytics reports',
                'Create template library for common report types',
              ].map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="h-1.5 w-1.5 bg-cyan-400 rounded-full mt-2"></div>
                  <p className="text-sm text-emerald-200 flex-1">{recommendation}</p>
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
                Data updated: Today 14:30
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <BarChart3 className="h-3 w-3 text-emerald-400" />
              <span className={darkMode ? 'text-emerald-400/70' : 'text-emerald-600/70'}>
                {reports.length} reports analyzed
              </span>
            </div>
          </div>
          <button className="text-emerald-400 hover:text-emerald-300 text-sm">
            Export Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

// Add missing import
import { Lightbulb } from 'lucide-react';

export default ReportsMetrics;