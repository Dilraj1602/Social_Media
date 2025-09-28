import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Users, Heart, MessageCircle, TrendingUp, Search, RefreshCw } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import { apiService } from '../api';

const InfluencerList = () => {
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('followers');

  useEffect(() => {
    fetchInfluencers();
  }, [fetchInfluencers]);

  const fetchInfluencers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Fetching influencers from API...');
      
      const data = await apiService.getAllInfluencers({
        page: 1,
        limit: 50,
        sortBy: sortBy,
        order: 'desc'
      });
      
      if (data.success) {
        console.log('✅ Successfully fetched influencers:', data.data.length);
        setInfluencers(data.data);
      } else {
        console.error('❌ API returned error:', data);
        setError('Failed to load influencers. Please try again.');
      }
    } catch (error) {
      console.error('❌ Error fetching influencers:', error);
      console.error('❌ Error details:', error.message);
      setError(error.message || 'Failed to load influencers. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, [sortBy]);

  const filteredInfluencers = influencers.filter(influencer => {
    if (!influencer || !influencer.displayName || !influencer.username) {
      return false;
    }
    const matches = influencer.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.username.toLowerCase().includes(searchTerm.toLowerCase());
    if (searchTerm && matches) {
      console.log('🔍 Search match found:', influencer.displayName);
    }
    return matches;
  });

  const sortedInfluencers = [...filteredInfluencers].sort((a, b) => {
    if (!a || !b) return 0;
    
    switch (sortBy) {
      case 'followers':
        return (b.followers || 0) - (a.followers || 0);
      case 'engagement':
        return (b.engagementRate || 0) - (a.engagementRate || 0);
      case 'posts':
        return (b.posts || 0) - (a.posts || 0);
      default:
        return 0;
    }
  });

  console.log('📊 Current state:', { 
    loading, 
    totalInfluencers: influencers.length, 
    filteredInfluencers: filteredInfluencers.length,
    searchTerm,
    sortBy 
  });

  if (loading) {
    return <LoadingSpinner text="Loading influencers..." />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">⚠️</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Error Loading Influencers</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={fetchInfluencers}
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Instagram Influencers</h1>
        <p className="text-gray-400 text-lg">Discover and analyze top Instagram influencers</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search influencers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="followers">Sort by Followers</option>
            <option value="engagement">Sort by Engagement</option>
            <option value="posts">Sort by Posts</option>
          </select>
          <button
            onClick={fetchInfluencers}
            disabled={loading}
            className="px-4 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-600 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Influencers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedInfluencers.map((influencer) => {
          if (!influencer || !influencer._id || !influencer.username) {
            return null;
          }
          
          return (
            <Link
              key={influencer._id}
              to={`/influencer/${influencer.username}`}
              className="card card-hover group"
            >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={influencer.profilePicture || '/default-avatar.png'}
                alt={influencer.displayName || 'Influencer'}
                className="w-16 h-16 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/64x64/374151/ffffff?text=IMG';
                }}
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                  {influencer.displayName || 'Unknown'}
                </h3>
                <p className="text-gray-400">@{influencer.username || 'unknown'}</p>
                {influencer.isVerified && (
                  <span className="inline-flex items-center text-blue-400 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Verified
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Users className="w-4 h-4 text-primary-500 mr-1" />
                  <span className="text-sm text-gray-400">Followers</span>
                </div>
                <div className="text-lg font-bold text-white">
                  {(influencer.followers || 0).toLocaleString()}
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Heart className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-sm text-gray-400">Posts</span>
                </div>
                <div className="text-lg font-bold text-white">
                  {(influencer.posts || 0).toLocaleString()}
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <MessageCircle className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="text-sm text-gray-400">Engagement</span>
                </div>
                <div className="text-lg font-bold text-white">
                  {(influencer.engagementRate || 0).toFixed(1)}%
                </div>
              </div>
            </div>

            {influencer.bio && (
              <p className="text-gray-400 text-sm line-clamp-2">
                {influencer.bio}
              </p>
            )}

            <div className="mt-4 pt-4 border-t border-dark-700">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Category</span>
                <span className="text-sm text-primary-400 capitalize">
                  {influencer.category || 'Lifestyle'}
                </span>
              </div>
            </div>
          </Link>
          );
        })}
      </div>

      {sortedInfluencers.length === 0 && (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No influencers found</h3>
          <p className="text-gray-400">Try adjusting your search terms or filters.</p>
        </div>
      )}
    </div>
  );
};

export default InfluencerList;
