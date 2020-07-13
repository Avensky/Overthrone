//==============================================================================
// set up ======================================================================
//==============================================================================
const mongoose = require('mongoose');
const { Schema } = mongoose;

// define the schema for our user model
const faqSchema = new Schema({
    question : {
        type: String
    },
    answer : {
        type: String
    }
});

//==============================================================================
// methods =====================================================================
//==============================================================================


// create the model for users and expose it to our app
//module.exports = mongoose.model('User', characterSchema);
mongoose.model('Faq', faqSchema);

