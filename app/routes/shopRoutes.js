// const router = require("express").Router();
const productController = require("../controllers/shopController");
const multerInstance = require('../../multer')

module.exports = function(app) {

    app.post("/", multerInstance.upload.single('image'), productController.createProduct);
    app.get("/", productController.getProducts);
    app.get("/:id", productController.getProductById);
    app.delete("/:id", productController.removeProduct);

}