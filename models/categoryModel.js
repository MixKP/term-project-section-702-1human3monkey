class categoryModel {
  constructor(db) {
    this.db = db;
  }

  async getCategories() {
    const query = "SELECT * FROM Category ORDER BY category_name ASC";
    try {
      const [categories] = await this.db.execute(query);
      return categories;
    } catch (error) {
      console.error("Error getting categories: ", error);
      throw new Error("Error getting categories");
    }
  }

  async addCategory(name, imagePath) {
    const query = `INSERT INTO Category (category_name, image_path) VALUES (? ,?)`;
    try {
      const [result] = await this.db.execute(query, [name, imagePath]);
      return result;
    } catch (error) {
      console.error("Error adding category: ", error);
      throw new Error("Error adding category");
    }
  }

  async getCategoryById(categoryId) {
    const query = "SELECT * FROM Category WHERE category_id = ?";
    try {
      const [category] = await this.db.execute(query, [categoryId]);
      return category[0];
    } catch (error) {
      console.error("Error getting category by id: ", error);
      throw new Error("Error getting category by id");
    }
  }

  async updateCategoryById(categoryId, name, imagePath) {
    const query = `UPDATE Category SET category_name = ?, image_path = ? WHERE category_id = ?`;
    try {
      const [result] = await this.db.execute(query, [name, imagePath, categoryId]);
      return result;
    } catch (error) {
      console.error("Error updating category: ", error);
      throw new Error("Error updating category");
    }
  }

  async deleteCategoryById(categoryId) {
    const query = "DELETE FROM Category WHERE category_id = ?";
    try {
      const [result] = await this.db.execute(query, [categoryId]);
      return result;
    } catch (error) {
      console.error("Error deleting category: ", error);
      throw new Error("Error deleting category");
    }
  }

  async getAllCategories() {
    const query = "SELECT category_id, category_name AS name, image_path AS icon FROM Category";
    const [categories] = await this.db.query(query);
    return categories;
  }

  async getCategoryProducts(categoryName) {
    const query = `
      SELECT p.*, c.category_name 
      FROM Product p
      JOIN Category c ON p.category_id = c.category_id
      WHERE c.category_name = ?
      ORDER BY p.created_at DESC
    `;
    const [products] = await this.db.query(query, [categoryName]);
    return products;
  }
}

module.exports = categoryModel;