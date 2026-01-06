class addressModel {
  constructor(db) {
    this.db = db;
  }

  async getAddressByUserId(userId) {
    const query = "SELECT * FROM Address WHERE user_id = ?";
    try {
      const [result] = await this.db.execute(query, [userId]);
      return result;
    } catch (error) {
      console.error("Error getting address: ", error);
      throw new Error("Error getting address");
    }
  }

  async createAddress(userId, city, street, province, zipCode, phoneNumber) {
    const query = `INSERT INTO Address (user_id, city, street, province, zip_code, phone_number) VALUES (?, ?, ?, ?, ?, ?)`;
    try {
      const [result] = this.db.execute(query, [userId, city, street, province, zipCode, phoneNumber]);
      return result;
    } catch (error) {
      console.error("Error creating address: ", error);
      throw new Error("Error creating address");
    }
  }
}

module.exports = addressModel;