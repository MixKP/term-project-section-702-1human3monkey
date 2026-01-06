function createProductController(productModel) {
  async function getAllProducts(req, res) {
    try {
      const products = await productModel.getProducts();
      res.render("pages/all-products", {
        products,
        session: req.session,
      });
    } catch (error) {
      res.status(500).send('Error getting all products');
    }
  }

  async function getProductById(req, res) {
    try {
      const productId = req.params.id;
      const product = await productModel.getProductById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const productData = {
        ...product,
        features: []
      };

      res.json(productData);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  }

  async function searchProducts(req, res) {
    try {
      const searchQuery = req.query.search;
      const searchResults = await productModel.searchProducts(searchQuery);

      res.render('pages/search-product', {
        products: searchResults,
        pageTitle: searchQuery,
        session: req.session
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  }

  async function renderProductPage(req, res) {
    try {
      const productId = req.params.id;

      res.render('pages/product', { productId });
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  }

  return {
    getProductById,
    getAllProducts,
    searchProducts,
    renderProductPage
  };
}

module.exports = createProductController;