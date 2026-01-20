import React from 'react';
import { TrendingUp, Users, MessageSquare, Award, BarChart3 } from 'lucide-react';

function EngagementAnalytics() {
  return (
    <div className="glass-effect rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white">Engagement Analytics</h2>
        <BarChart3 className="h-5 w-5 text-purple-500" />
      </div>

      <div className="space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 rounded-xl">
            <div className="flex items-center space-x-3 mb-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-white">1,250</div>
                <div className="text-sm text-gray-400">Active Users</div>
              </div>
            </div>
            <div className="text-xs text-green-400">+12% this month</div>
          </div>

          <div className="p-4 bg-white/5 rounded-xl">
            <div className="flex items-center space-x-3 mb-2">
              <MessageSquare className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-white">5,430</div>
                <div className="text-sm text-gray-400">Total Reports</div>
              </div>
            </div>
            <div className="text-xs text-green-400">+8% this month</div>
          </div>

          <div className="p-4 bg-white/5 rounded-xl">
            <div className="flex items-center space-x-3 mb-2">
              <Award className="h-5 w-5 text-amber-500" />
              <div>
                <div className="text-2xl font-bold text-white">4.3/5</div>
                <div className="text-sm text-gray-400">Satisfaction Score</div>
              </div>
            </div>
            <div className="text-xs text-green-400">+0.3 this month</div>
          </div>

          <div className="p-4 bg-white/5 rounded-xl">
            <div className="flex items-center space-x-3 mb-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-2xl font-bold text-white">89%</div>
                <div className="text-sm text-gray-400">Response Rate</div>
              </div>
            </div>
            <div className="text-xs text-green-400">+5% this month</div>
          </div>
        </div>

        {/* Engagement Chart Placeholder */}
        <div className="h-48 bg-white/5 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Engagement trends visualization</p>
          </div>
        </div>

        {/* Top Contributors */}
        <div>
          <h3 className="font-semibold text-white mb-3">Top Contributors</h3>
          <div className="space-y-2">
            {[
              { name: 'John Mwangi', reports: 42, points: 1250 },
              { name: 'Mary Atieno', reports: 35, points: 980 },
              { name: 'Peter Omondi', reports: 28, points: 750 },
            ].map((contributor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <span className="text-white font-bold">{contributor.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-medium text-white">{contributor.name}</div>
                    <div className="text-xs text-gray-400">{contributor.reports} reports</div>
                  </div>
                </div>
                <div className="text-amber-400 font-bold">{contributor.points} pts</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EngagementAnalytics;