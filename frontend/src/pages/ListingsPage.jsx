import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [suburb, setSuburb] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");

  const fetchListings = async () => {
    try {
      const response = await api.get("/listings", {
        params: {
          keyword: keyword || undefined,
          suburb: suburb || undefined,
          property_type: propertyType || undefined,
          price_min: priceMin || undefined,
          price_max: priceMax || undefined,
          beds: beds || undefined,
          baths: baths || undefined,
        },
      });

      setListings(
        Array.isArray(response.data) ? response.data : response.data.results || []
      );
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchListings();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Property Listings</h1>

      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ marginRight: "10px", marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="text"
          placeholder="Suburb"
          value={suburb}
          onChange={(e) => setSuburb(e.target.value)}
          style={{ marginRight: "10px", marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="text"
          placeholder="Property type"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          style={{ marginRight: "10px", marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="number"
          placeholder="Min price"
          value={priceMin}
          onChange={(e) => setPriceMin(e.target.value)}
          style={{ marginRight: "10px", marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="number"
          placeholder="Max price"
          value={priceMax}
          onChange={(e) => setPriceMax(e.target.value)}
          style={{ marginRight: "10px", marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="number"
          placeholder="Beds"
          value={beds}
          onChange={(e) => setBeds(e.target.value)}
          style={{ marginRight: "10px", marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="number"
          placeholder="Baths"
          value={baths}
          onChange={(e) => setBaths(e.target.value)}
          style={{ marginRight: "10px", marginBottom: "10px", padding: "8px" }}
        />

        <button type="submit" style={{ padding: "8px 12px" }}>
          Search
        </button>
      </form>

      {listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        listings.map((listing) => (
          <Link
            key={listing.id}
            to={`/listings/${listing.id}`}
            style={{
              display: "block",
              border: "1px solid #ccc",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "8px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <h2>{listing.title}</h2>
            <p>{listing.suburb}</p>
            <p>Rs. {listing.price}</p>
            <p>
              {listing.beds} beds | {listing.baths} baths
            </p>
            <p>{listing.property_type}</p>
          </Link>
        ))
      )}
    </div>
  );
}

export default ListingsPage;