import React, { useState } from 'react';
import {
  FileText, BarChart3, Map, TrendingUp, Database,
  Shield, Globe, Users, Cpu, PieChart, LineChart,
  Target, Award, Clock, Zap, BookOpen,
  Download, Star, Eye, Copy, ChevronRight,
  Filter, Search, Grid, List, Plus
} from 'lucide-react';

const ReportTemplatesGrid = ({ darkMode }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([1, 3, 5]);

  const categories = [
    { id: 'all', label: 'All Templates', count: 24, color: 'text-emerald-400' },
    { id: 'executive', label: 'Executive', count: 6, color: 'text-green-400' },
    { id: 'analytical', label: 'Analytical', count: 8, color: 'text-cyan-400' },
    { id: 'technical', label: 'Technical', count: 4, color: 'text-amber-400' },
    { id: 'spatial', label: 'Spatial', count: 3, color: 'text-teal-400' },
    { id: 'compliance', label: 'Compliance', count: 3, color: 'text-purple-400' },
  ];

  const templates = [
    {
      id: 1,
      title: 'Executive Summary',
      description: 'High-level overview for stakeholders with key metrics and insights',
      type: 'executive',
      icon: FileText,
      color: 'bg-emerald-500',
      pages: 5,
      charts: 3,
      lastUsed: 'Today',
      usageCount: 42,
      rating: 4.8,
      isPremium: false,
      tags: ['summary', 'stakeholders', 'overview']
    },
    {
      id: 2,
      title: 'Performance Analytics',
      description: 'Comprehensive performance metrics with trend analysis',
      type: 'analytical',
      icon: BarChart3,
      color: 'bg-green-500',
      pages: 12,
      charts: 8,
      lastUsed: '2 days ago',
      usageCount: 28,
      rating: 4.6,
      isPremium: true,
      tags: ['analytics', 'performance', 'metrics']
    },
    {
      id: 3,
      title: 'Spatial Coverage Map',
      description: 'Geographic visualization with location-based insights',
      type: 'spatial',
      icon: Map,
      color: 'bg-teal-500',
      pages: 8,
      charts: 2,
      lastUsed: 'Yesterday',
      usageCount: 31,
      rating: 4.9,
      isPremium: false,
      tags: ['geographic', 'maps', 'location']
    },
    {
      id: 4,
      title: 'Technical Infrastructure',
      description: 'Detailed technical specifications and architecture diagrams',
      type: 'technical',
      icon: Database,
      color: 'bg-amber-500',
      pages: 15,
      charts: 5,
      lastUsed: '1 week ago',
      usageCount: 19,
      rating: 4.5,
      isPremium: true,
      tags: ['technical', 'infrastructure', 'architecture']
    },
    {
      id: 5,
      title: 'Trend Analysis Report',
      description: 'Historical trend analysis with predictive insights',
      type: 'analytical',
      icon: TrendingUp,
      color: 'bg-cyan-500',
      pages: 10,
      charts: 6,
      lastUsed: '3 days ago',
      usageCount: 35,
      rating: 4.7,
      isPremium: false,
      tags: ['trends', 'analysis', 'predictive']
    },
    {
      id: 6,
      title: 'Compliance Report',
      description: 'Regulatory compliance documentation and audit trail',
      type: 'compliance',
      icon: Shield,
      color: 'bg-purple-500',
      pages: 7,
      charts: 3,
      lastUsed: '2 weeks ago',
      usageCount: 14,
      rating: 4.3,
      isPremium: true,
      tags: ['compliance', 'regulatory', 'audit']
    },
    {
      id: 7,
      title: 'Community Impact Study',
      description: 'Social impact analysis with community engagement metrics',
      type: 'executive',
      icon: Users,
      color: 'bg-emerald-600',
      pages: 9,
      charts: 4,
      lastUsed: '4 days ago',
      usageCount: 23,
      rating: 4.8,
      isPremium: false,
      tags: ['community', 'impact', 'social']
    },
    {
      id: 8,
      title: 'Predictive Analytics',
      description: 'Machine learning models and future projections',
      type: 'analytical',
      icon: Cpu,
      color: 'bg-green-600',
      pages: 14,
      charts: 7,
      lastUsed: '1 week ago',
      usageCount: 17,
      rating: 4.4,
      isPremium: true,
      tags: ['predictive', 'ml', 'forecasting']
    },
  ];

  const popularTags = [
    'analytics', 'executive', 'technical', 'spatial', 'compliance',
    'monthly', 'quarterly', 'summary', 'detailed', 'quick'
  ];

  const handleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const handleUseTemplate = (template) => {
    console.log('Using template:', template.title);
    // In a real app, this would open the template in editor
  };

  const handlePreview = (template) => {
    console.log('Previewing template:', template.title);
    // In a real app, this would show a preview modal
  };

  const handleDuplicate = (template) => {
    console.log('Duplicating template:', template.title);
    // In a real app, this would create a copy of the template
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || template.type === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return templates.length;
    return templates.filter(t => t.type === categoryId).length;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-emerald-500/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white">Report Templates Library</h3>
            <p className="text-sm text-emerald-300/70">Professional templates for all reporting needs</p>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-1 p-1 rounded-lg bg-emerald-900/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? `${darkMode ? 'bg-emerald-600/40 text-white' : 'bg-emerald-100 text-emerald-800'}`
                    : `${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'}`
                }`}
                title="Grid View"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? `${darkMode ? 'bg-emerald-600/40 text-white' : 'bg-emerald-100 text-emerald-800'}`
                    : `${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'}`
                }`}
                title="List View"
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* New Template Button */}
            <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">New Template</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
              darkMode ? 'text-emerald-400' : 'text-emerald-600'
            }`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates by name, description, or tags..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                darkMode
                  ? 'bg-emerald-900/30 text-white placeholder-emerald-400/50'
                  : 'bg-emerald-50 text-gray-900 placeholder-emerald-600/50'
              }`}
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className={`h-4 w-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                darkMode
                  ? 'bg-emerald-900/30 text-white'
                  : 'bg-emerald-50 text-gray-900'
              }`}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label} ({getCategoryCount(category.id)})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Categories Quick Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.id === 'all' ? Grid : 
                          category.id === 'executive' ? FileText :
                          category.id === 'analytical' ? BarChart3 :
                          category.id === 'technical' ? Database :
                          category.id === 'spatial' ? Map : Shield;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 group ${
                    selectedCategory === category.id
                      ? `${darkMode 
                          ? 'bg-gradient-to-r from-emerald-600/40 to-green-500/40 text-white shadow-lg shadow-emerald-500/20' 
                          : 'bg-emerald-100 text-emerald-800 shadow-lg shadow-emerald-200/50'}`
                      : `${darkMode 
                          ? 'bg-emerald-900/20 text-emerald-100 hover:bg-emerald-800/30' 
                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`
                  }`}
                >
                  <Icon className={`h-4 w-4 ${category.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-sm font-medium">{category.label}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    darkMode ? 'bg-emerald-900/40' : 'bg-emerald-200'
                  }`}>
                    {getCategoryCount(category.id)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Templates Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => {
              const Icon = template.icon;
              const isFavorite = favorites.includes(template.id);
              
              return (
                <div
                  key={template.id}
                  className={`group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                    darkMode
                      ? 'bg-emerald-900/20 border border-emerald-500/20 hover:border-emerald-400/40'
                      : 'bg-white border border-emerald-100 hover:border-emerald-300 shadow-sm'
                  }`}
                  onClick={() => handleUseTemplate(template)}
                >
                  {/* Template Header */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 ${template.color} rounded-lg shadow-lg`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white group-hover:text-emerald-100 transition-colors">
                            {template.title}
                          </h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              darkMode ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                            }`}>
                              {template.type}
                            </span>
                            {template.isPremium && (
                              <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full">
                                Premium
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFavorite(template.id);
                        }}
                        className={`p-1.5 rounded-lg transition-colors ${
                          darkMode 
                            ? 'hover:bg-emerald-800/40' 
                            : 'hover:bg-emerald-100'
                        }`}
                      >
                        <Star className={`h-4 w-4 ${
                          isFavorite ? 'fill-amber-400 text-amber-400' : 'text-emerald-400/50'
                        }`} />
                      </button>
                    </div>

                    {/* Description */}
                    <p className={`text-sm mb-4 line-clamp-2 ${
                      darkMode ? 'text-emerald-300/70' : 'text-emerald-600/70'
                    }`}>
                      {template.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {template.tags.map((tag, idx) => (
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

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div>
                        <div className="text-sm font-semibold text-white">{template.pages}</div>
                        <div className="text-xs text-emerald-400/70">Pages</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{template.charts}</div>
                        <div className="text-xs text-emerald-400/70">Charts</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{template.usageCount}</div>
                        <div className="text-xs text-emerald-400/70">Uses</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{template.rating}</div>
                        <div className="text-xs text-emerald-400/70">Rating</div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className={`px-4 py-3 border-t ${
                    darkMode ? 'border-emerald-500/20 bg-emerald-900/30' : 'border-emerald-200 bg-emerald-50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${
                        darkMode ? 'text-emerald-400/70' : 'text-emerald-600/70'
                      }`}>
                        Last used: {template.lastUsed}
                      </span>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePreview(template);
                          }}
                          className={`p-1.5 rounded-lg transition-colors ${
                            darkMode 
                              ? 'hover:bg-emerald-800/40 text-emerald-400' 
                              : 'hover:bg-emerald-100 text-emerald-600'
                          }`}
                          title="Preview"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDuplicate(template);
                          }}
                          className={`p-1.5 rounded-lg transition-colors ${
                            darkMode 
                              ? 'hover:bg-emerald-800/40 text-emerald-400' 
                              : 'hover:bg-emerald-100 text-emerald-600'
                          }`}
                          title="Duplicate"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUseTemplate(template);
                          }}
                          className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                            darkMode 
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                              : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                          }`}
                        >
                          <span>Use</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="space-y-3">
            {filteredTemplates.map((template) => {
              const Icon = template.icon;
              const isFavorite = favorites.includes(template.id);
              
              return (
                <div
                  key={template.id}
                  className={`group cursor-pointer rounded-xl p-4 transition-all duration-300 hover:scale-[1.01] ${
                    darkMode
                      ? 'bg-emerald-900/20 border border-emerald-500/20 hover:border-emerald-400/40'
                      : 'bg-white border border-emerald-100 hover:border-emerald-300 shadow-sm'
                  }`}
                  onClick={() => handleUseTemplate(template)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className={`p-2 ${template.color} rounded-lg`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h4 className="font-semibold text-white group-hover:text-emerald-100 transition-colors">
                            {template.title}
                          </h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            darkMode ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                          }`}>
                            {template.type}
                          </span>
                          {template.isPremium && (
                            <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full">
                              Premium
                            </span>
                          )}
                        </div>
                        
                        <p className={`text-sm mb-2 line-clamp-1 ${
                          darkMode ? 'text-emerald-300/70' : 'text-emerald-600/70'
                        }`}>
                          {template.description}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-xs">
                          <span className={`${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                            {template.pages} pages • {template.charts} charts
                          </span>
                          <span className={`${darkMode ? 'text-emerald-400/70' : 'text-emerald-600/70'}`}>
                            Used {template.usageCount} times
                          </span>
                          <span className={`${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                            ★ {template.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFavorite(template.id);
                        }}
                        className={`p-1.5 rounded-lg transition-colors ${
                          darkMode 
                            ? 'hover:bg-emerald-800/40' 
                            : 'hover:bg-emerald-100'
                        }`}
                      >
                        <Star className={`h-4 w-4 ${
                          isFavorite ? 'fill-amber-400 text-amber-400' : 'text-emerald-400/50'
                        }`} />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUseTemplate(template);
                        }}
                        className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          darkMode 
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                            : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                        }`}
                      >
                        <span>Use Template</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="h-64 flex flex-col items-center justify-center">
            <div className={`p-4 rounded-full ${darkMode ? 'bg-emerald-900/30' : 'bg-emerald-100'}`}>
              <FileText className="h-12 w-12 text-emerald-400/50" />
            </div>
            <h3 className="text-lg font-semibold text-white mt-4">No templates found</h3>
            <p className={`text-sm mt-1 ${darkMode ? 'text-emerald-300/70' : 'text-emerald-600/70'}`}>
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={`p-4 border-t ${
        darkMode ? 'border-emerald-500/20 bg-emerald-900/20' : 'border-emerald-200 bg-emerald-50'
      }`}>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className={darkMode ? 'text-emerald-400/70' : 'text-emerald-600/70'}>
              Showing {filteredTemplates.length} of {templates.length} templates
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
              <Download className="inline h-3.5 w-3.5 mr-1" />
              Export Catalog
            </button>
            <button className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
              <Plus className="inline h-3.5 w-3.5 mr-1" />
              Request Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportTemplatesGrid;