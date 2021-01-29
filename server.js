//==============================================================================
// set up ======================================================================
//==============================================================================
const express        = require('express')
const app            = express()
const PORT           = process.env.PORT || 5000;
const dotenv         = require('dotenv');
//const morgan         = require('morgan');
//const helmet         = require('helmet');
const bodyParser     = require('body-parser')
//const cookieParser   = require('cookie-parser');
const session        = require('express-session')
const passport       = require('passport')
const mongoose       = require('mongoose')
const keys           = require('./config/keys')
const userRouter     = require('./app/routes/userRoutes');
const cors           = require("cors");
//const flash          = require('connect-flash')
const endpointSecret ='whsec_8uBYP8hWJrpcTob7wWS1MWJsYcEIVSzR'
const Stripe        = require('stripe');
const stripe         = Stripe('sk_test_wW4sfPcu5VmY5BKqyP6zpdkK00qDrwAYXT');

//==============================================================================
// configuration ===============================================================
//==============================================================================
//require('./app/models/user');
require('./app/models/character');
require('./app/models/faq');
require('./app/models/shop');
require('./config/passport')(passport); // pass passport for configuration

dotenv.config({ path: './config/config.env' });

mongoose.Promise = global.Promise;// connect to our database

mongoose.connect(keys.mongoURI, { 
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true 
})
  .then(connect => console.log('connected to mongodb'))
  .catch(err => console.log('could not connect to mongodb', err))
module.exports = {mongoose}

// allow files to be stored in files directory
// app.use('/files', express.static("files"));

// set up cors to allow us to accept requests from our client
// app.use(
//   cors({
//     origin: "http://localhost:3000", // allow to server to accept request from different origin
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true // allow session cookie from browser to pass through
//   })
// );

// Set security HTTP headers
// app.use(helmet());

// app.use(logger('dev')); // log every request to the console
// app.use(express.json())

// Development logging
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

// Limit requests from same API
//  const limiter = rateLimit({
//    max: 100,
//    windowMs: 60 * 60 * 1000,
//    message: 'Too many requests from this IP, please try again in an hour!'
//  });
//  app.use('/api', limiter);

// read cookies (needed for auth)
//app.use(cookieParser());

//app.use(bodyParser.urlencoded({extended: false})) // get information from html forms
//app.use(bodyParser.json())

//app.use(bodyParser.json({
//  verify: (request, result, buf) => {
//   request.rawBody = buf
//  }
//}))

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next();
  } else {
    cors({
      origin: "http://localhost:3000", // allow to server to accept request from different origin
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true // allow session cookie from browser to pass through
    })
    bodyParser.json()(req, res, next)
    bodyParser.urlencoded({extended: false})
  }
});

const fulfillOrder = (session) => {
	// TODO: fill me in
	console.log("Fulfilling order", session);
}
  
const createOrder = (session) => {
// TODO: fill me in
console.log("Creating order", session);
}

const emailCustomerAboutFailedPayment = (session) => {
// TODO: fill me in
console.log("Emailing customer", session);
}
  
app.post('/webhook', bodyParser.raw({type: 'application/json'}), (req, res) => {
//app.post('/webhook', (request, response) => {
	//const payload = req.body;
	//const payload = JSON.stringify(request.body);
	//const payload = request.rawBody;
	//console.log('rawBody' + JSON.stringify(payload))
	const sig = req.headers['stripe-signature'];
  
	let event;
  
	try {
    //console.log('rawBody = ' + JSON.stringify(payload))
    //console.log('rawBody = ' + payload)
    //console.log('sig = ' + sig)
    //console.log('endpointSecret = ' + endpointSecret)
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    
	} catch (err) {
    console.log('Webhook Error = '+ err.message)
	  return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
    // Successfully constructed event
    console.log('✅ Success:', event.id);
	
	switch (event.type) {
		case 'checkout.session.completed': {
		  const session = event.data.object;
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


// Data sanitization against NoSQL query injection
// app.use(mongoSanitize());

// Data sanitization against XSS
// app.use(xss());

// required for passport
app.use(session({ 
  secret: 'ilovescotchscotchyscotchscotch',   // session secret
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 30*24*60*60*1000,
  }}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session
//==============================================================================
// routes ======================================================================
//==============================================================================
require('./app/routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./app/routes/characterRoutes.js')(app); // load our routes and pass in our app and fully configured passport
// require('./app/routes/faqRoutes.js')(app); // load our routes and pass in our app and fully configured passport
require('./app/routes/userRoutes');
require('./app/routes/shopRoutes')(app);

// app.use('/api/v1/users', userRouter);
//==============================================================================
// launch ======================================================================
//==============================================================================
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const server = app.listen(PORT, (err) =>{
  if(!err)
      console.log('server started running on: ' + PORT);
  else
      console.log('unable to start server');    
})