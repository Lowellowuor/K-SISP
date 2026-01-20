import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, Sparkles, Zap, Brain, HelpCircle, MessageSquare } from 'lucide-react';

const AIDashboardAssistant = ({ onClose, darkMode = true }) => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'assistant', content: "Hello! I'm your AI dashboard assistant. How can I help you analyze your data today?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions] = useState([
    "Show me top performing zones",
    "What are the current alerts?",
    "Generate a weekly report",
    "Analyze energy consumption trends",
    "Compare zone performance",
    "Predict maintenance needs"
  ]);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        `Based on your query about "${input}", I've analyzed the data and found interesting patterns in the system performance.`,
        `I've detected that the ${['North', 'South', 'East', 'West'][Math.floor(Math.random() * 4)]} zone is showing optimal performance metrics.`,
        `The system analysis shows a ${Math.floor(Math.random() * 20) + 5}% improvement in efficiency compared to last week.`,
        `I recommend checking the detailed analytics for more insights. Would you like me to generate a report?`
      ];

      const aiMessage = {
        id: messages.length + 2,
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        actions: ['Generate Report', 'Show Details', 'Export Data']
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickQuestion = (question) => {
    setInput(question);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleAction = (action) => {
    console.log(`AI Action: ${action}`);
    // In a real app, this would trigger specific actions
    const actionMessage = {
      id: messages.length + 1,
      type: 'assistant',
      content: `Executing action: ${action}. I'll process this for you.`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, actionMessage]);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`fixed inset-x-4 top-4 z-50 mx-auto max-w-2xl animate-fadeIn ${darkMode ? 'glass-green-card' : 'glass-light-card'} shadow-xl`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-emerald-500/20' : 'border-emerald-200'}`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-xl ${darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'}`}>
            <Bot className={`h-5 w-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
          </div>
          <div>
            <h3 className="font-semibold text-white">AI Dashboard Assistant</h3>
            <p className="text-xs text-emerald-400/70">Powered by advanced analytics</p>
          </div>
          <div className="flex items-center space-x-1">
            <Zap className="h-3 w-3 text-amber-400" />
            <Brain className="h-3 w-3 text-purple-400" />
            <Sparkles className="h-3 w-3 text-blue-400" />
          </div>
        </div>
        
        <button
          onClick={onClose}
          className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-emerald-800/30' : 'hover:bg-emerald-100'}`}
        >
          <X className="h-4 w-4 text-emerald-400" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.type === 'user'
                  ? darkMode ? 'bg-emerald-600/30' : 'bg-emerald-100'
                  : darkMode ? 'bg-emerald-900/40' : 'bg-emerald-50'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.type === 'assistant' && (
                  <Bot className="h-4 w-4 text-emerald-400 mt-1 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <div className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {message.content}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-emerald-500">
                      {formatTime(message.timestamp)}
                    </span>
                    {message.type === 'assistant' && (
                      <span className="text-xs text-emerald-400">AI Assistant</span>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  {message.actions && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.actions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAction(action)}
                          className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                            darkMode 
                              ? 'bg-emerald-800/30 text-emerald-300 hover:bg-emerald-700/40 hover:text-white' 
                              : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                          }`}
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-center space-x-2 text-emerald-400">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-150" />
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-300" />
            <span className="text-sm">Analyzing data...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      <div className="px-4 pb-3 border-t border-emerald-500/20 pt-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-emerald-400/70">Quick questions:</span>
          <HelpCircle className="h-3 w-3 text-emerald-400/50" />
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(suggestion)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                darkMode 
                  ? 'bg-emerald-900/30 text-emerald-300 hover:bg-emerald-800/40 hover:text-white' 
                  : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
              }`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className={`p-4 border-t ${darkMode ? 'border-emerald-500/20' : 'border-emerald-200'}`}>
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about your dashboard..."
              className={`w-full px-4 py-3 rounded-xl ${
                darkMode 
                  ? 'bg-emerald-900/30 border-emerald-500/20 text-white placeholder-emerald-400/50' 
                  : 'bg-emerald-50 border-emerald-200 text-gray-900 placeholder-emerald-500/50'
              } border focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-transparent`}
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`p-3 rounded-xl transition-all duration-200 flex items-center justify-center ${
              isLoading || !input.trim()
                ? 'bg-emerald-900/20 text-emerald-400/50 cursor-not-allowed'
                : darkMode
                  ? 'bg-gradient-to-r from-emerald-600 to-green-500 text-white hover:shadow-lg'
                  : 'bg-gradient-to-r from-emerald-500 to-green-400 text-white hover:shadow-lg'
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </form>
        
        {/* Assistant Status */}
        <div className="flex items-center justify-between mt-3 text-xs">
          <div className="flex items-center space-x-4 text-emerald-400/70">
            <span className="flex items-center space-x-1">
              <MessageSquare className="h-3 w-3" />
              <span>{messages.length} messages</span>
            </span>
            <span>•</span>
            <span>Real-time analysis enabled</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400">Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDashboardAssistant;