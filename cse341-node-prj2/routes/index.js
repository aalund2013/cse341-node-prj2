const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// router.use('/auth', require('./auth'));
// router.use('/users', ensureAuth, require('./users'));
// router.use('/posts', ensureAuth, require('./posts'));

// Login/Landing page
// Route GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});

// Dashboard
// Route GET /dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
  res.render('Dashboard')
});



module.exports = router