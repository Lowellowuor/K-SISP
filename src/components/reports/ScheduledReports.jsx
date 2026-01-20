import React, { useState } from 'react';
import {
  Calendar, Clock, Play, Pause, Edit, Trash2,
  ChevronRight, ChevronDown, Bell, Repeat,
  FileText, BarChart3, Map, Database, Users,
  CheckCircle, XCircle, AlertCircle, Zap,
  Filter, Search, Plus, RefreshCw, Download,
  MoreVertical, Eye, Share2, Copy
} from 'lucide-react';

const ScheduledReports = ({ darkMode }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [selectedReports, setSelectedReports] = useState([]);

  const filters = [
    { id: 'all', label: 'All', count: 12, color: 'text-emerald-400' },
    { id: 'active', label: 'Active', count: 8, color: 'text-green-400' },
    { id: 'paused', label: 'Paused', count: 2, color: 'text-amber-400' },
    { id: 'completed', label: 'Completed', count: 1, color: 'text-cyan-400' },
    { id: 'failed', label: 'Failed', count: 1, color: 'text-rose-400' },
  ];

  const schedules = [
    {
      id: 1,
      name: 'Monthly Sanitation Report',
      type: 'executive',
      icon: FileText,
      color: 'bg-emerald-500',
      frequency: 'monthly',
      nextRun: '2024-03-01T08:00:00',
      lastRun: '2024-02-01T08:00:00',
      status: 'active',
      recipients: 12,
      format: 'PDF',
      size: '15 MB',
      runtime: '2m 30s',
      runs: 24,
      successRate: 96,
      notifications: true,
      description: 'Comprehensive monthly report covering all sanitation metrics',
    },
    {
      id: 2,
      name: 'Weekly Performance Analytics',
      type: 'analytical',
      icon: BarChart3,
      color: 'bg-green-500',
      frequency: 'weekly',
      nextRun: '2024-02-26T09:00:00',
      lastRun: '2024-02-19T09:00:00',
      status: 'active',
      recipients: 8,
      format: 'Excel',
      size: '8 MB',
      runtime: '1m 15s',
      runs: 45,
      successRate: 99,
      notifications: true,
      description: 'Weekly performance metrics and trend analysis',
    },
    {
      id: 3,
      name: 'Spatial Coverage Update',
      type: 'spatial',
      icon: Map,
      color: 'bg-teal-500',
      frequency: 'daily',
      nextRun: '2024-02-24T06:00:00',
      lastRun: '2024-02-23T06:00:00',
      status: 'paused',
      recipients: 4,
      format: 'PDF + Data',
      size: '25 MB',
      runtime: '4m 20s',
      runs: 156,
      successRate: 92,
      notifications: false,
      description: 'Daily spatial data updates with geographic analysis',
    },
    {
      id: 4,
      name: 'Technical Infrastructure Report',
      type: 'technical',
      icon: Database,
      color: 'bg-amber-500',
      frequency: 'quarterly',
      nextRun: '2024-04-01T10:00:00',
      lastRun: '2024-01-01T10:00:00',
      status: 'active',
      recipients: 6,
      format: 'PDF + PPT',
      size: '32 MB',
      runtime: '5m 10s',
      runs: 8,
      successRate: 100,
      notifications: true,
      description: 'Quarterly technical infrastructure performance report',
    },
    {
      id: 5,
      name: 'Community Impact Dashboard',
      type: 'executive',
      icon: Users,
      color: 'bg-emerald-600',
      frequency: 'weekly',
      nextRun: '2024-02-25T11:00:00',
      lastRun: '2024-02-18T11:00:00',
      status: 'completed',
      recipients: 15,
      format: 'Interactive',
      size: '18 MB',
      runtime: '3m 45s',
      runs: 32,
      successRate: 94,
      notifications: true,
      description: 'Weekly community engagement and impact metrics',
    },
    {
      id: 6,
      name: 'Predictive Analytics Update',
      type: 'analytical',
      icon: BarChart3,
      color: 'bg-green-600',
      frequency: 'monthly',
      nextRun: '2024-03-05T14:00:00',
      lastRun: '2024-02-05T14:00:00',
      status: 'failed',
      recipients: 10,
      format: 'PDF + Model',
      size: '42 MB',
      runtime: '7m 20s',
      runs: 6,
      successRate: 83,
      notifications: true,
      description: 'Monthly predictive model updates and forecasts',
    },
  ];

  const frequencies = [
    { id: 'daily', label: 'Daily', icon: Repeat, color: 'text-emerald-400' },
    { id: 'weekly', label: 'Weekly', icon: Calendar, color: 'text-green-400' },
    { id: 'monthly', label: 'Monthly', icon: Calendar, color: 'text-cyan-400' },
    { id: 'quarterly', label: 'Quarterly', icon: Calendar, color: 'text-amber-400' },
    { id: 'yearly', label: 'Yearly', icon: Calendar, color: 'text-purple-400' },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeUntilNextRun = (dateString) => {
    const now = new Date();
    const next = new Date(dateString);
    const diff = next - now;
    
    if (diff <= 0) return 'Running now';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return { icon: CheckCircle, color: 'text-green-400' };
      case 'paused':
        return { icon: Pause, color: 'text-amber-400' };
      case 'completed':
        return { icon: CheckCircle, color: 'text-cyan-400' };
      case 'failed':
        return { icon: XCircle, color: 'text-rose-400' };
      default:
        return { icon: AlertCircle, color: 'text-emerald-400' };
    }
  };

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleSelectReport = (id) => {
    setSelectedReports(prev =>
      prev.includes(id)
        ? prev.filter(reportId => reportId !== id)
        : [...prev, id]
    );
  };

  const handleToggleStatus = (id, currentStatus) => {
    console.log(`Toggling status for report ${id} from ${currentStatus}`);
    // In a real app, this would make an API call
  };

  const handleRunNow = (id) => {
    console.log(`Running scheduled report ${id} now`);
    // In a real app, this would trigger immediate execution
  };

  const handleEdit = (id) => {
    console.log(`Editing scheduled report ${id}`);
    // In a real app, this would open edit modal
  };

  const handleDelete = (id) => {
    console.log(`Deleting scheduled report ${id}`);
    // In a real app, this would show confirmation and delete
  };

  const filteredSchedules = schedules.filter(schedule => {
    if (activeFilter === 'all') return true;
    return schedule.status === activeFilter;
  });

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-emerald-500/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white">Scheduled Reports</h3>
            <p className="text-sm text-emerald-300/70">Automated report generation and distribution</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-lg bg-emerald-900/30 text-emerald-400 hover:bg-emerald-800/40 hover:text-emerald-300 transition-colors">
              <RefreshCw className="h-4 w-4" />
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">New Schedule</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const StatusIcon = getStatusIcon(filter.id).icon;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  activeFilter === filter.id
                    ? `${darkMode 
                        ? 'bg-gradient-to-r from-emerald-600/40 to-green-500/40 text-white shadow-lg shadow-emerald-500/20' 
                        : 'bg-emerald-100 text-emerald-800 shadow-lg shadow-emerald-200/50'}`
                    : `${darkMode 
                        ? 'bg-emerald-900/20 text-emerald-100 hover:bg-emerald-800/30' 
                        : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`
                }`}
              >
                <StatusIcon className={`h-4 w-4 ${filter.color}`} />
                <span className="text-sm font-medium">{filter.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded ${
                  darkMode ? 'bg-emerald-900/40' : 'bg-emerald-200'
                }`}>
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Summary Stats */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`p-4 rounded-2xl ${
              darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">{schedules.length}</div>
                  <div className="text-sm text-emerald-400/70">Total Schedules</div>
                </div>
                <Calendar className="h-8 w-8 text-emerald-400/30" />
              </div>
            </div>
            
            <div className={`p-4 rounded-2xl ${
              darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">8</div>
                  <div className="text-sm text-emerald-400/70">Active Now</div>
                </div>
                <Zap className="h-8 w-8 text-green-400/30" />
              </div>
            </div>
            
            <div className={`p-4 rounded-2xl ${
              darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">271</div>
                  <div className="text-sm text-emerald-400/70">Total Runs</div>
                </div>
                <Repeat className="h-8 w-8 text-cyan-400/30" />
              </div>
            </div>
            
            <div className={`p-4 rounded-2xl ${
              darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">94%</div>
                  <div className="text-sm text-emerald-400/70">Success Rate</div>
                </div>
                <CheckCircle className="h-8 w-8 text-emerald-400/30" />
              </div>
            </div>
          </div>
        </div>

        {/* Frequency Distribution */}
        <div className={`mb-6 p-4 rounded-2xl ${
          darkMode ? 'glass-green-card' : 'glass-light-card'
        }`}>
          <h4 className="text-sm font-semibold text-emerald-300 mb-4">Schedule Frequency</h4>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            {frequencies.map((freq) => {
              const Icon = freq.icon;
              const count = schedules.filter(s => s.frequency === freq.id).length;
              
              return (
                <div
                  key={freq.id}
                  className={`p-3 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
                    darkMode ? 'bg-emerald-900/30' : 'bg-emerald-100'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${freq.color} mx-auto mb-2`} />
                  <div className="text-lg font-bold text-white">{count}</div>
                  <div className="text-xs text-emerald-400/70">{freq.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Schedules List */}
        <div className="space-y-3">
          {filteredSchedules.map((schedule) => {
            const Icon = schedule.icon;
            const StatusIcon = getStatusIcon(schedule.status).icon;
            const statusColor = getStatusIcon(schedule.status).color;
            const isExpanded = expandedId === schedule.id;
            const isSelected = selectedReports.includes(schedule.id);
            
            return (
              <div
                key={schedule.id}
                className={`rounded-xl overflow-hidden transition-all duration-300 ${
                  darkMode
                    ? 'bg-emerald-900/20 border border-emerald-500/20 hover:border-emerald-400/40'
                    : 'bg-white border border-emerald-100 hover:border-emerald-300 shadow-sm'
                }`}
              >
                {/* Schedule Header */}
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Checkbox */}
                      <div className="pt-1">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectReport(schedule.id)}
                          className="h-4 w-4 rounded border-emerald-500/30 text-emerald-600 focus:ring-emerald-500/30"
                        />
                      </div>
                      
                      {/* Icon */}
                      <div className={`p-2 ${schedule.color} rounded-lg`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h4 className="font-semibold text-white">{schedule.name}</h4>
                          <StatusIcon className={`h-4 w-4 ${statusColor}`} />
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            darkMode ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                          }`}>
                            {schedule.frequency}
                          </span>
                        </div>
                        
                        <p className={`text-sm mb-3 ${
                          darkMode ? 'text-emerald-300/70' : 'text-emerald-600/70'
                        }`}>
                          {schedule.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-4 text-xs">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3 text-emerald-400" />
                            <span className={darkMode ? 'text-emerald-400/70' : 'text-emerald-600/70'}>
                              Next: {getTimeUntilNextRun(schedule.nextRun)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3 text-emerald-400" />
                            <span className={darkMode ? 'text-emerald-400/70' : 'text-emerald-600/70'}>
                              {schedule.recipients} recipients
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Repeat className="h-3 w-3 text-emerald-400" />
                            <span className={darkMode ? 'text-emerald-400/70' : 'text-emerald-600/70'}>
                              {schedule.runs} runs ({schedule.successRate}% success)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleExpanded(schedule.id)}
                        className={`p-1.5 rounded-lg transition-transform duration-300 ${
                          darkMode 
                            ? 'hover:bg-emerald-800/40 text-emerald-400' 
                            : 'hover:bg-emerald-100 text-emerald-600'
                        } ${isExpanded ? 'rotate-180' : ''}`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => handleRunNow(schedule.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          darkMode 
                            ? 'hover:bg-emerald-800/40 text-emerald-400' 
                            : 'hover:bg-emerald-100 text-emerald-600'
                        }`}
                        title="Run Now"
                      >
                        <Play className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => handleToggleStatus(schedule.id, schedule.status)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          darkMode 
                            ? 'hover:bg-emerald-800/40 text-emerald-400' 
                            : 'hover:bg-emerald-100 text-emerald-600'
                        }`}
                        title={schedule.status === 'active' ? 'Pause' : 'Activate'}
                      >
                        {schedule.status === 'active' ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Expanded Details */}
                {isExpanded && (
                  <div className={`px-4 pb-4 border-t ${
                    darkMode ? 'border-emerald-500/20' : 'border-emerald-200'
                  }`}>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Schedule Details */}
                      <div>
                        <h5 className="text-xs font-medium text-emerald-400 mb-2">Schedule Details</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-xs text-emerald-300/70">Frequency:</span>
                            <span className="text-xs font-medium text-white">{schedule.frequency}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-emerald-300/70">Next Run:</span>
                            <span className="text-xs font-medium text-white">{formatDate(schedule.nextRun)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-emerald-300/70">Last Run:</span>
                            <span className="text-xs font-medium text-white">{formatDate(schedule.lastRun)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-emerald-300/70">Format:</span>
                            <span className="text-xs font-medium text-white">{schedule.format}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Performance */}
                      <div>
                        <h5 className="text-xs font-medium text-emerald-400 mb-2">Performance</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-xs text-emerald-300/70">Avg Runtime:</span>
                            <span className="text-xs font-medium text-white">{schedule.runtime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-emerald-300/70">Total Runs:</span>
                            <span className="text-xs font-medium text-white">{schedule.runs}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-emerald-300/70">Success Rate:</span>
                            <span className="text-xs font-medium text-white">{schedule.successRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-emerald-300/70">Avg Size:</span>
                            <span className="text-xs font-medium text-white">{schedule.size}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Distribution */}
                      <div>
                        <h5 className="text-xs font-medium text-emerald-400 mb-2">Distribution</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-xs text-emerald-300/70">Recipients:</span>
                            <span className="text-xs font-medium text-white">{schedule.recipients}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-emerald-300/70">Notifications:</span>
                            <span className="text-xs font-medium text-white">
                              {schedule.notifications ? 'Enabled' : 'Disabled'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-emerald-300/70">Delivery Method:</span>
                            <span className="text-xs font-medium text-white">Email + Dashboard</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-emerald-300/70">Archive:</span>
                            <span className="text-xs font-medium text-white">30 days</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div>
                        <h5 className="text-xs font-medium text-emerald-400 mb-2">Actions</h5>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleEdit(schedule.id)}
                            className="flex-1 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 rounded-lg text-xs font-medium transition-colors flex items-center justify-center space-x-1"
                          >
                            <Edit className="h-3 w-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(schedule.id)}
                            className="flex-1 px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 rounded-lg text-xs font-medium transition-colors flex items-center justify-center space-x-1"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span>Delete</span>
                          </button>
                          <button className="flex-1 px-3 py-1.5 bg-emerald-900/30 hover:bg-emerald-800/40 text-emerald-400 rounded-lg text-xs font-medium transition-colors flex items-center justify-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>View Logs</span>
                          </button>
                          <button className="flex-1 px-3 py-1.5 bg-emerald-900/30 hover:bg-emerald-800/40 text-emerald-400 rounded-lg text-xs font-medium transition-colors flex items-center justify-center space-x-1">
                            <Copy className="h-3 w-3" />
                            <span>Duplicate</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredSchedules.length === 0 && (
          <div className="h-64 flex flex-col items-center justify-center">
            <div className={`p-4 rounded-full ${darkMode ? 'bg-emerald-900/30' : 'bg-emerald-100'}`}>
              <Calendar className="h-12 w-12 text-emerald-400/50" />
            </div>
            <h3 className="text-lg font-semibold text-white mt-4">No scheduled reports found</h3>
            <p className={`text-sm mt-1 ${darkMode ? 'text-emerald-300/70' : 'text-emerald-600/70'}`}>
              {activeFilter === 'all' 
                ? 'No schedules configured yet'
                : `No ${activeFilter} schedules found`}
            </p>
            <button className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm font-medium">
              Create First Schedule
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={`p-4 border-t ${
        darkMode ? 'border-emerald-500/20 bg-emerald-900/20' : 'border-emerald-200 bg-emerald-50'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <span className={darkMode ? 'text-emerald-400/70' : 'text-emerald-600/70'}>
                Showing {filteredSchedules.length} of {schedules.length} schedules
              </span>
            </div>
            
            {selectedReports.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${
                  darkMode ? 'text-emerald-300' : 'text-emerald-600'
                }`}>
                  {selectedReports.length} selected
                </span>
                <button className="px-3 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 rounded-lg text-sm font-medium transition-colors">
                  Run Selected
                </button>
                <button className="px-3 py-1 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 rounded-lg text-sm font-medium transition-colors">
                  Delete Selected
                </button>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors flex items-center space-x-1">
              <Download className="h-3.5 w-3.5" />
              <span>Export Schedule</span>
            </button>
            <button className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors flex items-center space-x-1">
              <Bell className="h-3.5 w-3.5" />
              <span>Alert Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduledReports;