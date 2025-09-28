const mongoose = require('mongoose');
const Influencer = require('./models/Influencer');
const Post = require('./models/Post');
const Reel = require('./models/Reel');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://sittu:hellosity@cluster0.hr3c7.mongodb.net/influencer', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

// 10 Diverse Influencers with detailed profiles
const influencersData = [
  {
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

// Sample posts for each influencer
const generatePosts = (influencerId, influencerCategory, influencerName) => {
  const postsByCategory = {
    fashion: [
      {
        caption: 'OOTD: Sustainable fashion never looked so good! 🌿✨ #sustainablefashion #ootd #fashion',
        imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
        likes: Math.floor(Math.random() * 20000) + 10000,
        comments: Math.floor(Math.random() * 500) + 200,
        hashtags: ['sustainablefashion', 'ootd', 'fashion', 'style'],
        analysis: {
          keywords: ['fashion', 'sustainable', 'style', 'outfit'],
          vibe: 'aesthetic',
          quality: { lighting: 'excellent', visualAppeal: 9, consistency: 8 },
          objects: ['person', 'clothing', 'accessories'],
          colors: ['neutral', 'earth tones']
        }
      },
      {
        caption: 'Behind the scenes of my latest photoshoot! 📸 #photoshoot #fashion #behindthescenes',
        imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop',
        likes: Math.floor(Math.random() * 15000) + 8000,
        comments: Math.floor(Math.random() * 300) + 150,
        hashtags: ['photoshoot', 'fashion', 'behindthescenes', 'modeling'],
        analysis: {
          keywords: ['photoshoot', 'fashion', 'modeling', 'professional'],
          vibe: 'professional',
          quality: { lighting: 'good', visualAppeal: 8, consistency: 9 },
          objects: ['camera', 'person', 'studio'],
          colors: ['white', 'black', 'gray']
        }
      }
    ],
    tech: [
      {
        caption: 'Just launched our new AI-powered app! The future is here 🚀 #AI #tech #innovation',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop',
        likes: Math.floor(Math.random() * 12000) + 6000,
        comments: Math.floor(Math.random() * 400) + 200,
        hashtags: ['AI', 'tech', 'innovation', 'startup'],
        analysis: {
          keywords: ['technology', 'AI', 'innovation', 'startup'],
          vibe: 'professional',
          quality: { lighting: 'good', visualAppeal: 7, consistency: 8 },
          objects: ['computer', 'code', 'screen'],
          colors: ['blue', 'white', 'gray']
        }
      },
      {
        caption: 'Coffee and code - the perfect combination ☕💻 #coding #developer #coffee',
        imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop',
        likes: Math.floor(Math.random() * 8000) + 4000,
        comments: Math.floor(Math.random() * 200) + 100,
        hashtags: ['coding', 'developer', 'coffee', 'programming'],
        analysis: {
          keywords: ['coding', 'coffee', 'programming', 'developer'],
          vibe: 'casual',
          quality: { lighting: 'good', visualAppeal: 6, consistency: 7 },
          objects: ['coffee', 'computer', 'keyboard'],
          colors: ['brown', 'black', 'white']
        }
      }
    ],
    travel: [
      {
        caption: 'Sunset in Santorini - this view never gets old 🌅 #santorini #travel #sunset',
        imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=400&fit=crop',
        likes: Math.floor(Math.random() * 25000) + 15000,
        comments: Math.floor(Math.random() * 600) + 300,
        hashtags: ['santorini', 'travel', 'sunset', 'greece'],
        analysis: {
          keywords: ['travel', 'sunset', 'santorini', 'beautiful'],
          vibe: 'aesthetic',
          quality: { lighting: 'excellent', visualAppeal: 10, consistency: 9 },
          objects: ['sunset', 'ocean', 'architecture'],
          colors: ['orange', 'pink', 'blue']
        }
      },
      {
        caption: 'Lost in the streets of Tokyo 🏮 #tokyo #japan #travel #wanderlust',
        imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=400&fit=crop',
        likes: Math.floor(Math.random() * 20000) + 12000,
        comments: Math.floor(Math.random() * 500) + 250,
        hashtags: ['tokyo', 'japan', 'travel', 'wanderlust'],
        analysis: {
          keywords: ['travel', 'tokyo', 'japan', 'culture'],
          vibe: 'energetic',
          quality: { lighting: 'good', visualAppeal: 8, consistency: 7 },
          objects: ['city', 'lights', 'people'],
          colors: ['red', 'yellow', 'blue']
        }
      }
    ],
    fitness: [
      {
        caption: 'Morning workout complete! Start your day with energy 💪 #fitness #workout #motivation',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
        likes: Math.floor(Math.random() * 15000) + 8000,
        comments: Math.floor(Math.random() * 400) + 200,
        hashtags: ['fitness', 'workout', 'motivation', 'health'],
        analysis: {
          keywords: ['fitness', 'workout', 'motivation', 'health'],
          vibe: 'energetic',
          quality: { lighting: 'good', visualAppeal: 7, consistency: 8 },
          objects: ['person', 'gym', 'equipment'],
          colors: ['blue', 'gray', 'white']
        }
      },
      {
        caption: 'Healthy meal prep for the week! Nutrition is key 🥗 #mealprep #nutrition #healthy',
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop',
        likes: Math.floor(Math.random() * 10000) + 5000,
        comments: Math.floor(Math.random() * 300) + 150,
        hashtags: ['mealprep', 'nutrition', 'healthy', 'food'],
        analysis: {
          keywords: ['nutrition', 'healthy', 'mealprep', 'food'],
          vibe: 'casual',
          quality: { lighting: 'good', visualAppeal: 6, consistency: 7 },
          objects: ['food', 'containers', 'vegetables'],
          colors: ['green', 'white', 'brown']
        }
      }
    ],
    food: [
      {
        caption: 'Homemade pasta from scratch! Nothing beats fresh ingredients 🍝 #pasta #homemade #cooking',
        imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=400&fit=crop',
        likes: Math.floor(Math.random() * 18000) + 10000,
        comments: Math.floor(Math.random() * 500) + 250,
        hashtags: ['pasta', 'homemade', 'cooking', 'food'],
        analysis: {
          keywords: ['food', 'cooking', 'pasta', 'homemade'],
          vibe: 'casual',
          quality: { lighting: 'good', visualAppeal: 8, consistency: 7 },
          objects: ['food', 'pasta', 'kitchen'],
          colors: ['yellow', 'white', 'brown']
        }
      },
      {
        caption: 'Dessert time! This chocolate cake is pure heaven 🍰 #dessert #chocolate #baking',
        imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
        likes: Math.floor(Math.random() * 12000) + 6000,
        comments: Math.floor(Math.random() * 400) + 200,
        hashtags: ['dessert', 'chocolate', 'baking', 'sweet'],
        analysis: {
          keywords: ['dessert', 'chocolate', 'baking', 'sweet'],
          vibe: 'aesthetic',
          quality: { lighting: 'excellent', visualAppeal: 9, consistency: 8 },
          objects: ['cake', 'chocolate', 'plate'],
          colors: ['brown', 'white', 'gold']
        }
      }
    ],
    entertainment: [
      {
        caption: 'New track dropping soon! Can\'t wait to share this with you 🎵 #music #newmusic #producer',
        imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        likes: Math.floor(Math.random() * 8000) + 4000,
        comments: Math.floor(Math.random() * 200) + 100,
        hashtags: ['music', 'newmusic', 'producer', 'sound'],
        analysis: {
          keywords: ['music', 'producer', 'sound', 'studio'],
          vibe: 'energetic',
          quality: { lighting: 'good', visualAppeal: 6, consistency: 7 },
          objects: ['studio', 'equipment', 'microphone'],
          colors: ['black', 'gray', 'blue']
        }
      },
      {
        caption: 'Epic gaming session last night! This new game is incredible 🎮 #gaming #esports #streaming',
        imageUrl: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=400&fit=crop',
        likes: Math.floor(Math.random() * 12000) + 6000,
        comments: Math.floor(Math.random() * 300) + 150,
        hashtags: ['gaming', 'esports', 'streaming', 'fun'],
        analysis: {
          keywords: ['gaming', 'esports', 'streaming', 'entertainment'],
          vibe: 'energetic',
          quality: { lighting: 'good', visualAppeal: 7, consistency: 6 },
          objects: ['computer', 'screen', 'controller'],
          colors: ['blue', 'purple', 'black']
        }
      }
    ],
    beauty: [
      {
        caption: 'Glowing skin routine that actually works! ✨ #skincare #beauty #glowingskin',
        imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
        likes: Math.floor(Math.random() * 25000) + 15000,
        comments: Math.floor(Math.random() * 600) + 300,
        hashtags: ['skincare', 'beauty', 'glowingskin', 'routine'],
        analysis: {
          keywords: ['skincare', 'beauty', 'routine', 'glow'],
          vibe: 'aesthetic',
          quality: { lighting: 'excellent', visualAppeal: 9, consistency: 8 },
          objects: ['skincare', 'products', 'person'],
          colors: ['pink', 'white', 'gold']
        }
      },
      {
        caption: 'Tutorial: How to achieve the perfect winged eyeliner 👁️ #makeup #tutorial #eyeliner',
        imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
        likes: Math.floor(Math.random() * 20000) + 12000,
        comments: Math.floor(Math.random() * 500) + 250,
        hashtags: ['makeup', 'tutorial', 'eyeliner', 'beauty'],
        analysis: {
          keywords: ['makeup', 'tutorial', 'eyeliner', 'beauty'],
          vibe: 'professional',
          quality: { lighting: 'excellent', visualAppeal: 8, consistency: 9 },
          objects: ['makeup', 'brush', 'person'],
          colors: ['black', 'white', 'pink']
        }
      }
    ],
    business: [
      {
        caption: '5 business lessons I learned in 2024 💼 #business #entrepreneur #lessons',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        likes: Math.floor(Math.random() * 4000) + 2000,
        comments: Math.floor(Math.random() * 150) + 75,
        hashtags: ['business', 'entrepreneur', 'lessons', 'success'],
        analysis: {
          keywords: ['business', 'entrepreneur', 'lessons', 'success'],
          vibe: 'professional',
          quality: { lighting: 'good', visualAppeal: 6, consistency: 8 },
          objects: ['person', 'office', 'computer'],
          colors: ['blue', 'white', 'gray']
        }
      },
      {
        caption: 'Networking event last night - met some amazing people! 🤝 #networking #business #connections',
        imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=400&fit=crop',
        likes: Math.floor(Math.random() * 3000) + 1500,
        comments: Math.floor(Math.random() * 100) + 50,
        hashtags: ['networking', 'business', 'connections', 'event'],
        analysis: {
          keywords: ['networking', 'business', 'connections', 'event'],
          vibe: 'professional',
          quality: { lighting: 'good', visualAppeal: 5, consistency: 6 },
          objects: ['people', 'event', 'venue'],
          colors: ['black', 'white', 'gray']
        }
      }
    ],
    lifestyle: [
      {
        caption: 'Morning meditation session - finding peace in chaos 🧘‍♀️ #meditation #wellness #mindfulness',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
        likes: Math.floor(Math.random() * 15000) + 8000,
        comments: Math.floor(Math.random() * 400) + 200,
        hashtags: ['meditation', 'wellness', 'mindfulness', 'peace'],
        analysis: {
          keywords: ['meditation', 'wellness', 'mindfulness', 'peace'],
          vibe: 'calm',
          quality: { lighting: 'excellent', visualAppeal: 8, consistency: 7 },
          objects: ['person', 'nature', 'peaceful'],
          colors: ['green', 'blue', 'white']
        }
      },
      {
        caption: 'Yoga flow that changed my day 🌸 #yoga #wellness #selfcare',
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
        likes: Math.floor(Math.random() * 12000) + 6000,
        comments: Math.floor(Math.random() * 300) + 150,
        hashtags: ['yoga', 'wellness', 'selfcare', 'flow'],
        analysis: {
          keywords: ['yoga', 'wellness', 'selfcare', 'flow'],
          vibe: 'calm',
          quality: { lighting: 'good', visualAppeal: 7, consistency: 6 },
          objects: ['person', 'yoga', 'mat'],
          colors: ['pink', 'white', 'green']
        }
      }
    ]
  };

  const categoryPosts = postsByCategory[influencerCategory] || postsByCategory.tech;
  const posts = [];

  for (let i = 0; i < 3; i++) {
    const postTemplate = categoryPosts[i % categoryPosts.length];
    const postDate = new Date(Date.now() - (i + 1) * 24 * 60 * 60 * 1000);
    
    posts.push({
      influencer: influencerId,
      postId: `post_${influencerId}_${i + 1}`,
      caption: postTemplate.caption,
      imageUrl: postTemplate.imageUrl,
      thumbnailUrl: postTemplate.imageUrl.replace('400&h=400', '200&h=200'),
      likes: postTemplate.likes,
      comments: postTemplate.comments,
      postDate: postDate,
      postType: 'image',
      hashtags: postTemplate.hashtags,
      mentions: [],
      analysis: postTemplate.analysis,
      isProcessed: true
    });
  }

  return posts;
};

// Sample reels for each influencer
const generateReels = (influencerId, influencerCategory, influencerName) => {
  const reelsByCategory = {
    fashion: [
      {
        caption: 'Quick outfit change for different occasions! 👗 #fashion #outfit #style',
        thumbnailUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop',
        views: Math.floor(Math.random() * 50000) + 25000,
        likes: Math.floor(Math.random() * 3000) + 1500,
        comments: Math.floor(Math.random() * 200) + 100,
        shares: Math.floor(Math.random() * 100) + 50,
        duration: 30,
        hashtags: ['fashion', 'outfit', 'style', 'quick'],
        analysis: {
          events: ['fashion', 'outfit change'],
          objects: ['clothing', 'person', 'mirror'],
          vibe: 'energetic',
          tags: ['fashion', 'style', 'outfit'],
          quality: { videoQuality: 'good', audioQuality: 'good', editing: 'good' },
          music: { hasMusic: true, musicGenre: 'upbeat' }
        }
      }
    ],
    tech: [
      {
        caption: 'Coding tip: Use version control! Git is your friend 💻 #coding #git #programming',
        thumbnailUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=200&h=200&fit=crop',
        views: Math.floor(Math.random() * 30000) + 15000,
        likes: Math.floor(Math.random() * 2000) + 1000,
        comments: Math.floor(Math.random() * 150) + 75,
        shares: Math.floor(Math.random() * 80) + 40,
        duration: 45,
        hashtags: ['coding', 'git', 'programming', 'tips'],
        analysis: {
          events: ['coding', 'tutorial'],
          objects: ['computer', 'code', 'screen'],
          vibe: 'educational',
          tags: ['programming', 'coding', 'tutorial'],
          quality: { videoQuality: 'good', audioQuality: 'good', editing: 'basic' },
          music: { hasMusic: true, musicGenre: 'ambient' }
        }
      }
    ],
    travel: [
      {
        caption: 'Packing tips for your next adventure! ✈️ #travel #packing #tips',
        thumbnailUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=200&h=200&fit=crop',
        views: Math.floor(Math.random() * 40000) + 20000,
        likes: Math.floor(Math.random() * 2500) + 1250,
        comments: Math.floor(Math.random() * 180) + 90,
        shares: Math.floor(Math.random() * 90) + 45,
        duration: 60,
        hashtags: ['travel', 'packing', 'tips', 'adventure'],
        analysis: {
          events: ['packing', 'travel prep'],
          objects: ['suitcase', 'clothes', 'travel items'],
          vibe: 'educational',
          tags: ['travel', 'packing', 'tips'],
          quality: { videoQuality: 'good', audioQuality: 'good', editing: 'good' },
          music: { hasMusic: true, musicGenre: 'upbeat' }
        }
      }
    ],
    fitness: [
      {
        caption: '5-minute morning workout to start your day! 💪 #fitness #workout #morning',
        thumbnailUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop',
        views: Math.floor(Math.random() * 35000) + 17500,
        likes: Math.floor(Math.random() * 2200) + 1100,
        comments: Math.floor(Math.random() * 160) + 80,
        shares: Math.floor(Math.random() * 85) + 42,
        duration: 45,
        hashtags: ['fitness', 'workout', 'morning', 'quick'],
        analysis: {
          events: ['workout', 'exercise'],
          objects: ['person', 'gym', 'equipment'],
          vibe: 'energetic',
          tags: ['fitness', 'workout', 'motivation'],
          quality: { videoQuality: 'good', audioQuality: 'excellent', editing: 'good' },
          music: { hasMusic: true, musicGenre: 'upbeat' }
        }
      }
    ],
    food: [
      {
        caption: 'Quick pasta recipe in under 15 minutes! 🍝 #pasta #recipe #cooking',
        thumbnailUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=200&h=200&fit=crop',
        views: Math.floor(Math.random() * 25000) + 12500,
        likes: Math.floor(Math.random() * 1800) + 900,
        comments: Math.floor(Math.random() * 120) + 60,
        shares: Math.floor(Math.random() * 60) + 30,
        duration: 90,
        hashtags: ['pasta', 'recipe', 'cooking', 'quick'],
        analysis: {
          events: ['cooking', 'recipe'],
          objects: ['food', 'kitchen', 'ingredients'],
          vibe: 'educational',
          tags: ['cooking', 'recipe', 'food'],
          quality: { videoQuality: 'good', audioQuality: 'good', editing: 'good' },
          music: { hasMusic: true, musicGenre: 'ambient' }
        }
      }
    ],
    entertainment: [
      {
        caption: 'Behind the scenes of my music production! 🎵 #music #production #behindthescenes',
        thumbnailUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
        views: Math.floor(Math.random() * 20000) + 10000,
        likes: Math.floor(Math.random() * 1500) + 750,
        comments: Math.floor(Math.random() * 100) + 50,
        shares: Math.floor(Math.random() * 50) + 25,
        duration: 60,
        hashtags: ['music', 'production', 'behindthescenes', 'studio'],
        analysis: {
          events: ['music production', 'recording'],
          objects: ['studio', 'equipment', 'microphone'],
          vibe: 'energetic',
          tags: ['music', 'production', 'studio'],
          quality: { videoQuality: 'good', audioQuality: 'excellent', editing: 'good' },
          music: { hasMusic: true, musicGenre: 'electronic' }
        }
      }
    ],
    beauty: [
      {
        caption: 'Skincare routine that changed my skin! ✨ #skincare #routine #beauty',
        thumbnailUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop',
        views: Math.floor(Math.random() * 60000) + 30000,
        likes: Math.floor(Math.random() * 4000) + 2000,
        comments: Math.floor(Math.random() * 300) + 150,
        shares: Math.floor(Math.random() * 150) + 75,
        duration: 120,
        hashtags: ['skincare', 'routine', 'beauty', 'glow'],
        analysis: {
          events: ['skincare', 'routine'],
          objects: ['skincare products', 'person', 'bathroom'],
          vibe: 'calm',
          tags: ['skincare', 'routine', 'beauty'],
          quality: { videoQuality: 'excellent', audioQuality: 'good', editing: 'professional' },
          music: { hasMusic: true, musicGenre: 'ambient' }
        }
      }
    ],
    business: [
      {
        caption: 'Business networking tips that actually work! 💼 #business #networking #tips',
        thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        views: Math.floor(Math.random() * 15000) + 7500,
        likes: Math.floor(Math.random() * 800) + 400,
        comments: Math.floor(Math.random() * 60) + 30,
        shares: Math.floor(Math.random() * 30) + 15,
        duration: 90,
        hashtags: ['business', 'networking', 'tips', 'success'],
        analysis: {
          events: ['networking', 'business'],
          objects: ['person', 'office', 'business'],
          vibe: 'professional',
          tags: ['business', 'networking', 'tips'],
          quality: { videoQuality: 'good', audioQuality: 'good', editing: 'good' },
          music: { hasMusic: true, musicGenre: 'ambient' }
        }
      }
    ],
    lifestyle: [
      {
        caption: 'Morning yoga flow to start your day! 🧘‍♀️ #yoga #morning #wellness',
        thumbnailUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop',
        views: Math.floor(Math.random() * 30000) + 15000,
        likes: Math.floor(Math.random() * 2000) + 1000,
        comments: Math.floor(Math.random() * 140) + 70,
        shares: Math.floor(Math.random() * 70) + 35,
        duration: 180,
        hashtags: ['yoga', 'morning', 'wellness', 'flow'],
        analysis: {
          events: ['yoga', 'exercise'],
          objects: ['person', 'yoga mat', 'peaceful'],
          vibe: 'calm',
          tags: ['yoga', 'wellness', 'morning'],
          quality: { videoQuality: 'good', audioQuality: 'good', editing: 'good' },
          music: { hasMusic: true, musicGenre: 'ambient' }
        }
      }
    ]
  };

  const categoryReels = reelsByCategory[influencerCategory] || reelsByCategory.tech;
  const reels = [];

  for (let i = 0; i < 2; i++) {
    const reelTemplate = categoryReels[i % categoryReels.length];
    const postDate = new Date(Date.now() - (i + 1) * 24 * 60 * 60 * 1000);
    
    reels.push({
      influencer: influencerId,
      reelId: `reel_${influencerId}_${i + 1}`,
      caption: reelTemplate.caption,
      thumbnailUrl: reelTemplate.thumbnailUrl,
      videoUrl: `https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_${i + 1}mb.mp4`,
      views: reelTemplate.views,
      likes: reelTemplate.likes,
      comments: reelTemplate.comments,
      shares: reelTemplate.shares,
      duration: reelTemplate.duration,
      postDate: postDate,
      hashtags: reelTemplate.hashtags,
      mentions: [],
      analysis: reelTemplate.analysis,
      isProcessed: true
    });
  }

  return reels;
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Influencer.deleteMany({});
    await Post.deleteMany({});
    await Reel.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Create influencers
    const createdInfluencers = [];
    for (const influencerData of influencersData) {
      const influencer = new Influencer(influencerData);
      await influencer.save();
      createdInfluencers.push(influencer);
      console.log(`✅ Created influencer: ${influencer.displayName}`);
    }

    // Create posts and reels for each influencer
    for (const influencer of createdInfluencers) {
      const posts = generatePosts(influencer._id, influencer.category, influencer.displayName);
      const reels = generateReels(influencer._id, influencer.category, influencer.displayName);

      // Save posts
      for (const postData of posts) {
        const post = new Post(postData);
        await post.save();
      }
      console.log(`📸 Created ${posts.length} posts for ${influencer.displayName}`);

      // Save reels
      for (const reelData of reels) {
        const reel = new Reel(reelData);
        await reel.save();
      }
      console.log(`🎬 Created ${reels.length} reels for ${influencer.displayName}`);
    }

    console.log('🎉 Database seeded successfully with 10 influencers!');
    console.log('📊 Summary:');
    console.log(`   - ${createdInfluencers.length} Influencers`);
    console.log(`   - ${createdInfluencers.length * 3} Posts`);
    console.log(`   - ${createdInfluencers.length * 2} Reels`);
    
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  seedData();
}

module.exports = seedData;
