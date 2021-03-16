const mongoose      = require('mongoose')
const User          = mongoose.model('User')
const Order         = mongoose.model('Order')  
const Stripe        = require('stripe');
//const { default: item } = require('../../client/src/components/pages/Shop/Items/Item/Item');
const endpointSecret ='whsec_8uBYP8hWJrpcTob7wWS1MWJsYcEIVSzR'
//const Stripe         = require('stripe');
const stripe         = Stripe('sk_test_wW4sfPcu5VmY5BKqyP6zpdkK00qDrwAYXT');
const crypto                = require('crypto');
//const catchAsync            = require('./../utils/catchAsync');
const AppError              = require('./../utils/appError');
const Email                 = require('./../utils/email');

module.exports = function(app, passport) {

	const fulfillOrder = (session) => {
		// TODO: fill me in
		//console.log("Fulfilling order", session);
	}
	
	const createOrder =  async (session) => {
	  // TODO: fill me in
	  //console.log("Creating order", session);
	  const sessionRetrieve = await stripe.checkout.sessions.retrieve(
		session.id, {
		  expand: ['line_items'],
		},
	  );
	  //console.log("sessionRetrieve ", sessionRetrieve);
	  //console.log("sessionRetrieve line_items", sessionRetrieve.line_items);
	  let line_items = sessionRetrieve.line_items.data.map( item => {
		let line_item = {
		  id                        : item.id,
		  object                    : item.object,
		  amount_subtotal           : item.amount_subtotal,
		  amount_total              : item.amount_total,
		  currency                  : item.currency,
		  description               : item.description,
		  price: {
			id                      : item.price.id,
			object                  : item.price.object,
			active                  : item.price.active,
			billing_scheme          : item.price.billing_scheme,
			//created                 : item.price.created,
			currency                : item.price.currency,
			livemode                : item.price.livemode,
			//lookup_key              : null,
			//metadata                : {},
			//nickname                : null,
			product                 : item.price.product,
			//recurring               : null,
			//tiers_mode              : null,
			//transform_quantity      : null,           
			type                    : item.price.type,
			unit_amount             : item.price.unit_amount,
			unit_amount_decimal     : item.price.unit_amount_decimal,
		  },
		  quantity                  : item.quantity
		}
		return line_item
	  })
	  // console.log('line_items = ' + JSON.stringify(line_items))
	
	  Order.findOneAndUpdate({'sessionid' : session.id},{
	  $set:{
		// id                            : session.id,
		// userid                        : body.id,
		  date                          : new Date(),
		  line_items                    : line_items,
		  object                        : session.object,                
		  allow_promotion_codes         : session.allow_promotion_codes,
		  amount_subtotal               : session.amount_subtotal,       
		  amount_total                  : session.amount_total,          
		  billing_address_collection    : session.billing_address_collection,
		  cancel_url                    : session.cancel_url,            
		  client_reference_id           : session.client_reference_id,
		  currency                      : session.currency,              
		  customer                      : session.customer,              
		  customer_details : {
			email                       : session.customer_details.email,              
			tax_exempt                  : session.customer_details.tax_exempt,        
			tax_ids                     : session.customer_details.tax_ids              
		  },
		  customer_email                : session.customer_email,        
		  livemode                      : session.livemode,
		  locale                        : session.locale,                
		  //metadata                      : session.metadata,
		  mode                          : session.mode,
		  payment_intent                : session.payment_intent,        
		  payment_method_types          : session.payment_method_types,  
		  payment_status                : session.payment_status,        
		  setup_intent                  : session.setup_intent,          
		  //shipping                    : session.shipping,
		  shipping : {
			address: {
			  city    	                : session.shipping.address.city, 
			  country		                : session.shipping.address.country,
			  line1	                    : session.shipping.address.line1,
			  line2	                    : session.shipping.address.line2,
			  postal_code 	            : session.shipping.address.postal_code,
			  state   	                : session.shipping.address.state
			},
			name    	                  : session.shipping.name, 
		  },        
		  shipping_address_collection   : session.shipping_address_collection,
		  submit_type                   : session.submit_type,
		  subscription                  : session.subscription,       
		  success_url                   : session.success_url,           
		  total_details: { 
			amount_discount             : session.total_details.amount_discount,      
			amount_tax                  : session.total_details.amount_tax          
		  }
		}
	  },(err, doc) => {
		if(doc){
		  //res.redirect('/profile')
		  //res.send('updated successfully!');
		}
		else {
		  console.log(err.message)
		  //res.err(err.message);
		}
	  })
	}
	
	const emailCustomerAboutFailedPayment = (session) => {
	// TODO: fill me in
	console.log("Emailing customer", session);
	}

	  
	//app.post('/webhook', bodyParser.raw({type: 'application/json'}), (req, res) => {
	app.post('/webhook', (req, res) => {
		const payload = req.rawBody;
		//const payload = JSON.stringify(request.body);
		//const payload = request.rawBody;
		//console.log('rawBody' + JSON.stringify(payload))
	  	//console.log('webhook body' + JSON.stringify(req.body))
	 	//console.log('body' + JSON.stringify(req.body))
	  	//console.log('user = ' + req.user)
		const sig = req.headers['stripe-signature'];
	  
		let event;
	  
		try {
		//console.log('rawBody = ' + JSON.stringify(payload))
		//console.log('rawBody = ' + payload)
		//console.log('sig = ' + sig)
		//console.log('endpointSecret = ' + endpointSecret)
		event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
		} catch (err) {
		//console.log('Webhook Error = '+ err.message)
		  return res.status(400).send(`Webhook Error: ${err.message}`)
	  }
	  
	  // Successfully constructed event
	  console.log('✅ Success:', event.id);
		
		switch (event.type) {
			case 'checkout.session.completed': {
		  const session = event.data.object;
		  // let body = req.body
		  // let userid = req.body.userid
		  // let shipping = req.body.address
		  // console.log('webhook session = ' + JSON.stringify(session))
		  // console.log('webhook userid = ' + JSON.stringify(userid))
		  // console.log('webhook shipping = ' + JSON.stringify(shipping))
			  // Save an order in your database, marked as 'awaiting payment'
		  createOrder(session);
	
			  // Check if the order is paid (e.g., from a card payment)
			  //
			  // A delayed notification payment will have an `unpaid` status, as
			  // you're still waiting for funds to be transferred from the customer's
			  // account.
			  if (session.payment_status === 'paid') {
				fulfillOrder(session);
			  }
		
			  break;
			}
		
			case 'checkout.session.async_payment_succeeded': {
			  const session = event.data.object;
		
			  // Fulfill the purchase...
			  fulfillOrder(session);
		
			  break;
			}
		
			case 'checkout.session.async_payment_failed': {
			  const session = event.data.object;
		
			  // Send an email to the customer asking them to retry their order
			  emailCustomerAboutFailedPayment(session);
		
			  break;
			}
		  }
	});


	app.post('/api/orders', (req,res) =>{          //get all faqs info from db
		let id = req.body
		//console.log( 'id = ' + JSON.stringify(id))		
		Order.find({$and:[
			{ 'userid' : id._id},
			{ 'payment_status' : 'paid'}
		]},{}, (err,doc)=>{
			if(doc)
				res.json(doc);
			else {
				//res.err(err.message);
				res.status(404).send('Ops! Orders not found');
			}
		}).sort({ date: -1 })
	});

// =============================================================================
// normal routes ===============================================================
// =============================================================================
	// show the home page (will also have our login links)
//	app.get('/', function(req, res) {
//		res.render('index.ejs');
//	});

const signToken = id => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
	  expiresIn: process.env.JWT_EXPIRES_IN })
}
  
