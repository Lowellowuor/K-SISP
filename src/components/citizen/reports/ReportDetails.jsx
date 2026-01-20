import React, { useState } from 'react';
import { 
  ArrowLeft, AlertCircle, CheckCircle, Clock, 
  ThumbsUp, MessageSquare, Image, MapPin, 
  User, Calendar, Share2, Download, 
  Camera, Phone, Mail, Flag
} from 'lucide-react';

function ReportDetails({ report, onBack }) {
  const [comment, setComment] = useState('');
  const [upvoted, setUpvoted] = useState(false);

  const statusTimeline = [
    { status: 'Submitted', time: 'Today, 10:30 AM', description: 'Report created by citizen' },
    { status: 'Verified', time: 'Today, 11:15 AM', description: 'Verified by community volunteer' },
    { status: 'Assigned', time: 'Today, 1:45 PM', description: 'Assigned to maintenance team' },
    { status: 'In Progress', time: 'Today, 3:30 PM', description: 'Team dispatched to location' },
  ];

  const comments = [
    { id: 1, user: 'Community Volunteer', text: 'Verified the issue on site. Photos attached.', time: '2 hours ago', verified: true },
    { id: 2, user: 'Maintenance Team', text: 'Team dispatched. ETA 30 minutes.', time: '1 hour ago', official: true },
    { id: 3, user: 'Local Resident', text: 'Same issue in my area too!', time: '45 minutes ago' },
    { id: 4, user: 'Zone Coordinator', text: 'Priority issue. Expediting resolution.', time: '30 minutes ago', official: true },
  ];

  const photos = [
    'https://images.unsplash.com/photo-1578645635737-6a87e3c4d0e3?w=400',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w-400',
    'https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?w=400',
  ];

  const handleUpvote = () => {
    setUpvoted(!upvoted);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      // Add comment logic here
      setComment('');
    }
  };

  return (
    <div className="h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to reports</span>
        </button>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-white">
            <Share2 className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white">
            <Download className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white">
            <Flag className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Report Details */}
      <div className="space-y-6">
        {/* Title and Status */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">{report.title}</h2>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                {report.status.replace('-', ' ').toUpperCase()}
              </span>
              <button
                onClick={handleUpvote}
                className={`flex items-center space-x-1 px-3 py-1 rounded-lg ${
                  upvoted ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-gray-400'
                }`}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{report.votes + (upvoted ? 1 : 0)}</span>
              </button>
            </div>
          </div>
          
          <p className="text-gray-300 mb-4">{report.description}</p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>Submitted by {report.submittedBy}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{report.submittedDate}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{report.location}</span>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        {photos.length > 0 && (
          <div>
            <h3 className="font-semibold text-white mb-3 flex items-center">
              <Image className="h-4 w-4 mr-2" />
              Photo Evidence ({photos.length})
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {photos.map((photo, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden bg-white/5">
                  <img 
                    src={photo} 
                    alt={`Evidence ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Status Timeline */}
        <div>
          <h3 className="font-semibold text-white mb-3">Status Timeline</h3>
          <div className="space-y-4">
            {statusTimeline.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 mt-2 rounded-full ${
                  index === 0 ? 'bg-green-500' :
                  index === 1 ? 'bg-blue-500' :
                  index === 2 ? 'bg-yellow-500' :
                  'bg-purple-500'
                }`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-white">{item.status}</div>
                    <div className="text-sm text-gray-400">{item.time}</div>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        <div>
          <h3 className="font-semibold text-white mb-3 flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Comments ({comments.length})
          </h3>
          
          <div className="space-y-4 mb-4">
            {comments.map((comment) => (
              <div key={comment.id} className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-white">{comment.user}</span>
                    {comment.verified && (
                      <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">
                        VERIFIED
                      </span>
                    )}
                    {comment.official && (
                      <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                        OFFICIAL
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">{comment.time}</span>
                </div>
                <p className="text-gray-300 text-sm">{comment.text}</p>
              </div>
            ))}
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleSubmitComment} className="space-y-3">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment or update..."
              className="w-full h-24 bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button type="button" className="p-2 text-gray-400 hover:text-white">
                  <Camera className="h-4 w-4" />
                </button>
                <button type="button" className="p-2 text-gray-400 hover:text-white">
                  <Image className="h-4 w-4" />
                </button>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg"
              >
                Post Comment
              </button>
            </div>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30">
            <Phone className="h-4 w-4" />
            <span>Contact Reporter</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30">
            <Mail className="h-4 w-4" />
            <span>Send Update</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30">
            <CheckCircle className="h-4 w-4" />
            <span>Mark Resolved</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportDetails;