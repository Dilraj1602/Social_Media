const express = require('express');
const router = express.Router();
const {
  scrapeInfluencerProfile,
  scrapePosts,
  processImageAnalysis,
} = require('../controllers/scrapingController');
const { scrapingLimiter } = require('../middleware/rateLimiter');

// Apply rate limiting to scraping routes
router.use(scrapingLimiter);

// Scraping routes
router.post('/profile/:username', scrapeInfluencerProfile);
router.post('/posts/:username', scrapePosts);
router.post('/analyze/:postId', processImageAnalysis);

module.exports = router;



