const session = require("express-session");

function createHomepageController(homepageModel) {
  async function getHomepageData(req, res) {
    try {
      const discountedProducts = await homepageModel.getDiscountedProducts();


      const carouselImages = [
        { category_name: "shirt", carousel_image_path: "/images/carousel/highlightbadge.jpg" },
        { category_name: "jean", carousel_image_path: "/images/carousel/jean.jpg" },
        { category_name: "summer", carousel_image_path: "/images/carousel/summer.jpg" }
      ];

      const mappedDiscountedProducts = discountedProducts.map(product => ({
        product_id: product.product_id,
        description: product.description || "No description available",
        product_name: product.product_name || "Unnamed Product",
        image_path: product.image_path ? `${product.image_path}` : "https://via.placeholder.com/150",
        normal_price: product.normal_price || 0,
        discount_percent: product.discount_percent || 0,
      }));

      res.render("pages/homepage", {
        data: {
          carouselImages,
          discountedProducts: mappedDiscountedProducts,
        },
        session: req.session,
      });
    } catch (error) {
      console.error("Error in getHomepageData:", error);
      res.status(500).json({ error: "An error occurred while getting the homepage data" });
    }
  }

  return { getHomepageData };
}

module.exports = createHomepageController;