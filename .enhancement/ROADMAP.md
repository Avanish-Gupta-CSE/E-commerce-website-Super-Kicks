# Super Kicks -- Revamp Roadmap

---

## Phase 0: Documentation & Tooling Setup
**Priority**: Immediate | **Status**: DONE

- [x] Create `.enhancement/` folder with tracking documents
- [x] Create `.cursor/rules/` with coding standards
- [x] Document current architecture
- [x] Catalog all issues (80+)
- [x] Define target architecture

---

## Phase 1: Tech Stack Modernization
**Priority**: Critical | **Status**: DONE
**Estimated effort**: 2-3 days

### 1.1 Build Tool Migration
- [x] Migrate from Create React App to Vite
- [x] Configure Vite for React
- [x] Set up path aliases (`@/components`, `@/pages`, etc.)
- [x] Update `public/index.html` to Vite format

### 1.2 TypeScript Migration
- [ ] Add `tsconfig.json` with strict mode
- [ ] Rename `.js`/`.jsx` files to `.ts`/`.tsx` incrementally
- [ ] Add type definitions for all contexts
- [ ] Add interfaces for Product, User, CartItem, Address, etc.
- [ ] Remove PropTypes in favor of TypeScript

### 1.3 Styling Migration
- [x] Install and configure Tailwind CSS v3+
- [x] Set up `tailwind.config.js` with custom theme (colors, fonts, spacing)
- [x] Migrate components from vanilla CSS to Tailwind utilities
- [ ] Remove old CSS files as components are migrated
- [ ] Add dark mode support via Tailwind

### 1.4 Tooling
- [x] Set up ESLint with strict rules
- [x] Set up Prettier
- [ ] Configure Husky + lint-staged for pre-commit hooks
- [x] Update all dependencies to latest stable
- [x] Fix deprecated `ReactDOM.render()` -> `createRoot()`

---

## Phase 2: Backend Implementation
**Priority**: Critical | **Status**: DONE
**Estimated effort**: 3-5 days
**Decision**: Supabase (ADR-004 ACCEPTED)

### 2.1 Auth
- [x] Set up Supabase auth (email/password)
- [x] Add social login (Google OAuth)
- [x] Implement password reset flow
- [x] Secure token management (Supabase session)

### 2.2 Database & API
- [x] Design and create database schema (profiles, products, categories, cart_items, wishlist_items, orders, order_items, reviews, addresses)
- [x] Enable Row Level Security (RLS) on all tables
- [x] Create API layer (`src/lib/api/`) for products, categories, cart, wishlist, orders, reviews, addresses, auth
- [x] Seed data script for 17 products + 4 categories
- [x] Create Supabase client singleton (`src/lib/supabase.js`)

### 2.3 Payments
- [ ] Integrate Stripe for payment processing (DEFERRED -- ADR-005)

### 2.4 Storage
- [ ] Set up image storage for product images
- [ ] Migrate from external URLs to self-hosted images

---

## Phase 3: Security Fixes
**Priority**: Critical | **Status**: DONE

- [x] Remove JWT secret from frontend (S2)
- [x] Implemented proper auth via Supabase (replaces mock JWT)
- [x] Moved to Supabase session management (replaces localStorage tokens)
- [x] Row Level Security on all database tables
- [x] Input validation on forms
- [x] Removed hard-coded test credentials

---

## Phase 4: UI/UX Overhaul
**Priority**: High | **Status**: DONE (partial)

### 4.1 Design System
- [x] Define color palette, typography scale, spacing system in Tailwind config
- [ ] Build reusable UI components (Button, Input, Card, Modal, Badge, Avatar, Skeleton)
- [ ] Add dark mode toggle
- [ ] Create consistent icon system (Lucide React)

### 4.2 Navigation & Layout
- [x] Redesign header/nav with modern look
- [ ] Add breadcrumbs
- [x] Improve footer design
- [x] Add 404 page
- [ ] Add loading skeletons for all data-loading pages

### 4.3 Pages
- [x] Home: Hero section, featured categories, trending products
- [ ] Product Listing: Grid/list toggle, improved filters, pagination
- [x] Product Details: Reviews section, rating display
- [x] Cart: Improved layout
- [x] Checkout: Integrated with real order system, address from DB
- [x] User Profile: Account info, order history link, saved addresses
- [x] Auth pages: Modern login/signup with Google OAuth, password reset

### 4.4 Assets
- [ ] Replace/update product images with reliable URLs
- [ ] Add empty state illustrations
- [ ] Add brand logo (SVG)
- [ ] Add favicon (modern, multi-size)

---

## Phase 5: New Features
**Priority**: Medium | **Status**: DONE
**Estimated effort**: 5-7 days

- [x] Order history page (`/orders`) and order detail page (`/orders/:id`)
- [x] Product reviews and ratings (submit, display, delete, average calculation)
- [ ] Product recommendations ("You may also like")
- [ ] Recently viewed products
- [ ] Coupon/promo code system
- [ ] Product variants (size, color selection)
- [ ] Advanced search with autocomplete
- [ ] Share product (copy link, social media)
- [ ] Email notifications (order confirmation)
- [x] User profile management (`/profile` -- edit name, view email, manage addresses)
- [x] Wishlist separated into its own provider (WishlistProvider)

---

## Phase 6: Code Quality
**Priority**: Medium | **Status**: DONE

- [x] Add React Error Boundaries with fallback UI
- [x] Memoize all context values with `useMemo`
- [x] Wrap handler functions with `useCallback`
- [ ] Add debouncing to search input
- [x] Fix all typos (conformPassword -> confirmPassword)
- [x] Remove all unused variables
- [x] Remove all debug console.log statements
- [x] Implement proper error handling (user-facing error messages)
- [ ] Add code splitting with `React.lazy()` + `Suspense`
- [x] Add image lazy loading (`loading="lazy"`)
- [x] Separate CartProvider and WishlistProvider
- [ ] Standardize file/folder naming conventions

---

## Phase 7: Accessibility
**Priority**: High | **Status**: DONE

- [x] Add proper `<label>` elements to all form inputs
- [x] Add `aria-label` to icon-only buttons
- [x] Improve image alt text (descriptive, product-specific)
- [x] Fix semantic HTML issues
- [x] Add skip navigation link
- [ ] Ensure 44x44px minimum touch targets
- [ ] Add keyboard navigation for all interactive elements
- [ ] Add visible focus indicators
- [ ] Add ARIA live regions for dynamic content
- [ ] Test with axe-core or Lighthouse accessibility audit

---

## Phase 8: SEO & Performance
**Priority**: Medium | **Status**: DONE (partial)

- [x] Add proper meta tags (title, description per page)
- [ ] Add Open Graph tags for social sharing
- [ ] Add Twitter Card tags
- [ ] Add structured data (JSON-LD) for products
- [ ] Generate sitemap.xml
- [ ] Add canonical URLs
- [x] Optimize fonts (preload, font-display: swap)
- [ ] Add responsive images with `srcset`/`sizes`
- [ ] Analyze and optimize bundle size
- [ ] Add preconnect for critical external resources

---

## Phase 9: Testing
**Priority**: Medium | **Status**: DONE (foundation)

- [x] Set up Vitest + React Testing Library
- [x] Write unit tests for utility functions
- [x] Write component tests for UI primitives
- [ ] Write integration tests for auth flow
- [ ] Write integration tests for checkout flow
- [ ] Set up Playwright for E2E tests
- [ ] Write E2E tests for critical user journeys
- [ ] Set up CI pipeline for automated testing
- [ ] Target: 80% code coverage
