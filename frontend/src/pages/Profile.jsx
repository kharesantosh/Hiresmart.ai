import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Calendar, Edit, Save, X,
  Trophy, Target, Clock, Award
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useInterview } from '../contexts/InterviewContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { interviews } = useInterview();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || ''
  });

  const stats = {
    totalInterviews: interviews.length,
    avgScore: interviews.length > 0 
      ? Math.round(interviews.reduce((acc, int) => acc + (int.overallScore || 0), 0) / interviews.length)
      : 0,
    bestScore: interviews.length > 0
      ? Math.max(...interviews.map(i => i.overallScore || 0))
      : 0,
    totalPracticeTime: interviews.reduce((acc, int) => acc + (int.duration || 0), 0)
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile: ' + error.message);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || '',
      bio: user?.bio || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Profile Header */}
        <div className="glass-effect rounded-2xl p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary-400 to-purple-400 flex items-center justify-center text-3xl font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-white/10 rounded-lg px-3 py-1 border border-white/20"
                    />
                  ) : (
                    user?.name || 'User'
                  )}
                </h1>
                <p className="text-white/70">{user?.email}</p>
              </div>
            </div>
            
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="btn-primary flex items-center space-x-2"
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </>
              )}
            </button>
          </div>

          {isEditing && (
            <button
              onClick={handleCancel}
              className="text-red-400 hover:text-red-300 flex items-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          )}

          {/* Profile Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-white/50" />
                <span className="text-white/70">Email:</span>
                <span>{user?.email}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-white/50" />
                <span className="text-white/70">Phone:</span>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="bg-white/10 rounded-lg px-3 py-1 border border-white/20"
                    placeholder="Add phone number"
                  />
                ) : (
                  <span>{user?.phone || 'Not provided'}</span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-white/50" />
                <span className="text-white/70">Location:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="bg-white/10 rounded-lg px-3 py-1 border border-white/20"
                    placeholder="Add location"
                  />
                ) : (
                  <span>{user?.location || 'Not provided'}</span>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-white/50" />
                <span className="text-white/70">Joined:</span>
                <span>{new Date(user?.createdAt || Date.now()).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">About Me</h3>
            {isEditing ? (
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="w-full bg-white/10 rounded-lg px-4 py-3 border border-white/20 h-32 resize-none"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-white/70">
                {user?.bio || 'No bio added yet. Click Edit Profile to add one!'}
              </p>
            )}
          </div>
        </div>

        {/* Performance Stats */}
        <div className="glass-effect rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Performance Overview</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
              <p className="text-3xl font-bold">{stats.totalInterviews}</p>
              <p className="text-sm text-white/70">Total Interviews</p>
            </div>
            
            <div className="text-center">
              <Target className="w-12 h-12 text-green-400 mx-auto mb-2" />
              <p className="text-3xl font-bold">{stats.avgScore}%</p>
              <p className="text-sm text-white/70">Average Score</p>
            </div>
            
            <div className="text-center">
              <Award className="w-12 h-12 text-purple-400 mx-auto mb-2" />
              <p className="text-3xl font-bold">{stats.bestScore}%</p>
              <p className="text-sm text-white/70">Best Score</p>
            </div>
            
            <div className="text-center">
              <Clock className="w-12 h-12 text-blue-400 mx-auto mb-2" />
              <p className="text-3xl font-bold">{Math.round(stats.totalPracticeTime / 60)}h</p>
              <p className="text-sm text-white/70">Practice Time</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-effect rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          
          {interviews.length > 0 ? (
                        <div className="space-y-4">
              {interviews.slice(0, 3).map((interview) => (
                <div key={interview._id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <p className="font-semibold">{interview.position} at {interview.company}</p>
                    <p className="text-sm text-white/70">
                      {new Date(interview.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-400">{interview.overallScore}%</p>
                    <p className="text-sm text-white/70">{interview.status}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/70">No activity yet. Start your first interview!</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;