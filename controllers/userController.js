let User = require('../models/user');
const async = require('async');
let passport = require('passport');
let localStrategy = require('passport-local').Strategy;
let expressValidator = require('express-validator');

// Display User create form on GET.
exports.register_get = function(req, res, next) {
    res.render('user_form', {title: 'Create user'});
};


// Register new user.

exports.register_post =  function (req, res) {

  let name = req.body.name;
	let email = req.body.email;
	let username = req.body.username;
	let password = req.body.password;
	let password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	let errors = req.validationErrors();

	if (errors) {
		res.render('user_form', {
			errors: errors
		});
	}
	else {
		//checking for email and username are already taken
		User.findOne({ username: {
			"$regex": "^" + username + "\\b", "$options": "i"
	}}, function (err, user) {
			User.findOne({ email: {
				"$regex": "^" + email + "\\b", "$options": "i"
		}}, function (err, mail) {
				if (user || mail) {
					res.render('user_form', {
						user: user,
						mail: mail
					});
				}
				else {
					let newUser = new User({
						name: name,
						email: email,
						username: username,
						password: password
					});
					User.createUser(newUser, function (err, user) {
						if (err) throw err;
						console.log(user);
					});
         	req.flash('success_msg', 'You are registered and can now login');
					res.redirect('login');
				}
			});
		});
	}
};


passport.use(new localStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
      if (err) throw err;
      if(!user) {
        return done(null, false, {message: 'Incorret username.'});
      }

      User.comparePassword(password, user.password, function(err, isMatch) {
          if(err) throw err;
          if(isMatch){
            return done(null, user);
          }else{
            return done(null, false, {message: 'Invalid Password'});
          }
      });
    });
  }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.getUserById(id, function(err, user){
            done(err, user);
    });
});

// Display Login Page form on GET
exports.login_get = function (req, res, next) {
    res.render('login', {user: req.user});
};




// Disconect user logout
exports.logout_get = function(req, res) {
  req.logout();
  req.flash('success_msg', "You are logged out");
  res.redirect('/users/login');
};
