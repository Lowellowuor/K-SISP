import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { AlertCircle, CheckCircle, Clock, Image as ImageIcon, User, MessageSquare, ThumbsUp } from 'lucide-react';

// Custom report icons
const createReportIcon = (status, type) => {
  const colors = {
    pending: '#f59e0b',
    in_progress: '#3b82f6',
    resolved: '#10b981',
    urgent: '#ef4444'
  };

  const icons = {
    water: '💧',
    toilet: '🚽',
    drainage: '🌊',
    waste: '🗑️',
    general: '📢'
  };

  return L.divIcon({
    html: `
      <div class="relative">
        <div class="w-10 h-10 rounded-full bg-white border-4 ${status === 'urgent' ? 'border-red-500 animate-pulse' : 'border-' + (status === 'resolved' ? 'green' : status === 'in_progress' ? 'blue' : 'amber') + '-500'} shadow-lg flex items-center justify-center">
          <div class="text-lg">${icons[type] || '📢'}</div>
        </div>
        <div class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white border-2 border-gray-800 flex items-center justify-center">
          <div class="w-2 h-2 rounded-full ${status === 'urgent' ? 'bg-red-500' : 'bg-' + (status === 'resolved' ? 'green' : status === 'in_progress' ? 'blue' : 'amber') + '-500'}"></div>
        </div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    className: 'cursor-pointer'
  });
};

const reportsData = [
  { 
    id: 1, 
    lat: -1.3172, 
    lng: 36.7918, 
    type: 'water', 
    status: 'urgent',
    title: 'Water Pipe Burst',
    description: 'Major water leak affecting 50+ households',
    submittedBy: 'John M.',
    date: '2024-01-20 14:30',
    photos: 3,
    upvotes: 12,
    comments: 8,
    verified: true,
    priority: 'high'
  },
  { 
    id: 2, 
    lat: -1.3185, 
    lng: 36.7925, 
    type: 'toilet', 
    status: 'in_progress',
    title: 'Toilet Blockage',
    description: 'Toilet not flushing properly',
    submittedBy: 'Mary K.',
    date: '2024-01-19 10:15',
    photos: 2,
    upvotes: 5,
    comments: 3,
    verified: true,
    priority: 'medium'
  },
  { 
    id: 3, 
    lat: -1.3163, 
    lng: 36.7932, 
    type: 'drainage', 
    status: 'pending',
    title: 'Drainage Overflow',
    description: 'Drainage blocked causing flooding',
    submittedBy: 'Peter W.',
    date: '2024-01-20 09:45',
    photos: 4,
    upvotes: 8,
    comments: 5,
    verified: false,
    priority: 'high'
  },
  { 
    id: 4, 
    lat: -1.3192, 
    lng: 36.7905, 
    type: 'waste', 
    status: 'resolved',
    title: 'Garbage Accumulation',
    description: 'Waste not collected for 3 days',
    submittedBy: 'Sarah J.',
    date: '2024-01-18 16:20',
    photos: 1,
    upvotes: 3,
    comments: 2,
    verified: true,
    priority: 'medium'
  },
  { 
    id: 5, 
    lat: -1.3158, 
    lng: 36.7945, 
    type: 'general', 
    status: 'pending',
    title: 'Foul Odor',
    description: 'Strong smell from drainage system',
    submittedBy: 'Anonymous',
    date: '2024-01-20 11:00',
    photos: 0,
    upvotes: 15,
    comments: 12,
    verified: false,
    priority: 'low'
  },
];

const getStatusIcon = (status) => {
  switch (status) {
    case 'resolved': return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'in_progress': return <Clock className="h-4 w-4 text-blue-500" />;
    case 'urgent': return <AlertCircle className="h-4 w-4 text-red-500 animate-pulse" />;
    default: return <Clock className="h-4 w-4 text-amber-500" />;
  }
};

const getStatusText = (status) => {
  return status.replace('_', ' ').toUpperCase();
};

function ReportsLayer() {
  return (
    <>
      {reportsData.map((report) => {
        const icon = createReportIcon(report.status, report.type);
        
        return (
          <Marker
            key={report.id}
            position={[report.lat, report.lng]}
            icon={icon}
          >
            <Popup className="custom-popup">
              <div className="p-4 min-w-[350px]">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      report.status === 'urgent' ? 'bg-red-100' :
                      report.status === 'in_progress' ? 'bg-blue-100' :
                      report.status === 'resolved' ? 'bg-green-100' : 'bg-amber-100'
                    }`}>
                      {getStatusIcon(report.status)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{report.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          report.status === 'urgent' ? 'bg-red-100 text-red-800' :
                          report.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          report.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {getStatusText(report.status)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          report.priority === 'high' ? 'bg-red-100 text-red-800' :
                          report.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {report.priority.toUpperCase()}
                        </span>
                        {report.verified && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            VERIFIED
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600">{report.description}</p>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Submitted by:</span>
                      <span className="text-sm font-medium">{report.submittedBy}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Date:</span>
                      <span className="text-sm font-medium">{report.date}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <ImageIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Photos:</span>
                      <span className="text-sm font-medium">{report.photos}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Comments:</span>
                      <span className="text-sm font-medium">{report.comments}</span>
                    </div>
                  </div>
                </div>

                {/* Engagement */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">{report.upvotes} upvotes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">{report.comments} comments</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Type: {report.type}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <button className="py-2 text-sm bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100">
                    View Details
                  </button>
                  <button className="py-2 text-sm bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100">
                    Add Comment
                  </button>
                  <button className="py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    Share
                  </button>
                </div>

                {/* Coordinates */}
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    Location: {report.lat.toFixed(6)}, {report.lng.toFixed(6)}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default ReportsLayer;