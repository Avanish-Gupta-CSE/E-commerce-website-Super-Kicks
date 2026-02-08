import { useState } from "react";
import { ProductCard } from "../../components/product-card/ProductCard";
import Spinner from "../../components/spinner/Spinner";
import { useDataContext } from "../../contexts/DataProvider";
import "./productListing.css";
import { AiFillStar } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

const FilterPanel = ({
  categories,
  getAllDataHandler,
  priceFilterHandler,
  priceRange,
  ratingFilterHandler,
  ratingRange,
  setCategoryHandler,
  categoryFilter,
  sortPriceHandler,
  sortPriceFilter,
}) => (
  <div className="filter-content">
    <div className="filter-header">
      <h3 className="filter-heading">Filters</h3>
      <button onClick={getAllDataHandler} className="clear-button">
        Clear All
      </button>
    </div>

    <div className="filter-group">
      <h4 className="filter-label">Price Range</h4>
      <input
        className="filter-range"
        onChange={(e) => priceFilterHandler(e)}
        min={0}
        max={200}
        defaultValue={priceRange ? priceRange : 200}
        value={Number(priceRange)}
        type="range"
      />
      <div className="filter-range-labels">
        <span>$0</span>
        <span className="filter-range-value">${priceRange || 200}</span>
      </div>
    </div>

    <div className="filter-group">
      <h4 className="filter-label">Brand</h4>
      <ul className="filter-checklist">
        {categories.map(({ categoryName, id }) => (
          <li key={id} className="filter-check-item">
            <label className="filter-checkbox-label">
              <input
                checked={categoryFilter.includes(categoryName)}
                value={categoryName}
                onChange={(e) => setCategoryHandler(e)}
                type="checkbox"
                className="filter-checkbox"
              />
              {categoryName}
            </label>
          </li>
        ))}
      </ul>
    </div>

    <div className="filter-group">
      <h4 className="filter-label">Minimum Rating</h4>
      <input
        className="filter-range"
        onChange={(e) => ratingFilterHandler(e)}
        min={0}
        max={5}
        defaultValue={ratingRange ? ratingRange : 0}
        value={Number(ratingRange)}
        type="range"
      />
      <div className="filter-range-labels">
        <span>
          {ratingRange || 0} <AiFillStar className="star" />
        </span>
        <span>
          5 <AiFillStar className="star" />
        </span>
      </div>
    </div>

    <div className="filter-group">
      <h4 className="filter-label">Sort by Price</h4>
      <div className="filter-radio-group">
        <label className="filter-radio-label">
          <input
            checked={sortPriceFilter === "asc"}
            onChange={(e) => sortPriceHandler(e)}
            value="asc"
            name="sort"
            type="radio"
            className="filter-radio"
          />
          Low to High
        </label>
        <label className="filter-radio-label">
          <input
            checked={sortPriceFilter === "desc"}
            onChange={(e) => sortPriceHandler(e)}
            value="desc"
            name="sort"
            type="radio"
            className="filter-radio"
          />
          High to Low
        </label>
      </div>
    </div>
  </div>
);

export const ProductListing = () => {
  const {
    filteredProducts,
    categories,
    getAllDataHandler,
    priceFilterHandler,
    priceRange,
    ratingFilterHandler,
    ratingRange,
    setCategoryHandler,
    categoryFilter,
    sortPriceHandler,
    sortPriceFilter,
    productsLoading,
  } = useDataContext();

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  if (productsLoading) {
    return (
      <div className="loading-div">
        <Spinner />
      </div>
    );
  }

  const filterProps = {
    categories,
    getAllDataHandler,
    priceFilterHandler,
    priceRange,
    ratingFilterHandler,
    ratingRange,
    setCategoryHandler,
    categoryFilter,
    sortPriceHandler,
    sortPriceFilter,
  };

  return (
    <div className="product-listing">
      {/* Page Header */}
      <div className="listing-header">
        <h1 className="listing-title">All Sneakers</h1>
        <p className="listing-count">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
        </p>
        <button
          className="button-secondary filter-toggle"
          onClick={() => setShowMobileFilters(true)}
        >
          Filters
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilters && (
        <div className="mobile-filter-overlay">
          <div className="mobile-filter-drawer">
            <div className="mobile-filter-top">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                className="mobile-filter-close"
                onClick={() => setShowMobileFilters(false)}
                aria-label="Close filters"
              >
                <RxCross1 />
              </button>
            </div>
            <FilterPanel {...filterProps} />
          </div>
        </div>
      )}

      <div className="listing-layout">
        {/* Desktop Sidebar */}
        <aside className="filters-sidebar">
          <FilterPanel {...filterProps} />
        </aside>

        {/* Product Grid */}
        <div className="listing-grid">
          {filteredProducts.length === 0 ? (
            <p className="no-results">No products match your filters.</p>
          ) : (
            <ul className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
