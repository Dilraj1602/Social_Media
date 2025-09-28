const Influencer = require('../models/Influencer');
const Post = require('../models/Post');
const Reel = require('../models/Reel');
const { mockInfluencer, mockInfluencers, mockPosts, mockReels } = require('../mockData');

// Get all influencers
const getAllInfluencers = async (req, res) => {
  const startTime = Date.now();
  try {
    const { page = 1, limit = 10, sortBy = 'followers', order = 'desc' } = req.query;
    
    // Try to get from database, fallback to mock data
    let influencers;
    let total;
    
    // Always use mock data for now
    console.log(`📊 API Request: GET /api/influencers - Page: ${page}, Limit: ${limit}, Sort: ${sortBy}, Order: ${order}`);
    influencers = [...mockInfluencers]; // Create a copy to avoid mutating original
    total = mockInfluencers.length;
    
    // Apply sorting
    influencers.sort((a, b) => {
      const aValue = a[sortBy] || 0;
      const bValue = b[sortBy] || 0;
      
      if (order === 'desc') {
        return bValue - aValue;
      } else {
        return aValue - bValue;
      }
    });
    
    // Apply pagination to mock data
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedInfluencers = influencers.slice(startIndex, endIndex);

    // Set cache headers for better performance
    res.set({
      'Cache-Control': 'public, max-age=300', // 5 minutes cache
      'ETag': `"influencers-${Date.now()}"`
    });

    const responseTime = Date.now() - startTime;
    console.log(`✅ API Response: ${responseTime}ms - Returned ${paginatedInfluencers.length} influencers`);

    res.json({
      success: true,
      count: paginatedInfluencers.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: paginatedInfluencers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get single influencer by username
const getInfluencerByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    
    let influencer;
    
    // Always use mock data for now
    console.log('Using mock data for influencer lookup');
    influencer = mockInfluencers.find(inf => inf.username.toLowerCase() === username.toLowerCase());

    if (!influencer) {
      return res.status(404).json({
        success: false,
        error: 'Influencer not found',
      });
    }

    res.json({
      success: true,
      data: influencer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get influencer with posts and reels
const getInfluencerProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const { postsLimit = 10, reelsLimit = 5 } = req.query;
    
    let influencer, posts, reels;
    
    // Always use mock data for now
    console.log('Using mock data for influencer profile');
    influencer = mockInfluencers.find(inf => inf.username.toLowerCase() === username.toLowerCase());
    if (!influencer) {
      return res.status(404).json({
        success: false,
        error: 'Influencer not found',
      });
    }
    // Use the same mock posts and reels for all influencers for now
    posts = mockPosts;
    reels = mockReels;

    // Calculate analytics
    const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
    const totalComments = posts.reduce((sum, post) => sum + post.comments, 0);
    const totalViews = reels.reduce((sum, reel) => sum + reel.views, 0);

    const analytics = {
      totalLikes,
      totalComments,
      totalViews,
      averageLikes: posts.length > 0 ? Math.round(totalLikes / posts.length) : 0,
      averageComments: posts.length > 0 ? Math.round(totalComments / posts.length) : 0,
      averageViews: reels.length > 0 ? Math.round(totalViews / reels.length) : 0,
      engagementRate: influencer.engagementRate,
    };

    res.json({
      success: true,
      data: {
        influencer,
        posts,
        reels,
        analytics,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Create new influencer
const createInfluencer = async (req, res) => {
  try {
    const influencer = await Influencer.create(req.body);
    
    res.status(201).json({
      success: true,
      data: influencer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Update influencer
const updateInfluencer = async (req, res) => {
  try {
    const { username } = req.params;
    
    const influencer = await Influencer.findOneAndUpdate(
      { username: username.toLowerCase() },
      req.body,
      { new: true, runValidators: true }
    );

    if (!influencer) {
      return res.status(404).json({
        success: false,
        error: 'Influencer not found',
      });
    }

    res.json({
      success: true,
      data: influencer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete influencer
const deleteInfluencer = async (req, res) => {
  try {
    const { username } = req.params;
    
    const influencer = await Influencer.findOneAndUpdate(
      { username: username.toLowerCase() },
      { isActive: false },
      { new: true }
    );

    if (!influencer) {
      return res.status(404).json({
        success: false,
        error: 'Influencer not found',
      });
    }

    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getAllInfluencers,
  getInfluencerByUsername,
  getInfluencerProfile,
  createInfluencer,
  updateInfluencer,
  deleteInfluencer,
};

