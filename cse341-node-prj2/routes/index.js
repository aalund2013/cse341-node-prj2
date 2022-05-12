const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// Login/Landing page
// Route GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('Login', {
    layout: 'login',
  });
});

// Dashboard
// Route GET /dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
  res.render('Dashboard')
});



module.exports = router