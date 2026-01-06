

function createCartController(cartModel, userModel) {
  async function addToCart(req, res) {
    try {
      const { product_id, product_attribute_id, quantity } = req.body;
      const userId = req.session.userId;

      // check if cart is existing
      const cart = await userModel.getCart(userId);
      const cartId = cart[0].cart_id;

      // Add product to cart
      const result = await cartModel.addCartItems(cartId, product_id, product_attribute_id, parseInt(quantity));

      if(result.affectedRows === 0) {
        return res.status(400).send("Failed to add to cart");
      }

      res.redirect("/products");
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).send("Error adding to cart");
    }
  }

  async function removeFromCart(req, res) {
    try {
      const { cart_item_id } = req.params;

      const result = await cartModel.deleteCartItem(cart_item_id);

      if(result.affectedRows === 0) {
        return res.status(400).send("Failed to remove from cart");
      }

      res.redirect("/checkout");
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).send("Error removing from cart");
    }
  }

  async function updateCart(req, res) {
    try {
      const { cart_item_id, quantity } = req.body;

      const result = await cartModel.updateCartItemQuantity(cart_item_id, quantity);

      if(result.affectedRows === 0) {
        return res.status(400).send("Failed to update cart");
      }

      res.redirect("/checkout");
    } catch (error) {
      console.error("Error updating cart:", error);
      res.status(500).send("Error updating cart");
    }
  }

  return {
    addToCart,
    removeFromCart,
    updateCart
  }
}

module.exports = createCartController;