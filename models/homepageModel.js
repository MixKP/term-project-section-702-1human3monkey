class HomepageModel {
  constructor(db) {
    this.db = db;
  }

  async getDiscountedProducts() {
    const query = `
      SELECT p.product_id, p.product_name, p.description, p.image_path, p.normal_price, p.discount_percent, c.category_name
      FROM Product p 
      LEFT JOIN Category c ON p.category_id = c.category_id 
      WHERE p.discount_percent > 0.00
      ORDER BY p.product_name DESC
    `;
    try {
      const [products] = await this.db.execute(query);
      console.log("Fetched discounted products from DB:", products); // Debug
      if (!products || products.length === 0) {
        console.log("No products found in the database.");
      }
      return products;
    } catch (error) {
      console.error("Error getting discounted products: ", error);
      throw new Error("Error getting discounted products");
    }
  }

  async getCarouselImages() {
    const query = `
      SELECT category_name, image_path FROM Category WHERE image_path IS NOT NULL
    `;
    try {
      const [images] = await this.db.execute(query);
      console.log("Fetched carousel images from DB:", images); // Debug
      return images.map(row => ({ category_name: row.category_name, image_path: row.image_path }));
    } catch (error) {
      console.error("Error getting carousel images: ", error);
      throw new Error("Error getting carousel images");
    }
  }
}

module.exports = HomepageModel;