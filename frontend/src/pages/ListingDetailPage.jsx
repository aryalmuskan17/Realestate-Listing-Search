import { useEffect, useState } from "react";
import { useParams, Link, useLocation, useSearchParams } from "react-router-dom";
import api from "../services/api";

function ListingDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const isAdmin = location.state?.isAdmin || false;
  const fromSearch = location.state?.fromSearch || "";

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/listings/${id}`, {
          headers: {
            "x-user-role": isAdmin ? "admin" : "user",
          },
        });

        setListing(response.data);
      } catch (error) {
        console.error("Failed to fetch listing detail:", error);
        if (error.response?.status === 404) {
          setError("Listing not found.");
        } else {
          setError("Failed to fetch listing.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, isAdmin]);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading listing details...</p>;
  }

  if (error) {
    return <p style={{ padding: "20px" }}>{error}</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Link to={`/${fromSearch ? `?${fromSearch}` : ""}`} state={{ isAdmin }}>
        ← Back to Listings
      </Link>

      <h1>{listing.title}</h1>
      <p>{listing.description}</p>
      <p><strong>Price:</strong> Rs. {listing.price}</p>
      <p><strong>Suburb:</strong> {listing.suburb}</p>
      <p><strong>Address:</strong> {listing.address}</p>
      <p><strong>Property Type:</strong> {listing.property_type}</p>
      <p><strong>Beds:</strong> {listing.beds}</p>
      <p><strong>Baths:</strong> {listing.baths}</p>

      {listing.internal_status_notes && (
        <p><strong>Internal Status Notes:</strong> {listing.internal_status_notes}</p>
      )}
    </div>
  );
}

export default ListingDetailPage;