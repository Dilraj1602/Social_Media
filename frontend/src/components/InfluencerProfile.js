import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Users, 
  Heart, 
  MessageCircle, 
  Phone, 
  Mail, 
  TrendingUp,
  Star,
  Shield
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import LoadingSpinner from './LoadingSpinner';
import PostGrid from './PostGrid';
import ReelGrid from './ReelGrid';
import { apiService } from '../api';

const InfluencerProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [reels, setReels] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const fetchProfileData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Fetching profile data for:', username);
      
      const data = await apiService.getInfluencerProfile(username, {
        postsLimit: 10,
        reelsLimit: 5
      });
      
      if (data.success) {
        console.log('✅ Successfully fetched profile data');
        setProfile(data.data.influencer);
        setPosts(data.data.posts || []);
        setReels(data.data.reels || []);
        setAnalytics(data.data.analytics);
      } else {
        console.error('❌ API returned error:', data);
        setError('Failed to load profile data. Please try again.');
      }
    } catch (error) {
      console.error('❌ Error fetching profile:', error);
      setError(error.message || 'Failed to load profile. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">⚠️</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Error Loading Profile</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={fetchProfileData}
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-4">Influencer not found</h2>
        <p className="text-gray-400">The requested influencer profile could not be found.</p>
      </div>
    );
  }

  // Mock data for demonstration (matching the design)
  const mockAnalytics = {
    sentimentScore: 85,
    extrovertLevel: 'Mid',
    socialTopicsCognizant: 8.2,
    religiousHateSpeech: 'Low Risk',
    fairPlayRating: 8.0,
    personality: {
      adventure: 77,
      extrovert: 40,
      sportive: 84,
      attentive: 57
    },
    interests: [
      { name: 'SOCIAL', percentage: 16 },
      { name: 'TRAVEL', percentage: 64 },
      { name: 'ADVENTURE', percentage: 64 },
      { name: 'MOVIES', percentage: 23 },
      { name: 'SWIMMING', percentage: 80 },
      { name: 'GAMING', percentage: 80 }
    ]
  };

  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="text-sm text-gray-400 mb-2">
          SPAIN • 23 YEARS OLD • SINGLE
        </div>
        <h1 className="text-4xl font-bold text-white mb-6">{profile.displayName}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Main Profile */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="card">
            <div className="flex items-start space-x-6">
              <img 
                src={profile.profilePicture} 
                alt={profile.displayName}
                className="w-24 h-24 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-4">{profile.displayName}</h2>
                
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">SENTIMENT SCORE</div>
                      <div className="text-lg font-bold text-white">{mockAnalytics.sentimentScore}%</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">EXTROVERT LEVEL</div>
                      <div className="text-lg font-bold text-white">{mockAnalytics.extrovertLevel}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">SOCIAL TOPICS COGNIZANT</div>
                      <div className="text-lg font-bold text-white">{mockAnalytics.socialTopicsCognizant}/10</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">RELIGIOUS OR HATE SPEECH</div>
                      <div className="text-lg font-bold text-white">{mockAnalytics.religiousHateSpeech}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">FAIR PLAY RATING</div>
                      <div className="text-lg font-bold text-white">{mockAnalytics.fairPlayRating}/10</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personality Traits */}
          <div className="card">
            <h3 className="text-xl font-bold text-white mb-6">PERSONALITY</h3>
            <div className="space-y-4">
              {Object.entries(mockAnalytics.personality).map(([trait, percentage]) => (
                <div key={trait} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300 capitalize">{trait}</span>
                    <span className="text-white font-medium">{percentage}%</span>
                  </div>
                  <div className="w-full bg-dark-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Occupation & Contact */}
        <div className="space-y-6">
          {/* Occupation Card */}
          <div className="card">
            <h3 className="text-xl font-bold text-white mb-4">OCCUPATION</h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-400">Job position:</span>
                <span className="text-white ml-2">Software developer</span>
              </div>
              <div>
                <span className="text-gray-400">Company:</span>
                <span className="text-white ml-2">Microsoft</span>
              </div>
              <div>
                <span className="text-gray-400">Annual Income:</span>
                <span className="text-white ml-2">$100k</span>
              </div>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="space-y-4">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </button>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>Send Email</span>
            </button>
          </div>

          {/* Interests */}
          <div className="card">
            <h3 className="text-xl font-bold text-white mb-6">INTERESTS</h3>
            <div className="grid grid-cols-2 gap-4">
              {mockAnalytics.interests.map((interest, index) => (
                <div key={interest.name} className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm"
                    style={{ 
                      backgroundColor: COLORS[index % COLORS.length],
                      transform: `scale(${interest.percentage / 100})`
                    }}
                  >
                    {interest.percentage}%
                  </div>
                  <div className="text-xs text-gray-400">{interest.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex space-x-1 bg-dark-800 p-1 rounded-lg mb-8">
          {['overview', 'posts', 'reels', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-md font-medium transition-colors duration-200 capitalize ${
                activeTab === tab
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <Users className="w-8 h-8 text-primary-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">{profile.followers?.toLocaleString()}</div>
              <div className="text-gray-400">Followers</div>
            </div>
            <div className="card text-center">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">{analytics?.averageLikes?.toLocaleString()}</div>
              <div className="text-gray-400">Avg Likes</div>
            </div>
            <div className="card text-center">
              <MessageCircle className="w-8 h-8 text-blue-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">{analytics?.averageComments?.toLocaleString()}</div>
              <div className="text-gray-400">Avg Comments</div>
            </div>
          </div>
        )}

        {activeTab === 'posts' && <PostGrid posts={posts} />}
        {activeTab === 'reels' && <ReelGrid reels={reels} />}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="card">
              <h3 className="text-xl font-bold text-white mb-6">Engagement Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { month: 'Jan', likes: 1200, comments: 300 },
                    { month: 'Feb', likes: 1500, comments: 400 },
                    { month: 'Mar', likes: 1800, comments: 500 },
                    { month: 'Apr', likes: 2000, comments: 600 },
                    { month: 'May', likes: 2200, comments: 700 },
                    { month: 'Jun', likes: 2500, comments: 800 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="likes" fill="#10b981" />
                    <Bar dataKey="comments" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfluencerProfile;