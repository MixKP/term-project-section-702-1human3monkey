const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const UserModel = require('../models/userModel');

function createAuthRoute(db) {
    const userModel = new UserModel(db);
    const authController = new AuthController(userModel);

    router.get('/login', (req, res) => {
        res.render('pages/authen/login',
            {
                pageTitle: 'Sign in to your account',
                errorMessage: null,
            });
    });

    router.get('/register', (req, res) => {
        res.render('pages/authen/register',
            {
                pageTitle: 'Create an account',
                errorMessage: null,
            });
    });

    router.get('/logout', authController.logout);

    router.post('/login', authController.login);

    router.post('/register', authController.register);

    return router;
}

module.exports = createAuthRoute;