const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // (if needed)

// Use router.get, not app.get
// router.get('/dashboard', ensureAuthenticated, (req, res) => {
//   const user = req.session.user; // assuming you're storing user in session
//   if (!user) {
//     return res.redirect('/login');
//   }
//   console.log(user);
//   res.render('dashboard', { user }); 
// });
router.get('/dashboard', (req, res) => {
  res.render('dashboard'); 
});


router.get('/register', (req, res) => {
  res.render('register');
});
router.post('/register', authController.createUser);

// Add login if needed
router.get('/login', (req, res) => {
  res.render('login');
});
router.post('/login', authController.getUser);

function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  res.redirect('/login');
}


module.exports = router;
