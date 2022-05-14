const express = require('express')
const router = express.Router()
const swaggerUi = require('swagger-ui-express');
const docRoute = require('./api-docs');
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.use('/auth', require('./auth'));
router.use('/users', ensureAuth, require('./users'));
router.use('/posts', ensureAuth, require('./posts'));
router.use('/api-docs', ensureAuth, swaggerUi.serve, swaggerUi.setup(docRoute));

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
  res.render('dashboard', {
    name: req.user.firstName
  })
});



module.exports = router