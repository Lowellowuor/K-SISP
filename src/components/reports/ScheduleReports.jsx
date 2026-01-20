import React, { useState } from 'react';
import {
  Calendar, Clock, Repeat, Users,
  Bell, CheckCircle, X, Plus,
  Edit2, Trash2, Play, Pause,
  Mail, Smartphone, Globe
} from 'lucide-react';

function ScheduleReports() {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      title: 'Weekly Performance Report',
      description: 'Weekly summary of all sanitation services',
      frequency: 'weekly',
      nextRun: 'Tomorrow, 08:00',
      recipients: ['team@ksisp.org', 'admin@ksisp.org'],
      status: 'active',
      lastRun: 'Today, 08:00',
      format: 'PDF',
      channel: 'email'
    },
    {
      id: 2,
      title: 'Monthly Analytics',
      description: 'Detailed monthly performance analytics',
      frequency: 'monthly',
      nextRun: 'Feb 1, 00:00',
      recipients: ['analytics@ksisp.org', 'management@ksisp.org'],
      status: 'active',
      lastRun: 'Jan 1, 00:00',
      format: 'Excel',
      channel: 'email'
    },
    {
      id: 3,
      title: 'Quarterly Review',
      description: 'Comprehensive quarterly review',
      frequency: 'quarterly',
      nextRun: 'Mar 31, 23:59',
      recipients: ['board@ksisp.org', 'partners@ksisp.org'],
      status: 'paused',
      lastRun: 'Dec 31, 23:59',
      format: 'PDF',
      channel: 'email'
    },
    {
      id: 4,
      title: 'Daily Dashboard',
      description: 'Daily operational dashboard',
      frequency: 'daily',
      nextRun: 'Tomorrow, 06:00',
      recipients: ['ops@ksisp.org'],
      status: 'active',
      lastRun: 'Today, 06:00',
      format: 'HTML',
      channel: 'dashboard'
    },
  ]);

  const [newSchedule, setNewSchedule] = useState({
    title: '',
    description: '',
    frequency: 'weekly',
    time: '08:00',
    format: 'PDF',
    channel: 'email',
    recipients: []
  });

  const frequencies = [
    { id: 'daily', label: 'Daily', icon: Repeat },
    { id: 'weekly', label: 'Weekly', icon: Calendar },
    { id: 'monthly', label: 'Monthly', icon: Calendar },
    { id: 'quarterly', label: 'Quarterly', icon: Calendar },
    { id: 'yearly', label: 'Yearly', icon: Calendar },
  ];

  const channels = [
    { id: 'email', label: 'Email', icon: Mail, color: 'text-blue-500' },
    { id: 'dashboard', label: 'Dashboard', icon: Globe, color: 'text-purple-500' },
    { id: 'mobile', label: 'Mobile App', icon: Smartphone, color: 'text-green-500' },
    { id: 'api', label: 'API', icon: Globe, color: 'text-amber-500' },
  ];

  const toggleScheduleStatus = (id) => {
    setSchedules(schedules.map(schedule => 
      schedule.id === id 
        ? { ...schedule, status: schedule.status === 'active' ? 'paused' : 'active' }
        : schedule
    ));
  };

  const deleteSchedule = (id) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Schedule Reports</h2>
        <p className="text-gray-400">Automate report generation and distribution</p>
      </div>

      {/* Create New Schedule */}
      <div className="glass-effect rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Create New Schedule</h3>
          <Plus className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Report Title</label>
            <input
              type="text"
              value={newSchedule.title}
              onChange={(e) => setNewSchedule({...newSchedule, title: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
              placeholder="Enter report title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Frequency</label>
            <select
              value={newSchedule.frequency}
              onChange={(e) => setNewSchedule({...newSchedule, frequency: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
            >
              {frequencies.map(freq => (
                <option key={freq.id} value={freq.id}>{freq.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Format</label>
            <select
              value={newSchedule.format}
              onChange={(e) => setNewSchedule({...newSchedule, format: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
            >
              <option>PDF</option>
              <option>Excel</option>
              <option>Word</option>
              <option>HTML</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Delivery Channel</label>
            <div className="flex space-x-2">
              {channels.map(channel => (
                <button
                  key={channel.id}
                  onClick={() => setNewSchedule({...newSchedule, channel: channel.id})}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                    newSchedule.channel === channel.id
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <channel.icon className="h-4 w-4" />
                  <span>{channel.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl">
          <Calendar className="h-4 w-4" />
          <span className="font-semibold">Create Schedule</span>
        </button>
      </div>

      {/* Scheduled Reports List */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Active Schedules</h3>
          <div className="text-sm text-gray-400">{schedules.length} schedules</div>
        </div>
        
        <div className="space-y-4">
          {schedules.map((schedule) => (
            <div key={schedule.id} className="p-4 rounded-xl bg-white/5 hover:bg-white/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10">
                    <Calendar className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{schedule.title}</h4>
                    <p className="text-sm text-gray-400">{schedule.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleScheduleStatus(schedule.id)}
                    className={`p-2 rounded-lg ${
                      schedule.status === 'active' 
                        ? 'text-green-400 hover:bg-green-500/20'
                        : 'text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {schedule.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteSchedule(schedule.id)}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-gray-400 mb-1">Frequency</div>
                  <div className="flex items-center space-x-2 text-white">
                    <Repeat className="h-4 w-4" />
                    <span>{schedule.frequency.charAt(0).toUpperCase() + schedule.frequency.slice(1)}</span>
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Next Run</div>
                  <div className="flex items-center space-x-2 text-white">
                    <Clock className="h-4 w-4" />
                    <span>{schedule.nextRun}</span>
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Status</div>
                  <div className={`flex items-center space-x-2 ${
                    schedule.status === 'active' ? 'text-green-400' : 'text-amber-400'
                  }`}>
                    {schedule.status === 'active' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Clock className="h-4 w-4" />
                    )}
                    <span className="capitalize">{schedule.status}</span>
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Delivery</div>
                  <div className="flex items-center space-x-2 text-white">
                    {channels.find(c => c.id === schedule.channel)?.icon({ className: "h-4 w-4" })}
                    <span>{schedule.format} • {schedule.channel}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Recipients: {schedule.recipients.join(', ')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScheduleReports;