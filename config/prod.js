module.exports = {

    mongoURI: process.env.MONGO_URI,
    cookieKey               : process.env.COOKIE_KEY,
    stripePublishableKey    : process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey         : process.env.STRIPE_SECRET_KEY,

    googleClientID          : process.env.GOOGLE_CLIENT_ID,
    googleClientSecret      : process.env.GOOGLE_CLIENT_SECRET,
//    googleCallbackURL             : 'http://localhost:5000/auth/google/callback'

    facebookClientID        : process.env.FACEBOOK_CLIENT_ID, // your App ID
    facebookClientSecret    : process.env.FACEBOOK_CLIENT_SECRET, // your App Secret
//    facebookCallbackURL     : 'http://localhost:5000/auth/facebook/callback',
//    facebookProfileURL      : 'https://graph.facebook.com/v3.2/me?fields=first_name,last_name,email',
//    facebookProfileFields   : ['id', 'email', 'name'], // For requesting permissions from Facebook API

    twitterConsumerKey      : process.env.TWITTER_CONSUMER_KEY,
    twitterConsumerSecret   : process.env.TWITTER_CONSUMER_SECRET,
//    twitterCallbackURL      : 'http://localhost:5000/auth/twitter/callback',
 
}