const path = require("path");
const fs = require("fs");

function createBackofficeProductController(productModel, categoryModel) {
  async function getProducts(req, res) {
    try {
      const products = await productModel.getProducts();
      const categories = await categoryModel.getCategories();
      res.render("pages/backoffice-product-page", {
        products,
        categories,
        activePage: "products",
        selectedCategory: "all",
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while getting the products" });
    }
  }

  async function renderProductsByCategory(req, res) {
    const categoryId = req.params.categoryId;

    try {
      const products = await productModel.getProductsByCategory(categoryId);
      const categories = await categoryModel.getCategories();
      res.render("pages/backoffice-product-page", {
        products,
        categories,
        activePage: "products",
        selectedCategory: categoryId,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while getting the products" });
    }
  }

  async function renderAddProductPage(req, res) {
    try {
      const categories = await categoryModel.getCategories();
      res.render("pages/backoffice-addproduct-page", {
        categories,
        activePage: "products",
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while getting the categories" });
    }
  }

  async function renderEditProductPage(req, res) {
    const productId = req.params.productId;

    try {
      const product = await productModel.getProductById(productId);
      const categories = await categoryModel.getCategories();
      res.render("pages/backoffice-product-edit-page", {
        product,
        categories,
        activePage: "products",
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while getting the product" });
    }
  }

  async function addProduct(req, res) {
    const name = req.body.productName;
    const description = req.body.productDescription;
    const category = req.body.productCategory;
    const normalPrice = req.body.productPrice;
    const discountPercent = req.body.productDiscount;
    const image = req.file;
    const createdAt = new Date(req.body.createdAt)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    if (
      !name ||
      !description ||
      !category ||
      !normalPrice ||
      !discountPercent ||
      !image ||
      !createdAt
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const imagePath = path.join("/uploads", image.filename);

    try {
      const productId = await productModel.addProduct(
        name,
        description,
        category,
        normalPrice,
        discountPercent,
        imagePath,
        createdAt
      );

      const attributes = JSON.parse(req.body.attributes);
      await productModel.addProductAttribute(productId, attributes);

      return res.status(201).json({
        message: "Product added successfully",
        redirect: "/backoffice/product",
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while adding the product" });
    }
  }

  async function updateProductById(req, res) {
    const productId = req.params.productId;
    const name = req.body.productName;
    const description = req.body.productDescription;
    const category = req.body.productCategory;
    const normalPrice = req.body.productPrice;
    const discountPercent = req.body.productDiscount;
    const image = req.file;

    if (
      !name ||
      !description ||
      !category ||
      !normalPrice ||
      !discountPercent
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const product = await productModel.getProductById(productId);
      let imagePath = product.image_path;

      if (image) {
        const oldImagePath = path.join(
          __dirname,
          "..",
          "public",
          product.image_path
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
        imagePath = path.join("/uploads", image.filename);
      }

      await productModel.updateProductById(
        productId,
        name,
        description,
        category,
        normalPrice,
        discountPercent,
        imagePath
      );

      const attributes = JSON.parse(req.body.attributes);
      await productModel.updateProductAttribute(productId, attributes);

      return res.status(200).json({
        message: "Product updated successfully",
        redirect: "/backoffice/product",
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while updating the product" });
    }
  }

  async function deleteProductById(req, res) {
    const productId = req.params.productId;

    try {
      const product = await productModel.getProductById(productId);
      const imagePath = path.join("public", product.image_path);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

      await productModel.deleteProductById(productId);

      return res.status(200).json({
        message: "Product deleted successfully",
        redirect: "/backoffice/product",
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting the product" });
    }
  }

  return {
    getProducts,
    renderProductsByCategory,
    renderAddProductPage,
    renderEditProductPage,
    addProduct,
    updateProductById,
    deleteProductById,
  };
}

module.exports = createBackofficeProductController;
