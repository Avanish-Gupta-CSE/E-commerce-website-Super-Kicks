# Super Kicks -- Issue Catalog

> Severity: CRITICAL | HIGH | MEDIUM | LOW
> Status: OPEN | IN PROGRESS | FIXED | WONT FIX

---

## Security (CRITICAL)

| # | Issue | File(s) | Severity | Status |
|---|-------|---------|----------|--------|
| S1 | Passwords stored/compared as plain text | `src/backend/controllers/AuthController.js:72` | CRITICAL | OPEN |
| S2 | JWT secret exposed in frontend code | `src/backend/utils/authUtils.js:9`, `AuthController.js:42,75` | CRITICAL | OPEN |
| S3 | No password hashing | `AuthController.js` | CRITICAL | OPEN |
| S4 | Token stored in localStorage (XSS vulnerable) | `src/contexts/LoginProvider.jsx:86,114` | HIGH | OPEN |
| S5 | No input sanitization | All form inputs | HIGH | OPEN |
| S6 | Hard-coded test credentials | `src/contexts/LoginProvider.jsx:69-70` | MEDIUM | OPEN |
| S7 | No CSRF protection | Global | MEDIUM | OPEN |
| S8 | No rate limiting on auth endpoints | `AuthController.js` | MEDIUM | OPEN |
| S9 | No Content Security Policy headers | `public/index.html` | LOW | OPEN |

---

## Code Quality

| # | Issue | File(s) | Severity | Status |
|---|-------|---------|----------|--------|
| Q1 | Deprecated `ReactDOM.render()` used | `src/index.js:17` | HIGH | OPEN |
| Q2 | Typo: `conformPassword` should be `confirmPassword` | `src/contexts/LoginProvider.jsx:36-37` | MEDIUM | OPEN |
| Q3 | Unused variables (`counter`, `wishlistCounter`) | `AddToCartButton.jsx:11`, `AddtoWishlistButton.jsx:17` | LOW | OPEN |
| Q4 | Debug `console.log` left in production code | `Checkout.jsx:209`, all context catch blocks | MEDIUM | OPEN |
| Q5 | Silent error handling (`console.log(e)` in catch) | `CartProvider.jsx`, `DataProvider.jsx`, `LoginProvider.jsx` | HIGH | OPEN |
| Q6 | No React Error Boundaries | Global | HIGH | OPEN |
| Q7 | No PropTypes or TypeScript types | All components | MEDIUM | OPEN |
| Q8 | Inconsistent file/folder naming | `Product-details/` vs `product-listing/` | LOW | OPEN |
| Q9 | Mixed `require` and `import` syntax | `src/contexts/DataProvider.jsx:3` | LOW | OPEN |
| Q10 | Multiple state dispatches instead of single update | `src/contexts/AddressProvider.jsx:91-97` | LOW | OPEN |
| Q11 | Inconsistent price type (number vs string) | `src/backend/db/products.js` (lines 277, 296, 315) | MEDIUM | OPEN |

---

## Performance

| # | Issue | File(s) | Severity | Status |
|---|-------|---------|----------|--------|
| P1 | `getFilteredData()` recalculates on every render | `src/contexts/DataProvider.jsx:139-174` | HIGH | OPEN |
| P2 | No memoization (`useMemo`/`useCallback`) in contexts | All context providers | HIGH | OPEN |
| P3 | No code splitting (all routes loaded upfront) | `src/App.js` | MEDIUM | OPEN |
| P4 | No image lazy loading | All image elements | MEDIUM | OPEN |
| P5 | No debouncing on search input | `src/components/navigation/Navigation.jsx:25` | MEDIUM | OPEN |
| P6 | Synchronous Google Fonts loading | `public/index.html:16-18` | LOW | OPEN |
| P7 | No pagination (all products loaded at once) | `DataProvider.jsx` | MEDIUM | OPEN |
| P8 | No `React.memo` on any component | All components | LOW | OPEN |
| P9 | Context value objects recreated on every render | All context providers | HIGH | OPEN |

---

## Accessibility (a11y)

| # | Issue | File(s) | Severity | Status |
|---|-------|---------|----------|--------|
| A1 | Missing form `<label>` elements | `Login.jsx:31-45`, `Signup.jsx:24-82` | HIGH | OPEN |
| A2 | Icon-only buttons lack accessible labels | `Navigation.jsx:46-47`, `AddtoWishlistButton.jsx:37` | HIGH | OPEN |
| A3 | Poor/generic alt text on images | `ProductDetails.jsx:32`, `Home.jsx:29` | MEDIUM | OPEN |
| A4 | No ARIA labels anywhere | Global | HIGH | OPEN |
| A5 | Semantic HTML violations (`<p>` wrapping `<h2>`) | `Cart.jsx:100-101` | MEDIUM | OPEN |
| A6 | No skip navigation link | Global | MEDIUM | OPEN |
| A7 | Missing visible focus indicators | Global CSS | HIGH | OPEN |
| A8 | Touch targets may be too small (<44x44px) | Various buttons | MEDIUM | OPEN |
| A9 | No ARIA live regions for form validation errors | Login, Signup forms | LOW | OPEN |
| A10 | No keyboard navigation support for filters | `ProductsListing.jsx` | MEDIUM | OPEN |

