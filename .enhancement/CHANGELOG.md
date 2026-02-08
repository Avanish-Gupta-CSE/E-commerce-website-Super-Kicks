# Super Kicks -- Changelog

All notable changes to this project will be documented in this file.
Format follows [Keep a Changelog](https://keepachangelog.com/).

---

## [2.1.1] - 2026-02-08 -- Auth Fixes & Logo

### Fixed
- "Login with Test Credentials" now works: rewrote flow to use signUp response session directly, avoiding the double signIn race condition and email_not_confirmed error
- Documented requirement to disable email confirmation in Supabase dashboard setup instructions

### Removed
- Google sign-in button, "OR" divider, and all related code (signInWithGoogle from auth.js, AuthProvider.jsx, Login.jsx) since the provider was never enabled

### Changed
- Replaced broken FaShoePrints icon (react-icons) with a custom inline SVG sneaker logo in navigation
- Added accent color and proper alignment to logo

---

## [2.1.0] - 2026-02-07 -- UI Design Overhaul

### Fixed
- "Login with Test Credentials" now auto-creates the test user if it doesn't exist in Supabase
- Google OAuth shows meaningful toast error instead of navigating to a broken Supabase URL
- DataProvider no longer fires duplicate requests during auth loading (gated behind authLoading)
- Added explicit GRANT statements to supabase/schema.sql for anon/authenticated roles

### Changed
- Rebuilt global design system in index.css with button variants, form components, auth layout
- Redesigned Login page with centered card, button hierarchy, animated reset panel
- Redesigned Signup page with card layout and side-by-side name fields
- Redesigned Home page with hero gradient overlay, circular category cards, SVG trust badges
- Redesigned Product Listing with reusable FilterPanel, mobile drawer, product count header
- Redesigned Product Detail with breadcrumbs, sale badge, specs grid, tag pills
- Redesigned Cart with empty state illustration, quantity controls, order summary sidebar
- Improved Checkout with better address cards and success page layout
- Redesigned Wishlist with empty state illustration and proper container
- Migrated Profile.css, Orders.css, ReviewSection.css from hardcoded hex to Tailwind theme tokens
- Added active link accent color to navigation
- Widened product cards and added consistent gap-5 across all grids
- Added off-white background to app shell for card contrast

---

## [2.0.0] - 2026-02-07 -- Supabase Backend + New Features

### Added
- **Supabase integration** replacing MirageJS mock backend
  - `@supabase/supabase-js` client library
  - `src/lib/supabase.js` -- Supabase client singleton
  - `.env.local` for Supabase project URL and anon key
- **Database schema** (`supabase/schema.sql`) with 9 tables:
  - `profiles`, `categories`, `products`, `cart_items`, `wishlist_items`, `orders`, `order_items`, `reviews`, `addresses`
  - Row Level Security (RLS) policies on all tables
  - Auto-create profile trigger on user signup
- **Seed data** (`supabase/seed.sql`) -- 17 products + 4 categories
- **API layer** (`src/lib/api/`) with 8 modules:
  - `products.js`, `categories.js`, `cart.js`, `wishlist.js`, `orders.js`, `reviews.js`, `addresses.js`, `auth.js`
  - All modules normalize Supabase data to match the existing UI component shape
- **AuthProvider** (`src/contexts/AuthProvider.jsx`) -- Supabase auth with:
  - Email/password sign in and sign up
  - Google OAuth sign in
  - Password reset via email
  - Profile management (update name)
  - `onAuthStateChange` listener for session persistence
- **WishlistProvider** (`src/contexts/WishlistProvider.jsx`) -- separated from CartProvider
- **OrderProvider** (`src/contexts/OrderProvider.jsx`) -- order creation and history
- **Orders page** (`/orders`) -- list all past orders with status badges
- **Order detail page** (`/orders/:id`) -- order items, shipping address, total
- **Profile page** (`/profile`) -- edit name, view email, member since date, saved addresses, link to orders
- **Review system** (`src/components/reviews/ReviewSection.jsx`) -- on ProductDetails page:
  - Star rating selector (1-5) with hover preview
  - Comment submission for authenticated users
  - Auto-calculated average rating displayed on product cards
  - Delete own reviews
  - Login prompt for unauthenticated visitors
- **Profile link** in navigation bar (visible when authenticated)

### Changed
- **main.jsx**: Removed MirageJS `makeServer()`, added AuthProvider/WishlistProvider/OrderProvider to provider hierarchy
- **App.jsx**: Added routes for `/profile`, `/orders`, `/orders/:id` (all protected)
- **DataProvider**: Replaced `fetch("/api/products")` with `productsApi.getProducts()` (Supabase)
- **CartProvider**: Replaced all `/api/user/cart` fetch calls with `cartApi` functions; now depends on `useAuth` for auth state; added `clearCartHandler`
- **AddressProvider**: Replaced local state with Supabase `addresses` table; CRUD operations persist to database
- **Navigation**: Uses `useAuth` and `useWishlistContext`; added profile icon link
- **RequiresAuth**: Uses `useAuth` instead of `useLoginContext`; shows nothing while auth loading
- **AddToCartButton**: Uses `useAuth` for authentication check
- **AddToWishlistButton**: Uses `useWishlistContext` instead of `useCartContext`
- **Wishlist page**: Uses `useWishlistContext` instead of `useCartContext`
- **Login page**: Rewritten with `useAuth` for signIn, Google OAuth button, password reset form
- **Signup page**: Rewritten with `useAuth` for signUp, proper validation (min 6 chars)
- **Checkout page**: Creates real order via `useOrderContext.placeOrder()`, clears cart after order, links to orders page
- **Cart page**: Passes product objects to inc/dec handlers (not just IDs)
- **ProductDetails**: Added `ReviewSection` component, displays rating and review count
- **RequiresAuth.test.jsx**: Updated to mock `useAuth` instead of `useLoginContext`

### Removed
- **MirageJS** (`miragejs` package) -- replaced by Supabase
- **jwt-encode** and **jwt-decode** packages -- replaced by Supabase auth
- **mockman-js** package
- **src/server.js** -- MirageJS server configuration
- **src/backend/** folder entirely:
  - `controllers/AuthController.js`, `CartController.js`, `CategoryController.js`, `ProductController.js`, `WishlistController.js`
  - `utils/authUtils.js`
  - `db/users.js`, `db/products.js`, `db/categories.js`
- **src/index.js** -- old CRA entry point (replaced by `src/main.jsx`)
- **src/contexts/LoginProvider.jsx** -- replaced by `AuthProvider`

---

## [1.0.0] - 2026-02-07 -- Major Revamp

### Added
- **Vite build system** replacing Create React App (faster dev server, modern ESM)
- **Tailwind CSS** with custom theme (colors, animations, shadows, dark mode prep)
- **ESLint + Prettier** configuration with Tailwind plugin
- **Vitest + React Testing Library** testing framework with 7 passing tests
- **Error Boundary** component with fallback UI
- **404 Not Found** page for unmatched routes
- **Skip navigation** link for keyboard accessibility
- **cn() utility** function (clsx + tailwind-merge) for conditional classnames
- **Hero section** on Home page with gradient overlay and CTA
- **Features section** on Home page (Free Shipping, Easy Returns, Authentic)
- **PostCSS configuration** for Tailwind processing
- `.enhancement/` folder with project tracking documents (Progress.md, ARCHITECTURE.md, ISSUES.md, ROADMAP.md, DECISIONS.md, CHANGELOG.md)
- `.cursor/rules/` with 7 coding standard files (general, react, styling, typescript, testing, git, security)

### Changed
- **Entry point**: `src/index.js` -> `src/main.jsx` with `createRoot` API
- **All CSS files**: migrated from vanilla CSS to Tailwind @apply utilities
- **All context providers**: added `useMemo` and `useCallback` for memoization
- **Navigation**: semantic `<nav>` element, aria-labels, className-based active styles
- **Footer**: dynamic copyright year, modern layout, rel="noopener noreferrer"
- **Home page**: redesigned with hero, categories, trending sections
- **Login page**: proper `<label>` elements, autoComplete attributes
- **Signup page**: proper `<label>` elements, fixed "Conform" -> "Confirm" typo
- **ProductCard**: lazy loading images, descriptive alt text
- **ProductDetails**: descriptive alt text, lazy loading
- **Cart page**: fixed `<p>` wrapping `<h2>` semantic HTML issue
- **Checkout page**: now a protected route (RequiresAuth)
- **AddToCartButton**: removed unused counter variable, added aria-label
- **AddToWishlistButton**: removed unused counter variable, fixed handler name, added aria-label
- **DataProvider**: fixed `require()` -> `import`, memoized `getFilteredData` with `useMemo`
- **LoginProvider**: fixed "conformPassword" typo, memoized all values, improved error handling
- **CartProvider**: memoized all values, renamed `isItemPresentinWishlistHandler` (fixed casing)
- **AddressProvider**: single dispatch for addAddress (was 7 dispatches), memoized
- **AuthController**: removed `process.env.REACT_APP_JWT_SECRET`, uses local mock constant
- **authUtils**: removed `process.env` reference, uses local mock constant
- **package.json**: updated to `type: "module"`, Vite scripts, new dependencies
- **Font**: Inter (from Source Sans Pro) for modern typography
- **Product data**: fixed string prices to numbers, fixed "Men's" -> "Men" consistency
- **Category data**: fixed wrong "literature" description for Sneakers category
- **Color palette**: updated from `#27374d` to `#1a1a2e` primary, added `#e94560` accent

### Removed
- Create React App (`react-scripts`) dependency
- `mockman-js` dependency and `/mockman` route
- External CDN scripts (mockman CSS, toastify CDN) from index.html
- Debug `console.log` from Checkout page
- Unused variables (`counter`, `wishlistCounter`)
- CRA boilerplate comments from index.html

### Fixed
- Deprecated `ReactDOM.render()` -> `createRoot()` (React 18)
- `require()` syntax in DataProvider (mixed CJS/ESM)
- `require()` syntax in AuthController (mixed CJS/ESM)
- JWT secret exposed via `process.env` in frontend code
- Typo: `conformPassword` -> `confirmPassword` throughout codebase
- Semantic HTML: `<p>` wrapping `<h2>` in Cart price section
- Generic image alt text ("productImage", "category") -> descriptive text
- Silent error handling (`console.log(e)`) -> proper error messages
- Inconsistent product price types (string vs number)
- Wrong category description for "Sneakers" (said "literature/prose")
- Inconsistent gender values ("Men's" vs "Men")
