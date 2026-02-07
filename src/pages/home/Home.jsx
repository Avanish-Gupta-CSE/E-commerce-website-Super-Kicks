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
      <div className="main-card">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-8 text-left text-white">
          <h1 className="mb-2 text-5xl font-bold tracking-tight md:text-6xl">
            Step Into Style
          </h1>
          <p className="mb-6 max-w-xl text-lg text-white/80">
            Discover the latest collections from Nike, Adidas, Puma, and more.
            Premium sneakers for every occasion.
          </p>
          <Link
            to="/products"
            className="inline-block rounded-lg bg-accent px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-accent-dark hover:shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <section className="px-4 py-12">
        <h2 className="mb-2 text-3xl font-bold">Shop by Category</h2>
        <p className="mb-8 text-muted">Find your perfect pair</p>
        <ul className="container">
          {categories.map(({ categoryName, _id, image }) => (
            <li className="card" key={_id}>
              <img
                className="category-img"
                src={image}
                alt={`${categoryName} shoes category`}
                loading="lazy"
              />
              <button
                className="mt-2 rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary-light"
                onClick={() => singleCategoryFilterHandler(categoryName)}
              >
                {categoryName}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Trending Section */}
      <section className="bg-secondary px-4 py-12">
        <h2 className="mb-2 text-3xl font-bold">Trending Now</h2>
        <p className="mb-8 text-muted">Most popular picks this week</p>
        <ul className="container">
          {trendingProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </ul>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 gap-8 px-8 py-16 md:grid-cols-3">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-2xl">
            🚚
          </div>
          <h3 className="mb-2 text-lg font-semibold">Free Shipping</h3>
          <p className="text-sm text-muted">On all orders over $100</p>
        </div>
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-2xl">
            🔄
          </div>
          <h3 className="mb-2 text-lg font-semibold">Easy Returns</h3>
          <p className="text-sm text-muted">30-day hassle-free returns</p>
        </div>
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-2xl">
            ✅
          </div>
          <h3 className="mb-2 text-lg font-semibold">100% Authentic</h3>
          <p className="text-sm text-muted">Genuine products guaranteed</p>
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
