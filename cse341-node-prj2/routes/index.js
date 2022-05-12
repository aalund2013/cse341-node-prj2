const express = require('express')
const router = express.Router()

// Login/Landing page
// Route GET /
router.get('/', (req, res) => {
  res.render('Login', {
    layout: 'login',
  });
});

// Dashboard
// Route GET /dashboard
router.get('/dashboard', (req, res) => {
  res.render('Dashboard')
});

module.exports = router