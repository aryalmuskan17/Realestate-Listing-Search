import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function ListingDetailPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await api.get(`/listings/${id}`);
        setListing(response.data);
      } catch (error) {
        console.error("Failed to fetch listing detail:", error);
      }
    };

    fetchListing();
  }, [id]);

  if (!listing) {
    return <p style={{ padding: "20px" }}>Loading listing details...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">← Back to Listings</Link>

      <h1>{listing.title}</h1>
      <p>{listing.description}</p>
      <p><strong>Price:</strong> Rs. {listing.price}</p>
      <p><strong>Suburb:</strong> {listing.suburb}</p>
      <p><strong>Address:</strong> {listing.address}</p>
      <p><strong>Property Type:</strong> {listing.property_type}</p>
      <p><strong>Beds:</strong> {listing.beds}</p>
      <p><strong>Baths:</strong> {listing.baths}</p>
    </div>
  );
}

export default ListingDetailPage;