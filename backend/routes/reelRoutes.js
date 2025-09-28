const express = require('express');
const router = express.Router();
const {
  getReelsByInfluencer,
  getReelById,
  getReelsByAnalysis,
  getReelAnalytics,
} = require('../controllers/reelController');

// Public routes
router.get('/influencer/:username', getReelsByInfluencer);
router.get('/:reelId', getReelById);
router.get('/influencer/:username/analysis', getReelsByAnalysis);
router.get('/influencer/:username/analytics', getReelAnalytics);

module.exports = router;



