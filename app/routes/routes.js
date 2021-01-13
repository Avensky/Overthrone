const mongoose         = require('mongoose')
const User             = mongoose.model('User')

module.exports = function(app, passport) {

// =============================================================================
// normal routes ===============================================================
// =============================================================================
	// show the home page (will also have our login links)
//	app.get('/', function(req, res) {
//		res.render('index.ejs');
//	});

	app.get('/api/fetchUser', (req, res) => {
        if (req.user){
            res.send(req.user);
        }
	});
	
	  app.get('/ping', (req, res) => {
        res.status(200).send("pong!");
	});

	app.get('/api/flash', function(req, res){
		// Set a flash message by passing the key, followed by the value, to req.flash().
		req.flash('info', 'Flash is back!')
		res.redirect('/');
	  });
	   
	  app.get('/api/messages', function(req, res){
		// Get an array of flash messages by passing the key to req.flash()
		res.render('index', { messages: req.flash('info') });
	  });


    // =====================================
	// PROFILE SECTION =====================
	// =====================================
	//	app.get('/profile', isLoggedIn, function(req, res) {
	//		res.render('profile.ejs', {
	//			user : req.user
	//		});
	//	});

    // =====================================
    // LOGOUT ==============================
    // =====================================
	app.get('/auth/logout', function(req, res) {
		req.logout();
		res.redirect('/authentication');
	});

	// when login failed, send failed msg
	app.get("/login/failed", (req, res) => {
		res.status(401).json({
		success: false,
		message: "user failed to authenticate."
		});
	});

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

	// locally --------------------------------
		// LOGIN ===============================
		// show the login form
			//app.get('/login', function(req, res) {
			//	res.render('login.ejs', { message: req.flash('loginMessage') });
			//});

// =====================================
// LOCAL ===============================
// =====================================
	app.post('/api/addAddress',(req, res, done) => {        //add a new address
		//console.log('/api/addAddress');
		User.findOneAndUpdate({'_id' : req.body.id},{
			$set:{ 
				addresses : {
					name    	: req.body.name, 
					phone   	: req.body.phone, 
					address1	: req.body.address,
					address2	: req.body.address2,
					city    	: req.body.city, 
					state   	: req.body.state,
					zipCode 	: req.body.zipCode,
					email   	: req.body.email
				}
			}
		},(err, doc) => {
			if(doc){
				//res.redirect('/profile')
				res.send('Address updated successfully!');
			}
			else {
				res.err(err.message);
			}
			//	console.log('/api/addAddress' + req.body);
			//	console.log('string'+JSON.stringify(req.body))
			//	// if there are any errors, return the error
			//	if (err) {
			//		console.log('err' + err)
			//		return done(err);
			//	}
			//	//  If we're logged in, we're connecting a new local account.
			//	if(req.user) {
			//		console.log('user = ' + req.user);
			//		console.log('result = ' + doc);
			//		var user                = req.user;
			//		user.addresses.name    	= req.body.name, 
			//		user.addresses.phone   	= req.body.phone, 
			//		user.addresses.address1	= req.body.address,
			//		user.addresses.address2	= req.body.address2,
			//		user.addresses.city    	= req.body.city, 
			//		user.addresses.state   	= req.body.state,
			//		user.addresses.zipCode 	= req.body.zipCode,
			//		user.addresses.email   	= req.body.email
			//		
			//		user.save(function(err,res) {
			//			if (err){
			//				console.log('err1 = ' + err)
			//				throw err;
			//		}
			//		console.log('user saved')
			//		return done(null, user);
			//	});
			//}
		})
	});
		
// 		app.get('/api/getcharDetails/:addressid',(req,res)=>{              //get a address details
// 		Address.findOne({_id : req.params.addressid},{},(err,doc)=>{
// 			if(doc)
// 				res.json(doc);
// 			else {
// 				res.status(404).send('Ops!Detail not found');
// 			}
// 		})
// 		});   
    	// =====================================
    	// LOGIN ===============================
		// =====================================

		// process the login form
		//	app.post('/auth/login', 
		//		passport.authenticate('local-login', {
		//			successRedirect : '/', // redirect to the secure profile section
		//			failureRedirect : '/', // redirect back to the signup page if there is an error
		//			failureFlash 	: true // allow flash messages
		//		}), (req, res) => {
		//			// If this function gets called, authentication was successful.
		//			// `req.user` contains the authenticated user.
		//			//console.log('Message sent!')
		//			//if (err) {
		//				// handle error and redirect to credentials,
		//				// display an error page, or whatever you want to do here...
		//			//}
		//			// if no error, redirect
		//			//redirect('/');
		//			res.send(200)
		//			// res.sendStatus(200)
		//		}
		//	);

		app.post('/auth/login',  (req, res, next) => {

			passport.authenticate('local-login', (err, user, info) => {
				if(err) return next(err);
				if(info) return res.send(info);
				req.logIn(user, err => {
					if(err) return next(err);
					return res.send(user);
				});
			})(req, res, next);
			
		});

		// =====================================
		// SIGNUP ==============================
		// =====================================
		// show the signup form
		// app.get('/signup', function(req, res) {
		// 	res.render('signup.ejs', { message: req.flash('loginMessage') });
		// });

    // =====================================
    // REGISTER ============================
    // =====================================
		// process the signup form
		app.post('/auth/signup', 
			passport.authenticate('local-signup', {
				successRedirect : '/', // redirect to the secure profile section
				failureRedirect : '/', // redirect back to the signup page if there is an error
				failureFlash : true // allow flash messages
			}), (req, res) => {
				// If this function gets called, authentication was successful.
				// `req.user` contains the authenticated user.
				console.log('Message sent!')
				res.send(200)
				// res.sendStatus(200)
			}
		);

		// app.post('/auth/signup', function(req, res, next) {
		// 	passport.authenticate('local-signup', function(err, user, info) {
		// 	  if (err) return next(err);
		// 	  if (user) {
		// 		req.logIn(user, function(err) {
		// 		  if (err) return next(err);
		// 		  emailVerification.send(req.user.email, res, req);
		// 		  createSendToken(req.user, res);
		// 		});
		// 	  // Register failed, flash message is in info
		// 	  } else {
		// 		res.status(400).json(info);
		// 	  }
		// 	})(req, res, next);
		//   });

		// process the signup form
		app.post('/api/signup', passport.authenticate('local-signup', {
			successRedirect : '/', // redirect to the secure profile section
			failureRedirect : '/signup', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));


    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
		app.get('/auth/facebook', 
			passport.authenticate('facebook', { 
				scope : ['public_profile', 'email'] 
		}));	

		// handle the callback after facebook has authenticated the user
		app.get('/auth/facebook/callback',
			passport.authenticate('facebook', {
				successRedirect : '/shop',
				//successRedirect : '/',
				failureRedirect : '/'
			}));

    // =====================================
    // TWITTER ROUTES ======================
    // =====================================
    // route for twitter authentication and login
		app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

		// handle the callback after twitter has authenticated the user
		app.get('/auth/twitter/callback',
			passport.authenticate('twitter', {
				successRedirect : '/shop',
				failureRedirect : '/'
			}));


    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
		app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

		// the callback after google has authenticated the user
		app.get('/auth/google/callback',
			passport.authenticate('google', {
				successRedirect : '/shop',
				failureRedirect : '/'
			}));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

	// locally --------------------------------
		//app.get('/connect/local', function(req, res) {
		//	//res.render('connect-local.ejs', { message: req.flash('loginMessage') });
		//	res.render('/authentication')
		//});
		app.post('/connect/local', passport.authenticate('local-signup', {
			successRedirect : '/shop', // redirect to the secure profile section
			failureRedirect : '/connectlocal', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

	// facebook -------------------------------

		// send to facebook to do the authentication
		app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

		// handle the callback after facebook has authorized the user
		app.get('/connect/facebook/callback',
			passport.authorize('facebook', {
				successRedirect : '/shop',
				failureRedirect : '/'
			}));

	// twitter --------------------------------

		// send to twitter to do the authentication
		app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

		// handle the callback after twitter has authorized the user
		app.get('/connect/twitter/callback',
			passport.authorize('twitter', {
				successRedirect : '/shop',
				failureRedirect : '/'
			}));


	// google ---------------------------------

		// send to google to do the authentication
		app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

		// the callback after google has authorized the user
		app.get('/connect/google/callback',
			passport.authorize('google', {
				successRedirect : '/shop',
				failureRedirect : '/'
			}));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

	// local -----------------------------------
	app.get('/unlink/local', function(req, res) {
		var user            = req.user;
		user.local.email    = undefined;
		user.local.password = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});

	// facebook -------------------------------
	app.get('/unlink/facebook', function(req, res) {
		var user            = req.user;
		user.facebook.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});

	// twitter --------------------------------
	app.get('/unlink/twitter', function(req, res) {
		var user           = req.user;
		user.twitter.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});

	// google ---------------------------------
	app.get('/unlink/google', function(req, res) {
		var user          = req.user;
		user.google.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}