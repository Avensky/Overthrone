//==============================================================================
// set up ======================================================================
//==============================================================================
const express       = require('express')
const app           = express()
const PORT          = process.env.PORT || 5000;
const dotenv        = require('dotenv');
const morgan        = require('morgan');
const helmet        = require('helmet');
const bodyParser    = require('body-parser')
const cookieParser  = require('cookie-parser');
const session       = require('express-session')
const passport      = require('passport')
const mongoose      = require('mongoose')
const keys          = require('./config/keys')
const userRouter    = require('./app/routes/userRoutes');
const cors          = require("cors");
const flash         = require('connect-flash')

//==============================================================================
// configuration ===============================================================
//==============================================================================
//require('./app/models/user');
require('./app/models/character');
require('./app/models/faq');
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


// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

// Set security HTTP headers
// app.use(helmet());

// app.use(logger('dev')); // log every request to the console
app.use(express.json())

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
//  const limiter = rateLimit({
//    max: 100,
//    windowMs: 60 * 60 * 1000,
//    message: 'Too many requests from this IP, please try again in an hour!'
//  });
//  app.use('/api', limiter);

// read cookies (needed for auth)
app.use(cookieParser());

//app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false})) // get information from html forms

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
app.use(flash()); // use connect-flash for flash messages stored in session
//==============================================================================
// routes ======================================================================
//==============================================================================
require('./app/routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./app/routes/characterRoutes.js')(app); // load our routes and pass in our app and fully configured passport
// require('./app/routes/faqRoutes.js')(app); // load our routes and pass in our app and fully configured passport
require('./app/routes/userRoutes');
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