const express = require("express");
const router = express.Router();

const listingController = require("../controllers/listingController");

router.get("/listings", listingController.getListings);
router.get("/listings/:id", listingController.getListingById);

module.exports = router;