const express = require("express");
const Product = require("../models/product.model.js")
const router = express.Router();
const {getProducts, getProduct, createProduct, updateProduct,deleteProduct} = require('../controllers/product.controller.js');
const { get } = require("mongoose");
const {protect, admin } = require('../middlewares/auth.middleware.js');


router.get('/',getProducts);
router.get("/:id",getProduct);
router.post('/',protect, admin, createProduct);
router.put('/:id',protect, admin, updateProduct);
router.delete('/:id',protect, admin, deleteProduct);




module.exports = router;