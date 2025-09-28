const express = require('express');
const router = express.Router();
const {
  getAllInfluencers,
  getInfluencerByUsername,
  getInfluencerProfile,
  createInfluencer,
  updateInfluencer,
  deleteInfluencer,
} = require('../controllers/influencerController');

// Public routes
router.get('/', getAllInfluencers);
router.get('/:username', getInfluencerByUsername);
router.get('/:username/profile', getInfluencerProfile);

// Protected routes (require authentication)
router.post('/', createInfluencer);
router.put('/:username', updateInfluencer);
router.delete('/:username', deleteInfluencer);

module.exports = router;


