//= =============================================================================
// set up ======================================================================
//= =============================================================================
const express = require('express');

const app = express();
const PORT = process.env.PORT3 || 5000;
// console.log('PORT = '+ PORT);
// const morgan         = require('morgan');
// const helmet         = require('helmet');
const bodyParser = require('body-parser');
// const cookieParser   = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const keys = require('./config/keys');
const userRouter = require('./app/routes/userRoutes');
// const cors           = require("cors");
// const flash          = require('connect-flash');

//= =============================================================================
// configuration ===============================================================
//= =============================================================================
// require('./app/models/user');
require('./app/models/character');
require('./app/models/faq');
require('./app/models/shop');
require('./app/models/orders');
require('./app/models/products');
require('./app/models/users');
require('./app/controllers/passport')(passport); // pass passport for configuration

async function main() {
  mongoose.set('strictQuery', false);
  await mongoose.connect(keys.mongoURI, {
    autoIndex: process.env.NODE_ENV !== 'production',
  });
}

// connect to database
main().catch((err) => { console.log('💥Failed to connect to MongoDb', err); });

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
// app.use(cookieParser());

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
// bodyParser.urlencoded({extended: false})

app.use(bodyParser.json({ verify: (req, res, buf) => { req.rawBody = buf; } }));

// Data sanitization against NoSQL query injection
// app.use(mongoSanitize());

// Data sanitization against XSS
// app.use(xss());

// required for passport
app.use(session({
  secret: 'ilovescotchscotchyscotchscotch', // session secret
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    client: mongoose.connection.getClient(),
    collectionName: 'sessions',
    stringify: false,
    ttl: 14 * 24 * 60 * 60, // = 14 days. Default)
    // crypto: {secret: 'squirrel'}
  }),
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// app.use(flash()); // use connect-flash for flash messages stored in session
//= =============================================================================
// routes ======================================================================
//= =============================================================================
require('./app/routes/routes')(app, passport); // load our routes and pass in our app and fully configured passport
require('./app/routes/characterRoutes')(app); // load our routes and pass in our app and fully configured passport
// require('./app/routes/faqRoutes')(app);
// load our routes and pass in our app and fully configured passport
require('./app/routes/userRoutes');
require('./app/routes/shopRoutes');

app.use('/api/v1/users', userRouter);
//= =============================================================================
// launch ======================================================================
//= =============================================================================
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

const server = app.listen(PORT, (err) => {
  if (!err) {
    console.log(`server started running on: ${PORT}`);
    console.log(`node env = ${process.env.NODE_ENV}`);
  } else { console.log('unable to start server'); }
});
