//==============================================================================
// set up ======================================================================
//==============================================================================
const mongoose  = require('mongoose');

// define the schema for our user model
const productSchema = new mongoose.Schema({
    priceid: {
        type: String,
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
    }
});

//==============================================================================
// methods =====================================================================
//==============================================================================


// create the model for users and expose it to our app
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
