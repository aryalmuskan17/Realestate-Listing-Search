const listingService = require("../services/listingService");

const getListings = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);

    if (req.query.price_min && isNaN(req.query.price_min)) {
      return res.status(400).json({ error: "Invalid price_min" });
    }

    if (req.query.price_max && isNaN(req.query.price_max)) {
      return res.status(400).json({ error: "Invalid price_max" });
    }

    if (req.query.beds && isNaN(req.query.beds)) {
      return res.status(400).json({ error: "Invalid beds value" });
    }

    if (req.query.baths && isNaN(req.query.baths)) {
      return res.status(400).json({ error: "Invalid baths value" });
    }

    const filters = {
      price_min: req.query.price_min,
      price_max: req.query.price_max,
      beds: req.query.beds,
      baths: req.query.baths,
      property_type: req.query.property_type,
      suburb: req.query.suburb,
      keyword: req.query.keyword,
    };

    const isAdmin = req.user.is_admin;

    const listings = await listingService.getListings(
      filters,
      isAdmin,
      page,
      limit
    );

    res.json({
      page,
      limit,
      results: listings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
};

const getListingById = async (req, res) => {
  try {
    const isAdmin = req.user.is_admin;
    const listing = await listingService.getListingById(req.params.id, isAdmin);

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