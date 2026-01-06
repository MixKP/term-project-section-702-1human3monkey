const express = require("express");
const router = express.Router();

function createCategoryRoute(db) {
  const CategoryModel = require("../models/categoryModel");
  const createCategoryController = require("../controllers/categoryController");

  const categoryModel = new CategoryModel(db);
  const categoryController = createCategoryController(categoryModel);

  router.get("/category", categoryController.getAllCategories);
  router.get("/category/:name", categoryController.getCategoryProducts);

  return router;
}

module.exports = createCategoryRoute;