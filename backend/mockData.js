// Mock data for development when MongoDB is not available
const mockInfluencers = [
  {
    _id: 'mock_id_1',
    username: 'sophia_martinez',
    displayName: 'Sophia Martinez',
    profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Fashion & Lifestyle Blogger | NYC | Sustainable Fashion Advocate 🌿',
    followers: 450000,
    following: 1200,
    posts: 892,
    isVerified: true,
    isPrivate: false,
    engagementRate: 6.8,
    averageLikes: 18500,
    averageComments: 450,
    category: 'fashion',
    lastScraped: new Date(),
    isActive: true
  },
  {
    _id: 'mock_id_2',
    username: 'alex_chen',
    displayName: 'Alex Chen',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Tech Entrepreneur | AI Researcher | Coffee Enthusiast ☕',
    followers: 320000,
    following: 800,
    posts: 456,
    isVerified: true,
    isPrivate: false,
    engagementRate: 5.2,
    averageLikes: 12800,
    averageComments: 320,
    category: 'tech',
    lastScraped: new Date(),
    isActive: true
  },
  {
    _id: 'mock_id_3',
    username: 'emma_wilson',
    displayName: 'Emma Wilson',
    profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Travel Blogger | Adventure Seeker | Photographer 📸',
    followers: 680000,
    following: 1500,
    posts: 1234,
    isVerified: true,
    isPrivate: false,
    engagementRate: 7.5,
    averageLikes: 25600,
    averageComments: 680,
    category: 'travel',
    lastScraped: new Date(),
    isActive: true
  },
  {
    _id: 'mock_id_4',
    username: 'marcus_johnson',
    displayName: 'Marcus Johnson',
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    bio: 'Fitness Coach | Nutrition Expert | Motivational Speaker 💪',
    followers: 280000,
    following: 600,
    posts: 567,
    isVerified: true,
    isPrivate: false,
    engagementRate: 8.2,
    averageLikes: 15200,
    averageComments: 380,
    category: 'fitness',
    lastScraped: new Date(),
    isActive: true
  },
  {
    _id: 'mock_id_5',
    username: 'luna_rodriguez',
    displayName: 'Luna Rodriguez',
    profilePicture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    bio: 'Food Blogger | Chef | Recipe Creator 🍳',
    followers: 520000,
    following: 1100,
    posts: 789,
    isVerified: true,
    isPrivate: false,
    engagementRate: 6.1,
    averageLikes: 22100,
    averageComments: 520,
    category: 'food',
    lastScraped: new Date(),
    isActive: true
  },
  {
    _id: 'mock_id_6',
    username: 'david_kim',
    displayName: 'David Kim',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Music Producer | DJ | Sound Engineer 🎵',
    followers: 180000,
    following: 400,
    posts: 234,
    isVerified: false,
    isPrivate: false,
    engagementRate: 4.8,
    averageLikes: 8900,
    averageComments: 180,
    category: 'entertainment',
    lastScraped: new Date(),
    isActive: true
  },
  {
    _id: 'mock_id_7',
    username: 'zara_patel',
    displayName: 'Zara Patel',
    profilePicture: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    bio: 'Beauty Influencer | Makeup Artist | Skincare Expert 💄',
    followers: 750000,
    following: 2000,
    posts: 1456,
    isVerified: true,
    isPrivate: false,
    engagementRate: 9.2,
    averageLikes: 31200,
    averageComments: 750,
    category: 'beauty',
    lastScraped: new Date(),
    isActive: true
  },
  {
    _id: 'mock_id_8',
    username: 'james_miller',
    displayName: 'James Miller',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Business Coach | Entrepreneur | Investment Advisor 💼',
    followers: 150000,
    following: 300,
    posts: 189,
    isVerified: true,
    isPrivate: false,
    engagementRate: 3.5,
    averageLikes: 4200,
    averageComments: 150,
    category: 'business',
    lastScraped: new Date(),
    isActive: true
  },
  {
    _id: 'mock_id_9',
    username: 'maya_singh',
    displayName: 'Maya Singh',
    profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    bio: 'Yoga Instructor | Wellness Coach | Meditation Guide 🧘‍♀️',
    followers: 320000,
    following: 900,
    posts: 678,
    isVerified: true,
    isPrivate: false,
    engagementRate: 7.8,
    averageLikes: 18900,
    averageComments: 320,
    category: 'lifestyle',
    lastScraped: new Date(),
    isActive: true
  },
  {
    _id: 'mock_id_10',
    username: 'ryan_oconnor',
    displayName: 'Ryan O\'Connor',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Gaming Streamer | Esports Player | Tech Reviewer 🎮',
    followers: 420000,
    following: 1800,
    posts: 2345,
    isVerified: true,
    isPrivate: false,
    engagementRate: 5.9,
    averageLikes: 19800,
    averageComments: 420,
    category: 'entertainment',
    lastScraped: new Date(),
    isActive: true
  }
];

// Keep the original for backward compatibility
const mockInfluencer = mockInfluencers[0];

const mockPosts = [
  {
    _id: 'post_001',
    influencer: 'mock_id_1',
    postId: 'post_001',
    caption: 'Working on some exciting new features for our latest project! #coding #tech #innovation',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba30e2f74?w=400&h=400&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba30e2f74?w=200&h=200&fit=crop',
    likes: 5200,
    comments: 180,
    postDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
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
    _id: 'post_002',
    influencer: 'mock_id_1',
    postId: 'post_002',
    caption: 'Beautiful sunset from my office window today. Sometimes you need to step back and appreciate the view! 🌅',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
    likes: 3200,
    comments: 95,
    postDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
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
  }
];

const mockReels = [
  {
    _id: 'reel_001',
    influencer: 'mock_id_1',
    reelId: 'reel_001',
    caption: 'Quick coding tip: Always comment your code! It helps you and your team understand the logic later. #coding #tips',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&h=200&fit=crop',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    views: 15000,
    likes: 1200,
    comments: 85,
    shares: 45,
    duration: 30,
    postDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
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
  }
];

module.exports = {
  mockInfluencer,
  mockInfluencers,
  mockPosts,
  mockReels
};

