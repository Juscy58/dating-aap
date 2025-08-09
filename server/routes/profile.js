const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');

// Get current user's profile
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', 'username email');
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create or update current user's profile
router.post('/me', auth, async (req, res) => {
  try {
    const profileFields = { ...req.body, user: req.user.id };
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile.set(profileFields);
      await profile.save();
      return res.json(profile);
    }

    profile = new Profile(profileFields);
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;