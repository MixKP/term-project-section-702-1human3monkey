const session = require("express-session");
const db = require("../services/db");

function createCategoryController(categoryModel) {
  async function getAllCategories(req, res) {
    try {
      const categories = await categoryModel.getAllCategories();
      res.render("pages/category", { categories, session: req.session });
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).send("Error fetching categories");
    }
  }

  async function getCategoryProducts(req, res) {
    const categoryName = req.params.name;
    try {
      const products = await categoryModel.getCategoryProducts(categoryName);
      res.render("pages/category/all-category-product", {
        categoryName,
        products,
        session: req.session,
      });
    } catch (error) {
      console.error("Error fetching category products:", error);
      res.status(500).send("Server Error");
    }
  }

  return {
    getAllCategories,
    getCategoryProducts,
  };
}

module.exports = createCategoryController;
