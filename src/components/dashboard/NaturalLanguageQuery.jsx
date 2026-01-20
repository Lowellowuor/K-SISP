import React, { useState } from 'react';
import { Search, Mic, Bot, Zap, Filter, TrendingUp, X, ChevronDown } from 'lucide-react';

const NaturalLanguageQuery = ({ darkMode = true, onAssistantToggle, onQuerySubmit }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentQueries, setRecentQueries] = useState([
    "Show me system health for last week",
    "Compare zone performance metrics",
    "Generate energy consumption report",
    "What are the current alerts?"
  ]);

  const suggestions = [
    { icon: TrendingUp, text: "Show performance trends", category: "Analytics" },
    { icon: Filter, text: "Filter by zone: North", category: "Filter" },
    { icon: Zap, text: "Energy usage this month", category: "Metrics" },
    { icon: Bot, text: "Predict maintenance needs", category: "AI" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (onQuerySubmit) {
      onQuerySubmit(query);
    }
    
    // Add to recent queries if not already there
    if (!recentQueries.includes(query)) {
      setRecentQueries(prev => [query, ...prev.slice(0, 3)]);
    }
    
    setQuery('');
    setShowSuggestions(false);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    setIsListening(true);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.text);
    if (onQuerySubmit) {
      onQuerySubmit(suggestion.text);
    }
    setShowSuggestions(false);
  };

  const handleRecentQueryClick = (recentQuery) => {
    setQuery(recentQuery);
    if (onQuerySubmit) {
      onQuerySubmit(recentQuery);
    }
  };

  return (
    <div className="relative">
      <div className={`rounded-2xl p-2 ${darkMode ? 'glass-green-card' : 'glass-light-card'}`}>
        <div className="flex items-center space-x-3">
          {/* AI Assistant Trigger */}
          <button
            onClick={onAssistantToggle}
            className={`p-3 rounded-xl flex items-center space-x-2 transition-all duration-300 ${
              darkMode 
                ? 'bg-gradient-to-r from-emerald-600/40 to-green-500/40 hover:from-emerald-600 hover:to-green-500' 
                : 'bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500'
            } text-white hover:shadow-lg group`}
          >
            <Bot className="h-5 w-5" />
            <span className="text-sm font-medium">AI Assistant</span>
            <Zap className="h-3 w-3 text-amber-300 group-hover:animate-pulse" />
          </button>

          {/* Search Input */}
          <div className="flex-1 relative">
            <form onSubmit={handleSubmit} className="relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                darkMode ? 'text-emerald-400/70' : 'text-emerald-500/70'
              }`} />
              
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Ask a question about your data or type a command..."
                className={`w-full pl-12 pr-24 py-3 rounded-xl ${
                  darkMode 
                    ? 'bg-emerald-900/30 border-emerald-500/20 text-white placeholder-emerald-400/50' 
                    : 'bg-white border border-emerald-200 text-gray-900 placeholder-emerald-500/50'
                } focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-transparent transition-all duration-200`}
              />
              
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`p-2 rounded-lg transition-colors ${
                    isListening
                      ? 'bg-red-500/20 text-red-400 animate-pulse'
                      : darkMode 
                        ? 'hover:bg-emerald-800/30 text-emerald-400 hover:text-white' 
                        : 'hover:bg-emerald-100 text-emerald-500 hover:text-emerald-700'
                  }`}
                  title="Voice input"
                >
                  <Mic className="h-4 w-4" />
                </button>
                
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode 
                        ? 'hover:bg-emerald-800/30 text-emerald-400 hover:text-white' 
                        : 'hover:bg-emerald-100 text-emerald-500 hover:text-emerald-700'
                    }`}
                    title="Clear"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    query.trim()
                      ? darkMode 
                        ? 'bg-gradient-to-r from-emerald-600 to-green-500 text-white hover:shadow-lg' 
                        : 'bg-gradient-to-r from-emerald-500 to-green-400 text-white hover:shadow-lg'
                      : darkMode 
                        ? 'bg-emerald-900/30 text-emerald-400/50 cursor-not-allowed' 
                        : 'bg-emerald-100 text-emerald-400/50 cursor-not-allowed'
                  }`}
                  disabled={!query.trim()}
                >
                  Search
                </button>
              </div>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && (
              <div className={`absolute top-full left-0 right-0 mt-2 rounded-xl shadow-xl z-50 ${
                darkMode 
                  ? 'glass-green border-emerald-500/20' 
                  : 'bg-white border border-emerald-200'
              }`}>
                <div className="p-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-sm font-medium ${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>
                      Quick Suggestions
                    </span>
                    <ChevronDown className={`h-4 w-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-500'}`} />
                  </div>
                  
                  <div className="space-y-2">
                    {suggestions.map((suggestion, index) => {
                      const Icon = suggestion.icon;
                      return (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                            darkMode 
                              ? 'hover:bg-emerald-800/30' 
                              : 'hover:bg-emerald-50'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${
                            darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'
                          }`}>
                            <Icon className={`h-4 w-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                          </div>
                          <div className="flex-1">
                            <div className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {suggestion.text}
                            </div>
                            <div className={`text-xs ${darkMode ? 'text-emerald-400/70' : 'text-emerald-500/70'}`}>
                              {suggestion.category}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  
                  {recentQueries.length > 0 && (
                    <>
                      <div className={`border-t ${darkMode ? 'border-emerald-500/20' : 'border-emerald-200'} my-3`} />
                      <div>
                        <span className={`text-sm font-medium ${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>
                          Recent Queries
                        </span>
                        <div className="mt-2 space-y-1">
                          {recentQueries.map((recentQuery, index) => (
                            <button
                              key={index}
                              onClick={() => handleRecentQueryClick(recentQuery)}
                              className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${
                                darkMode 
                                  ? 'text-emerald-300 hover:text-white hover:bg-emerald-800/30' 
                                  : 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100'
                              }`}
                            >
                              {recentQuery}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close suggestions */}
      {showSuggestions && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
};

export default NaturalLanguageQuery;