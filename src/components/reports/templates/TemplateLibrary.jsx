import React, { useState } from 'react';
import { 
  FileText, BarChart3, Map, Database, Users,
  Star, Download, Copy, Eye, Settings,
  Search, Filter, Grid, List, Plus
} from 'lucide-react';

function TemplateLibrary() {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Templates', count: 24 },
    { id: 'executive', label: 'Executive', count: 6 },
    { id: 'analytical', label: 'Analytical', count: 8 },
    { id: 'spatial', label: 'Spatial', count: 4 },
    { id: 'research', label: 'Research', count: 3 },
    { id: 'policy', label: 'Policy', count: 3 },
  ];

  const templates = [
    {
      id: 1,
      title: 'Executive Dashboard',
      description: 'High-level overview with KPIs and trends',
      category: 'executive',
      icon: FileText,
      color: 'text-blue-500',
      starred: true,
      uses: 245,
      author: 'Admin Team',
      rating: 4.8
    },
    {
      id: 2,
      title: 'Analytical Report',
      description: 'Detailed statistical analysis with charts',
      category: 'analytical',
      icon: BarChart3,
      color: 'text-purple-500',
      starred: true,
      uses: 189,
      author: 'Analytics Team',
      rating: 4.6
    },
    {
      id: 3,
      title: 'Spatial Analysis',
      description: 'Geographic analysis with interactive maps',
      category: 'spatial',
      icon: Map,
      color: 'text-green-500',
      starred: false,
      uses: 156,
      author: 'GIS Team',
      rating: 4.7
    },
    {
      id: 4,
      title: 'Technical Report',
      description: 'Detailed technical documentation',
      category: 'technical',
      icon: Database,
      color: 'text-amber-500',
      starred: false,
      uses: 98,
      author: 'Engineering',
      rating: 4.5
    },
    {
      id: 5,
      title: 'Research Paper',
      description: 'Academic format with citations',
      category: 'research',
      icon: FileText,
      color: 'text-red-500',
      starred: true,
      uses: 76,
      author: 'Research Team',
      rating: 4.9
    },
    {
      id: 6,
      title: 'Policy Brief',
      description: 'Concise policy recommendations',
      category: 'policy',
      icon: FileText,
      color: 'text-indigo-500',
      starred: false,
      uses: 112,
      author: 'Policy Team',
      rating: 4.4
    },
    {
      id: 7,
      title: 'Community Report',
      description: 'Citizen feedback and engagement',
      category: 'executive',
      icon: Users,
      color: 'text-cyan-500',
      starred: true,
      uses: 134,
      author: 'Community Team',
      rating: 4.7
    },
    {
      id: 8,
      title: 'Financial Analysis',
      description: 'Budget and financial performance',
      category: 'analytical',
      icon: BarChart3,
      color: 'text-emerald-500',
      starred: false,
      uses: 87,
      author: 'Finance Team',
      rating: 4.3
    },
  ];

  const filteredTemplates = templates.filter(template => {
    if (activeCategory !== 'all' && template.category !== activeCategory) return false;
    if (searchQuery && !template.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const renderGridView = () => (
    <div className="grid grid-cols-2 gap-4">
      {filteredTemplates.map((template) => (
        <div key={template.id} className="glass-effect rounded-xl p-4 hover:bg-white/5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900`}>
                <template.icon className={`h-5 w-5 ${template.color}`} />
              </div>
              <div>
                <h4 className="font-semibold text-white">{template.title}</h4>
                <div className="text-xs text-gray-400">{template.category}</div>
              </div>
            </div>
            <button className="text-gray-400 hover:text-white">
              <Star className={`h-4 w-4 ${template.starred ? 'text-amber-400 fill-amber-400' : ''}`} />
            </button>
          </div>
          
          <p className="text-sm text-gray-300 mb-4">{template.description}</p>
          
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center space-x-4">
              <span>👤 {template.author}</span>
              <span>📊 {template.uses} uses</span>
              <span>⭐ {template.rating}</span>
            </div>
            <button className="text-indigo-400 hover:text-indigo-300">
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-2">
      {filteredTemplates.map((template) => (
        <div key={template.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5">
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900`}>
              <template.icon className={`h-5 w-5 ${template.color}`} />
            </div>
            <div>
              <h4 className="font-semibold text-white">{template.title}</h4>
              <p className="text-sm text-gray-400">{template.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-300">{template.author}</div>
              <div className="text-xs text-gray-400">{template.uses} uses • ⭐ {template.rating}</div>
            </div>
            <button className="p-2 text-gray-400 hover:text-white">
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Template Library</h2>
          <p className="text-gray-400">Choose from professionally designed report templates</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg">
          <Plus className="h-4 w-4" />
          <span>New Template</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
            />
          </div>
          
          <button className="flex items-center space-x-2 px-3 py-2 bg-white/5 rounded-lg text-gray-400 hover:text-white">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-indigo-500/20 text-indigo-400' : 'text-gray-400 hover:text-white'}`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-indigo-500/20 text-indigo-400' : 'text-gray-400 hover:text-white'}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap ${
              activeCategory === category.id
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            <span>{category.label}</span>
            <span className={`px-2 py-1 text-xs rounded-full ${
              activeCategory === category.id
                ? 'bg-white/20'
                : 'bg-white/10'
            }`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Templates Grid/List */}
      <div className="h-[calc(100%-12rem)] overflow-y-auto">
        {viewMode === 'grid' ? renderGridView() : renderListView()}
      </div>

      {/* Statistics */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-3">
            <div className="text-2xl font-bold text-white">24</div>
            <div className="text-xs text-gray-400">Total Templates</div>
          </div>
          <div className="text-center p-3">
            <div className="text-2xl font-bold text-white">1,245</div>
            <div className="text-xs text-gray-400">Total Uses</div>
          </div>
          <div className="text-center p-3">
            <div className="text-2xl font-bold text-white">4.7</div>
            <div className="text-xs text-gray-400">Avg Rating</div>
          </div>
          <div className="text-center p-3">
            <div className="text-2xl font-bold text-white">89%</div>
            <div className="text-xs text-gray-400">User Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateLibrary;