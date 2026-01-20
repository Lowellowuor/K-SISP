import React from 'react';
import { Filter, Search, Download, RefreshCw, Plus, Bell, Users } from 'lucide-react';

function CitizenToolbar({ activeTab, onTabChange, tabs, filters, onFilterChange }) {
  const statusFilters = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'resolved', label: 'Resolved' },
    { id: 'verified', label: 'Verified' },
  ];

  const typeFilters = [
    { id: 'all', label: 'All Types' },
    { id: 'water', label: 'Water' },
    { id: 'sanitation', label: 'Sanitation' },
    { id: 'waste', label: 'Waste' },
    { id: 'drainage', label: 'Drainage' },
    { id: 'other', label: 'Other' },
  ];

  const dateRanges = [
    { id: '24h', label: '24 Hours' },
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
  ];

  const zones = [
    { id: 'all', label: 'All Zones' },
    { id: 'zone-a', label: 'Zone A' },
    { id: 'zone-b', label: 'Zone B' },
    { id: 'zone-c', label: 'Zone C' },
    { id: 'zone-d', label: 'Zone D' },
  ];

  return (
    <div className="glass-effect rounded-xl p-4 mb-4">
      <div className="flex items-center justify-between">
        {/* Tabs */}
        <div className="flex items-center space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-white border border-white/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="font-medium text-sm">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">
            <Plus className="h-4 w-4" />
            <span>New Survey</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg">
            <Users className="h-4 w-4" />
            <span>Community Alert</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="grid grid-cols-4 gap-4">
          {/* Status Filter */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">Status</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {statusFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => onFilterChange({ ...filters, status: filter.id })}
                  className={`px-3 py-1 text-xs rounded ${
                    filters.status === filter.id
                      ? 'bg-green-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">Type</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {typeFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => onFilterChange({ ...filters, type: filter.id })}
                  className={`px-3 py-1 text-xs rounded ${
                    filters.type === filter.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">Date Range</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {dateRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => onFilterChange({ ...filters, dateRange: range.id })}
                  className={`px-3 py-1 text-xs rounded ${
                    filters.dateRange === range.id
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Zone Filter */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">Zone</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {zones.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => onFilterChange({ ...filters, zone: zone.id })}
                  className={`px-3 py-1 text-xs rounded ${
                    filters.zone === zone.id
                      ? 'bg-amber-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {zone.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-white">
              <Search className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white">
              <RefreshCw className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white">
              <Download className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-400">
              Showing: <span className="text-white font-medium">1,234 reports</span>
            </div>
            <button className="px-3 py-1 text-sm bg-green-500/20 text-green-400 rounded hover:bg-green-500/30">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CitizenToolbar;