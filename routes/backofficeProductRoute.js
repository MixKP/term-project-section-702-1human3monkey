const express = require("express");
const createBackofficeProductController = require("../controllers/backofficeProductController");
const productModel = require("../models/productModel");
const categoryModel = require("../models/categoryModel");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, JPG files are allowed."),
      false
    );
    return;
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

function createBackofficeProductRoutes(db) {
  const router = express.Router();
  const backofficeProductModel = new productModel(db);
  const backofficeCategoryModel = new categoryModel(db);
  const productController = createBackofficeProductController(
    backofficeProductModel,
    backofficeCategoryModel
  );

  router.get("/backoffice/product", productController.getProducts);
  router.get("/backoffice/product/category/:categoryId", productController.renderProductsByCategory);
  router.get("/backoffice/product/add", productController.renderAddProductPage);
  router.get(
    "/backoffice/product/edit/:productId",
    productController.renderEditProductPage
  );

  router.post(
    "/backoffice/product",
    (req, res, next) => {
      upload.single("productImage")(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: err.message });
        } else if (err) {
          return res.status(400).json({ error: err.message });
        }
        next();
      });
    },
    productController.addProduct
  );

  router.put(
    "/backoffice/product/:productId",
    (req, res, next) => {
      upload.single("productImage")(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: err.message });
        } else if (err) {
          return res.status(400).json({ error: err.message });
        }
        next();
      });
    },
    productController.updateProductById
  );

  router.delete(
    "/backoffice/product/:productId",
    productController.deleteProductById
  );

  return router;
}

module.exports = createBackofficeProductRoutes;
