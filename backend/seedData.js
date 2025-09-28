const mongoose = require('mongoose');
const Influencer = require('./models/Influencer');
const Post = require('./models/Post');
const Reel = require('./models/Reel');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/instagram_influencer', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Influencer.deleteMany({});
    await Post.deleteMany({});
    await Reel.deleteMany({});

    // Create dummy influencer
    const influencer = new Influencer({
      username: 'ralphedwards',
      displayName: 'Ralph Edwards',
      profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'Software developer at Microsoft. Passionate about technology and innovation.',
      followers: 125000,
      following: 850,
      posts: 342,
      isVerified: true,
      isPrivate: false,
      engagementRate: 4.2,
      averageLikes: 5200,
      averageComments: 180,
      category: 'tech',
      lastScraped: new Date(),
      isActive: true
    });

    await influencer.save();
    console.log('✅ Influencer created:', influencer.displayName);

    // Create dummy posts
    const posts = [
      {
        influencer: influencer._id,
        postId: 'post_001',
        caption: 'Working on some exciting new features for our latest project! #coding #tech #innovation',
        imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba30e2f74?w=400&h=400&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba30e2f74?w=200&h=200&fit=crop',
        likes: 5200,
        comments: 180,
        postDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        postType: 'image',
        hashtags: ['coding', 'tech', 'innovation'],
        mentions: [],
        analysis: {
          keywords: ['technology', 'programming', 'development'],
          vibe: 'professional',
          quality: {
            lighting: 'good',
            visualAppeal: 8,
            consistency: 9
          },
          objects: ['computer', 'code'],
          colors: ['blue', 'white']
        },
        isProcessed: true
      },
      {
        influencer: influencer._id,
        postId: 'post_002',
        caption: 'Beautiful sunset from my office window today. Sometimes you need to step back and appreciate the view! 🌅',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
        likes: 3200,
        comments: 95,
        postDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        postType: 'image',
        hashtags: ['sunset', 'nature', 'motivation'],
        mentions: [],
        analysis: {
          keywords: ['nature', 'sunset', 'motivation'],
          vibe: 'aesthetic',
          quality: {
            lighting: 'excellent',
            visualAppeal: 9,
            consistency: 7
          },
          objects: ['sunset', 'window'],
          colors: ['orange', 'blue', 'purple']
        },
        isProcessed: true
      },
      {
        influencer: influencer._id,
        postId: 'post_003',
        caption: 'Team lunch at the new restaurant downtown. Great food and even better company! 🍽️',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=400&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&h=200&fit=crop',
        likes: 2800,
        comments: 120,
        postDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        postType: 'image',
        hashtags: ['food', 'team', 'restaurant'],
        mentions: [],
        analysis: {
          keywords: ['food', 'team', 'restaurant'],
          vibe: 'casual',
          quality: {
            lighting: 'good',
            visualAppeal: 7,
            consistency: 8
          },
          objects: ['food', 'people'],
          colors: ['brown', 'white', 'green']
        },
        isProcessed: true
      }
    ];

    for (const postData of posts) {
      const post = new Post(postData);
      await post.save();
    }
    console.log('✅ Posts created:', posts.length);

    // Create dummy reels
    const reels = [
      {
        influencer: influencer._id,
        reelId: 'reel_001',
        caption: 'Quick coding tip: Always comment your code! It helps you and your team understand the logic later. #coding #tips',
        thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&h=200&fit=crop',
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        views: 15000,
        likes: 1200,
        comments: 85,
        shares: 45,
        duration: 30,
        postDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        hashtags: ['coding', 'tips', 'programming'],
        mentions: [],
        analysis: {
          events: ['coding', 'tutorial'],
          objects: ['computer', 'code'],
          vibe: 'educational',
          tags: ['programming', 'tutorial', 'coding'],
          quality: {
            videoQuality: 'good',
            audioQuality: 'good',
            editing: 'basic'
          },
          music: {
            hasMusic: true,
            musicGenre: 'ambient'
          }
        },
        isProcessed: true
      },
      {
        influencer: influencer._id,
        reelId: 'reel_002',
        caption: 'Morning workout routine! Start your day with energy 💪 #fitness #motivation #morning',
        thumbnailUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop',
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
        views: 25000,
        likes: 2100,
        comments: 150,
        shares: 80,
        duration: 45,
        postDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        hashtags: ['fitness', 'motivation', 'morning'],
        mentions: [],
        analysis: {
          events: ['workout', 'exercise'],
          objects: ['person', 'gym'],
          vibe: 'energetic',
          tags: ['fitness', 'workout', 'motivation'],
          quality: {
            videoQuality: 'good',
            audioQuality: 'excellent',
            editing: 'good'
          },
          music: {
            hasMusic: true,
            musicGenre: 'upbeat'
          }
        },
        isProcessed: true
      }
    ];

    for (const reelData of reels) {
      const reel = new Reel(reelData);
      await reel.save();
    }
    console.log('✅ Reels created:', reels.length);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  seedData();
}

module.exports = seedData;