---

## Styling / CSS

| # | Issue | File(s) | Severity | Status |
|---|-------|---------|----------|--------|
| C1 | Potential class name collisions (no CSS modules) | All CSS files | MEDIUM | OPEN |
| C2 | Inline styles mixed with CSS classes | `Cart.jsx:76-79`, `AddToCartButton.jsx:16-19`, `Checkout.jsx:107-112` | LOW | OPEN |
| C3 | Duplicate `:root` CSS variables | `App.css` + `index.css` | LOW | OPEN |
| C4 | Hard-coded colors instead of CSS variables | Various CSS files | MEDIUM | OPEN |
| C5 | Magic numbers in CSS | `App.css:40` (`padding-top: 30%`), `ProductDetails.css:14-15` | LOW | OPEN |
| C6 | Non-standard breakpoints (786px) | `App.css:137`, `navigation.css:41` | LOW | OPEN |
| C7 | Duplicate desktop/mobile nav code | `Navigation.jsx:17-70, 72-126` | MEDIUM | OPEN |

---

## SEO

| # | Issue | File(s) | Severity | Status |
|---|-------|---------|----------|--------|
| E1 | Generic meta description (CRA default) | `public/index.html:10` | MEDIUM | OPEN |
| E2 | No Open Graph tags | `public/index.html` | MEDIUM | OPEN |
| E3 | No Twitter Card tags | `public/index.html` | LOW | OPEN |
| E4 | No structured data (JSON-LD) | Global | MEDIUM | OPEN |
| E5 | No sitemap.xml | `public/` | MEDIUM | OPEN |
| E6 | No canonical URLs | Global | LOW | OPEN |

---

## Dependencies

| # | Issue | File(s) | Severity | Status |
|---|-------|---------|----------|--------|
| D1 | `react-scripts` outdated (CRA) | `package.json` | MEDIUM | OPEN |
| D2 | `react-router-dom` outdated (6.11.1) | `package.json` | LOW | OPEN |
| D3 | `react-toastify` outdated (9.1.3) | `package.json` | LOW | OPEN |
| D4 | `uuid` outdated (8.3.2) | `package.json` | LOW | OPEN |
| D5 | `jwt-encode` unmaintained | `package.json` | MEDIUM | OPEN |
| D6 | `mockman-js` only needed for dev | `package.json` | LOW | OPEN |

---

## Missing Features

| # | Feature | Priority | Status |
|---|---------|----------|--------|
| F1 | Real backend API | CRITICAL | OPEN |
| F2 | Payment integration | CRITICAL | OPEN |
| F3 | Order history/tracking | HIGH | OPEN |
| F4 | User profile page | HIGH | OPEN |
| F5 | Product reviews/ratings | MEDIUM | OPEN |
| F6 | Product image gallery | MEDIUM | OPEN |
| F7 | Related/recommended products | MEDIUM | OPEN |
| F8 | Product variants (size/color) | HIGH | OPEN |
| F9 | Coupon/promo code system | MEDIUM | OPEN |
| F10 | Password reset flow | HIGH | OPEN |
| F11 | Social login | MEDIUM | OPEN |
| F12 | Dark mode | LOW | OPEN |
| F13 | 404 error page | HIGH | OPEN |
| F14 | Breadcrumbs | LOW | OPEN |
| F15 | Advanced search with autocomplete | MEDIUM | OPEN |
| F16 | Pagination/infinite scroll | MEDIUM | OPEN |
| F17 | PWA support | LOW | OPEN |
| F18 | Email notifications | MEDIUM | OPEN |
| F19 | Recently viewed products | LOW | OPEN |
| F20 | Share product functionality | LOW | OPEN |

---

## Data Quality

| # | Issue | File(s) | Severity | Status |
|---|-------|---------|----------|--------|
| DQ1 | Category "Sneakers" has wrong description (says "literature/prose/novels") | `src/backend/db/categories.js:13` | LOW | OPEN |
| DQ2 | Product images use external encrypted Google URLs (may break) | `src/backend/db/products.js` | HIGH | OPEN |
| DQ3 | Inconsistent gender values ("Men" vs "Men's") | `src/backend/db/products.js` | LOW | OPEN |
| DQ4 | Some prices are strings instead of numbers | `products.js:277,296,315` | MEDIUM | OPEN |
| DQ5 | Hard-coded default address with personal info | `src/contexts/AddressProvider.jsx:50-57` | LOW | OPEN |
