import React, { useState } from 'react';
import {
  Shield, AlertCircle, TrendingUp, TrendingDown, Target,
  Users, Home, Globe, Droplets, Clock, Award, Zap,
  Filter, Download, Settings, Eye, EyeOff, ChevronDown,
  ChevronUp, BarChart3, PieChart, LineChart, Map,
  XCircle, CheckCircle, AlertTriangle, Activity,
  RefreshCw, Maximize2, Minimize2, Layers
} from 'lucide-react';

function RiskAssessment() {
  const [selectedRiskCategory, setSelectedRiskCategory] = useState('health');
  const [timeHorizon, setTimeHorizon] = useState('short');
  const [showMitigation, setShowMitigation] = useState(true);
  const [riskLevel, setRiskLevel] = useState('high');
  const [expandedRisk, setExpandedRisk] = useState(null);

  const riskCategories = [
    { id: 'health', label: 'Public Health', icon: Users, color: 'text-rose-400', description: 'Disease transmission risks' },
    { id: 'environmental', label: 'Environmental', icon: Globe, color: 'text-emerald-400', description: 'Ecological impact' },
    { id: 'infrastructure', label: 'Infrastructure', icon: Home, color: 'text-amber-400', description: 'System failures' },
    { id: 'social', label: 'Social Impact', icon: Users, color: 'text-violet-400', description: 'Community consequences' },
    { id: 'economic', label: 'Economic', icon: TrendingDown, color: 'text-cyan-400', description: 'Financial implications' },
    { id: 'operational', label: 'Operational', icon: Activity, color: 'text-blue-400', description: 'Service disruptions' },
  ];

  const timeHorizons = [
    { id: 'short', label: 'Short-term (0-3 months)', color: 'bg-emerald-500' },
    { id: 'medium', label: 'Medium-term (3-12 months)', color: 'bg-amber-500' },
    { id: 'long', label: 'Long-term (1-5 years)', color: 'bg-rose-500' },
  ];

  const riskLevels = [
    { id: 'low', label: 'Low Risk', color: 'bg-emerald-500', icon: CheckCircle, description: 'Minimal impact expected' },
    { id: 'medium', label: 'Medium Risk', color: 'bg-amber-500', icon: AlertTriangle, description: 'Moderate impact likely' },
    { id: 'high', label: 'High Risk', color: 'bg-rose-500', icon: AlertCircle, description: 'Significant impact probable' },
    { id: 'critical', label: 'Critical Risk', color: 'bg-red-500', icon: XCircle, description: 'Severe impact imminent' },
  ];

  const riskScenarios = [
    {
      id: 1,
      title: 'Waterborne Disease Outbreak',
      category: 'health',
      probability: 65,
      impact: 80,
      riskLevel: 'high',
      zone: 'Residential Area A',
      triggers: ['Contaminated water sources', 'Poor drainage', 'High population density'],
      mitigation: ['Regular water testing', 'Drainage improvement', 'Health education'],
      status: 'monitoring'
    },
    {
      id: 2,
      title: 'Infrastructure Failure',
      category: 'infrastructure',
      probability: 40,
      impact: 90,
      riskLevel: 'medium',
      zone: 'Main Treatment Plant',
      triggers: ['Aging equipment', 'Lack of maintenance', 'Overcapacity'],
      mitigation: ['Preventive maintenance', 'Capacity upgrades', 'Backup systems'],
      status: 'mitigating'
    },
    {
      id: 3,
      title: 'Environmental Contamination',
      category: 'environmental',
      probability: 30,
      impact: 70,
      riskLevel: 'medium',
      zone: 'River Basin Area',
      triggers: ['Chemical spills', 'Improper waste disposal', 'Flooding'],
      mitigation: ['Containment systems', 'Proper waste management', 'Monitoring'],
      status: 'addressed'
    },
    {
      id: 4,
      title: 'Social Unrest',
      category: 'social',
      probability: 25,
      impact: 85,
      riskLevel: 'medium',
      zone: 'High-density Zones',
      triggers: ['Service disruptions', 'Cost increases', 'Perceived inequity'],
      mitigation: ['Transparent communication', 'Equitable service', 'Community engagement'],
      status: 'monitoring'
    },
  ];

  const riskMetrics = [
    { label: 'Total Identified Risks', value: '24', trend: '+3', icon: AlertCircle, color: 'text-rose-400' },
    { label: 'High/Critical Risks', value: '8', trend: '-1', icon: XCircle, color: 'text-red-400' },
    { label: 'Mitigation Coverage', value: '68%', trend: '+5%', icon: Shield, color: 'text-emerald-400' },
    { label: 'Avg Response Time', value: '3.2d', trend: '-0.8d', icon: Clock, color: 'text-amber-400' },
  ];

  const getRiskScoreColor = (score) => {
    if (score >= 70) return 'bg-gradient-to-r from-rose-500 to-red-500';
    if (score >= 50) return 'bg-gradient-to-r from-amber-500 to-orange-500';
    if (score >= 30) return 'bg-gradient-to-r from-yellow-500 to-amber-500';
    return 'bg-gradient-to-r from-emerald-500 to-green-500';
  };

  const getStatusBadge = (status) => {
    const styles = {
      monitoring: 'bg-blue-500/20 text-blue-400',
      mitigating: 'bg-amber-500/20 text-amber-400',
      addressed: 'bg-emerald-500/20 text-emerald-400',
      escalated: 'bg-rose-500/20 text-rose-400'
    };
    return (
      <span className={`text-xs px-2 py-1 rounded ${styles[status] || styles.monitoring}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-emerald-400" />
            <div className="flex space-x-1">
              {timeHorizons.map((horizon) => (
                <button
                  key={horizon.id}
                  onClick={() => setTimeHorizon(horizon.id)}
                  className={`flex items-center space-x-1 px-3 py-1.5 text-sm rounded-lg ${
                    timeHorizon === horizon.id
                      ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white'
                      : 'bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${horizon.color}`}></div>
                  <span>{horizon.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-6 w-px bg-emerald-500/20"></div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowMitigation(!showMitigation)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors ${
                showMitigation
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
              } border border-emerald-500/20`}
            >
              {showMitigation ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              <span className="text-sm">Mitigation Plans</span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-lg transition-colors">
            <Download className="h-4 w-4" />
          </button>
          <button className="p-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-lg transition-colors">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Risk Categories */}
      <div className="bg-emerald-500/5 rounded-xl p-4 border border-emerald-500/10">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-white">Risk Categories</h4>
          <span className="text-xs text-emerald-400">Select category for detailed analysis</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {riskCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedRiskCategory(category.id)}
              className={`group flex items-start p-3 rounded-xl transition-all hover:scale-[1.02] ${
                selectedRiskCategory === category.id
                  ? 'bg-gradient-to-r from-emerald-500/30 to-green-500/30 border border-emerald-500/40'
                  : 'bg-emerald-500/5 hover:bg-emerald-500/15 border border-emerald-500/10'
              }`}
            >
              <category.icon className={`h-5 w-5 mt-0.5 mr-3 ${category.color}`} />
              <div className="text-left">
                <div className={`text-sm font-medium ${
                  selectedRiskCategory === category.id ? 'text-white' : 'text-emerald-300'
                }`}>
                  {category.label}
                </div>
                <div className="text-xs text-emerald-300/60 mt-0.5">{category.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-4 gap-3">
        {riskMetrics.map((metric) => (
          <div key={metric.label} className="bg-emerald-500/5 rounded-xl p-3 border border-emerald-500/10 hover:bg-emerald-500/10 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
                <span className="text-sm text-emerald-300/80">{metric.label}</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                metric.trend.startsWith('+') 
                  ? 'bg-rose-500/20 text-rose-400' 
                  : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {metric.trend}
              </span>
            </div>
            <div className="text-2xl font-bold text-white">{metric.value}</div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Risk Matrix */}
        <div className="lg:col-span-2">
          <div className="bg-emerald-500/5 rounded-xl p-4 border border-emerald-500/10 h-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Risk Assessment Matrix</h3>
                <p className="text-sm text-emerald-300/70">Probability vs Impact analysis</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-xs text-emerald-400 hover:text-emerald-300">
                  <RefreshCw className="h-3 w-3" />
                </button>
                <button className="text-xs text-emerald-400 hover:text-emerald-300">
                  <Maximize2 className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Risk Matrix Visualization */}
            <div className="h-64 mb-4 relative">
              {/* Grid Lines */}
              <div className="absolute inset-0 border border-emerald-500/20 rounded-lg">
                {/* Vertical lines */}
                <div className="absolute left-1/4 top-0 bottom-0 w-px bg-emerald-500/10"></div>
                <div className="absolute left-2/4 top-0 bottom-0 w-px bg-emerald-500/10"></div>
                <div className="absolute left-3/4 top-0 bottom-0 w-px bg-emerald-500/10"></div>
                {/* Horizontal lines */}
                <div className="absolute top-1/4 left-0 right-0 h-px bg-emerald-500/10"></div>
                <div className="absolute top-2/4 left-0 right-0 h-px bg-emerald-500/10"></div>
                <div className="absolute top-3/4 left-0 right-0 h-px bg-emerald-500/10"></div>
              </div>

              {/* Risk Points */}
              {riskScenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className={`absolute w-6 h-6 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                    getRiskScoreColor((scenario.probability + scenario.impact) / 2)
                  } border-2 border-white shadow-lg`}
                  style={{
                    left: `${scenario.probability}%`,
                    bottom: `${scenario.impact}%`,
                  }}
                  title={`${scenario.title}: P${scenario.probability}% I${scenario.impact}%`}
                >
                  <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white">
                    {scenario.id}
                  </div>
                </div>
              ))}

              {/* Axes Labels */}
              <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-emerald-300/60">
                <span>Low Probability</span>
                <span>High Probability</span>
              </div>
              <div className="absolute -left-8 top-0 bottom-0 flex flex-col justify-between text-xs text-emerald-300/60">
                <span>High Impact</span>
                <span>Low Impact</span>
              </div>
            </div>

            {/* Risk Scenarios List */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white">Identified Risk Scenarios</h4>
              {riskScenarios
                .filter(scenario => selectedRiskCategory === 'all' || scenario.category === selectedRiskCategory)
                .map((scenario) => (
                  <div
                    key={scenario.id}
                    className="bg-emerald-500/5 rounded-lg p-3 border border-emerald-500/10 hover:bg-emerald-500/10 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${
                          scenario.riskLevel === 'high' ? 'bg-rose-500' :
                          scenario.riskLevel === 'medium' ? 'bg-amber-500' :
                          'bg-emerald-500'
                        }`}></div>
                        <span className="font-medium text-white">{scenario.title}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(scenario.status)}
                        <button
                          onClick={() => setExpandedRisk(expandedRisk === scenario.id ? null : scenario.id)}
                          className="text-emerald-400 hover:text-emerald-300"
                        >
                          {expandedRisk === scenario.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div>
                          <span className="text-emerald-300/80">Probability: </span>
                          <span className="font-medium text-white">{scenario.probability}%</span>
                        </div>
                        <div>
                          <span className="text-emerald-300/80">Impact: </span>
                          <span className="font-medium text-white">{scenario.impact}%</span>
                        </div>
                        <div>
                          <span className="text-emerald-300/80">Zone: </span>
                          <span className="font-medium text-white">{scenario.zone}</span>
                        </div>
                      </div>
                      <div className={`text-sm px-2 py-1 rounded ${
                        scenario.riskLevel === 'high' ? 'bg-rose-500/20 text-rose-400' :
                        scenario.riskLevel === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {scenario.riskLevel.toUpperCase()} RISK
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {expandedRisk === scenario.id && (
                      <div className="mt-3 pt-3 border-t border-emerald-500/20 animate-fade-in">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm font-semibold text-white mb-2">Risk Triggers</h5>
                            <ul className="space-y-1">
                              {scenario.triggers.map((trigger, index) => (
                                <li key={index} className="flex items-center space-x-2 text-sm text-emerald-300">
                                  <AlertTriangle className="h-3 w-3 text-amber-400" />
                                  <span>{trigger}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold text-white mb-2">Mitigation Strategies</h5>
                            <ul className="space-y-1">
                              {scenario.mitigation.map((strategy, index) => (
                                <li key={index} className="flex items-center space-x-2 text-sm text-emerald-300">
                                  <Shield className="h-3 w-3 text-emerald-400" />
                                  <span>{strategy}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right: Risk Levels & Mitigation */}
        <div className="space-y-4">
          {/* Risk Level Distribution */}
          <div className="bg-emerald-500/5 rounded-xl p-4 border border-emerald-500/10">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-white">Risk Level Distribution</h4>
              <PieChart className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="space-y-3">
              {riskLevels.map((level) => (
                <div key={level.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-emerald-500/5 transition-colors">
                  <div className="flex items-center space-x-2">
                    <level.icon className={`h-4 w-4 ${level.color.replace('bg-', 'text-')}`} />
                    <div>
                      <div className="text-sm text-emerald-300">{level.label}</div>
                      <div className="text-xs text-emerald-300/60">{level.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">
                      {level.id === 'low' ? '6' : level.id === 'medium' ? '10' : '8'}
                    </div>
                    <div className="text-xs text-emerald-300/60">scenarios</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mitigation Effectiveness */}
          {showMitigation && (
            <div className="bg-emerald-500/5 rounded-xl p-4 border border-emerald-500/10">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-white">Mitigation Effectiveness</h4>
                <Shield className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-emerald-300">Preventive Measures</span>
                    <span className="font-medium text-white">78% effective</span>
                  </div>
                  <div className="h-2 bg-emerald-500/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-emerald-300">Response Systems</span>
                    <span className="font-medium text-white">65% effective</span>
                  </div>
                  <div className="h-2 bg-emerald-500/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-emerald-300">Recovery Plans</span>
                    <span className="font-medium text-white">45% effective</span>
                  </div>
                  <div className="h-2 bg-emerald-500/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-rose-500 to-red-500 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div className="bg-emerald-500/5 rounded-xl p-4 border border-emerald-500/10">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-white">Recommendations</h4>
              <Zap className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="space-y-2">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <div className="text-xs text-emerald-400 font-medium mb-1">Immediate Actions</div>
                <div className="text-xs text-emerald-300/80">Implement regular water quality testing in high-risk zones</div>
              </div>
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <div className="text-xs text-amber-400 font-medium mb-1">Short-term Measures</div>
                <div className="text-xs text-amber-300/80">Upgrade aging infrastructure in critical facilities</div>
              </div>
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <div className="text-xs text-cyan-400 font-medium mb-1">Long-term Strategy</div>
                <div className="text-xs text-cyan-300/80">Develop comprehensive emergency response framework</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-emerald-500/20">
        <div className="text-sm text-emerald-300/70">
          Last assessment: Today 14:30 • Next review due: 7 days
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-500/10 text-emerald-300 rounded-lg hover:bg-emerald-500/20 hover:text-white transition-colors border border-emerald-500/20">
            <Download className="h-4 w-4" />
            <span>Export Risk Report</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all">
            <Shield className="h-4 w-4" />
            <span>Generate Mitigation Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RiskAssessment;