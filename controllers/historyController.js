function createHistoryController(historyModel) {
  async function getHistory(req, res) {
    try {
      const historyRecords = await historyModel.getHistoryRecords();
      const history = historyRecords.map(record => {
        const discountedPrice = record.normal_price * (1 - (record.discount_percent / 100));
        const totalPrice = discountedPrice * record.quantity;

        return {
          userId: record.first_name + " " + record.last_name,
          productname: record.product_name,
          color: record.color,
          size: record.size,
          quantity: `x ${record.quantity}`,
          price: `${totalPrice.toLocaleString()} THB`,
          status: record.status || "Completed",
          orderDate: new Date(record.order_date).toLocaleDateString()
        };
      });

      res.render("pages/backoffice-history-page", {
        history,
        activePage: "history",
      });
    } catch (error) {
      console.error("Error fetching order history:", error);
      res.render("pages/backoffice-history-page", {
        history: [],
        activePage: "history",
        error: "Failed to load order history"
      });
    }
  }

  return {
    getHistory,
  };
}

module.exports = createHistoryController;