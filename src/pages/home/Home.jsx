import { Link } from "react-router-dom";
import { useDataContext } from "../../contexts/DataProvider";
import "./home.css";
import { ProductCard } from "../../components/product-card/ProductCard";
import Spinner from "../../components/spinner/Spinner";

export const Home = () => {
  const {
    trendingProducts,
    categories,
    singleCategoryFilterHandler,
    productsLoading,
    categoriesLoading,
  } = useDataContext();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-badge">New Collection 2026</span>
          <h1 className="hero-title">Step Into Style</h1>
          <p className="hero-subtitle">
            Discover premium sneakers from Nike, Adidas, Puma, and more.
            Curated for every occasion.
          </p>
          <div className="hero-cta">
            <Link to="/products" className="button hero-button-primary">
              Shop Now
            </Link>
            <Link to="/products" className="button-secondary hero-button-secondary">
              Browse All
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">Shop by Brand</h2>
          <p className="section-subtitle">Find your perfect pair from top brands</p>
        </div>
        <ul className="category-grid">
          {categories.map(({ categoryName, _id, image }) => (
            <li className="category-card" key={_id}>
              <button
                className="category-button"
                onClick={() => singleCategoryFilterHandler(categoryName)}
              >
                <img
                  className="category-img"
                  src={image}
                  alt={`${categoryName} shoes category`}
                  loading="lazy"
                />
                <span className="category-name">{categoryName}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Trending Section */}
      <section className="home-section trending-section">
        <div className="section-header">
          <h2 className="section-title">Trending Now</h2>
          <p className="section-subtitle">Most popular picks this week</p>
        </div>
        <ul className="product-grid">
          {trendingProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </ul>
        <div className="section-cta">
          <Link to="/products" className="button-secondary">
            View All Products
          </Link>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="trust-section">
        <div className="trust-grid">
          <div className="trust-card">
            <div className="trust-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <h3 className="trust-title">Free Shipping</h3>
            <p className="trust-text">On all orders over $100</p>
          </div>
          <div className="trust-card">
            <div className="trust-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
            </div>
            <h3 className="trust-title">Easy Returns</h3>
            <p className="trust-text">30-day hassle-free returns</p>
          </div>
          <div className="trust-card">
            <div className="trust-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <h3 className="trust-title">100% Authentic</h3>
            <p className="trust-text">Genuine products guaranteed</p>
          </div>
        </div>
      </section>

      {(productsLoading || categoriesLoading) && (
        <div className="loading-div">
          <Spinner />
        </div>
      )}
    </div>
  );
};
