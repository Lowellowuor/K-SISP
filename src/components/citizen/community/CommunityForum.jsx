import React, { useState } from 'react';
import { 
  Users, MessageSquare, TrendingUp, Award, 
  Star, ThumbsUp, Share2, Filter, Plus,
  CheckCircle, AlertCircle, Calendar
} from 'lucide-react';

function CommunityForum() {
  const [activeTab, setActiveTab] = useState('discussions');

  const tabs = [
    { id: 'discussions', label: 'Discussions', icon: MessageSquare },
    { id: 'surveys', label: 'Surveys', icon: TrendingUp },
    { id: 'leaders', label: 'Community Leaders', icon: Users },
    { id: 'suggestions', label: 'Suggestions', icon: Award },
  ];

  const discussions = [
    { id: 1, title: 'Water Conservation Tips', author: 'Maria K.', replies: 42, votes: 156, time: '2 hours ago', pinned: true },
    { id: 2, title: 'Community Clean-up Initiative', author: 'John D.', replies: 28, votes: 89, time: '1 day ago', hot: true },
    { id: 3, title: 'Sanitation Best Practices', author: 'Health Dept.', replies: 15, votes: 67, time: '2 days ago', official: true },
    { id: 4, title: 'Waste Separation Guide', author: 'Eco Team', replies: 31, votes: 112, time: '3 days ago' },
    { id: 5, title: 'Reporting Issues Effectively', author: 'Sarah M.', replies: 19, votes: 45, time: '4 days ago' },
  ];

  const surveys = [
    { id: 1, title: 'Water Service Satisfaction Survey', participants: 320, status: 'active', reward: 'Community Points' },
    { id: 2, title: 'Sanitation Facility Feedback', participants: 245, status: 'closed', reward: 'Recognition' },
    { id: 3, title: 'Waste Collection Timing Preference', participants: 180, status: 'active', reward: 'Priority Service' },
  ];

  const leaders = [
    { id: 1, name: 'John Mwangi', role: 'Zone A Coordinator', points: 1250, issues: 42, joined: '2 years ago' },
    { id: 2, name: 'Mary Atieno', role: 'Community Health Worker', points: 980, issues: 35, joined: '1 year ago' },
    { id: 3, name: 'Peter Omondi', role: 'Youth Leader', points: 750, issues: 28, joined: '8 months ago' },
    { id: 4, name: 'Sarah Akinyi', role: 'Women\'s Group Chair', points: 620, issues: 22, joined: '6 months ago' },
  ];

  const suggestions = [
    { id: 1, title: 'Mobile Water Testing Kits', author: 'Tech Team', votes: 189, status: 'under-review', comments: 24 },
    { id: 2, title: 'Community Composting Program', author: 'Green Group', votes: 145, status: 'approved', comments: 18 },
    { id: 3, title: 'Rainwater Harvesting Workshops', author: 'Water Committee', votes: 210, status: 'implemented', comments: 32 },
  ];

  return (
    <div className="glass-effect rounded-2xl p-6 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-white">Community Forum</h2>
          <p className="text-sm text-gray-400 mt-1">Connect, discuss, and collaborate</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg">
          <Plus className="h-4 w-4" />
          <span>Start Discussion</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === tab.id
                ? 'bg-green-500/20 text-green-400'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'discussions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">Active Discussions</h3>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">Sort by: Trending</span>
            </div>
          </div>

          <div className="space-y-3">
            {discussions.map((discussion) => (
              <div key={discussion.id} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {discussion.pinned && (
                        <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded">PINNED</span>
                      )}
                      {discussion.hot && (
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">HOT</span>
                      )}
                      {discussion.official && (
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">OFFICIAL</span>
                      )}
                      <h4 className="font-medium text-white">{discussion.title}</h4>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>By {discussion.author}</span>
                      <span>{discussion.replies} replies</span>
                      <span>{discussion.votes} votes</span>
                      <span>{discussion.time}</span>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-white">
                    <ThumbsUp className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'surveys' && (
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Active Surveys</h3>
          <div className="space-y-3">
            {surveys.map((survey) => (
              <div key={survey.id} className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white">{survey.title}</h4>
                  <span className={`px-2 py-1 text-xs rounded ${
                    survey.status === 'active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {survey.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>{survey.participants} participants</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4" />
                    <span>Reward: {survey.reward}</span>
                  </div>
                </div>
                <button className="w-full mt-3 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30">
                  Take Survey
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'leaders' && (
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Community Leaders</h3>
          <div className="grid grid-cols-2 gap-4">
            {leaders.map((leader) => (
              <div key={leader.id} className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <span className="text-white font-bold">{leader.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-medium text-white">{leader.name}</div>
                    <div className="text-xs text-gray-400">{leader.role}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Points:</span>
                    <span className="text-amber-400 font-medium">{leader.points}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Issues Resolved:</span>
                    <span className="text-green-400 font-medium">{leader.issues}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Member Since:</span>
                    <span className="text-blue-400 font-medium">{leader.joined}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'suggestions' && (
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Community Suggestions</h3>
          <div className="space-y-3">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white">{suggestion.title}</h4>
                  <span className={`px-2 py-1 text-xs rounded ${
                    suggestion.status === 'implemented' ? 'bg-green-500/20 text-green-400' :
                    suggestion.status === 'approved' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    {suggestion.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                  <span>By {suggestion.author}</span>
                  <div className="flex items-center space-x-4">
                    <span>{suggestion.votes} votes</span>
                    <span>{suggestion.comments} comments</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="flex-1 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30">
                    Vote Up
                  </button>
                  <button className="flex-1 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30">
                    Comment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Community Stats */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-white">850</div>
            <div className="text-sm text-gray-400">Active Members</div>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-white">156</div>
            <div className="text-sm text-gray-400">Discussions</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityForum;