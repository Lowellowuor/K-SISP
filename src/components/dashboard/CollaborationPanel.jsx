import React, { useState } from 'react';
import { Users, MessageSquare, Video, Phone, Paperclip, Send, X, MoreVertical, Bell, Share2, Calendar, CheckCircle, UserPlus, ScreenShare, ThumbsUp } from 'lucide-react';

const CollaborationPanel = ({ onClose, darkMode = true }) => {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [reactions, setReactions] = useState({});

  const teamMembers = [
    { id: 1, name: 'Alex Johnson', role: 'Operations Manager', status: 'online', avatar: 'AJ' },
    { id: 2, name: 'Sarah Chen', role: 'Data Analyst', status: 'online', avatar: 'SC' },
    { id: 3, name: 'Mike Rodriguez', role: 'System Admin', status: 'away', avatar: 'MR' },
    { id: 4, name: 'Emma Wilson', role: 'Developer', status: 'offline', avatar: 'EW' },
    { id: 5, name: 'David Kim', role: 'Infrastructure', status: 'online', avatar: 'DK' },
  ];

  const chatMessages = [
    { id: 1, user: 'Alex Johnson', content: 'Just finished reviewing the North Zone metrics. Everything looks good!', time: '10:30 AM', avatar: 'AJ' },
    { id: 2, user: 'Sarah Chen', content: 'I noticed an anomaly in the East Zone energy consumption. Can someone check?', time: '10:42 AM', avatar: 'SC' },
    { id: 3, user: 'You', content: 'I\'ll take a look at the East Zone data right now.', time: '10:45 AM', avatar: 'You' },
    { id: 4, user: 'Mike Rodriguez', content: 'Maintenance scheduled for tomorrow 2 AM. Will update the dashboard during the window.', time: '11:00 AM', avatar: 'MR' },
    { id: 5, user: 'Alex Johnson', content: 'Great! Let\'s coordinate on this.', time: '11:05 AM', avatar: 'AJ' },
  ];

  const files = [
    { name: 'Weekly_Report.pdf', size: '2.4 MB', uploadedBy: 'Sarah Chen', time: '2 hours ago' },
    { name: 'Infrastructure_Diagram.png', size: '1.8 MB', uploadedBy: 'Mike Rodriguez', time: '1 day ago' },
    { name: 'Performance_Analysis.xlsx', size: '3.2 MB', uploadedBy: 'You', time: '3 days ago' },
  ];

  const upcomingMeetings = [
    { title: 'Weekly Review', time: 'Tomorrow 10:00 AM', participants: 5 },
    { title: 'Infrastructure Planning', time: 'Friday 2:00 PM', participants: 3 },
    { title: 'Quarterly Review', time: 'Next Monday 11:00 AM', participants: 8 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'away': return 'bg-amber-400';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // In a real app, this would send the message
    console.log('Sending message:', message);
    setMessage('');
  };

  const handleReaction = (messageId, reaction) => {
    setReactions(prev => ({
      ...prev,
      [messageId]: reaction
    }));
  };

  const handleShareScreen = () => {
    setIsScreenSharing(!isScreenSharing);
    if (!isScreenSharing) {
      alert('Screen sharing started. Team members can now see your dashboard.');
    }
  };

  const handleInviteUser = () => {
    const email = prompt('Enter email to invite:');
    if (email) {
      console.log('Inviting user:', email);
      alert(`Invitation sent to ${email}`);
    }
  };

  const handleScheduleMeeting = () => {
    console.log('Opening meeting scheduler');
    // In a real app, this would open a calendar/scheduler
  };

  return (
    <div className={`fixed right-4 top-4 z-50 w-96 animate-fadeIn ${darkMode ? 'glass-green-card' : 'glass-light-card'} shadow-xl`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-emerald-500/20' : 'border-emerald-200'}`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-xl ${darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'}`}>
            <Users className={`h-5 w-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
          </div>
          <div>
            <h3 className="font-semibold text-white">Team Collaboration</h3>
            <p className="text-xs text-emerald-400/70">
              {teamMembers.filter(m => m.status === 'online').length} members online
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleShareScreen}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-emerald-800/30' : 'hover:bg-emerald-100'} ${isScreenSharing ? 'text-green-400' : 'text-emerald-400'}`}
            title={isScreenSharing ? 'Stop sharing' : 'Share screen'}
          >
            <ScreenShare className="h-4 w-4" />
          </button>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-emerald-800/30' : 'hover:bg-emerald-100'}`}
          >
            <X className="h-4 w-4 text-emerald-400" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-emerald-500/20">
        {['chat', 'team', 'files', 'meetings'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === tab ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-emerald-300 hover:text-white'}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="h-96 overflow-y-auto p-4">
        {activeTab === 'chat' && (
          <div className="space-y-4">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    msg.user === 'You' 
                      ? 'bg-emerald-600 text-white' 
                      : darkMode ? 'bg-emerald-900/40 text-emerald-300' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    {msg.avatar}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`text-sm font-medium ${msg.user === 'You' ? 'text-emerald-400' : 'text-white'}`}>
                      {msg.user}
                    </span>
                    <span className="text-xs text-emerald-500">{msg.time}</span>
                  </div>
                  <div className={`text-sm rounded-xl p-3 ${
                    msg.user === 'You'
                      ? darkMode ? 'bg-emerald-600/30' : 'bg-emerald-100'
                      : darkMode ? 'bg-emerald-900/30' : 'bg-emerald-50'
                  }`}>
                    {msg.content}
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={() => handleReaction(msg.id, 'like')}
                      className={`p-1 rounded ${reactions[msg.id] === 'like' ? 'text-emerald-400' : 'text-emerald-400/50 hover:text-emerald-400'}`}
                    >
                      <ThumbsUp className="h-3 w-3" />
                    </button>
                    <button className="text-xs text-emerald-400/70 hover:text-emerald-400">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'team' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-white">Team Members</span>
              <button
                onClick={handleInviteUser}
                className="flex items-center space-x-1 text-xs text-emerald-400 hover:text-emerald-300"
              >
                <UserPlus className="h-3 w-3" />
                <span>Invite</span>
              </button>
            </div>
            
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-emerald-900/20 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      darkMode ? 'bg-emerald-900/40 text-emerald-300' : 'bg-emerald-100 text-emerald-600'
                    }`}>
                      {member.avatar}
                    </div>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${darkMode ? 'border-gray-900' : 'border-white'} ${getStatusColor(member.status)}`} />
                  </div>
                  <div>
                    <div className="font-medium text-white">{member.name}</div>
                    <div className="text-xs text-emerald-400/70">{member.role}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className={`p-1.5 rounded-lg ${darkMode ? 'hover:bg-emerald-800/30' : 'hover:bg-emerald-100'}`}>
                    <MessageSquare className="h-4 w-4 text-emerald-400" />
                  </button>
                  <button className={`p-1.5 rounded-lg ${darkMode ? 'hover:bg-emerald-800/30' : 'hover:bg-emerald-100'}`}>
                    <Video className="h-4 w-4 text-emerald-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'files' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-white">Shared Files</span>
              <button className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center space-x-1">
                <Paperclip className="h-3 w-3" />
                <span>Upload</span>
              </button>
            </div>
            
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-emerald-900/20 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'}`}>
                    <Paperclip className={`h-4 w-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  </div>
                  <div>
                    <div className="font-medium text-white">{file.name}</div>
                    <div className="text-xs text-emerald-400/70">
                      {file.size} • {file.uploadedBy} • {file.time}
                    </div>
                  </div>
                </div>
                <button className={`p-1.5 rounded-lg ${darkMode ? 'hover:bg-emerald-800/30' : 'hover:bg-emerald-100'}`}>
                  <Share2 className="h-4 w-4 text-emerald-400" />
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'meetings' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">Upcoming Meetings</span>
              <button
                onClick={handleScheduleMeeting}
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
              >
                <Calendar className="h-3 w-3" />
                <span>Schedule</span>
              </button>
            </div>
            
            {upcomingMeetings.map((meeting, index) => (
              <div key={index} className="p-3 rounded-xl bg-emerald-900/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-emerald-400" />
                    <span className="font-medium text-white">{meeting.title}</span>
                  </div>
                  <button className="text-xs px-2 py-1 rounded bg-emerald-800/30 text-emerald-300 hover:bg-emerald-700/40">
                    Join
                  </button>
                </div>
                <div className="flex items-center justify-between text-xs text-emerald-400/70">
                  <span>{meeting.time}</span>
                  <span>{meeting.participants} participants</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Input (only for chat tab) */}
      {activeTab === 'chat' && (
        <div className={`p-4 border-t ${darkMode ? 'border-emerald-500/20' : 'border-emerald-200'}`}>
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <button
              type="button"
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-emerald-800/30 text-emerald-400 hover:text-white' : 'hover:bg-emerald-100 text-emerald-500 hover:text-emerald-700'}`}
            >
              <Paperclip className="h-4 w-4" />
            </button>
            
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className={`flex-1 px-3 py-2 rounded-lg ${
                darkMode 
                  ? 'bg-emerald-900/30 border-emerald-500/20 text-white placeholder-emerald-400/50' 
                  : 'bg-white border border-emerald-200 text-gray-900 placeholder-emerald-500/50'
              } focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-transparent`}
            />
            
            <button
              type="submit"
              disabled={!message.trim()}
              className={`p-2 rounded-lg transition-all ${
                message.trim()
                  ? darkMode 
                    ? 'bg-gradient-to-r from-emerald-600 to-green-500 text-white hover:shadow-lg' 
                    : 'bg-gradient-to-r from-emerald-500 to-green-400 text-white hover:shadow-lg'
                  : darkMode 
                    ? 'bg-emerald-900/30 text-emerald-400/50 cursor-not-allowed' 
                    : 'bg-emerald-100 text-emerald-400/50 cursor-not-allowed'
              }`}
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          
          {/* Quick Actions */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-4 text-xs text-emerald-400/70">
              <button className="flex items-center space-x-1 hover:text-emerald-400">
                <Bell className="h-3 w-3" />
                <span>Mute</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-emerald-400">
                <Video className="h-3 w-3" />
                <span>Video</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-emerald-400">
                <Phone className="h-3 w-3" />
                <span>Call</span>
              </button>
            </div>
            <div className="text-xs text-emerald-500">
              Encrypted • Real-time
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaborationPanel;