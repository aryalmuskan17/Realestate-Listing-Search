const pool = require("../db/db");

const getListings = async (filters, isAdmin) => {
  const selectFields = isAdmin
    ? "id, title, description, price, beds, baths, suburb, property_type, address, internal_status_notes, agent_id, created_at"
    : "id, title, description, price, beds, baths, suburb, property_type, address, agent_id, created_at";

  let query = `SELECT ${selectFields} FROM properties WHERE 1=1`;
  const values = [];
  let count = 1;

  if (filters.price_min) {
    query += ` AND price >= $${count}`;
    values.push(filters.price_min);
    count++;
  }

  if (filters.price_max) {
    query += ` AND price <= $${count}`;
    values.push(filters.price_max);
    count++;
  }

  if (filters.beds) {
    query += ` AND beds = $${count}`;
    values.push(filters.beds);
    count++;
  }

  if (filters.baths) {
    query += ` AND baths = $${count}`;
    values.push(filters.baths);
    count++;
  }

  if (filters.property_type) {
    query += ` AND property_type ILIKE $${count}`;
    values.push(filters.property_type);
    count++;
  }

  if (filters.suburb) {
    query += ` AND suburb ILIKE $${count}`;
    values.push(filters.suburb);
    count++;
  }

  if (filters.keyword) {
    query += ` AND (title ILIKE $${count} OR description ILIKE $${count} OR address ILIKE $${count})`;
    values.push(`%${filters.keyword}%`);
    count++;
  }

  query += " ORDER BY id DESC";

  const result = await pool.query(query, values);
  return result.rows;
};

const getListingById = async (id, isAdmin) => {
  const selectFields = isAdmin
    ? "id, title, description, price, beds, baths, suburb, property_type, address, internal_status_notes, agent_id, created_at"
    : "id, title, description, price, beds, baths, suburb, property_type, address, agent_id, created_at";

  const result = await pool.query(
    `SELECT ${selectFields} FROM properties WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

module.exports = { getListings, getListingById };