import { useEffect, useState } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import api from "../services/api";

function ListingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const [isAdmin, setIsAdmin] = useState(location.state?.isAdmin || false);
  const [listings, setListings] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [suburb, setSuburb] = useState(searchParams.get("suburb") || "");
  const [propertyType, setPropertyType] = useState(
    searchParams.get("property_type") || ""
  );
  const [priceMin, setPriceMin] = useState(searchParams.get("price_min") || "");
  const [priceMax, setPriceMax] = useState(searchParams.get("price_max") || "");
  const [beds, setBeds] = useState(searchParams.get("beds") || "");
  const [baths, setBaths] = useState(searchParams.get("baths") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const limit = 2;
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;

  const fetchListings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/listings", {
        headers: {
          "x-user-role": isAdmin ? "admin" : "user",
        },
        params: {
          keyword: searchParams.get("keyword") || undefined,
          suburb: searchParams.get("suburb") || undefined,
          property_type: searchParams.get("property_type") || undefined,
          price_min: searchParams.get("price_min") || undefined,
          price_max: searchParams.get("price_max") || undefined,
          beds: searchParams.get("beds") || undefined,
          baths: searchParams.get("baths") || undefined,
          page: Number(searchParams.get("page")) || 1,
          limit,
        },
      });

      setTotal(response.data.total || 0);
      setListings(
        Array.isArray(response.data)
          ? response.data
          : response.data.results || []
      );
    } catch (error) {
      console.error("Failed to fetch listings:", error);
      setError("Failed to fetch listings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentPage = Number(searchParams.get("page")) || 1;
    setPage(currentPage);
  }, [searchParams]);

  useEffect(() => {
    fetchListings();
  }, [searchParams, isAdmin]);

  useEffect(() => {
    setKeyword(searchParams.get("keyword") || "");
    setSuburb(searchParams.get("suburb") || "");
    setPropertyType(searchParams.get("property_type") || "");
    setPriceMin(searchParams.get("price_min") || "");
    setPriceMax(searchParams.get("price_max") || "");
    setBeds(searchParams.get("beds") || "");
    setBaths(searchParams.get("baths") || "");
  }, [searchParams]);

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

      <label style={{ display: "block", marginBottom: "20px" }}>
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={() => setIsAdmin(!isAdmin)}
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

      <p>
        <strong>Total results:</strong> {total}
      </p>

      {loading && <p>Loading listings...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        !loading &&
        !error &&
        listings.map((listing) => (
          <Link
            key={listing.id}
            to={`/listings/${listing.id}`}
            state={{
              isAdmin,
              fromSearch: searchParams.toString(),
            }}
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

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          style={{ marginRight: "10px", padding: "8px 12px" }}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={!hasNextPage}
          style={{ marginLeft: "10px", padding: "8px 12px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ListingsPage;