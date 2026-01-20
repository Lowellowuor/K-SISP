import React, { useState } from 'react';
import { 
  AlertCircle, CheckCircle, Clock, XCircle, 
  ThumbsUp, MessageSquare, Image, MapPin,
  ChevronRight, Filter
} from 'lucide-react';

function ReportList({ onReportSelect, filters }) {
  const [reports, setReports] = useState([
    {
      id: 1,
      title: 'Water Pipe Burst',
      description: 'Major water leak affecting 50+ households',
      type: 'water',
      status: 'pending',
      priority: 'high',
      votes: 42,
      comments: 12,
      photos: 3,
      location: 'Zone C, Street 12',
      submittedBy: 'John M.',
      submittedDate: '2 hours ago',
      lat: -1.317,
      lng: 36.791,
      verified: true
    },
    {
      id: 2,
      title: 'Toilet Blockage',
      description: 'Community toilet not flushing properly',
      type: 'sanitation',
      status: 'in-progress',
      priority: 'medium',
      votes: 25,
      comments: 8,
      photos: 2,
      location: 'Zone A, Market Area',
      submittedBy: 'Mary K.',
      submittedDate: '5 hours ago',
      lat: -1.318,
      lng: 36.792,
      verified: true
    },
    {
      id: 3,
      title: 'Garbage Accumulation',
      description: 'Waste not collected for 3 days',
      type: 'waste',
      status: 'resolved',
      priority: 'medium',
      votes: 18,
      comments: 5,
      photos: 1,
      location: 'Zone D, Residential Block',
      submittedBy: 'Peter W.',
      submittedDate: '1 day ago',
      lat: -1.316,
      lng: 36.793,
      verified: true
    },
    {
      id: 4,
      title: 'Drainage Overflow',
      description: 'Drainage blocked causing flooding',
      type: 'drainage',
      status: 'pending',
      priority: 'high',
      votes: 56,
      comments: 15,
      photos: 4,
      location: 'Zone B, School Road',
      submittedBy: 'Sarah J.',
      submittedDate: '3 hours ago',
      lat: -1.319,
      lng: 36.790,
      verified: false
    },
    {
      id: 5,
      title: 'Foul Odor',
      description: 'Strong smell from drainage system',
      type: 'other',
      status: 'pending',
      priority: 'low',
      votes: 8,
      comments: 3,
      photos: 0,
      location: 'Zone C, Market Area',
      submittedBy: 'Anonymous',
      submittedDate: '6 hours ago',
      lat: -1.315,
      lng: 36.794,
      verified: false
    },
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
      case 'in-progress': return { icon: AlertCircle, color: 'text-blue-500', bg: 'bg-blue-500/10' };
      case 'resolved': return { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' };
      default: return { icon: XCircle, color: 'text-gray-500', bg: 'bg-gray-500/10' };
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'water': return 'bg-blue-500';
      case 'sanitation': return 'bg-green-500';
      case 'waste': return 'bg-amber-500';
      case 'drainage': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredReports = reports.filter(report => {
    if (filters.status !== 'all' && report.status !== filters.status) return false;
    if (filters.type !== 'all' && report.type !== filters.type) return false;
    return true;
  });

  return (
    <div className="glass-effect rounded-2xl p-6 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white">Citizen Reports</h2>
        <div className="text-sm text-gray-400">
          {filteredReports.length} reports
        </div>
      </div>

      <div className="space-y-3">
        {filteredReports.map((report) => {
          const status = getStatusIcon(report.status);
          const StatusIcon = status.icon;
          
          return (
            <div
              key={report.id}
              onClick={() => onReportSelect(report)}
              className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 cursor-pointer transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${getTypeColor(report.type)}`}></div>
                    <h3 className="font-semibold text-white group-hover:text-green-400">{report.title}</h3>
                    {report.verified && (
                      <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">
                        VERIFIED
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2">{report.description}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-500 group-hover:text-white" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${status.bg}`}>
                    <StatusIcon className={`h-3 w-3 ${status.color}`} />
                    <span className="text-xs text-gray-300 capitalize">{report.status.replace('-', ' ')}</span>
                  </div>
                  
                  <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(report.priority)}`}>
                    {report.priority}
                  </span>

                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{report.votes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-3 w-3" />
                      <span>{report.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Image className="h-3 w-3" />
                      <span>{report.photos}</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{report.location}</span>
                  </div>
                  <div className="mt-1">{report.submittedDate}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-8">
          <Filter className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No reports found</h3>
          <p className="text-sm text-gray-400">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}

export default ReportList;