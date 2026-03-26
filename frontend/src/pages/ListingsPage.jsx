import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function ListingsPage() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await api.get("/listings");
        setListings(Array.isArray(response.data) ? response.data : response.data.results || []);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Property Listings</h1>

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