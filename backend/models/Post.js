const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  influencer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Influencer',
    required: true,
  },
  postId: {
    type: String,
    required: true,
    unique: true,
  },
  caption: {
    type: String,
    default: '',
  },
  imageUrl: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
  postDate: {
    type: Date,
    required: true,
  },
  postType: {
    type: String,
    enum: ['image', 'carousel', 'video'],
    default: 'image',
  },
  hashtags: [{
    type: String,
  }],
  mentions: [{
    type: String,
  }],
  // AI-generated analysis
  analysis: {
    keywords: [{
      type: String,
    }],
    vibe: {
      type: String,
      enum: ['casual', 'aesthetic', 'travel', 'luxury', 'fashion', 'energetic', 'minimalist', 'vintage', 'modern', 'outdoor'],
    },
    quality: {
      lighting: {
        type: String,
        enum: ['excellent', 'good', 'average', 'poor'],
      },
      visualAppeal: {
        type: Number,
        min: 1,
        max: 10,
      },
      consistency: {
        type: Number,
        min: 1,
        max: 10,
      },
    },
    objects: [{
      type: String,
    }],
    colors: [{
      type: String,
    }],
  },
  isProcessed: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Indexes for better query performance
PostSchema.index({ influencer: 1, postDate: -1 });
PostSchema.index({ postId: 1 });
PostSchema.index({ likes: -1 });
PostSchema.index({ postDate: -1 });

module.exports = mongoose.model('Post', PostSchema);


