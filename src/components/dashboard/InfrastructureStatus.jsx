import React from 'react';
import { Activity, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

function InfrastructureStatus() {
  const statusData = [
    { status: 'Functional', count: 35, percentage: 73, color: 'bg-green-500', icon: CheckCircle },
    { status: 'Needs Repair', count: 8, percentage: 17, color: 'bg-yellow-500', icon: AlertCircle },
    { status: 'Non-functional', count: 5, percentage: 10, color: 'bg-red-500', icon: XCircle },
  ];

  return (
    <div className="glass-effect rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Infrastructure Status</h2>
        <Activity className="h-5 w-5 text-primary-500" />
      </div>
      <div className="space-y-4">
        {statusData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-sm">{item.status}</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">{item.count} facilities</div>
                <div className="text-xs text-gray-400">{item.percentage}%</div>
              </div>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfrastructureStatus;