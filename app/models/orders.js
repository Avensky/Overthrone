//==============================================================================
// set up ======================================================================
//==============================================================================
const mongoose  = require('mongoose');

// define the schema for our user model
const orderSchema = new mongoose.Schema({
  id                    : {type          : String},
  object                : {type          : String},
  //allow_promotion_codes: null,
  amount_subtotal       : {type          : Number},
  amount_total          : {type          : Number},
  //billing_address_collection: null,
  cancel_url            : {type          : String},
  //client_reference_id: null,
  currency              : {type          : String},
  customer              : {type          : String},
  customer_details: {  
    email               : {type          : String}, 
    tax_exempt          : {type          : String}, 
    //tax_ids             : [] 
  },
  //  customer_email        : null,
  // livemode              : false,
  livemode              : {type          : Boolean},
  //  locale                : null,
  //metadata              : {},
  //metadata              : {type          : String},
  mode                  : {type          : String},
  payment_intent        : {type          : String},
  payment_method_types  :[{type          : String}],
  payment_status        : {type          : String},
  // setup_intent          : null,
  // shipping              : null,
  // shipping_address_collection: null,
  // submit_type           : null,
  // subscription          : null,
  success_url           : {type          : String},
  total_details: { 
    amount_discount     : {type          : Number}, 
    amount_tax          : {type          : Number}
  },
//  id                    : { type: Number },
//  object                : { type: String},
//  desc                  : { type: String},
//  price                 : { type: Number},
//  image                 : { type: String},
//  quantity              : { type: Number  },
//  date                  : { type: Date},
//  purchaseId            : { type: Number},
//  customerId            : { type: Number },
//  
//  shipping: {
//      name: {
//        type          : String,
//        //required      : [false, 'Please tell us your name!']
//      },    
//      phone: {
//        type          : Number,
//      },
//      address1: {
//        type          : String
//      },    
//      address2: {
//        type          : String
//      },
//      city: {
//        type          : String
//      },
//      state: {
//        type          : String
//      },
//      zipCode: {
//        type          : Number
//      },
//      email: {
//        type          : String,
//        //required      : [false, 'Please provide your email'],
//        //unique        : true,
//        lowercase     : true,
//        //validate      : [validator.isEmail, 'Please provide a valid email']
//      }
//  }
})

//==============================================================================
// methods =====================================================================
//==============================================================================


// create the model for users and expose it to our app
// mongoose.model("Order", orderSchema);
// create the model for users and expose it to our app
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;