const createSendToken = (user, statusCode, req, res) => {
	console.log('createSendToken user',user)
	console.log('statusCode',statusCode)

	req.logIn(user, function(err) {
		if (err) { return res.err }
		//return res.redirect('/profile/' + user.username);
		//return res.send(200)
		return res.send(200)
	})

//const token = signToken(user._id);
//
//res.cookie('jwt', token, {
//	expires: new Date(
//	Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
//	),
//	httpOnly: true,
//	secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
//});
//
//// Remove password from output
//user.password = undefined;
//
//res.status(statusCode).json({
//	status: 'success',
//	token,
//	data: {
//	user
//	}
//});
};

app.post('/api/checkout', async (req, res) => {
	let body = req.body.items
	//console.log('checkout body = ' + JSON.stringify(body))
	//let body = req.body.items.map( item => {
	//	let data = {
	//		price: item.id, 
	//		quantity: item.quantity
	//	}
	//	return data
	//})


	let userid = req.body.userid
	// let shipping = req.body.address
	// let body = JSON.stringify(req.body.items)
	//console.log('checkout items = ' + JSON.stringify(body))
	// console.log('server userid = ' + JSON.stringify(userid))
	// console.log('server shipping = ' + JSON.stringify(shipping))
	
	const session = await stripe.checkout.sessions.create({
		billing_address_collection: 'auto',
    	shipping_address_collection: {
			allowed_countries: ['US'],
		},
		payment_method_types: ['card'],
		line_items: body,
		mode: 'payment',
		//success_url: 'https://authorapp.herokuapp.com/checkout',
		success_url: 'http://localhost:3000/checkout',
		//cancel_url: 'https://authorapp.herokuapp.com/shop',
		cancel_url: 'http://localhost:3000/shop',
	});
	//res.json({ id: session.id });
	const orderObj = new Order({
		sessionid                     : session.id,
		userid                        : userid,
		date                          : new Date(),
		payment_status                : "unpaid",  
	  })
	  orderObj.save((err)=>{
		if(err){
		//console.log(err);
		res.send('Unable to save order data!');
		}
		else
		//res.send('order data saved successfully!');
		res.json({ id: session.id });
	})
	
});

	app.get('api/users', (req, res, next) => {
		if (req.user && req.user.isAdmin) {
			next();
		return;
	}
	res.status(401).send('Not authorized');
   });


	app.get('/api/fetchUser', async (req, res, next) => {
        if (req.user){
			res.send(req.user);
			next();
			return
		}
		res.status(401).send('Not authorized');
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

	app.post('/auth/forgotPassword', async (req, res, next) => {
		// 1) Get user based on POSTed email
		const user = await User.findOne({ 'local.email': req.body.email });
		if (!user) {
		  return next(new AppError('There is no user with email address.', 404));
		}
		//console.log('user', user)
		// 2) Generate the random reset token
		const resetToken = user.createPasswordResetToken();
		//console.log('resetToken', resetToken)
		await user.save({ validateBeforeSave: false });
	  
		//console.log('user token', user)
		// 3) Send it to user's email
		try {
		  //const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
		  const resetURL = `${req.protocol}://${req.get('host')}/authentication/api/v1/users/resetPassword/${resetToken}`;
		  console.log('resetURL', resetURL)
		  await new Email(user, resetURL).sendPasswordReset();
	  
		  res.status(200).json({
			status: 'success',
			message: 'Password reset token sent to email! Link is valid for 10 minutes!'
		  });
		} catch (err) {
		  user.local.passwordResetToken = undefined;
		  user.local.passwordResetExpires = undefined;
		  await user.save({ validateBeforeSave: false });
	  
		  return next(
			new AppError('There was an error sending the email. Try again later!'),
			500
		  );
		}
	  });

	app.patch('/auth/resetPassword/:token', async (req, res, next) => {
		console.log('resetPassword start')
		// passport.authenticate('reset-password', //{
		// 		//successRedirect : '/', // redirect to the secure profile section
		// 		//failureRedirect : '/', // redirect back to the signup page if there is an error
		// 		//failureFlash : true // allow flash messages
		// //}
		// function(err, user, info) {
		// 	console.log("resetPassword")
		// 	if (err) {
		// 		console.log("err",err)
		// 		return next(err); 
		// 	}
		// 	if (!user) { 
		// 		console.log("info",info)
		// 		return res.send(info); 
		// 	}
		// 	req.logIn(user, function(err) {
		// 		if (err) { 
		// 			console.log("err",err)
		// 		  	return next(err); 
		// 		}
		// 	  // return res.redirect('/profile/' + user.username);
		// 	  console.log("user",user)
		// 	  return res.send(200)
		// 	});
		//   })(req, res, next);

		// 1) Get user based on the token
		console.log('resetPassword start')
		console.log('req.params.token',req.params.token)
		const hashedToken = crypto
			.createHash('sha256')
			.update(req.params.token)
			.digest('hex');
		console.log('hashedToken',hashedToken)
		const user = await User.findOne({ 
			'local.passwordResetToken': hashedToken, 
			'local.passwordResetExpires': { $gt: Date.now() }
		})
		console.log('passwordResetToken user',user)
		// 2) If token has not expired, and there is user, set the new password
		if (!user) {
			return next(new AppError('Token is invalid or has expired', 400));
		}

		user.correctPassword(req.body.password,req.body.confirm_password)
		console.log('req',req.body)
		user.local.password = user.generateHash(req.body.password);
		user.local.passwordConfirm = user.generateHash(req.body.confirm_password);
		user.local.passwordResetToken = undefined;
		user.local.passwordResetExpires = undefined;
		await user.save();

		const url = `${req.protocol}://${req.get('host')}/authentication`;
		console.log(url);
		new Email(user, url).sendWelcome();

		// 3) Update changedPasswordAt property for the user
		// 4) Log the user in, send JWT
		createSendToken(user, 200, req, res);
	})
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
					address1	: req.body.address1,
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
		app.post('/auth/login', function(req, res, next) {
			passport.authenticate('local-login', //{
				//successRedirect : '/', // redirect to the secure profile section
				//failureRedirect : '/', // redirect back to the signup page if there is an error
				//failureFlash : true // allow flash messages
			//}
			function(err, user, info) {
			  if (err) { return next(err); }
			  if (!user) { return res.send(info); }
			  req.logIn(user, function(err) {
				if (err) { return next(err); }
				//return res.redirect('/profile/' + user.username);
				return res.send(200)
			  });
			}
			)(req, res, next);
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
		app.post('/auth/signup', function(req, res, next) {
			passport.authenticate('local-signup', //{
				//successRedirect : '/', // redirect to the secure profile section
				//failureRedirect : '/', // redirect back to the signup page if there is an error
				//failureFlash : true // allow flash messages
			//}
			function(err, user, info) {
			  if (err) { return next(err); }
			  if (!user) { return res.send(info); }
			  req.logIn(user, function(err) {
				if (err) { return next(err); }
				// return res.redirect('/profile/' + user.username);
				return res.send(200)
			  });
			})(req, res, next);
		});
		

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
		app.post('/connect/local', function(req, res, next) {
			passport.authenticate('local-signup', //{
			//successRedirect : '/profile', // redirect to the secure profile section
			//failureRedirect : '/connectLocal', // redirect back to the signup page if there is an error
			//failureFlash : true // allow flash messages
		//}
			function(err, user, info) {
				if (err) { return next(err); }
				if (!user) { return res.send(info); }
				req.logIn(user, function(err) {
				if (err) { return next(err); }
				//return res.redirect('/profile');
				return res.send(200)
				});
			})(req, res, next);
		});

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
		//console.log('unlink')
		var user            = req.user;
		//console.log('user',user)
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
