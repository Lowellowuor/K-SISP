import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, X, Send, Sparkles, Brain, Lightbulb, 
  TrendingUp, AlertTriangle, CheckCircle, Clock,
  ChevronRight, Cpu, Database, Zap, MessageSquare,
  RefreshCw, Download, Share2, HelpCircle, Settings
} from 'lucide-react';

const AIAnalyticsAssistant = ({ onClose, darkMode }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI Analytics Assistant. I can help you analyze data, generate insights, create forecasts, and answer questions about your sanitation research. What would you like to explore today?",
      sender: 'ai',
      timestamp: new Date().toISOString(),
      suggestions: [
        "Show me recent trends in sanitation coverage",
        "Generate a forecast for the next quarter",
        "Analyze zone-wise performance metrics",
        "Create a correlation analysis report",
        "What are the key risk factors identified?"
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [analysisInProgress, setAnalysisInProgress] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Predefined analysis templates
  const analysisTemplates = [
    {
      id: 'trend',
      title: 'Trend Analysis',
      icon: TrendingUp,
      description: 'Analyze historical patterns and growth trajectories',
      prompt: 'Perform a comprehensive trend analysis on sanitation coverage across all zones for the last 30 days, identifying key patterns and growth rates.',
      color: 'text-emerald-400'
    },
    {
      id: 'forecast',
      title: 'Forecast Model',
      icon: Brain,
      description: 'Generate predictive models and future projections',
      prompt: 'Create a predictive forecast model for the next quarter based on historical data, considering seasonal variations and recent patterns.',
      color: 'text-cyan-400'
    },
    {
      id: 'comparison',
      title: 'Zone Comparison',
      icon: Cpu,
      description: 'Compare performance metrics across different zones',
      prompt: 'Compare sanitation metrics across all zones, highlighting strengths, weaknesses, and opportunities for improvement.',
      color: 'text-amber-400'
    },
    {
      id: 'insight',
      title: 'Deep Insights',
      icon: Lightbulb,
      description: 'Extract hidden patterns and actionable insights',
      prompt: 'Extract deep insights from the data, identifying correlations between different metrics and suggesting optimization strategies.',
      color: 'text-purple-400'
    }
  ];

  const quickActions = [
    { id: 'export', label: 'Export Analysis', icon: Download, color: 'text-green-400' },
    { id: 'share', label: 'Share Results', icon: Share2, color: 'text-blue-400' },
    { id: 'schedule', label: 'Schedule Report', icon: Clock, color: 'text-amber-400' },
    { id: 'refresh', label: 'Update Data', icon: RefreshCw, color: 'text-cyan-400' },
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const simulateAITyping = (responseText, suggestions = []) => {
    setIsTyping(true);
    let currentText = '';
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < responseText.length) {
        currentText += responseText[index];
        setMessages(prev => prev.map(msg => 
          msg.id === messages.length + 1 
            ? { ...msg, text: currentText }
            : msg
        ));
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        
        // Add suggestions if any
        if (suggestions.length > 0) {
          setTimeout(() => {
            setMessages(prev => [...prev, {
              id: prev.length + 2,
              text: '',
              sender: 'ai',
              timestamp: new Date().toISOString(),
              suggestions: suggestions
            }]);
          }, 500);
        }
      }
    }, 20);
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Start analysis simulation
    if (input.toLowerCase().includes('analyze') || 
        input.toLowerCase().includes('show') ||
        input.toLowerCase().includes('generate')) {
      startAnalysisSimulation(input);
    } else {
      // Simulate AI response for general queries
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          text: '',
          sender: 'ai',
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, aiResponse]);
        
        // Simulate typing
        const responses = [
          "I'm analyzing your query and preparing insights based on the latest data patterns...",
          "Based on the sanitation data, I've identified several key trends and patterns...",
          "Here's my analysis of your question with actionable insights and recommendations...",
          "I've processed your request and generated the following insights from the dataset..."
        ];
        
        const responseText = responses[Math.floor(Math.random() * responses.length)];
        const suggestions = [
          "Would you like me to generate a detailed report?",
          "Should I create a visualization for these insights?",
          "Want to compare these results with historical data?",
          "Would you like to schedule regular updates on this analysis?"
        ];
        
        simulateAITyping(responseText, suggestions);
      }, 500);
    }
  };

  const startAnalysisSimulation = (query) => {
    setAnalysisInProgress(true);
    setAnalysisProgress(0);

    // Add initial AI response
    const aiResponse = {
      id: messages.length + 2,
      text: '',
      sender: 'ai',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, aiResponse]);

    // Simulate analysis steps
    const analysisSteps = [
      "🔍 Processing your query...",
      "📊 Gathering data from multiple sources...",
      "🧠 Running predictive models...",
      "📈 Analyzing trends and patterns...",
      "💡 Generating insights and recommendations..."
    ];

    let stepIndex = 0;
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        const newProgress = prev + 2;
        
        // Update message with current step
        if (newProgress % 20 === 0 && stepIndex < analysisSteps.length) {
          const currentText = analysisSteps.slice(0, stepIndex + 1).join('\n');
          setMessages(prev => prev.map(msg => 
            msg.id === messages.length + 2 
              ? { ...msg, text: currentText }
              : msg
          ));
          stepIndex++;
        }
        
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            completeAnalysis(query);
          }, 500);
        }
        
        return newProgress;
      });
    }, 100);
  };

  const completeAnalysis = (query) => {
    setAnalysisInProgress(false);
    setAnalysisProgress(100);

    const insights = [
      "📊 **Key Findings:**\n• North Zone shows 15% higher coverage than average\n• Peak usage occurs between 7-9 AM daily\n• Mobile access increased by 40% last quarter\n• Rainfall correlates with 85% of maintenance issues",
      "📈 **Trends Identified:**\n• Overall coverage increased by 2.1% this month\n• User satisfaction improved by 0.3 points\n• Maintenance response time decreased by 18%\n• Digital adoption grew by 25%",
      "💡 **Recommendations:**\n• Increase maintenance frequency in East Zone\n• Extend service hours during peak periods\n• Deploy mobile units to underserved areas\n• Implement IoT sensors for real-time monitoring",
      "⚠️ **Risk Factors:**\n• South Zone shows vulnerability to weather changes\n• Resource allocation needs optimization\n• Some areas show decreasing trend in coverage\n• Data quality needs improvement in certain metrics"
    ];

    const randomInsight = insights[Math.floor(Math.random() * insights.length)];
    
    const completeResponse = randomInsight + "\n\n" + 
      "I've completed the analysis. Would you like to:\n" +
      "1. Export these results as a report\n" +
      "2. Create visualizations\n" +
      "3. Schedule regular updates\n" +
      "4. Dive deeper into specific areas";

    simulateAITyping(completeResponse, [
      "Export full analysis report",
      "Create visualization dashboard",
      "Schedule weekly updates",
      "Analyze specific zones"
    ]);
  };

  const handleTemplateClick = (template) => {
    setInput(template.prompt);
    setTimeout(() => {
      handleSend();
    }, 100);
  };

  const handleQuickAction = (action) => {
    const actionMessages = {
      export: "I'll prepare the export with all analysis results and visualizations. The report will include executive summary, detailed findings, and recommendations.",
      share: "I can help you share these results with your team. Would you like to share via email, generate a shareable link, or integrate with collaboration tools?",
      schedule: "I can schedule regular analysis updates. Would you prefer daily, weekly, or monthly reports? I can also set up alerts for specific metrics.",
      refresh: "I'll update the data with the latest information. This may take a few moments to process and incorporate new data points."
    };

    const aiResponse = {
      id: messages.length + 1,
      text: '',
      sender: 'ai',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, aiResponse]);
    simulateAITyping(actionMessages[action]);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setTimeout(() => {
      handleSend();
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Assistant Container */}
      <div className={`relative w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl overflow-hidden ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-emerald-900/20 to-gray-900 border border-emerald-500/30'
          : 'bg-gradient-to-br from-white via-emerald-50/50 to-white border border-emerald-200'
      }`}>
        
        {/* Header */}
        <div className={`p-6 border-b ${
          darkMode ? 'border-emerald-500/20' : 'border-emerald-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-xl ${
                darkMode ? 'bg-emerald-500/20' : 'bg-emerald-100'
              }`}>
                <Bot className={`h-6 w-6 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  AI Analytics Assistant
                </h2>
                <p className={`text-sm ${darkMode ? 'text-emerald-300/70' : 'text-emerald-600/70'}`}>
                  Powered by advanced ML models • Real-time insights
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                darkMode 
                  ? 'bg-emerald-500/20 text-emerald-400' 
                  : 'bg-emerald-100 text-emerald-600'
              }`}>
                <Sparkles className="inline h-3 w-3 mr-1" />
                AI Active
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'hover:bg-emerald-900/30 text-emerald-300' 
                    : 'hover:bg-emerald-100 text-emerald-600'
                }`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex border-b ${
          darkMode ? 'border-emerald-500/20' : 'border-emerald-200'
        }`}>
          {['chat', 'templates', 'quick'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? darkMode
                    ? 'text-emerald-400 border-b-2 border-emerald-400'
                    : 'text-emerald-600 border-b-2 border-emerald-600'
                  : darkMode
                    ? 'text-emerald-300/70 hover:text-emerald-300'
                    : 'text-emerald-600/70 hover:text-emerald-600'
              }`}
            >
              {tab === 'chat' ? 'Chat' : tab === 'templates' ? 'Analysis Templates' : 'Quick Actions'}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex">
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl p-4 ${
                    message.sender === 'user'
                      ? darkMode
                        ? 'bg-emerald-600/40 text-white'
                        : 'bg-emerald-500 text-white'
                      : darkMode
                        ? 'bg-emerald-900/30 text-emerald-200'
                        : 'bg-emerald-50 text-gray-800'
                  }`}>
                    <div className="whitespace-pre-line">{message.text}</div>
                    
                    {/* Analysis Progress */}
                    {analysisInProgress && message.sender === 'ai' && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs text-emerald-400/70 mb-1">
                          <span>Processing Analysis</span>
                          <span>{Math.round(analysisProgress)}%</span>
                        </div>
                        <div className="w-full bg-emerald-900/30 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-emerald-400 to-green-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${analysisProgress}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center space-x-2 mt-2 text-xs text-emerald-400">
                          <Cpu className="h-3 w-3 animate-spin" />
                          <span>Running predictive models...</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-xs text-emerald-400/70 mb-2">Suggested actions:</p>
                        {message.suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                              darkMode
                                ? 'bg-emerald-900/40 hover:bg-emerald-800/50 text-emerald-200'
                                : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700'
                            }`}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && !analysisInProgress && (
                <div className="flex justify-start">
                  <div className={`max-w-[80%] rounded-2xl p-4 ${
                    darkMode ? 'bg-emerald-900/30' : 'bg-emerald-50'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-150"></div>
                      </div>
                      <span className={`text-sm ${
                        darkMode ? 'text-emerald-400' : 'text-emerald-600'
                      }`}>
                        Thinking...
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className={`p-4 border-t ${
              darkMode ? 'border-emerald-500/20' : 'border-emerald-200'
            }`}>
              <div className="flex items-end space-x-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about trends, forecasts, or request analysis..."
                    className={`w-full p-4 pr-12 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                      darkMode
                        ? 'bg-emerald-900/30 text-white placeholder-emerald-400/50'
                        : 'bg-emerald-50 text-gray-900 placeholder-emerald-600/50'
                    }`}
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className={`absolute right-3 bottom-3 p-2 rounded-lg transition-colors ${
                      !input.trim() || isTyping
                        ? 'opacity-50 cursor-not-allowed'
                        : darkMode
                          ? 'hover:bg-emerald-900/50 text-emerald-400'
                          : 'hover:bg-emerald-100 text-emerald-600'
                    }`}
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className={`text-xs mt-2 text-center ${
                darkMode ? 'text-emerald-400/50' : 'text-emerald-600/50'
              }`}>
                Press Enter to send • Shift+Enter for new line
              </p>
            </div>
          </div>

          {/* Side Panel */}
          <div className={`w-80 border-l p-6 overflow-y-auto ${
            darkMode ? 'border-emerald-500/20' : 'border-emerald-200'
          }`}>
            {activeTab === 'templates' && (
              <div>
                <h3 className={`text-sm font-semibold mb-4 ${
                  darkMode ? 'text-emerald-300' : 'text-emerald-700'
                }`}>
                  Quick Analysis Templates
                </h3>
                <div className="space-y-3">
                  {analysisTemplates.map((template) => {
                    const Icon = template.icon;
                    return (
                      <button
                        key={template.id}
                        onClick={() => handleTemplateClick(template)}
                        className={`w-full text-left p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                          darkMode
                            ? 'bg-emerald-900/30 hover:bg-emerald-800/40 border border-emerald-500/20'
                            : 'bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
                        }`}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`p-2 rounded-lg ${
                            darkMode ? 'bg-emerald-900/40' : 'bg-emerald-100'
                          }`}>
                            <Icon className={`h-5 w-5 ${template.color}`} />
                          </div>
                          <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {template.title}
                          </h4>
                        </div>
                        <p className={`text-sm mb-3 ${darkMode ? 'text-emerald-300/70' : 'text-emerald-600/70'}`}>
                          {template.description}
                        </p>
                        <div className="flex items-center text-xs text-emerald-400">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Click to generate
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'quick' && (
              <div>
                <h3 className={`text-sm font-semibold mb-4 ${
                  darkMode ? 'text-emerald-300' : 'text-emerald-700'
                }`}>
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.id}
                        onClick={() => handleQuickAction(action.id)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors ${
                          darkMode
                            ? 'bg-emerald-900/30 hover:bg-emerald-800/40'
                            : 'bg-emerald-50 hover:bg-emerald-100'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`h-5 w-5 ${action.color}`} />
                          <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {action.label}
                          </span>
                        </div>
                        <ChevronRight className={`h-4 w-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      </button>
                    );
                  })}
                </div>
                
                {/* Capabilities */}
                <div className="mt-8">
                  <h3 className={`text-sm font-semibold mb-4 ${
                    darkMode ? 'text-emerald-300' : 'text-emerald-700'
                  }`}>
                    AI Capabilities
                  </h3>
                  <div className={`p-4 rounded-xl ${
                    darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'
                  }`}>
                    <div className="space-y-2">
                      {[
                        'Predictive forecasting',
                        'Trend analysis',
                        'Anomaly detection',
                        'Pattern recognition',
                        'Statistical modeling',
                        'Insight generation'
                      ].map((capability, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-emerald-400" />
                          <span className={`text-xs ${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>
                            {capability}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Chat Tab Sidebar */}
            {activeTab === 'chat' && (
              <div>
                <h3 className={`text-sm font-semibold mb-4 ${
                  darkMode ? 'text-emerald-300' : 'text-emerald-700'
                }`}>
                  Recent Analytics
                </h3>
                <div className="space-y-3 mb-6">
                  {[
                    { name: 'Coverage Trends', time: '10 min ago', status: 'complete' },
                    { name: 'Risk Assessment', time: '25 min ago', status: 'complete' },
                    { name: 'Forecast Model', time: '1 hour ago', status: 'processing' },
                    { name: 'Zone Comparison', time: '2 hours ago', status: 'complete' },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg ${
                        darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {item.name}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          item.status === 'complete'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <div className={`text-xs mt-1 ${darkMode ? 'text-emerald-400/70' : 'text-emerald-600/70'}`}>
                        {item.time}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tips */}
                <div className={`p-4 rounded-xl ${
                  darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-amber-400" />
                    <h4 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Tips for Better Analysis
                    </h4>
                  </div>
                  <ul className="space-y-2 text-xs">
                    <li className={`${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>
                      • Specify time ranges for trend analysis
                    </li>
                    <li className={`${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>
                      • Compare multiple zones for insights
                    </li>
                    <li className={`${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>
                      • Ask for forecasts with confidence levels
                    </li>
                    <li className={`${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>
                      • Request visualizations and reports
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div className={`px-4 py-2 border-t ${
          darkMode ? 'border-emerald-500/20 bg-emerald-900/20' : 'border-emerald-200 bg-emerald-50'
        }`}>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className={darkMode ? 'text-emerald-400' : 'text-emerald-600'}>
                  AI Assistant Active
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Database className="h-3 w-3 text-emerald-400" />
                <span className={darkMode ? 'text-emerald-400/70' : 'text-emerald-600/70'}>
                  Connected to Analytics Engine
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquare className="h-3 w-3 text-emerald-400" />
              <span className={darkMode ? 'text-emerald-400/70' : 'text-emerald-600/70'}>
                {messages.filter(m => m.sender === 'user').length} queries analyzed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalyticsAssistant;