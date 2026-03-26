const listingService = require("../services/listingService");

const getListings = async (req, res) => {
  try {
    const listings = await listingService.getListings();
    res.json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
};

module.exports = { getListings };