import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, Send, Phone, Users } from 'lucide-react';

function CommunicationPanel() {
  const [message, setMessage] = useState('');

  const notifications = [
    { id: 1, text: 'New survey available: Water Service Quality', time: '10 min ago' },
    { id: 2, text: 'Your report #4321 has been assigned', time: '1 hour ago' },
    { id: 3, text: 'Community meeting scheduled for Friday', time: '2 hours ago' },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Send message logic
      setMessage('');
    }
  };

  return (
    <div className="glass-effect rounded-xl p-4 mt-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-green-500" />
          <h3 className="font-semibold text-white">Community Communication</h3>
        </div>
        <Bell className="h-5 w-5 text-amber-500" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <button className="flex items-center justify-center space-x-2 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30">
          <Mail className="h-4 w-4" />
          <span>Email Alert</span>
        </button>
        <button className="flex items-center justify-center space-x-2 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30">
          <Users className="h-4 w-4" />
          <span>Community Alert</span>
        </button>
      </div>

      {/* Notifications */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-white mb-2">Recent Notifications</h4>
        <div className="space-y-2">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start space-x-3 p-2 bg-white/5 rounded-lg">
              <Bell className="h-3 w-3 text-amber-400 mt-1" />
              <div className="flex-1">
                <div className="text-sm text-gray-300">{notification.text}</div>
                <div className="text-xs text-gray-500">{notification.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Message */}
      <form onSubmit={handleSendMessage} className="space-y-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Quick message to community..."
          className="w-full h-20 bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-green-500"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button type="button" className="p-2 text-gray-400 hover:text-white">
              <Phone className="h-4 w-4" />
            </button>
            <button type="button" className="p-2 text-gray-400 hover:text-white">
              <Mail className="h-4 w-4" />
            </button>
          </div>
          <button
            type="submit"
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg"
          >
            <Send className="h-4 w-4" />
            <span>Send</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommunicationPanel;