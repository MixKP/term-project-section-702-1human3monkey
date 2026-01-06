const express = require('express');
const productController = require('../controllers/productController');
const ProductModel = require('../models/productModel');
const createProductController = require('../controllers/productController');

function createProductRoutes(db) {
  const router = express.Router();
  const productModel = new ProductModel(db);
  const productController = createProductController(productModel);

  router.get('/products', productController.getAllProducts);
  router.get('/product/:id', productController.renderProductPage);
  router.get('/product/:id/details', productController.getProductById);
  router.get('/search', productController.searchProducts);

  return router;
}

module.exports = createProductRoutes;