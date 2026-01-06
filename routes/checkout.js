const express = require('express');
const router = express.Router();
const CartModel = require('../models/cartModel');
const UserModel = require('../models/userModel');
const HistoryModel = require('../models/historyModel');
const AuthController = require('../controllers/authController');
const CreditCardModel = require('../models/creditCardModel');
const AddressModel = require('../models/addressModel');

function createCheckoutRoute(db) {
  const cartModel = new CartModel(db);
  const userModel = new UserModel(db);
  const historyModel = new HistoryModel(db);
  const creditCardModel = new CreditCardModel(db);
  const addressModel = new AddressModel(db);
  const authController = new AuthController(userModel);

  router.get('/', authController.authentication, async (req, res) => {
    try {
      // get cartId from user session
      const [cart_id] = await userModel.getCart(req.session.userId);

      // get cart items by cart id
      const cartItems = await cartModel.getCartItemsByIds(cart_id.cart_id);

      const cardInfo = await creditCardModel.getCreditCardsByUserId(req.session.userId);
      const addressInfo = await addressModel.getAddressByUserId(req.session.userId);

      const mockData = {
        order: {
          products: cartItems,
          shipping: {
            cost: 50,
            currency: "THB"
          }
        },
        customer: {
          delivery: addressInfo[0],
          payment: cardInfo[0]
        }
      };

      res.render('pages/checkout', { data: mockData, session: req.session });
    } catch (error) {
      console.error("Error getting cart items:", error);
      res.status(500).send("Error getting cart items");
    }
  });

  router.post('/', authController.authentication, async (req, res) => {
    try {
      const { items } = req.body;
      const [cart_id] = await userModel.getCart(req.session.userId);

      let cardInfo = await creditCardModel.getCreditCardsByUserId(req.session.userId);
      let addressInfo = await addressModel.getAddressByUserId(req.session.userId);

      // card info is empty
      if (cardInfo.length === 0) {
        await creditCardModel.createCreditCard(
          req.session.userId,
          req.body.card_number,
          req.body.expiration_date,
          req.body.cvv
        );

        cardInfo = await creditCardModel.getCreditCardsByUserId(req.session.userId);
      }

      // address info is empty
      if (addressInfo.length === 0) {
        await addressModel.createAddress(req.session.userId,
          req.body.city,
          req.body.address,
          req.body.province,
          req.body.zip_code,
          req.body.phone_number
        );

        addressInfo = await addressModel.getAddressByUserId(req.session.userId);
      }

      // add history items
      if (items) {
        const itemsArray = Object.values(items);

        itemsArray.forEach(async (item) => {
          await historyModel.addHistoryItem(
            req.session.userId,
            item.product_id,
            item.product_attribute_id,
            item.quantity,
            addressInfo[0].address_id,
            cardInfo[0].credit_card_id,
            new Date()
          );
        }
        );
      }

      // clear cart
      await cartModel.clearCart(cart_id.cart_id);

      res.redirect(`/`);
    } catch (error) {
      console.error("Error checking out:", error);
      res.status(500).send("Error checking out");
    }
  });

  return router;
}

module.exports = createCheckoutRoute;