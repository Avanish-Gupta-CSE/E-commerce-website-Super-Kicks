# Super Kicks -- Changelog

All notable changes to this project will be documented in this file.
Format follows [Keep a Changelog](https://keepachangelog.com/).

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
