class productModel {
  constructor(db) {
    this.db = db;
  }

  async getProducts() {
    const query = `
      SELECT p.product_id, p.product_name, p.description, p.image_path, p.normal_price, p.discount_percent, c.category_name
      FROM Product p
      JOIN Category c ON p.category_id = c.category_id
      ORDER BY p.product_name DESC
  `;
    try {
      const [products] = await this.db.execute(query);
      return products;
    } catch (error) {
      console.error("Error getting products: ", error);
      throw new Error("Error getting products");
    }
  }

  async getProductsByCategory(categoryId) {
    const query = `
      SELECT p.product_id, p.product_name, p.description, p.image_path, p.normal_price, p.discount_percent, c.category_name
      FROM Product p
      JOIN Category c ON p.category_id = c.category_id
      WHERE p.category_id = ?
      ORDER BY p.product_name DESC
    `;
    try {
      const [products] = await this.db.execute(query, [categoryId]);
      return products;
    } catch (error) {
      console.error("Error getting products by category: ", error);
      throw new Error("Error getting products by category");
    }
  }

  async addProduct(
    name,
    description,
    categoryId,
    normalPrice,
    discountPercent,
    imagePath,
    createdAt
  ) {
    const query = `INSERT INTO Product (product_name, description, category_id, normal_price, discount_percent, image_path, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    try {
      const [result] = await this.db.execute(query, [
        name,
        description,
        categoryId,
        normalPrice,
        discountPercent,
        imagePath,
        createdAt,
      ]);
      return result.insertId;
    } catch (error) {
      console.error("Error adding product: ", error);
      throw new Error("Error adding product");
    }
  }

  async addProductAttribute(productId, attributes) {
    const query = `INSERT INTO ProductAttribute (product_id, color, size, quantity) VALUES ?`;
    const values = attributes.map((attribute) => [
      productId,
      attribute.color,
      attribute.size,
      attribute.quantity,
    ]);
    try {
      await this.db.query(query, [values]);
    } catch (error) {
      console.error("Error adding product attribute: ", error);
      throw new Error("Error adding product attribute");
    }
  }

  async getProductById(productId) {
    const productQuery = `
      SELECT p.product_id, p.product_name, p.description, p.image_path, p.normal_price, p.discount_percent, c.category_name
      FROM Product p
      JOIN Category c ON p.category_id = c.category_id
      WHERE p.product_id = ?
    `;
    const attributeQuery = `
      SELECT color, size, quantity, product_attribute_id
      FROM ProductAttribute
      WHERE product_id = ?
    `;
    try {
      const [product] = await this.db.execute(productQuery, [productId]);
      const [attributes] = await this.db.execute(attributeQuery, [productId]);
      if (product.length == 0) {
        return null;
      }

      product[0].attributes = attributes;
      return product[0];
    } catch (error) {
      console.error("Error getting product by id: ", error);
      throw new Error("Error getting product by id");
    }
  }

  async updateProductById(
    productId,
    name,
    description,
    categoryId,
    normalPrice,
    discountPercent,
    imagePath
  ) {
    const query = `UPDATE Product SET product_name = ?, description = ?, category_id = ?, normal_price = ?, discount_percent = ?, image_path = ? WHERE product_id = ?`;
    try {
      await this.db.execute(query, [
        name,
        description,
        categoryId,
        normalPrice,
        discountPercent,
        imagePath,
        productId,
      ]);
    } catch (error) {
      console.error("Error updating product: ", error);
      throw new Error("Error updating product");
    }
  }

  async updateProductAttribute(productId, attributes) {
    const deleteQuery = `DELETE FROM ProductAttribute WHERE product_id = ?`;
    const insertQuery = `INSERT INTO ProductAttribute (product_id, color, size, quantity) VALUES ?`;
    const values = attributes.map((attribute) => [
      productId,
      attribute.color,
      attribute.size,
      attribute.quantity,
    ]);
    const connection = await this.db.getConnection();
    try {
      await connection.beginTransaction();
      await connection.query(deleteQuery, [productId]);
      await connection.query(insertQuery, [values]);
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      console.error("Error updating product attributes: ", error);
      throw new Error("Error updating product attributes");
    } finally {
      connection.release();
    }
  }

  async deleteProductById(productId) {
    const deleteAttributesQuery = `DELETE FROM ProductAttribute WHERE product_id = ?`;
    const deleteProductQuery = `DELETE FROM Product WHERE product_id = ?`;
    const connection = await this.db.getConnection();
    try {
      await connection.beginTransaction();
      await connection.execute(deleteAttributesQuery, [productId]);
      await connection.execute(deleteProductQuery, [productId]);
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      console.error("Error deleting product: ", error);
      throw new Error("Error deleting product");
    } finally {
      connection.release();
    }
  }

  async searchProducts(searchQuery) {
    const query = `
      SELECT p.product_id, p.product_name, p.description, p.image_path, p.normal_price, p.discount_percent, c.category_name
      FROM Product p
      JOIN Category c ON p.category_id = c.category_id
      WHERE p.product_name LIKE ?
      ORDER BY p.product_name DESC
    `

    const value = [`%${searchQuery}%`];

    try {
      const [products] = await this.db.execute(query, value);
      return products;
    } catch (error) {
      console.error("Error searching products: ", error);
      throw new Error("Error searching products");
    }
  }
}

module.exports = productModel;
