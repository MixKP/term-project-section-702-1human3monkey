const express = require("express");
const router = express.Router();
const createHomepageController = require("../controllers/homepageController");
const HomepageModel = require("../models/homepageModel");

function createHomepageRoute(db) {
  const homepageModel = new HomepageModel(db);
  const homepageController = createHomepageController(homepageModel);

  router.get("/homepage", homepageController.getHomepageData);

  return router;
}

module.exports = createHomepageRoute;