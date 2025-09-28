const Reel = require('../models/Reel');
const Influencer = require('../models/Influencer');

// Get reels by influencer
const getReelsByInfluencer = async (req, res) => {
  try {
    const { username } = req.params;
    const { page = 1, limit = 10, sortBy = 'postDate', order = 'desc' } = req.query;
    
    const influencer = await Influencer.findOne({ 
      username: username.toLowerCase(),
      isActive: true 
    });

    if (!influencer) {
      return res.status(404).json({
        success: false,
        error: 'Influencer not found',
      });
    }

    const sortOptions = {};
    sortOptions[sortBy] = order === 'desc' ? -1 : 1;

    const reels = await Reel.find({ influencer: influencer._id })
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Reel.countDocuments({ influencer: influencer._id });

    res.json({
      success: true,
      count: reels.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: reels,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get single reel
const getReelById = async (req, res) => {
  try {
    const { reelId } = req.params;
    
    const reel = await Reel.findById(reelId).populate('influencer', 'username displayName profilePicture');

    if (!reel) {
      return res.status(404).json({
        success: false,
        error: 'Reel not found',
      });
    }

    res.json({
      success: true,
      data: reel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get reels by analysis criteria
const getReelsByAnalysis = async (req, res) => {
  try {
    const { username } = req.params;
    const { vibe, events, tags } = req.query;
    const { page = 1, limit = 10 } = req.query;
    
    const influencer = await Influencer.findOne({ 
      username: username.toLowerCase(),
      isActive: true 
    });

    if (!influencer) {
      return res.status(404).json({
        success: false,
        error: 'Influencer not found',
      });
    }

    let query = { influencer: influencer._id };

    if (vibe) {
      query['analysis.vibe'] = vibe;
    }

    if (events) {
      const eventArray = events.split(',');
      query['analysis.events'] = { $in: eventArray };
    }

    if (tags) {
      const tagArray = tags.split(',');
      query['analysis.tags'] = { $in: tagArray };
    }

    const reels = await Reel.find(query)
      .sort({ postDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Reel.countDocuments(query);

    res.json({
      success: true,
      count: reels.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: reels,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get analytics for reels
const getReelAnalytics = async (req, res) => {
  try {
    const { username } = req.params;
    
    const influencer = await Influencer.findOne({ 
      username: username.toLowerCase(),
      isActive: true 
    });

    if (!influencer) {
      return res.status(404).json({
        success: false,
        error: 'Influencer not found',
      });
    }

    const reels = await Reel.find({ influencer: influencer._id });

    // Calculate analytics
    const totalViews = reels.reduce((sum, reel) => sum + reel.views, 0);
    const totalLikes = reels.reduce((sum, reel) => sum + reel.likes, 0);
    const totalComments = reels.reduce((sum, reel) => sum + reel.comments, 0);
    const totalShares = reels.reduce((sum, reel) => sum + reel.shares, 0);
    
    const averageViews = reels.length > 0 ? Math.round(totalViews / reels.length) : 0;
    const averageLikes = reels.length > 0 ? Math.round(totalLikes / reels.length) : 0;
    const averageComments = reels.length > 0 ? Math.round(totalComments / reels.length) : 0;
    const averageShares = reels.length > 0 ? Math.round(totalShares / reels.length) : 0;

    // Vibe distribution
    const vibeDistribution = {};
    reels.forEach(reel => {
      if (reel.analysis && reel.analysis.vibe) {
        vibeDistribution[reel.analysis.vibe] = (vibeDistribution[reel.analysis.vibe] || 0) + 1;
      }
    });

    // Top events
    const eventCount = {};
    reels.forEach(reel => {
      if (reel.analysis && reel.analysis.events) {
        reel.analysis.events.forEach(event => {
          eventCount[event] = (eventCount[event] || 0) + 1;
        });
      }
    });

    const topEvents = Object.entries(eventCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([event, count]) => ({ event, count }));

    // Top tags
    const tagCount = {};
    reels.forEach(reel => {
      if (reel.analysis && reel.analysis.tags) {
        reel.analysis.tags.forEach(tag => {
          tagCount[tag] = (tagCount[tag] || 0) + 1;
        });
      }
    });

    const topTags = Object.entries(tagCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }));

    // Quality metrics
    const qualityMetrics = {
      videoQuality: { excellent: 0, good: 0, average: 0, poor: 0 },
      audioQuality: { excellent: 0, good: 0, average: 0, poor: 0 },
      editing: { professional: 0, good: 0, basic: 0, minimal: 0 },
    };

    reels.forEach(reel => {
      if (reel.analysis && reel.analysis.quality) {
        if (reel.analysis.quality.videoQuality) {
          qualityMetrics.videoQuality[reel.analysis.quality.videoQuality]++;
        }
        if (reel.analysis.quality.audioQuality) {
          qualityMetrics.audioQuality[reel.analysis.quality.audioQuality]++;
        }
        if (reel.analysis.quality.editing) {
          qualityMetrics.editing[reel.analysis.quality.editing]++;
        }
      }
    });

    res.json({
      success: true,
      data: {
        totalReels: reels.length,
        totalViews,
        totalLikes,
        totalComments,
        totalShares,
        averageViews,
        averageLikes,
        averageComments,
        averageShares,
        vibeDistribution,
        topEvents,
        topTags,
        qualityMetrics,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getReelsByInfluencer,
  getReelById,
  getReelsByAnalysis,
  getReelAnalytics,
};


