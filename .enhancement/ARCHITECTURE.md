# Super Kicks -- Architecture

## Current Architecture (Before Revamp)

### High-Level Overview

```
Browser (SPA)
  |
  +--> React App (CRA, JavaScript)
        |
        +--> React Router v6 (client-side routing)
        |
        +--> Context API + useReducer (state management)
        |     |- DataProvider    (products, categories, filters, search)
        |     |- LoginProvider   (auth state, form inputs)
        |     |- CartProvider    (cart items, wishlist items)
        |     |- AddressProvider (delivery addresses)
        |
        +--> MirageJS (in-browser mock API server)
              |- /api/auth/signup, /api/auth/login
              |- /api/products, /api/products/:id
              |- /api/categories, /api/categories/:id
              |- /api/user/cart (GET, POST, DELETE)
              |- /api/user/wishlist (GET, POST, DELETE)
```

### Context Provider Nesting

```
BrowserRouter
  -> ScrollToTop
    -> DataProvider
      -> LoginProvider
        -> CartProvider
          -> AddressProvider
            -> App (routes, navigation, footer)
```

### Data Flow

1. **Products**: MirageJS seed data -> `DataProvider.fetchProducts()` -> `state.products` -> pages consume via `useDataContext()`
2. **Auth**: Login form -> `LoginProvider.loginHandler()` -> MirageJS `/api/auth/login` -> JWT token -> `localStorage` -> `state.login = true`
3. **Cart**: User action -> `CartProvider.addToCartHandler()` -> MirageJS `/api/user/cart` -> response -> `state.cart` updated
4. **Filters**: User input -> `DataProvider` dispatch -> `getFilteredData()` recalculates on every render -> filtered array passed to product listing

### Page Structure

| Route | Page | Auth Required | Components Used |
|-------|------|---------------|-----------------|
| `/` | Home | No | Navigation, ProductCard, Footer |
| `/products` | ProductListing | No | Navigation, ProductCard, Filters sidebar, Footer |
| `/products/:id` | ProductDetails | No | Navigation, AddToCart, AddToWishlist, Footer |
| `/cart` | Cart | Yes (RequiresAuth) | Navigation, CartItems, PriceSummary, Footer |
| `/wishlist` | Wishlist | Yes (RequiresAuth) | Navigation, WishlistItems, Footer |
| `/login` | Login | No | Navigation, LoginForm, Footer |
| `/signup` | Signup | No | Navigation, SignupForm, Footer |
| `/checkout` | Checkout | No (should be Yes) | Navigation, AddressSelector, OrderSummary, Footer |

---

## Target Architecture (After Revamp)

### High-Level Overview

```
Browser (SPA or SSR)
  |
  +--> React App (Vite, TypeScript, Tailwind CSS)
        |
        +--> React Router v6 (latest)
        |
        +--> Context API + useReducer (memoized)
        |     |- AuthContext     (login, signup, tokens, user profile)
        |     |- CartContext     (cart operations)
        |     |- WishlistContext (wishlist operations, separated from cart)
        |     |- ProductContext  (products, filters, search, pagination)
        |     |- UIContext       (theme, modals, toasts, loading states)
        |
        +--> Real Backend API
              |
              +--> Auth Service (email/password, social login, password reset)
              +--> Product Service (CRUD, pagination, search, filtering)
              +--> Cart Service (persistent cart)
              +--> Order Service (create, track, history)
              +--> Payment Service (Stripe integration)
              +--> Image Storage (product images, user avatars)
```

### Key Architectural Changes

1. **Build**: CRA -> Vite (faster HMR, modern ESM, smaller bundles)
2. **Language**: JavaScript -> TypeScript (type safety)
3. **Styling**: Vanilla CSS -> Tailwind CSS (design system, dark mode, responsive)
4. **Backend**: MirageJS -> Real backend (Supabase / Express / Firebase)
5. **Auth**: Frontend JWT -> Backend-managed sessions / httpOnly cookies
6. **State**: Monolithic contexts -> Focused, memoized contexts
7. **Routing**: Add code splitting with React.lazy + Suspense
8. **Error handling**: console.log -> Error boundaries + user-facing error UI
9. **Testing**: None -> Vitest + RTL + Playwright

### Component Architecture (Target)

```
src/
  components/
    ui/                     # Reusable UI primitives
      Button.tsx
      Input.tsx
      Card.tsx
      Modal.tsx
      Badge.tsx
      Skeleton.tsx
      Avatar.tsx
    layout/                 # Layout components
      Header.tsx
      Footer.tsx
      Sidebar.tsx
      Breadcrumbs.tsx
    product/                # Product-specific components
      ProductCard.tsx
      ProductGrid.tsx
      ProductGallery.tsx
      ProductFilters.tsx
      ProductReviews.tsx
    cart/                   # Cart components
      CartItem.tsx
      CartSummary.tsx
      CouponInput.tsx
    auth/                   # Auth components
      LoginForm.tsx
      SignupForm.tsx
      ProtectedRoute.tsx
    checkout/               # Checkout components
      AddressForm.tsx
      PaymentForm.tsx
      OrderSummary.tsx
  pages/                    # Route-level components
  contexts/                 # State providers
  hooks/                    # Custom hooks
  lib/                      # Utilities, API client, constants
  types/                    # TypeScript type definitions
  assets/                   # Static assets (images, fonts)
```

### API Layer (Target)

```
src/lib/
  api/
    client.ts               # Fetch wrapper with auth headers, error handling
    products.ts             # Product API calls
    auth.ts                 # Auth API calls
    cart.ts                 # Cart API calls
    orders.ts               # Order API calls
    wishlist.ts             # Wishlist API calls
```

### Database Schema (Target)

```
users
  - id, email, password_hash, name, avatar_url, created_at

products
  - id, name, description, price, discount_percent, category_id,
    rating_avg, rating_count, stock, images[], variants[], created_at

categories
  - id, name, slug, description, image_url

cart_items
  - id, user_id, product_id, quantity, variant_id

wishlist_items
  - id, user_id, product_id

orders
  - id, user_id, status, total, shipping_address, payment_id, created_at

order_items
  - id, order_id, product_id, quantity, price_at_purchase, variant_id

reviews
  - id, user_id, product_id, rating, comment, created_at

addresses
  - id, user_id, name, mobile, street, city, pincode, is_default
```
