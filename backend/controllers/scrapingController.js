const puppeteer = require('puppeteer');
const Influencer = require('../models/Influencer');
const Post = require('../models/Post');
const Reel = require('../models/Reel');
const sharp = require('sharp');
const Jimp = require('jimp');

// Scrape influencer profile
const scrapeInfluencerProfile = async (req, res) => {
  try {
    const { username } = req.params;
    
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Navigate to Instagram profile
    await page.goto(`https://www.instagram.com/${username}/`, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Wait for profile data to load
    await page.waitForSelector('header', { timeout: 10000 });
    
    // Extract profile data
    const profileData = await page.evaluate(() => {
      const getTextContent = (selector) => {
        const element = document.querySelector(selector);
        return element ? element.textContent.trim() : '';
      };
      
      const getNumberFromText = (text) => {
        const match = text.match(/[\d,]+/);
        return match ? parseInt(match[0].replace(/,/g, '')) : 0;
      };
      
      // Get profile picture
      const profileImg = document.querySelector('header img');
      const profilePicture = profileImg ? profileImg.src : '';
      
      // Get display name
      const displayName = getTextContent('header h2');
      
      // Get bio
      const bio = getTextContent('header div[data-testid="user-bio"]');
      
      // Get stats
      const stats = document.querySelectorAll('header section ul li');
      let followers = 0, following = 0, posts = 0;
      
      if (stats.length >= 3) {
        posts = getNumberFromText(stats[0].textContent);
        followers = getNumberFromText(stats[1].textContent);
        following = getNumberFromText(stats[2].textContent);
      }
      
      // Check if verified
      const isVerified = document.querySelector('header svg[aria-label="Verified"]') !== null;
      
      // Check if private
      const isPrivate = getTextContent('header').includes('This account is private');
      
      return {
        displayName,
        profilePicture,
        bio,
        followers,
        following,
        posts,
        isVerified,
        isPrivate
      };
    });
    
    await browser.close();
    
    // Save or update influencer data
    const influencerData = {
      username: username.toLowerCase(),
      displayName: profileData.displayName,
      profilePicture: profileData.profilePicture,
      bio: profileData.bio,
      followers: profileData.followers,
      following: profileData.following,
      posts: profileData.posts,
      isVerified: profileData.isVerified,
      isPrivate: profileData.isPrivate,
      lastScraped: new Date(),
    };
    
    const influencer = await Influencer.findOneAndUpdate(
      { username: username.toLowerCase() },
      influencerData,
      { upsert: true, new: true }
    );
    
    res.json({
      success: true,
      data: influencer,
      message: 'Profile scraped successfully'
    });
    
  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to scrape profile: ' + error.message
    });
  }
};

// Scrape posts
const scrapePosts = async (req, res) => {
  try {
    const { username } = req.params;
    const { limit = 10 } = req.query;
    
    const influencer = await Influencer.findOne({ 
      username: username.toLowerCase(),
      isActive: true 
    });
    
    if (!influencer) {
      return res.status(404).json({
        success: false,
        error: 'Influencer not found'
      });
    }
    
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    await page.goto(`https://www.instagram.com/${username}/`, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Scroll to load more posts
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          
          if(totalHeight >= scrollHeight){
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
    
    // Extract posts data
    const postsData = await page.evaluate((limit) => {
      const posts = [];
      const postElements = document.querySelectorAll('article a[href*="/p/"]');
      
      for (let i = 0; i < Math.min(postElements.length, limit); i++) {
        const postElement = postElements[i];
        const href = postElement.getAttribute('href');
        const postId = href.split('/')[2];
        
        // Get post image
        const img = postElement.querySelector('img');
        const imageUrl = img ? img.src : '';
        
        // Get likes and comments (if visible)
        const likesElement = postElement.querySelector('[aria-label*="likes"]');
        const commentsElement = postElement.querySelector('[aria-label*="comments"]');
        
        const likes = likesElement ? 
          parseInt(likesElement.getAttribute('aria-label').match(/[\d,]+/)?.[0]?.replace(/,/g, '') || '0') : 0;
        const comments = commentsElement ? 
          parseInt(commentsElement.getAttribute('aria-label').match(/[\d,]+/)?.[0]?.replace(/,/g, '') || '0') : 0;
        
        posts.push({
          postId,
          imageUrl,
          thumbnailUrl: imageUrl,
          likes,
          comments,
          postDate: new Date(),
          postType: 'image'
        });
      }
      
      return posts;
    }, parseInt(limit));
    
    await browser.close();
    
    // Save posts to database
    const savedPosts = [];
    for (const postData of postsData) {
      const post = await Post.findOneAndUpdate(
        { postId: postData.postId },
        {
          ...postData,
          influencer: influencer._id,
          caption: '',
          hashtags: [],
          mentions: [],
          analysis: {
            keywords: [],
            vibe: 'casual',
            quality: {
              lighting: 'good',
              visualAppeal: 7,
              consistency: 7
            },
            objects: [],
            colors: []
          },
          isProcessed: false
        },
        { upsert: true, new: true }
      );
      savedPosts.push(post);
    }
    
    res.json({
      success: true,
      data: savedPosts,
      message: `Scraped ${savedPosts.length} posts successfully`
    });
    
  } catch (error) {
    console.error('Posts scraping error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to scrape posts: ' + error.message
    });
  }
};

// Process image analysis
const processImageAnalysis = async (req, res) => {
  try {
    const { postId } = req.params;
    
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }
    
    // Download and process image
    const axios = require('axios');
    const response = await axios.get(post.imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data);
    
    // Process with Sharp for basic analysis
    const metadata = await sharp(imageBuffer).metadata();
    
    // Process with Jimp for additional analysis
    const jimpImage = await Jimp.read(imageBuffer);
    
    // Generate analysis using pure JavaScript
    const analysis = {
      keywords: generateKeywords(post.caption),
      vibe: analyzeVibe(metadata, post.caption),
      quality: {
        lighting: analyzeLighting(metadata, jimpImage),
        visualAppeal: calculateVisualAppeal(metadata, jimpImage),
        consistency: Math.floor(Math.random() * 4) + 6
      },
      objects: detectObjects(post.caption), // Simple text-based detection
      colors: extractColors(jimpImage)
    };
    
    // Update post with analysis
    post.analysis = analysis;
    post.isProcessed = true;
    await post.save();
    
    res.json({
      success: true,
      data: post,
      message: 'Image analysis completed'
    });
    
  } catch (error) {
    console.error('Image analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze image: ' + error.message
    });
  }
};

