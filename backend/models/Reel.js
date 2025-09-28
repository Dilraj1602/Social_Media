const mongoose = require('mongoose');

const ReelSchema = new mongoose.Schema({
  influencer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Influencer',
    required: true,
  },
  reelId: {
    type: String,
    required: true,
    unique: true,
  },
  caption: {
    type: String,
    default: '',
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
  shares: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number, // in seconds
    default: 0,
  },
  postDate: {
    type: Date,
    required: true,
  },
  hashtags: [{
    type: String,
  }],
  mentions: [{
    type: String,
  }],
  // AI-generated analysis
  analysis: {
    events: [{
      type: String,
    }],
    objects: [{
      type: String,
    }],
    vibe: {
      type: String,
      enum: ['party', 'daily life', 'travel luxury', 'casual', 'energetic', 'calm', 'dramatic', 'funny', 'educational', 'inspirational'],
    },
    tags: [{
      type: String,
    }],
    quality: {
      videoQuality: {
        type: String,
        enum: ['excellent', 'good', 'average', 'poor'],
      },
      audioQuality: {
        type: String,
        enum: ['excellent', 'good', 'average', 'poor'],
      },
      editing: {
        type: String,
        enum: ['professional', 'good', 'basic', 'minimal'],
      },
    },
    music: {
      hasMusic: {
        type: Boolean,
        default: false,
      },
      musicGenre: {
        type: String,
      },
    },
  },
  isProcessed: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Indexes for better query performance
ReelSchema.index({ influencer: 1, postDate: -1 });
ReelSchema.index({ reelId: 1 });
ReelSchema.index({ views: -1 });
ReelSchema.index({ postDate: -1 });

module.exports = mongoose.model('Reel', ReelSchema);


