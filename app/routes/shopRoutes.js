// const router = require("express").Router();
const productController = require("../controllers/shopController");
const multerInstance = require('../../multer')
const productRepository = require('../repository')
// load all the things we need
const mongoose              = require('mongoose')
// load up the user model
const Product             = mongoose.model('Product')

module.exports = function(app) {
    // app.post("/", multerInstance.upload.single('image'), productController.createProduct);
    // app.get("/api/items", async (req, res) => {
    //     try {
    //         let products = await productRepository.products();
    //         res.status(200).json({
    //             status: true,
    //             data: products,
    //         })
    //     } catch (err) {
    //         console.log(err)
    //         res.status(500).json({
    //             error: err,
    //             status: false,
    //         })
    //     }
    // })

    // app.get("/:id", productController.getProductById);
    // app.delete("/:id", productController.removeProduct);

    app.get('/api/items', (req,res) =>{          //get all items info from db
        Product.find({},(err,doc)=>{
            if(doc)
                res.json(doc);
            else {
                res.err(err);
            }
        })
    });

    app.post('/api/addProduct',(req,res) => {        //add a new item
    //    const { title, author, content} = req.body;
    const itemObj = new Product({
        name        : req.body.name,
        desc        : req.body.desc,
    //        itemId : req.body.itemid,
        price       : req.body.price,
        image       : req.body.image,
        quantity    : req.body.quantity,

    })
    itemObj.save((err)=>{
        if(err){
        console.log(err);
        res.send('Unable to save item data!');
        }
        else
        res.send('item data saved successfully!');
    })
    });

    app.get('/api/getitemDetails/:itemid',(req,res)=>{              //get a item details
    Product.findOne({_id : req.params.itemid},{},(err,doc)=>{
        if(doc)
            res.json(doc);
        else {
            res.status(404).send('Ops!Detail not found');
        }
    })
    });   


    app.get('/api/getitemSearch/',(req,res)=>{              //get a item details
    Product.find({},(err,doc)=>{
        if(doc)
            res.json(doc);
        else {
            res.status(404).send('Ops!Detail not found');
        }
    })
    });   


    app.post('/api/updateitem',(req,res)=>{          //update a item data
        Product.findOneAndUpdate({
            itemId : req.body.id
        },{
            $set:{
                name : req.body.name,
                age : req.body.age,
                relatives : req.body.relatives,
                bio : req.body.bio
            }
        },(err,doc)=>{
            if(doc)
                res.send('Product updated successfully!');
            else {
                res.err(err.message);
            }
        })
    });

    app.delete('/api/deleteitem/:itemid',(req,res)=>{           //delete a perticular item
        Product.findOneAndRemove({_id : req.params.itemid},{},(err,doc)=>{
            if(doc)
                res.json(doc);
            else {
                res.status(404).send('Ops! Product not found');
            }
        })
    });
}



