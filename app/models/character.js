//==============================================================================
// set up ======================================================================
//==============================================================================
const mongoose = require('mongoose');
const { Schema } = mongoose;

// define the schema for our user model
const characterSchema = new Schema({
    name : {
        type: String
    },
    age : {
        type: String
    },
    relatives : {
        type: String
    },
    bio : {
        type: String
    }

});

//==============================================================================
// methods =====================================================================
//==============================================================================


// create the model for users and expose it to our app
//module.exports = mongoose.model('User', characterSchema);
mongoose.model('Character', characterSchema);

