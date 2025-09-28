const express = require('express');
const router = express.Router();
const {
  getPostsByInfluencer,
  getPostById,
  getPostsByAnalysis,
  getPostAnalytics,
} = require('../controllers/postController');

// Public routes
router.get('/influencer/:username', getPostsByInfluencer);
router.get('/:postId', getPostById);
router.get('/influencer/:username/analysis', getPostsByAnalysis);
router.get('/influencer/:username/analytics', getPostAnalytics);

module.exports = router;


