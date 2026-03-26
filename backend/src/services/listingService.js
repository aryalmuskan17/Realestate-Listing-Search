const pool = require("../db/db");

const getListings = async () => {
  const result = await pool.query("SELECT * FROM properties ORDER BY id DESC");
  return result.rows;
};

module.exports = { getListings };