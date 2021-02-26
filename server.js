//==============================================================================
// set up ======================================================================
//==============================================================================
const express        = require('express')
const app            = express()
const dotenv	       = require('dotenv').config()
const PORT           = process.env.PORT || 5000;
console.log('PORT = '+ PORT)
//const morgan         = require('morgan');
//const helmet         = require('helmet');
const bodyParser     = require('body-parser')
//const cookieParser   = require('cookie-parser');
const session        = require('express-session')
const passport       = require('passport')
const mongoose       = require('mongoose')
const keys           = require('./config/keys')
const userRouter     = require('./app/routes/userRoutes');
//const cors           = require("cors");
//const flash          = require('connect-flash')
const endpointSecret ='whsec_8uBYP8hWJrpcTob7wWS1MWJsYcEIVSzR'
const Stripe         = require('stripe');
const stripe         = Stripe('sk_test_wW4sfPcu5VmY5BKqyP6zpdkK00qDrwAYXT');

//==============================================================================
// configuration ===============================================================
//==============================================================================
//require('./app/models/user');
require('./app/models/character');
require('./app/models/faq');
require('./app/models/shop');
require('./app/models/orders');
require('./config/passport')(passport); // pass passport for configuration

mongoose.Promise = global.Promise;// connect to our database

mongoose.connect(keys.mongoURI, { 
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true 
})
  .then(connect => console.log('connected to mongodb'))
  .catch(err => console.log('could not connect to mongodb', err))
module.exports = {
	mongoose
}

// allow files to be stored in files directory
app.use('/files', express.static("files"));

// set up cors to allow us to accept requests from our client


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


// Use JSON parser for all non-webhook routes
// app.use((req, res, next) => {
//   if (req.originalUrl === '/webhook') {
//     next();
//   } else {
//     // set up cors to allow us to accept requests from our client
//     cors({
//       origin: "http://localhost:3000", // allow to server to accept request from different origin
//       methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//       credentials: true // allow session cookie from browser to pass through
//     })
//     bodyParser.json()(req, res, next)
//     bodyParser.urlencoded({extended: false})
//   }
// });




// cors({
//   origin: "http://localhost:3000", // allow to server to accept request from different origin
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true // allow session cookie from browser to pass through
// })
// bodyParser.json()(req, res, next)
//bodyParser.urlencoded({extended: false})




app.use(bodyParser.json({ verify: ( req, res, buf ) => { req.rawBody = buf }}))

const Order         = mongoose.model('Order')  

const fulfillOrder = (session) => {
	// TODO: fill me in
	console.log("Fulfilling order", session);
}

const createOrder =  async (session) => {
  // TODO: fill me in
  console.log("Creating order", session);
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
      metadata                      : session.metadata,
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

// const order = await stripe.orders.create({
//   currency                      : session.currency,
//   email                         : session.customer_details.email,
//   items                         : sessionRetrieve.line_items.data,
//   shipping : {
//     address: {
//       city    	                : session.shipping.address.city, 
//       country		                : session.shipping.address.country,
//       line1	                    : session.shipping.address.line1,
//       line2	                    : session.shipping.address.line2,
//       postal_code 	            : session.shipping.address.postal_code,
//       state   	                : session.shipping.address.state
//     },
//     name    	                  : session.shipping.name, 
//   }
// });

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
    console.log('Webhook Error = '+ err.message)
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
  console.log("node env = "+process.env.NODE_ENV)
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
