const usersController   = require('../controllers/usersController');
const shopController   = require('../controllers/shopController');
const stripeController   = require('../controllers/stripeController');
const mongoose          = require('mongoose');
const Users             = mongoose.model('Users');
const Order             = mongoose.model('Order');
const Email             = require('./../utils/email');
const crypto            = require('crypto');
const keys              = require('../../config/keys');
// load the auth variables

module.exports = function(app, passport) {
	app.get('/api/items',     shopController.getProducts);
	app.get('/api/getProduct/:id',  shopController.getProduct);
  
	app.post('/api/checkout',       shopController.createSession);
	app.post('/webhook',            stripeController.webhook);

	app.post('/api/orders', (req,res) =>{          //get all faqs info from db
		let id = req.body
		console.log('id = ' + JSON.stringify(id));	
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
    // =============================================================================
    // User ========================================================================
    // =============================================================================
    
    // getUser 
    app.get('/api/fetchUser', usersController.getUser);

    // logout
    app.get('/api/logout', function(req, res) {
        console.log('/api/logout ');
        req.logout();
        res.status(200).json({
            user:null,
            message:'logout successful'
        })
        
    });
 // =============================================================================
    // Local Accounts ==============================================================
    // =============================================================================
    
    // Login
    app.post('/api/login', function(req, res,) {
        passport.authenticate('local-login', (err, user, info) =>{
            if (err) { 
                console.log('err', err);
                return res.status(200).json({err}); 
            }

            if (!user) { 
                console.log('info', info);
                return res.status(200).json({info}); 
            }

            req.logIn(user, function(err) {
                console.log('user = ', user);
                if (err) { 
                    return res.status(200).json({info:{
                        user:null,
                        message: err
                    }})
                }
                //return res.redirect('/profile/' + user.username);
                return res.status(200).json({info});
            });
        })(req, res);
    });

    // REGISTER 
    app.post('/api/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) { 
                console.log('err', err);
                return res.status(200).json({err}); }
            if (!user) { 
                console.log('info', info);
                return res.status(200).json({info}); 
            }
            req.logIn(user, function(err) {
                console.log('user', user);
                if (err) { 
                    return res.status(200).json({info:{
                        user:null,
                        message: err
                    }})
                };
                return res.status(200).json({info});
            });
        })(req, res, next);
    });

    // RESET PASSWORD

    app.post('/api/resetPassword/:token', async(req, res, next) => {

        // 1) Get user based on the token
        console.log('params = ',req.params.token)
        const hashedToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        console.log('hashedToken = ',hashedToken)

        const user = await Users.findOne({
            'local.passwordResetToken': hashedToken,
            'local.passwordResetExpires': { $gt: Date.now() }
        });

        // 2) If token has not expired, and there is user, set the new password
        if (!user) {
            return  res.status(200).json({info:{
                user: null,
                message:'Token is invalid or has expired'
            }});
        }

        console.log('user=  ',user);
        console.log('req.body=  ',req.body);
        user.local.password = user.generateHash(req.body.password);
        // user.local.passwordConfirm = req.body.passwordConfirm;
        user.local.passwordResetToken = undefined;
        user.local.passwordResetExpires = undefined;
        await user.save();
        
        // 3) Update changedPasswordAt property for the user
        // 4) Log the user in
        req.logIn(user, function(err) {
            console.log('user', user);
            if (err) { 
                return res.status(200).json({info:{
                    user:null,
                    message: err
                }})
            };
            return res.status(200).json({info:{
                user:user,
                message:'Successfully updated password'}});
        });
    });


    // FORGOT PASSWORD 

    app.post('/api/forgotPassword', async(req, res, next) =>  {
        console.log('forgot password',req.body);

        // 1) Get user by email
        const user = await Users.findOne({ 'local.email': req.body.email });
        if (!user) {
            return res.status(200).json({info:{
                user: null,
                message:'Email not found!'
            }});
        }
        console.log('user', user)

        // 2) Generate the random reset token
        const resetToken = user.createPasswordResetToken();
        console.log('resetToken', resetToken)
        await user.save({ validateBeforeSave: false });
        //console.log('user token', user);

        // 3) Send it to user's email
        try {
            //const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
            const resetURL = `${req.protocol}://${req.hostname}${keys.clientPort}/resetPassword/${resetToken}`;
            console.log('resetURL', resetURL)
            console.log('user', user)
            const email = user.local.email
            await new Email(user, email, resetURL).sendPasswordReset();
            return res.status(200).json({info:{
                status: 'success',
                message: 'Password reset token sent to email! Link is valid for 10 minutes!'
            }});
        } catch (err) {
            console.log('err', err)
            user.local.passwordResetToken = undefined;
            user.local.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });
            
            return res.status(500).json({info:{
                status: 'error',
                message: 'There was an error sending the email. Try again later!'
            }});
        }
    });












    // Connect a local account if user is already logged in
	app.post('/api/connect/local', function(req, res, next) {
		passport.authenticate('local-signup', function(err, user, info) {
			if (err) { return next(err); }
			if (!user) { return res.send(info); }
			req.logIn(user, function(err) {
			if (err) { return next(err); }
			//return res.redirect('/profile');
			return res.send(200)
			});
		})(req, res, next);
	});

    // Disonnect a local account if user is already logged in on another account
    app.get('/api/unlink/local', function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/shop');
        });
    });

    // ==========================================================================
    // FACEBOOK ROUTES ==========================================================
    // ==========================================================================
    
    //facebook login
    app.get('/api/facebook', 
        passport.authenticate('facebook', { 
            scope : ['public_profile', 'email'] 
        })
    );

    // handle the callback after facebook has authenticated the user
    app.get('/api/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/shop',
            failureRedirect : '/'
        })
    );

    //  Connect a facebook account if user is already logged in
    app.get('/api/connect/facebook', 
        passport.authorize('facebook', { 
            scope : 'email' 
        })
    );

    // handle the callback after facebook has authorized the user
    app.get('/api/connect/facebook/callback',
        passport.authorize('facebook', {
            successRedirect : '/shop',
            failureRedirect : '/'
        })
    );
     
    // removing the token in case user wants to reconnect
    app.get('/api/unlink/facebook', function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // ==========================================================================
    // GOOGLE ROUTES ============================================================
    // ==========================================================================
    
    // profile gets us their basic information including their name email 
    app.get('/api/google',
        passport.authenticate('google', { 
            scope : ['profile', 'email'] 
        })
    );

    // the callback after google has authenticated the user
    app.get('/api/google/callback',
        passport.authenticate('google', {
            successRedirect : '/shop',
            failureRedirect : '/'
        })
    );


    // Connect a google account if user is already logged in
    app.get('/api/connect/google', 
        passport.authorize('google', { 
            scope : ['profile', 'email'] 
        }) 
    );

    // the callback after google has authorized the user
    app.get('/api/connect/google/callback',
        passport.authorize('google', {
            successRedirect : '/shop',
            failureRedirect : '/'
        })
    );

   // removing the token in case user wants to reconnect
    app.get('/api/unlink/google', function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

