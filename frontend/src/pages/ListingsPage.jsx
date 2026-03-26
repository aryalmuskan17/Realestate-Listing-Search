import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../services/api";

function ListingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isAdmin, setIsAdmin] = useState(false);
  const [listings, setListings] = useState([]);

  // 🔹 Initialize from URL
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [suburb, setSuburb] = useState(searchParams.get("suburb") || "");
  const [propertyType, setPropertyType] = useState(searchParams.get("property_type") || "");
  const [priceMin, setPriceMin] = useState(searchParams.get("price_min") || "");
  const [priceMax, setPriceMax] = useState(searchParams.get("price_max") || "");
  const [beds, setBeds] = useState(searchParams.get("beds") || "");
  const [baths, setBaths] = useState(searchParams.get("baths") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const fetchListings = async () => {
    try {
      const response = await api.get("/listings", {
        headers: {
          "x-user-role": isAdmin ? "admin" : "user",
        },
        params: {
          keyword: keyword || undefined,
          suburb: suburb || undefined,
          property_type: propertyType || undefined,
          price_min: priceMin || undefined,
          price_max: priceMax || undefined,
          beds: beds || undefined,
          baths: baths || undefined,
          page,
          limit: 2,
        },
      });

      setListings(
        Array.isArray(response.data)
          ? response.data
          : response.data.results || []
      );
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    }
  };

  // 🔹 Fetch when URL changes
  useEffect(() => {
    fetchListings();
  }, [searchParams, isAdmin]);

  // 🔹 Update URL when searching
  const handleSearch = (e) => {
  e.preventDefault();

  setPage(1);

  const params = {};

  if (keyword) params.keyword = keyword;
  if (suburb) params.suburb = suburb;
  if (propertyType) params.property_type = propertyType;
  if (priceMin) params.price_min = priceMin;
  if (priceMax) params.price_max = priceMax;
  if (beds) params.beds = beds;
  if (baths) params.baths = baths;

  params.page = 1;

  setSearchParams(params);
};

  // 🔹 Pagination updates URL
  const handlePageChange = (newPage) => {
  setPage(newPage);

  const params = {};

  if (keyword) params.keyword = keyword;
  if (suburb) params.suburb = suburb;
  if (propertyType) params.property_type = propertyType;
  if (priceMin) params.price_min = priceMin;
  if (priceMax) params.price_max = priceMax;
  if (beds) params.beds = beds;
  if (baths) params.baths = baths;

  params.page = newPage;

  setSearchParams(params);
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>Property Listings</h1>

      <label style={{ display: "block", marginBottom: "12px" }}>
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
          style={{ marginRight: "8px" }}
        />
        Admin Mode
      </label>

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
            state={{ isAdmin }}
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

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => handlePageChange(Math.max(page - 1, 1))}>
          Previous
        </button>

        <span style={{ margin: "0 10px" }}>Page {page}</span>

        <button onClick={() => handlePageChange(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default ListingsPage;