const express = require("express");
const router = express.Router();

const listingController = require("../controllers/listingController");

router.get("/listings", listingController.getListings);

module.exports = router;