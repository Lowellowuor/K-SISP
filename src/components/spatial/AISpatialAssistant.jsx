import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, Sparkles, Zap, Brain, MapPin, Navigation, Filter, Target } from 'lucide-react';

const AISpatialAssistant = ({ onClose, darkMode = true }) => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'assistant', content: "Hello! I'm your spatial AI assistant. I can help you analyze geographic data, find patterns, and answer questions about the map.", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions] = useState([
    "Show me areas with low water coverage",
    "Find the nearest sanitation facility",
    "Analyze population density patterns",
    "Show coverage gaps in East Zone",
    "Compare facility distribution by zone",
    "Predict maintenance needs"
  ]);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

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

    setTimeout(() => {
      const responses = [
        `Based on your spatial query "${input}", I've identified several patterns in the geographic data.`,
        `The analysis shows optimal coverage in the North Zone with 92% service access.`,
        `I've detected coverage gaps in the eastern sector that need attention.`,
        `The spatial analysis reveals interesting density patterns near major facilities.`
      ];

      const aiMessage = {
        id: messages.length + 2,
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        actions: ['Show on Map', 'Generate Report', 'Export Analysis']
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

  return (
    <div className={`fixed inset-x-4 top-4 z-50 mx-auto max-w-2xl animate-fadeIn ${darkMode ? 'glass-green-card' : 'glass-light-card'} shadow-xl`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-emerald-500/20' : 'border-emerald-200'}`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-xl ${darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'}`}>
            <Bot className={`h-5 w-5 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
          </div>
          <div>
            <h3 className="font-semibold text-white">Spatial AI Assistant</h3>
            <p className="text-xs text-emerald-400/70">Geographic analysis & insights</p>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3 text-red-400" />
            <Navigation className="h-3 w-3 text-blue-400" />
            <Filter className="h-3 w-3 text-green-400" />
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
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {message.type === 'assistant' && (
                      <span className="text-xs text-emerald-400">AI Assistant</span>
                    )}
                  </div>
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
            <span className="text-sm">Analyzing spatial data...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      <div className="px-4 pb-3 border-t border-emerald-500/20 pt-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-emerald-400/70">Quick spatial queries:</span>
          <Target className="h-3 w-3 text-emerald-400/50" />
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
              placeholder="Ask about spatial patterns, coverage, or facilities..."
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
        
        <div className="flex items-center justify-between mt-3 text-xs">
          <div className="flex items-center space-x-4 text-emerald-400/70">
            <span>Real-time spatial analysis</span>
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

export default AISpatialAssistant;