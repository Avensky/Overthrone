// const router = require("express").Router();
const productController = require("../controllers/shopController");
const multerInstance = require('../../multer')
const productRepository = require('../repository')

module.exports = function(app) {

    app.post("/", multerInstance.upload.single('image'), productController.createProduct);
    app.get("/api/items", async (req, res) => {
        try {
            let products = await productRepository.products();
            res.status(200).json({
                status: true,
                data: products,
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err,
                status: false,
            })
        }
    })
    
    app.get("/:id", productController.getProductById);
    app.delete("/:id", productController.removeProduct);

}