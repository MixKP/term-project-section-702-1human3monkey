const express = require("express");
const router = express.Router();

function createHistoryRoute(db) {
  const HistoryModel = require("../models/historyModel");
  const createHistoryController = require("../controllers/historyController");

  const historyModel = new HistoryModel(db);
  const historyController = createHistoryController(historyModel);

  router.get("/backoffice/history", historyController.getHistory);

  return router;
}

module.exports = createHistoryRoute;