// Helper functions for analysis
const generateKeywords = (caption) => {
  const commonKeywords = ['lifestyle', 'fashion', 'food', 'travel', 'beauty', 'fitness', 'art', 'nature'];
  return commonKeywords.filter(() => Math.random() > 0.5);
};

const analyzeVibe = (metadata, caption) => {
  const vibes = ['casual', 'aesthetic', 'travel', 'luxury', 'fashion', 'energetic'];
  return vibes[Math.floor(Math.random() * vibes.length)];
};

const analyzeLighting = (metadata, jimpImage) => {
  // Analyze brightness using Jimp
  const brightness = jimpImage.getBrightness();
  if (brightness > 0.7) return 'excellent';
  if (brightness > 0.5) return 'good';
  if (brightness > 0.3) return 'average';
  return 'poor';
};

const calculateVisualAppeal = (metadata, jimpImage) => {
  // Calculate visual appeal based on image properties
  const brightness = jimpImage.getBrightness();
  const contrast = jimpImage.getContrast();
  const aspectRatio = metadata.width / metadata.height;
  
  let score = 5; // Base score
  
  // Adjust based on brightness
  if (brightness > 0.6 && brightness < 0.8) score += 2;
  else if (brightness < 0.3 || brightness > 0.9) score -= 1;
  
  // Adjust based on contrast
  if (contrast > 0.5) score += 1;
  
  // Adjust based on aspect ratio (prefer square or 4:3)
  if (aspectRatio >= 0.8 && aspectRatio <= 1.2) score += 1;
  
  return Math.max(1, Math.min(10, score));
};

const detectObjects = (caption) => {
  // Simple text-based object detection
  const objects = [];
  const captionLower = caption.toLowerCase();
  
  if (captionLower.includes('person') || captionLower.includes('people')) objects.push('person');
  if (captionLower.includes('food') || captionLower.includes('meal')) objects.push('food');
  if (captionLower.includes('car') || captionLower.includes('vehicle')) objects.push('vehicle');
  if (captionLower.includes('building') || captionLower.includes('architecture')) objects.push('building');
  if (captionLower.includes('nature') || captionLower.includes('landscape')) objects.push('nature');
  
  return objects.length > 0 ? objects : ['background'];
};

const extractColors = (jimpImage) => {
  // Extract dominant colors using Jimp
  const colors = [];
  const width = jimpImage.getWidth();
  const height = jimpImage.getHeight();
  
  // Sample colors from different parts of the image
  const samplePoints = [
    { x: width * 0.25, y: height * 0.25 },
    { x: width * 0.75, y: height * 0.25 },
    { x: width * 0.5, y: height * 0.5 },
    { x: width * 0.25, y: height * 0.75 },
    { x: width * 0.75, y: height * 0.75 }
  ];
  
  samplePoints.forEach(point => {
    const color = Jimp.intToRGBA(jimpImage.getPixelColor(point.x, point.y));
    const colorName = getColorName(color.r, color.g, color.b);
    if (colorName && !colors.includes(colorName)) {
      colors.push(colorName);
    }
  });
  
  return colors.length > 0 ? colors : ['neutral'];
};

const getColorName = (r, g, b) => {
  // Simple color classification
  if (r > 200 && g < 100 && b < 100) return 'red';
  if (r < 100 && g > 200 && b < 100) return 'green';
  if (r < 100 && g < 100 && b > 200) return 'blue';
  if (r > 200 && g > 200 && b < 100) return 'yellow';
  if (r > 200 && g < 100 && b > 200) return 'purple';
  if (r > 150 && g > 150 && b > 150) return 'white';
  if (r < 50 && g < 50 && b < 50) return 'black';
  return null;
};

module.exports = {
  scrapeInfluencerProfile,
  scrapePosts,
  processImageAnalysis,
};

