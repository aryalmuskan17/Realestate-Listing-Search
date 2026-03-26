const listingService = require("../services/listingService");

const getListings = async (req, res) => {
  try {
    const filters = {
      price_min: req.query.price_min,
      price_max: req.query.price_max,
      beds: req.query.beds,
      baths: req.query.baths,
      property_type: req.query.property_type,
      suburb: req.query.suburb,
      keyword: req.query.keyword,
    };

    const listings = await listingService.getListings(filters);
    res.json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
};

const getListingById = async (req, res) => {
  try {
    const listing = await listingService.getListingById(req.params.id);

    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    res.json(listing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch listing" });
  }
};

module.exports = { getListings, getListingById };