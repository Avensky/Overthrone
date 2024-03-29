const mongoose          = require('mongoose');
const Products          = mongoose.model('Products');
const keys              = require('../../config/keys');
const Stripe            = require('stripe');
const ordersController  = require('./ordersController');
const stripe            = Stripe(keys.stripeSecretKey);
const Email             = require('../utils/email');

exports.getProducts = (req, res) => {
    Products.find(
        {},(err, doc)=>{
        if(doc) return res.status(200).json(doc);
            else return res.status(500).json({
                status: false,
                error: `oops! ${err}`
            });
        }
    );
};

exports.getProduct = async (req, res) => {
    try {     
        let product = await Products.findById({_id : req.params.id},{})
        res.status(200).json({
            status: true,
            data: product,
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            error: `oops! ${err}`
        });
    };
};

exports.createSession = async (req, res) => {
    console.log('req.body', req.body);
    // let body = req.body;
    console.log('checkout body = ', req.body);
    console.log('checkout items = ', req.body.items);

    const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
        shipping_address_collection: {
            allowed_countries: ['US'],
        },
        payment_method_types: ['card'],
        line_items: req.body.items,
        mode: 'payment',
        success_url: keys.checkoutSuccessUrl,
        cancel_url: keys.checkoutCancelUrl,
    });
  
    let userid;
    req.body.userid
        ? userid = req.body.userid
        : null;
  
    ordersController.createOrder(res, session, userid)
};

exports.updateSession = async(req, res, session) => {
    // TODO: fill me in
    //console.log("Creating order", session);
    const sessionRetrieve = await stripe.checkout.sessions.retrieve(
        session.id, { expand: ['line_items'],},
    );
    console.log("sessionRetrieve ", sessionRetrieve);
    //console.log("sessionRetrieve line_items", sessionRetrieve.line_items);
    let line_items = sessionRetrieve.line_items.data.map( (item) => {
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

    //    let products_update = line_items.map( item => {
    //      let product = Products.find({
    //          priceid : item.id
    //        },(err,doc)=>{
    //            if(doc)
    //                res.send('Product updated successfully!');
    //            else {
    //                res.err(err.message);
    //            }
    //        })
    //      return product
    //    })

    // increase items sold;
    // productsSold(line_items)

    // console.log('line_items = ' + JSON.stringify(line_items))
    ordersController.updateOrder(res, session, line_items);
};

exports.fulfillOrder = (req, res, session) => {
    //console.log('session',session)
    const url = `${req.protocol}://${req.get('host')}/home`;
    //console.log(url);
    const email = session.customer_details.email
    new Email(req.user, email, url).sendReceipt();
    // TODO: fill me in
    console.log("Fulfilling order, sending email to ", email);
}

exports.emailCustomerAboutFailedPayment = (req, session) => {
    //console.log('session',session)
    const url = `${req.protocol}://${req.get('host')}/cart`;
    //console.log(url);

    const email = session.customer_details.email
    new Email(req.user, email, url).sendFailure();

    // TODO: fill me in
    console.log("Emailing customer failed payment", session);

}

// count every item sold

//exports.productsSold = (products) => {
//    // console.log('products'+JSON.stringify(products))
//    console.log('products length'+products.length);
//    const length = products.length;
//    for (let i = 0; i < length; i++) {
//      console.log('i = ',i);
//      console.log('price.id = ',products[i].price.id);
//      console.log('quantity = ',products[i].quantity);
//      console.log('item = '+JSON.stringify(products[i]));
//      let inc = products[i].quantity;
//      
//      Products.findOneAndUpdate(
//        { priceid : products[i].price.id }, 
//        { $inc: { 
//            sold : inc
//          }
//        },
//        { new: true, useFindAndModify: false },(err,doc)=>{
//          if(doc)
//              console.log('Product updated successfully!');
//          else {
//            console.log(err.message);
//          }
//      });
//    };
//  };




// exports.removeProduct = async id => {
//     const product = await Product.findByIdAndRemove(id);
//     return product
// }

//const Product = require("../models/shop");

// exports.createProduct = async (req, res) => {
//     console.log('createProduct : ', req.body);
//     const productObj = {
//         name        : req.body.name,
//         desc        : req.body.desc,
//         price       : req.body.price,
//         priceid     : req.body.priceId,
//         quantity    : req.body.quantity,
//         featured    : req.body.featured,
//         type        : req.body.type,
//         imageData   : req.file.key,
//     }   
//     const newProduct = await Product.create(productObj);
//     return res.json(newProduct)
// }
// 
// exports.getProducts = async (req, res) => {
//     try {
//         let products = await productRepository.getProducts();
//         res.status(200).json({status: true, data: products,})
//         //res.status(200).json({products})
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({error: err, status: false,})
//     }
// }
// 
// exports.getProductById = async (req, res) => {
//     try {
//         let id = req.params.id
//         let productDetails = await productRepository.productById(id);
//         res.status(200).json({
//             status: true,
//             data: productDetails,
//         })
//     } catch (err) {
//         res.status(500).json({
//             status: false,
//             error: err
//         })
//     }
// }
// exports.removeProduct = async (req, res) => {
//     try {
//         let id = req.params.id
//         let productDetails = await productRepository.removeProduct(id)
//         res.status(200).json({
//             status: true,
//             data: productDetails,
//         })
//     } catch (err) {
//         res.status(500).json({
//             status: false,
//             error: err
//         })
//     }
// }