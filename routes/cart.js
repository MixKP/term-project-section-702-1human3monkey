const express = require('express');
const router = express.Router();
const cartModel = require('../models/cartModel');
const userModel = require('../models/userModel');
const cartController = require('../controllers/cartController');
const AuthController = require('../controllers/authController');

function createCartRoute(db){
    const cart = new cartModel(db);
    const user = new userModel(db);
    const authController = new AuthController(user);
    const controller = new cartController(cart, user);

    router.post('/add', authController.authentication , controller.addToCart);
    router.post('/update', authController.authentication, controller.updateCart);
    router.get('/delete/:cart_item_id', authController.authentication, controller.removeFromCart);

    return router;
}

module.exports = createCartRoute;