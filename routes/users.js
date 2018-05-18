var express = require('express');
var router = express.Router();
const passport = require('passport');


var user_controller = require('../controllers/userController');

/* Settings */

/// USERS ROUTES ///


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users.pug');

});


// GET request for creating User. NOTE This must come before route for id (i.e. display user).
router.get('/register', user_controller.register_get);

// POST request for creating Author.
router.post('/register', user_controller.register_post);

// Get request  for login User
router.get('/login', user_controller.login_get);

// POST request for login user
router.post('/login', passport.authenticate('local', { failureRedirect: '/users/login', failureFlash: true }), (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/catalog/');
        console.log(req.user);
    });
});

// Get request for logout
router.get('/logout', user_controller.logout_get);

/* coll page */
router.get('/perfil', function(req, res, next) {
  res.render('perfil.pug');

});

router.get('/signup', function(req, res, next) {
  res.render('signup.pug');
});

module.exports = router;
