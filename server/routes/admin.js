const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

function checkAdmin(req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ msg: 'Not authorized' });
  }
  next();
}

router.get('/users', auth, checkAdmin, async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
});

router.delete('/users/:userId', auth, checkAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.userId);
  res.json({ msg: 'User deleted' });
});

module.exports = router;