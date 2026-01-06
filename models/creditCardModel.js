class creditCardModel {
  constructor(db) {
    this.db = db;
  }

  async getCreditCardsByUserId(userId) {
    const query = "SELECT * FROM CreditCard WHERE user_id = ?";
    try {
      const [result] = await this.db.execute(query, [userId]);
      return result;
    } catch (error) {
      console.error("Error getting credit cards: ", error);
      throw new Error("Error getting credit cards");
    }
  }

  async createCreditCard(userId, cardNumber, expirationDate, cvv) {
    const query = "INSERT INTO CreditCard (user_id, card_number, expiration_date, cvv) VALUES (?, ?, ?, ?)";
    try {
      const [result] = await this.db.execute(query, [userId, cardNumber, expirationDate, cvv]);
      return result;
    } catch (error) {
      console.error("Error creating credit card: ", error);
      throw new Error("Error creating credit card");
    }
  }
}

module.exports = creditCardModel;