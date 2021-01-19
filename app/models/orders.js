//==============================================================================
// set up ======================================================================
//==============================================================================
const mongoose  = require('mongoose');

// define the schema for our user model
const ordersSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, "Please include the product id"]
    },
    name: {
        type: String,
        required: [true, "Please include the product name"]
    },
    desc: {
        type: String,
        required: [true, "Please include the product description"]
    },
    price: {
        type: Number,
        required: [true, "Please include the product price"]
    },
    image: {
        type: String,
        required: false
    },
    quantity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    purchaseId: {
        type: Number,
    },
    customerId: {
        type: Number
    },
    shipping: {
        name: {
          type          : String,
          //required      : [false, 'Please tell us your name!']
        },    
        phone: {
          type          : Number,
        },
        address1: {
          type          : String
        },    
        address2: {
          type          : String
        },
        city: {
          type          : String
        },
        state: {
          type          : String
        },
        zipCode: {
          type          : Number
        },
        email: {
          type          : String,
          //required      : [false, 'Please provide your email'],
          //unique        : true,
          lowercase     : true,
          //validate      : [validator.isEmail, 'Please provide a valid email']
        }
    }
});

//==============================================================================
// methods =====================================================================
//==============================================================================


// create the model for users and expose it to our app
const Product = mongoose.model("Product", ordersSchema);
module.exports = Product;
