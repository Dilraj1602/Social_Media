const mongoose = require('mongoose');

const InfluencerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: '',
  },
  followers: {
    type: Number,
    default: 0,
  },
  following: {
    type: Number,
    default: 0,
  },
  posts: {
    type: Number,
    default: 0,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  engagementRate: {
    type: Number,
    default: 0,
  },
  averageLikes: {
    type: Number,
    default: 0,
  },
  averageComments: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    enum: ['lifestyle', 'fashion', 'food', 'travel', 'fitness', 'beauty', 'tech', 'business', 'entertainment', 'other'],
    default: 'other',
  },
  lastScraped: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Index for better query performance
InfluencerSchema.index({ username: 1 });
InfluencerSchema.index({ followers: -1 });
InfluencerSchema.index({ engagementRate: -1 });

module.exports = mongoose.model('Influencer', InfluencerSchema);


