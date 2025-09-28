const Post = require('../models/Post');
const Influencer = require('../models/Influencer');

// Get posts by influencer
const getPostsByInfluencer = async (req, res) => {
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

    const posts = await Post.find({ influencer: influencer._id })
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Post.countDocuments({ influencer: influencer._id });

    res.json({
      success: true,
      count: posts.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get single post
const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    
    const post = await Post.findById(postId).populate('influencer', 'username displayName profilePicture');

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found',
      });
    }

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get posts by analysis criteria
const getPostsByAnalysis = async (req, res) => {
  try {
    const { username } = req.params;
    const { vibe, keywords, quality } = req.query;
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

    if (keywords) {
      const keywordArray = keywords.split(',');
      query['analysis.keywords'] = { $in: keywordArray };
    }

    if (quality) {
      query['analysis.quality.visualAppeal'] = { $gte: parseInt(quality) };
    }

    const posts = await Post.find(query)
      .sort({ postDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Post.countDocuments(query);

    res.json({
      success: true,
      count: posts.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get analytics for posts
const getPostAnalytics = async (req, res) => {
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

    const posts = await Post.find({ influencer: influencer._id });

    // Calculate analytics
    const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
    const totalComments = posts.reduce((sum, post) => sum + post.comments, 0);
    const averageLikes = posts.length > 0 ? Math.round(totalLikes / posts.length) : 0;
    const averageComments = posts.length > 0 ? Math.round(totalComments / posts.length) : 0;

    // Vibe distribution
    const vibeDistribution = {};
    posts.forEach(post => {
      if (post.analysis && post.analysis.vibe) {
        vibeDistribution[post.analysis.vibe] = (vibeDistribution[post.analysis.vibe] || 0) + 1;
      }
    });

    // Top keywords
    const keywordCount = {};
    posts.forEach(post => {
      if (post.analysis && post.analysis.keywords) {
        post.analysis.keywords.forEach(keyword => {
          keywordCount[keyword] = (keywordCount[keyword] || 0) + 1;
        });
      }
    });

    const topKeywords = Object.entries(keywordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([keyword, count]) => ({ keyword, count }));

    // Quality metrics
    const qualityMetrics = {
      excellent: 0,
      good: 0,
      average: 0,
      poor: 0,
    };

    posts.forEach(post => {
      if (post.analysis && post.analysis.quality && post.analysis.quality.lighting) {
        qualityMetrics[post.analysis.quality.lighting]++;
      }
    });

    res.json({
      success: true,
      data: {
        totalPosts: posts.length,
        totalLikes,
        totalComments,
        averageLikes,
        averageComments,
        vibeDistribution,
        topKeywords,
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
  getPostsByInfluencer,
  getPostById,
  getPostsByAnalysis,
  getPostAnalytics,
};


